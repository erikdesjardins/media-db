import getBabelRelayPlugin from 'babel-relay-plugin';
import schema from './dist/schema.json'; // eslint-disable-line import/no-unresolved

export default getBabelRelayPlugin(schema.data);
