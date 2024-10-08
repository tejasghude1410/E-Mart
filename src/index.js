import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Components/Navbar';
import Home2 from './Pages/Home2';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Product from './Pages/Product'
import Login from './Pages/Signin';
import Sidebar from './Components/Sidebar/toggleSidebar';
import Footer from './Components/Footer';
import {store} from './redux/store';
import {Provider} from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
       <App/> 
    </Provider>    
  </React.StrictMode>
  
);



