import webpack from 'webpack';
import BellOnBundlerErrorPlugin from 'bell-on-bundler-error-plugin';
import InertEntryPlugin from 'inert-entry-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import NyanProgressPlugin from 'nyan-progress-webpack-plugin';
import ZipPlugin from 'zip-webpack-plugin';
import sass from 'sass';
import { join } from 'path';

const babelRelayPlugin = require.resolve('./babelRelayPlugin');

export default ({ production, zip } = {}) => ({
	entry: 'extricate-loader!interpolate-loader!./src/manifest.json',
	output: {
		path: join(__dirname, 'dist'),
		filename: 'manifest.json',
	},
	performance: false,
	devtool: production ? 'source-map' : 'cheap-source-map',
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
							'react',
							production && ['babili', {
								booleans: false,
								builtIns: false,
								flipComparisons: false,
								infinity: false,
								simplify: false,
								simplifyComparisons: false,
							}],
						].filter(x => x),
						plugins: [
							[babelRelayPlugin, { enforceSchema: production }],
							'transform-decorators-legacy',
							'transform-function-bind',
							'transform-class-properties',
							['transform-object-rest-spread', { useBuiltIns: true }],
							'transform-flow-strip-types',
							'transform-dead-code-elimination',
							['transform-define', {
								'process.env.NODE_ENV': production ? 'production' : 'development',
								'typeof window': 'object',
							}],
							'lodash',

							production && 'transform-react-constant-elements',
							production && 'transform-react-inline-elements',
							production && 'transform-react-remove-prop-types',
						].filter(x => x),
						comments: !production,
						compact: production,
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
							production && ['babili', {
								booleans: false,
								builtIns: false,
								flipComparisons: false,
								infinity: false,
								simplify: false,
								simplifyComparisons: false,
							}],
						].filter(x => x),
						plugins: [
							'transform-dead-code-elimination',
							['transform-define', {
								'process.env.NODE_ENV': production ? 'production' : 'development',
								'typeof window': 'object',
							}],

							production && 'transform-react-remove-prop-types',
						].filter(x => x),
						comments: !production,
						compact: production,
						babelrc: false,
					},
				},
			],
		}, {
			test: /\.scss$/,
			use: [
				{ loader: 'file-loader', options: { name: '[name].css' } },
				{ loader: 'extricate-loader', options: { resolve: '\\.js$' } },
				{ loader: 'css-loader' },
				{ loader: 'postcss-loader' },
				{ loader: 'sass-loader', options: { implementation: sass } },
			],
		}, {
			test: /\.css$/,
			use: [
				{ loader: 'file-loader', options: { name: '[name].css' } },
				{ loader: 'extricate-loader', options: { resolve: '\\.js$' } },
				{ loader: 'css-loader' },
			],
		}, {
			test: /\.html$/,
			use: [
				{ loader: 'file-loader', options: { name: '[name].[ext]' } },
				{ loader: 'extricate-loader' },
				{ loader: 'html-loader', options: { attrs: ['link:href', 'script:src'] } },
			],
		}, {
			test: /\.(png|svg|woff2?|ttf|eot)$/,
			use: [
				{ loader: 'file-loader', options: { name: '[name].[ext]' } },
			],
		}],
	},
	optimization: {
		minimize: false,
	},
	plugins: [
		new InertEntryPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new LodashModuleReplacementPlugin({
			flattening: true, // chaos theory
		}),
		new BellOnBundlerErrorPlugin(),
		new NyanProgressPlugin(),

		zip && new ZipPlugin({ filename: 'media-db.zip' }),
	].filter(x => x),
});
