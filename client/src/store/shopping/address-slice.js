import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    isLoading:false,
    addressList:[]
}

export const addAddress=createAsyncThunk('/address/addAddress',
    async(formData)=>{
        const response= await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shopping/address/add`,
                formData
            
        )

        return response?.data
    }
)
export const fetchAddress=createAsyncThunk('/address/fetchAddress',
    async(userId)=>{
        const response= await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shopping/address/get/${userId}`
                
            
        )

        return response?.data
    }
)
export const editAddress=createAsyncThunk('/address/editAddress',
    async({userId,addressId,formData})=>{
        const response= await axios.put(
            `${import.meta.env.VITE_API_URL}/api/shopping/address/edit/${userId}/${addressId}`,
            formData
                
            
        )

        return response?.data
    }
)
export const deleteAddress=createAsyncThunk('/address/deleteAddress',
    async({userId,addressId})=>{
        const response= await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/shopping/address/delete/${userId}/${addressId}`,
                
            
        )

        return response?.data
    }
)


 const addressSlice=createSlice({
       name:'address',
       initialState,
       reducers:{},
       extraReducers:(builder)=>{
          builder.addCase(addAddress.pending,(state)=>{
              state.isLoading=true
          }).addCase(addAddress.fulfilled,(state,action)=>{
            state.isLoading=false
          
        }).addCase(addAddress.rejected,(state)=>{
            state.isLoading=false
        
        }).addCase(fetchAddress.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchAddress.fulfilled,(state,action)=>{
          state.isLoading=false
          state.addressList=action.payload.data
      }).addCase(fetchAddress.rejected,(state)=>{
          state.isLoading=false
          state.addressList=[]
      })

       }
 })

 export default addressSlice.reducer