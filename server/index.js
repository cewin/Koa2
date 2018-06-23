const Koa = require("koa")
const pug = require("pug")
const views = require("koa-views")
const { resolve } = require("path")

const { connect, initSchemas } = require("./database/init")
const Router = require('./routes')

const mongoose = require('mongoose')

~(async () => {
  await connect()
  // 加载所有schemas
  await initSchemas()

  const Movie = mongoose.model('Movie')
  // const rr = await Movie.find({})
  // require('./task/movie')
  // require('./task/api')
})()

const app = new Koa()

app.use(
  views(resolve(__dirname, "./views"), {
    extension: "pug"
  })
);

app.use(async (ctx, next) => {
  await ctx.render("index", {
    you: "Tom",
    me: "Jerry"
  });
});

app.listen(4455);
