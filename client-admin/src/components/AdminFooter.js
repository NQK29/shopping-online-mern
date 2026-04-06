import React, { Component } from 'react';

class AdminFooter extends Component {
  render() {
    return (
      <footer className="p-6 flex flex-col sm:flex-row justify-between items-center text-slate-400 text-[10px] font-bold uppercase tracking-widest border-t border-slate-50">
        <p>&copy; 2026 KSHOP MANAGEMENT SYSTEM</p>
        <div className="flex items-center mt-2 sm:mt-0">
          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
          Phiên bản ổn định v4.0.1
        </div>
      </footer>
    );
  }
}

export default AdminFooter;