import webpack from 'webpack';
import path from 'path';

export default {
  mode: 'development',
  entry: {
    src: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname),
    publicPath: '/',
    filename: '[name]/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.html']
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
