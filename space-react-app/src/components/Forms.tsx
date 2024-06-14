import { useState } from "react";


const Forms = () => {




    const [login,setLogin] = useState(true)

  const [emailError,setEmailError]= useState('')
  const  [passwordError,setPasswordError] = useState('')
   

const logIn = (e: Event)=>{
    e.preventDefault()
    const form = e.target
    console.log(e)
 console.log(form)
}

    return(
<div className="container text-center form-bg">
    <div className="row">
<div className="col-md-12 py-5">
    <h1>Forms</h1>
</div>
<div className="col-md-6 py-5">
<h2>Another one</h2>
    <p className="fs-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</div>
<div className="col-md-6 py-5">
{login&&<h1>Login</h1>}
{!login&&<h1>Signup</h1>}
<div className="p-2">
{login && <form action="" className="border p-2 shadow rounded" name="" onSubmit={()=>logIn(event!)}>
    <label className="fw-bold">Email</label><br />
    <input type="text" className="form-control shadow-lg bg-transparent" name="email" onInvalid={()=>setEmailError("Inserisci un valore tipo 'a@a.com'.")} /><br />
    {emailError!=""&&<p>{emailError}</p>}
    <label className="fw-bold">Password</label><br />
    <input type="text" className="form-control shadow-lg bg-transparent" name="password" minLength={6} onInvalid={()=>setPasswordError("Inserisci un valore con lunghezza minima : 6 caratteri.")}/><br />
    {passwordError!=""&&<p>{passwordError}</p>}
<button className="btn btn-light" type="submit">Login</button>
<hr />
<p>or</p>
<button className="btn btn-transparent" onClick={()=>setLogin(false)}>Signup</button>
</form>}
{!login && <form action="" className="border p-2 shadow rounded">
    <button className="btn btn-light">Signup</button>
    <hr />
    <p>or</p>
    <button className="btn btn-transparent" onClick={()=>setLogin(true)}>Login</button>
    </form>}
</div>
</div>
    </div>
    </div>
    )
}
export default Forms;