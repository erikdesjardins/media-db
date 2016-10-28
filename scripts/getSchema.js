/* eslint-disable import/no-commonjs, global-require */

function runWithNodeEnv(env, callback) {
	const prevNodeEnv = process.env.NODE_ENV;
	process.env.NODE_ENV = env;

	try {
		return callback();
	} finally {
		process.env.NODE_ENV = prevNodeEnv;
	}
}

// avoid running Babel with the babelRelayPlugin (infinite loop)
runWithNodeEnv('development', () => {
	require('babel-core/register');
	require('./_getSchema');
});
