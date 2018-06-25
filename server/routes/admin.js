const {
  checkPassword
} = require('../service/admin')

const { 
  getAllMovies,
  findOneAndRemove
} = require('../service/movie')

const { controller, get, del, post, auth, admin, required } = require('../lib/decorator')

@controller('/admin')
export class adminController {
  @post('/login')
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
      ctx.session.user = {
        _id: matchData.user._id,
        email: matchData.user.email,
        role: matchData.user.role,
        username: matchData.user.username
      }

      return (ctx.body = {
        success: true
      })
    }

    ctx.body = {
      success: false,
      err: '密码不正确'
    }
  }

  @get('/movies')
  @auth
  @admin('admin')
  async getMoiveList(ctx) {
    const movies = await getAllMovies()

    ctx.body = {
      success: true,
      data: movies
    }
  }

  @del('/movies')
  @auth
  @admin('admin')
  @required({
    query: ['id']
  })
  async delMoive(ctx) {
    const id = ctx.query.id
    await findOneAndRemove(id)
    const movies = await getAllMovies()

    ctx.body = {
      success: true,
      data: movies
    }
  }

}
