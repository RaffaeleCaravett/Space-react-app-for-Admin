/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useSelector } from "react-redux";
import { tokenInterface } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { setUser } from "../redux/userSlice";
// import { api } from "../redux/apiUrl";

const Office = () => {
 const isLoggedIn= useSelector((state:tokenInterface)=>state.accessToken.isLoggedIn)
 const navigate = useNavigate()
localStorage.setItem('route','office')
const api_url = useSelector((state:any) => state.api.url)
// const dispatch = useDispatch()
console.log(api_url)
const CheckLoggedIn =()=>{ 
    useEffect(() => {
 if(!isLoggedIn){
    navigate("/forms")
 }
 })
}
CheckLoggedIn()
// const handleWindowRefresh = () => {
//     if(window.performance.navigation.type == 1){
//      if(localStorage.getItem('accessToken')){
//       const token = localStorage.getItem('accessToken')

//       fetch(`${api_url+'auth/'+token}`,{
//         method: "GET",
//         headers: {
//           "Content-Length": "0"
//         }
//     }).then((res)=>{
//         return res.json()
//     }).then((res)=>{
//         if(res&&!res.message){
//             dispatch(setUser(res))
//             // eslint-disable-next-line react-hooks/rules-of-hooks
//             useEffect(() => {
//             navigate('/office')
//             })
//         }else{
//         throw Error(`${res.message}`)
//     }
//     }).catch((error)=>{
//         console.log(error)
//       })
//      }else{
//         if(localStorage.getItem('refreshToken')){
// console.log('refreshToken')
//         }
//      }
    
//     }
// }
// window.addEventListener('load', handleWindowRefresh);

 return(
     <div className="container text-center">
             <div className="row py-5">
                <div className="col-md-12 py-5">
                <h1>Your call is to do great things</h1>
                <p className="fs-5">So, let's keept your head up and work on the things you do!</p>
                </div>
                    <div className="col-md-4 p-2">
<div className="border rounded shadow p-2">
<h2>Cosa vuoi fare?</h2>
</div>
                    </div>
                    <div className="col-md-8 p-2">
<div className="border rounded shadow p-2">
<h2>Come on</h2>
</div>
                </div>
             </div>
            </div>
            )
        }
export default Office;


