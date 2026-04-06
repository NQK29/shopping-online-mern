import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myorders extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  // Hàm phụ để hiển thị nhãn trạng thái đẹp hơn
  renderStatusBadge(status) {
    const statusStyles = {
      'PENDING': 'bg-orange-100 text-orange-600 border-orange-200',
      'APPROVED': 'bg-green-100 text-green-600 border-green-200',
      'CANCELED': 'bg-red-100 text-red-600 border-red-200',
      'SHIPPING': 'bg-blue-100 text-blue-600 border-blue-200',
    };
    const style = statusStyles[status] || 'bg-gray-100 text-gray-600 border-gray-200';
    
    return (
      <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${style}`}>
        {status}
      </span>
    );
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);

    const orderList = this.state.orders.map((item) => {
      const isSelected = this.state.order?._id === item._id;
      return (
        <tr
          key={item._id}
          className={`border-b border-gray-50 transition-all cursor-pointer ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
          onClick={() => this.trItemClick(item)}
        >
          <td className="py-4 px-4 text-xs font-mono text-gray-500">{item._id}</td>
          <td className="py-4 px-4 text-sm text-gray-600">{new Date(item.cdate).toLocaleString('vi-VN')}</td>
          <td className="py-4 px-4 text-sm font-bold text-gray-800">{item.total.toLocaleString()} đ</td>
          <td className="py-4 px-4 text-center">
            {this.renderStatusBadge(item.status)}
          </td>
        </tr>
      );
    });

    return (
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">LỊCH SỬ ĐƠN HÀNG</h2>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* PHẦN 1: DANH SÁCH ĐƠN HÀNG */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                <p className="text-sm text-gray-500">Bấm vào từng dòng để xem chi tiết sản phẩm đã mua</p>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="py-4 px-4">Mã đơn hàng</th>
                    <th className="py-4 px-4">Ngày đặt</th>
                    <th className="py-4 px-4">Tổng tiền</th>
                    <th className="py-4 px-4 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.orders.length > 0 ? orderList : (
                    <tr><td colSpan="4" className="py-20 text-center text-gray-400">Bạn chưa có đơn hàng nào</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PHẦN 2: CHI TIẾT ĐƠN HÀNG (CHỈ HIỆN KHI CÓ CLICK) */}
            {this.state.order && (
              <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-500 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 bg-blue-500 text-white flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">CHI TIẾT ĐƠN HÀNG</h3>
                    <p className="text-xs opacity-80">Mã: {this.state.order._id}</p>
                  </div>
                  <button onClick={() => this.setState({order: null})} className="hover:bg-blue-600 p-2 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase">
                    <tr>
                      <th className="py-3 px-6 text-center">STT</th>
                      <th className="py-3 px-6">Sản phẩm</th>
                      <th className="py-3 px-6">Hình ảnh</th>
                      <th className="py-3 px-6 text-right">Giá</th>
                      <th className="py-3 px-6 text-center">Số lượng</th>
                      <th className="py-3 px-6 text-right font-bold">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.order.items.map((item, index) => (
                      <tr key={item.product._id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-4 px-6 text-center text-gray-400">{index + 1}</td>
                        <td className="py-4 px-6 font-bold text-gray-800">{item.product.name}</td>
                        <td className="py-4 px-6">
                          <img
                            src={"data:image/jpg;base64," + item.product.image}
                            className="w-12 h-12 object-cover rounded shadow-sm"
                            alt=""
                          />
                        </td>
                        <td className="py-4 px-6 text-right text-gray-600">{item.product.price.toLocaleString()} đ</td>
                        <td className="py-4 px-6 text-center">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{item.quantity}</span>
                        </td>
                        <td className="py-4 px-6 text-right text-blue-600 font-bold">
                          {(item.product.price * item.quantity).toLocaleString()} đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-6 bg-gray-50 flex justify-end">
                   <div className="text-right">
                      <p className="text-sm text-gray-500">Tổng cộng thanh toán:</p>
                      <p className="text-2xl font-black text-gray-900">{this.state.order.total.toLocaleString()} đ</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  trItemClick(item) {
    this.setState({ order: item });
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      this.setState({ orders: res.data });
    });
  }
}

export default Myorders;