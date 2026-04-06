import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  // Hàm render Card sản phẩm để dùng chung cho cả 2 danh sách
  renderProductCard(item, badgeText, badgeColor) {
    return (
      <div key={item._id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative">
        {/* Badge nhãn sản phẩm */}
        <div className={`absolute top-3 left-3 z-10 ${badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider`}>
          {badgeText}
        </div>

        <Link to={'/product/' + item._id} className="block overflow-hidden">
          <img
            src={"data:image/jpg;base64," + item.image}
            alt={item.name}
            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        <div className="p-4">
          <Link to={'/product/' + item._id}>
            <h3 className="text-gray-800 font-semibold text-lg truncate hover:text-blue-600 transition-colors">
              {item.name}
            </h3>
          </Link>
          
          <div className="mt-2 flex justify-between items-center">
            <span className="text-blue-600 font-bold text-xl">
              {item.price.toLocaleString()} <span className="text-sm underline">đ</span>
            </span>
            <button className="bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-600 p-2 rounded-full transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const newprods = this.state.newprods.map((item) => this.renderProductCard(item, "Mới", "bg-green-500"));
    const hotprods = this.state.hotprods.map((item) => this.renderProductCard(item, "Bán chạy", "bg-red-500"));

    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          
          {/* Section: NEW PRODUCTS */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8 border-l-4 border-blue-600 pl-4">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">SẢN PHẨM MỚI</h2>
              <Link to="/products" className="text-blue-600 hover:underline font-medium text-sm">Xem tất cả →</Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {newprods}
            </div>
          </section>

          {/* Section: HOT PRODUCTS */}
          {this.state.hotprods.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-8 border-l-4 border-red-600 pl-4">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">XU HƯỚNG MUA SẮM</h2>
                <Link to="/products" className="text-red-600 hover:underline font-medium text-sm">Bán chạy nhất →</Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {hotprods}
              </div>
            </section>
          )}

        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      this.setState({ newprods: res.data });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      this.setState({ hotprods: res.data });
    });
  }
}

export default Home;