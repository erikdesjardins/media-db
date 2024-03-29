/* eslint-disable import/no-commonjs, import/order */
const { join } = require('path');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const InertEntryPlugin = require('inert-entry-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const sass = require('sass');

module.exports = (env, { mode }) => ({
	entry: 'extricate-loader!interpolate-loader!./src/manifest.json',
	output: {
		path: join(__dirname, 'dist'),
		filename: 'manifest.json',
	},
	performance: false,
	devtool: mode === 'production' ? false : 'inline-cheap-source-map',
	module: {
		rules: [{
			test: /\.entry\.js$/,
			use: [
				{ loader: 'spawn-loader', options: { name: '[name].js' } },
			],
		}, {
			test: /\.js$/,
			exclude: join(__dirname, 'node_modules'),
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-react', {
								runtime: 'automatic',
							}],
							mode === 'production' && ['babel-preset-minify', {
								booleans: false,
								builtIns: false,
								flipComparisons: false,
								mangle: false,
							}],
						].filter(x => x),
						plugins: [
							['babel-plugin-transform-define', {
								'process.env.NODE_ENV': mode,
								'typeof window': 'object',
							}],

							mode === 'production' && '@babel/plugin-transform-react-constant-elements',
						].filter(x => x),
						comments: mode !== 'production',
						compact: mode === 'production',
						babelrc: false,
					},
				},
			],
		}, {
			test: /\.js$/,
			include: join(__dirname, 'node_modules'),
			exclude: /snudown-js/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							mode === 'production' && ['babel-preset-minify', {
								booleans: false,
								builtIns: false,
								flipComparisons: false,
								mangle: false,
							}],
						].filter(x => x),
						plugins: [
							['babel-plugin-transform-define', {
								'process.env.NODE_ENV': mode,
								'typeof window': 'object',
							}],

							mode === 'production' && '@babel/plugin-transform-react-constant-elements',
						].filter(x => x),
						comments: false,
						compact: true,
						babelrc: false,
					},
				},
			],
		}, {
			test: /\.scss$/,
			use: [
				{ loader: 'file-loader', options: { name: '[name].css', esModule: false } },
				{ loader: 'extricate-loader', options: { resolve: '\\.js$' } },
				{ loader: 'css-loader', options: { esModule: false } },
				{ loader: 'sass-loader', options: { implementation: sass } },
			],
		}, {
			test: /\.css$/,
			use: [
				{ loader: 'file-loader', options: { name: '[name].css', esModule: false } },
				{ loader: 'extricate-loader', options: { resolve: '\\.js$' } },
				{ loader: 'css-loader', options: { esModule: false } },
			],
		}, {
			test: /\.html$/,
			use: [
				{ loader: 'file-loader', options: { name: '[name].[ext]', esModule: false } },
				{ loader: 'extricate-loader', options: { resolve: '/html-loader/.+\\.js$' } },
				{ loader: 'html-loader' },
			],
		}, {
			test: /\.(png|svg|woff2?|ttf|eot)$/,
			use: [
				{ loader: 'file-loader', options: { name: '[name].[ext]', esModule: false } },
			],
		}],
	},
	optimization: {
		minimize: false,
	},
	plugins: [
		new InertEntryPlugin(),
		new BellOnBundlerErrorPlugin(),
		new NyanProgressPlugin(),

		mode === 'production' && new ZipPlugin({ filename: 'media-db.zip' }),
	].filter(x => x),
});
