var express = require('express');
var router = express.Router();
const productsApiController = require('../../controllers/api/productsController');

router.get('/', productsApiController.list);
router.get('/:id', productsApiController.detail);



module.exports = router;