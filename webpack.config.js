var path = require('path')
var webpack = require('webpack')
var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: ['./src/main.js'],
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index.js'
	},
	devtool: 'source-map',
	context: __dirname,
	plugins: [
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{
				test: /.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
						'css':'vue-style-loader!css-loader',
						'style':'vue-style-loader',
						'less':'vue-style-loader!css-loader!less-loader'
					}
				}
			},
			// { test: /\.vue$/, use: 'vue-loader' },
			{ test: /\.svg$/, use: 'file-loader' },
			{ test: /\.css$/, use: 'css-loader' }
		]
	}
}