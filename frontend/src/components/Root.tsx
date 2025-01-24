import React from 'react'
import Navbar from './ui/navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Root() {
  return (
<>

<Navbar/>

<Outlet/>

<Footer/>
</>

)
}
