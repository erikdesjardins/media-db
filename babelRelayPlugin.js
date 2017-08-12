import path from 'path';
import { spawnSync } from 'child_process';
import getBabelRelayPlugin from 'babel-relay-plugin';

const { stdout, stderr } = spawnSync(process.execPath, ['-r', 'babel-core/register', '-r', path.join(__dirname, 'scripts', 'getSchema.js')], { encoding: 'utf8' });

if (stderr) throw new Error(stderr);

const schema = JSON.parse(stdout);

export default getBabelRelayPlugin(schema.data);
