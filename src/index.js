import { promisify } from 'util'
import { resolve as r } from 'path'
import { readFile, writeFileSync as wfs, read } from 'fs'

promisify(readFile)(r(__dirname, '../package.json')).then(data => {
  data = JSON.parse(data)

  console.log(data.name)

  wfs(r(__dirname, './name'), String(data.name), 'utf-8')
})

async function init() {
  let data = await promisify(readFile)(r(__dirname, '../package.json'))

  data = JSON.parse(data)

  console.log('async:', data.name)
}

init()
