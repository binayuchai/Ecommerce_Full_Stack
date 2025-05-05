import axios from "axios";
import { create } from "node_modules/axios/index.d.cts";

import React, { useState,createContext,useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom";


type User = {
    id:number;
    email:string;
    name:string;
}
type AuthContextType = {
    accessToken: string;
    login:(email:string,password:string)=>Promise<void>;  // login functin is async and doesnot return anything
    logout:()=>void;
    isAuthenticated:boolean;
    user:User | null;
}
//create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// define props for provider
type AuthProviderProps = {
    children:React.ReactNode;
}

//create the provider
export const  AuthProvider =({children}:AuthProviderProps)=>{
    const navigate = useNavigate();


    const [accessToken, setAccessToken] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
   //get user data from the server
   const fetchUser = async (storedToken:string) => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      console.log('User data', response);
      setUser(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log('Failed to fetch', error.response);
      } else {
        console.error('Unexpected error', error);
      }
    }
  };
    const login  = async(email:string,password:string)=>{
        
        try{
            const response = await axios.post('http://localhost:8000/api/login/',{email,password});
            console.log("This is response:" + response.status);
            setAccessToken(response.data.token['access']);
            setUser(response.data.user);
            console.log("Full response:", response);
            console.log("Response data:", response.data);
            console.log("Token:", response.data.token);
            console.log("User:", response.data.user);
            console.log("logged in user", response.data.user);


        localStorage.setItem('access_token', response.data.token['access']);
        localStorage.setItem('refresh_token', response.data.token['refresh']);
         console.log("Access token", accessToken);
        await fetchUser(response.data.token['access']);

            navigate('/');




        }catch(error){
            if(axios.isAxiosError(error) && error.response){
                console.log("Login error ", error.response);
                throw error;
            }
            else{
                console.error("Unexpected error",error);
                throw new Error("An unexpected error occurred");
            }
    
            }
        }

    const logout = ()=>{
        setAccessToken('');
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    }

    useEffect(()=>{
        const storedToken = localStorage.getItem('access_token');


    if(storedToken){   
        setAccessToken(storedToken);
        fetchUser(storedToken);
    }
    //fetch user data if token is present
    console.log("Stored token", storedToken);


 
   

    },[])

    //check if the user is authenticated
    const isAuthenticated = !!accessToken
    

  return (
    <AuthContext.Provider value={{accessToken,user,isAuthenticated,login,logout }}>
        {children}
    </AuthContext.Provider>

);

};


//export the custom hook to use auth context

export const useAuth = ()=> useContext(AuthContext);
