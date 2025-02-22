import React from 'react'
import { AlignJustify } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-slice'


function Adminheader({setopen}) {
  const dispatch=useDispatch()

  function handlelogout(){
       dispatch(logoutUser())
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b '>
       <button onClick={()=>setopen(true)} className='lg:hidden sm:block bg-black text-white px-3 py-2 rounded-md'>
       <AlignJustify />
       <span className='sr-only'>Toggle Menu</span>
       </button>
       <div className='flex flex-1 justify-end '>
        <button onClick={handlelogout}  className='flex items-center space-x-2 bg-black text-white px-3 py-2 rounded-md'>
        <LogOut  />
        <span >Logout</span>
        </button>
       </div>

    </header>
  )

}

export default Adminheader