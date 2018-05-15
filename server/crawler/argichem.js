// 中国农药网

const puppeteer = require('puppeteer')

const url = `http://www.agrichem.cn/n/2018/05/09/092552899580.shtml`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

~(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],  // 不开启沙箱模式
    dumpio: false
  })

  const page = await browser.newPage()
  console.log('page.goto(url)')
  await page.goto(url, {        // 访问url
    waitUntil: 'networkidle2'   // 等待网络空闲时再释放控制权
  })
  console.log('page.networkidle2  ok')

  await sleep(2000)
  console.log('sleep 2000ms ok')

  const result = await page.evaluate(() => {
    var $ = window.$

    var content = $('#NavCenter')

    return $
  })

  browser.close()

  console.log(result)
})()