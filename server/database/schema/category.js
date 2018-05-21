const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const ObjectId = Schema.Types.ObjectId

const CategorySchema = new Schema({
  name: {
    unique: true,
    type: String
  },
  movies: [
    {
      type: ObjectId,
      ref: 'Movie'
    }
  ],

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

CategorySchema.pre('save', next => {
  if(this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
})

mongoose.model('Category', CategorySchema)
