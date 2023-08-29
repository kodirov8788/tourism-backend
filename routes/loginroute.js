const express = require('express')

// controller functions
const { loginUser } = require('../controllers/userController')
const { getclients, filterClient, testgetClients } = require('../controllers/clientCtrl')

const router = express.Router()

router.post('/login', loginUser)
router.get("/get", getclients);
router.get("/test", testgetClients);
router.get("/filter", filterClient);


module.exports = router