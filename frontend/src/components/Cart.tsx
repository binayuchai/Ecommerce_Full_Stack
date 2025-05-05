import React, { useEffect } from 'react'
import cartItem from './ui/cartItem';
import axios from 'axios';
import { useAuth } from './AuthContext';
function Cart() {
  const auth = useAuth();
  const accessToken = auth?.accessToken;
  console.log("Access token in cart",accessToken);

useEffect(() => {
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(('http://localhost:8000/api-cart-item/'), {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
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
        <h1 className="text-3xl">Cart</h1>
        <div></div>
    </div>
    
    
    
    
    </>
  )
}

export default Cart