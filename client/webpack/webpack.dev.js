const webpack = require("webpack");

module.exports = {
  mode: "development",
  devServer: {
    open: true,
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.baseURL": JSON.stringify("http://localhost:5050/api"),
    }),
  ],
};
