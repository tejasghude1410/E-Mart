import logo from './logo.svg';
import './App.css';
import Home2 from './Pages/Home2'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp'
import SubCategory from './Pages/subcategory/SubCategory'
import ProductPage from './Pages/productPage/ProductPage'
import CartPage1 from './Pages/cartpage/CartPage1'
import TaxInvoice from './Pages/invoice/TaxInvoice'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home2/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path="/cart" element={ <CartPage1/> }/>
        <Route path='Login/SignUp' element={<SignUp/>}/>
        <Route path="/s/:id" element={<SubCategory/>} />
        <Route path="/p/:id" element={<ProductPage/>} />
        <Route path="/invoice/:invoiceID" element={<TaxInvoice/>} />
      </Routes>
      {/* <div style={{ alignSelf: 'flex-end' }}><Footer/></div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
