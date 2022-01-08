// import { requestPermissionForUrl } from '../api/permissions';
import { property } from '../utils/object';

const UrlType = {
	json: 'json',
	doc: 'doc',
};

const Path = {
	props: 'props',
	select: 'select',
	map: 'map',
	replace: 'replace',
	lowercase: 'lowercase',
	relativeUrl: 'relativeUrl',
};

function parseOptions(provider) {
	const { infoCallback } = provider;

	const options = /*: {
		urlRegex: string,
		idTemplate: string,
		fetchUrls: { [Root]: { type: UrlType, urlTemplate: string, headers?: { [string]: string } } },
		properties: { [string]: [Root, ...{ [Path]: object }] },
	} */ JSON.parse(infoCallback);

	return options;
}

export function runProviderForId(provider, url) {
	const {
		urlRegex,
		idTemplate,
	} = parseOptions(provider);

	const matches = new RegExp(urlRegex, 'i').exec(url);
	if (!matches) {
		return false;
	}

	const id = substitutePlaceholders(idTemplate, matches);

	return id;
}

export async function runProvider(provider, url, signal /*: AbortSignal */) {
	const {
		urlRegex,
		idTemplate,
		fetchUrls,
		properties,
	} = parseOptions(provider);

	const matches = new RegExp(urlRegex, 'i').exec(url);
	if (!matches) {
		return false;
	}

	const id = substitutePlaceholders(idTemplate, matches);

	const fetching = Object.entries(fetchUrls).map(async ([prop, { type, urlTemplate, headers }]) => {
		const urlToFetch = substitutePlaceholders(urlTemplate, matches);
		// Disabled because Chrome Web Store review is obnoxious when you request host permissions.
		// Needs the following in the manifest: "host_permissions": ["https://*/*"],
		// await requestPermissionForUrl(urlToFetch);
		const res = await fetch(urlToFetch, { headers, signal });
		if (!res.ok) {
			throw new Error(`Failed request to '${urlToFetch}': ${res.status}`);
		}
		let parsed;
		switch (type) {
			case UrlType.json:
				parsed = await res.json();
				break;
			case UrlType.doc: {
				const text = await res.text();
				parsed = new DOMParser().parseFromString(text, 'text/html');
				break;
			}
			default:
				throw new Error(`Invalid url type: '${type}'`);
		}
		return [prop, parsed];
	});

	const fetched = Object.fromEntries(await Promise.all(fetching));

	const props = Object.entries(properties).map(([prop, [root, ...paths]]) => {
		const init = fetched[root];
		if (!init) {
			throw new Error(`Path based on missing property '${root}'`);
		}
		const value = paths.reduce((v, path) => traversePath(v, path, matches), init);
		const flattened = flattenArray(value);
		return [prop, flattened];
	});

	return {
		...Object.fromEntries(props),
		id,
	};
}

function substitutePlaceholders(template, substitutions) {
	return template.replace(/\$(\d+)/g, (match, index) => substitutions[index]);
}

function traversePath(value, path, matches) {
	if (Array.isArray(value)) {
		return value.map(v => traversePath(v, path, matches));
	}

	const [[type, arg], ...rest] = Object.entries(path);

	if (rest.length > 0) {
		throw new Error(`Path component has extraneous properties: ${JSON.stringify(rest)}`);
	}

	switch (type) {
		case Path.props: {
			const props /*: string[] */ = arg;
			return property(value, props);
		}
		case Path.select: {
			const selector /*: string */ = arg;
			return Array.from(value.querySelectorAll(selector));
		}
		case Path.map: {
			const mapping /*: { [string]: string } */ = arg;
			return mapping[value] || value;
		}
		case Path.replace: {
			const [regex, to] /*: [string, string] */ = arg;
			const from = new RegExp(regex, 'i');
			return value && value.replace(from, to);
		}
		case Path.lowercase: {
			return value && value.toLowerCase();
		}
		case Path.relativeUrl: {
			const baseUrlTemplate /*: string */ = arg;
			return value && new URL(value, substitutePlaceholders(baseUrlTemplate, matches)).href;
		}
		default:
			throw new Error(`Invalid path type: '${type}'`);
	}
}

function flattenArray(value) {
	if (Array.isArray(value)) {
		return value.join(', ');
	}
	return value;
}
