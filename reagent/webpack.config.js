// eslint-disable-next-line no-undef
var path = require('path')

module.exports = {
  entry: {
    index: [
      './index.js'
    ],
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, ''),
    filename: '[name].js',
    libraryTarget: 'umd2',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  mode: 'development'
}
