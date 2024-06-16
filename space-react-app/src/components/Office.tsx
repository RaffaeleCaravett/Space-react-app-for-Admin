import { useSelector } from "react-redux";
import { tokenInterface } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

const Office = () => {
 const isLoggedIn= useSelector((state:tokenInterface)=>state.accessToken.isLoggedIn)
 const navigate = useNavigate()
 if(!isLoggedIn){
    navigate("/forms")
 }

 return(
     <div>
                Office
            </div>
            )
        }
export default Office;