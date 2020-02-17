// eslint-disable-next-line no-undef
var path = require('path')

module.exports = {
  entry: {
    index: [
      './index.js'
    ],
    app: [
      './app/index.js'
    ],
    ultis: [
      './ultis/index.js'
    ],
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'docs'),
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
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
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
