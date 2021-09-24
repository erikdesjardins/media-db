export async function activeTab() {
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	return tab;
}
