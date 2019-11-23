const TerserPlugin = require('terser-webpack-plugin');
const path = require('path')
module.exports = {

  filenameHashing: false,
  runtimeCompiler: false,
  configureWebpack: {
    entry: {
        app: './src/main.js'
    },
    output: {
      filename: 'rockiot.[name].js'
    },
    resolve: {
      alias: {
       vue$: "vue/dist/vue.esm.js"
      },
      extensions: ["*", ".js", ".vue", ".json"]
     },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: false,
      //minimize: true,
      //minimizer: [
      //  new TerserPlugin({
      //    test: /\.js(\?.*)?$/i,
      //  }),
      //],
    },
  },
  chainWebpack:
    config => {
      config.optimization.delete('splitChunks')
      config.optimization.delete('preload')
      config.optimization.delete('prefetch')
    }

}
