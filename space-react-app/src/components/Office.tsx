/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { tokenInterface } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setUser } from "../redux/userSlice";

const Office = () => {
 const isLoggedIn= useSelector((state:tokenInterface)=>state.accessToken.isLoggedIn)
 const navigate = useNavigate()

const api_url = useSelector((state:any) => state.api.url)
 const dispatch = useDispatch()
useEffect(() => {
 if(!isLoggedIn){
    navigate("/forms")
 }
 })
const handleWindowRefresh = () => {
    if(window.performance.navigation.type == 1){
     if(localStorage.getItem('accessToken')){
      const token = localStorage.getItem('accessToken')

      fetch(`${api_url+'auth/'+token}`,{
        method: "GET",
        headers: {
          "Content-Length": "0"
        }
    }).then((res)=>{
        return res.json()
    }).then((res)=>{
        if(res){
            dispatch(setUser(res))
            navigate('/office')
        }
    }).catch((error)=>{
        console.log(error)
      })
     }else{
        if(localStorage.getItem('refreshToken')){
console.log('refreshToken')
        }
     }
    
    }
}
window.addEventListener('load', handleWindowRefresh);

 return(
     <div>
                Office
            </div>
            )
        }
export default Office;


