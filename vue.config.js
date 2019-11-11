const TerserPlugin = require('terser-webpack-plugin');

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
    optimization: {
      runtimeChunk: 'single',
      splitChunks: false,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
        }),
      ],
    },
  },
  chainWebpack:
    config => {
      config.optimization.delete('splitChunks')
      config.optimization.delete('preload')
      config.optimization.delete('prefetch')
    }
      
}