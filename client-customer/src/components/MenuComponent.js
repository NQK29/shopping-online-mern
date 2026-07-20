import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  render() {
    // 🎨 RENDER CÁC PHẦN TỬ CON TRONG DROPDOWN
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item.slug}>
          <Link
            to={'/product/category/' + item.slug}
            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 block py-2.5 px-4 text-sm uppercase tracking-wide rounded-lg"
          >
            {item.name}
          </Link>
        </li>
      );
    });

    return (
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* LOGO */}
            <div className="flex items-center space-x-10">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-3xl font-black tracking-tighter text-blue-700 italic">
                  K<span className="text-orange-500 underline decoration-2 underline-offset-4">SHOP</span>
                </span>
              </Link>

              {/* 🧭 THANH ĐIỀU HƯỚNG ĐÃ PHÂN TẦNG CHUẨN SEO */}
              <ul className="hidden lg:flex space-x-8 items-center">

                {/* 1. TRANG CHỦ */}
                <li className="relative group">
                  <Link to="/" className="text-gray-900 hover:text-blue-600 font-bold py-2 px-1 text-sm uppercase tracking-wider transition-colors">
                    Trang chủ
                  </Link>
                </li>

                {/* 2. DROPDOWN DANH MỤC SẢN PHẨM (SILO HIERARCHY) */}
                <li className="relative group py-5">
                  {/* 🎯 SỬA TỪ BUTTON THÀNH LINK: Click thẳng vào chữ Sản phẩm sẽ ra trang Tất cả sản phẩm */}
                  <Link
                    to="/product/all"
                    className="flex items-center space-x-1 text-gray-900 group-hover:text-blue-600 font-bold text-sm uppercase tracking-wider transition-colors outline-none"
                  >
                    <span>Sản phẩm</span>
                    {/* Icon mũi tên nhỏ chỉ xuống */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Vùng bảng danh mục thả xuống khi rà chuột (Hover) */}
                  <div className="absolute left-0 mt-1 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50 p-2 transform translate-y-2 group-hover:translate-y-0">
                    <ul className="space-y-0.5">

                      {/* 🎯 DÒNG ĐẦU TIÊN BỔ SUNG: Cho phép xem toàn bộ kho hàng */}
                      <li className="border-b border-gray-100 pb-1 mb-1">
                        <Link
                          to="/product/all"
                          className="text-blue-600 hover:bg-blue-50 font-bold transition-all duration-200 block py-2.5 px-4 text-sm uppercase tracking-wide rounded-lg flex items-center space-x-2"
                        >
                          <span>🛒</span>
                          <span>Tất cả sản phẩm</span>
                        </Link>
                      </li>

                      {/* Danh sách các danh mục phân loại động bên dưới */}
                      {cates}
                    </ul>
                  </div>
                </li>

                {/* 3. TIN CÔNG NGHỆ */}
                <li className="relative group">
                  <Link to="/blog" className="text-gray-900 hover:text-blue-600 font-bold py-2 px-1 text-sm uppercase tracking-wider transition-colors">
                    Tin công nghệ
                  </Link>
                </li>

              </ul>
            </div>

            {/* THANH TÌM KIẾM */}
            <div className="flex items-center space-x-6 flex-1 justify-end max-w-lg ml-10">
              <form className="relative w-full group" onSubmit={(e) => this.btnSearchClick(e)}>
                <input
                  type="search"
                  placeholder="Bạn tìm gì hôm nay?..."
                  className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg py-2.5 pl-4 pr-12 text-sm transition-all duration-300 outline-none shadow-sm"
                  value={this.state.txtKeyword}
                  onChange={(e) => this.setState({ txtKeyword: e.target.value })}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md transition-colors shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

          </div>
        </div>
      </nav>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  btnSearchClick(e) {
    e.preventDefault();
    if (this.state.txtKeyword.trim()) {
      this.props.navigate('/product/search/' + this.state.txtKeyword);
    }
  }

  handleSearch() {
    const keyword = this.state.txtKeyword ? this.state.txtKeyword.trim() : "";

    // BẪY LỖI UX: Nếu từ khóa trống hoặc chỉ có 1 ký tự, không cho phép gửi request lên server
    if (keyword.length < 3) {
      alert("Vui lòng nhập từ khóa tìm kiếm từ 2 ký tự trở lên để có kết quả chính xác nhất! 🔍");
      return;
    }

    // Nếu hợp lệ (từ 2 ký tự trở lên như "pc", "hp", "ban", "chuot"), cho chuyển hướng tìm kiếm
    this.props.navigate('/product/search/' + keyword);
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      this.setState({ categories: res.data });
    });
  }
}

export default withRouter(Menu);