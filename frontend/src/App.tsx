import { useState } from 'react'
import './App.css'
import Navbar from './components/ui/navbar';
import Root from './components/root';
import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Detail from './components/ui/detail';
import Cart from './components/Cart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route path="" element={<Home/>}/>
      <Route path="/detail/:slug" element={<Detail/>}/>
      <Route path="cart/" element={<Cart/>}/>






    </Route>
  )
)
function App() {

  return (

    <RouterProvider router={router}/>
    
    
  )
}

export default App


