import * as productionStatusTypes from '../constants/productionStatusTypes';
import * as statusTypes from '../constants/statusTypes';

import {
	GraphQLEnumType,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql';

import {
	GraphQLLong,
} from '../types/GraphQLLong';

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
	getRawItems,
	getUser,
	getViewer,
	removeProvider,
	setRawItems,
	updateItem,
	updateProvider,
} from './database';

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
			type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
			description: 'A list of the item\'s genres',
		},
		characters: {
			type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
			description: 'A list of the item\'s characters',
		},
		notes: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'Notes about the item',
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
			type: ItemsConnection, // eslint-disable-line no-use-before-define
			description: 'The item\'s past versions',
			args: {
				...connectionArgs,
			},
			resolve: (obj, args) =>
				connectionFromPromisedArray(getItemHistory(obj.id), args),
		},
	}),
	interfaces: [nodeInterface],
});

const {
	connectionType: ItemsConnection,
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
	connectionType: ProvidersConnection,
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
			type: ItemsConnection,
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
		providers: {
			type: ProvidersConnection,
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

function randomId(length = 16) {
	let id = '';
	while (id.length < length) {
		id += String(Math.random()).slice(2);
	}
	return id.slice(0, length);
}

const GraphQLAddItemMutation = mutationWithClientMutationId({
	name: 'AddItem',
	inputFields: {
		localId: { type: new GraphQLNonNull(GraphQLID) },
	},
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
	mutateAndGetPayload: ({ localId: localItemId }) => {
		addItem(localItemId, {
			url: '',
			title: randomId(),
			creator: randomId(),
			genres: [],
			characters: [],
			status: statusTypes.COMPLETE,
			productionStatus: productionStatusTypes.COMPLETE,
			notes: '',
			length: 12345,
		});
		return { localItemId };
	},
});

const GraphQLEditItemLengthMutation = mutationWithClientMutationId({
	name: 'EditItemLength',
	inputFields: {
		id: { type: new GraphQLNonNull(GraphQLID) },
		length: { type: new GraphQLNonNull(GraphQLInt) },
	},
	outputFields: {
		item: {
			type: GraphQLItem,
			resolve: ({ localItemId }) => getItem(localItemId),
		},
	},
	mutateAndGetPayload: ({ id, length }) => {
		const localItemId = fromGlobalId(id).id;
		updateItem(localItemId, { length });
		return { localItemId };
	},
});

const GraphQLEditItemProductionStatusMutation = mutationWithClientMutationId({
	name: 'EditItemProductionStatus',
	inputFields: {
		id: { type: new GraphQLNonNull(GraphQLID) },
		productionStatus: { type: new GraphQLNonNull(GraphQLProductionStatusEnum) },
	},
	outputFields: {
		item: {
			type: GraphQLItem,
			resolve: ({ localItemId }) => getItem(localItemId),
		},
	},
	mutateAndGetPayload: ({ id, productionStatus }) => {
		const localItemId = fromGlobalId(id).id;
		updateItem(localItemId, { productionStatus });
		return { localItemId };
	},
});

const GraphQLEditItemStatusMutation = mutationWithClientMutationId({
	name: 'EditItemStatus',
	inputFields: {
		id: { type: new GraphQLNonNull(GraphQLID) },
		status: { type: new GraphQLNonNull(GraphQLStatusEnum) },
	},
	outputFields: {
		item: {
			type: GraphQLItem,
			resolve: ({ localItemId }) => getItem(localItemId),
		},
		viewer: {
			type: GraphQLUser,
			resolve: () => getViewer(),
		},
	},
	mutateAndGetPayload: ({ id, status }) => {
		const localItemId = fromGlobalId(id).id;
		updateItem(localItemId, { status });
		return { localItemId };
	},
});

const GraphQLEditItemNotesMutation = mutationWithClientMutationId({
	name: 'EditItemNotes',
	inputFields: {
		id: { type: new GraphQLNonNull(GraphQLID) },
		notes: { type: new GraphQLNonNull(GraphQLString) },
	},
	outputFields: {
		item: {
			type: GraphQLItem,
			resolve: ({ localItemId }) => getItem(localItemId),
		},
	},
	mutateAndGetPayload: ({ id, notes }) => {
		const localItemId = fromGlobalId(id).id;
		updateItem(localItemId, { notes });
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
		addItem: GraphQLAddItemMutation,
		editItemLength: GraphQLEditItemLengthMutation,
		editItemProductionStatus: GraphQLEditItemProductionStatusMutation,
		editItemStatus: GraphQLEditItemStatusMutation,
		editItemNotes: GraphQLEditItemNotesMutation,
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
