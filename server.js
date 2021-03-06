const microCaptcha = require('./index.js')

if (!process.env.CAPTCHA_SECRET) {
  throw new Error('You must provide the CAPTCHA_SECRET environment variable!')
}

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET
const PORT = parseInt(process.env.PORT, 10) || 3000
const LOG = !(process.env.LOG === 'false')

module.exports = microCaptcha({ secret: CAPTCHA_SECRET, port: PORT, log: LOG })
