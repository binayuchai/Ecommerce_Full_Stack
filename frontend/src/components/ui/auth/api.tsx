import axios from "axios";
import { Console } from "console";


// we are creating an inteceptor for axios to check whether the expired token is present or not, if present then we will remove it and redirect to login page
// and if not present then we will add the token to the request header
const api = axios.create({
    baseURL: "http://localhost:8000",
})

let logoutCallBack: (() => void) | null = null;

export const setLogoutCallBack= (callback: (() => void) | null)=>{
    logoutCallBack = callback
}

//request interceptor which attach access token 

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('access_tooken');
        console.log("Configuration",config);
        console.log("request INterceptor consoled");
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
    ,(error)=>{
        return Promise.reject(error);
    }
);

//response interceptor which handles 401 error
api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response && error.response.status === 401){
            console.log("Token expired or invalid.Logging out...");
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            console.log("Response INterceptor consoled");

            if(logoutCallBack){
                logoutCallBack();
            }
            else{
                window.location.href = '/login';
            }

        }
        return Promise.reject(error);
    }
);


export default api;
