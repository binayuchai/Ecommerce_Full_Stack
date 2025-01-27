import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams,Link } from 'react-router-dom';


interface DetailProps{
    name:string;
    description:string;
    image:string;
    price:number;
}



interface RouteParams extends Record<string, string | undefined> {
    slug: string;
}
const Detail = ()=>{

const [name, setTitle] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState("");
const [price, setPrice] = useState(0);
const [loading, setLoading] = useState(true);
    const { slug } = useParams<RouteParams>();

    const fetchDetail = async()=>{
        try{
            const response = await axios.get<DetailProps>(`http://127.0.0.1:8000/api-product-detail/${slug}/`);
            console.log(response)
            setTitle(response.data.name);
            setDescription(response.data.description);
            setImage(response.data.image);
            setPrice(response.data.price);


        }catch(err){
            const error = err as Error;
            console.log(error);

        }finally {
            setLoading(false); // Set loading to false after fetching
        }
    }
    useEffect(()=>{
        fetchDetail();
    },[slug])

    if (loading) {
        return <div>Loading...</div>;
    }
  return (
    <>

    <div className="container flex flex-col items-start">

    <h2 className='text-3xl capitalize'>{name}</h2>
    <div className='flex mt-10 justify-between'>
        <div className="w-1/2 h-96">
        <img src={image} alt={name} className='w-full h-full object-cover' />

        </div>

    <div className="flex flex-col text-start">
    <h3 className='text-2xl'>{description}</h3>
    <h3 className='text-2xl'>Price :<span className='text-green-300'>${price}</span> </h3>
    <Link className="btn btn-primary mt-5 px-2" type="submit" to="/cart/">Buy Now</Link>
    </div>
    </div>


    </div>

    </>
    
  )
}


export default Detail