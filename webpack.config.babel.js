import BellOnBundlerErrorPlugin from 'bell-on-bundler-error-plugin';
import InertEntryPlugin from 'inert-entry-webpack-plugin';
import NyanProgressPlugin from 'nyan-progress-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { join } from 'path';

export default {
	entry: 'extricate!interpolate!./src/manifest.json',
	bail: process.env.NODE_ENV === 'production',
	output: {
		path: join(__dirname, 'dist'),
		filename: 'manifest.json',
	},
	module: {
		loaders: [
			{ test: /\.entry\.js$/, loaders: ['spawn?name=[name].js', 'babel'] },
			{ test: /\.js$/, exclude: join(__dirname, 'node_modules'), loaders: ['babel', 'react-map-styles'] },
			{ test: /\.js$/, include: join(__dirname, 'node_modules'), loader: 'babel', query: { plugins: ['transform-dead-code-elimination', 'transform-node-env-inline'], babelrc: false } },
			{ test: /\.scss$/, loaders: ['file?name=[name].css', 'extricate?resolve=\\.js$', 'css', 'postcss', 'sass'] },
			{ test: /\.css$/, loader: 'file?name=[name].[ext]' },
			{ test: /\.html$/, loaders: ['file?name=[name].[ext]', 'extricate', 'html?attrs=link:href script:src'] },
			{ test: /\.png$/, loader: 'file?name=[name].[ext]' },
		],
	},
	plugins: [
		new InertEntryPlugin(),
		new BellOnBundlerErrorPlugin(),
		new NyanProgressPlugin(),
	],
	postcss() {
		return [autoprefixer];
	},
};
