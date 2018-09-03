'use strict';

const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('bundle.css');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (options) => {
  const dest = Path.join(__dirname, 'dist');

  let webpackConfig = {
    devtool: options.devtool,
    entry: {
        'dist/index': './src/scripts/index',
        'dist/menu': './src/scripts/menu',
        'dist/form': './src/scripts/form'
    },
    output: {
      path: dest,
      filename: '[name].js'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new HtmlWebpackPlugin({
        template: './views/index.html'
      }),
      new CopyWebpackPlugin([
        { from: 'src/images', to: 'images' },
        { from: 'src/fonts', to: 'fonts'},
        { from: 'views', to: 'views'}
      ])
    ],
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
    }
    };

  if (options.isProduction) {
    webpackConfig.entry = {
        'index': './src/scripts/index',
        'menu': './src/scripts/menu',
        'form': './src/scripts/form'
    };

    webpackConfig.plugins.push(
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      ExtractSASS
    );

    webpackConfig.module.rules.push({
      test: /\.scss$/i,
      use: ExtractSASS.extract(['css-loader', 'sass-loader'])
    });

  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.module.rules.push({
      test: /\.scss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.js$/,
      use: 'eslint-loader',
      exclude: /node_modules/
    });

    webpackConfig.devServer = {
      contentBase: dest,
      hot: true,
      port: options.port,
      inline: true
    };
  }

  return webpackConfig;

};
