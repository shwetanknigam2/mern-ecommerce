const Cart = require('../../models/cart.model')
const Product = require('../../models/product.model')




const addtocart = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.body

        if(!userId || !productId || quantity<=0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input'
            })
        }

        const product = await Product.findById(productId)
        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        let cart = await Cart.findOne({ userId })
        if(!cart) {
            cart= new Cart({
                userId,
                items: []
            })
         
        }
        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId)
        if(itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity
        } else {
            cart.items.push({ productId, quantity })
        }

        await cart.save()

        res.status(200).json({
            success: true,
            message: 'Product added to cart successfully',
            data:cart
        })

        
    } catch (error) {
        console.log(error);
        
        
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
        
    }
}

const fetchcartitems = async (req, res) => {
    try {

        const { userId } = req.params

        if(!userId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input'
            })
        }

        const cart = await Cart.findOne({ userId }).populate({path: 'items.productId', select: 'title price image saleprice'}) 
        if(!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        const validitems=cart.items.filter((productitem)=>productitem.productId)
        if(validitems.length<cart.items.length){
            cart.items=validitems
            await cart.save()
        }

        const populateCartItems=validitems.map((item)=>({
            productId:item.productId._id,
            image:item.productId.image,
            price:item.productId.price,
            saleprice:item.productId.saleprice,
            title:item.productId.title,
            quantity:item.quantity
        }))

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items:populateCartItems
            }
        })
        
    } catch (error) {
       
        
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
        
    }
}

const updatecartitem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body

        if(!userId || !productId || quantity<0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input'
            })
        }

        const cart = await Cart.findOne({ userId }) 
        if(!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }
        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId)
        if(itemIndex===-1){
            return res.status(404).json({
                  success: false,
                message: 'Cart not found'
            })
        }

        cart.items[itemIndex].quantity=quantity
        await cart.save()

        await cart.populate({
            path:'items.productId',
            select: 'image title price saleprice'

        })
         
        const populateCartItems=cart.items.map(item=>({
            productId:item.productId?item.productId._id:null,
            image:item.productId?item.productId.image:null,
            price:item.productId?item.productId.price:null,
            saleprice:item.productId?item.productId.saleprice:null,
            title:item.productId?item.productId.title:"Product Not found",
            quantity:item.quantity
        }))

        
        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items:populateCartItems
            }
        })
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
        
    }

}

const removecartitem = async (req, res) => {
    try {
        const {userId, productId}=req.params
        if(!userId || !productId){
            return res.status(400).json({
                success: false,
                message: 'Invalid input'
            })
        }
        const cart = await Cart.findOne({ userId}).populate({path: 'items.productId', select: 'title price image saleprice'})
        if(!cart){
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }
        cart.items=cart.items.filter(item=>item.productId._id.toString()!==productId)
        await cart.save()
        await cart.populate({
            path: 'items.productId', select: 'title price image saleprice'})

            const populateCartItems=cart.items.map(item=>({
                productId:item.productId?item.productId._id:null,
                image:item.productId?item.productId.image:null,
                price:item.productId?item.productId.price:null,
                saleprice:item.productId?item.productId.saleprice:null,
                title:item.productId?item.productId.title:"Product Not found",
                quantity:item.quantity
            }))

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items:populateCartItems
            }
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
        
    }
}

module.exports = {
    addtocart,
    fetchcartitems,
    updatecartitem,
    removecartitem}