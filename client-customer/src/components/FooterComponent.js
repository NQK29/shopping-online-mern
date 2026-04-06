import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Cột 1: Giới thiệu */}
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center mb-6">
                <span className="text-2xl font-black tracking-tighter text-white italic">
                  K<span className="text-orange-500 underline decoration-2 underline-offset-4">SHOP</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-gray-400">
                Chuyên cung cấp các sản phẩm công nghệ hàng đầu với chất lượng đảm bảo và dịch vụ tận tâm.
              </p>
              <div className="flex space-x-4 mt-6">
                {/* Social Icons */}
                <a href="#" className="hover:text-blue-500 transition-colors"><i className="fab fa-facebook text-xl"></i></a>
                <a href="#" className="hover:text-pink-500 transition-colors"><i className="fab fa-instagram text-xl"></i></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-twitter text-xl"></i></a>
              </div>
            </div>

            {/* Cột 2: Liên kết nhanh */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Khám phá</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/home" className="hover:text-orange-500 transition-colors">Trang chủ</Link></li>
                <li><Link to="/products" className="hover:text-orange-500 transition-colors">Sản phẩm mới</Link></li>
                <li><Link to="/active" className="hover:text-orange-500 transition-colors">Kích hoạt tài khoản</Link></li>
              </ul>
            </div>

            {/* Cột 3: Hỗ trợ khách hàng */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Hỗ trợ</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Điều khoản dịch vụ</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Hướng dẫn mua hàng</a></li>
              </ul>
            </div>

            {/* Cột 4: Liên hệ */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Liên hệ</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start space-x-3">
                  <svg className="h-5 w-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span>123 Đường CMT8, Quận 10, TP. Hồ Chí Minh</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="h-5 w-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <span>0123 456 789</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Dòng bản quyền */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© 2026 KSHOP. All rights reserved. Designed for Internship Project.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;