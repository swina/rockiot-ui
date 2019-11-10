const path = require("path")
const webpack = require('webpack')
const glob = require("glob")
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  configureWebpack: {
    entry: {
        main: './src/main.js'
    },
    output: {
      filename: 'rockiot.[name].js'
    },
    optimization: {
      splitChunks: false,
      
    },
  },
  chainWebpack:
    config => {
      config.optimization.delete('splitChunks')
    }
      
}