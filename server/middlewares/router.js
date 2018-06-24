const { Route } = require('../libs/decorator')
const { resolve } = require('path')

export const router = app => {
  const apiPath = resolve(__dirname, '../routes')
  const router = new Route(app, apiPath)

  router.init()
}

// 只要执行此中间件，就等于执行了整个路由中间层