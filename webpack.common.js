const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },

  entry: {
    app: './src/index.jsx'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
      test: /\.(js|jsx)$/,
      use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              'babel-plugin-styled-components',
              '@babel/plugin-proposal-class-properties'
            ]
          },
        }
      },
      {
        test: /\.css$/,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, { loader: "css-loader" }]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].[hash].css",
    }),
    new webpack.HashedModuleIdsPlugin()
  ],

  output: {
    filename: isDev ? '[name].bundle.js' : '[name].[hash].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },

  optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	}
}
