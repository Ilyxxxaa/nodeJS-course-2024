# Node2022Q4

# Simple Crud API

Task: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md

---

Approximate score: **222**

- +10 The repository with the application contains a Readme.md file containing detailed instructions for installing, running and using the application
- +10 GET api/users implemented properly
- +10 GET api/users/${userId} implemented properly
- +10 POST api/users implemented properly
- +10 PUT api/users/{userId} implemented properly
- +10 DELETE api/users/${userId} implemented properly
- +30 Code Written on TypeScript
- +6 Users are stored in the form described in the technical requirements
- +6 Value of port on which application is running is stored in .env file
- +10 Processing of requests to non-existing endpoints implemented properly
- +10 Errors on the server side that occur during the processing of a request should be handled and processed properly
- +10 Development mode: npm script start:dev implemented properly
- +10 Production mode: npm script start:prod implemented properly
- +30 There are tests for API (not less than 3 scenarios)
- +50 There is horizontal scaling for application with a load balancer

## Instalation dependencies

NodeJS required version _18 LTS_

```
npm install
```

## Starting application

```
// Dev mode
npm run start:dev
// Producton
npm run start:prod

// Multi instances modes
npm run start:multi
```

## RestAPI Test

```
npm run test
```

Test coverage

![image]()

## Endpoints

```
GET    http://localhost:4000/api/users
GET    http://localhost:4000/api/users/{uuid}
PUT    http://localhost:4000/api/users/{uuid}
DELETE http://localhost:4000/api/users/{uuid}
POST   http://localhost:4000/api/users
```

# Data Format for POST request

```
{
    "username": "User1",
    "age": 20,
    "hobbies": [
        "coding'",
        "crying"
    ]
}
```
