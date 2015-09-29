module.exports = function (webpackConfig) {
	webpackConfig.module = webpackConfig.module || {};
	webpackConfig.loaders = webpackConfig.loaders || [];

	webpackConfig.module.loaders.push({
		test: /\.html$/,
		exclude: /node_modules/,
		loader: 'raw-loader',
	});
};
