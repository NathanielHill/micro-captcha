const microCaptcha = require('./index.js')
const test = require('ava')

test('microCaptcha is a function', t => {
  (typeof microCaptcha === 'function')
    ? t.pass('microCaptcha is a funtion')
    : t.fail('microCaptcha is not a function')
})

test('microCaptcha fails with no argument object', t => {
  try {
    microCaptcha()
    t.fail('microCaptcha does not fail with no argument object')
  } catch (e) {
    t.pass(e.message)
  }
})

test('microCaptcha fails without a secret', t => {
  try {
    microCaptcha({})
    t.fail('microCaptcha does not fail without a secret')
  } catch (e) {
    t.pass(e.message)
  }
})
