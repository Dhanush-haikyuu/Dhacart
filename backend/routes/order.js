const express = require("express");
const router = express.Router();
const {createorder}=require("../Controller/ordercontroller");
 

router.route('/postorder').post(createorder);

module.exports = router;