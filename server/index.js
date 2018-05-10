const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'Jerry Shi - ' + Date.now() 
})

app.listen(4441)