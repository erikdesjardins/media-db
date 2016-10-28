import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import { printSchema } from 'graphql/utilities';
import schema from '../src/data/schema';

// make output dir
mkdirp.sync(path.join(__dirname, '../dist'));

// Save user readable type system shorthand of schema
fs.writeFileSync(
	path.join(__dirname, '../dist/schema.graphql'),
	printSchema(schema)
);
