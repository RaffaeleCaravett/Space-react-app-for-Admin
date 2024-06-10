import Image from "../assets/rocket.png";


/* eslint-disable @typescript-eslint/no-explicit-any */
const SingleCard = (prop:any) => {

const card = prop;
return (
    <div className="col-lg-4 col-md-6 col-12 p-4"> 
      {card && card!=undefined && card.card &&
    <div className="border rounded shadow p-2 position-relative overflow-hidden">
       <h2 className="p-2">{card.card.title}</h2>
       <img src={Image} alt="" className="card-img"/>
       <p className="fs-4">
        {card.card.description}
       </p>
       <div className="position-absolute top-0">

</div>
        </div>}  

    </div>
  
)

} 
export default SingleCard