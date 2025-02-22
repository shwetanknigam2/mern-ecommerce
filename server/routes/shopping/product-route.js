const express = require('express');
const { getfilteredproducts,geproductdetails } = require('../../controllers/shopping/product-controller');

const router= express.Router();

router.get('/get',getfilteredproducts)
router.get('/get/:id',geproductdetails)


module.exports=router
