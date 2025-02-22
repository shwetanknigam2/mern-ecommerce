import CommonForm from '@/components/common/form'
import { loginFormControls } from '@/config'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/auth-slice'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

const initialstate = {
  username: '',
  password: '',
}

function Authlogin() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [formData, setFormData] = React.useState(initialstate)
 
  
  const dispatch = useDispatch();

  function onsubmit(e){
    e.preventDefault()
    
    dispatch(loginUser(formData)).then((data) =>{
      if(data?.payload?.success) {
        console.log(data?.payload);
        navigate('/shopping/home') 
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
  })}

  return (
    <div className='mx-auto w-full max-w-md space-y-6' >
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign In to your account</h1>
       
      </div>
      <CommonForm formControls={loginFormControls} formdata={formData} setformdata={setFormData}   onsubmit={onsubmit}  buttontext='sign in'/>
      <p className='mt-2 justify-center flex flex-1'>Don't have an account?
          <Link to='/auth/register' className='text-primary ml-2 font-medium  hover:underline'>SignUp</Link>
        </p>
      
    </div>
  )
}

export default Authlogin