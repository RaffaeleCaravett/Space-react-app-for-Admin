import SingleCard from "./SingleCard";

const Home = () => {

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
</div>
        </div>
)

};

export default Home