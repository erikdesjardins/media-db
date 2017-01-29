import BellOnBundlerErrorPlugin from 'bell-on-bundler-error-plugin';
import InertEntryPlugin from 'inert-entry-webpack-plugin';
import NyanProgressPlugin from 'nyan-progress-webpack-plugin';
import ZipPlugin from 'zip-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export default {
	entry: 'extricate!interpolate!./src/manifest.json',
	bail: isProduction,
	output: {
		path: join(__dirname, 'dist'),
		filename: 'manifest.json',
	},
	devtool: isProduction ? '#source-map' : '#cheap-source-map',
	module: {
		loaders: [
			{ test: /\.entry\.js$/, loaders: ['spawn?name=[name].js', 'babel'] },
			{ test: /\.js$/, exclude: join(__dirname, 'node_modules'), loader: 'babel' },
			{ test: /\.js$/, include: join(__dirname, 'node_modules'), loader: 'babel', query: { plugins: ['transform-dead-code-elimination', 'transform-node-env-inline'], compact: true, babelrc: false } },
			{ test: /\.scss$/, loaders: ['file?name=[name].css', 'extricate?resolve=\\.js$', 'css', 'postcss', 'sass'] },
			{ test: /\.css$/, loaders: ['file?name=[name].[ext]', 'extricate?resolve=\\.js$', 'css'] },
			{ test: /\.html$/, loaders: ['file?name=[name].[ext]', 'extricate', 'html?attrs=link:href script:src'] },
			{ test: /\.(png|svg|woff2?|ttf|eot)$/, loader: 'file?name=[name].[ext]' },
		],
	},
	plugins: [
		new InertEntryPlugin(),
		(isProduction && new ZipPlugin({ filename: 'media-db.zip' })),
		new BellOnBundlerErrorPlugin(),
		new NyanProgressPlugin(),
	].filter(x => x),
	postcss() {
		return [autoprefixer];
	},
};
