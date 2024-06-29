/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useSelector } from "react-redux";
import { tokenInterface } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import rightArrow from '../assets/right-arrow.png'
import arrow from '../assets/arrow.png'

const Office = () => {
 const isLoggedIn= useSelector((state:tokenInterface)=>state.accessToken.isLoggedIn)
 const navigate = useNavigate()
 const [toDo,setToDo]= useState('addPlanet')
 const [addPlanetNameError,setAddPlanetNameError] = useState("")
 const [addGalaxyNameError,setAddGalaxyNameError] = useState("")
const [savePlanetError,setSavePlanetError] = useState("")
const [savePlanetSuccess,setSavePlanetSuccess] = useState("")
localStorage.setItem('route','office')
const api_url = useSelector((state:any) => state.api.url)
const token = useSelector((state:any)=>state.accessToken.accessToken)
const galassie = ["BLU","ROSSA","VERDE","ARANCIONE"]

const [pianeti,setPianeti] = useState<any>([])

const getPianeti = (pagenumber?:number) => {
    fetch(`${api_url}pianeti/paginated${pagenumber&&pagenumber>=0&&pagenumber<=pianeti.totalPages-1?'?page='+pagenumber:''}`,{
        method:"GET",
        headers: {
            "Content-Length": "0",
            "Authorization": `Bearer ${token||''}`
        }
            }).then((res)=>{
                return res.json()
            }).then((res)=>{
                if(res&&!res.message){
setPianeti([])
setPianeti(res)
}else if(res&&res.message){
                    throw Error(res.message)
                }else{
                    throw Error("Qualcosa è successo nell'elaborazione della richiesta.")
                }
            }).catch((error)=>{
                console.log(error)
            })
}
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
  let count =0
    if(planetName.value.length==0){
        setAddPlanetNameError("Inserisci un valore.")
    }else{
        setAddPlanetNameError("")
        count +=1
    }
    if(galaxyName.value.length==0){
        setAddGalaxyNameError("Inserisci un valore.")
    }else{
        setAddGalaxyNameError("")
 count+=1
    }
    if(count==2){
        console.log(token)
        fetch(`${api_url}pianeti`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token||''}`
              },
              body: JSON.stringify(
                  {nome:planetName.value,galassia:galaxyName.value}
              ) 
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            if(res&&!res.message){
                setSavePlanetError("")
                setSavePlanetSuccess("Pianeta salvato con successo")
            }else{
                setSavePlanetSuccess("")
                if(res&&res.message&&res.message=="Access Denied"){
                    throw Error("Accesso negato. Non sei un admin.")
                }else{
                    throw Error(res.message||"Qualcosa è successo nel salvataggio della richiesta.")
                }
            }
        }).catch((error)=>{
            setSavePlanetError(error.toString())
        })
    }

} 
const reset = () => {
    setSavePlanetError("")
    setSavePlanetSuccess("")
    setPianetaSelezionato(
        {
            id:0,
            nome:'',
            galassia:''
        }
    )
    setAddPackageError("")
        setAddPackageSuccess("")
        setModifyPackageError('')
        setPackages([])
        setSelectedPackage(null)
}

const [pianetaSelezionato,setPianetaSelezionato] = useState({
    id:0,
    nome:'',
    galassia:''
})

const putPlanet = (event:Event, pianetaSelezionato:any)=>{
    event.preventDefault()
    if(pianetaSelezionato.id!=0||pianetaSelezionato.nome!=''&&pianetaSelezionato.galassia!=''){
        fetch(`${api_url}pianeti/${pianetaSelezionato.id}`,{
            method:'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token||''}`
              },
              body: JSON.stringify(
                  pianetaSelezionato
              ) 
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            if(res&&!res.message){
                setSavePlanetError("")
                setSavePlanetSuccess("Pianeta modificato con successo")
                getPianeti()
            }else{
                setSavePlanetSuccess("")
                if(res&&res.message&&res.message=="Access Denied"){
                    throw Error("Accesso negato. Non sei un admin.")
                }else{
                    throw Error(res.message||"Qualcosa è successo nel salvataggio della richiesta.")
                }
            }
        }).catch((error)=>{
            setSavePlanetError(error.toString())
        })
    }

}
const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date().getFullYear()+"-"+(new Date().getMonth()<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1)+"-"+(new Date().getDate()+1)

