const express = require('express');
const { addtocart, fetchcartitems,updatecartitem,removecartitem } = require('../../controllers/shopping/cart-controller');

const router = express.Router();

router.post('/add', addtocart)
router.get('/get/:userId', fetchcartitems)
router.put('/update', updatecartitem)
router.delete('/:userId/:productId', removecartitem)

module.exports = router