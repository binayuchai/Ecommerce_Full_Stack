import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams,Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface DetailProps{
    name:string;
    description:string;
    image:string;
    price:number;
    id:number;
    
}
interface CartProps{
    quantity:number;
}



interface RouteParams extends Record<string, string | undefined> {
    slug: string;
}
const Detail = ()=>{

const [name, setTitle] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState("");
const [price, setPrice] = useState(0);
const [quantity, setQuantity] = useState(1);
const [productid, setProductId] = useState(0);
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
            setProductId(response.data.id);


        }catch(err){
            const error = err as Error;
            console.log(error);

        }finally {
            setLoading(false); // Set loading to false after fetching
        }
    }

    const authContext = useAuth();
    const accessToken = authContext?authContext.accessToken : undefined;


    // Call Add to Cart API through this function
    const handleAddToCart = async()=>{

        console.log("Quantity selected: ", quantity);
        console.log("Product ID: ", productid);
        // Add to cart API call
        
        try{
            
            const response = await axios.post(`http://127.0.0.1:8000/api-cart-add/`,{
            'quantity':quantity,
            'product_id':productid
        },{
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,

            }
        })
        setQuantity(1);
        
        console.log("response is : ",response);
        if(response.status === 200){
            console.log("Added to cart successfully");
        }
        else{
            console.log("Failed to add to cart");
        }


    }catch(err){
        const error = err as Error;
        console.log(error);
        console.log("Failed to add to cart");

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
    <h3 className='text-1xl my-5'>Quantity</h3>
    <select value={quantity} onChange={e=> setQuantity(parseInt(e.target.value))} className="select my-3">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>

    </select>
    <button className="btn btn-warning mt-5 px-2" type="submit" onClick={handleAddToCart}>Add to Cart</button>
    </div>
    </div>


    </div>

    </>
    
  )
}


export default Detail