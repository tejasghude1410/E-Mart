
import React, { useState, useEffect } from 'react';
import "./Navbar.css"; 
import shopping from "../Components/Assets/shopping-cart-1985.png";
import logo from "../Components/Assets/Main logo.png"
import cart from '../Pages/cart';
import Home from '../Pages/Home';
import Signin from '../Pages/Signin';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

const handleLogout = () => {
  alert("You have got Sign Out")
  localStorage.clear();
}
const Navbar = ({cartItems}) => {
  
  const navigate = useNavigate();
  const [Menu,setMenu]= useState("Home");
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
        <li onClick={()=>{setMenu("Sign In")}}>
         
          {localStorage.getItem('islogin') ?
              <div onClick={() => { 
                handleLogout();
                navigate('/') }}>               
                Sign Out
              </div>
              :
              <Link style={{textDecoration:'none',color: 'black' }} to='/signin'>Sign In</Link>          
              }{Menu==="Sign In"?<hr/>:<></>}</li>

      </ul>
      <div className='nav-search'>        
        <input type='text' name="search"  placeholder='Search'/>
       
        <Link to='/cart' style={{textDecoration:'none'}}><img src={shopping} alt=''></img></Link>
        <div className='nav-cart-count'>{cartItems}</div>
      
      </div>
    </div>
  )
}

export default Navbar
