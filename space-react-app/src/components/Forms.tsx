/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { setAccessToken, setIsLoggedIn } from "../redux/accessTokenSlice";


const Forms = () => {

const api_url = useSelector((state:any) => state.api.url)


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
          if(res&&!res.message){
            if(res.role=='ADMIN'){
            dispatch(setAccessToken(localStorage.getItem('accessToken')))
            dispatch(setIsLoggedIn(true))
              dispatch(setUser(res))
              if(localStorage.getItem('route')){  
navigate(`/${localStorage.getItem('route')}`)
}else{
              navigate('/office')
          }
        }else{
            throw Error(`${res.message}`)
        }
      }else{
        throw Error("Il ruolo utente non è admin")
      }
    }).catch((error)=>{
        console.log(error)
 if(localStorage.getItem('refreshToken')){
        fetch(`${api_url+'auth/refreshToken/'+localStorage.getItem('refreshToken')}`,{
            method: "GET",
            headers: {
              "Content-Length": "0"
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            if(res&&!res.message){
           localStorage.setItem('accessToken',res.accessToken)
           dispatch(setAccessToken(localStorage.getItem('accessToken')))
           localStorage.setItem('refreshToken',res.refreshToken)

           fetch(`${api_url+'auth/'+res.accessToken}`,{
            method: "GET",
            headers: {
              "Content-Length": "0"
            }
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            if(res&&!res.message){
             if(res.role=='ADMIN'){
                dispatch(setIsLoggedIn(true))
                dispatch(setUser(res))
                if(localStorage.getItem('route')){  
                  // eslint-disable-next-line react-hooks/rules-of-hooks
  navigate(`/${localStorage.getItem('route')}`)
  }else{
                navigate('/office')
            }
        }else{
            throw Error("Il ruolo utente non è admin")
          } 
         }else{
              throw Error(`${res.message}`)
          } 
        
        })
        }else{
                throw Error (res.message)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
       }
    })      
    }
    if(!localStorage.getItem('accessToken')&&!localStorage.getItem('refreshToken')){
        console.log('no tokens')
    }
    }
}
window.addEventListener('load', handleWindowRefresh);

    const [login,setLogin] = useState(true)

  const [emailError,setEmailError]= useState('')
  const  [passwordError,setPasswordError] = useState('')
  const  [loginError,setLoginError] = useState('')
   
  const [emailSignupError,setEmailSignupError]= useState('')
  const  [passwordSignupError,setPasswordSignupError] = useState('')
   const [nomeSignupError,setNomeSignupError]= useState('')
  const  [cognomeSignupError,setCognomeSignupError] = useState('')
  const [etaSignupError,setEtaSignupError]= useState('')
  const  [signupError,setSignupError] = useState('')
  const  [signupSuccess,setSignupSuccess] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();



const fetchLogin = (email:string,password:string) =>{
        fetch(`${api_url}auth/login`,{
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {email:email,password:password}
            ) 
          
        })
        .then((res)=>{
            return res.json();
        }).then((res)=>{
            if(res&&res.message){
                setLoginError(res.message)
            }else if(res&&!res.message){
                dispatch(setAccessToken(res.tokens.accessToken))
                dispatch(setIsLoggedIn(true))
                localStorage.setItem('accessToken',res.tokens.accessToken)
                localStorage.setItem('refreshToken',res.tokens.refreshToken)
                
fetch(`${api_url}auth/${res.tokens.accessToken}`,{
    method: "GET",
    headers: {
      "Content-Length": "0"
    }
}).then((res)=>{
    return res.json()
}).then((res)=>{
    if(res&&!res.message){
        if(res.role=='ADMIN'){
        dispatch(setUser(res))
        setLoginError("")
        navigate('/office')
        }else{
            localStorage.clear()
            throw Error("Il ruolo dell'user non è admin")
        }
    }else{
        throw Error(res.message)
    }
}).catch((error)=>{
    dispatch(setAccessToken(""))
    dispatch(setIsLoggedIn(false))
    dispatch(setUser({}))
    if(error!="Error: Il ruolo dell'user non è admin"){
    navigate("/home")
    }else{
        console.log(error)
    setLoginError(error.toString())
    }
})
            }
        }
        ).catch((error)=>{
            console.log("error : " + error)
        })
}

const logIn = (e: Event)=>{
    e.preventDefault()
   
    const email = document.getElementById('emailLogin') as HTMLInputElement
    const password = document.getElementById('passwordLogin') as HTMLInputElement
    const emailRegex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    let counter = 0;
if(email.value.length==0||email.value==undefined||email.value==null){
    setEmailError("Inserisci un valore.")
}else{
    setEmailError("")
    if(!emailRegex.test(email.value)){
        setEmailError("Inserisci un valore di tipo 'email@value.aa'.")
    }else{
        counter=counter+1
    }
}
if(password.value.length<6||password.value==undefined||password.value==null){
    setPasswordError("Inserisci un valore con almeno 6 caratteri.")
}else{
    setPasswordError("")
    counter=counter+1
}
console.log(counter)
if(counter==2){
    console.log(counter)
    fetchLogin(email.value,password.value)
}else{
    console.log(counter)
}

}



const fetchSignup = (body:any)=>{

  fetch(`${api_url}auth/register`,{
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
        body
    ) 
  }).then((res)=>{
    return res.json()
  }).then((res)=>{
    console.log(res)
     if(res&&res.message){
        setSignupSuccess("")
        setSignupError(res.message)
    }else if(res&&res.messageList){
        console.log('ihih')
        setSignupSuccess("")
        setSignupError(res.messageList[0])
    }else if(res&&!res.message){
        setSignupSuccess("Utente registrato con successo.")
setSignupError("")
    }
  })
  .catch((error)=>{
    console.log(error)
    setSignupError(error.error.message)
  })
}

