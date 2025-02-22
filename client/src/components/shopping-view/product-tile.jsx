import React from 'react'
import { Card, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CardContent } from '../ui/card'
import { useDispatch } from 'react-redux'
function shoppingproducttile({product,handlegetproductdetails,
  handleaddtocart
}) {
  
  return (
    <Card  className='w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-2xl '>
      <div onClick={()=>handlegetproductdetails(product?._id)} className='cursor-pointer'>
        <div className='relative group'>
            <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-xl transform transition duration-300 group-hover:scale-105' />
            {
                (((product?.price)-(product?.saleprice))/(product.price))*100>=70?
               ( <Badge className='absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full shadow-md'>Sale</Badge>):null
            }
              {
                (product?.stock<10)?
                (product?.stock===0)? ( <Badge className='absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full shadow-md'>{`Out of stock `}</Badge>):
               ( <Badge className='absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full shadow-md'>{`Only ${product.stock} left `}</Badge>):null
            }
        </div>
        <CardContent className='p-4'>
            <h2 className='text-xl font-bold mb-2 truncate'>{product?.title}</h2>
            <div className='flex items-center justify-between mb-2 text-sm text-gray-500'>
                 
                    <span className='text-sm text-muted-foreground capitalize'>{product?.category}</span>
                    <span className='text-sm text-muted-foreground font-medium capitalize'>{product?.brand}</span>
                
            </div>
            <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.saleprice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
             <span className='font-extrabold text-xl text-red-600 '>${product.saleprice}</span>
          </div>
        </CardContent>
        
        </div>
        <div>
        <CardFooter>
          {
            product.stock===0?
            <Button  className='w-full opacity-60 cursor-not-allowed bg-black text-white'>Out of Stock</Button>
            : <Button onClick={()=>handleaddtocart(product?._id,product?.stock) }className='w-full bg-gradient-to-r from-black to-gray-600 hover:from-gray-600 hover:to-black rounded-xl shadow-md text-white transition-all duration-100 active:scale-90 '>Add to cart</Button>
          }
          
           
            
        </CardFooter>
        </div>
    </Card>
  )
}

export default shoppingproducttile