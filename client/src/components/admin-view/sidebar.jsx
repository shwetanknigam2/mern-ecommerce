import React, { Fragment } from 'react'
import {ChartNoAxesCombined} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'
import { ShoppingBasket } from 'lucide-react'
import { Shirt } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'


export const adminsidebaritems=[
  {
    id:'dashboard',
    label:'Dashboard',
    path:'/admin/dashboard',
    icons:<LayoutDashboard />
  },
  {
    id:'products',
    label:'Products',
    path:'/admin/products',
    icons:<ShoppingBasket />
  },
  {
    id:'orders',
    label:'Orders',
    path:'/admin/orders',
    icons:<Shirt />
  },
]


function MenuItems({setopen}){
  const navigate=useNavigate()
  return <nav className='mt-8 flex-col flex gap-2 '>
    {
      adminsidebaritems.map((item)=>(
      <div key={item.id} onClick={()=>{
        navigate(item.path)
        setopen?setopen(false):null
      }} 
      
      className='flex text-xl items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-muted hover:bg-muted/40 hover:text-foreground' >
        {item.icons}
        <span>{item.label}</span>

      </div>))
    }
  </nav>
}

function Adminsidebar({open,setopen}) {

  const navigate=useNavigate()
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setopen} >
        <SheetContent side='left'className='w-64'>
          <div className='flex flex-col h-full'>
            <SheetHeader className='border-b'>
              <SheetTitle className='flex items-center gap-2'>
                <ChartNoAxesCombined size={30} />
                <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setopen={setopen}/>
          </div>
          </SheetContent>

      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={()=>navigate('/admin/dashboard')}
        className='flex cursor-pointer items-center gap-2'>
        <ChartNoAxesCombined className='size={30px}' />
          <h1 className='text-2xl font-extrabold'>
          
            Admin Panel</h1>

        </div>
        <MenuItems/>
        </aside>

    </Fragment>
  )
}

export default Adminsidebar