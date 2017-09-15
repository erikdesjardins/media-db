import { graphql, introspectionQuery, printSchema } from 'graphql';
import schema from './src/data/schema';

switch (process.argv[2]) {
	case 'graphql':
		process.stdout.write(printSchema(schema));
		break;
	case 'json':
		graphql(schema, introspectionQuery).then(result => {
			process.stdout.write(JSON.stringify(result));
		});
		break;
	default:
		throw new Error(`Invalid argument: ${process.argv[2]}`);
}
