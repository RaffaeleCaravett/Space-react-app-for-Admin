import { createSlice } from "@reduxjs/toolkit";

export const api = createSlice({
    name:'api',
    initialState:{
        url:'http://localhost:3031/'
        },
    reducers:{
        setUrl: (api,action)=>{
            api.url=action.payload.url
        },
    }
})

export const {setUrl} = api.actions;
export const apiReducer = api.reducer;