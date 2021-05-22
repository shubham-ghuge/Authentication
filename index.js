const express = require('express');

const app = express();

app.get('/user',(req,res,next)=>{
  console.log("requested resource");
  next();
})

app.get('/', (req, res) => {
  res.send("helloo")
});

app.get('/user', (req, res) => {
  res.json({ name: "shubham", age: 21,pincode:400066 })
});

app.listen(3000, () => {
  console.log('server started');
});