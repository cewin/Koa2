const {
  checkPassword
} = require('../service/admin')

const { 
  getAllMovies
} = require('../service/movie')

const { controller, get, post, auth, admin, required } = require('../lib/decorator')

@controller('/admin')
export class adminController {
  @post('/')
  @required({
    body: ['email', 'password']
  })
  async login(ctx, next) {
    const { email, password } = ctx.request.body
    const matchData = await checkPassword(email, password)

    if (!matchData.user) {
      return (ctx.body = {
        success: false,
        err: '用户不存在'
      })
    }

    if (matchData.match) {
      return (ctx.body = {
        success: true
      })
    }

    ctx.body = {
      success: false,
      err: '密码不正确'
    }
  }

  @get('/movie/list')
  @auth
  @admin('admin')
  async getMoiveList(ctx) {
    const movies = await getAllMovies()

    ctx.body = {
      success: true,
      data: movies
    }
  }
}
