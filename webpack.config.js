const webpack = require('webpack');
const { join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

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
		extensions: ["", ".js", ".jsx"]
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
