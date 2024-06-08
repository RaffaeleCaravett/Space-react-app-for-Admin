import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { accessTokenReducer } from "./accessTokenSlice";

export default configureStore({
    reducer: {
accessToken : accessTokenReducer,
user: userReducer
    }
})