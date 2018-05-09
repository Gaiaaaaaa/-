var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://172.0.0.1:8080"',111
  BASE_API: '"http://172.18.100.232:8285"',
  //BASE_API: '"http://172.16.8.32:8099"'
  // BASE_API: '"https://easy-mock.com/mock/5a0273ad6be3e9439ddf89b9/example"',
})

