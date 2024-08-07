import React, { useState } from 'react'
import "./Navbar.css"; 
import shopping from "../Components/Assets/shopping-cart-1985.png";
import logo from "../Components/Assets/Main logo.png"
import cart from '../Pages/cart';
import Home from '../Pages/Home';

import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [Menu,setMenu]= useState("Home");
   const handleLogout = () => {
    localStorage.clear();
}

  return (
    <div className='navbar'>
      <div className='nav-logo'>
       <img src={logo}></img>
        <p>ElectroMart</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={()=>{setMenu("Home")}}><Link style={{textDecoration:'none', color: 'black'}} to='/'>Home</Link>{Menu==="Home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Contact")}}><Link style={{textDecoration:'none', color: 'black'}} to='/Contact'>Contact</Link>{Menu==="Contact"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("About")}}><Link style={{textDecoration:'none', color: 'black'}} to='/About'>About</Link>{Menu==="About"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Log in")}}>
         
          {localStorage.getItem('islogin') ?
              <div onClick={() => { 
                handleLogout();
                navigate('/') }}>               
                Sign Out
              </div>
              :
              <Link style={{textDecoration:'none',color: 'black' }} to='/signin'>Sign In</Link>          
              }</li>
      

      </ul>
      <div className='nav-search'>        
        <input type='text' name="search"  placeholder='Search'/>
       
        <Link to='/cart' style={{textDecoration:'none'}}><img src={shopping} alt=''></img></Link>
        <div className='nav-cart-count'>0</div>
      
      </div>
    </div>
  )
}

export default Navbar
