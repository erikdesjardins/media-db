import _ from 'lodash';
import deepEqual from 'only-shallow';

import * as productionStatusTypes from '../constants/productionStatusTypes';
import * as statusTypes from '../constants/statusTypes';

import {
	GraphQLBoolean,
	GraphQLEnumType,
	GraphQLID,
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql';

import {
	GraphQLLong,
} from '../types/GraphQLLong';

import { activeTab } from '../api/tabs';

import {
	connectionArgs,
	connectionDefinitions,
	connectionFromPromisedArray,
	fromGlobalId,
	globalIdField,
	mutationWithClientMutationId,
	nodeDefinitions,
	offsetToCursor,
} from 'graphql-relay';

import { randomId } from '../utils/schema';

import {
	Item,
	Provider,
	User,
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
	getUser,
	getViewer,
	removeProvider,
	setRawItems,
	updateItem,
	updateProvider,
} from './database';

const runInfoCallback = _.memoize(
	(infoCallback, url) => new Function('url', infoCallback)(url), // eslint-disable-line no-new-func
	(infoCallback, url) => `${url}###${infoCallback}`,
);

async function runProviders(url) {
	const providers = await getProviders();
	return providers.reduce((promise, { infoCallback }) =>
			promise.then(result => result || runInfoCallback(infoCallback, url)),
		Promise.resolve(false)
	);
}

const { nodeInterface, nodeField } = nodeDefinitions(
	globalId => {
		const { type, id } = fromGlobalId(globalId);
		if (type === 'Item') {
			return getItem(id);
		} else if (type === 'User') {
			return getUser(id);
		} else if (type === 'Provider') {
			return getProvider(id);
		}
		return null;
	},
	obj => {
		if (obj instanceof Item) {
			return GraphQLItem; // eslint-disable-line no-use-before-define
		} else if (obj instanceof User) {
			return GraphQLUser; // eslint-disable-line no-use-before-define
		} else if (obj instanceof Provider) {
			return GraphQLProvider; // eslint-disable-line no-use-before-define
		}
		return null;
	}
);

const GraphQLStatusEnum = new GraphQLEnumType({
	name: 'Status',
	description: 'The item\'s status',
	values: {
		WAITING: {
			value: statusTypes.WAITING,
			description: 'Waiting',
		},
		PENDING: {
			value: statusTypes.PENDING,
			description: 'Unviewed',
		},
		IN_PROGRESS: {
			value: statusTypes.IN_PROGRESS,
			description: 'In Progress',
		},
		COMPLETE: {
			value: statusTypes.COMPLETE,
			description: 'Viewed',
		},
		REJECTED: {
			value: statusTypes.REJECTED,
			description: 'Rejected',
		},
	},
});

const GraphQLProductionStatusEnum = new GraphQLEnumType({
	name: 'ProductionStatus',
	description: 'The item\'s production status',
	values: {
		INCOMPLETE: {
			value: productionStatusTypes.INCOMPLETE,
		},
		HIATUS: {
			value: productionStatusTypes.HIATUS,
		},
		COMPLETE: {
			value: productionStatusTypes.COMPLETE,
		},
		CANCELLED: {
			value: productionStatusTypes.CANCELLED,
		},
	},
});

const GraphQLItemFieldUpdates = new GraphQLObjectType({
	name: 'ItemFieldUpdates',
	description: 'All fields that the provider may provide, and therefore may be updated',
	fields: () => ({
		thumbnail: { type: GraphQLString },
		title: { type: GraphQLString },
		creator: { type: GraphQLString },
		genres: { type: GraphQLString },
		characters: { type: GraphQLString },
		length: { type: GraphQLInt },
		productionStatus: { type: GraphQLProductionStatusEnum },
	}),
});

// *sigh*
const GraphQLItemFieldUpdatesInput = new GraphQLInputObjectType({
	name: 'ItemFieldUpdatesInput',
	fields: () => ({
		thumbnail: { type: GraphQLString },
		title: { type: GraphQLString },
		creator: { type: GraphQLString },
		genres: { type: GraphQLString },
		characters: { type: GraphQLString },
		length: { type: GraphQLInt },
		productionStatus: { type: GraphQLProductionStatusEnum },
	}),
});

const GraphQLItem = new GraphQLObjectType({
	name: 'Item',
	description: 'A media item',
	fields: () => ({
		id: globalIdField('Item'),
		url: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The item\'s URL',
		},
		thumbnail: {
			type: GraphQLString,
			description: 'The item\'s thumbnail URL',
		},
		title: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The item\'s title',
		},
		creator: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The item\'s creator',
		},
		genres: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The item\'s genres',
		},
		characters: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The item\'s characters',
		},
		notes: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Notes about the item',
		},
		tags: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The item\'s tags',
		},
		length: {
			type: new GraphQLNonNull(GraphQLInt),
			description: 'The item\'s length',
		},
		status: {
			type: new GraphQLNonNull(GraphQLStatusEnum),
			description: 'The item\'s status',
		},
		productionStatus: {
			type: new GraphQLNonNull(GraphQLProductionStatusEnum),
			description: 'The item\'s production status',
		},
		statusDate: {
			type: new GraphQLNonNull(GraphQLLong),
			description: 'The date at which the item\'s status was last updated',
		},
		date: {
			type: new GraphQLNonNull(GraphQLLong),
			description: 'The date at which this version of the item was updated',
		},
		history: {
			type: ItemConnection, // eslint-disable-line no-use-before-define
			description: 'The item\'s past versions',
			args: {
				...connectionArgs,
			},
			resolve: (obj, args) =>
				connectionFromPromisedArray(getItemHistory(obj.id), args),
		},
		fieldUpdates: {
			type: new GraphQLNonNull(GraphQLItemFieldUpdates),
			description: 'Fields which differ in the provider\'s representation',
			resolve: async obj => {
				const info = await runProviders(obj.url);
				if (!info) {
					// no providers could handle it. this shouldn't happen, but we won't die here because it is possible
					return {};
				}
				if (info.id !== obj.id) {
					throw new Error(`id: ${info.id} returned by provider is not expected id: ${obj.id}`);
				}
				// this will get every field that differs, even those not eligible for update by the provider
				// but that's okay, because Relay won't allow them to be accessed on the `ItemFieldUpdates`
				return _.pickBy({ ...obj, ...info }, (value, key) => !deepEqual(value, obj[key]));
			},
		},
	}),
	interfaces: [nodeInterface],
});

