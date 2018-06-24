const doSync = (sth, time) => new Promise(resolve => {
  setTimeout(() => {
    console.log(sth + '用了 ' + time + ' ms')
    resolve()
  }, time)
})

const doAsync = (sth, time, cb) => {
  setTimeout(() => {
    console.log(sth + '用了 ' + time + ' ms')
    cb && cb()
  }, time)
}

const doElse = (sth) => {
  console.log(sth)
}

const Jerry = { doSync, doAsync }
const Gril  = { doSync, doAsync, doElse }

~(async () => {
  console.log('case 1: 妹子来到门口')
  await Jerry.doSync('Jerry 刷牙', 1000)
  console.log('妹子啥也没干，一直等')
  await Gril.doSync('妹子洗澡', 2000)
  Gril.doElse('妹子去做别的事')

  console.log('case 3: 妹子来到门口按下感应器通知开关')
  Jerry.doAsync('Jerry 刷牙', 1000, () => {
    console.log('卫生间用完，感应器通知妹子来洗澡')
    Gril.doAsync('妹子洗澡', 2000)
  })
  Gril.doElse('妹子去做别的事')
})()