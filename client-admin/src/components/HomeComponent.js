import React, { Component } from 'react';
import axios from 'axios';
import home_img from '../asset/imgs/home_img.jpg';
import MyContext from '../contexts/MyContext';

class Home extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      stats: {
        totalRevenue: 0,
        newOrders: 0,
        totalCustomers: 0,
        totalProducts: 0
      }
    };
    this.timer = null; // Biến lưu bộ đếm thời gian auto-refresh
  }

  componentDidMount() {
    // 1. Tải số liệu ngay khi vào trang
    this.apiGetStatistics();

    // 2. Chạy ngầm tự động lấy số liệu mới mỗi 10 giây (10000ms)
    this.timer = setInterval(() => {
      this.apiGetStatistics();
    }, 10000);
  }

  componentWillUnmount() {
    // Xóa timer khi người dùng rời khỏi trang Home để tránh lag máy
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // ⚡ HÀM GỌI API LẤY SỐ LIỆU LIVE TỪ BACKEND
  apiGetStatistics() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/statistics', config)
      .then((res) => {
        if (res.data) {
          this.setState({ stats: res.data });
        }
      })
      .catch((err) => {
        console.error("Lỗi khi tải thống kê live:", err);
      });
  }

  render() {
    const { totalRevenue, newOrders, totalCustomers, totalProducts } = this.state.stats;

    return (
      <div className="bg-slate-50 min-h-screen p-8">
        {/* TIÊU ĐỀ CHÍNH */}
        <div className="mb-8 flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Bảng điều khiển Admin</h2>
            <p className="text-slate-500 font-medium italic">Chào mừng bạn trở lại hệ thống quản lý KSHOP</p>
          </div>
        </div>

        {/* CÁC THẺ THỐNG KÊ LIVE (Nối trực tiếp từ Database) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {this.renderStatCard(
            "Tổng Doanh Thu", 
            `${(totalRevenue || 0).toLocaleString()} đ`, 
            "📈 Live từ đơn APPROVED", 
            "text-emerald-600", 
            "bg-emerald-50"
          )}
          {this.renderStatCard(
            "Đơn Hàng Mới", 
            newOrders || 0, 
            "🔥 Đang chờ duyệt", 
            "text-amber-600", 
            "bg-amber-50"
          )}
          {this.renderStatCard(
            "Khách Hàng", 
            totalCustomers || 0, 
            "👤 Hoạt động", 
            "text-blue-600", 
            "bg-blue-50"
          )}
          {this.renderStatCard(
            "Sản Phẩm", 
            totalProducts || 0, 
            "📦 Kho hàng", 
            "text-purple-600", 
            "bg-purple-50"
          )}
        </div>

        {/* HÌNH ẢNH MINH HỌA */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center">
             <span className="w-1.5 h-6 bg-indigo-600 rounded-full mr-3"></span>
             Biểu đồ hoạt động hệ thống
          </h3>
          <div className="relative group overflow-hidden rounded-2xl flex justify-center border-2 border-dashed border-slate-100 p-4">
            <img
              src={home_img}
              className="max-w-full h-auto rounded-xl shadow-md group-hover:scale-105 transition-transform duration-700"
              alt="Dashboard Visualization"
            />
            {/* Overlay nhẹ khi hover */}
            <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        </div>
      </div>
    );
  }

  // Hàm phụ để tạo thẻ thống kê
  renderStatCard(title, value, subtext, textColor, bgColor) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{title}</p>
        <h4 className={`text-2xl font-black ${textColor} mb-1`}>{value}</h4>
        <p className="text-[11px] font-medium text-slate-400 italic">{subtext}</p>
      </div>
    );
  }
}

export default Home;