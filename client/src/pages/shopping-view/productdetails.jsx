import { Dialog, DialogContent } from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'
import {  ShoppingCart, 
    ArrowRight, 
    Zap, 
    Sparkles, 
    Star, 
    Tag, 
    Building,
    StarIcon,
     } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart,fetchcartitems } from '@/store/shopping/cart-slice';
import { useToast } from '@/hooks/use-toast';
import { getproductdetails, setproductdetails } from '@/store/shopping/products-slice';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Starrating from '@/components/common/star-rating';
import { addReview, getReviews } from '@/store/shopping/review-slice';



function Productdetails({open,setopen,productDetails}) {
  const {toast}=useToast()
  const {user}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const {items}=useSelector(state=>state.shoppingcart)
  const [reviewMsg,setReviewMsg]=useState("")
  const [Rating,setRating]=useState(0)
  const {reviews}=useSelector((state)=>state.review)
  
  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  function handleaddreview(){

    dispatch(addReview({
      productId: productDetails?._id,
      userId: user?.id,
      userName: user?.username,
      reviewMessage: reviewMsg,
      reviewValue: Rating,
  })
).then(data=>{
  if(data.payload.success){
    setRating(0)
setReviewMsg('')
    dispatch(getReviews(productDetails?._id))
    toast({
      title:'Review added successfully'
    })
  }
  
})




  }
  function handleaddtocart(details,stock){


    let cartitems=items.items||[]

    if(cartitems.length){
       const itemidx=cartitems.findIndex(item=>item.productId===details?._id)
       let currentitem=cartitems[itemidx]
    
       if(itemidx>-1){
         
        if(currentitem.quantity+1>stock){
          
          toast(
            {
              title:`Only ${stock} pieces can be added for this item`,
            }
          )
  
          return
  
        }
  
  
       }
    }
        


        dispatch(addtocart({
               userId:user?.id,
               productId:details?._id,
               quantity:1
        })).then(data=>{
              if(data.payload.success){
                dispatch(fetchcartitems(user?.id))
                toast(
                  {
                    title:'Product is added to cart ',
                  }
                )
              }
              });
  }
  function handleopen(){
    setopen(false)
    dispatch(setproductdetails())
    setRating(0)
    setReviewMsg('')
  }

  useEffect(()=>{
    if(productDetails!==null) dispatch(getReviews(productDetails?._id))
  },[productDetails])

  
  const averageReview = reviews.length>0?
  reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
  reviews.length:0;
  return (
    <Dialog open={open} onOpenChange={handleopen}>
    <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12 max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[1100px] max-h-[90vh] overflow-y-auto ">
      {/* Image Section */}
      <div className="relative group overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
        <img 
          src={productDetails?.image} 
          alt={productDetails?.title} 
          width={800}
          height={800}
          className="aspect-square w-full object-contain transition-transform duration-300 hover:scale-105"
        />
        
        {/* Discount Badge */}
        {productDetails?.saleprice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {Math.round(
              ((productDetails?.price - productDetails?.saleprice) / 
              productDetails?.price) * 100
            )}% OFF
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col gap-6">
        {/* Title & Description */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {productDetails?.title}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
             <Starrating rating={averageReview
}/>
             <span className='font-bold ml-1'>{averageReview.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({reviews?.length} review)
            </span>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {productDetails?.description}
          </p>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-700" />

        {/* Pricing & Details */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            {/* Price Display */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-primary">
                ${productDetails?.saleprice}
              </span>
              {productDetails?.saleprice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${productDetails?.price}
                </span>
              )}
            </div>
            
            {/* Category & Brand */}
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                <span>{productDetails?.category}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building className="w-4 h-4" />
                <span>{productDetails?.brand}</span>
              </div>
            </div>
          </div>
        </div>


        <div className="h-px bg-gray-200 dark:bg-gray-700" />

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Add to Cart Button */}
          {
            productDetails?.stock!==0?    <Button 
            onClick={()=>handleaddtocart(productDetails,productDetails?.stock)}
         size="lg"
         className="w-full h-14 text-lg font-bold transition-all duration-300 
                   bg-gradient-to-r from-gray-700 to-black hover:from-black hover:to-gray-700
                   shadow-lg hover:shadow-xl active:scale-[0.98] relative overflow-hidden group text-white"
       >
         <span className="flex items-center justify-center gap-2">
           <ShoppingCart  className="w-5 h-5 stroke-[2.5]" />
           Add to Cart
           <span className="absolute right-4 group-hover:right-6 transition-all duration-300">
             <ArrowRight className="w-4 h-4" />
           </span>
         </span>
       </Button>:    <Button 
      
            size="lg"
            className="w-full h-14 text-lg font-bold transition-all duration-300 
                      bg-gradient-to-r from-gray-700 to-black hover:from-black hover:to-gray-700
                      shadow-lg hover:shadow-xl  relative overflow-hidden group text-white cursor-not-allowed opacity-60"
          >
            <span className="flex items-center justify-center gap-2">
      
              Out of Stock
              <span className="absolute right-4 group-hover:right-6 transition-all duration-300">
      
              </span>
            </span>
          </Button>
          }
      </div>
      <div className='max-h-[300px] overflow-auto'>
            
            <h2 className='text-xl font-bold mb-4'>Reviews</h2>
           
            <div className='grid gap-6'>
              {
                reviews &&reviews.length>0?
                reviews.map((review)=> <div className='flex gap-4'>
                <Avatar className='w-10 h-10 border'>
                  <AvatarFallback>{review?.userName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-bold'>{review?.userName}</h3>
                  </div>
                  <div className='flex items-center gap-0'>
                         <Starrating rating={review?.reviewValue}/>
                  </div>
                  <p className='text-muted'>{review?.reviewMessage}</p>
                </div>
              </div>):<h1>No reviews</h1>
              }
             
            </div>
           
            <div className='mt-8 flex flex-col gap-2'>
              <Label>Write a review</Label>
              <div className='flex'>
                <Starrating rating={Rating} handleRatingChange={handleRatingChange}/>
              </div>
              <Input name='reviewMsg' value={reviewMsg} onChange={(event) => setReviewMsg(event.target.value)} placeholder='write a review.....' />
              <Button onClick={handleaddreview} disabled={reviewMsg.trim()===""}className='bg-black text-white'>Submit</Button>
            </div>
      </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default Productdetails