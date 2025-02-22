import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



const initialState = {
    isloading: false,
    productList: [],
    productDetails: null
}
export  const getfilteredproducts=createAsyncThunk('/products/getfiltered',
    async ({filterParams,sortParams})=>{

        

        const query=new URLSearchParams({
            ...filterParams,
            sortby:sortParams
         })

    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/products/get?${query}`
      
    )

   
    

    return result?.data
})

export  const getproductdetails=createAsyncThunk('/products/getproductdetails',
    async ({id})=>{

        


    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/products/get/${id}`
      
    )

   

    return result?.data
})
const ShoppingProductSlice = createSlice({

    name: 'shoppingproducts',
    initialState,
    reducers: {
        setproductdetails:(state)=>{
            state.productDetails=null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getfilteredproducts.pending, (state)=>{
            state.isloading=true
        })
        builder.addCase(getfilteredproducts.fulfilled, (state, action)=>{
   
            state.isloading=false
            state.productList=action.payload.data
        })
        builder.addCase(getfilteredproducts.rejected, (state)=>{

            state.isloading=false
            state.productList=[]
        })
        builder.addCase(getproductdetails.pending, (state)=>{
            state.isloading=true
        })
        builder.addCase(getproductdetails.fulfilled, (state, action)=>{
   
            state.isloading=false
            state.productDetails=action.payload.data
        })
        builder.addCase(getproductdetails.rejected, (state)=>{

            state.isloading=false
            state.productDetails=null
        })
    }
    
})

export const {setproductdetails}=ShoppingProductSlice.actions

export default ShoppingProductSlice.reducer