const addPacchetto = (event:Event)=>{
    event?.preventDefault()
    const id = (document.getElementById('addPackagePlanetId') as HTMLInputElement).value
    const prezzo = (document.getElementById('addPackagePrice') as HTMLInputElement).value
    const posti = (document.getElementById('addPackagePosti') as HTMLInputElement).value
    const da = (document.getElementById('addPackageDa') as HTMLInputElement).value
    const a = (document.getElementById('addPackageA') as HTMLInputElement).value
    if(addPackageSuccess!=""&&prezzo&&posti&&da&&a&&da<a){
fetch(`${api_url}pacchetto`,{
    method:"POST",
    headers:{
        "Content-Type": "application/json",
                "Authorization": `Bearer ${token||''}`
              },
              body: JSON.stringify({
prezzo:prezzo,
posti:posti,
da:da,
a:a,
pianeta_id:[id]
}) 
}).then((res)=>{
    return res.json()
}).then((res)=>{
    if(res&&!res.message){
        setAddPackageError("")
        setAddPackageSuccess("Pacchetto aggiunto")
    }else if(res && res.message){
setAddPackageError(res.message)
setAddPackageSuccess("")
    }else if(res &&res.messageList){
setAddPackageError(res.messageList)
setAddPackageSuccess("")
    }
}).catch((error)=>{
    console.log(error)
})
    }else if(!prezzo||!posti||!da||!a){
        setAddPackageError("Assicurati di inserire tutti i valori del form")
    }else if(da>=a){
        setAddPackageError("La data 'da' non può essere maggiore o uguale alla data 'a'")
        console.log('no')
    }else if(addPackageSuccess==''){
        setAddPackageError("Ricerca il pianeta per inserire il pacchetto.")
    }
}

const [addPackageError,setAddPackageError]= useState("")
const [addPackageSuccess,setAddPackageSuccess]= useState("")

const searchPianeta = (event:Event) =>{
    event.preventDefault()
    let id ;
    let nome;
    let galassia ;
    if(!selectedPackage){
    id = document.getElementById('addPackagePlanetId') as HTMLInputElement
    nome = document.getElementById('addPackagePlanetName') as HTMLInputElement
    galassia = document.getElementById('addPackageGalaxyName') as HTMLInputElement
    }else{
        id = document.getElementById('putPackagePlanetId') as HTMLInputElement
        nome = document.getElementById('putPackagePlanetName') as HTMLInputElement
        galassia = document.getElementById('putPackageGalaxyName') as HTMLInputElement
    }
    if(id.value&&nome.value&&galassia.value){
fetch(`${api_url}pianeti/byParameters?id=${id.value}&nome=${nome.value}&galassia=${galassia.value}`,{
    method:"GET",
    headers: {
        "Content-Length": "0",
        "Authorization": `Bearer ${token||''}`
    }
}).then((res)=>{
    return res.json()
}).then((res)=>{
    if(res&&!res.message){
        setAddPackageSuccess("Pianeta con id " + id.value + " trovato con successo")
setAddPackageError("")
    }else if(res&&res.message){
        setAddPackageSuccess("")
        setAddPackageError(res.message)
    }else if (res&&res.messageList){
        setAddPackageSuccess("")
setAddPackageError(res.messageList(0))
    }
})


    }else{
        setAddPackageSuccess("")
        setAddPackageError("Devi inserire tutti e tre i valori per ricercare un pianeta")
    }

}

const [modifyPackageError,setModifyPackageError]= useState('')
const [packages,setPackages] = useState<any>([])


const searchPacchetto = (event:any,page?:number) => {
    setSelectedPackage(null)
event.preventDefault()

const id =(document.getElementById('modifyPackageSearchId') as HTMLInputElement).value
const price = (document.getElementById('modifyPackageSearchPrice') as HTMLInputElement).value
const dateDa = (document.getElementById('modifyPackageSearchDateDa') as HTMLInputElement).value
const dateA = (document.getElementById('modifyPackageSearchDateA') as HTMLInputElement).value

let parameters =''
setModifyPackageError('')
if(id&&!price&&(!dateDa||!dateA)){
    parameters ='?id='+id
}else if(id&&price&&(!dateDa||!dateA)){
    parameters ='?id='+id+'&prezzo='+price
}else if(id&&!price&&dateDa&&dateA){
    parameters ='?id='+id+'&date1='+dateDa+'&date2='+dateA
}else if(id&&price&&dateDa&&dateA){
    parameters ='?id='+id+'&prezzo='+price+'&date1='+dateDa+'&date2='+dateA
}else if(!id&&price&&(!dateDa||!dateA)){
    parameters ='?prezzo='+price
}else if(!id&&price&&dateDa&&dateA){
    parameters ='?prezzo='+price+'&date1='+dateDa+'&date2='+dateA
}else if(!id&&!price&&dateDa&&dateA){
    parameters ='?date1='+dateDa+'&date2='+dateA
}else[
    setModifyPackageError('Assicurati di inserire o l\'id o il prezzo o le due date.')
]
if(parameters!=''){
fetch(`${api_url}pacchetto/byParametes${parameters}&page=${page&&page>=0&&(packages&&packages.content&&page<=packages.totalPages-1)?page:0}`,{
    method:'GET',
    headers:{
         "Content-Length": "0",
        "Authorization": `Bearer ${token||''}`
    }
}).then((res)=>{
    return res.json()
}).then((res)=>{
    setPackages([])
    if(res&&!res.message){
        setModifyPackageError('')
        setPackages(res)
    }else if(res&&res.message){
        throw Error(res.message)
    }else if(res&&res.messageList){
        throw Error(res.messageList[0])
    }
}).catch((error)=>{
    setModifyPackageError(error.toString())
})
}
}

