FROM mhart/alpine-node:10

# Set the default working directory
WORKDIR /usr/src

# Install dependencies
COPY index.js server.js package.json yarn.lock ./

RUN yarn install

CMD ["node", "server.js"]
