const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src/index.js'), // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
      favicon: 'src/favicon.ico',
      filename: 'index.html',
      hash: true,
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
          plugins: ['react-hot-loader/babel'],
        },
      },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: {
            'application/font-woff': ['woff', 'woff2'],
            'application/octet-stream': ['ttf', 'eot'],
            'image/svg+xml': ['svg'],
            'image/png': ['png'],
            'image/jpeg': ['jpg', 'jpeg'],
            'image/gif': ['gif'],
            'image/x-icon': ['ico'],
            esModule: false,
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          esModule: false,
        },
      },
      {
        test: /(\.css|\.scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};
