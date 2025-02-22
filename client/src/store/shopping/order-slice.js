import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId: null,
    orderList:[],
    orderDetails:null
  
  };



export const createNewOrder = createAsyncThunk(
    "/order/createNewOrder",
    async (orderData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shopping/order/create`,
        orderData
      );
  
      return response.data;
    }
  );

export const capturePayment=createAsyncThunk('/order/capturePayment',
  async ( {paymentId,payerId,orderId})=>{
    const response=await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shopping/order/capture`,
      {paymentId,payerId,orderId}
      )
      return response.data
  }
)

export const getAllUserorders=createAsyncThunk('/order/getAllUserorders',
  async(userId)=>{
    const response=await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shopping/order/list/${userId}`
    )
    return response.data
  }
)

export const getorderdetails=createAsyncThunk('/order/getorderdetails',
  async(id)=>{
    const response=await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shopping/order/details/${id}`
    )
    return response.data
  }
)



  const shoppingOrderSlice=createSlice({
    name:'shoppingOrderSlice',
    initialState,
    reducers:{

      resetorderdetails:(state)=>{
        state.orderDetails=null
      }
      
    },
    extraReducers:(builder)=>{
        builder.addCase(createNewOrder.pending, (state)=>{
            state.isLoading=true
        }).addCase(createNewOrder.fulfilled,(state,action)=>{
            state.isLoading=false
            state.approvalURL=action.payload.approvalURL,
            state.orderId=action.payload.orderId
            sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId))
        }).addCase(createNewOrder.rejected,(state)=>{
            state.isLoading=false
            state.approvalURL=null,
            state.orderId=null
        }).addCase(getAllUserorders.pending, (state)=>{
          state.isLoading=true
      }).addCase(getAllUserorders.fulfilled,(state,action)=>{
          state.isLoading=false
          state.orderList=action.payload.data

      }).addCase(getAllUserorders.rejected,(state)=>{
          state.isLoading=false
          state.orderList=[]
      }).addCase(getorderdetails.pending, (state)=>{
        state.isLoading=true
    }).addCase(getorderdetails.fulfilled,(state,action)=>{
        state.isLoading=false
        state.orderDetails=action.payload.data

    }).addCase(getorderdetails.rejected,(state)=>{
        state.isLoading=false
        state.orderDetails=null
    })
    },
  })

  export const {resetorderdetails}=shoppingOrderSlice.actions
  export default shoppingOrderSlice.reducer;

  