import {
	GraphQLEnumType,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql';

import {
	connectionArgs,
	connectionDefinitions,
	connectionFromArray,
	cursorForObjectInConnection,
	fromGlobalId,
	globalIdField,
	mutationWithClientMutationId,
	nodeDefinitions,
	toGlobalId,
} from 'graphql-relay';

import {
	Item,
	addItem,
	getItem,
	getItems,
} from './database';

const { nodeInterface, nodeField } = nodeDefinitions(
	globalId => {
		const { type, id } = fromGlobalId(globalId);
		if (type === 'Item') {
			return getItem(id);
		}
		return null;
	},
	obj => {
		if (obj instanceof Item) {
			return GraphQLItem; // eslint-disable-line no-use-before-define
		}
		return null;
	}
);

const GraphQLStatusEnum = new GraphQLEnumType({
	name: 'Status',
	description: 'The item\'s status',
	values: {
		PENDING: {
			value: 'Pending',
			description: 'Unviewed',
		},
		COMPLETE: {
			value: 'Complete',
			description: 'Viewed',
		},
	},
});

const GraphQLProductionStatusEnum = new GraphQLEnumType({
	name: 'ProductionStatus',
	description: 'The item\'s production status',
	values: {
		INCOMPLETE: {
			value: 'Incomplete',
		},
		COMPLETE: {
			value: 'Complete',
		},
		HIATUS: {
			value: 'Hiatus',
		},
		CANCELLED: {
			value: 'Cancelled',
		},
	},
});

const GraphQLItem = new GraphQLObjectType({
	name: 'Item',
	description: 'A media item',
	fields: () => ({
		id: globalIdField('Item'),
		title: {
			type: GraphQLString,
			description: 'The item\'s title',
		},
		creator: {
			type: GraphQLString,
			description: 'The item\'s creator',
		},
		genres: {
			type: new GraphQLList(GraphQLString),
			description: 'A list of the item\'s genres',
		},
		characters: {
			type: new GraphQLList(GraphQLString),
			description: 'A list of the item\'s characters',
		},
		length: {
			type: GraphQLInt,
			description: 'The item\'s length',
		},
		status: {
			type: GraphQLStatusEnum,
			description: 'The item\'s status',
		},
		productionStatus: {
			type: GraphQLProductionStatusEnum,
			description: 'The item\'s production status',
		},
		date: {
			type: new GraphQLNonNull(GraphQLInt),
			description: 'The date at which this version of the item was updated',
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

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		node: nodeField,
		items: {
			type: ItemsConnection,
			args: {
				limit: {
					type: GraphQLInt,
					defaultValue: 100,
				},
				first: {
					type: GraphQLInt,
					defaultValue: 0,
				},
				...connectionArgs,
			},
			resolve: (obj, { limit, first, ...args }) =>
				connectionFromArray(getItems(limit, first), args),
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
	inputFields: {},
	outputFields: {
		itemEdge: {
			type: GraphQLItemEdge,
			resolve: ({ itemId }) => {
				const item = getItem(itemId);
				return {
					cursor: cursorForObjectInConnection(getItems(), item),
					node: item,
				};
			},
		},
	},
	mutateAndGetPayload: () => {
		const itemId = toGlobalId('Item', randomId());
		addItem(itemId);
		return { itemId };
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		addItem: GraphQLAddItemMutation,
	}),
});

export default new GraphQLSchema({
	query: Query,
	mutation: Mutation,
});
