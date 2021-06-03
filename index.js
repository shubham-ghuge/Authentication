const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { initializeDB } = require('./db/connection.db')
const users = require('./routes/users.routes')

const app = express();
initializeDB();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('helloo')
});

app.use('/users', users)

app.use((req,res,next)=>{
  res.status(404).json({success:false,message:'page not found'})
})

app.listen(3000, () => {
  console.log('server started');
});