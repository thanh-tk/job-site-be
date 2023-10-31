## Node.js API with Prisma and Express.js

This project is a simple Node.js API that uses Prisma and Express.js to perform CRUD operations on a database.

### Installation

To install the project, clone the repository and run the following command:

`npm install`

### Modify Schema
The schema file is located in `prisma/schema.prisma`. modify if needed. 

To mirgate change to Database, using following command:

`npm run db:migrate`

### Starting the server

To start the server, run the following command:

`npm start`

The server will listen on port 3000 by default. Change the port by setting the PORT environment variable.

Usage
To use the API, send HTTP requests to the following endpoints:

- `GET` api/v1/job/jobs?[param]: Get all jobs
- `GET` api/v1/job/:id: Get a specific job
- `POST` api/v1/job/new: Create a new job
- `PUT` api/v1/job/:id: Update a specific job
- `DELETE` api/v1/job/:id: Delete a specific job

The API returns JSON responses.

Example
To get all jobs, send a GET request to the /jobs endpoint:

curl http://localhost:3000/api/v1/job/jobs?page[number]=1&page[size]=2&sort[col]=title&sort[dir]=desc


The response will be a JSON array of all the jobs in the database:

```json
[
  {
    "id": 1,
    "title": "Software Engineer",
    "description": "We are looking for a talented Software Engineer to join our team.",
    "expiryDate": "2023-11-01"
  },
  {
    "id": 2,
    "title": "Product Manager",
    "description": "We are looking for a passionate Product Manager to join our team.",
    "expiryDate": "2023-11-15"
  }
]
```

To create a new job, send a POST request to the `http://localhost:3000/api/v1/job/new` endpoint with the job data in the request body:

```json 
  {
    "title": "Frontend Engineer",
    "description": "We are looking for a talented Frontend Engineer to join our team.",
    "expiryDate": "2023-11-30"
  }
```
The response will be the newly created job:

```JSON 
{
  "id": 3,
  "title": "Frontend Engineer",
  "description": "We are looking for a talented Frontend Engineer to join our team.",
  "expiryDate": "2023-11-30"
}
```

# ENV Template:
```JSON
PORT = 3000
API_URL = "/api/v1"
# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgres://{username}:{password}@localhost:5432/{db_name}"
# SHADOW_DATABASE_URL= "postgres://{username}:{password}@localhost:5432/{db_name}"
```