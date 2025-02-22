const Product=require('../../models/product.model')

const getfilteredproducts=async(req,res)=>{
    try {

        const {category=[],brand=[],sortby='price-lowtohigh'}=req.query

        let filter={}
   

        if(category.length){
            filter.category={$in:category.split(',')}
        }
        if(brand.length){
            filter.brand={$in:brand.split(',')}
        }

        let sort={}
          switch (sortby){

            case 'price-lowtohigh':
                sort.price=1
                break;
            case 'price-hightolow':
                    sort.price=-1
                    break;
            case 'title-atoz':
                    sort.title=1
                        break;
            case 'title-ztoa':
                    sort.title=-1
                        break;

          
            default:
                sort.price=1
                break;
          }

        const products=await Product.find(filter).sort(sort)

        
        res.status(200).json({
            success:true,
            data:products
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal server error'
        })
        
    }


}

const geproductdetails=async(req,res)=>{
    try {
        const {id}=req.params

        const product=await Product.findById(id)
        if(!product){
            res.status(404).json({
                success:false,
                message:'Product not found'
            })
        }
        res.status(200).json({
            success:true,
            data:product
        })
    } catch (error){
        res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

module.exports={getfilteredproducts,geproductdetails}