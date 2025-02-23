
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";





const initialState={
    isAuthenticated:false,
    isLoading:true,
    user:null,
    token:null
}

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
    
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{},  {
            withCredentials: true,
        });
        return response.data; // Success
     
});

export const registerUser = createAsyncThunk('/auth/register', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData, {
            withCredentials: true,
        });
        return response.data; // Success
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data); // Pass backend response to the action
        }
        return rejectWithValue({ message: 'Something went wrong', success: false }); // Default error
    }
});


export const loginUser = createAsyncThunk('/auth/login', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData, {
            withCredentials: true,
        });
        return response.data; // Success
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data); // Pass backend response to the action
        }
        return rejectWithValue({ message: 'Something went wrong', success: false }); // Default error
    }
});

export const checkAuth= createAsyncThunk('/auth/checkauth', 
    async (token)=>{
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/checkauth`,{
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${token}`,
                'Cache-Control':'no-cache, no-store, must-revalidate proxy-revalidate',
                Expires:0

            }
        })
        return response.data

    }

)



const authslice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
          resetToken:(state)=>{
            state.isAuthenticated=false,
            state.user=null,
            state.token=null
          }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        })
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=!action.payload.success?false:true
            state.user=!action.payload.success? null:action.payload.user
            state.token=action.payload.token
            sessionStorage.setItem('token',JSON.stringify(action.payload.token))
        })
        builder.addCase(loginUser.rejected,(state)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
            state.token=null
        })
        builder.addCase(checkAuth.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(checkAuth.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=!action.payload.success?false:true
            state.user=!action.payload.success? null:action.payload.user
        })
        builder.addCase(checkAuth.rejected,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        })
        builder.addCase(logoutUser.fulfilled,(state)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
        })
    }
})

export const {setUser,resetToken}=authslice.actions
export default authslice.reducer