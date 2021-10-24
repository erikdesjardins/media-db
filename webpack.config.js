/* eslint-disable import/no-commonjs */
const webpack = require('webpack');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const InertEntryPlugin = require('inert-entry-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const sass = require('sass');
const { join } = require('path');

module.exports = ({ production, zip } = {}) => ({
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
							'babel-preset-react',
							production && ['babel-preset-babili', {
								booleans: false,
								builtIns: false,
								flipComparisons: false,
								infinity: false,
								simplify: false,
								simplifyComparisons: false,
							}],
						].filter(x => x),
						plugins: [
							'babel-plugin-syntax-object-rest-spread',

							'babel-plugin-transform-dead-code-elimination',
							['babel-plugin-transform-define', {
								'process.env.NODE_ENV': production ? 'production' : 'development',
								'typeof window': 'object',
							}],
							'babel-plugin-lodash',

							production && 'babel-plugin-transform-react-constant-elements',
							production && 'babel-plugin-transform-react-inline-elements',
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
			paths: true,
		}),
		new BellOnBundlerErrorPlugin(),
		new NyanProgressPlugin(),

		zip && new ZipPlugin({ filename: 'media-db.zip' }),
	].filter(x => x),
});
