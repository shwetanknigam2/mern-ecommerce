import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    isLoading:false,
    searchResults:[]

}


export const getsearchresults=createAsyncThunk('/search/getsearchresults',
    async (keyword)=>{
        const response=await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shopping/search/${keyword}`
        )
        return response.data
    }
)

const searchslice=createSlice({
    name:'searchslice',
    initialState,
    reducers:{
       resetsearch:(state)=>{
        state.searchResults=[]
       }
    },
    extraReducers:(builder)=>{
        builder.addCase(getsearchresults.pending,(state)=>{
            state.isLoading=true
        }).addCase(getsearchresults.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.searchResults=action.payload.data
        }).addCase(getsearchresults.rejected,(state)=>{
            state.isLoading=false,
            state.searchResults=[]
        })
    }
})

export const {resetsearch}=searchslice.actions

export default searchslice.reducer