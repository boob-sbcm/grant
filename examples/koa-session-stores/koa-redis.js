
// https://github.com/koajs/generic-session
// https://github.com/koajs/koa-redis

var koa = require('koa')
var session = require('koa-generic-session')
var store = require('koa-redis')
var mount = require('koa-mount')
var router = require('koa-router')
var koaqs = require('koa-qs')
var grant = require('grant-koa')

var config = require('./config.json')


var app = koa()
app.keys = ['grant']
app.use(session({store: store()}))
app.use(mount(grant(config)))
app.use(router(app))
koaqs(app)

app
  .get('/facebook_callback', function* (next) {
    this.body = JSON.stringify(this.session.grant.response, null, 2)
  })
  .get('/twitter_callback', function* (next) {
    this.body = JSON.stringify(this.session.grant.response, null, 2)
  })
  .listen(3000, () => console.log(`Koa server listening on port ${3000}`))
