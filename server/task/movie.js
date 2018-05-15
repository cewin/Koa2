const cp = require('child_process')
const { resolve } = require('path')

~(async () => {
  // 拿到脚本
  const srcipt = resolve(__dirname, '../crawler/trailer-list')
  // 派生子进程
  const child = cp.fork(srcipt, [])
  // 子进程标识符
  let invoked = false

  // 因为child_process继承Emitter(事件循环)，所以我们可以注册监听事件
  child.on('error', err => {
    if (invoked) return

    invoked = true

    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return

    invoked = false
    let err = code === 0 ? null : new Error('exit code: ' + code)

    console.error(err)
  })

  // 获取消息
  child.on('message', data => {
    let result = data.result

    console.log(result)
  })
})()