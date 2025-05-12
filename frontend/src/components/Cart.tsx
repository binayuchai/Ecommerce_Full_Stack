import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from './AuthContext';
function Cart() {

  interface Product{
    id:number;
    name:string;
    price:number;
  }
  interface CartItem{
    id:number;
    product:Product;
    quantity:number;
  }
  const auth = useAuth();
  const accessToken = auth?.accessToken;
  console.log("Access token in cart",accessToken);
  const [cart, setCart] = useState<CartItem[]>([]);




  // const increaseQuantity = (id)=>{
  //   print("Increase quantity function called",id);
  //     setCart(cart.map(item=>{
  //       item.product.id === id? {...item,quantity:item.quantity +1}:item
  //     }))
  // }
  // const decreaseQuantity = (id)=>{
  //   setCart(cart.map(item=>{
  //     item.id === id? {...item,quantity:item.quantity -1}:item
  //   }))
  // }

  const updateQuantity = async(id:number,quantity:number)=>{
    try{

      await axios.put(`http://localhost:8000/api-cart-add/`,{
        'quantity':quantity,
        'item_id':id
      },{
        headers:{
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
    })
    setCart(cart=>cart.map(item=>item.id === id?{...item,quantity:quantity}:item))
    }catch(error){
        if(axios.isAxiosError(error)){
          console.log("Error: ",error.message);
        }
        else{
          console.error("Faild to update quantity",error);

        }
    }
  }

  const removeItem = async(id:number)=>{
    try{
    await axios.delete('http://localhost:8000/api-cart-delete/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        'item_id': id,
      },
    });

    }catch(error){
      if(axios.isAxiosError(error)){
        console.log("Error: ",error.message);
      }
      else{
        console.error('failed to remove item',error);
      }
    }
    setCart(cart.filter(item=>item.id !== id));
  }


useEffect(() => {
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(('http://localhost:8000/api-cart-item/'), {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setCart(response.data);
      console.log("cart items", cart);
      console.log("Response in cart items", response);
      console.log("Cart items", response.data);
    } catch (error) {
      console.log("Error in fetching cart items why");
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error in fetching cart items", error.response.data.message);
      }
    }
  };
  fetchCartItems();
}, [accessToken]);
  return (
    <>
    <div className="container">
    <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-gray-600">{item.product.price} × {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => updateQuantity(item.id,item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id,item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500">Remove</button>
              </div>
            </div>
          ))}
          {/* <div className="text-right font-bold text-xl mt-6">
            Total: ${total.toFixed(2)}
            total
          </div> */}
        </div>
      )}
    </div>
    
    
    
    
    
    </>
  )
}

export default Cart