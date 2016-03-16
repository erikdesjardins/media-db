
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
	fromGlobalId,
	globalIdField,
	mutationWithClientMutationId,
	nodeDefinitions,
} from 'graphql-relay';

import {
	Item,
	getItem,
	getItems,
} from './database';

const statusEnum = new GraphQLEnumType({
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

const productionStatusEnum = new GraphQLEnumType({
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

const itemType = new GraphQLObjectType({
	name: 'Item',
	description: 'A media item',
	fields: () => ({
		id: globalIdField('Item'),
		title: {
			type: GraphQLString,
			description: 'The item\'s title',
		},
		author: {
			type: GraphQLString,
			description: 'The item\'s author',
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
			description: 'The item\'s length (platform-specific)',
		},
		status: {
			type: statusEnum,
			description: 'The item\'s status',
		},
		productionStatus: {
			type: productionStatusEnum,
			description: 'The item\'s production status',
		},
		date: {
			type: new GraphQLNonNull(GraphQLInt),
			description: 'The date at which this version of the item was updated',
		},
	}),
	interfaces: [nodeInterface],
});

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
			return itemType;
		}
		return null;
	}
);

const queryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		node: nodeField,
		items: {
			type: new GraphQLList(itemType),
			resolve: () => getItems(100),
		},
	}),
});

var CheckHidingSpotForTreasureMutation = mutationWithClientMutationId({
	name: 'CheckHidingSpotForTreasure',
	inputFields: {
		id: { type: new GraphQLNonNull(GraphQLID) },
	},
	outputFields: {
		hidingSpot: {
			type: hidingSpotType,
			resolve: ({localHidingSpotId}) => getHidingSpot(localHidingSpotId),
		},
		game: {
			type: gameType,
			resolve: () => getGame(),
		},
	},
	mutateAndGetPayload: ({id}) => {
		var localHidingSpotId = fromGlobalId(id).id;
		checkHidingSpotForTreasure(localHidingSpotId);
		return {localHidingSpotId};
	},
});

const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		checkHidingSpotForTreasure: CheckHidingSpotForTreasureMutation,
	}),
});

export default new GraphQLSchema({
	query: queryType,
	mutation: mutationType,
});
