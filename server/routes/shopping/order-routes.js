const express=require('express')
const { createorder, capturePayment, getAllUserorders, getorderdetails } = require('../../controllers/shopping/order-controller')

const router=express.Router()

router.post('/create',createorder)
router.post('/capture',capturePayment)
router.get('/list/:userId',getAllUserorders)
router.get('/details/:id',getorderdetails)

module.exports=router