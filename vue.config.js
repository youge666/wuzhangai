const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([{ from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' }]),
      new CopyWebpackPlugin([{ from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' }]),
      new CopyWebpackPlugin([{ from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' }]),
      new CopyWebpackPlugin([{ from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' }])
    ],
    externals: {
      AMap: 'AMap' // 表示CDN引入的高德地图
    }
  }
}
