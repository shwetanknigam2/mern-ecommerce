import { House, LogOut, Menu, ShoppingCart, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SheetTrigger, Sheet, SheetContent } from '../ui/sheet';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingviewheaderitems } from '@/config';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from '../ui/dropdown-menu';
import { AvatarFallback, Avatar } from '../ui/avatar';
import { logoutUser, resetToken } from '@/store/auth-slice';
import UserCartWrapper from './cart-wrapper';
import { fetchcartitems } from '@/store/shopping/cart-slice';
import { Label } from '@radix-ui/react-label';





function MenuItems({closeSheet}) {

  const navigate=useNavigate()
  const location=useLocation()
  const [searchparams,setsearchparams]=useSearchParams()

  function handlenavigation(item){
    sessionStorage.removeItem('filters')
    const currentfilter=item.id!=='home' && item.id!=='products'  && item.id!=='search' ?{
      category:[item.id]
    }:null
    sessionStorage.setItem('filters',JSON.stringify(currentfilter))
    
    if (location.pathname.includes('listing')&& currentfilter!==null) {
      setsearchparams(new URLSearchParams(`?category=${item.id}`));
    } else {
      navigate(item.path);
    }

    
  closeSheet()
    
  }

  return (
    <nav className=" flex flex-col mb-3 lg:mb-0 lg:items-center gap-9 lg:flex-row  md:flex-row ">
      {shoppingviewheaderitems.map((item) => (
        <Label  onClick={()=> handlenavigation(item)
          
        } key={item.id}  className="text-sm font-medium cursor-pointer ">
          {item.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opensheet, setopensheet] = useState(false);
  const { user } = useSelector((state) => state.auth);
    const {items}=useSelector(state=>state.shoppingcart)

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchcartitems(user.id));
    }
  }, [dispatch, user?.id]);

  function handlelogout() {
    // dispatch(logoutUser());
     dispatch(resetToken())
         sessionStorage.clear()
         navigate('/auth/login')

  }

  const cartsize=items?.items?.length||0

  return (
    <div className="flex items-center gap-4 mt-4   sm:flex-row-reverse sm:justify-between mb-4">
      {/* Cart Button */}
      <Sheet open={opensheet} onOpenChange={() => setopensheet(false)}>
        <Button onClick={() => setopensheet(true)} className="bg-gray-300 relative" variant="outline" size="icon">
          <ShoppingCart  className="h-6 w-6 mr-2 " />
          <span className='absolute right-2 top-0 text-xs'>{cartsize}</span>
        </Button>
        <UserCartWrapper setopensheet={setopensheet}/>
      </Sheet>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-64 shadow-xl rounded-xl bg-white">
          <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/shopping/account')} className="hover:bg-gray-200 rounded-xl">
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handlelogout} className="hover:bg-gray-200 rounded-xl">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const [openSheet, setOpenSheet] = useState(false);
  return (
    
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Section (Logo) */}
        <Link to="/shopping/home" className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="font-bold">Fashion Cart</span>
        </Link>

        {/* Center (MenuItems) - Hidden on small screens */}
        <div className="hidden md:flex flex-1 justify-center">
          <MenuItems />
        </div>

        {/* Right Section (Cart & User) */}
        <div className="hidden md:flex">
          <HeaderRightContent />
        </div>

        {/* Mobile Menu (Sheet) */}
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger className="md:hidden ml-auto" asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent  side="left" className="w-full max-w-xs">
            <HeaderRightContent />
            <DropdownMenuSeparator className="mb-4" />
            <MenuItems closeSheet={()=>setOpenSheet(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default ShoppingHeader;
