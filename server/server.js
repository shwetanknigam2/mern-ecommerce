require('dotenv').config()
const express=require('express')
const mongoose= require('mongoose')
const CookieParser=require('cookie-parser')
const cors=require('cors');
const cookieParser = require('cookie-parser');
const authRouter=require('./routes/auth/auth-route.js')
const adminProductsRouter=require('./routes/admin/product-route.js')
const shoppingProductsRouter=require('./routes/shopping/product-route.js')
const shoppingcartRouter=require('./routes/shopping/cart-routes.js')
const shoppingaddressRouter=require('./routes/shopping/address-routes.js')
const shoppingorderRouter=require('./routes/shopping/order-routes.js')
const adminorderRouter=require('./routes/admin/order-routes.js')
const productsearchRouter=require('./routes/shopping/search-routes.js')
const productreviewRouter=require('./routes/shopping/review-routes.js')
mongoose.connect(process.env.MONGO_URL

).then(()=>console.log('Mongodb connected'))
.catch((error)=>console.log(error));


const app=express()
const PORT=process.env.PORT||5001

app.use(
    cors({
        origin:process.env.CLIENT_URL,
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
                
        ],
        credentials:true
    })
)

app.use(cookieParser());
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/admin/products',adminProductsRouter)
app.use('/api/shopping/products',shoppingProductsRouter)
app.use('/api/shopping/cart',shoppingcartRouter)
app.use('/api/shopping/address',shoppingaddressRouter)
app.use('/api/shopping/order',shoppingorderRouter)
app.use('/api/admin/order',adminorderRouter)
app.use('/api/shopping/search',productsearchRouter)
app.use('/api/shopping/review',productreviewRouter)
app.listen(PORT,()=>console.log(`server is running on Port ${PORT}`))