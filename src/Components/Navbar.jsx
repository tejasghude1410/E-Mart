import React, { useState } from 'react'
import "./Navbar.css"; 
import shopping from "../Components/Assets/shopping-cart-1985.png";
import logo from "../Components/Assets/Main logo.png"
import cart from '../Pages/cart';
import Home from '../Pages/Home';
import Signin from '../Pages/Login';
import About from '../Pages/About';
import ContactUs from '../Pages/ContactUs';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Navbar = () => {
  const [Menu,setMenu]= useState("Home");
  return (
    <div className='navbar'>
      <div className='nav-logo'>
       <img src={logo}></img>
        <p>ElectroMart</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={()=>{setMenu("Home")}}><Link style={{textDecoration:'none', color: 'black'}} to='/'>Home</Link>{Menu==="Home"?<hr/>:<></>}</li>
   
        <li onClick={()=>{setMenu("About")}}><Link style={{textDecoration:'none',color: 'black' }} to='/About'>About</Link>{Menu==="About"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Contact Us")}}><Link style={{textDecoration:'none',color: 'black' }} to='/ContactUs'>Contact Us</Link>{Menu==="Contact Us"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Log in")}}><Link style={{textDecoration:'none',color: 'black' }} to='/Login'>Log in</Link>{Menu==="Log in"?<hr/>:<></>}</li>
      

      </ul>
      <div className='nav-search'>        
        <input type='text' name="search"  placeholder='Search'/>
       
        <Link className="flex" to='/cart' style={{textDecoration:'none'}}><img src={shopping} alt=''></img></Link>
        <div className='nav-cart-count'>0</div>
      
      </div>
    </div>
  )
}

export default Navbar
