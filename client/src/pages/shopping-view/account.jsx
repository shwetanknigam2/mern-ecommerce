import React from 'react'
import accImg from '../../assets/account.jpg'
import { Tabs, TabsTrigger } from '@radix-ui/react-tabs'
import { TabsContent, TabsList } from '@/components/ui/tabs'
import Address from '@/components/shopping-view/address'
import ShoppingOrders from '@/components/shopping-view/Shoppingorders'

function Shoppingaccount() {
  return <div className='flex flex-col '>
    <div className='relative h-[300px] w-full overflow-hidden'>
      <img 
   className='h-full w-full object-cover object-center'
      src={accImg} alt="Account" />
    </div>
    <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
    <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
  <Tabs defaultValue="orders">
    <TabsList className="flex gap-3 bg-white  border-b pb-7">
      <TabsTrigger 
        className="px-4 py-2 rounded-md text-black bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white"
        value="orders"
      >
        Orders
      </TabsTrigger>
      <TabsTrigger 
        className="px-4 py-2 rounded-md text-black bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white"
        value="address"
      >
        Address
      </TabsTrigger>
    </TabsList>
    <TabsContent value="orders" className="p-4  rounded-md mt-3">
      <ShoppingOrders/>
    </TabsContent>
    <TabsContent value="address" className="p-4  rounded-md mt-3">
      <Address/>
    </TabsContent>
  </Tabs>
</div>


    </div>
  </div>
}

export default Shoppingaccount