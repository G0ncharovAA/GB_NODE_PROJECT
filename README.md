# User REST API

This is a simple Node.js Express REST API for interacting with "user" objects. The API supports CRUD operations (Create, Read, Update, Delete) for managing user data.

## Getting Started

1. Clone the repository or download the source code.
2. Install the dependencies using npm install.

## Usage

### Endpoints

#### GET /users
- Description: Fetches all user objects.
- Example: curl http://localhost:3000/users

#### POST /users
- Description: Creates a new user object.
- Example: curl -X POST -H "Content-Type: application/json" -d '{"name": "John", "secondName": "Doe", "city": "New York", "age": 30}' http://localhost:3000/users

#### PUT /users/:id
- Description: Updates an existing user object by ID.
- Example: curl -X PUT -H "Content-Type: application/json" -d '{"name": "Jane", "secondName": "Smith", "city": "San Francisco", "age": 35}' http://localhost:3000/users/1

#### DELETE /users/:id
- Description: Deletes a user object by ID.
- Example: curl -X DELETE http://localhost:3000/users/1