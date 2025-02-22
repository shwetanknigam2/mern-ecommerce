import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { DropdownMenuSeparator } from '../ui/dropdown-menu'
import CommonForm from '../common/form'
import { useSelector } from 'react-redux'

function Adminorderdetails({orderDetails}) {
  const {user}=useSelector((state)=>state.auth)
    const initialformdata={
        status:''
    }
 
    function handleupdatestatus(e){
         e.preventDefault()
    }

    const [formdata,setformdata]=useState(initialformdata)
  return (
    <DialogContent className='sm:max-w-[600px] overflow-visible'>
           <div className='grid gap-2'>
                  <div className='grid gap-3'>
                              <div className='flex  items-center justify-between'>
                                  <p className='font-medium'>Order ID</p>
                                  <Label>{orderDetails?._id}</Label>
                              </div>
                              <div className='flex  items-center justify-between'>
                                  <p className='font-medium'>Order date</p>
                                  <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                              </div>
                              <div className='flex  items-center justify-between'>
                                  <p className='font-medium'>Order Price</p>
                                  <Label>{orderDetails?.totalAmount}</Label>
                              </div>
                              <div className='flex  items-center justify-between'>
                                  <p className='font-medium'>Order status</p>
                                  <Label>{orderDetails?.orderStatus}</Label>
                              </div>
                              <div className='flex  items-center justify-between'>
                                  <p className='font-medium'>Payment Method</p>
                                  <Label>{orderDetails?.paymentMethod}</Label>
                              </div>
                              <div className='flex  items-center justify-between'>
                                  <p className='font-medium'>Payment status</p>
                                  <Label>{orderDetails?.paymentStatus}</Label>
                              </div>
                              <div className='flex  items-center justify-between'>
                                  <p className='font-medium'>Payment Id</p>
                                  <Label>{orderDetails?.paymentId}</Label>
                              </div>
                              <div className='flex  items-center justify-between'>
                                  <p className='font-medium'>Payer id</p>
                                  <Label>{orderDetails?.payerId}</Label>
                              </div>
                 
                            </div>
                            <DropdownMenuSeparator/>
                            <div className='grid gap-4'>
                              <div className='griid gap-2'> 
                                  <div className='font-medium'>Order Details</div>
                                  <ul className='grid gap-3 mt-2'>
                        {   orderDetails?.cartItems && orderDetails?.cartItems.length>0 ?
                        
                        orderDetails?.cartItems.map((item)=>(
                                       <li className='flex items-center justify-between '>
                                       <span>{item?.title}</span>
                                       <span>{item?.price}*{item?.quantity}={item?.quantity*item?.price}</span>
                 
                                    
                  
                                   </li>
                        )):null}
                 
                                  </ul>
                              </div>
                            </div>
                            <div className='grid gap-4'>
                              <div className='grid gap-2'>
                                  <div className='font-medium'>
                                      Shipping Info
                                  </div>
                                  <div className='grid gap-0.5 text-muted'>
                                     <span>{user?.username}</span>
                                      <span>{orderDetails?.addressInfo?.address}</span>
                                      <span>{orderDetails?.addressInfo?.city}</span>
                                      <span>{orderDetails?.addressInfo?.phone}</span>
                                      <span>{orderDetails?.addressInfo?.pincode}</span>
                                      <span>{orderDetails?.addressInfo?.notes}</span>
                                    
                 
                                  </div>
                              </div>
                            </div>
                            <div>
                           
                 
                      
                            </div> 
                            
                            {/* <CommonForm  
                      formControls={[
                        {
                            name:'status',
                            label:'Order Status',
                            componenttype:'select',
                            options:[
                                  {id:'pending',label:'Pending'},
                                //   {id:'inProcess',label:'In Process'},
                                  {id:'inShipping',label:'In Shipping'   },
                                  {id:'delivered',label:'Delivered'},
                                  {id:'rejected',label:'Rejected'},
                                  
                                   
                                ],
               
                        }
                      ]}
                      formdata={formdata}
                      setformdata={setformdata}
                      buttontext={'Update Order status'}
                      onsubmit={handleupdatestatus}
                    
                    /> */}

            
                  </div>
           
    </DialogContent>
  )
}

export default Adminorderdetails