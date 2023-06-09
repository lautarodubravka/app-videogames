const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', UserController.register);

router.post('/login', UserController.login);

module.exports = router;
