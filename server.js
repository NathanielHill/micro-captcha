const { createServer } = require('http')
const { parse } = require('url')
const fetch = require('isomorphic-unfetch')

if (!process.env.CAPTCHA_SECRET) {
  throw new Error('You must provide the CAPTCHA_SECRET environment variable!')
}

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET
const PORT = parseInt(process.env.PORT, 10) || 80
const LOG = !(process.env.LOG === 'false')

createServer((req, res) => {
  let RESPONSE = parse(req.url, true).query.response
  console.log(RESPONSE)
  if (!RESPONSE) {
    res.writeHead(400)
    res.end()
    if (LOG) console.log('Bad request to micro-captcha! Query: ', req.url)
  } else {
    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET}&response=${RESPONSE}`)
      .then(r => {
        if (r.ok) return r.json()
        if (LOG) console.log('Bad response from Google: ', r.status)
      })
      .then(data => {
        if (!data.success) {
          res.writeHead(403, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ verified: data.success }))
          if (LOG) console.log('Verification failed:', data['error-codes'], 'input-response:', RESPONSE)
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ verified: data.success }))
          if (LOG) console.log('OK! User verified: ', RESPONSE)
        }
      })
  }
}).listen(PORT)
