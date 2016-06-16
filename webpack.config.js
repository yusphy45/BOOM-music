//引入各种工具和插件
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');
//定义一些路径
const ROOT_PATH = path.resolve(__dirname);
const MAIN_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const TEMP_PATH = path.resolve(ROOT_PATH, 'src/template');

var isProduction = process.env.NODE_ENV === 'production';

var plugins = [
  new htmlWebpackPlugin({
    title: 'BOOM-music',
    template: path.resolve(TEMP_PATH, 'index.html'),
    filename: 'index.html',
    inject: false
  })
];

if (isProduction) {
  plugins.push.apply(plugins, [
    new ExtractTextPlugin('[name].[contenthash:6].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warning: false
      },
      sourceMap: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new CommonsChunkPlugin('vendor', '[name].[hash:6].js')
  ])
} else {
  plugins.push.apply(plugins, [
    new ExtractTextPlugin('[name].css'),
    new CommonsChunkPlugin('vendor', '[name].js')
  ]);
  module.exports.devtools = '#source-map'
}

module.exports = {
  entry: {
    app: path.join(MAIN_PATH, 'index.js')
  },

  output: {
    path: BUILD_PATH,
    publicPath: '/dist/',
    filename: isProduction ? '[name].[chunkhash:6].js' : '[name].js'
  },

  resolve: {
    root: [process.cwd() + '/src', process.cwd() + '/node_modules'],
    extensions: ['', '.js', '.css', '.png', '.scss', '.png', '.jpg', '.jpeg', '.gif']
  },

  module: {
    preloaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        exclude: /bower_components|node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /bower_components|node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass!postcss')
      },
      {
        test: /(gif|png|jpg|jpeg|svg|ttf|woff2|woff|eot)\W+$/,
        loaders: ['url?limit=20000&name=[path][name].[hash:6].[ext]']
      },
      {
        test: /\.vue$/,
        loaders: ['vue']
      }
    ]
  },

  eslint: {
    configFile: path.resolve(ROOT_PATH, '.eslintrc')
  },

  postcss(){
    return [px2rem({remUnit: 75}), autoprefixer];
  },

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },

  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('style', 'css!sass!postcss')
    }
  },

  devtools: 'eval-source-map',

  plugins: plugins,

  devServer: {
    //hot: true
  }
};