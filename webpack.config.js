const path = require('path');

module.exports = {
	entry: { mainPage: './src/mainIndex.js', createEvent: './src/createEvent.js' },
	output: { filename: '[name].js', path: path.resolve(__dirname, 'dist/scripts') },
	//change this to production when you want to deploy :<
	mode: 'development',
	resolve: { extensions: ['*', '.js', '.jsx'] },

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: { presets: ['@babel/env'] },
			},
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.(png|svg|jpg|jpeg|gif|ico)$/, use: ['file-loader'] },
		],
	},
};
