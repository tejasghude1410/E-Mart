import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Cart from './Pages/cart';
import Product from './Pages/Product'
import Signin from './Pages/Signin';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/sign in' element={<Signin/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
