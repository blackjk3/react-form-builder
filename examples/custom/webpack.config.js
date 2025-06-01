var path = require('path');

module.exports = {
  entry: './app.js',

  output: {
    path: path.resolve('.'),
    filename: 'bundle.js',
    library: 'ReactFormBuilder',
    libraryTarget: 'umd'
  },

  externals: {
    'bootstrap': 'bootstrap'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    alias: {
      "jquery": path.join(__dirname, "./jquery-stub.js")
    }
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js|.jsx?$/,
        use: [
          { loader: 'babel-loader' }
        ]
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
        ]
      }
    ]
  }
};
