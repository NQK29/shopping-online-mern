import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }

  render() {
    // Render danh sách sản phẩm
    const prods = this.state.products.map((item) => {
      const isSelected = this.state.itemSelected?._id === item._id;
      return (
        <tr
          key={item._id}
          className={`border-b border-gray-100 transition-colors cursor-pointer ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
          onClick={() => this.trItemClick(item)}
        >
          <td className="py-3 px-4 font-mono text-[10px] text-gray-400">{item._id.slice(-6)}...</td>
          <td className="py-3 px-4 text-sm font-bold text-gray-800">{item.name}</td>
          <td className="py-3 px-4 text-sm font-black text-indigo-600">{item.price.toLocaleString()}đ</td>
          <td className="py-3 px-4 text-xs text-gray-500">{new Date(item.cdate).toLocaleDateString('vi-VN')}</td>
          <td className="py-3 px-4 text-center">
            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
              {item.category.name}
            </span>
          </td>
          <td className="py-3 px-4 text-center">
            <span className={`font-bold ${item.quantity <= 5 ? 'text-red-500' : 'text-slate-600'}`}>
              {item.quantity}
            </span>
          </td>
          <td className="py-3 px-4">
            <img
              src={"data:image/jpg;base64," + item.image}
              className="w-12 h-12 object-cover rounded-lg shadow-sm border border-gray-100"
              alt={item.name}
            />
          </td>
        </tr>
      );
    });

    // Render phân trang (Pagination)
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      const pageNum = index + 1;
      const isActive = pageNum === this.state.curPage;
      return (
        <button
          key={index}
          className={`mx-1 w-8 h-8 rounded-lg text-xs font-bold transition-all ${isActive
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
            }`}
          onClick={() => this.lnkPageClick(pageNum)}
        >
          {pageNum}
        </button>
      );
    });

    return (
      <div className="flex flex-col lg:flex-row gap-6 p-2">
        {/* BÊN TRÁI: DANH SÁCH SẢN PHẨM */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Kho hàng</h2>
            <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
              Trang {this.state.curPage} / {this.state.noPages}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <tr>
                  <th className="py-4 px-4">Mã</th>
                  <th className="py-4 px-4">Tên sản phẩm</th>
                  <th className="py-4 px-4">Giá</th>
                  <th className="py-4 px-4">Ngày tạo</th>
                  <th className="py-4 px-4 text-center">Danh mục</th>
                  <th className="py-4 px-4 text-center">Tồn kho</th>
                  <th className="py-4 px-4">Ảnh</th>
                </tr>
              </thead>
              <tbody>
                {prods}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-center">
            <div className="flex items-center space-x-1">
              {pagination}
            </div>
          </div>
        </div>

        {/* BÊN PHẢI: CHI TIẾT & THAO TÁC (Component Con) */}
        <div className="lg:w-96 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 self-start sticky top-24">
          <ProductDetail
            item={this.state.itemSelected}
            curPage={this.state.curPage}
            updateProducts={this.updateProducts}
          />
        </div>
      </div>
    );
  }

  // Giữ nguyên Logic
  updateProducts = (products, noPages, curPage) => {
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;