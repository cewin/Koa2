const { resolve } = require("path")
const { Route } = require('../libs/decorator')

// 只要执行此中间件，就等于执行了整个路由中间层
module.exports = {
  router: app => {
    const apiPath = resolve(__dirname, './routers')
    const router = new Route(app, apiPath)

    router.init()
  }
}
