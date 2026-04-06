import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";

class Myprofile extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
    };
  }

  render() {
    if (this.context.token === "") {
      return <Navigate replace to="/login" />;
    }

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-8 py-10 text-white text-center">
            <div className="inline-block p-3 bg-white/20 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black tracking-tight uppercase">Thông tin cá nhân</h2>
            <p className="text-blue-100 mt-2">Cập nhật thông tin tài khoản của bạn để nhận dịch vụ tốt nhất</p>
          </div>

          <form className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username - Disabled vì thường không cho đổi username */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Tên đăng nhập</label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    className="w-full bg-gray-100 border border-gray-200 text-gray-500 rounded-xl py-3 px-4 cursor-not-allowed italic"
                    value={this.state.txtUsername}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  className="w-full bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl py-3 px-4 transition-all outline-none"
                  value={this.state.txtPassword}
                  onChange={(e) => this.setState({ txtPassword: e.target.value })}
                />
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Họ và tên</label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl py-3 px-4 transition-all outline-none"
                  value={this.state.txtName}
                  onChange={(e) => this.setState({ txtName: e.target.value })}
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Số điện thoại</label>
                <input
                  type="tel"
                  className="w-full bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl py-3 px-4 transition-all outline-none"
                  value={this.state.txtPhone}
                  onChange={(e) => this.setState({ txtPhone: e.target.value })}
                />
              </div>

              {/* Email - Full width */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Địa chỉ Email</label>
                <input
                  type="email"
                  className="w-full bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl py-3 px-4 transition-all outline-none"
                  value={this.state.txtEmail}
                  onChange={(e) => this.setState({ txtEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95 flex items-center justify-center space-x-2"
                onClick={(e) => this.btnUpdateClick(e)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
                <span>CẬP NHẬT THÔNG TIN</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
      });
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;

    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const customer = {
        username: txtUsername,
        password: txtPassword,
        name: txtName,
        phone: txtPhone,
        email: txtEmail,
      };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert("Vui lòng điền đầy đủ tất cả các trường!");
    }
  }

  apiPutCustomer(id, customer) {
    const config = {
      headers: { "x-access-token": this.context.token },
    };

    axios.put("/api/customer/customers/" + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("Cập nhật thông tin thành công!");
        this.context.setCustomer(result);
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    });
  }
}

export default Myprofile;