import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'

const initialstate = {
  username: '',
  email: '',
  password: '',
}

function Authregister() {

  const [formData, setFormData] = React.useState(initialstate)
  
  
   const dispatch = useDispatch();
   const navigate=useNavigate()
   const {toast}=useToast()
  function onsubmit(e) {
    e.preventDefault()
     dispatch(registerUser(formData)).then((data) =>{
        if(data?.payload?.success) {
          console.log(data?.payload?.message);
          navigate('/auth/login') 
          toast({
            title: data?.payload?.message,
           
          })
         }else{
          console.log(data?.payload?.message);
          
          toast({
            title: data?.payload?.message,
            variant: "destructive",
           
          })
         }
        
        
      })
    
  }
   

  return (
    <div className='mx-auto w-full max-w-md space-y-6' >
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'> Create new Account</h1>
       
      </div>
      <CommonForm formControls={registerFormControls} formdata={formData} setformdata={setFormData}   onsubmit={onsubmit}  buttontext='sign up'/>
      <p className='mt-2 justify-center flex flex-1'>Already have an account ?
          <Link to='/auth/login' className='text-primary ml-2 font-medium  hover:underline'>Login</Link>
        </p>
      
    </div>
  )
}

export default Authregister