// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AutoImport = require('unplugin-auto-import/webpack')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Components = require('unplugin-vue-components/webpack')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
  outputDir: 'dist',
  publicPath: './',
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('unplugin-element-plus/webpack').default({
        // options
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.ts', '.js', '.vue']
    }
  }
}
