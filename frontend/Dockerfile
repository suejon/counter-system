# pull official base image
FROM node:18-alpine3.14

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

# add app
COPY . ./

ARG ROUTER_HOSTNAME 
ARG ROUTER_PORT
RUN sh create-env-vars.sh REACT_APP_ROUTER_HOSTNAME=$ROUTER_HOSTNAME REACT_APP_ROUTER_PORT=$ROUTER_PORT

# start app
CMD ["npm", "start"]
