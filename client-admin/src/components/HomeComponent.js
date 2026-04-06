import { Component } from 'react';
import home_img from '../asset/imgs/home_img.jpg';

class Home extends Component {
  render() {
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

        {/* CÁC THẺ THỐNG KÊ (Dùng giả lập số liệu cho chuyên nghiệp) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {this.renderStatCard("Tổng Doanh Thu", "45,000,000 đ", "📈 +12% tháng này", "text-emerald-600", "bg-emerald-50")}
          {this.renderStatCard("Đơn Hàng Mới", "10", "🔥 Đang chờ duyệt", "text-amber-600", "bg-amber-50")}
          {this.renderStatCard("Khách Hàng", "50", "👤 Hoạt động", "text-blue-600", "bg-blue-50")}
          {this.renderStatCard("Sản Phẩm", "20", "📦 Kho hàng", "text-purple-600", "bg-purple-50")}
        </div>

        {/* HÌNH ẢNH MINH HỌA (Giữ lại ảnh của bạn nhưng làm cho nó tinh tế hơn) */}
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

  // Hàm phụ để tạo thẻ thống kê nhanh
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