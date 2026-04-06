import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import Footer from './FooterComponent'; // Đảm bảo bạn đã tạo file FooterComponent.js

class Main extends Component {
  render() {
    return (
      /* Thiết lập chiều cao tối thiểu 100% màn hình và dùng flex-col */
      <div className="flex flex-col min-h-screen bg-gray-50">
        
        {/* HEADER: Gồm Inform và Menu */}
        <header className="sticky top-0 z-50 shadow-md">
          <Inform />
          <Menu />
        </header>

        {/* MAIN CONTENT: flex-grow giúp phần này tự giãn ra để đẩy Footer xuống dưới cùng */}
        <main className="flex-grow">
          <div className="container mx-auto">
             <Routes>
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/product/category/:cid" element={<Product />} />
              <Route path="/product/search/:keyword" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/active' element={<Active />} />
              <Route path='/login' element={<Login />} />
              <Route path='/myprofile' element={<Myprofile />} />
              <Route path='/mycart' element={<Mycart />} />
              <Route path='/myorders' element={<Myorders />} />
            </Routes>
          </div>
        </main>

        {/* FOOTER: Luôn nằm ở đáy trang */}
        <Footer />
        
      </div>
    );
  }
}

export default Main;