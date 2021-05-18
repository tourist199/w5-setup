const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path');

let mode = "development";

// Temporary workaround for 'browserslist' bug that is being patched in the near future
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

if (process.env.NODE_ENV === "production")
  mode = "production"


module.exports = {
  mode,
  target,

  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: "images/[hash][ext][query]"
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } }
          , "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        // type: "asset/inline/resource"
        type: "asset",
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   }
        // }
      }
    ]

  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({
    template: "./src/index.html"
  }), new CleanWebpackPlugin()],

  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  }
}