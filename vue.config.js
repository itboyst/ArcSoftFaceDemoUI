const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    port: 8088,
    proxy: {
      "/": {
        target: "http://127.0.0.1:8089",
        changeOrigin: true,
        ws: false,
      }
    }}
})
