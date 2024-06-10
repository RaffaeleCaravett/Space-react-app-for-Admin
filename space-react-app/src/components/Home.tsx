import SingleCard from "./SingleCard";
import image from "../assets/react.svg"
import fwimage from "../assets/images.jpg"
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();


const cards = {
    content:[
    {
id:1,
title:'gragrgsrs1',
description:'asgferwgrweg1'
    },
{
id:2,
title:'gragrgsrs2',
description:'asgferwgrweg2'
},
{
 id:3,
 title:'gragrgsrs3',
 description:'asgferwgrweg3'   
}
]
}

const goToLogin = () =>{
navigate('/forms')
}

return (
    <div className="container text-center">
        <div className="row">
            <div className="col-md-12 py-4">
                <h1>My awesome title</h1>
            </div>
{cards &&
cards.content.map((card)=>(
    <SingleCard key={card.id} card={card}></SingleCard>
)) }
<div className="col-md-12 py-3">
    <h1>Another awesome title</h1>
</div>
<div className="col-md-6 py-5">
    <h2>Another one</h2>
    <p className="fs-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</div>
<div className="col-md-6 py-5 p-4">
<img src={image} className="w-100 hover" alt="" />
</div>
<div className="col-md-12 py-5">
    <img src={fwimage} alt="" className="w-100 rounded hover-shadow" />
</div>
<div className="col-md-12 py-5">
    <button className="btn btn-light" onClick={()=>goToLogin()}>Vai al login</button>
</div>
</div>
        </div>
)

};

export default Home