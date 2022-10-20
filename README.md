# 🛍️ Ecommerce Microservices Sample

> `Ecommerce Microservices` is a fictional ecommerce sample, built with Node.js and different software architecture and technologies like **Microservices Architecture**,  **NestJS**, **AWS Cloud Services** and **MongoDB**. An API Gateway service was used as an entry point to client requests. For communication between microservices, we used synchronous messaging with RabbitMQ.

💡 The aim of this application is to practice the development of microservices by using different technologies. Therefore,  this application is not business oriented.

## Service Boundary

`ECommerce Microservices` is a simple online ecommerce api sample that has the basic business scenario for online purchasing with some dedicated services. There four possible `Service` or `Bounded context` for above business:

- `API Gateway Service`: The API Gateway acts like an entry point to client requests. It is a REST API which provides users Authorization and Authentication through `Amazon Cognito`. Users needs to register once, then login to receive and access token. All services described below requires an Bearer token to be accessed.

- `Products Service`: The Products Service is responsible for creating, listing and updating Products.

- `Orders Service`: The Orders Service main purpose is to manage orders details created by users on client side. It can create an order based of product ids, list orders and also update order based on the related payment status.

- `Payments Service`: The payment service is responsible for payment process of orders. It is was responsible of updating order status after the payment is processed, and uses `Amazon Simple Email Service` to notify the user regarding payment status.

- `Payment Service`: The payment service is responsible for payment process of our customer with different payment process and managing and tracking our payment history

## Application Architecture

The bellow architecture shows that there is one public REST API (API Gateway) which is accessible for the clients. The API gateway uses a RabbitMQ message broker to communicate with each microservices. Microservices are event based which means they can publish and/or subscribe to any events occurring in the setup. By using this approach for communicating between services, each microservice does not need to know about the other services or handle errors occurred in other microservices. In addition, each microservice has its own MongoDB connection. The communication between microservices is also performed using RabbitMQ message broker.

![](./assets/diagram.jpeg)

