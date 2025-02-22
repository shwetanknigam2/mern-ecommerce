import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState= {
    items: [],
    isloading: false,

}

export const addtocart=createAsyncThunk('/cart/addtocart',
    async ({userId,productId,quantity})=>{

        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/shopping/cart/add`,{
            productId,
            userId,
            quantity
        })
        return result?.data
    }
    
)

export const fetchcartitems=createAsyncThunk('/cart/fetchcartitems',
    async (userId)=>{
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopping/cart/get/${userId}`)
        return result?.data
    }
   

)

export const deletecartitem=createAsyncThunk('/cart/deletecartitem',
    async ({userId,productId})=>{
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shopping/cart/${userId}/${productId}`)
        return result?.data
    }
)


export const updatecartitem=createAsyncThunk('/cart/updatecartitem',
    async ({userId,productId,quantity})=>{
        const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/shopping/cart/update`,{
            userId,
            productId,
            quantity
        })
        return result?.data
    }
)
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addtocart.pending, (state, action) => {
            state.isloading = true
        })
        builder.addCase(addtocart.fulfilled, (state, action) => {
            state.isloading = false
            state.items = action.payload.data
        })
        builder.addCase(addtocart.rejected, (state, action) => {
            state.isloading = false
            state.items = []
        })
        builder.addCase(fetchcartitems.pending, (state, action) => {
            state.isloading = true
        })
        builder.addCase(fetchcartitems.fulfilled, (state, action) => {
            state.isloading = false
            state.items = action.payload.data
        })
        builder.addCase(fetchcartitems.rejected, (state, action) => {
            state.isloading = false
            state.items = []
        })
        builder.addCase(deletecartitem.pending, (state, action) => {
            state.isloading = true
        })
        builder.addCase(deletecartitem.fulfilled, (state, action) => {
            state.isloading = false
            state.items = action.payload.data
        })
        builder.addCase(deletecartitem.rejected, (state, action) => {
            state.isloading = false
            state.items = []
        })
        builder.addCase(updatecartitem.pending, (state, action) => {
            state.isloading = true
        })
        builder.addCase(updatecartitem.fulfilled, (state, action) => {
            state.isloading = false
            state.items = action.payload.data
        })
        builder.addCase(updatecartitem.rejected, (state, action) => {
            state.isloading = false
            state.items = []
        })
    }

})

export default cartSlice.reducer