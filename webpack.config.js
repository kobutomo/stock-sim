const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  stats: "minimal",
  output: {
    path: `${__dirname}/dist/`,
    filename: "[name].js",
    // sourceMapFilename: '[name].[hash:8].map',
    publicPath: "/js/"
  },
  devServer: {
    contentBase: `${__dirname}/dist`,
    host: "localhost",
    port: 3000,
    hot: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.html$/,
        use: "html-loader"
      }
    ]
  },
  resolve: {
    alias: {
      react: "preact/compat" // first try it with compat you can try preact after if it works
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/html/index.html"
    })
  ]
}
