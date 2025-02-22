const express=require('express')
const { searchProducts} = require('../../controllers/shopping/search-controller')

const router=express.Router()

router.get('/:keyword',searchProducts)


module.exports=router