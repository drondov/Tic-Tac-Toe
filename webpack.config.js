module.exports = {
	entry: './index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			loader: 'babel',
			exclude: /node_modules/
		}]
	},
	devtool: "#inline-source-map",
	devServer: {
		port: 8000,
		host: '0.0.0.0'
		// inline: true,
	},
}
