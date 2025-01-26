import React, { useState,useEffect } from 'react'
import Card from './ui/card'
import axios from 'axios';


//Defining a type for card data
interface CardData{
  slug:string;
  id:number;
  title:string;
  description:string;
  image:string;
}
export default function Home() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async()=>{
    try{
      const response = await axios.get<CardData[]>('http://127.0.0.1:8000/api-product-list/');
      console.log("Reponse",response)
      setCards(response.data);
      setLoading(false);


    }catch(err){
      const error = err as Error;
      setError(error.message);
      setLoading(false);

    }
  }

  useEffect(()=>{
    fetchCards();
  },[])
  return (
    <>

    <div className="container text-start">

        <h1 className="text-3xl">Products</h1>
<div className="flex flex-wrap">
  {cards.map((card) => (
    <div className="m-2" key={card.id}>
      <Card
       slug={card.slug}
        title={card.title}
        description={card.description}
        image={card.image}
      />
    </div>
  ))}
</div>
       

        

        






    </div>


    </>
  )
}
