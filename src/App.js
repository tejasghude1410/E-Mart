import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home2 from './Pages/Home2';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Cart from './Pages/cart';
import Product from './Pages/Product'
import Login from './Pages/Signin';
import Sidebar from './Components/Sidebar/toggleSidebar';
import Footer from './Components/Footer';
import SubCategory from './Components/SubCategory/SubCategory';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home2/>}>
          <Route index path='/s/:id' element={<SubCategory/>}/>  
              
          <Route path='/p/:id' element={<Product/>}/>          
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
      <div style={{ alignSelf: 'flex-end' }}><Footer/></div>
      </BrowserRouter>
    </div>
  );
}

export default App;
