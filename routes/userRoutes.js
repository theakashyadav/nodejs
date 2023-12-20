const express = require('express');
const {
  registerUser,
  loginUser,
  currentUser,
  logoutUser,
} = require('../controllers/userControllers');
const validateToken = require('../middlesware/validateTokenHandler');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current', validateToken, currentUser);

router.get('/logout', validateToken, logoutUser);

module.exports = router;
