import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";

// Import Components
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Category from "./CategoryComponent";
import Product from "./ProductComponent";
import Order from './OrderComponent';
import Customer from './CustomerComponent';
import AdminHeader from './AdminHeader'; // Import Header mới
import AdminFooter from './AdminFooter'; // Import Footer mới

class Main extends Component {
  static contextType = MyContext;

  render() {
    if (this.context.token !== "") {
      return (
        <div className="flex min-h-screen bg-slate-100 font-sans">
          
          {/* SIDEBAR BÊN TRÁI (Fixed) */}
          <aside className="w-64 bg-slate-900 shadow-2xl fixed h-full z-50">
            <Menu />
          </aside>

          {/* PHẦN NỘI DUNG BÊN PHẢI (Margin left 64) */}
          <div className="flex-1 ml-64 flex flex-col">
            
            <AdminHeader />

            <main className="p-8 flex-grow">
              {/* Card trắng chứa nội dung các trang */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 min-h-[calc(100vh-180px)] overflow-hidden">
                <Routes>
                  <Route path="/admin" element={<Navigate replace to="/admin/home" />} />
                  <Route path="/admin/home" element={<Home />} />
                  <Route path='/admin/category' element={<Category />} />
                  <Route path='/admin/product' element={<Product />} />
                  <Route path='/admin/order' element={<Order />} />
                  <Route path='/admin/customer' element={<Customer />} />
                </Routes>
              </div>
            </main>

            <AdminFooter />
          </div>
        </div>
      );
    }

    // Màn hình Loading khi chưa có Token
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10px] font-black text-indigo-600 uppercase italic">
            Admin
          </div>
        </div>
      </div>
    );
  }
}

export default Main;