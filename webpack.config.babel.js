import webpack from 'webpack';
import { join } from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import NyanProgressPlugin from 'nyan-progress-webpack-plugin';

module.exports = {
	entry: {
		background: './src/pages/background/background.js',
		content: './src/pages/content/content.js',
		popup: './src/pages/popup/popup.js',
		main: './src/pages/index.js'
	},
	output: {
		path: join(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel' },
			{ test: /\.jsx$/, loaders: ['babel', 'react-map-styles'] },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css', 'postcss') },
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css', 'postcss', 'sass') }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin('[name].bundle.css'),
		new NyanProgressPlugin()
	],
	postcss() {
		return [autoprefixer];
	}
};
