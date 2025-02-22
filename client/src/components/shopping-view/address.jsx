import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, deleteAddress, editAddress, fetchAddress } from '@/store/shopping/address-slice';
import Addresscard from './Address-card';
import { useToast } from '@/hooks/use-toast';


const initialAddressFormData = {
    address:'',
    city:'',
    phone:'',
    pincode:'',
    notes:'',
  };




function Address({setselectedaddress,selectedId}) {
    
      

    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.auth)
   const [editId,seteditId]=useState(null)
    const [formdata,setformdata]=useState(initialAddressFormData)
     const {addressList}=useSelector((state)=>state.shoppingaddress)
     const {toast}=useToast()


   function handleManageAddress(e){
    e.preventDefault()

    editId !==null? dispatch(editAddress(
      {
        
        userId:user?.id,
        addressId:editId,
        formData:formdata,
      }
    )
  ).then(
    (data)=>{
        console.log(data)
      if(data?.payload?.success){
         dispatch(fetchAddress(user?.id ))
         seteditId(null)
         setformdata(initialAddressFormData)
         toast({
          title: 'Address edited successfully'
         })
      }
    }
) :dispatch(addAddress({
       ...formdata,
       userId:user?.id
    })).then(
        (data)=>{
            console.log(data)
          if(data?.payload?.success){
             dispatch(fetchAddress(
                user?.id
             ))
             setformdata(initialAddressFormData)

             toast({
              title:'Address added successfully'
             })
          }
        }
    )
}

useEffect(()=>{
    dispatch(fetchAddress(user?.id))
},[dispatch])



function isFormValid() {
    return Object.keys(formdata)
    .map((key) => formdata[key]?.trim() !== "")
    .every((item) => item);;
  }
  
function handledelete(currentid){
      dispatch(deleteAddress({
        userId:user?.id,
        addressId:currentid
      })).then((data)=>{
        if(data?.payload?.success){
          dispatch(fetchAddress(user?.id))
        }
      }
        
      )
}

function handleedit(cuurentid){
     seteditId(cuurentid?._id)
     setformdata({
      ...formdata,
      address: cuurentid?.address,
      city: cuurentid?.city,
      phone: cuurentid?.phone,
      pincode: cuurentid?.pincode,
      notes: cuurentid?.notes,
     }

     )

}

  
 

  
  
  

  return <Card>
    <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-1 gap-2" >
        {addressList && addressList.length>0
        ? addressList.map((singleaddress)=>(
          <Addresscard selectedId={selectedId} setselectedaddress={setselectedaddress} addressInfo={singleaddress}  handledelete={handledelete} handleedit={handleedit}/>)
        ):null}
    </div>
    <CardHeader>
        <CardTitle>
            {editId==null?'Add new Address':'Edit Address'}
        </CardTitle>
    </CardHeader>
   
    <CardContent className='space-y-3'>

        <CommonForm 

         
          formControls={addressFormControls}
          formdata={formdata}
          setformdata={setformdata}
          buttontext={editId==null?'Add':'Edit'}
          onsubmit={handleManageAddress}
        isbuttondisabled={!isFormValid()}
    
        />
            

     
       
    </CardContent>
  </Card>
}

export default Address