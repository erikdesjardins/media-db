import schema from '../data/schema';
import { QUERY } from '../constants/messages';
import { addListener } from '../api/messages';
import { graphql } from 'graphql';

// http://graphql.org/docs/api-reference-graphql/#graphql
// https://github.com/relay-tools/relay-local-schema/blob/master/src/NetworkLayer.js
addListener(QUERY, ({ request, variables }) => graphql(schema, request, null, variables));
