
const Order=require('../models/Order')



const getAllorders=async(req,res)=>{
    try {

      

        const order = await Order.find();

        if(!order.length){
            return res.status(400).json({
                success:false,
                message:'Orders not found'
            })
        }

        res.status(200).json({
            success:true,
            data:order
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Some error occured'
        })
        
    }
}

const updateorderstatus=async(req,res)=>{
    try {

      
       const {id}=req.params
       const {orderStatus}=req.body

        const order=await Order.findById(id)
       
               if(!order){
                   return res.status(404).json({
                       success:false,
                       message:'Orders not found'
                   })
               }
        await Order.findByIdAndUpdate(id,{orderStatus})

        res.status(200).json({
            success: true,
            message: "Order status is updated successfully"
          });
       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Some error occured'
        })
    }
}

module.exports={getAllorders,updateorderstatus}