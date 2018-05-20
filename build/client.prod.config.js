const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const utils = require('./utils')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// process.env.NODE_ENV = 'production'

module.exports = merge(baseConfig, {
  module: {
    // rules: utils.styleLoaders({
    //   sourceMap: true,
    //   extract: true
    // })
  },

  resolve: {
    alias: {
      'api': './client-api.js'
    }
  },

  entry: {
    app: './src/entry-client.js'
  },

  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },

  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),

    // new ExtractTextPlugin({
    //   filename: 'common.[chunkhash].css'
    // }),

    // new OptimizeCSSPlugin(),

    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: './src/index.template.html',
    //   inject: true,
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),

    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),

    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),

    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})
