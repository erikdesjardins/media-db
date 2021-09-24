import { apiToPromise } from '../utils/api';

export async function requestPermissionForUrl(url) {
	const perms = { origins: [url] };

	const alreadyHave = await apiToPromise(chrome.permissions.contains)(perms);
	if (alreadyHave) {
		return;
	}

	await apiToPromise(chrome.permissions.request)(perms);
}
