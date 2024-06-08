import { createSlice } from "@reduxjs/toolkit";

export const accessTokenSlice = createSlice({
    name:'accessToken',
    initialState:{
        accessToken:'',
        isLoggedIn:true
    },
    reducers:{
        setAccessToken: (accessToken,action)=>{
            accessToken.accessToken=action.payload.accessToken
        },
        deleteAccessToken: (accessToken)=>{
            accessToken.accessToken=''
        },
        setIsLoggedIn: (accessToken,action) =>{
            accessToken.isLoggedIn=action.payload
        }
    }
})

export const {setAccessToken, deleteAccessToken, setIsLoggedIn} = accessTokenSlice.actions;
export const accessTokenReducer = accessTokenSlice.reducer;