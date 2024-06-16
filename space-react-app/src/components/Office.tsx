import { useSelector } from "react-redux";
import { tokenInterface } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Office = () => {
 const isLoggedIn= useSelector((state:tokenInterface)=>state.accessToken.isLoggedIn)
 const navigate = useNavigate()
 useEffect(() => {
 if(!isLoggedIn){
    navigate("/forms")
 }
 })
const handleWindowRefresh = () => {
    if(window.performance.navigation.type == 1){
        console.log('ihih')
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