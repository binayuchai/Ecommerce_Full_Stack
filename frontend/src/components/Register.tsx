import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [useremail, setUseremail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault();
         console.log(username,useremail,password,cpassword)
 
         if(password !== cpassword){
            setError("Passwords do not match");
            return;
         }

        try{
            setError("");
            const response = await axios.post("http://localhost:8000/api/register/",{name:username,email:useremail,password:password},{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log(response);
            localStorage.clear();
            localStorage.setItem('access_token',response.data.token['access']);
            localStorage.setItem('refresh_token',response.data.token['refresh']);
            navigate('/');

        }catch(error){
            if (axios.isAxiosError(error) && error.response) {
            console.log('Error during registration',error.response.data);
            const errorMessage = Object.values(error.response.data.error).flat().join(" ");
            setError(errorMessage);

        
            // setError(error.response.data);

        }
        }

    }

  return (
    <>
            
<section className=" dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

      <div className="w-full bg-gray rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                  Register your account
              </h1>
              <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit} method="POST">
              <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium  dark:text-white">Your name</label>
                      <input type="text" name="name" id="name" value={username} onChange={(e)=>setUsername(e.target.value)} className="bg-gray-50 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium  dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" value={useremail} onChange={(e)=>setUseremail(e.target.value)} className="bg-gray-50 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium  dark:text-white">Your Password</label>
                      <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  <div>
                      <label htmlFor="cpassword" className="block mb-2 text-sm font-medium  dark:text-white">Confirm Password</label>
                      <input type="password" name="cpassword" id="cpassword" value={cpassword} onChange={(e)=>setCpassword(e.target.value)}placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
             
                  <button type="submit" className="btn btn-primary w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-9">Register</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                  </p>
                  {error ? <p className="text-red-500 text-sm">{error}</p> : ""}
              </form>
          </div>
      </div>
  </div>
</section>  
    </>
  )

}


