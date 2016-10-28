import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import schema from '../src/data/schema';

graphql(schema, introspectionQuery).then(result => {
	process.stdout.write(JSON.stringify(result));
});
