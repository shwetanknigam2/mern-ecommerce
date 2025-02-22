import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./auth-slice";
import adminProductsSlice from './admin/adminproductslice'
import shoppingProductsSlice from './shopping/products-slice'
import shoppingcartslice from './shopping/cart-slice'
import shoppingorderslice from './shopping/order-slice'
import shoppingaddressslice from './shopping/address-slice'
import adminorderslice from './admin/adminorderslice'
import searchslice from './shopping/search-slice'
import reviewslice from './shopping/review-slice'
const store=configureStore({

    reducer:{
        auth:authreducer,
        adminProducts:adminProductsSlice,
        shoppingProducts:shoppingProductsSlice,
        shoppingcart:shoppingcartslice,
        shoppingaddress:shoppingaddressslice,
        shoppingorder:shoppingorderslice,
        adminorder:adminorderslice,
        search:searchslice,
        review:reviewslice
    }

})

export default store