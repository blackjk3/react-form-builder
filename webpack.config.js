module.exports = {
  entry: ["webpack/hot/dev-server", "./app.js"],

  output: {
    filename: "app.js",
    path: __dirname + "/build",
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss']
  }
}