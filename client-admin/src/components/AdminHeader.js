import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class AdminHeader extends Component {
  static contextType = MyContext;

  render() {
    return (
      <header className="bg-white h-16 shadow-sm flex items-center justify-between px-8 sticky top-0 z-40 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">Hệ thống</span>
          <span className="text-slate-300">/</span>
          <h1 className="text-slate-800 font-black text-sm tracking-widest uppercase">Quản trị viên</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800">{this.context.username || 'Admin'}</p>
            <p className="text-[10px] text-emerald-500 font-medium italic">Đang trực tuyến</p>
          </div>
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 border-2 border-white">
            {this.context.username ? this.context.username.charAt(0).toUpperCase() : 'A'}
          </div>
        </div>
      </header>
    );
  }
}

export default AdminHeader;