const {
	connectionType: ItemConnection,
	edgeType: GraphQLItemEdge,
} = connectionDefinitions({
	name: 'Item',
	nodeType: GraphQLItem,
});

const GraphQLProvider = new GraphQLObjectType({
	name: 'Provider',
	description: 'A media provider',
	fields: () => ({
		id: globalIdField('Provider'),
		infoCallback: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The provider\'s info fetching callback. ' +
				'Should accept one param `url`, returning false ' +
				'if the url cannot be handled by this provider, ' +
				'or a Promise resolving to a GraphQLItem otherwise.',
		},
	}),
	interfaces: [nodeInterface],
});

const {
	connectionType: ProviderConnection,
	edgeType: GraphQLProviderEdge,
} = connectionDefinitions({
	name: 'Provider',
	nodeType: GraphQLProvider,
});

const GraphQLUser = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: globalIdField('User'),
		items: {
			type: ItemConnection,
			args: {
				status: {
					type: GraphQLStatusEnum,
				},
				...connectionArgs,
			},
			// status is nullable, in which case getFilteredItems() === getItems()
			resolve: (obj, { status, ...args }) =>
				connectionFromPromisedArray(getFilteredItems({ status }), args),
		},
		searchItems: {
			type: ItemConnection,
			args: {
				query: {
					type: new GraphQLNonNull(GraphQLString),
				},
				...connectionArgs,
			},
			resolve: (obj, { query, ...args }) =>
				connectionFromPromisedArray(getQueriedItems(query), args),
		},
		providers: {
			type: ProviderConnection,
			args: {
				...connectionArgs,
			},
			resolve: (obj, args) =>
				connectionFromPromisedArray(getProviders(), args),
		},
		rawItems: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: async () => JSON.stringify(await getRawItems()),
		},
		itemForActiveTab: {
			type: GraphQLItem,
			description: 'The stored item corresponding the current URL',
			resolve: async () => {
				const { url } = await activeTab();
				const info = await runProviders(url);
				if (!info) return null;
				const item = await getItem(info.id);
				return item || null;
			},
		},
		providerMatchesActiveTab: {
			type: new GraphQLNonNull(GraphQLBoolean),
			description: 'Whether or not a provider handles the current URL',
			resolve: async () => {
				const { url } = await activeTab();
				const info = await runProviders(url);
				return !!info;
			},
		},
	},
	interfaces: [nodeInterface],
});

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		node: nodeField,
		viewer: {
			type: GraphQLUser,
			resolve: () => getViewer(),
		},
	}),
});

