import React from 'react'
import { Link } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export default function () {
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
                <div className="navbar-end flex-1">
                    <Link className="btn btn-success mr-2" to={"/cart"}>Cart</Link>

                    <Link className="btn btn-primary" to={"/login"}>Login</Link>


                </div>
            </div>
        </>
    )
}
