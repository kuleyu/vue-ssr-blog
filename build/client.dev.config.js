const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// const utils = require('./utils')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// process.env.NODE_ENV = 'development'

module.exports = merge(baseConfig, {
  entry: {
    app: './src/entry-client.js'
  },

  module: {
    // rules: utils.styleLoaders({ sourceMap: true })
  },

  resolve: {
    alias: {
      'api': './client-api.js'
    }
  },

  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),

    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),

    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),

    new FriendlyErrorsPlugin()
  ]
})
