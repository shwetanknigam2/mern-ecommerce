import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Authlayout from './components/auth/layout.jsx'
import login from './pages/auth/login.jsx'
import register from './pages/auth/register.jsx'
import Authlogin from './pages/auth/login.jsx'
import Authregister from './pages/auth/register.jsx'
import Adminlayout from './components/admin-view/layout.jsx'
import Admindashboard from './pages/admin-view/dashboard.jsx'
import Adminfeatures from './pages/admin-view/features.jsx'
import Adminorders from './pages/admin-view/orders.jsx'
import Adminproducts from './pages/admin-view/products.jsx'
import Shoppinglayout from './components/shopping-view/layout.jsx'
import Notfound from './pages/notfound.jsx'
import Shoppingaccount from './pages/shopping-view/account'
import Shoppingcheckout from './pages/shopping-view/checkout'
import Shoppinghome from './pages/shopping-view/home'
import Shoppinglisting from './pages/shopping-view/listing'
import Checkauth from './components/common/checkauth'
import UnauthPage from './pages/unauth'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import { useDispatch } from 'react-redux'
import { Skeleton } from './components/ui/skeleton'
import Paypalreturn from './pages/shopping-view/paypal-return'
import Paypalcancel from './pages/shopping-view/paypalcancel'
import Paymentsuccess from './pages/shopping-view/payment-success'
import ProductSearch from './pages/shopping-view/search'

function App() {
  const [count, setCount] = useState(0)

  const{user,isAuthenticated,isLoading}=useSelector(state=>state.auth)
  const dispatch=useDispatch()

  useEffect(() => {dispatch(checkAuth())},[dispatch])
  if(isLoading){
    return <Skeleton className="w-[800px] h-[600px] bg-black rounded-full" />

  }
  return (
    <>
     <div className='flex flex-col overflow-hidden bg-white'>
      
      <Routes>
        <Route path='/'element={<Checkauth isAuthenticated={isAuthenticated} user={user}>
          <Authlayout/>
        </Checkauth>}/>
        <Route path="/auth" element={
          <Checkauth isAuthenticated={isAuthenticated} user={user}>
          <Authlayout/>
        </Checkauth>}>
          <Route path="login" element={<Authlogin/>}/>
          <Route path='register' element={<Authregister/>}/>

        </Route>

        <Route path="/admin" element={
          <Checkauth isAuthenticated={isAuthenticated} user={user}>
          <Adminlayout/>
        </Checkauth>
          }>
          <Route path="dashboard" element={<Admindashboard/>}/>
          <Route path="features" element={<Adminfeatures/>} />
          <Route path="orders" element={<Adminorders/>}/>
          <Route path="products" element={<Adminproducts/>}/>
        
        </Route>


        <Route path="/shopping" element={
          <Checkauth isAuthenticated={isAuthenticated} user={user}>
          <Shoppinglayout/>
          </Checkauth>
          }>
           <Route path="account" element={<Shoppingaccount/>}/> 
           <Route path="checkout" element={<Shoppingcheckout/>}/> 
           <Route path="home" element={<Shoppinghome/>}/> 
           <Route path="listing" element={<Shoppinglisting/>}/>  
          <Route path='paypal-return' element={<Paypalreturn/>}/>
          <Route path='paypal-cancel' element={<Paypalcancel/>}/>
          <Route path='payment-success' element={<Paymentsuccess/>}/>
          <Route path='search' element={<ProductSearch/>}/>
        </Route>
        <Route path="*" element={<Notfound/>}/>
        <Route path="/unauth-page" element={<UnauthPage/>}/>
      </Routes>

     </div>
    
    </>
  )
}

export default App
