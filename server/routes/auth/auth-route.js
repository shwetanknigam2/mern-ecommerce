const express = require('express')
const { registerUser, loginUser, logoutUser, authmiddleware } = require('../../controllers/auth/auth-controller.js')




 const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.get('/checkauth',authmiddleware,(req,res)=>{
    const user=req.user
    res.status(200).json({message:'User authenticated',success:true,user})
})

module.exports=router