import React from 'react'
import Adminsidebar from './sidebar.jsx'
import Adminheader from './header.jsx'
import { Outlet } from 'react-router-dom'

function Adminlayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  return (
    <div className=' flex min-h-screen w-full '>
        <Adminsidebar open={sidebarOpen} setopen={setSidebarOpen}/>
        <div className='flex flex-1 flex-col'>
            <Adminheader setopen={setSidebarOpen}/>
            <main className='flex-1 flex bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default Adminlayout