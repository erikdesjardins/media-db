import path from 'path';
import { spawnSync } from 'child_process';
import getBabelRelayPlugin from 'babel-relay-plugin';

const { stdout } = spawnSync(process.execPath, [path.join(__dirname, 'scripts', 'getSchema')], { encoding: 'utf8' });

const schema = JSON.parse(stdout);

export default getBabelRelayPlugin(schema.data);
