import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { accessTokenReducer } from "./accessTokenSlice";
import { apiReducer } from "./apiUrl";

export default configureStore({
    reducer: {
api:apiReducer,
accessToken : accessTokenReducer,
user: userReducer,    
}
})


