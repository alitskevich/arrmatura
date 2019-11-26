var path = require('path')

module.exports = {
  entry: './lib/dom.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd2',
    globalObject: 'this',
  },
  module: {
    rules: [
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
