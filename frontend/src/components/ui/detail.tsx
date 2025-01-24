import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';


interface DetailProps{
    title:string;
    description:string;
    image:string;
    price:number;
}
interface RouteParams extends Record<string, string | undefined> {
    id: string;
}
const Detail = ()=>{
    const { id } = useParams<RouteParams>();

    const fetchDetail = async()=>{
        try{
            const response = await axios.get<DetailProps>(`http://127.0.0.1:8000/api-product-detail/${id}/`);
            console.log(response)


        }catch(err){
            const error = err as Error;
            console.log(error);

        }
    }
    useEffect(()=>{
        fetchDetail();
    })
  return (
    <div>Detail</div>
  )
}


export default Detail