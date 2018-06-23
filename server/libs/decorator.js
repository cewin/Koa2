const Router = require('koa-router')
const { resolve } = require('path')
const glob = require('glob')
const _ = require('lodash')

const symbolPrefix = Symbol('prefix')
const routeMap = new Map()

const isArray = c => _.isArray(c) ? c : [c]

export class Route {
  constructor(app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init() {
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)

    // 为所有中间件注册路由
    for (let [conf, controller] of routeMap) {
      const controllers = isArray(controller)
      const prefixPath = conf.target[symbolPrefix]
      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      this.router[conf.method](routerPath, ...controllers)
    }

    this.app.use(this.router.routes()).use(Router.allowedMethods())
  }
}

// 如果是根路径就直接访问，如果不是就接着访问
const normalizePath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)

  routeMap.set({
    target,
    ...conf
  }, target[key])

}

// export 利用symbol创建唯一值在类的原型上
export const controller = path => target => (target.prototype[symbolPrefix] = path)

export const get = path => router({
  method: 'get',
  path
})

export const post = path => router({
  method: 'post',
  path
})

export const put = path => router({
  method: 'put',
  path
})

export const del = path => router({
  method: 'del',
  path
})

export const use = path => router({
  method: 'use',
  path
})

export const all = path => router({
  method: 'all',
  path
})