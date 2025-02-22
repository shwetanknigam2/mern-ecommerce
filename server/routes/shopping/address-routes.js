const express=require('express')

const {addAddress,fetchAddress,deleteAddress,editAddress}=require('../../controllers/address-controller')


const router=express.Router()


router.post('/add',addAddress)
router.get('/get/:userId',fetchAddress)
router.put('/edit/:userId/:addressId',editAddress)
router.delete('/delete/:userId/:addressId',deleteAddress)


module.exports=router