# Micro-Captcha

[![npm version](https://badge.fury.io/js/micro-captcha.svg)](https://badge.fury.io/js/micro-captcha)
[![Coverage Status](https://coveralls.io/repos/github/NathanielHill/micro-captcha/badge.svg?branch=master)](https://coveralls.io/github/NathanielHill/micro-captcha?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/NathanielHill/micro-captcha.svg)](https://greenkeeper.io/)

Simple Google ReCAPTCHA microservice for [Zeit Now](https://zeit.co/now).
(does not yet work with the new ReCAPTCHA v3.)

Can also be imported and used a node module.

## Usage

### How to use on Zeit Now 2.0
  
Define an `/api/captcha` [lambda](https://zeit.co/docs/v2/deployments/concepts/lambdas/) in `now.json` with the following:


```
import microCaptcha from 'micro-captcha'

export default microCaptcha({ secret: process.env.RECAPTCHA_SECRET_KEY })
```


Make sure to also set `RECAPTCHA_SECREY_KEY` to be [available at runtime](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/#from-now.json).


Now on the client side you'll want to pick your favorite ReCAPTCHA component (or roll your own) and use a handler like so:


```
onVerify () {
  fetch(`/api/captcha?response=${captchaResponse}`)
    .then(r => {
      if (r.ok) return r.json()
      throw new Error('failed to verify humanity')
    })
    .then(({ verified }) => {
      if (verified) {
        ... // Notify user of success!
      }
    })
}
```

Of course, you likely want to actually perform some action server-side, in which case it's best to use your `/api/captcha` endpoint indirectly. For an example see: [micro-captcha-example](https://github.com/NathanielHill/micro-captcha-example)


<details>
  <summary>Use as a node module</summary>

  Can also be used as a node module which can be useful for local development.

  To install:

  ```
  yarn add micro-captcha
  ```
  or
  ```
  npm install --save micro-captcha
  ```

  The default export takes a config option (where `secret` is the only required key) and runs the microservice. Usage will look something like this:

  ```
  const microCaptcha = require('micro-captcha')

  microCaptcha({ secret: process.env.CAPTCHA_SECRET, port: process.env.PORT, log = true })
  ```

</details>

## Author

- Nathaniel Hill ([@NathanielHill](https://github.com/NathanielHill))
