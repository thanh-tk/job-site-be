## Node.js API with Prisma and Express.js

This project is a simple Node.js API that uses Prisma and Express.js to perform CRUD operations on a database.

### Installation

To install the project, clone the repository and run the following command:

`npm install`

### Modify Schema
The schema file is located in `prisma/schema.prisma`. You can modify it to fit your needs. 

To mirgate change to Database, using following command:

`npm run db:migrate`

### Starting the server

To start the server, run the following command:

`npm start`

The server will listen on port 3000 by default. You can change the port by setting the PORT environment variable.

Usage
To use the API, send HTTP requests to the following endpoints:

- api/v1/jobs: Get all jobs
- api/v1/jobs/:id: Get a specific job
- api/v1/jobs: Create a new job
- api/v1/jobs/:id: Update a specific job
- api/v1/jobs/:id: Delete a specific job

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
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Frontend Engineer",
    "description": "We are looking for a talented Frontend Engineer to join our team.",
    "expiryDate": "2023-11-30"
  }' \
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

You can use the other endpoints in a similar way to perform CRUD operations on jobs.