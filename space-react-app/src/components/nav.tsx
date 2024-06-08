import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { tokenInterface } from "../interfaces/interfaces";
import { setUser } from "../redux/userSlice";
import { setAccessToken, setIsLoggedIn } from "../redux/accessTokenSlice";

const Nav = () =>{

const isLoggedIn:boolean = useSelector((state:tokenInterface)=>state.accessToken.isLoggedIn)
   
const dispatch = useDispatch();
const navigate = useNavigate();
const logout = () => {
    localStorage.clear()
  dispatch(setIsLoggedIn(false));
  dispatch(setUser(''))
  dispatch(setAccessToken(''))
navigate('/home')
} 

    return(
<nav className="p-2 bg-info text-dark text-center">
    <div className="row">
        <div className="col-md-4 p-2">
          <Link to={'/home'}> Home</Link> 
        </div>
         <div className="col-md-4 p-2">
         <Link to={'/office'}>Office</Link> 
        </div>
        <div className="col-md-4 p-2">
        {!isLoggedIn &&< Link to={'/forms'}>Login</Link>}  
        {isLoggedIn &&< Link to={'/forms'} onClick={()=>{logout()}}>Logout</Link>}  
        </div>
    </div>
</nav>
    )
}

export default Nav