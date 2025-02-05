const express = require('express');
const { createAdmin, getAdmins, loginAdmin } = require('../controllers/adminController');

const router = express.Router();

router.post('/', createAdmin);
router.get('/', getAdmins);
router.post('/login', loginAdmin);

module.exports = router;
