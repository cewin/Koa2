const Koa = require("koa")
const pug = require("pug")
const views = require("koa-views")
const { resolve } = require("path")
const { connect, initSchemas } = require("./database/init")

const mongoose = require('mongoose')

~(async () => {
  await connect()
  // 加载所有schemas
  initSchemas()

  const Movie = mongoose.model('Movie')
  const movies = await Movie.find({})

  console.log('~~movies: ', movies)
})()

const app = new Koa();
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
