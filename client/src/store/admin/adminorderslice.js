import axios from "axios";

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"



const initialState = {
 
    orderList:[],
    isLoading:false
  
  };


  export const getAllorders=createAsyncThunk('/order/getAllorders',
    async()=>{
      const response=await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/order/list`
      )
      return response.data
    }
  )
export const updateorderstatus=createAsyncThunk('order/updateorderstatus',
    async({id,orderStatus})=>{
        const response=await axios.put(
            `${import.meta.env.VITE_API_URL}/api/admin/order/update/${id}`,
           { orderStatus}
        )
        return response.data
    }
)

 














const adminorderslice=createSlice({
    name:'adminorderslice',
    initialState,
    reducers:{},
    extraReducers:
        (builder)=>{
            builder.addCase(getAllorders.pending, (state)=>{
                      state.isLoading=true
                  }).addCase(getAllorders.fulfilled,(state,action)=>{
                      state.isLoading=false
                      state.orderList=action.payload.data
            
                  }).addCase(getAllorders.rejected,(state)=>{
                      state.isLoading=false
                      state.orderList=[]
                  })

        }
    


})



export default adminorderslice.reducer;