const GraphQLAddActiveTabItemMutation = mutationWithClientMutationId({
	name: 'AddActiveTabItem',
	inputFields: {},
	outputFields: {
		itemEdge: {
			type: GraphQLItemEdge,
			resolve: async ({ localItemId }) => {
				const items = await getItems();
				const offset = items.findIndex(({ id }) => id === localItemId);
				return {
					cursor: offsetToCursor(offset),
					node: items[offset],
				};
			},
		},
		viewer: {
			type: GraphQLUser,
			resolve: () => getViewer(),
		},
	},
	mutateAndGetPayload: async () => {
		const { url } = await activeTab();

		const info = await runProviders(url);
		if (!info) {
			throw new Error(`No provider handled: ${url} - this should never happen`);
		}

		const localItemId = info.id;
		if (!localItemId) {
			throw new Error('No `id` provided');
		}

		addItem(localItemId, {
			// defaults (may be overridden by the provider)
			thumbnail: null,
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
		});

		return { localItemId };
	},
});

function editItemMutation(name, field, type, additionalFields = {}) {
	return mutationWithClientMutationId({
		name,
		inputFields: {
			id: { type: new GraphQLNonNull(GraphQLID) },
			[field]: { type },
		},
		outputFields: {
			item: {
				type: GraphQLItem,
				resolve: ({ localItemId }) => getItem(localItemId),
			},
			...additionalFields,
		},
		mutateAndGetPayload: ({ id, [field]: val }) => {
			const localItemId = fromGlobalId(id).id;
			updateItem(localItemId, { [field]: val });
			return { localItemId };
		},
	});
}

const GraphQLEditItemLengthMutation = editItemMutation(
	'EditItemLength', 'length', new GraphQLNonNull(GraphQLInt)
);

const GraphQLEditItemProductionStatusMutation = editItemMutation(
	'EditItemProductionStatus', 'productionStatus', new GraphQLNonNull(GraphQLProductionStatusEnum)
);

const GraphQLEditItemStatusMutation = editItemMutation(
	'EditItemStatus', 'status', new GraphQLNonNull(GraphQLStatusEnum), {
		viewer: {
			type: GraphQLUser,
			resolve: () => getViewer(),
		},
	}
);

const GraphQLEditItemNotesMutation = editItemMutation(
	'EditItemNotes', 'notes', new GraphQLNonNull(GraphQLString)
);

const GraphQLEditItemGenresMutation = editItemMutation(
	'EditItemGenres', 'genres', new GraphQLNonNull(GraphQLString)
);

const GraphQLEditItemCharactersMutation = editItemMutation(
	'EditItemCharacters', 'characters', new GraphQLNonNull(GraphQLString)
);

const GraphQLEditItemTagsMutation = editItemMutation(
	'EditItemTags', 'tags', new GraphQLNonNull(GraphQLString)
);

