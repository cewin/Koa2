const mongoose = require('mongoose')

const {controller, get} = require('../libs/decorator')

@controller('/api/v0/movies')
export class movieController {
  @get('/')
  @login
  @admin(['developer'])
  @log
  async getMovies(ctx, next) {
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({}).sort({
      'meta.createAt': -1
    })

    ctx.body = {
      movies
    }
  }

  @get('/:id')
  async getMovieDetail(ctx, next) {
    const Movie = mongoose.model('Movie')
    const _id = ctx.params.id

    const movie = await Movie.findOne({ _id })

    ctx.body = {
      movie
    }
  }
}
