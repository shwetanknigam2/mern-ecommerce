import React, { useEffect } from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import { Zap } from 'lucide-react'
import { useSelector } from 'react-redux'
import UserCartContent from './cart-content'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function UserCartWrapper({setopensheet}) {



  const navigate=useNavigate()
  const {items}=useSelector((state)=>state.shoppingcart)
  
  const totalprice=items?.items?.reduce((acc,item)=>acc+(item.saleprice*item.quantity),0)
  const originalprice=items?.items?.reduce((acc,item)=>acc+(item.price*item.quantity),0)
  return <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className='mt-8 space-y-4 '>
           {
            items.items&&items.items.length>0?
            items.items.map(item=><UserCartContent cartItem={item}/> ):
            <p className='justify-center font-extrabold'>Cart is Empty</p>
           }
      </div>
      <div className='mt-3 space-y-4'>
        <div className='flex justify-between  '>
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
      </div>
      <Button  onClick={()=>{navigate('/shopping/checkout')
                           setopensheet(false)
      }} className='w-full bg-gradient-to-r from-black to-gray-600 hover:from-gray-600 hover:to-black rounded-xl shadow-md text-white transition-transform duration-300 active:scale-95 '> 
      Check Out</Button>
  </SheetContent>
}

export default UserCartWrapper