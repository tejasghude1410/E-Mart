import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home2 from './Pages/Home2';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Cart from './Pages/cart';
import Product from './Pages/Product';
import Login from './Pages/Signin';
import Sidebar from './Components/Sidebar/toggleSidebar';
import Footer from './Components/Footer';
import SubCategory from './Components/SubCategory/SubCategory';
import  Contact  from './Pages/Contact';
import About from './Pages/About';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home2/>}>
          <Route index path='/s/:id' element={<SubCategory/>}/>  
              
        </Route>
          <Route path='/p/:id' element={<Product/>}/>          
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signin/SignUP' element={<SignUp/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes>
      <div style={{ alignSelf: 'flex-end' }}><Footer/></div>
      </BrowserRouter>
    </div>
  );
}

export default App;
