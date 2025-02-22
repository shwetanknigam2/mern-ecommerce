import { Minus, Plus, Trash } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { deletecartitem, updatecartitem } from '@/store/shopping/cart-slice'
import { useToast } from '@/hooks/use-toast'

function UserCartContent({ cartItem }) {
  const {user}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const {items}=useSelector(state=>state.shoppingcart)
    const {productList}=useSelector((state)=>state.shoppingProducts)
    const {toast}=useToast()

  function handleupdate(getcartItem, change) {
     
    if(change==='plus'){


      
    let cartitems=items.items||[]
    const productidx=productList.findIndex(item=>item._id===getcartItem.productId)
    const stock=productList[productidx].stock

    if(cartitems.length){
       const itemidx=cartitems.findIndex(item=>item.productId===getcartItem.productId)
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

    }


    dispatch(updatecartitem({
      userId: user?.id,
      productId: getcartItem?.productId,
      
      quantity: change === 'plus' ? getcartItem.quantity + 1 : getcartItem.quantity - 1
    }));
  }

  function handledelete(getcartItem){

  
    
    if (!user?.id || !getcartItem?.productId) {
      console.warn("User ID or Product ID is missing");
      return;
    }
    
       dispatch(deletecartitem({
        userId:user?.id, 
        productId:getcartItem?.productId
       }
       ))
  }
  return (
    <div className="flex items-center gap-6 p-4 transition-all hover:bg-gray-50/50 rounded-xl group border border-transparent hover:border-gray-200">
      {/* Product Image */}
      <img src={cartItem?.image} alt={cartItem?.title} 
    className='w-20 h-20 rounded object-cover  hover:scale-105 transition-transform duration-300'/>

      {/* Product Info */}
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{cartItem?.title}</h3>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
            <Button 
              
              disabled={cartItem.quantity===1}
              onClick={()=>handleupdate(cartItem,'minus')}
              variant="ghost" 
              className="h-8 w-8 rounded-full hover:bg-gray-200/50 p-0 active:scale-75 transition-transform"
              aria-label="Decrease quantity"
            >
              <Minus  className="w-4 h-4 text-gray-700 " />
            </Button>
            
            <span className="min-w-[24px] text-center font-medium text-gray-900">
              {cartItem?.quantity}
            </span>
            
            <Button 
              onClick={()=>handleupdate(cartItem,'plus')}
              variant="ghost" 
              className="h-8 w-8 rounded-full hover:bg-gray-200/50 p-0 active:scale-75 transition-transform"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </Button>
          </div>
          
          {/* Delete Button */}
          <Button 
             onClick={()=>handledelete(cartItem)} 
            variant="ghost" 
            className="p-2 hover:bg-red-50/50 hover:text-red-600 text-gray-400  active:scale-75 transition-transform"
            aria-label="Remove item"
          >
            <Trash  className="w-4 h-4 " />
          </Button>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="flex flex-col items-end space-y-2  ">
      {cartItem?.price && (
          <span className="text-sm text-gray-400 line-through">
            ${(cartItem?.price * cartItem?.quantity).toFixed(2)}
          </span>
        )}
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">
            ${(cartItem?.saleprice * cartItem?.quantity).toFixed(2)}
          </p>
          <div className="text-sm text-gray-500 flex gap-1 whitespace-nowrap">
          <span>${cartItem?.saleprice.toFixed(2)}</span> × 
          <span>{cartItem?.quantity}</span>
          </div>
        </div>
       
      </div>
    </div>
  )
}

export default UserCartContent