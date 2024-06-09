/* eslint-disable @typescript-eslint/no-explicit-any */
const SingleCard = (props:any) => {

const cards = props.content;
console.log(cards)
return (
    <div> 
      {cards && cards.content &&
      <div className="row p-3">
        {cards.content.map((c:any)=>(
<div className="col-md-4 p-2" key={c.id}>
    <div className="border rounded p-2 shadow">
       <h2 className="p-2">{c.title}</h2>
       <p className="fs-4">
        {c.description}
       </p>
    </div>
</div>
        ))}
        </div>}    
    </div>
  
)

} 
export default SingleCard