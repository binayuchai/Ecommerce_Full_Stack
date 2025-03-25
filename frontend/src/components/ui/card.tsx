import React from 'react'
import { Link } from 'react-router-dom';

interface CardProps{
  slug:string;
  title:string;
  description:string;
  image:string;
}
export default function Card({slug,title,description,image}:CardProps) {
  const handleError = () =>{
    console.log("Failed to load image:  ",image)
  }
  console.log(`REndered image; ${image}`)
  return (
    <>
<Link to={`/detail/${slug}/`} className="card bg-base-100 w-96 shadow-xl h-96">
  <figure>
    <img
      src={image}
      alt={title} 
      onError={handleError}
      className='h-full w-full object-cover'
      />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</Link>
    </>
  )
}
