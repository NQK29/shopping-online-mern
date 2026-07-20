import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import BlogDetail from './BlogDetailComponent';

class Blog extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      itemSelected: null
    };
  }

  render() {
    const blogRows = this.state.blogs.map((item, index) => {
      return (
        <tr 
          key={item._id} 
          className={`hover:bg-slate-50 cursor-pointer border-b border-slate-100 transition-colors ${this.state.itemSelected?._id === item._id ? 'bg-indigo-50/50 text-indigo-600 font-semibold' : ''}`}
          onClick={() => this.setState({ itemSelected: item })}
        >
          <td className="p-4 text-center text-sm text-slate-500">{index + 1}</td>
          <td className="p-4 text-sm font-medium">{item.title}</td>
          <td className="p-4 text-sm text-slate-500 max-w-xs truncate">{item.summary}</td>
          <td className="p-4 text-sm text-center text-slate-400">
            {new Date(item.cdate).toLocaleDateString('vi-VN')}
          </td>
        </tr>
      );
    });

    return (
      <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-180px)]">
        {/* BÊN TRÁI: DANH SÁCH BÀI VIẾT */}
        <div className="w-full lg:w-3/5 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Quản lý Tin tức (Blog)</h2>
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
              onClick={() => this.setState({ itemSelected: { _id: '', title: '', summary: '', content: '', image: '' } })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              <span>Viết bài mới</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 text-center w-16">STT</th>
                  <th className="p-4">Tiêu đề bài viết</th>
                  <th className="p-4">Tóm tắt ngắn</th>
                  <th className="p-4 text-center w-32">Ngày đăng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {this.state.blogs.length > 0 ? blogRows : (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-slate-400 text-sm">Chưa có bài viết nào. Hãy bấm nút viết bài mới!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BÊN PHẢI: FORM CHI TIẾT CHỈNH SỬA */}
        <div className="w-full lg:w-2/5 p-6 bg-slate-50/50">
          <BlogDetail 
            item={this.state.itemSelected} 
            updateBlogsList={(updatedList) => this.setState({ blogs: updatedList, itemSelected: null })} 
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetBlogs();
  }

  apiGetBlogs() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/blogs', config).then((res) => {
      this.setState({ blogs: res.data });
    });
  }
}

export default Blog;