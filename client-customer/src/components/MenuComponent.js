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
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="relative group">
          <Link 
            to={'/product/category/' + item._id}
            className="text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 block py-2 px-1 text-sm uppercase tracking-wide"
          >
            {item.name}
            {/* Hiệu ứng gạch chân khi hover */}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
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
              
              {/* DANH MỤC SẢN PHẨM */}
              <ul className="hidden lg:flex space-x-8 items-center">
                <li className="relative group">
                  <Link to="/" className="text-gray-900 hover:text-blue-600 font-bold py-2 px-1 text-sm uppercase">
                    Trang chủ
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                  </Link>
                </li>
                {cates}
              </ul>
            </div>

            {/* THANH TÌM KIẾM & GIỎ HÀNG */}
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

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      this.setState({ categories: res.data });
    });
  }
}

export default withRouter(Menu);