# Mini Microservices Demo

A minimal example of a microservices architecture using Node.js and Express.

## Services
- User Service
- Order Service
- API Gateway

Each service runs independently and communicates over HTTP.

## Running

Install dependencies in each service:

npm install

Run each service:

node index.js

Ports:
- User Service: 3001
- Order Service: 3002
- API Gateway: 3000

Example:
GET http://localhost:3000/profile/123
