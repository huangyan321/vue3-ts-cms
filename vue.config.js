// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AutoImport = require('unplugin-auto-import/webpack')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Components = require('unplugin-vue-components/webpack')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  outputDir: 'dist',
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
}
