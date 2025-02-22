import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import Adminorderdetails from './Adminorderdetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllorders, updateorderstatus } from '@/store/admin/adminorderslice'
import { getorderdetails, resetorderdetails } from '@/store/shopping/order-slice'
import CommonForm from '../common/form'

function AdminOrders() {
  const initialformdata = { status: '' }
  const dispatch = useDispatch()
  const [opendialog, setopendialog] = useState(false)
  const [formdata, setformdata] = useState(initialformdata)

  useEffect(() => {
    dispatch(getAllorders())
  }, [dispatch])

  const { orderList } = useSelector((state) => state.adminorder)
  const { orderDetails } = useSelector((state) => state.shoppingorder)

  useEffect(() => {
    if (orderDetails !== null) setopendialog(true)
  }, [orderDetails])

  function handleviewdetails(id) {
    dispatch(getorderdetails(id))
  }

  function handleupdatestatus(e, id) {
    e.preventDefault() // Prevent form from reloading the page
  
    const { status } = formdata
    dispatch(updateorderstatus({ id: id, orderStatus: status }))
      .then((data) => {
        if (data.payload.success) {
          dispatch(getAllorders())
          setformdata(initialformdata)
          console.log(data)
        }
      })
  }
  
  

  
  
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead className="py-3 px-4">Order ID</TableHead>
              <TableHead className="py-3 px-4">Order Date</TableHead>
              <TableHead className="py-3 px-4">Status</TableHead>
              <TableHead className="py-3 px-4">Total Price</TableHead>
              <TableHead className="py-3 px-4 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((order) => (
                <TableRow key={order?._id} className="border-b border-gray-300 hover:bg-gray-50">
                  <TableCell className="py-3 px-4">{order?._id}</TableCell>
                  <TableCell className="py-3 px-4">{order?.orderDate.split('T')[0]}</TableCell>
                  <TableCell className="py-3 px-4 font-medium">{order?.orderStatus}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-700 font-semibold">{order?.totalAmount}</TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex flex-col gap-4 justify-center">
                      <Button
                        onClick={() => handleviewdetails(order?._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all"
                      >
                        View Details
                      </Button>
                      <Dialog
                        open={opendialog}
                        onOpenChange={() => {
                          setopendialog(false)
                          dispatch(resetorderdetails())
                        }}
                      >
                        <Adminorderdetails orderDetails={orderDetails} />
                        <CommonForm
                          formControls={[
                            {
                              name: 'status',
                              label: 'Order Status',
                              componenttype: 'select',
                              options: [
                                { id: 'pending', label: 'Pending' },
                                { id: 'inShipping', label: 'In Shipping' },
                                { id: 'delivered', label: 'Delivered' },
                                { id: 'rejected', label: 'Rejected' }
                              ]
                            }
                          ]}
                          formdata={formdata}
                          setformdata={setformdata}
                          buttontext={'Update Order Status'}
                          onsubmit={(e)=>handleupdatestatus(e,order._id)}
                        />
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrders
