const { 
  getAllMovies,
  getMovieDetail,
  getRelativeMoves
} = require('../service/movie')

const { controller, get } = require('../libs/decorator')

@controller('/api/v0/movies')
export class movieController {
  @get('/')
  @login
  @admin(['developer'])
  @log
  async getMovies(ctx, next) {
    const { type, year } = ctx.query
    const movies = await getAllMovies(type, year)

    ctx.body = {
      movies
    }
  }

  @get('/:id')
  async getMovie(ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    const relativeMovies = await getRelativeMoves(movie)

    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}
