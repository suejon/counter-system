# Overview

This is my submission for the picky assessment.
The service starts a front end web application which will +1 to a number starting from 0, every second (unless paused or stopped), until it reaches 100.

## How to run

To demo this project run the following:
```
docker-compose up
```

and navigate to `localhost:3000` in your browser (use chrome for best results).

## Design
![alt text](assets/diagram.png)

This project is made up of 3 components:

### Frontend 
  
React application that controls the counter by either starting, pausing, or cancelling it. It establishes a websocket connection with the router component.

### Router

NodeJs application that accepts connections from both the frontend and backend components and routes them accordingly over websockets.

### Backend

Python application which receives signals from the router which indicate one of the following acitons: start counting, pause counting, cancel counting. It sends the sum value back to the router over websockets.

## Project Structure
```
.
├── docker-compose.yml          (1)
├── backend
│   └── src                     (2)
├── frontend
│   ├── create-env-vars.sh      (3)
│   └── src                     (4)
└── router
    └── src                     (5)
```

1. docker-compose file for spinning up services
1. application code for backend app
1. helper script for injecting environment variables into frontend app container (react)
1. application code for frontend app
1. application code for router app

## Considerations and Improvements

Given the multiple components required in the system, i kept the implementation simple in the interest of time and clarity. There are definitely some improvements i would consider making if i can more time which include:

### Websocket connection handling

The low level implementations of websockets used across the applications currently do not handle connection issues such as disconnect and reconnect. Since this has been deployed within a local network, i left out the requirment for handling connection problems. However, in a production system which could be geographically distributed, it is absolutely the cient's responsibility to provide logic for handling network related websocket connection issues.

### Single thread processes

As the application is designed to run across a single thread for each of the components, it was decided to retain a simple implementation for message routing, where all messages arriving to the rotuer from the front end would be forwarded to the backend, and vice versa. Under a situation where there are multiple instances of the front end or backend, the solution could benefit from more intelligent routing such as maintaining channel context for each client with an identifier.

### React application started in development mode
In a production environment i would package and serve the web app through a web server such as NGINX, rather than directly start up the react app using `npm start` which is not optimized for performance.


