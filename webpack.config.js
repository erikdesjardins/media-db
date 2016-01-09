const webpack = require('webpack');
const { join } = require('path');

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
			{ test: /\.jsx?$/, loader: 'babel' }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
};
