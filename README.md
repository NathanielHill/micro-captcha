# Micro-Captcha
Simple Google ReCAPTCHA microservice for [Zeit Now](https://zeit.co/now)

## Usage

If you haven't installed `now` already, start by following [these instructions](https://zeit.co/docs/getting-started/installation)

To deploy the service use the following command:

```
now NathanielHill/micro-captcha
```

You'll be asked to provide `CAPTCHA_SECRET` which is the secret key provided by Google.

You can also provide the key on the command line with the `-e` option:

```
now -e CAPTCHA_SECRET=<your-secret-key> NathanielHill/micro-captcha
```

> You may also set the port with the `PORT` environment variable.

Or if you'd like to use [now secrets](https://zeit.co/docs/getting-started/secrets) to store the key:

```
now secrets add captcha_secret "<your-secret-key>"
now -e CAPTCHA_SECRET=@captcha_secret NathanielHill/micro-captcha
```

After the deployment is complete you can create an alias for your custom domain:

```
now alias <unique-deployment-url> captcha.<your-domain.com>
```

Zeit may create multiple instances of your deployment by default, you should [scale](https://zeit.co/docs/features/scaling) your captcha service according to your needs.

You may also wish to use [path aliases](https://zeit.co/docs/features/path-aliases) to unify your microservices on a single domain:

Create a file called rules.json and add the following content:

```
{
  "rules": [
    { "pathname": "/api/captcha", "method": ["GET"], "dest": "captcha.<your-domain.com>" },
    { "dest": "<your-domain.com>" }
  ]
}
```

Then run the following command:

```
now alias <your-domain.com> -r rules.json
```

## Author

- Nathaniel Hill ([@NathanielHill](https://github.com/NathanielHill))
