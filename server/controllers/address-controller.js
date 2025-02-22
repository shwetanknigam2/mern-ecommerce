const Address = require("../models/Address");



const addAddress=async(req,res)=>{
    try {

       const {userId,address,city,pincode,phone,notes} =req.body

       if(!userId||!address||!city||!pincode||!phone){
        return res.status(400).json({
            success:false,
            message:'invalid input'
        })
       }
       const newaddress=new Address({
        userId,address,phone,city,pincode,notes
       })
       await newaddress.save()

        res.status(201).json({
        success:true,
        data:newaddress
       })

        
    } catch (error) {
        console.log(error);
         res.status(500).json({
            success:false,
            message:'Internal error'
        })
        
    }
}


const fetchAddress=async(req,res)=>{
    try {

        const {userId}=req.params
        if(!userId){
            return res.status(400).json({
                success:false,
                message:'invalid input'
            })
           }
        const adress=await Address.find({userId})

        

        res.status(200).json({
            success:true,
            data:adress
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Internal error'
        })
        
    }
}


const editAddress=async(req,res)=>{
    try {
        
        const {userId,addressId}=req.params
        const formdata=req.body

        if(!userId||!addressId){
            return res.status(400).json({
                success:false,
                message:'invalid input'
            })
           }

      const address=await Address.findOneAndUpdate(
        {
        _id:addressId,
        userId
      },
        formdata,
        {new:true}
      )
         
      if(!address){
        return res.status(404).json({
            success:false,
            message:'Address not found'
        })
      }

    

      res.status(200).json({
        success:true,
        data:address
      })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Internal error'
        })
        
    }
}


const deleteAddress=async(req,res)=>{
    try {
        const {userId,addressId}=req.params

        if(!userId||!addressId){
            return res.status(400).json({
                success:false,
                message:'invalid input'
            })
           }
    const address=await Address.findOneAndDelete({
        _id:addressId, userId

    })
    if(!address){
        return res.status(404).json({
            success:false,
            message:'Address not found'
        })
      }

      res.status(200).json({
        success:true,
        message:'Address deleted successfully'
      })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Internal error'
        })
        
    }
}

module.exports={addAddress,editAddress,deleteAddress,fetchAddress}