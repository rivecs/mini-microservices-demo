### Mini Microservices Demo

A small, intentionally simple demo showing how a basic microservices-style setup can be wired together using Node.js and Express.

This project focuses on service boundaries and data aggregation rather than framework complexity or infrastructure details.

### What’s Included
User Service
-Provides basic user profile data.

### Order Service
-Returns a list of orders for a given user.

### API Gateway
-Aggregates data from multiple services into a single, frontend-friendly response.

Each service runs independently and communicates over HTTP.

### How It Works
The API Gateway exposes a single endpoint that:
-Calls the User Service
-Calls the Order Service
-Combines the results into one response

This mirrors a common backend-for-frontend or API gateway pattern used in real-world systems.

### Running Locally
Install dependencies in each service directory:
-npm install

### Start each service
-node index.js

### Ports
### User Service: 3001
### Order Service: 3002
### API Gateway: 3000

### Example Request
GET http://localhost:3000/profile/123

The response includes both user data and related orders in a single payload.

### Notes
This setup is intended for local development and demonstration purposes only. In a production environment, additional concerns such as service discovery, retries, timeouts, authentication, and centralized logging would need to be addressed.

### Why I Built This
I built this project to demonstrate how I approach real-world systems rather than toy examples. Instead of focusing on features, the goal is to show how I think about service boundaries, data aggregation, and clarity when working with multiple moving parts.

This reflects the kind of work I’ve done professionally: reading existing systems, improving structure, and making behavior easier to understand and reason about. It’s intentionally small, but designed to highlight patterns I’ve used in production environments.