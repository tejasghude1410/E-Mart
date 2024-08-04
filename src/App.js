import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home2 from './Pages/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Cart from './Pages/cart';
import Product from './Pages/Product'
import Signin from './Pages/Signin';
import Sidebar from './Components/Sidebar/toggleSidebar';

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
        <Route path='/Log in' element={<Signin/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
