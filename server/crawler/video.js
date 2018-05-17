// 爬取详情页
const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/`
const doubanId = '24773958'

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })

~(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'], // 不开启沙箱模式
    dumpio: false
  })

  const page = await browser.newPage()

  await page.goto(base + doubanId, {
    // 访问url
    waitUntil: 'networkidle2' // 等待网络空闲时再释放控制权
  })

  await sleep(1200) // 为了让网页测地加载完，再等两秒钟

  const result = await page.evaluate(() => {
    // evaluate 在页面里执行JS脚本
    var $ = window.$
    var it = $('.related-pic-video')

    if (it && it.length > 0) {
      var link = it.attr('href')
      var cover = it.find('img').attr('src')
      if (cover) cover = cover.replace('?', '')

      return {
        link,
        cover
      }
    }

    return {}
  })

  let video

  // 如果有预告片视频地址
  if (result.link) {
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })
    await sleep(2000)

    video = await page.evaluate(() => {
      var $ = window.$
      var it = $('source')

      if(it && it.length > 0) {
        return it.attr('src')
      }

      return ''
    })
  }

  const data = {
    video,
    doubanId,
    cover: result.cover
  }

  browser.close()

  process.send(data)
  process.exit(0)
})()
