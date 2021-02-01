var express = require('express');
var router = express.Router();
const usersApiController = require('../../controllers/api/usersController');


router.get('/',usersApiController.list);
router.get('/:id',usersApiController.detail);



module.exports = router;