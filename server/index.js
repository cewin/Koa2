const Koa = require("koa");
const pug = require("pug");
const views = require("koa-views");
const { resolve } = require("path");
const { connect } = require("./database/init");

~(async () => {
  await connect()
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
