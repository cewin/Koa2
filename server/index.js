const Koa = require("koa")
const { resolve } = require("path")
const R = require('ramda')

const { connect, initSchemas, initAdmin } = require("./database/init")

const MIDDLEWARES = ['common' ,'router']

const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)  // 相当于把加载出来的函数调用
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

~(async () => {
  await connect()
  // 加载所有schemas
  await initSchemas()

  // 创建默认管理员账号
  await initAdmin()

  // const rr = await Movie.find({})
  // require('./task/movie')
  // require('./task/api')

  const app = new Koa()
  await useMiddlewares(app)

  app.listen(4455)
})()
