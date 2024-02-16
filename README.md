<div align="center" id="top"> 
 
  &#xa0;

</div>

<h1 align="center">VZY Api</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/certifiedTboy/vzy-api?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/certifiedTboy/vzy-api?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/certifiedTboy/vzy-api?color=56BEB8">

</p>

- [Introduction](#Introduction)
- [Technologies](#Technologies)
- [Enviromental Variables](#Enviromental-Variables)
- [Get Started](#Get-Started)
- [CRUD Operations](#Crud-Operations)
- [Authentication Flow](#Authentication-Handling)
- [API Documentation](#API-Documentation)

<br>

## Introduction

This is a simple API build for VZY assessement

## Technologies

The following technologies were used:

- [Node Js](#Node)
- [JWT for handling user authentication and authorization](#JWT)
- [Nodemailer and Elastic Mail for handling email service](#)
- [Mongo Db for Data Persistency](#)

## Enviromental Variables

Refer to config/config file for all enviromental variables

## Get-Started

```bash
# Clone this project
$ git clone https://github.com/certifiedTboy/vzy-api

# Access
$ cd vzy-api

# Install dependencies
$ npm install

# Accsess webhook server
$ cd stripe-webhook-server
$ npm install
$ node index.js to run server

# Run the project
$ npm start (Production server)
$ npm run dev (Development server)

# The server will initialize in the <http://localhost:3001>
```

## CRUD Operations

- User can create account
- Login and Logout after successful creation of account
- User can update payment status if payment is initiated on stripe

## Account Creation Flow

- To create an account, users need to provide FirstName, LastName and a unique email address and unique password

## Authentication Flow

- Authentication and Authorization is handled with Jsonwebtoken (JWT) and it follows the OAUTH flow standard
- On successful login, an access token and a refresh token is generated, refresh token is sent as an HTTP only flagged cookie to client with a validity period of 24 hours. The access token is sent as a response data to be used for subsequent requests. The access token has a validity period of 1minute. Tokens are signed with the user unique Id
- All subsequent request that requires authorization must be made with the access token as authorization request header with a Bearer flag.
- On access token expiration, a request is made to a /refresh-token endpoint with refresh token as req.cookies header.
- If refresh token is valid and contains verifiable data, a new access token is sent back to client for subsequent request.
- on refresh token expiration, client is required to login again to generate new refresh token and access token
- For testing on POSTMAN agent, refer to [postman interceptor](https://learning.postman.com/docs/sending-requests/cookies/#:~:text=Postman%20can%20capture%20cookies%20for,with%20the%20Postman%20cookie%20jar.)

## Stripe Webhook Flow

- The stripe webhook is hosted on a different server on https://vzy-webhook-server.onrender.com - that listens to all activies on stripe account. A payment must be initiated using the stripe client API or any oter available channel for the webhook to be triggered. If a payment is completed on stripe account, user email can be sent as a metadata with the webhook rquest object. The customer email is extracted from the request object after transanction event is verified and a post request is sent to the main server of the api to update customer status to paid.

## API Documentation

All API http request endpoints are available on [https://documenter.getpostman.com/view/14393972/2sA2r6YQLY](https://documenter.getpostman.com/view/14393972/2sA2r6YQLY)

Use [https://vzy-api-oux5.onrender.com/api/v1](https://vzy-api-oux5.onrender.com/api/v1) for live testing

<a href="#top">Back to top</a>
