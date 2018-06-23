class Boy {
  @speak('云南话')
  run() {
    console.log('I can run!')
    console.log('I can speak ' + this.lang)
  }
}

function speak(lang) {
  return function (target, key, descriptor) {
    console.log(target)
    console.log(key)
    console.log(descriptor)
    target.lang = lang

    return descriptor
  }
}

const jerry = new Boy()

jerry.run()