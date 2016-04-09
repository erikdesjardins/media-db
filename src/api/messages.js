import { apiToPromise } from '../utils/api';

const listeners = new Map();

/**
 * @callback MessageListener
 * @template T
 * @param {*} data The message data.
 * @param {number} [tabId] The tabId of the sender, if sent by a tab's content script.
 * @returns {T|Promise<T, *>} The response data, optionally wrapped in a promise.
 */

/**
 * Register a listener to be invoked whenever a message of `type` is received.
 * Responses may be sent synchronously or asynchronously:
 * If `callback` returns a non-promise value, a response will be sent synchronously.
 * If `callback` returns a promise, a response will be sent asynchronously when it resolves.
 * If it rejects, an invalid response will be sent to close the message channel.
 * @param {string} type
 * @param {MessageListener} callback
 * @throws {Error} If a listener for `messageType` already exists.
 * @returns {void}
 */
export function addListener(type, callback) {
	if (listeners.has(type)) {
		throw new Error(`Listener for message type: ${type} already exists.`);
	}
	listeners.set(type, { callback });
}

const tabSendMessage = apiToPromise(chrome.tabs.sendMessage);
const runtimeSendMessage = apiToPromise(chrome.runtime.sendMessage);

/*
 * Send a message to non-content scripts or to the content script at `tabId` (if specified).
 * @param {string} type
 * @param {number|string} [tabId]
 * @param {*} [data]
 * @returns {Promise<*, Error>} Rejects if an invalid response is received,
 * resolves with the response data otherwise.
 */
export async function sendMessage({ type, tabId, data } = {}) {
	const message = { type, data };
	const target = parseInt(tabId, 10);

	const response = await (tabId ?
		tabSendMessage(target, message) :
		runtimeSendMessage(message)
	);

	if (!response) {
		throw new Error(`Received invalid response from message type: ${type}`);
	}

	return response.data;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const { type, data } = request;
	const tabId = sender.tab && sender.tab.id;

	if (!listeners.has(type)) {
		throw new Error(`Unrecognised message type: ${type}`);
	}
	const listener = listeners.get(type);

	let response;
	try {
		response = listener.callback(data, tabId);
	} catch (e) {
		sendResponse();
		throw e;
	}

	if (response instanceof Promise) {
		response
			.then(data => sendResponse({ data }))
			.catch(error => {
				sendResponse();
				throw error;
			});
		return true;
	}
	sendResponse({ data: response });
});
