const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed  // Mixed 适用于数据类型和结构变化比较平凡的场景

const MovieSchema = new Schema({
  doubanId: String,
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

  meate: {
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