import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      const isSelected = this.state.itemSelected?._id === item._id;
      return (
        <tr 
          key={item._id} 
          className={`border-b border-gray-100 transition-all cursor-pointer ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'}`} 
          onClick={() => this.trItemClick(item)}
        >
          <td className="py-4 px-6 font-mono text-xs text-gray-400">{item._id}</td>
          <td className="py-4 px-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                {item.name.charAt(0)}
              </div>
              <span className="text-sm font-bold text-gray-800 uppercase tracking-tight">
                {item.name}
              </span>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <div className="flex flex-col lg:flex-row gap-8 p-2">
        {/* BÊN TRÁI: DANH SÁCH DANH MỤC */}
        <div className="flex-[1.5] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Danh mục sản phẩm</h2>
            </div>
            <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {this.state.categories.length} Nhóm hàng
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="py-4 px-6">Mã định danh (ID)</th>
                  <th className="py-4 px-6">Tên danh mục</th>
                </tr>
              </thead>
              <tbody>
                {this.state.categories.length > 0 ? cates : (
                    <tr>
                        <td colSpan="2" className="py-20 text-center text-gray-400 italic">Đang tải dữ liệu...</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BÊN PHẢI: FORM CHI TIẾT (CategoryDetail) */}
        <div className="lg:w-80 xl:w-96 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 self-start sticky top-24">
          <CategoryDetail 
            item={this.state.itemSelected} 
            updateCategories={this.updateCategories} 
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      this.setState({ categories: res.data });
    });
  }

  updateCategories = (categories) => { 
    this.setState({ categories: categories });
  }
}

export default Category;