/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useSelector } from "react-redux";
import { tokenInterface } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { setUser } from "../redux/userSlice";
// import { api } from "../redux/apiUrl";

const Office = () => {
 const isLoggedIn= useSelector((state:tokenInterface)=>state.accessToken.isLoggedIn)
 const navigate = useNavigate()
 const [toDo,setToDo]= useState('addPlanet')
 const [addPlanetNameError,setAddPlanetNameError] = useState("")
 const [addGalaxyNameError,setAddGalaxyNameError] = useState("")

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

const addPlanet = (e:Event) => {
    e.preventDefault()
    const planetName = document.getElementById('planetName') as HTMLInputElement
    const galaxyName = document.getElementById('galaxyName') as HTMLInputElement

    if(planetName.value.length==0){
        setAddPlanetNameError("Inserisci un valore.")
    }else{
        setAddPlanetNameError("")
    }
    if(galaxyName.value.length==0){
        setAddGalaxyNameError("Inserisci un valore.")
    }else{
        setAddGalaxyNameError("")
    }

} 

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

<ol className="py-4">
    <li onClick={()=>{setToDo('addPlanet')}}>Aggiungere un pianeta</li>
    <li onClick={()=>{setToDo('modifyPlanet')}}>Modificare un pianeta</li>
    <li onClick={()=>{setToDo('addPackage')}}>Aggiungere un pacchetto</li>
    <li onClick={()=>{setToDo('modifyPackage')}}>Modificare un pacchetto</li>
</ol>
</div>
                    </div>
                    <div className="col-md-8 p-2">
<div className="border rounded shadow p-2">
<h2>Come on</h2>
{toDo=='addPlanet'&&
<div className="row">
<div className="col-md-12">
<h3>Aggiungi un pianeta</h3>
</div>
<div className="col-md-12 py-5">
    <form className="border rounded p-2 shadow w-75 m-auto" onSubmit={()=>{addPlanet(event!)}}>
        <label className="fs-4 p-3">Nome pianeta</label>
        <input type="text" className="form-control w-75 m-auto" minLength={1} id="planetName"/>
        <p className="text-danger">{addPlanetNameError}</p>
        <label className="fs-4 p-3">Nome galassia</label>
        <input type="text" className="form-control w-75 m-auto" minLength={1} id="galaxyName"/>
        <p className="text-danger">{addGalaxyNameError}</p>
        <button className="btn py-5" type="submit">Aggiungi</button>
    </form>
</div>
</div>
}
{toDo=='modifyPlanet'&&<h3>Modifica un pianeta</h3>}
{toDo=='addPackage'&&<h3>Aggiungi un pacchetto</h3>}
{toDo=='modifyPackage'&&<h3>Modifica un pacchetto</h3>}
</div>
                </div>
             </div>
            </div>
            )
        }
export default Office;


