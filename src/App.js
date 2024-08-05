import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home2 from './Pages/Home2';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Cart from './Pages/cart';
import Product from './Pages/Product'
import Login from './Pages/Login';
import Sidebar from './Components/Sidebar/toggleSidebar';
import Footer from './Components/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home2/>}/>
        
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      <div style={{ alignSelf: 'flex-end' }}><Footer/></div>
      </BrowserRouter>
    </div>
  );
}

export default App;
