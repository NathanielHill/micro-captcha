const { createServer } = require('http')
const { parse } = require('url')
const fetch = require('isomorphic-unfetch')

if (!process.env.CAPTCHA_SECRET) {
  throw new Error('You must provide the CAPTCHA_SECRET environment variable!')
}

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET
const PORT = parseInt(process.env.PORT, 10) || 80

createServer((req, res) => {
  let RESPONSE = parse(req.url, true).query.response
  if (!RESPONSE) {
    res.writeHead(400)
    res.end()
  } else {
    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET}&response=${RESPONSE}`)
      .then(r => r.json())
      .then(data => {
        if (!data.success) {
          res.writeHead(403, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ verified: data.success }))
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ verified: data.success }))
        }
      })
  }
}).listen(PORT)
