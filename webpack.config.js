const path = require("path");
var webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
	entry: {
		jquery: "./node_modules/jquery/dist/jquery.min.js",
		bootstrap: [
			"./node_modules/bootstrap/js/dist/alert.js",
			"./node_modules/bootstrap/js/dist/button.js"
		],
		main: ["./src/assets/scripts/main.js", "./src/assets/styles/main.css"],
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: 'assets/scripts/[name].js'
	},
	mode: "development",
	devtool: "source-map",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 3000,
		open: true,
		historyApiFallback: true,
		compress: true,
	},
	module: {
		rules: [{
				test: /\.js$/,
				enforce: 'pre',
				exclude: /(node_modules|bower_components)/,
				use: [{
						loader: "babel-loader",
						options: {
							presets: [
								["airbnb", {
									"targets": {
										"chrome": 50,
										"explorer": 11,
										"firefox": 45
									}
								}]
							]
						}
					},
					{
						loader: 'eslint-loader',
						options: {
							configFile: __dirname + '/.eslintrc'
						},
					}
				]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: true
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								sourceMap: true,
								config: {
									path: __dirname + '/postcss.config.js'
								}
							},
						},
					],
				}),
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: false,
						removeComments: true,
						collapseWhitespace: true
					}
				}],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [{
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "./assets/images/",
						publicPath: "./assets/images/",
					}
				}]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin('dist', {}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new ExtractTextPlugin({
			filename: 'assets/styles/main.css',
		}),
		new MiniCssExtractPlugin({
			filename: "assets/styles/main.css"
		}),
		new UglifyWebpackPlugin({
			uglifyOptions: {
				output: {
					comments: false
				},
				// compress: {
				//   	warnings: false,
				//  conditionals: true,
				//  unused: true,
				//  comparisons: true,
				//  sequences: true,
				//  dead_code: true,
				//  evaluate: true,
				//  if_return: true,
				//  join_vars: true,
				// },
			},
		}),
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			optipng: {
				optimizationLevel: 9
			},
			jpegtran: {
				progressive: true
			}
		})
	],
}