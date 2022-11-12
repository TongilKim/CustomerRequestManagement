const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.baseURL": JSON.stringify("http://localhost:5050/api"),
    }),
  ],
};
