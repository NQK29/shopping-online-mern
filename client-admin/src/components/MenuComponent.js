import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link, NavLink } from "react-router-dom"; // Sử dụng NavLink để làm hiệu ứng Active

class Menu extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="flex flex-col h-full text-slate-300">
        {/* LOGO ADMIN */}
        <div className="p-6 mb-4">
          <Link to="/admin/home" className="flex items-center space-x-2">
            <div className="bg-indigo-500 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xl font-black text-white tracking-tighter uppercase italic">
              K<span className="text-indigo-400 underline decoration-2 underline-offset-4">SHOP</span>
            </span>
          </Link>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {this.renderNavLink("/admin/home", "Bảng điều khiển", (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          ))}

          {this.renderNavLink("/admin/category", "Danh mục", (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          ))}

          {this.renderNavLink("/admin/product", "Sản phẩm", (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          ))}

          {this.renderNavLink("/admin/order", "Đơn hàng", (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          ))}

          {this.renderNavLink("/admin/customer", "Khách hàng", (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          ))}
        </nav>

        {/* USER INFO & LOGOUT */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800 mb-3">
             <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs uppercase">
                {this.context.username.charAt(0)}
             </div>
             <div className="overflow-hidden">
                <p className="text-xs text-slate-500 font-bold uppercase">Chào Admin,</p>
                <p className="text-sm text-white font-bold truncate">{this.context.username}</p>
             </div>
          </div>
          
          <button 
            onClick={() => this.lnkLogoutClick()}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-bold text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    );
  }

  // Hàm helper để render Link với Icon và hiệu ứng Active
  renderNavLink(to, label, iconPath) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => 
          `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
            isActive 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold' 
            : 'hover:bg-slate-800 hover:text-white'
          }`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {iconPath}
        </svg>
        <span className="text-sm tracking-wide">{label}</span>
      </NavLink>
    );
  }

  lnkLogoutClick() {
    if (window.confirm("Bạn có chắc muốn đăng xuất khỏi hệ thống quản trị?")) {
      this.context.setToken("");
      this.context.setUsername("");
    }
  }
}

export default Menu;