const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { Mixed, ObjectId } = Schema.Types

const MovieSchema = new Schema({
  doubanId: {
    unique: true,
    type: String
  },

  category: {
    type: ObjectId,
    ref: 'Category'
  },

  rate: Number,
  title: String,
  summary: String,
  video: String,
  poster: String,
  cover: String,

  rawTile: String,
  movieTypes: [String],
  pubdate: Mixed,  // 值可能是单一值，也有可能是数据
  year: Number,

  tags: [String],

  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

MovieSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Movie', MovieSchema)
