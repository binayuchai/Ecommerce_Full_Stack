import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import user_pic from '../../assets/user.svg';
// eslint-disable-next-line react-refresh/only-export-components
export default function () {
    const { user, logout } = useAuth();
    console.log("User in first navbar", user);
    return (
        <>

            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to="/">Home</Link></li>
                            {/* <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li> */}
                            <li><a>About</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Cheap Dokan</a>
                </div>
                <div className="navbar hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/">Home</Link></li>
                        {/* <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li> */}
                         <li><a>Shoes</a></li>
                         <li><a>Clothes</a></li>


                        <li><a>About</a></li>
                    </ul>

                </div>
                <div className="navbar-center">

                </div>
                <div className="navbar-end flex">
                    <Link className="btn btn-success mr-2" to={"/cart"}>Cart</Link>
{

    user?(
        <div className='flex'>
  {/* <span className="text-sm">{user?user.name:undefined}</span> */}
  {/* <button className="btn btn-primary" onClick={logout}>Logout</button> */}
  <div className="dropdown dropdown-start">
  <div tabIndex={0} role="button" className="btn m-1"><img src={user_pic} alt="user" className='w-10 h-10 rounded-full mr-2' />
  </div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm text-left">
  <button className="btn btn-primary" onClick={logout}>Logout</button>
  </ul>
</div>

        </div>
      
    ):(

        <Link className="btn btn-primary" to="/login">Login</Link>

    )
}


                </div>
            </div>
        </>
    )
}
