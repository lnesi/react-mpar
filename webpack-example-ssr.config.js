"use strict";
/*
 This file is a demo of a webpack pipeline build
 I recomend to actually use create react app and eject for a starting point
 Just use the following has a reference to refactor react webpack from CRA so
 you can reuse has much features and loaders from CRA
*/

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const resolve = require("resolve");

const config = require("./example-config.json");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const entries = {};
const publicPath = config.paths.serverRoot;

config.bundles.forEach(bundle => {
  entries[bundle.name] = [resolveApp(bundle.pathSSR)];
});

module.exports = {
  entry: entries,
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
  target: "node",
  output: {
    path: __dirname + "/demo/build",
    publicPath: publicPath,
    filename: "ssr-bundle.js",
    library: "module", //this will define the import
    libraryTarget: "commonjs"
  }
};
