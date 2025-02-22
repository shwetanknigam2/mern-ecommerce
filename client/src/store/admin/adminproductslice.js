import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



const initialState={
    isLoading:false,
    productList:[]
}

export  const addNewProduct=createAsyncThunk('/products/addproduct',
    async (formdata)=>{
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/addproduct`,formdata,
        {
            headers:{
                'Content-type':'application/json'
            }
        }
    )

    return result?.data
})

export  const fetchProduct=createAsyncThunk('/products/fetchproduct',
    async ()=>{
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/fetchproduct`
       
    )

   
    

    return result?.data
})

export  const editProduct=createAsyncThunk('/products/editproduct',
    async ({id,formdata})=>{
    const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/editproduct/${id}`,formdata,
        {
            headers:{
                'Content-type':'application/json'
            }
        }
    )

    return result?.data
})

export  const deleteProduct=createAsyncThunk('/products/deleteproduct',

    async (id)=>{
    const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/deleteproduct/${id}`,
    )

    return result?.data
})

const AdminProductSlice=createSlice({
    name:'adminproducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
            builder.addCase(fetchProduct.pending, (state)=>{
                state.isLoading=true

            }).addCase(fetchProduct.fulfilled, (state,action)=>{
               
                
                state.isLoading=false
                state.productList=action.payload.data
            }).addCase(fetchProduct.rejected, (state,action)=>{
               
                
                state.isLoading=false
                state.productList=[]
            })
    }


})


export default AdminProductSlice.reducer