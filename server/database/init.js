const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require("path");
// 使用node.js原生Promise替代mognoose内置的Promise
mongoose.Promise = global.Promise
// meta中间件: 记录创建日期和修改日期
mongoose.plugin(require('./plugins/meta'))

const db = 'mongodb://localhost/douban-trailer'

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'admin'
  })

  if (!user) {
    const user = new User({
      username: 'admin',
      email: 'szy0syz@gmail.com',
      password: 'lyp82nLF',
      role: 'admin'
    })

    await user.save()
  }
}

exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    if(process.env.NODE_ENV !== 'production') {
      // 开发环境打印debug日志
      mongoose.set('debug', true)
  
      // useMongoClient: true  // 仅在mongoose4.x时用
      mongoose.connect(db)
  
      mongoose.connection.on('disconnected', () => {
        maxConnectTimes++

        if(maxConnectTimes < 5) {
          mongoose.connect(db)
        } else {
          throw new Error('数据库连接5次都失败了')
        }
      })
  
      mongoose.connection.on('error', (err) => {
        maxConnectTimes++
        
        if(maxConnectTimes < 5) {
          mongoose.connect(db)
        } else {
          throw new Error('数据库连接5次都失败了')
        }
      })
  
      mongoose.connection.on('open', (err) => {
        // const Dog = mongoose.model('Dog', {name: String})
        // const sdog = new Dog({name: '大黑狗'})
        // sdog.save().then(()=> {
        //   console.log('ok~')
        // })

        resolve()
        console.info('MobgoDB connected successfully!')
      })
    }
  })

  
}
