import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import logger from 'koa-logger'

export const addBodyParser = app => {
  app.use(bodyParser())
}

export const addLogger = app => {
  app.use(logger())
}

export const addSession = app => {
  app.keys = ['jerry-4444']

  const COMFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false
  }

  app.use(session(COMFIG, app))
}