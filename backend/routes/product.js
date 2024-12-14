const express = require("express");
const router = express.Router();
const {productget,getsingleproduct}=require("../Controller/productcontroller");
 

router.route('/getproduct').get(productget);
router.route('/getsingleproduct/:id').get(getsingleproduct);

module.exports = router;