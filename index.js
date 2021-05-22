const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send("helloo")
});

app.get('/user', (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    console.log(`${token} user has requested`);
    next();
  } else {
    res.status(401).json({ msg: "error" })
  }
})

app.get('/user', (req, res) => {
  res.json({ name: "shubham", age: 21, pincode: 400066 })
});

app.listen(3000, () => {
  console.log('server started');
});