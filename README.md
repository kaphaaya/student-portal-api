# 🎓 Student Portal API

A simple REST API for managing student accounts, built as part of my Backend Development assignment.

This project helped me understand how a backend application receives requests, processes them, communicates with a database, and sends responses back to the client.

I built the API using **Node.js, Express.js, MongoDB, and Mongoose**.

---

## 🚀 What I Built

The Student Portal API allows students to:

* 👤 Create a student account
* 🔎 Get their own student details using their ID
* ✏️ Update their name
* 🗑️ Delete their account

The API follows the basic **CRUD** pattern:

| Operation | HTTP Method | Endpoint        | Purpose                   |
| --------- | ----------- | --------------- | ------------------------- |
| Create    | `POST`      | `/students`     | Create a student          |
| Read      | `GET`       | `/students/:id` | Get a student by ID       |
| Update    | `PUT`       | `/students/:id` | Update the student's name |
| Delete    | `DELETE`    | `/students/:id` | Delete a student          |

---

## 🧠 What I Learned

This assignment was not just about making the API work. I used it to understand what is actually happening behind the scenes.

### 🌐 REST API

I learned that an API is basically a way for different applications to communicate.

For example, when I send a request from Postman:

```text
POST /students
```

I am basically saying:

> "Hey backend, I want to create a new student."

The backend receives the request, processes the information, talks to MongoDB, and sends a response back.

---

## 🛠️ Technologies Used

### Node.js

Node.js allows JavaScript to run outside the browser.

I used it to run my backend application.

### Express.js

Express makes it easier to build routes and handle HTTP requests.

For example:

```js
router.get('/:id', ...)
```

tells Express what to do when someone sends a GET request containing a student ID.

### MongoDB 🍃

MongoDB is the database where the student information is stored.

Instead of keeping the data only in my application while it is running, MongoDB allows the information to persist.

### Mongoose

Mongoose connects my Node.js application to MongoDB and gives me an easier way to work with the student data.

### Postman

I used Postman to test my API endpoints before submitting the project.

This allowed me to send POST, GET, PUT, and DELETE requests and see the responses from my backend.

---

# 📁 Project Structure

```text
student-portal-api/
│
├── src/
│   │
│   ├── config/
│   │   └── database.mjs
│   │
│   ├── models/
│   │   └── student.mjs
│   │
│   ├── routes/
│   │   └── studentRoutes.mjs
│   │
│   └── server.mjs
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### What each file does

#### `server.mjs`

This is where the Express server starts.

It also:

* Loads environment variables
* Connects to MongoDB
* Enables JSON request bodies
* Registers the student routes
* Starts the server on port `3000`

---

#### `database.mjs`

This file is responsible for connecting the application to MongoDB.

I kept the database connection separate from the main server file so the project is easier to organize and maintain.

---

#### `student.mjs`

This contains the **Student model**.

The model defines the information a student account should contain:

```text
Name
Registration Number
Email
```

Think of the model as a blueprint for what a student record should look like.

---

#### `studentRoutes.mjs`

This contains the API routes for managing students.

This is where I implemented the CRUD operations.

---

# 🔐 Environment Variables

The MongoDB connection string is stored inside a `.env` file instead of being written directly into the source code.

Example:

```text
MONGO_URI=your_mongodb_connection_string
```

The `.env` file is included in `.gitignore`.

This is important because my MongoDB credentials should **never be uploaded to GitHub**.

---

# 🔄 API Endpoints

## 1️⃣ Create a Student

### Request

```http
POST /students
```

### Body

```json
{
  "name": "Aisha Bello",
  "registrationNumber": "CSC/001",
  "email": "aisha@gmail.com"
}
```

The API sends the information to MongoDB and creates a student record.

### Response

MongoDB generates a unique `_id` for the student.

Example:

```json
{
  "_id": "6a9c5f26894ea184edb040cd",
  "name": "Aisha Bello",
  "registrationNumber": "CSC/001",
  "email": "aisha@gmail.com"
}
```

📸 **POST request**

![Create Student](screenshots/create-student.png)

---

# 2️⃣ Get Student Details

### Request

```http
GET /students/:id
```

Example:

```http
GET /students/6a9c5f26894ea184edb040cd
```

The `:id` is a route parameter.

I learned that:

```js
req.params.id
```

allows the application to access the ID supplied in the URL.

The API then uses that ID to find the student in MongoDB.

📸 **GET request**

![Get Student](screenshots/get-student.png)

---

# 3️⃣ Update Student Name

### Request

```http
PUT /students/:id
```

### Body

```json
{
  "name": "Aisha Updated"
}
```

One important requirement of the assignment was that the student should **only be able to change their name**.

So I specifically extracted only the `name` from the request:

```js
const { name } = req.body;
```

Then I updated only that field in MongoDB.

This means:

```text
Name                 ✅ Can change
Registration Number  🔒 Remains unchanged
Email                🔒 Remains unchanged
```

📸 **UPDATE request**

![Update Student](screenshots/update-student.png)

---

# 4️⃣ Delete Student

### Request

```http
DELETE /students/:id
```

Example:

```http
DELETE /students/6a9c5f26894ea184edb040cd
```

The API finds the student using the ID and permanently removes the record from MongoDB.

The API returns:

```json
{
  "message": "Student deleted successfully"
}
```

📸 **DELETE request**

![Delete Student](screenshots/delete-student.png)

---

# 🧪 Testing

I tested the API using Postman.

The CRUD testing covered:

```text
POST   → Create student       ✅
GET    → Retrieve student     ✅
PUT    → Update student name  ✅
DELETE → Delete student       ✅
```

I also tested the API after deleting the student by trying to retrieve the same ID again.

The API correctly returned:

```json
{
  "message": "Student not found"
}
```

This confirmed that the student had actually been removed.

---

# 🧩 How the API Works

The overall flow looks like this:

```text
             POSTMAN
                │
                ▼
        ┌─────────────────┐
        │   Express API   │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Student Routes  │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Student Model   │
        │   Mongoose      │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │    MongoDB      │
        └─────────────────┘
```

In simple terms:

**Postman asks → Express receives → Routes decide what to do → Mongoose communicates with MongoDB → MongoDB stores or retrieves the data → API sends a response back.**

---

# ▶️ Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/kaphaaya/student-portal-api.git
```

### 2. Enter the project

```bash
cd student-portal-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Add:

```text
MONGO_URI=your_mongodb_connection_string
```

### 5. Start the server

```bash
node src/server.mjs
```

The API should run on:

```text
http://localhost:3000
```

---

# 📚 Assignment Requirements

| Requirement                   | Completed |
| ----------------------------- | --------- |
| Create student account        | ✅         |
| Store name                    | ✅         |
| Store registration number     | ✅         |
| Store email                   | ✅         |
| Get student by ID             | ✅         |
| Update student profile        | ✅         |
| Only allow name to be updated | ✅         |
| Delete student account        | ✅         |
| MongoDB database              | ✅         |
| REST API                      | ✅         |
| Tested with Postman           | ✅         |
| Source code pushed to GitHub  | ✅         |

---

# 💭 Final Reflection

This project gave me a much better understanding of what happens behind a backend API.

At the beginning, I was mainly thinking about writing the routes and getting a response. While building this, I started understanding the bigger picture:

**Client → API → Route → Model → Database → Response**

I also learned how environment variables work, why database credentials should not be committed to GitHub, how route parameters work, and how CRUD operations map to HTTP methods.

Most importantly, I learned by actually building and debugging the API instead of just reading about it.

🚀 **Student Portal API completed.**

