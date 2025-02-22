import React, { useState } from 'react'
import checkout from '../../assets/checkout.jpg'
import checkout1 from '../../assets/checkout1.avif'
import account from '../../assets/account.jpg'
import Address from '@/components/shopping-view/address'
import { useDispatch, useSelector } from 'react-redux'
import UserCartContent from '@/components/shopping-view/cart-content'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shopping/order-slice'
import { useToast } from '@/hooks/use-toast'



function Shoppingcheckout() {
  const {user}=useSelector((state)=>state.auth)
  const {approvalURL}=useSelector((state)=>state.shoppingorder)
  const [selectedaddress,setselectedaddress]=useState(null)
  const [paymentstart,setpaymentstart]=useState(false)
  const dispatch=useDispatch()
  const {toast}=useToast()
  
  function handlecheckout(){
         
    if(items.items.length===0){
      toast({
        title:'Your cart is Empty',
        variant:'destructive'
       })
       return
    }

    if(selectedaddress===null){
       toast({
        title:'Please select an address',
      
       })
       return
    }


 

    const orderData={
      userId:user?.id,
      cartId:items?._id,
      cartItems: items.items.map((item)=>({
        productId: item?.productId,
        title:item?.title,
        image:item?.image,
        price:item?.saleprice,
        quantity: item.quantity,
        
      
      })),
      addressInfo:{
        addressId: selectedaddress?._id,
        address: selectedaddress?.address,
        city: selectedaddress?.city,
        pincode: selectedaddress?.pincode,
        phone: selectedaddress?.phone,
        notes: selectedaddress?.notes,
      },
      orderStatus:'Pending',
      paymentMethod:'Paypal',
      paymentStatus:'Pending',
      totalAmount:totalprice,
      orderDate:new Date(),
      orderUpdateDate:new Date() ,
      paymentId:'',
      payerId:'',
      
    }
     
    dispatch(createNewOrder(orderData)).then((data)=>{
      console.log(data);
      
      if(data?.payload?.success){
        setpaymentstart(true)
      }
      else{
             setpaymentstart(false)
      }
    })
    
  
  }

  const {items}=useSelector((state)=>state.shoppingcart)
  const totalprice=items?.items?.reduce((acc,item)=>acc+(item.saleprice*item.quantity),0)
  const originalprice=items?.items?.reduce((acc,item)=>acc+(item.price*item.quantity),0)


  if(approvalURL){
    window.location.href=approvalURL
  }
  return <div className='flex flex-col'>
    <div className='absolute h-[400px]  w-full overflow-hidden  mt-0 top-0 
    '>
      <img  className='w-full  ' src={checkout1} alt="checkout" />

    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-80 p-5'>
      <Address selectedId={selectedaddress} setselectedaddress={setselectedaddress}/>

      <div className='flex flex-col gap-4'>
           {
              items.items && items.items.length>0?
              items.items.map((item)=><UserCartContent cartItem={item} />):null
           }
           
        <DropdownMenuSeparator/>
        <div className='space-y-2 '>
        <div className='flex justify-between   '>
            <span className='font-bold mt-6'>Total</span>
            <div className='flex flex-col items-end'>
            <span className='text-gray-400 line-through'>
             ${originalprice?.toFixed(2)}
            </span>
            <span className='font-bold'>
             ${totalprice?.toFixed(2)}
            </span>
            </div>
        </div>
        <DropdownMenuSeparator/>

      </div>
      <div className='flex justify-center'>
      <Button  
  onClick={() => handlecheckout()} 
  className="bg-black text-white active:scale-95 w-full"
>
  {paymentstart 
    ? "Processing your payment....." 
    : `Pay ₹${totalprice?.toFixed(2)}`}
</Button>

      </div>
      </div>
    
    </div>
  </div>
}

export default Shoppingcheckout