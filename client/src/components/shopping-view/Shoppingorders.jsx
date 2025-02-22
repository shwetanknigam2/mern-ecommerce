import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import Shoppingorderdetails from './shoppingorderdetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserorders, getorderdetails ,resetorderdetails} from '@/store/shopping/order-slice'

function ShoppingOrders() {
   
  const [opendialog,setopendialog]=useState(false)
   const dispatch=useDispatch()
   const {user}=useSelector((state)=>state.auth)
   const {orderList,orderDetails}=useSelector((state)=>state.shoppingorder)


   useEffect(()=>{
     dispatch(getAllUserorders(user?.id))
   },[dispatch])

   useEffect(()=>{
    if(orderDetails!==null)
      setopendialog(true)
   },[orderDetails])
 
  function handleviewdetails(id){
    dispatch(getorderdetails(id))
    
  }
   
 console.log(orderDetails);
 
   
  return <Card>
    <CardHeader>
      <CardTitle>Order History</CardTitle>
    </CardHeader>
    <CardContent>
      <Table >
        <TableHeader>
          <TableRow className='rounded-md hover:bg-white'>
            <TableHead>OrderId</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>
              <span className='sr-only'>Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {orderList && orderList.length>0?
          orderList.map(item=>
          <TableRow className='hover:bg-gray-100 hover:rounded-md'>
            
            <TableCell>{item?._id}</TableCell>
            <TableCell>{item?.orderDate.split('T')[0]}</TableCell>
            <TableCell>{item?.orderStatus}</TableCell>
            <TableCell>{item?.totalAmount}</TableCell>
            <TableCell>
            <Dialog open={opendialog} onOpenChange={()=>{
              setopendialog(false)
              dispatch(resetorderdetails())
            }}>
                <Button onClick={()=>handleviewdetails(item?._id)} className='bg-black text-white active:scale-95'>View Details</Button>
                  <Shoppingorderdetails orderDetails={orderDetails}/>
                </Dialog>
            </TableCell>
          </TableRow>
           ):null}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
}

export default ShoppingOrders