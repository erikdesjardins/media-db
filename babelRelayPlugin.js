import getBabelRelayPlugin from 'babel-relay-plugin';
import schema from './dist/schema.json'; // eslint-disable-line

export default getBabelRelayPlugin(schema.data);
