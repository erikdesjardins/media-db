import { apiToPromise } from '../utils/api';

// may have to wait for https://groups.google.com/a/chromium.org/g/chromium-extensions/c/EnUmtHWOI9o to enable this,
// since you currently can't have optional host permissions
// "host_permissions": [
// 	 "https://*/*"
// ],
export async function requestPermissionForUrl(url) {
	const perms = { origins: [url] };

	const alreadyHave = await apiToPromise(chrome.permissions.contains)(perms);
	if (alreadyHave) {
		return;
	}

	await apiToPromise(chrome.permissions.request)(perms);
}
