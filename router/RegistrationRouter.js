const express = require('express');
const registrationController = require('../controlller/RegistrationController');

const router = express.Router();

router.post('/', registrationController.register);
router.get('/', registrationController.getAllUsers);



module.exports = router;
