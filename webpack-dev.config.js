const FlowWebpackPlugin = require("flow-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/test",
    publicPath: "/",
    filename: "index.js"
  },
  plugins: [new FlowWebpackPlugin()],
  devServer: {
    contentBase: "./test"
  }
};
