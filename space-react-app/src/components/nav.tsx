import { Link } from "react-router-dom";


const Nav = () =>{


    
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
        <Link to={'/forms'}>Login</Link>  
        </div>
    </div>
</nav>
    )
}

export default Nav