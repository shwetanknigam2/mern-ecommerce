import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { editProduct, fetchProduct } from '@/store/admin/adminproductslice'
import { deleteProduct } from '@/store/admin/adminproductslice'
import { useDispatch } from 'react-redux'
import { useToast } from '@/hooks/use-toast'

function Adminproducttile({ 
    product,
    setformdata,
    setCurrentEditid,
    setopencreateproductmodal,
    handledelete


    }) {
        const {toast}=useToast()
   const dispatch=useDispatch()

 

    


    return (
        <Card className='w-full  max-w-sm mx-auto shadow-md'>
            <div>
                <div className='relative'>
                    <img src={product?.image} alt={product?.title}
                        className='w-full h-[300px] object-cover rounded-t-lg'

                    />
                </div>


                <CardContent>
                    <h2 className='text-xl font-bold mb-2 '>{product?.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${product?.saleprice ||product?.saleprice>0 ? 'line-through' : ''}text-lg font-semibold text-primary line-through  `}>${product?.price}</span>
                        {product?.saleprice > 0 ? (
                            <span className="text-lg font-bold">${product?.saleprice}</span>
                        ) : null}
                    </div>

                </CardContent>
                <CardFooter className='flex justify-between items-center '>
                    <Button onClick={()=>{
                        setCurrentEditid(product._id)
                        setopencreateproductmodal(true)
                        setformdata(product)
                    }
                    } className='bg-black text-white rounded-md'  >Edit</Button>
                    <Button onClick={()=>{handledelete(product._id)}}  className='bg-black text-white rounded-md'>Delete</Button>

                </CardFooter>

            </div>

        </Card>
    )
}

export default Adminproducttile