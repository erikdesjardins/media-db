import { apiToPromise } from '../utils/api';

export async function activeTab() {
	const [tab] = await apiToPromise(chrome.tabs.query)({ active: true, lastFocusedWindow: true });
	return tab;
}
