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
    path: path.resolve(__dirname, 'docs'),
    filename: 'index.js',
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
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  mode: 'development'
}
