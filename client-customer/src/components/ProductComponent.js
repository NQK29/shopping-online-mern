import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    const { params } = this.props;
    const title = params.keyword 
      ? `Kết quả tìm kiếm cho: "${params.keyword}"` 
      : "DANH SÁCH SẢN PHẨM";

    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative">
          {/* Link bọc ảnh */}
          <Link to={'/product/' + item._id} className="block overflow-hidden bg-gray-50">
            <img
              src={"data:image/jpg;base64," + item.image}
              alt={item.name}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </Link>

          {/* Nội dung thông tin */}
          <div className="p-5 text-left">
            <Link to={'/product/' + item._id}>
              <h3 className="text-gray-800 font-bold text-md truncate group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
            </Link>
            
            <div className="mt-3 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Giá bán</p>
                <span className="text-blue-600 font-black text-lg">
                  {item.price.toLocaleString()} <span className="text-xs underline italic">đ</span>
                </span>
              </div>
              
              <Link 
                to={'/product/' + item._id}
                className="bg-gray-100 group-hover:bg-blue-600 text-gray-400 group-hover:text-white p-2.5 rounded-xl transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0 border-b border-gray-200 pb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
                {title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Tìm thấy {this.state.products.length} sản phẩm phù hợp</p>
            </div>
            
            {/* Bộ lọc đơn giản (UI) */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Sắp xếp:</span>
              <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option>Mới nhất</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
              </select>
            </div>
          </div>

          {/* Grid hiển thị sản phẩm */}
          {this.state.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {prods}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-inner border border-dashed border-gray-200">
              <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-xl font-bold text-gray-400">Rất tiếc, không tìm thấy sản phẩm nào!</p>
              <Link to="/home" className="mt-4 inline-block text-blue-600 font-bold hover:underline">Quay lại trang chủ</Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      this.setState({ products: res.data });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      this.setState({ products: res.data });
    });
  }
}

export default withRouter(Product);