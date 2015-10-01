module.exports = function (webpackConfig) {
	webpackConfig.module = webpackConfig.module || {};
	webpackConfig.loaders = webpackConfig.loaders || [];

	webpackConfig.module.loaders.push({
		test: /\.css$/,
		loader: 'style-loader!css-loader',
	});
};
