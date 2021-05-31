const express = require('express');
const cors = require('cors');
const app = express();
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const { initializeDB } = require('./db/connection.db')

app.use(cors());
app.use(bodyParser.json());

initializeDB();

app.get('/', (req, res) => {
  res.send("helloo")
});

app.post('/login', (req, res) => {
  const { username } = req.body.user;
  const token = jwt.sign({ username }, "shhh", { expiresIn: '24h' })
})


app.get('/user', (req, res, next) => {
  const token = req.headers.authorization;
  if (token === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW1hbiIsImlhdCI6MTYyMTY5NTk0MX0.n8-qiSLch6PoPpMXyAfRHq4TvGKq25EHqIuJk7ojoIs") {
    return next();
  } else {
    res.status(401).json({ msg: "Unauthorized User, bad token request" })
  }
})

app.get('/user', (req, res) => {
  res.json({ name: "shubham", age: 21, pincode: 400066 })
});

app.listen(3000, () => {
  console.log('server started');
});