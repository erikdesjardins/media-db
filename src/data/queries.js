import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { activeTab } from '../api/tabs';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import * as q from '../constants/queryTypes';
import * as statusTypes from '../constants/statusTypes';
import { randomId } from '../utils/string';
import {
	addItem,
	addProvider,
	getItem,
	getItemHistory,
	getItemHistoryAt,
	getItems,
	getItemsWithStatus,
	getProvider,
	getProviders,
	getRawData,
	removeProvider,
	setRawData,
	updateItem,
	updateProvider,
} from './database';
import { runProvider, runProviderForId } from './provider';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			networkMode: 'always', // no connection used
			cacheTime: Infinity, // cache unused query results forever
			staleTime: Infinity, // never consider query results stale
			retry: false, // retries don't help any of our (local) requests
			refetchOnReconnect: false, // we don't perform any uncacheable network requests
			refetchOnWindowFocus: 'always', // ensure consistency when using multiple tabs
		},
		mutations: {
			networkMode: 'always', // no connection used
			cacheTime: Infinity, // cache unused mutation results forever
			retry: false, // retries don't help any of our (local) requests
		},
	},
});

// Queries

export function useQueryActiveTab(options = {}) {
	return useQuery([q.ACTIVE_TAB], () => activeTab(), {
		refetchOnWindowFocus: false, // we only have permission to get active tab during initial open, can't refetch
		...options,
	});
}

export function useQueryItem(id, options = {}) {
	return useQuery([q.ITEM, id], () => getItem(id), options);
}

export function useQueryItemHistory(id, options = {}) {
	return useQuery([q.ITEM, id, 'history'], () => getItemHistory(id), options);
}

export function useQueryItemHistoryAt(id, date, options = {}) {
	return useQuery([q.ITEM, id, 'history', date], () => getItemHistoryAt(id, date), options);
}

export function useQueryItems(options = {}) {
	return useQuery([q.ITEMS], () => getItems(), options);
}

export function useQueryItemsWithStatus(status, options = {}) {
	return useQuery([q.ITEMS, 'status', status], () => getItemsWithStatus(status), options);
}

export function useQueryIdFromProvider(url, options = {}) {
	return useQuery([q.FROM_PROVIDER, url, 'id'], async () => {
		const providers = await getProviders();
		for (const provider of providers) {
			const result = runProviderForId(provider, url);
			if (result) {
				return result;
			}
		}
		return null;
	}, options);
}

export function useQueryItemFromProvider(url, options = {}) {
	return useQuery([q.FROM_PROVIDER, url, 'item'], async ({ signal }) => {
		const providers = await getProviders();
		for (const provider of providers) {
			const result = await runProvider(provider, url, signal); // eslint-disable-line no-await-in-loop
			if (result) {
				console.info('Provider returned:', result); // eslint-disable-line no-console
				return result;
			}
		}
		return null;
	}, options);
}

export function useQueryProvider(id, options = {}) {
	return useQuery([q.PROVIDER, id], () => getProvider(id), options);
}

export function useQueryProviders(options = {}) {
	return useQuery([q.PROVIDERS], () => getProviders(), options);
}

export function useQueryRawData(options = {}) {
	return useQuery([q.RAW_DATA], async () => JSON.stringify(await getRawData()), options);
}

// Mutations

export function useMutationAddItem(url) {
	return useMutation(async info => {
		const item = {
			// defaults (may be overridden by the provider)
			thumbnail: null,
			tinyThumbnail: null,
			title: '',
			creator: '',
			genres: '',
			characters: '',
			length: 0,
			productionStatus: productionStatusTypes.COMPLETE,

			...info,

			// always provided by us (along with `date` and `statusDate` handled by the db)
			url,
			status: statusTypes.PENDING,
			notes: '',
			tags: '',
		};
		await addItem(info.id, item);
		return item;
	}, {
		onSuccess: item => {
			queryClient.invalidateQueries([q.ITEM, item.id]);
			queryClient.invalidateQueries([q.ITEMS]);
			queryClient.invalidateQueries([q.RAW_DATA]);
		},
	});
}

export function useMutationUpdateItem(id) {
	return useMutation(async patch => {
		await updateItem(id, patch);
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([q.ITEM, id]);
			queryClient.invalidateQueries([q.ITEMS]);
			queryClient.invalidateQueries([q.RAW_DATA]);
		},
	});
}

export function useMutationAddProvider() {
	return useMutation(async () => {
		const id = randomId();
		await addProvider(id);
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([q.FROM_PROVIDER]);
			queryClient.invalidateQueries([q.PROVIDERS]);
			queryClient.invalidateQueries([q.RAW_DATA]);
		},
	});
}

export function useMutationUpdateProvider(id) {
	return useMutation(async patch => {
		await updateProvider(id, patch);
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([q.FROM_PROVIDER]);
			queryClient.invalidateQueries([q.PROVIDER, id]);
			queryClient.invalidateQueries([q.PROVIDERS]);
			queryClient.invalidateQueries([q.RAW_DATA]);
		},
	});
}

export function useMutationRemoveProvider(id) {
	return useMutation(async () => {
		await removeProvider(id);
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([q.FROM_PROVIDER]);
			queryClient.invalidateQueries([q.PROVIDER, id]);
			queryClient.invalidateQueries([q.PROVIDERS]);
			queryClient.invalidateQueries([q.RAW_DATA]);
		},
	});
}

export function useMutationSetRawData() {
	return useMutation(async rawData => {
		await setRawData(JSON.parse(rawData));
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries([q.ITEM]);
			queryClient.invalidateQueries([q.ITEMS]);
			queryClient.invalidateQueries([q.FROM_PROVIDER]);
			queryClient.invalidateQueries([q.PROVIDER]);
			queryClient.invalidateQueries([q.PROVIDERS]);
			queryClient.invalidateQueries([q.RAW_DATA]);
		},
	});
}
