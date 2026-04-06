import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order: null
        };
    }

    // Hàm phụ hiển thị Badge trạng thái
    renderStatusBadge(status) {
        const styles = {
            'PENDING': 'bg-amber-100 text-amber-700 border-amber-200',
            'APPROVED': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'CANCELED': 'bg-rose-100 text-rose-700 border-rose-200',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${styles[status] || 'bg-gray-100'}`}>
                {status}
            </span>
        );
    }

    render() {
        const orders = this.state.orders.map((item) => {
            const isSelected = this.state.order?._id === item._id;
            return (
                <tr 
                    key={item._id} 
                    className={`border-b border-gray-100 transition-colors cursor-pointer ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'}`} 
                    onClick={() => this.trItemClick(item)}
                >
                    <td className="py-4 px-4 font-mono text-xs text-gray-500">{item._id}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{new Date(item.cdate).toLocaleString('vi-VN')}</td>
                    <td className="py-4 px-4 text-sm font-bold text-gray-900">{item.customer.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{item.customer.phone}</td>
                    <td className="py-4 px-4 text-sm font-black text-indigo-600 text-right">{item.total.toLocaleString()} đ</td>
                    <td className="py-4 px-4 text-center">{this.renderStatusBadge(item.status)}</td>
                    <td className="py-4 px-4 text-center">
                        {item.status === 'PENDING' && (
                            <div className="flex justify-center space-x-2">
                                <button 
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-sm transition-all active:scale-95"
                                    onClick={(e) => { e.stopPropagation(); this.lnkApproveClick(item._id); }}
                                >
                                    DUYỆT
                                </button>
                                <button 
                                    className="bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-sm transition-all active:scale-95"
                                    onClick={(e) => { e.stopPropagation(); this.lnkCancelClick(item._id); }}
                                >
                                    HỦY
                                </button>
                            </div>
                        )}
                    </td>
                </tr>
            );
        });

        return (
            <div className="space-y-8">
                {/* DANH SÁCH ĐƠN HÀNG */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <h2 className="text-xl font-black text-gray-800 tracking-tight">DANH SÁCH ĐƠN HÀNG</h2>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tổng: {this.state.orders.length}</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                <tr>
                                    <th className="py-3 px-4 text-center">Mã đơn</th>
                                    <th className="py-3 px-4">Ngày tạo</th>
                                    <th className="py-3 px-4">Khách hàng</th>
                                    <th className="py-3 px-4">Số điện thoại</th>
                                    <th className="py-3 px-4 text-right">Tổng tiền</th>
                                    <th className="py-3 px-4 text-center">Trạng thái</th>
                                    <th className="py-3 px-4 text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CHI TIẾT ĐƠN HÀNG */}
                {this.state.order && (
                    <div className="bg-white rounded-2xl shadow-xl border-2 border-indigo-500 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="p-4 bg-indigo-500 text-white flex justify-between items-center">
                            <h2 className="font-bold tracking-tight">CHI TIẾT ĐƠN HÀNG #{this.state.order._id.slice(-6).toUpperCase()}</h2>
                            <button onClick={() => this.setState({order: null})} className="p-1 hover:bg-white/20 rounded-full transition-colors">
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
                                    <th className="py-3 px-6 text-right">Đơn giá</th>
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
                                            <img src={"data:image/jpg;base64," + item.product.image} className="w-12 h-12 object-cover rounded-lg shadow-sm" alt="" />
                                        </td>
                                        <td className="py-4 px-6 text-right text-gray-600">{item.product.price.toLocaleString()} đ</td>
                                        <td className="py-4 px-6 text-center font-bold text-indigo-600">{item.quantity}</td>
                                        <td className="py-4 px-6 text-right text-indigo-600 font-bold">{(item.product.price * item.quantity).toLocaleString()} đ</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }

    // Giữ nguyên các hàm API của bạn
    componentDidMount() { this.apiGetOrders(); }
    trItemClick(item) { this.setState({ order: item }); }
    apiGetOrders() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/orders', config).then((res) => {
            this.setState({ orders: res.data });
        });
    }
    lnkApproveClick(id) { this.apiPutOrderStatus(id, 'APPROVED'); }
    lnkCancelClick(id) { this.apiPutOrderStatus(id, 'CANCELED'); }
    apiPutOrderStatus(id, status) {
        const body = { status: status };
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
            if (res.data) {
                this.apiGetOrders();
            } else {
                alert('Có lỗi xảy ra!');
            }
        });
    }
}

export default Order;