import { GraphQLScalarType } from 'graphql/type/definition';
import { INT } from 'graphql/language/kinds';

function coerceLong(value) {
	const num = Number(value);
	if (num === num && num <= Number.MAX_SAFE_INTEGER && num >= Number.MIN_SAFE_INTEGER) { // eslint-disable-line no-self-compare
		return (num < 0 ? Math.ceil : Math.floor)(num);
	}
	return null;
}

export const GraphQLLong = new GraphQLScalarType({
	name: 'Long',
	description: 'The `Long` scalar type represents non-fractional signed whole numeric values. ' +
		'Long can represent values between -(2^53 - 1) and 2^53 - 1. ',
	serialize: coerceLong,
	parseValue: coerceLong,
	parseLiteral(ast) {
		if (ast.kind === INT) {
			return coerceLong(ast.value);
		}
		return null;
	},
});
