var path = require('path');
var webpack = require( 'webpack');

module.exports = {
  entry: './app.js',

  output: {
    path: path.resolve('.'),
    filename: 'main.js',
    library: 'ReactFormBuilder',
    libraryTarget: 'umd'
  },

  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    // 'react': 'react',
    // 'react-dom': 'react-dom',
    // 'react-datepicker': 'react-datepicker',
    // 'classnames': 'classnames',
    // 'jquery': 'jquery',
    'bootstrap': 'bootstrap'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    alias: {
      "jquery": path.join(__dirname, "./jquery-stub.js")
    }
  },

  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ],

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js|.jsx?$/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader', options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      },
    ]
  }
};