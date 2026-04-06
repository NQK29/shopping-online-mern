import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext;

  render() {
    const { token, customer, mycart } = this.context;

    return (
      <div className="bg-gray-900 text-gray-300 py-2 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs sm:text-sm font-medium">
          
          {/* Bên trái: Thông tin User / Login-Signup */}
          <div className="flex items-center space-x-4">
            {token === '' ? (
              <div className="flex items-center space-x-3 divide-x divide-gray-700">
                <Link to='/login' className="hover:text-white transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Đăng nhập
                </Link>
                <Link to='/signup' className="pl-3 hover:text-white transition-colors">Đăng ký</Link>
                <Link to='/active' className="pl-3 hover:text-white transition-colors text-blue-400">Kích hoạt</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4 divide-x divide-gray-700">
                <div className="flex items-center text-white">
                  <span className="text-gray-400 mr-1">Chào,</span>
                  <span className="font-bold text-blue-400">{customer?.name}</span>
                </div>
                <Link to='/myprofile' className="pl-4 hover:text-white transition-colors">Tài khoản</Link>
                <Link to='/myorders' className="pl-4 hover:text-white transition-colors">Đơn hàng</Link>
                <button 
                  onClick={() => this.lnkLogoutClick()}
                  className="pl-4 hover:text-red-400 transition-colors flex items-center group font-bold"
                >
                  Đăng xuất
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Bên phải: Giỏ hàng */}
          <div className="flex items-center">
            <Link to='/mycart' className="relative group flex items-center space-x-2 bg-gray-800 hover:bg-blue-600 px-3 py-1.5 rounded-full transition-all duration-300">
              <span className="text-gray-300 group-hover:text-white">Giỏ hàng</span>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {/* Badge số lượng sản phẩm */}
                {mycart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-bounce">
                    {mycart.length}
                  </span>
                )}
              </div>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  lnkLogoutClick() {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      this.context.setToken('');
      this.context.setCustomer(null);
      this.context.setMycart([]);
    }
  }
}

export default Inform;