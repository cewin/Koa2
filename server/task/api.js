const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

async function fetchMovie (item) {
  // http://api.douban.com/v2/movie/subject/24773958
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const res = await rp(url)

  const res
}

~(async () => {
  let movies = await Movie.find({
    // 过滤或条件集合
    $or: [ // 只要满意其中之一都过滤拿出来
      { summary: { $exists: false } }, // summary不存在
      { summary: null },
      { summary: '' },
      { title: '' }
    ]
  })

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    let movieData = await fetchMovie(movie)

    if (movieData) {
      movie.tags = movieData.tags || []
      movie.title = movieData.alt_title || movieData.title || ''
      movie.rawTitle = movieData.rawTitle || movieData.title || ''

      if (movieData.attrs) {
        movie.movieTypes = movieData.attrs.movie_type || []

        movie.movieTypes.forEach(async item => {
          let cat = await Category.findOne({
            name: item
          })

          if (!cat) {
            cat = new Category({
              name: item,
              movies: [movie._id]
            })
          } else {
            if (cat.movies.indexOf(movie._id) === -1) {
              cat.movies.push(movie._id)
            }
          }

          await cat.save() // cat is entiry  // 8-7   12:00
        })

        let dates = movieData.attrs.pubdate || []
      }

    }
  }

  movies.forEach(async movie => {
    let movieData = await fetchMovie(movie)

    try {
      movieData = JSON.parse(movieData)
    } catch (err) {
      console.error(err)
    }
  })
})()