const signup = (e:Event) =>{
    e.preventDefault()
    let counter:number=0
   const email = document.getElementById('emailSignup') as HTMLInputElement
const emailPattern =  new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')

   if(email.value==undefined||email.value==null||email.value==''||email.value.length==0){
    setEmailSignupError("Inserisci un valore.")
    setSignupSuccess("")
}else{
    setEmailSignupError("")
    counter=counter+1
    if(!emailPattern.test(email.value)){
        setEmailSignupError("Inserisci un valore tipo 'a@a.com'")
        setSignupSuccess("")
        counter=counter-1
    }
}
const password = document.getElementById('passwordSignup') as HTMLInputElement
if(password.value==undefined||password.value==null||password.value.length<6){
    setPasswordSignupError("Inserisci un valore con almeno 6 caratteri")
    setSignupSuccess("")
}else{
    setPasswordSignupError("")
    counter=counter+1
}
const nome = document.getElementById('nomeSignup') as HTMLInputElement
if(nome.value==undefined||nome.value==null||nome.value.length==0){
    setNomeSignupError("Inserisci un valore.")
    setSignupSuccess("")
}else{
    setNomeSignupError("")
    counter=counter+1
}
const cognome = document.getElementById("cognomeSignup") as HTMLInputElement
if(cognome.value==undefined||cognome.value==null||cognome.value.length==0){
    setCognomeSignupError("Inserisci un valore.")
    setSignupSuccess("")
}else{
    setCognomeSignupError("")
    counter=counter+1
}
const eta = document.getElementById("etaSignup") as HTMLInputElement
if(eta.value==undefined||eta.value==null||eta.value < '18'){
    setEtaSignupError("Devi avere almeno 18 anni.")
    setSignupSuccess("")
}else{
    setEtaSignupError("")
    counter=counter+1
}
if(counter===5){
    const body = {
        email:email.value,
        password:password.value,
        nome:nome.value,
        cognome:cognome.value,
        eta:eta.value
            }

fetchSignup(body)
}
}

    return(
        <div className="row p-0 py-5 m-0 form-bg">
<div className="container text-center py-5">
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
    <input type="text" className="form-control shadow-lg bg-transparent" id="emailLogin" onInvalid={()=>setEmailError("Inserisci un valore tipo 'a@a.com'.")} /><br />
    {emailError!=""&&<p className="text-danger">{emailError}</p>}
    <label className="fw-bold">Password</label><br />
    <input type="password" className="form-control shadow-lg bg-transparent" id="passwordLogin" minLength={6} onInvalid={()=>setPasswordError("Inserisci un valore con lunghezza minima : 6 caratteri.")}/><br />
    {passwordError!=""&&<p className="text-danger">{passwordError}</p>}
    {loginError !=""&& <p className="text-danger">{loginError}</p> }
<button className="btn btn-light" type="submit">Login</button>
<hr />
<p>or</p>
<button className="btn btn-transparent" onClick={()=>[setLogin(false),setSignupError(""),setEmailSignupError(""),setPasswordSignupError(""),setNomeSignupError(""),setCognomeSignupError(""),setEtaSignupError("")]}>Signup</button>
</form>}
{!login && <form action="" onSubmit={()=>signup(event!)} className="border p-2 shadow rounded">
<label className="fw-bold">Email</label><br />
    <input type="text" className="form-control shadow-lg bg-transparent" id="emailSignup" onInvalid={()=>setEmailSignupError("Inserisci un valore tipo 'a@a.com'.")} /><br />
    {emailSignupError!=""&&<p className="text-danger">{emailSignupError}</p>}
    <label className="fw-bold">Password</label><br />
    <input type="password" className="form-control shadow-lg bg-transparent" id="passwordSignup" minLength={6} onInvalid={()=>setPasswordSignupError("Inserisci un valore con lunghezza minima : 6 caratteri.")}/><br />
    {passwordSignupError!=""&&<p className="text-danger">{passwordSignupError}</p>}
    <label className="fw-bold">Nome</label><br />
    <input type="text" className="form-control shadow-lg bg-transparent" id="nomeSignup" onInvalid={()=>setNomeSignupError("Inserisci un valore.")} /><br />
    {nomeSignupError!=""&&<p className="text-danger">{nomeSignupError}</p>}
    <label className="fw-bold">Cognome</label><br />
    <input type="text" className="form-control shadow-lg bg-transparent" id="cognomeSignup" onInvalid={()=>setCognomeSignupError("Inserisci un valore.")}/><br />
    {cognomeSignupError!=""&&<p className="text-danger">{cognomeSignupError}</p>}
    <label className="fw-bold">Età</label><br />
    <input type="number" className="form-control shadow-lg bg-transparent" id="etaSignup"  onInvalid={()=>setEtaSignupError("Inserisci un valore maggiore di 18.")}/><br />
    {etaSignupError!=""&&<p className="text-danger">{etaSignupError}</p>}
    {signupError !=""&& <p className="text-danger">{signupError}</p> }
    {signupSuccess !=""&& <p className="text-success">{signupSuccess}</p> }
    <button className="btn btn-light" type="submit" >Signup</button>
    <hr />
    <p>or</p>
    <button className="btn btn-transparent"onClick={()=>[setLogin(true),setLoginError(""),setEmailError(""),setPasswordError("")]}>Login</button>
    </form>}
</div>
</div>
    </div>
    </div>
        </div>
    )
}
export default Forms;