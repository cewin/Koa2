const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

export const getAllMovies = async (type, year) => {
  let query = {}

  if (type) {
    query.moveTypes = {
      $in: [type]
    }
  }

  if (year) {
    query.year = year
  }

  const movies = await Movie.find(query)

  return movies
}

export const getMovieDetail = async (_id) => {
  const movie = await Movie.findOne({_id})

  return movie
}

export const getRelativeMoves = async (movie) => {
  const movies = await Movie.find({
    movietypes: {
      $in: movie.genres
    }
  })

  return movies
}