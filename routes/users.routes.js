var express = require('express');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(8);
var jwt = require('jsonwebtoken');
const User = require('../models/users.models');
const router = express.Router();
require('dotenv').config();

function accessDenial(req, res) {
  return res.status(401).json({ message: 'Bad Request' });
}

router.route('/register')
  .get(accessDenial)
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, salt);
      const response = await User.create({ email, password: hashedPassword });
      res.status(200).json({ status: true, response })
    }
    catch (error) {
      throw error;
    }
  })

router.route('/login')
  .get(accessDenial)
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email })
      if (user === null) {
        return res.json({ success: false, message: 'User Not Found' })
      } else {
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) {
          return res.json({ success: false, message: 'Invalid Password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env['secret_key'], { expiresIn: '24h' })

        res.status(200).json({ success: true, message: "Login Successful", token })
      }
    }
    catch (error) {
      throw error;
    }
  })

module.exports = router;