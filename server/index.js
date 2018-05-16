const Koa = require('koa')
const app = new Koa()
const pug = require('pug')

const { normal, pugTpl } = require('./tpl')

app.use(async (ctx, next) => {
  ctx.type = 'text/html; charset=utf-8'
  ctx.body = pug.render(pugTpl, {
    you: 'Tom',
    me: 'Jerry'
  })
})

app.listen(4455)