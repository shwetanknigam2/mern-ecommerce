const express=require('express')
const { getAllorders, updateorderstatus } = require('../../admincontroller/order.controller')


const router=express.Router()

router.get('/list',getAllorders)
router.put('/update/:id',updateorderstatus)

module.exports=router