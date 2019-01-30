import bodyParser from 'body-parser'
import session from 'express-session'

export default {
  head: {
    title: 'Auth Routes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'Auth Routes example' }
    ],
    link:[
      {rel:'stylesheet', href:'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'},
      {rel:'stylesheet', href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'},
      {rel:'stylesheet', href:'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css'}
    ]
  },
  /*
  ** Add server middleware
  ** Nuxt.js uses `connect` module as server
  ** So most of express middleware works with nuxt.js server middleware
  */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api',
    '~/auth'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    'semantic-ui-vue/nuxt'

    // Or if you have custom bootstrap CSS...
    //['bootstrap-vue/nuxt', { css: false }],
  ]

}
