import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Productdetails from "./pages/Productdetails";
import { useState } from "react";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./pages/Cart";


function App() {
  const [cartItems,SetcartItems]=useState([]);
  return (
    <div className="App">
      <Router>
        <div>
          <ToastContainer theme="dark" position="top-center"/>
          <Header cartItems={cartItems}/>
          <Routes>  
            <Route path="/" element={<Home />} />
            <Route path='/search' element={<Home />} />
            <Route path='/product/:id' element={<Productdetails cartItems={cartItems} SetcartItems={SetcartItems}/>} />
            <Route path='/cart' element={<Cart cartItems={cartItems} SetcartItems={SetcartItems}/>} />

          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
