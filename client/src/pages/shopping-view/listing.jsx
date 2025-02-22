import Productfilter from '@/components/shopping-view/filter'
import { Button } from '@/components/ui/button'
import { DropdownMenuRadioItem, DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { getfilteredproducts, getproductdetails } from '@/store/shopping/products-slice'
import { useSelector } from 'react-redux'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Shoppingproducttile from '@/components/shopping-view/product-tile'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import Productdetails from './productdetails'
import { addtocart,fetchcartitems } from '@/store/shopping/cart-slice'


import { useToast } from '@/hooks/use-toast'


function createSearchParamsHelper(filterParams){
   const queryParam=[]
   
   for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length>0){
         const paramvalue=value.join(',')
         queryParam.push(`${key}=${encodeURIComponent(paramvalue)}`)
   }
  
}

return queryParam.join('&')
}

function Shoppinglisting(){
  
  const[sort,setsort]=useState('')
  const[filter, setfilter] = useState({})
  const [searchparam, setsearchparam] = useSearchParams()
  const [opendetails, setopendetails] = useState(false)
  const {items}=useSelector((state)=>state.shoppingcart)
  const {toast}=useToast()
  

  const categorysearchparam=searchparam.get('category')
  function handlesort(value){
    setsort(value)
  }
  function handlefilter(getsection, getcurrentoption) {
    let copyfilter = { ...filter };
  
    // Check if the section exists
    if (!copyfilter[getsection]) {
      copyfilter[getsection] = [getcurrentoption]; // Create new section with the selected option
    } else {
      const indexofcurrentoption = copyfilter[getsection].indexOf(getcurrentoption);
      
      if (indexofcurrentoption === -1) {
        // If the option is not already selected, add it
        copyfilter[getsection].push(getcurrentoption);
      } else {
        // If already selected, remove it (toggle behavior)
        copyfilter[getsection].splice(indexofcurrentoption, 1);
  
        // If section becomes empty, remove it from the object
        if (copyfilter[getsection].length === 0) {
          delete copyfilter[getsection];
        }
      }
    }
    
    setfilter(copyfilter);
    sessionStorage.setItem("filters", JSON.stringify(copyfilter));
    
    
  }
  

  const dispatch=useDispatch()
  const {productList, productDetails}=useSelector((state)=>state.shoppingProducts)
  const {user}=useSelector((state)=>state.auth);

  
  
useEffect(()=>{
  if(productDetails!==null){
    setopendetails(true)
  }
},[productDetails])




  useEffect(()=>{
    setsort('price-lowtohigh')
    setfilter(JSON.parse(sessionStorage.getItem('filters'))||{})
  },[categorysearchparam])

  useEffect(()=>{
    if(filter && Object.keys(filter).length>0){
     
      const createQueryString=createSearchParamsHelper(filter)
      setsearchparam(new URLSearchParams(createQueryString))
    }
  },[filter])

  useEffect(()=>{
    if(filter!==null && sort!==null){
 
      dispatch(getfilteredproducts({filterParams:filter,sortParams:sort}))
    }
   
  },[dispatch,sort,filter])

  function handlegetproductdetails(id){
   
    dispatch(getproductdetails({id}))
  }

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

  useEffect(()=>{
    return ()=>setopendetails(false)
  },[])

  
  
 
  
  
  
   return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 '>
      <Productfilter filters={filter} handlefilter={handlefilter}/>

      <div className='w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-semibold '>All Products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted'>{productList.length} Products</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex items-center gap-1'>
                  <ArrowUpDownIcon className='h-4 w-4'/>
                  <span>Sort by</span>
                </Button>
            </DropdownMenuTrigger>
               <DropdownMenuContent align='end' className='w-[200px] bg-white flex flex-col gap-6 shadow-sm ' >
                <DropdownMenuRadioGroup value={sort} onValueChange={handlesort}>
                  {
                    sortOptions.map(option=>(
                      <DropdownMenuRadioItem value={option.id} className='hover:bg-gray-300 rounded-sm' key={option.id}>{option.label}</DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>

               </DropdownMenuContent>
          </DropdownMenu>
          </div>
          
        </div>
        <div className='grid grid-cols-1 sm:grids-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
          {
            productList&&productList.length>0?
            productList.map(product=>(
             <Shoppingproducttile handlegetproductdetails={handlegetproductdetails} handleaddtocart={handleaddtocart} product={product} key={product._id}/>
            )):<p>No products available</p>
          }
        </div>

      </div>
      <Productdetails open={opendetails} setopen={setopendetails} productDetails={productDetails}/>
    </div>
  )
}

export default Shoppinglisting