var express = require('express');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(8);
const User = require('../models/users.models');
const router = express.Router();

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
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email})
      if (!user) {
        res.status(204).json({ success: false, message: 'User Not Found' })
      }
      const checkPassword = bcrypt.compareSync(password, user.password)
      if (!checkPassword) {
        res.status(204).json({ success: false, message: 'Invalid Password' })
      }
      res.status(200).json({ success: true, message: "Login Successful" })
    }
    catch (error) {
      throw error;
    }
  })

module.exports = router;