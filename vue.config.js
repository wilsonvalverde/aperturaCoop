const webpack = require('webpack')
 
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl',
      }),
    ],
  },
  devServer: {
    port: 3001
}
}