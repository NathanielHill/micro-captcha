const { createServer } = require('http')
const { parse } = require('url')
const fetch = require('isomorphic-unfetch')

const microCaptcha = ({secret, port = '80', log = true}) => {

  createServer((req, res) => {
    let RESPONSE = parse(req.url, true).query.response
    if (!RESPONSE) {
      res.writeHead(400)
      res.end()
      if (log) console.log('Bad request to micro-captcha! Query: ', req.url)
    } else {
      fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${RESPONSE}`)
        .then(r => {
          if (r.ok) return r.json()
          if (log) console.log('Bad response from Google: ', r.status)
        })
        .then(data => {
          if (!data.success) {
            res.writeHead(403, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ verified: data.success }))
            if (log) console.log('Verification failed:', data['error-codes'], 'input-response:', RESPONSE)
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ verified: data.success }))
            if (log) console.log('OK! User verified: ', RESPONSE)
          }
        })
    }
  }).listen(port)
}

module.exports = microCaptcha