const GraphQLUpdateItemFieldsMutation = mutationWithClientMutationId({
	name: 'UpdateItemFields',
	inputFields: {
		id: { type: new GraphQLNonNull(GraphQLID) },
		fieldUpdates: { type: new GraphQLNonNull(GraphQLItemFieldUpdatesInput) },
	},
	outputFields: {
		item: {
			type: GraphQLItem,
			resolve: ({ localItemId }) => getItem(localItemId),
		},
	},
	mutateAndGetPayload: ({ id, fieldUpdates }) => {
		const localItemId = fromGlobalId(id).id;
		const patch = _.pickBy(fieldUpdates); // truthy
		updateItem(localItemId, patch);
		return { localItemId };
	},
});

const GraphQLAddProviderMutation = mutationWithClientMutationId({
	name: 'AddProvider',
	inputFields: {},
	outputFields: {
		providerEdge: {
			type: GraphQLProviderEdge,
			resolve: async ({ localProviderId }) => {
				const providers = await getProviders();
				const offset = providers.findIndex(({ id }) => id === localProviderId);
				return {
					cursor: offsetToCursor(offset),
					node: providers[offset],
				};
			},
		},
		viewer: {
			type: GraphQLUser,
			resolve: () => getViewer(),
		},
	},
	mutateAndGetPayload: () => {
		const localProviderId = randomId();
		addProvider(localProviderId);
		return { localProviderId };
	},
});

const GraphQLUpdateProviderMutation = mutationWithClientMutationId({
	name: 'UpdateProvider',
	inputFields: {
		id: { type: new GraphQLNonNull(GraphQLID) },
		infoCallback: { type: new GraphQLNonNull(GraphQLString) },
	},
	outputFields: {
		provider: {
			type: GraphQLProvider,
			resolve: ({ localProviderId }) => getProvider(localProviderId),
		},
	},
	mutateAndGetPayload: ({ id, infoCallback }) => {
		const localProviderId = fromGlobalId(id).id;
		updateProvider(localProviderId, infoCallback);
		return { localProviderId };
	},
});

const GraphQLRemoveProviderMutation = mutationWithClientMutationId({
	name: 'RemoveProvider',
	inputFields: {
		id: { type: new GraphQLNonNull(GraphQLID) },
	},
	outputFields: {
		deletedProviderId: {
			type: GraphQLID,
			resolve: ({ id }) => id,
		},
		viewer: {
			type: GraphQLUser,
			resolve: () => getViewer(),
		},
	},
	mutateAndGetPayload: ({ id }) => {
		const localProviderId = fromGlobalId(id).id;
		removeProvider(localProviderId);
		return { id };
	},
});

const GraphQLSetRawItemsMutation = mutationWithClientMutationId({
	name: 'SetRawItems',
	inputFields: {
		rawItems: { type: new GraphQLNonNull(GraphQLString) },
	},
	outputFields: {
		viewer: {
			type: GraphQLUser,
			resolve: () => getViewer(),
		},
	},
	mutateAndGetPayload: ({ rawItems }) => {
		setRawItems(JSON.parse(rawItems));
		return {};
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		addActiveTabItem: GraphQLAddActiveTabItemMutation,
		editItemLength: GraphQLEditItemLengthMutation,
		editItemProductionStatus: GraphQLEditItemProductionStatusMutation,
		editItemStatus: GraphQLEditItemStatusMutation,
		editItemNotes: GraphQLEditItemNotesMutation,
		editItemGenres: GraphQLEditItemGenresMutation,
		editItemCharacters: GraphQLEditItemCharactersMutation,
		editItemTags: GraphQLEditItemTagsMutation,
		updateItemFields: GraphQLUpdateItemFieldsMutation,
		addProvider: GraphQLAddProviderMutation,
		updateProvider: GraphQLUpdateProviderMutation,
		removeProvider: GraphQLRemoveProviderMutation,
		setRawItems: GraphQLSetRawItemsMutation,
	}),
});

export default new GraphQLSchema({
	query: Query,
	mutation: Mutation,
});
