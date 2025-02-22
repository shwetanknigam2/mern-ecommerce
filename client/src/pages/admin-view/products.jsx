
import Productimageupload from '@/components/admin-view/imageupload'
import Adminproducttile from '@/components/admin-view/product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addproductFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, deleteProduct, editProduct, fetchProduct } from '@/store/admin/adminproductslice'

import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialstate = {
  image:null,
  title:'',
  price:'',
  description:'',
  category:'',
  brand:'',
  saleprice:'',
  stock:'',
 
}

function Adminproducts() {

  

  const[opencreateproductmodal,setopencreateproductmodal]=useState(false)
  const [formdata, setformdata] = useState(initialstate)
  const [imagefile, setimagefile] = useState(null)
  const [uploadedimage, setuploadedimage] = useState("")
  const [isloadingstate,setisloadingstate]=useState(false)
  const {productList}=useSelector((state)=>state.adminProducts)
  const dispatch=useDispatch()
  const {toast}=useToast()
  const [CurrentEditid,setCurrentEditid]=useState(null)

  function onsubmit(e){
    e.preventDefault()
    CurrentEditid!==null?
    dispatch(editProduct({
      id:CurrentEditid, formdata:formdata
    })).then((data)=>{
      console.log(data,"edit")
      dispatch(fetchProduct())
      setformdata(initialstate)
      setopencreateproductmodal(false)
      toast({
        title:'Product edited successfully'
      })
    })
    :dispatch(addNewProduct({
      ...formdata,
      image:uploadedimage
    })).then((data)=>{
      if(data?.payload?.success){
        setimagefile(null)
        setformdata(initialstate)
        dispatch(fetchProduct())
        setopencreateproductmodal(false)
        toast({
          title:'Product added successfully'
        })
      }
      
    })
    
    
  }

  function handledelete(productid){
      dispatch(deleteProduct(productid)).then((data)=>{
        if(data?.payload?.success){
          dispatch(fetchProduct())
          toast({
              title:'Product deleted successfully'
          })
        }
      })
  }

  useEffect(()=>{
    dispatch(fetchProduct())
  },[dispatch])

 function isformvalid(){
  return Object.keys(formdata)
  .map(key=> formdata[key]!=='')
  .every(item=>item)
  }

 

  
  

  return (
   <Fragment>
   <div className='mb-5 w-full flex justify-end'>
    <div className='grid gap-4  md:grid-cols-3 lg:grid-cols-4'>
    {
      productList&& productList.length>0?
      productList.map((productItem)=>
        <Adminproducttile setCurrentEditid={setCurrentEditid} product={productItem} setopencreateproductmodal={setopencreateproductmodal} setformdata={setformdata} handledelete={handledelete}/>
      ):<p>no product available</p>
    }
    </div>
   
      <Button onClick={()=>setopencreateproductmodal(true)} className='bg-black text-white rounded-md'>Add New Product</Button>
    </div>
   

    <Sheet open={opencreateproductmodal} onOpenChange={()=>{
      setopencreateproductmodal(false)
      setCurrentEditid(null)
      setformdata(initialstate)
      }}>
      <SheetContent side='right' className='overflow-y-auto max-h-screen flex flex-col '>
        <SheetHeader>
          <SheetTitle>
            {
              CurrentEditid!==null?
              'Edit Product':
              'Add new product'
            }

          </SheetTitle>
        </SheetHeader>
        
        <Productimageupload file={imagefile} setfile={setimagefile} uploadedimage={uploadedimage} setuploadedimage={setuploadedimage} setisloadingstate={setisloadingstate} isloadingstate={isloadingstate}
          iseditmode={CurrentEditid!==null}  />
        <div className='py-6'>
         <CommonForm
          formControls={addproductFormControls}
          formdata={formdata}
          setformdata={setformdata}
          onsubmit={onsubmit}
          buttontext={CurrentEditid!==null?'Edit ':'Add'}
          isbuttondisabled={!isformvalid()}
          />
          
          
        </div>
      </SheetContent>
    </Sheet>

   </Fragment>
  )
}

export default Adminproducts