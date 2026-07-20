import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class BlogDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtTitle: '',
      txtSummary: '',
      txtContent: '',
      imgBlog: ''
    };
  }

  render() {
    if (!this.props.item) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 py-20 text-center">
          <span className="text-4xl mb-2">📰</span>
          <p className="text-sm">Chọn một bài viết bên danh sách<br />hoặc tạo bài mới để chỉnh sửa nội dung.</p>
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <h3 className="text-base font-bold text-slate-800 uppercase tracking-wide">
          {this.state.txtID ? "Cập nhật bài viết" : "Soạn thảo bài viết mới"}
        </h3>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Tiêu đề bài viết</label>
            <input
              type="text"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={this.state.txtTitle}
              onChange={(e) => this.setState({ txtTitle: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Mô tả tóm tắt ngắn</label>
            <textarea
              rows="2"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={this.state.txtSummary}
              onChange={(e) => this.setState({ txtSummary: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Nội dung chi tiết bài viết</label>
            <textarea
              rows="6"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
              value={this.state.txtContent}
              onChange={(e) => this.setState({ txtContent: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Ảnh đại diện bài viết</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                onChange={(e) => this.previewImage(e)}
              />
              {this.state.imgBlog && (
                <img src={"data:image/jpg;base64," + this.state.imgBlog} alt="Review" className="w-16 h-16 object-cover rounded-lg border border-slate-200 shadow-sm" />
              )}
            </div>
          </div>

          <div className="pt-4 flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 rounded-xl shadow-md shadow-indigo-100 transition-all"
              onClick={(e) => this.btnSaveClick(e)}
            >
              LƯU BÀI VIẾT
            </button>

            {this.state.txtID && (
              <button
                type="button"
                className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm px-5 rounded-xl transition-all"
                onClick={(e) => this.btnDeleteClick(e)}
              >
                XÓA
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      //  Kiểm tra nếu item tồn tại (không bị null) thì mới gán giá trị
      if (this.props.item) {
        this.setState({
          txtID: this.props.item._id || '',
          txtTitle: this.props.item.title || '',
          txtSummary: this.props.item.summary || '',
          txtContent: this.props.item.content || '',
          imgBlog: this.props.item.image || ''
        });
      } else {
        //  Nếu item bị null (sau khi xóa hoặc reset), làm sạch toàn bộ form
        this.setState({
          txtID: '',
          txtTitle: '',
          txtSummary: '',
          txtContent: '',
          imgBlog: ''
        });
      }
    }
  }

  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ imgBlog: reader.result.split(',')[1] });
      };
      reader.readAsDataURL(file);
    }
  }

  btnSaveClick(e) {
    e.preventDefault();
    const { txtID, txtTitle, txtSummary, txtContent, imgBlog } = this.state;
    if (!txtTitle.trim() || !txtSummary.trim() || !txtContent.trim()) {
      alert('Vui lòng điền đầy đủ các thông tin bài viết!');
      return;
    }

    const blogObj = { title: txtTitle, summary: txtSummary, content: txtContent, image: imgBlog };
    const config = { headers: { 'x-access-token': this.context.token } };

    if (txtID === '') {
      // THÊM MỚI
      axios.post('/api/admin/blogs', blogObj, config).then((res) => {
        if (res.data) {
          alert('Đăng bài viết công nghệ mới thành công! 🎉');
          this.apiGetBlogsRefresh();
        }
      });
    } else {
      // CẬP NHẬT
      axios.put('/api/admin/blogs/' + txtID, blogObj, config).then((res) => {
        if (res.data) {
          alert('Cập nhật bài viết thành công!');
          this.apiGetBlogsRefresh();
        }
      });
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn bài viết này không?')) {
      const config = { headers: { 'x-access-token': this.context.token } };
      axios.delete('/api/admin/blogs/' + this.state.txtID, config).then((res) => {
        if (res.data) {
          alert('Đã xóa bài viết thành công.');
          this.apiGetBlogsRefresh();
        }
      });
    }
  }

  apiGetBlogsRefresh() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/blogs', config).then((res) => {
      this.props.updateBlogsList(res.data);
    });
  }
}

export default BlogDetail;