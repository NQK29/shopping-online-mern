import axios from "axios";
import React, { Component } from "react";
import withRouter from "../utils/withRouter"; // Đảm bảo bạn đã import withRouter để navigate sau khi xong

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: "",
      txtToken: "",
    };
  }

  render() {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center">

          {/* Icon Minh Họa */}
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          <div>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 italic">
              Xác thực tài khoản
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Vui lòng nhập ID và mã Token đã được gửi đến email của bạn để bắt đầu mua sắm.
            </p>
          </div>

          <form className="mt-8 space-y-4">
            <div className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                  Mã định danh (ID)
                </label>
                <input
                  type="text"
                  placeholder="Nhập ID khách hàng"
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
                  value={this.state.txtID}
                  onChange={(e) => this.setState({ txtID: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
                  Mã xác thực (Token)
                </label>
                <input
                  type="text"
                  placeholder="Nhập mã token"
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all sm:text-sm"
                  value={this.state.txtToken}
                  onChange={(e) => this.setState({ txtToken: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform active:scale-95 shadow-lg shadow-blue-200"
                onClick={(e) => this.btnActiveClick(e)}
              >
                KÍCH HOẠT NGAY
              </button>
            </div>
          </form>

          <div className="mt-4">
            <button
              onClick={() => this.props.navigate('/login')}
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
              ← Quay lại đăng nhập
            </button>
          </div>
        </div>
      </div>
    );
  }

  btnActiveClick(e) {
    e.preventDefault();
    const { txtID, txtToken } = this.state;

    if (txtID && txtToken) {
      this.apiActive(txtID, txtToken);
    } else {
      alert("Vui lòng nhập đầy đủ ID và mã Token!");
    }
  }

  apiActive(id, token) {
    const body = { id: id, token: token };

    axios.post("/api/customer/active", body).then((res) => {
      const result = res.data;
      console.log("Dữ liệu Backend trả về:", result);

      if (result === true || (result && (result.matchedCount > 0 || result.success === true))) {
        alert("KÍCH HOẠT THÀNH CÔNG! Chào mừng bạn.");
        this.props.navigate("/login");
      } else {
        alert("Kích hoạt không thành công. Vui lòng kiểm tra lại ID/Token hoặc tài khoản đã active rồi.");
      }
    }).catch(err => {
      console.error("Lỗi gọi API:", err);
      alert("Không thể kết nối đến máy chủ.");
    });
  }
}

export default withRouter(Active);