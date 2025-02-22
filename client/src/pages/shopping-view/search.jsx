import { Input } from '@/components/ui/input'
import { getsearchresults, resetsearch } from '@/store/shopping/search-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Shoppingproducttile from '@/components/shopping-view/product-tile'
import { useToast } from '@/hooks/use-toast'
import { addtocart, fetchcartitems } from '@/store/shopping/cart-slice'
import { getproductdetails } from '@/store/shopping/products-slice'
import Productdetails from './productdetails'

function ProductSearch() {
      const [opendetails, setopendetails] = useState(false)
        const {productList, productDetails}=useSelector((state)=>state.shoppingProducts)
    const {toast}=useToast()
    const {items}=useSelector(state=>state.shoppingcart)
    const {user}=useSelector(state=>state.auth)
    const [keyword,setkeyword]=useState('')
    const [searchparams,setsearchparams]=useSearchParams()
    const dispatch=useDispatch()
    const {searchResults}=useSelector(state=>state.search)
    useEffect(()=>{
        if(keyword && keyword.trim()!==''&&keyword.length>3){
              setTimeout(() => {
                setsearchparams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getsearchresults(keyword))
              },1000);
        }else{
            setsearchparams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetsearch())
        }
    },[keyword])

     function handleaddtocart(id,stock){
    
        let cartitems=items.items||[]
    
        if(cartitems.length){
           const itemidx=cartitems.findIndex(item=>item.productId===id)
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
    
      
         
    
    
        dispatch(addtocart({userId:user?.id,productId:id,quantity:1})).then(data=>{
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

        function handlegetproductdetails(id){
         
          dispatch(getproductdetails({id}))
        }

        useEffect(()=>{
          if(productDetails!==null){
            setopendetails(true)
          }
        },[productDetails])
    
  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
        <div className='flex justify-center mb-8'>
            <div className='w-full flex items-center'>
                <Input
                onChange={(e)=>setkeyword(e.target.value)}
                className=''
                placeholder='Search Products...........'
                />
            </div>
            
        </div>
        <div className='grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

         {
            searchResults && searchResults.length ?
            searchResults.map(item=> <Shoppingproducttile handleaddtocart={handleaddtocart} handlegetproductdetails={handlegetproductdetails}  product={item}/>  ):<h1>No results...........</h1>
         }
        </div>
        <Productdetails open={opendetails} setopen={setopendetails} productDetails={productDetails}/>
    </div>
  )
}

export default ProductSearch