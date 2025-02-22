import React from 'react'
import { CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

function Addresscard({addressInfo, handledelete,handleedit,setselectedaddress,
  selectedId
}) {
  return <Card className={`
    cursor-pointer shadow-md
    ${selectedId?._id===addressInfo?._id? 'border-black  bg-gray-100 ':'border-white' }
  `} onClick={setselectedaddress?()=>setselectedaddress(addressInfo):null}>
<CardContent className={`grid gap-4 pt-8 `}>

    <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
    </CardContent>
    <CardFooter className='flex gap-4'>
      <Button onClick={()=>handleedit(addressInfo)} className='bg-black text-white active:scale-95 transition-transform'>Edit</Button>
      <Button onClick={()=>handledelete(addressInfo?._id)} className='bg-black text-white active:scale-95 transition-transform'>Delete</Button>
    </CardFooter>
  </Card>

}

export default Addresscard