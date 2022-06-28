const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');
const checkAuth = require('../authorization/checkAuth')

router.post('/create',checkAuth,cvController.add)

router.get('/get',checkAuth,cvController.get);

router.get('/getCvById/:id',checkAuth,cvController.getCvById)

router.post('/delete/:id',checkAuth,cvController.deleteCv)


module.exports = router;