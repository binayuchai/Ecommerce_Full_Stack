import { useState } from 'react'
import './App.css'
import Navbar from './components/ui/navbar';
import Root from './components/root';
// import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Detail from './components/ui/detail';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter, Routes,Route } from 'react-router-dom';


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Root/>}>
//       <Route path="/" element={<Home/>}/>
//       <Route path="/detail/:slug/" element={<Detail/>}/>
//       <Route path="/cart/" element={<Cart/>}/>
//       <Route path="/login/" element={<Login/>}/>
//       <Route path="/register/" element={<Register/>}/>






//     </Route>
//   )
// )
function App() {

  return (
    
  <BrowserRouter>
  <AuthProvider>

  <Routes>
  <Route path="/" element={<Root/>}>
       <Route index element ={<Home/>}/>
       <Route path="detail/:slug" element={<Detail/>}/>
       <Route path="cart" element={<Cart/>}/>
      <Route path="login" element={<Login/>}/>
  <Route path="register" element={<Register/>}/>
</Route>
  </Routes>
  </AuthProvider>

  
  </BrowserRouter>





    
    
  )
}

export default App


