import { graphql, introspectionQuery, printSchema } from 'graphql';
import schema from './src/data/schema';

switch (process.argv[2]) {
	case 'graphql':
		process.stdout.write(printSchema(schema));
		break;
	case 'json':
		graphql(schema, introspectionQuery).then(result => {
			process.stdout.write(JSON.stringify(result));
		}, err => {
			process.exitCode = 1;
			console.error(err); // eslint-disable-line no-console
		});
		break;
	default:
		throw new Error(`Invalid argument: ${process.argv[2]}`);
}
