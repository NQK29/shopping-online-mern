import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Customer extends Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            orders: [],
            order: null,
            selectedCustID: null // Lưu ID khách hàng đang chọn để highlight
        };
    }

    render() {
        // 1. Render danh sách khách hàng
        const customers = this.state.customers.map((item) => {
            const isSelected = this.state.selectedCustID === item._id;
            return (
                <tr
                    key={item._id}
                    className={`border-b border-gray-100 transition-colors cursor-pointer ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                    onClick={() => this.trCustomerClick(item)}
                >
                    <td className="py-3 px-4 font-mono text-[10px] text-gray-400">{item._id.slice(-6)}</td>
                    <td className="py-3 px-4 text-sm font-bold text-gray-800">{item.username}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 font-mono tracking-tighter">••••••</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.phone}</td>
                    <td className="py-3 px-4 text-sm text-blue-500 hover:underline">{item.email}</td>
                    <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.active === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {item.active === 1 ? 'ACTIVE' : 'DEACTIVE'}
                        </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                        {item.active === 0 ? (
                            <button
                                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-all active:scale-95 shadow-sm"
                                onClick={(e) => { e.stopPropagation(); this.lnkEmailClick(item); }}
                            >
                                Gửi Mail
                            </button>
                        ) : (
                            <button
                                className="text-xs border border-red-200 text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg transition-all active:scale-95"
                                onClick={(e) => { e.stopPropagation(); this.lnkDeactiveClick(item); }}
                            >
                                Khóa
                            </button>
                        )}
                    </td>
                </tr>
            );
        });

        // 2. Render danh sách đơn hàng của khách đã chọn
        const orders = this.state.orders.map((item) => {
            const isOrderSelected = this.state.order?._id === item._id;
            return (
                <tr
                    key={item._id}
                    className={`border-b border-gray-100 transition-colors cursor-pointer ${isOrderSelected ? 'bg-amber-50' : 'hover:bg-gray-50'}`}
                    onClick={() => this.trOrderClick(item)}
                >
                    <td className="py-3 px-4 text-xs font-mono text-gray-400">{item._id.slice(-6)}</td>
                    <td className="py-3 px-4 text-xs">{new Date(item.cdate).toLocaleDateString('vi-VN')}</td>
                    <td className="py-3 px-4 text-sm font-bold text-gray-800 text-right">{item.total.toLocaleString()}đ</td>
                    <td className="py-3 px-4 text-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.status}</span>
                    </td>
                </tr>
            );
        });

        return (
            <div className="space-y-6">
                {/* LEVEL 1: CUSTOMER LIST */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Danh sách khách hàng</h2>
                        <div className="p-2 bg-white rounded-xl shadow-inner border border-gray-100 text-xs text-gray-400">
                             Total: <b>{this.state.customers.length}</b>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <tr>
                                    <th className="py-4 px-4">ID</th>
                                    <th className="py-4 px-4">Tài khoản</th>
                                    <th className="py-4 px-4">Mật khẩu</th>
                                    <th className="py-4 px-4">Họ tên</th>
                                    <th className="py-4 px-4">SĐT</th>
                                    <th className="py-4 px-4">Email</th>
                                    <th className="py-4 px-4 text-center">Trạng thái</th>
                                    <th className="py-4 px-4 text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>{customers}</tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* LEVEL 2: ORDER LIST (Hiện khi chọn khách) */}
                    {this.state.orders.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-left-4 duration-500">
                            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
                                <h2 className="text-sm font-bold uppercase tracking-widest">Lịch sử đơn hàng</h2>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="py-3 px-4">Mã ĐH</th>
                                        <th className="py-3 px-4">Ngày đặt</th>
                                        <th className="py-3 px-4 text-right">Tổng tiền</th>
                                        <th className="py-3 px-4 text-center">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>{orders}</tbody>
                            </table>
                        </div>
                    )}

                    {/* LEVEL 3: ORDER DETAIL (Hiện khi chọn đơn hàng) */}
                    {this.state.order && (
                        <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-400 overflow-hidden animate-in slide-in-from-right-4 duration-500">
                            <div className="p-4 bg-amber-400 text-amber-900 flex justify-between items-center">
                                <h2 className="text-sm font-bold uppercase tracking-widest">Chi tiết đơn hàng</h2>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-amber-50 text-[10px] font-bold text-amber-600 uppercase">
                                    <tr>
                                        <th className="py-3 px-4">Sản phẩm</th>
                                        <th className="py-3 px-4">Ảnh</th>
                                        <th className="py-3 px-4 text-right">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.order.items.map((item, index) => (
                                        <tr key={item.product._id} className="border-b border-amber-50">
                                            <td className="py-3 px-4 text-xs font-bold">{item.product.name} <br/> <span className="text-gray-400 font-normal">x{item.quantity}</span></td>
                                            <td className="py-3 px-4">
                                                <img src={"data:image/jpg;base64," + item.product.image} className="w-10 h-10 object-cover rounded shadow-sm" alt="" />
                                            </td>
                                            <td className="py-3 px-4 text-right text-xs font-bold text-amber-600">{(item.product.price * item.quantity).toLocaleString()}đ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Logic giữ nguyên
    lnkEmailClick(item) { this.apiGetCustomerSendmail(item._id); }
    lnkDeactiveClick(item) { this.apiPutCustomerDeactive(item._id, item.token); }
    componentDidMount() { this.apiGetCustomers(); }
    
    trCustomerClick(item) {
        this.setState({ orders: [], order: null, selectedCustID: item._id });
        this.apiGetOrdersByCustID(item._id);
    }

    trOrderClick(item) { this.setState({ order: item }); }

    apiGetCustomers() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/customers', config).then((res) => { this.setState({ customers: res.data }); });
    }

    apiGetOrdersByCustID(cid) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/orders/customer/' + cid, config).then((res) => { this.setState({ orders: res.data }); });
    }

    apiGetCustomerSendmail(id) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => { alert(res.data.message); });
    }

    apiPutCustomerDeactive(id, token) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/customers/deactive/' + id, { token }, config).then((res) => {
            if (res.data) this.apiGetCustomers();
            else alert('Lỗi!');
        });
    }
}

export default Customer;