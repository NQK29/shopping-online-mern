import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }

  render() {
    return (
      <div className="space-y-6">
        {/* Tiêu đề Form */}
        <div className="border-b border-gray-100 pb-4">
          <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">
            {this.state.txtID ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
          </h2>
          <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">
            Quản lý nhóm hàng hóa hệ thống
          </p>
        </div>

        <form className="space-y-5">
          {/* Input ID (Chỉ đọc) */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Mã định danh (ID)</label>
            <input
              disabled
              type="text"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-400 cursor-not-allowed italic"
              value={this.state.txtID}
              readOnly={true}
              placeholder="ID tự động phát sinh..."
            />
          </div>

          {/* Input Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 italic">Tên danh mục *</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
              placeholder="Ví dụ: Laptop, Điện thoại..."
              value={this.state.txtName}
              onChange={(e) => { this.setState({ txtName: e.target.value }) }}
            />
          </div>

          {/* Nhóm nút bấm thao tác */}
          <div className="pt-4 space-y-3">
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 text-xs uppercase"
              onClick={(e) => this.btnAddClick(e)}
            >
              Thêm mới danh mục
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!this.state.txtID}
                onClick={(e) => this.btnUpdateClick(e)}
              >
                Cập nhật
              </button>
              <button
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!this.state.txtID}
                onClick={(e) => this.btnDeleteClick(e)}
              >
                Xóa bỏ
              </button>
            </div>
          </div>
        </form>

        {/* Note nhỏ bên dưới */}
        <div className="bg-blue-50 p-4 rounded-xl flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[10px] text-blue-700 leading-relaxed italic">
                Lưu ý: Xóa danh mục sẽ ảnh hưởng đến các sản phẩm thuộc danh mục đó. Vui lòng kiểm tra kỹ trước khi xóa.
            </p>
        </div>
      </div>
    );
  }

  // --- LOGIC GIỮ NGUYÊN TỪ CODE CỦA BẠN ---
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item && this.props.item !== null) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      this.props.updateCategories(res.data);
    });
  }

  btnAddClick(e) {
    e.preventDefault();
    if (this.state.txtName) {
      this.apiPostCategory({ name: this.state.txtName });
    } else {
      alert('Vui lòng nhập tên danh mục!');
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    if (this.state.txtID && this.state.txtName) {
      this.apiPutCategory(this.state.txtID, { name: this.state.txtName });
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      if (this.state.txtID) this.apiDeleteCategory(this.state.txtID);
    }
  }

  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      if (res.data) { alert('THÊM THÀNH CÔNG!'); this.apiGetCategories(); }
    });
  }

  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      if (res.data) { alert('CẬP NHẬT THÀNH CÔNG!'); this.apiGetCategories(); }
    });
  }

  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      if (res.data) { alert('XÓA THÀNH CÔNG!'); this.apiGetCategories(); }
    });
  }
}

export default CategoryDetail;