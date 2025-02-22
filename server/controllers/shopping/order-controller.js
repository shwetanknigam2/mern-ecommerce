const paypal=require('../../helper/paypal')
const Order=require('../../models/Order')
const Cart=require('../../models/cart.model')
const Product=require('../../models/product.model')


const createorder = async (req, res) => {
    try {
        const {  
            userId, cartItems, addressInfo, orderStatus, 
            paymentMethod, paymentStatus, totalAmount, 
            orderDate, orderUpdateDate, paymentId, payerId,cartId
        } = req.body;

    

  

        const create_payment_json = {
            intent: 'sale',
            payer: { payment_method: 'paypal' },
            redirect_urls: {
                return_url: `${process.env.CLIENT_URL}/shopping/paypal-return`,
                cancel_url: `${process.env.CLIENT_URL}/shopping/paypal-cancel`
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId || "N/A", // Avoid undefined SKU
                            price: item.price.toFixed(2).toString(),
                            currency: 'USD',
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2).toString(),
                     // Ensure it's a string
                    },
                    description: 'Order payment'
                }
            ]
        };

        console.log("PayPal Payment JSON:", JSON.stringify(create_payment_json, null, 2));


        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.error("PayPal Error Response:", JSON.stringify(error.response, null, 2));
                return res.status(500).json({ success: false, message: 'Error while creating PayPal payment' });
            }

            // Ensure approval URL exists
            const approvalURL = paymentInfo.links?.find(link => link.rel === 'approval_url')?.href;
            if (!approvalURL) {
                return res.status(500).json({ success: false, message: "Approval URL not found" });
            }

            const newCreatedOrder = new Order({
               cartId, userId, cartItems, addressInfo, orderStatus, 
                paymentMethod, paymentStatus, totalAmount, 
                orderDate, orderUpdateDate, paymentId:paymentId||null, payerId:payerId||null
            });

            await newCreatedOrder.save();

            res.status(201).json({
                success: true,
                approvalURL,
                orderId: newCreatedOrder._id
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


const capturePayment=async(req,res)=>{
    try {

        const {paymentId,payerId,orderId}=req.body

        let order=await Order.findById(orderId)

        if(!order){
             return res.status(404).json({
                success:false,
                message:'Order not found'
             })
        }

        order.paymentStatus='paid'
        order.orderStatus='confirmed'
        order.paymentId=paymentId
        order.payerId=payerId

        for(let item of order.cartItems){
            const product=await Product.findById(item?.productId)

            if(!product){
                return res.json({
                    success:false,
                    message:'Product not available'
                })
            }
            product.stock-=item.quantity

            await product.save()
        }


        const getCartId=order.cartId
        await Cart.findByIdAndDelete(getCartId)


        await order.save();

        res.status(200).json({
            success:true,
            message:'Order Confirmed',
            data:'order'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Internal Error'
        })
        
    }
}

const getAllUserorders=async(req,res)=>{
    try {

        const {userId}=req.params
        if(!userId){
            return res.status(400).json({
                success:false,
                message:'userId not found'
            })
        }

        const order = await Order.find({ userId: userId });

        if(!order.length){
            return res.status(404).json({
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

const getorderdetails=async(req,res)=>{
    try {

        const {id}=req.params

        const order=await Order.findById(id)

        if(!order){
            return res.status(404).json({
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
module.exports={createorder,capturePayment,getAllUserorders,getorderdetails}