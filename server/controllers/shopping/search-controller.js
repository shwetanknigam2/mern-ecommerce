const Product=require('../../models/product.model')



const searchProducts=async(req,res)=>{
    try {

        const {keyword}=req.params
        if(!keyword||typeof keyword!=='string'){
            return res.status(400).json({
                success:false,
                message:'Keyword is required in String format'
            })
        }

        const regEx=new RegExp(keyword,'i')
        const query={
            $or:[
                {title:regEx},
                {description:regEx},
                {category:regEx},
                {brand:regEx}
            ]
        }

        const results=await Product.find(query)

        res.status(200).json({
            success:true,
            data:results
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
           success:false,
           message:'Internal server error'
        })
        
    }
}

module.exports={searchProducts}