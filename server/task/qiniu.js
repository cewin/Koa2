const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
cfg.zone = qiniu.zone.Zone_z2 // 设置华南
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

~(async () => {
  let movies = [
    {
      video: 'http://vt1.doubanio.com/201805180038/1e6ef4054aaedfd836edd21a3b592fff/view/movie/M/402290272.mp4',
      doubanId: 26887174,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2517077652.jpg',
      cover: 'https://img3.doubanio.com/img/trailer/medium/2517783303.jpg'
    }
  ]

  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')

        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }

        console.log(movie)
      } catch (err) {
        console.error(err)
      }
    }
  })
})()
