import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import schema from '../src/data/schema';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

// make output dir
mkdirp.sync(path.join(__dirname, '../dist'));

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
	const result = await graphql(schema, introspectionQuery);
	if (result.errors) {
		console.error( // eslint-disable-line no-console
			'ERROR introspecting schema: ',
			JSON.stringify(result.errors, null, 2)
		);
	} else {
		fs.writeFileSync(
			path.join(__dirname, '../dist/schema.json'),
			JSON.stringify(result, null, 2)
		);
	}
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
	path.join(__dirname, '../dist/schema.graphql'),
	printSchema(schema)
);