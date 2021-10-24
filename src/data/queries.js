import { useMutation, useQuery, QueryClient } from 'react-query';
import { activeTab } from '../api/tabs';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import * as statusTypes from '../constants/statusTypes';
import * as q from '../constants/queryTypes';
import { randomId } from '../utils/db';
import {
	addItem,
	addProvider,
	getFilteredItems,
	getItem,
	getItemHistory,
	getItems,
	getProvider,
	getProviders,
	getQueriedItems,
	getRawItems,
	removeProvider,
	setRawItems,
	updateItem,
	updateProvider,
} from './database';
import { runProvider, runProviderForId } from './provider';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: Infinity, // cache unused query results forever
			staleTime: Infinity, // never consider query results stale
			retry: false, // retries don't help any of our (local) requests
			refetchOnReconnect: false, // we don't perform any uncacheable network requests
		},
	},
});

// Queries

export function useQueryActiveTab(options = {}) {
	return useQuery([q.ACTIVE_TAB], () => activeTab(), options);
}

export function useQueryItem(id, options = {}) {
	return useQuery([q.ITEM, id], () => getItem(id), options);
}

export function useQueryItemHistory(id, options = {}) {
	return useQuery([q.ITEM, id, 'history'], () => getItemHistory(id), options);
}

export function useQueryItems(options = {}) {
	return useQuery([q.ITEMS], () => getItems(), options);
}

export function useQueryItemsFilter(filters, options = {}) {
	return useQuery([q.ITEMS, 'filters', filters], () => getFilteredItems(filters), options);
}

export function useQueryItemsSearch(query, options = {}) {
	return useQuery([q.ITEMS, 'query', query], () => getQueriedItems(query), options);
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
	return useQuery([q.FROM_PROVIDER, url, 'item'], async () => {
		const providers = await getProviders();
		for (const provider of providers) {
			try {
				const result = await runProvider(provider, url); // eslint-disable-line no-await-in-loop
				if (result) {
					console.info('Provider returned:', result); // eslint-disable-line no-console
					return result;
				}
			} catch (e) {
				console.error('Provider errored:', e); // eslint-disable-line no-console
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
	return useQuery([q.RAW_DATA], async () => JSON.stringify(await getRawItems()), options);
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
	}, {
		onSuccess: () => {
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
	return useMutation(async rawItems => {
		await setRawItems(JSON.parse(rawItems));
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
