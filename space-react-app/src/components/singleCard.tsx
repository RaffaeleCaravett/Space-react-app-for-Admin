/* eslint-disable @typescript-eslint/no-explicit-any */
const SingleCard = (prop:any) => {

const card = prop;
return (
    <div className="col-md-4 p-4"> 
      {card && card!=undefined && card.card &&
    <div className="border rounded shadow p-2">
       <h2 className="p-2">{card.card.title}</h2>
       <p className="fs-4">
        {card.card.description}
       </p>
        </div>}    
    </div>
  
)

} 
export default SingleCard