const [selectedPackage, setSelectedPackage]:any = useState(null)


const putPacchetto = (event:Event)=>{
    setAddPackageError("")
    if(selectedPackage){
    event?.preventDefault()
    const id = (document.getElementById('putPackagePlanetId') as HTMLInputElement).value
    const prezzo = (document.getElementById('putPackagePrice') as HTMLInputElement).value
    const posti = (document.getElementById('putPackagePosti') as HTMLInputElement).value
    const da = (document.getElementById('putPackageDa') as HTMLInputElement).value
    const a = (document.getElementById('putPackageA') as HTMLInputElement).value
    if(addPackageSuccess!=""&&prezzo&&posti&&da&&a&&da<a){
fetch(`${api_url}pacchetto/${selectedPackage.id}`,{
    method:"PUT",
    headers:{
        "Content-Type": "application/json",
                "Authorization": `Bearer ${token||''}`
              },
              body: JSON.stringify({
prezzo:prezzo,
posti:posti,
da:da,
a:a,
pianeta_id:[id]
}) 
}).then((res)=>{
    return res.json()
}).then((res)=>{
    if(res&&!res.message){
        setAddPackageError("")
        setAddPackageSuccess("Pacchetto modificato")
    }else if(res && res.message){
setAddPackageError(res.message)
setAddPackageSuccess("")
    }else if(res &&res.messageList){
setAddPackageError(res.messageList)
setAddPackageSuccess("")
    }
}).catch((error)=>{
    console.log(error)
})
    }else if(!prezzo||!posti||!da||!a){
        setAddPackageError("Assicurati di inserire tutti i valori del form")
    }else if(da>=a){
        setAddPackageError("La data 'da' non può essere maggiore o uguale alla data 'a'")
        console.log('no')
    }else if(addPackageSuccess==''){
        setAddPackageError("Ricerca il pianeta per inserire il pacchetto.")
    }
}else{
    setAddPackageError("Assicurati di selezionare un pacchetto tra quelli disponibili.")
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
    <li onClick={()=>{[setToDo('addPlanet'),reset()]}}>Aggiungere un pianeta</li>
    <li onClick={()=>{[setToDo('modifyPlanet'),reset(),getPianeti()]}}>Modificare un pianeta</li>
    <li onClick={()=>{[setToDo('addPackage'),reset()]}}>Aggiungere un pacchetto</li>
    <li onClick={()=>{[setToDo('modifyPackage'),reset()]}}>Modificare un pacchetto</li>
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
        <select className="form-control w-75 m-auto" id="galaxyName">
        <option value=""></option>
        {galassie.map((g,key)=>          <option value={g} key={key}>{g}</option>
)}
        </select>
        <p className="text-danger">{addGalaxyNameError}</p>
        {savePlanetError&&<p className="text-danger">{savePlanetError}</p>}
        {savePlanetSuccess&&<p className="text-success">{savePlanetSuccess}</p>}
        <button className="btn py-5 shadow-none" type="submit">Aggiungi</button>
    </form>
</div>
</div>
}
{toDo=='modifyPlanet'&&
<div className="row">
    <div className="col-md-12">
<h3>Modifica un pianeta</h3>
    </div>
    <div className="col-md-12">
        {pianeti &&  pianeti?.content && pianeti?.content.length>0 && pianeti?.content.map((pianeta:any,key:any) => 
        <p className="fs-5" key={key} onClick={()=>setPianetaSelezionato(
            {id: pianeta.id,
                nome:pianeta.nome,
                galassia:pianeta.galassia
            }
        )}>{pianeta.nome}</p>
        )}
        <p className="fs-5"> Number {pianeti.number+1} page of {pianeti.totalPages} total</p>
        <div className="d-flex justify-content-around w-25 m-auto">
            <button className="btn shadow-none" title="Previous page" onClick={()=>{getPianeti(pianeti.number-1)}}><img src={arrow} alt=""  className="w-100"/></button>
            <button className="btn shadow-none" title="Next page" onClick={()=>{getPianeti(pianeti.number+1)}}><img src={rightArrow} alt=""  className="w-100"/></button>
        </div>
            </div>
    <div className="col-md-12 py-5">
    <form className="border rounded p-2 shadow w-75 m-auto" onSubmit={()=>{putPlanet(event!,pianetaSelezionato)}}>
        <label >Id del pianeta selezionato </label>
        <input type="text" className="form-control w-75 m-auto" readOnly placeholder={pianetaSelezionato.id.toString()}/>
        <label className="fs-4 p-3">Nome pianeta</label>
        <input type="text" className="form-control w-75 m-auto" minLength={1} id="planetName"
        onChange={(e)=>setPianetaSelezionato(
            {id:pianetaSelezionato.id,
                nome:e.target.value,
                galassia:pianetaSelezionato.galassia
            }
        )}
        readOnly={!pianetaSelezionato.nome} value={pianetaSelezionato.nome||''}/>
        <p className="text-danger">{addPlanetNameError}</p>
        <label className="fs-4 p-3">Nome galassia</label>
        <select className="form-control w-75 m-auto" id="galaxyName" onChange={(e)=>setPianetaSelezionato(
{id:pianetaSelezionato.id,
    nome:pianetaSelezionato.nome,
    galassia:e.target.value
}
        )} disabled={!pianetaSelezionato.galassia} value={pianetaSelezionato.galassia||''}>
        <option value=""></option>
        {galassie.map((g,key)=>          <option value={g} key={key}>{g}</option>
)}
        </select>
        <p className="text-danger">{addGalaxyNameError}</p>
        {savePlanetError&&<p className="text-danger">{savePlanetError}</p>}
        {savePlanetSuccess&&<p className="text-success">{savePlanetSuccess}</p>}
        <button className="btn py-5 shadow-none" type="submit" disabled={pianetaSelezionato.nome==''&&pianetaSelezionato.galassia==''||pianetaSelezionato.id==0}>Modifica</button>
    </form>
</div>

</div>
}
{toDo=='addPackage'&&
<div className="row">
    <div className="col-md-12">
    <h3>Aggiungi un pacchetto</h3>
    </div>
    <div className="col-md-12 py-5">
    <form className="border rounded p-2 shadow w-75 m-auto" onSubmit={()=>addPacchetto(event!)}>
<label htmlFor="">Prezzo</label>
<input type="number" className="form-control"  id="addPackagePrice"/>
<label htmlFor="">Posti</label>
<input type="number" className="form-control"  id="addPackagePosti"/>
<label htmlFor="">Da? </label>
<input type="date" className="form-control" min={today} id="addPackageDa"/>
<label htmlFor="">A? </label>
<input type="date" className="form-control" min={tomorrow} id="addPackageA"/>
<label htmlFor="" className="pt-5">Su che pianeta? </label>
<div className="row p-2">
    <div className="col-md-4 p-2">
        <label htmlFor="">Id</label>
<input type="number" className="form-control" id="addPackagePlanetId"/>
    </div>
    <div className="col-md-4 p-2">
        <label htmlFor="">Nome</label>
<input type="text" className="form-control" id="addPackagePlanetName"/>
    </div>
    <div className="col-md-4 p-2">
        <label htmlFor="">Galassia</label>
        <select className="form-control w-75 m-auto" id="addPackageGalaxyName" >
        <option value=""></option>
        {galassie.map((g,key)=>          <option value={g} key={key}>{g}</option>
)}
        </select>    
        </div>
        <button className="btn shadow-none m-auto" type="button" onClick={()=>{searchPianeta(event!)}}>Cerca Pianeta</button>
        {addPackageSuccess&& <p className="text-success m-auto">{addPackageSuccess}</p> }
        {addPackageError&& <p className="text-danger m-auto">{addPackageError}</p> }
    </div>    
    <div className="row text-center">
    <button className="btn pt-5 shadow-none m-auto" type="submit">Aggiungi pacchetto</button>
    </div>
    </form>
    </div>
</div>
}
{toDo=='modifyPackage'&&
<div className="row">
    <div className="col-md-12">
        <h3>Modifica un pacchetto</h3>
        </div>
    <div className="col-md-12">
        <p>Che pacchetto vuoi modificare?</p>
        <form >
<div className="row">
    <div className="col-xl-4 col-md-6">
        <p className="fw-bold">Cerca per id</p>
        <input type="number" className="form-control" id="modifyPackageSearchId"/>
    </div>
    <div className="col-xl-4 col-md-6">
        <p className="fw-bold">Cerca per prezzo</p>
        <input type="number" className="form-control" id="modifyPackageSearchPrice"/>
    </div>
    <div className="col-xl-4 col-md-6">
        <p className="fw-bold">Cerca per date</p>
        <div className="d-flex"> 
        <label>Date 1</label>
        <input type="date" className="form-control m-1" id="modifyPackageSearchDateDa"/>
        </div>
        <div className="d-flex">
            <label>Date 2</label>
        <input type="date" className="form-control m-1" id="modifyPackageSearchDateA"/>
        </div>
    </div>
<div className="col-md-12">
    <button className="btn shadow-none m-auto" type="button" onClick={()=> searchPacchetto(event!)}>Cerca</button>
</div>
<div className="col-md-12">
    <p className="text-danger">{modifyPackageError}</p>
    {packages && packages.content&&<div>
    <ul>
        {packages.content.map((p:any,key:number)=>
        <div className="p-2" key={key}>{p.id} - <button className="btn btn-light shadow-none" type="button" onClick={()=>setSelectedPackage(p)}>show</button></div>)}
        </ul>
        <p className="fs-5"> Number {packages.number+1} page of {packages.totalPages} total</p>
        <div className="d-flex justify-content-around w-25 m-auto">
            <button className="btn shadow-none" title="Previous page" onClick={(event)=>{searchPacchetto(event,packages.number-1)}}><img src={arrow} alt=""  className="w-100"/></button>
            <button className="btn shadow-none" title="Next page" onClick={(event)=>{searchPacchetto(event,packages.number+1)}}><img src={rightArrow} alt=""  className="w-100"/></button>
        </div>

{selectedPackage!=null && 
<div className="text-center">
    <h2>Hai scelto questo pacchetto</h2>
<label htmlFor="">Prezzo</label>
<input type="number" className="form-control"  id="putPackagePrice" defaultValue={selectedPackage.prezzo}/>
<label htmlFor="">Posti</label>
<input type="number" className="form-control"  id="putPackagePosti" defaultValue={selectedPackage.posti}/>
<label htmlFor="">Da? </label>
<input type="date" className="form-control" min={today} id="putPackageDa" defaultValue={selectedPackage.da}/>
<label htmlFor="">A? </label>
<input type="date" className="form-control" min={tomorrow} id="putPackageA" defaultValue={selectedPackage.a}/>
<label htmlFor="" className="pt-5">Su che pianeta? </label>
<div className="row p-2">
    <div className="col-md-4 p-2">
        <label htmlFor="">Id</label>
<input type="number" className="form-control" id="putPackagePlanetId" defaultValue={selectedPackage.pianetas[0].id}/>
    </div>
    <div className="col-md-4 p-2">
        <label htmlFor="">Nome</label>
<input type="text" className="form-control" id="putPackagePlanetName" defaultValue={selectedPackage.pianetas[0].nome}/>
    </div>
    <div className="col-md-4 p-2">
        <label htmlFor="">Galassia</label>
        <select className="form-control w-75 m-auto" id="putPackageGalaxyName" defaultValue={selectedPackage.pianetas[0].galassia}>
        <option value=""></option>
        {galassie.map((g,key)=>          <option value={g} key={key}>{g}</option>
)}
        </select>    
        </div>
        <button className="btn shadow-none m-auto" type="button" onClick={()=>{searchPianeta(event!)}}>Cerca Pianeta</button>
        {addPackageSuccess&& <p className="text-success m-auto">{addPackageSuccess}</p> }
        {addPackageError&& <p className="text-danger m-auto">{addPackageError}</p> }
    </div>    
    <div className="row text-center">
    <button className="btn pt-5 shadow-none m-auto" type="button" onClick={()=>putPacchetto(event!)}>Modifica pacchetto</button>
    </div>
</div>}


        </div>
        }

</div>
</div>
        </form>
    </div>
</div>
}
</div>
                </div>
             </div>
            </div>
            )
        }
export default Office;


