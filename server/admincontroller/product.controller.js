const { uploadimage } = require('../helper/cloudinary.js');
const Product = require('../models/product.model.js');


const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        console.log('Controller Debug - File Details:', req.file);

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = 'data:' + req.file.mimetype + ';base64,' + b64;

        const result = await uploadimage(url);

        if (result && result.secure_url) {
            return res.json({
                success: true,
                url: result.secure_url, // Return only the URL
            });
        } else {
            console.error("Cloudinary response missing 'secure_url':", result);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve uploaded image URL",
            });
        }
    } catch (err) {
        console.error("Error during image upload:", err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


//add a product

const addproduct=async(req,res)=>{
    try {

        const {image,title,description,category,brand,price,saleprice,stock}=req.body
        const newproduct=new Product({image,title,description,category,brand,price,saleprice,stock})

        await newproduct.save()

        res.status(201).json({
            success:true,
            data:newproduct
        })
    } catch (error) {
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Error on adding product"
        })
    }
}



//fetch all product

const fetchproduct=async(req,res)=>{
    try {

        const listofproducts=await Product.find({})
        res.status(200).json({
            success:true,
            data:listofproducts
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error on fetching product"
        })
    }
}




//edit product

const editproduct=async(req,res)=>{
    try {

        const {id}=req.params
        const {image,title,description,category,brand,price,saleprice,stock}=req.body
        const findProduct=await Product.findById(id)

        if(!findProduct){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        findProduct.title=title||findProduct.title
        findProduct.description=description||findProduct.description
        findProduct.category=category||findProduct.category
        findProduct.brand=brand||findProduct.brand
        findProduct.price=price||findProduct.price
        findProduct.saleprice=saleprice||findProduct.saleprice
        findProduct.stock=stock||findProduct.stock
        findProduct.image=image||findProduct.image

        await findProduct.save()
        res.status(200).json({
            success:true,
            data:findProduct
        })
        
    } catch (error) {
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Error on editiing product"
        })
    }
}




//delete product
const deleteproduct=async(req,res)=>{
    try {

        const {id}=req.params
        console.log(id)
        const product=await Product.findByIdAndDelete(id)

        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        res.status(200).json({
            success:true,
            message:'product deleted'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error on deleting product"
        })
    }
}



module.exports={handleImageUpload,addproduct,fetchproduct,editproduct,deleteproduct}