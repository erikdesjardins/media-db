import webpack from 'webpack';
import BellOnBundlerErrorPlugin from 'bell-on-bundler-error-plugin';
import InertEntryPlugin from 'inert-entry-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import NyanProgressPlugin from 'nyan-progress-webpack-plugin';
import ZipPlugin from 'zip-webpack-plugin';
import { join } from 'path';

const babelRelayPlugin = require.resolve('./babelRelayPlugin');

const isProduction = process.env.NODE_ENV === 'production';

export default {
	entry: 'extricate-loader!interpolate-loader!./src/manifest.json',
	bail: isProduction,
	output: {
		path: join(__dirname, 'dist'),
		filename: 'manifest.json',
	},
	devtool: 'source-map',
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
						presets: ['react'],
						plugins: [
							[babelRelayPlugin, { enforceSchema: isProduction }],

							'transform-decorators-legacy',
							'transform-function-bind',
							'transform-class-properties',
							['transform-object-rest-spread', { useBuiltIns: true }],

							'transform-dead-code-elimination',
							['transform-define', {
								'process.env.NODE_ENV': isProduction ? 'production' : 'development',
							}],
							'lodash',

							isProduction && 'transform-react-constant-elements',
							isProduction && 'transform-react-inline-elements',
							isProduction && 'transform-react-remove-prop-types',
						].filter(x => x),
						comments: !isProduction,
						babelrc: false,
					},
				},
			],
		}, {
			test: /\.js$/,
			include: join(__dirname, 'node_modules'),
			use: [
				{
					loader: 'babel-loader',
					options: {
						plugins: [
							'transform-dead-code-elimination',
							['transform-define', {
								'process.env.NODE_ENV': isProduction ? 'production' : 'development',
							}],

							isProduction && 'transform-react-remove-prop-types',
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
				{ loader: 'file-loader', options: { name: '[name].css' } },
				{ loader: 'extricate-loader', options: { resolve: '\\.js$' } },
				{ loader: 'css-loader' },
				{ loader: 'postcss-loader' },
				{ loader: 'sass-loader' },
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
	plugins: [
		new InertEntryPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale\b/), // moment locales
		new LodashModuleReplacementPlugin(),
		(isProduction && new ZipPlugin({ filename: 'media-db.zip' })),
		new BellOnBundlerErrorPlugin(),
		new NyanProgressPlugin(),
	].filter(x => x),
};
