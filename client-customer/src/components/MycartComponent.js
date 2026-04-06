import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import { Link } from 'react-router-dom';

class Mycart extends Component {
    static contextType = MyContext;

    render() {
        const mycartItems = this.context.mycart.map((item, index) => {
            return (
                <tr key={item.product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2 text-center text-gray-500 font-medium">{index + 1}</td>
                    <td className="py-4 px-2">
                        <div className="flex items-center space-x-4">
                            <img
                                src={"data:image/jpg;base64," + item.product.image}
                                className="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-100"
                                alt={item.product.name}
                            />
                            <div>
                                <div className="text-gray-900 font-bold">{item.product.name}</div>
                                <div className="text-xs text-gray-400">ID: {item.product._id}</div>
                            </div>
                        </div>
                    </td>
                    <td className="py-4 px-2 text-gray-600 uppercase text-xs font-semibold">{item.product.category.name}</td>
                    <td className="py-4 px-2 text-gray-900 font-medium text-right">{item.product.price.toLocaleString()} đ</td>
                    <td className="py-4 px-2 text-center">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-bold text-sm">
                            {item.quantity}
                        </span>
                    </td>
                    <td className="py-4 px-2 text-blue-600 font-bold text-right">
                        {(item.product.price * item.quantity).toLocaleString()} đ
                    </td>
                    <td className="py-4 px-2 text-center">
                        <button
                            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                            onClick={() => this.lnkRemoveClick(item.product._id)}
                            title="Xóa sản phẩm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </td>
                </tr>
            );
        });

        if (this.context.mycart.length === 0) {
            return (
                <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                    <div className="bg-gray-100 p-6 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Giỏ hàng của bạn đang trống</h2>
                    <p className="text-gray-500 text-center max-w-sm">Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy quay lại trang chủ để mua sắm nhé!</p>
                    <Link to="/home" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                        QUAY LẠI MUA SẮM
                    </Link>
                </div>
            );
        }

        return (
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between mb-8 border-b-2 border-gray-200 pb-4">
                        <h2 className="text-3xl font-extrabold text-gray-900">GIỎ HÀNG CỦA BẠN</h2>
                        <span className="text-gray-500 font-medium">{this.context.mycart.length} sản phẩm</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Danh sách sản phẩm */}
                        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="py-4 px-2 text-center text-gray-400 font-bold uppercase text-[10px] tracking-wider">STT</th>
                                        <th className="py-4 px-2 text-gray-400 font-bold uppercase text-[10px] tracking-wider">Sản phẩm</th>
                                        <th className="py-4 px-2 text-gray-400 font-bold uppercase text-[10px] tracking-wider">Loại</th>
                                        <th className="py-4 px-2 text-right text-gray-400 font-bold uppercase text-[10px] tracking-wider">Đơn giá</th>
                                        <th className="py-4 px-2 text-center text-gray-400 font-bold uppercase text-[10px] tracking-wider">Số lượng</th>
                                        <th className="py-4 px-2 text-right text-gray-400 font-bold uppercase text-[10px] tracking-wider">Thành tiền</th>
                                        <th className="py-4 px-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mycartItems}
                                </tbody>
                            </table>
                        </div>

                        {/* Tóm tắt thanh toán */}
                        <div className="lg:w-80 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính</span>
                                        <span>{CartUtil.getTotal(this.context.mycart).toLocaleString()} đ</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 border-b border-gray-50 pb-3">
                                        <span>Giao hàng</span>
                                        <span className="text-green-500 font-medium">Miễn phí</span>
                                    </div>
                                    <div className="flex justify-between pt-3">
                                        <span className="text-gray-900 font-bold">Tổng cộng</span>
                                        <span className="text-2xl font-black text-blue-600">
                                            {CartUtil.getTotal(this.context.mycart).toLocaleString()} đ
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => this.lnkCheckoutClick()}
                                    className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all transform active:scale-95 flex items-center justify-center space-x-2"
                                >
                                    <span>ĐẶT HÀNG NGAY</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl flex items-start space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    Vui lòng kiểm tra lại kỹ danh sách sản phẩm trước khi nhấn nút Thanh toán.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Giữ nguyên logic event-handlers và apis của bạn
    lnkRemoveClick(id) {
        const mycart = this.context.mycart;
        const index = mycart.findIndex(x => x.product._id === id);
        if (index !== -1) {
            mycart.splice(index, 1);
            this.context.setMycart(mycart);
        }
    }

    lnkCheckoutClick() {
        if (window.confirm('BẠN CÓ CHẮC CHẮN MUỐN ĐẶT HÀNG?')) {
            if (this.context.mycart.length > 0) {
                const total = CartUtil.getTotal(this.context.mycart);
                const items = this.context.mycart;
                const customer = this.context.customer;
                if (customer) {
                    this.apiCheckout(total, items, customer);
                } else {
                    this.props.navigate('/login');
                }
            } else {
                alert('Giỏ hàng của bạn đang trống!');
            }
        }
    }

    apiCheckout(total, items, customer) {
        const body = { total: total, items: items, customer: customer };
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.post('/api/customer/checkout', body, config).then((res) => {
            const result = res.data;
            if (result) {
                alert('ĐẶT HÀNG THÀNH CÔNG! Cảm ơn bạn đã ủng hộ.');
                this.context.setMycart([]);
                this.props.navigate('/home');
            } else {
                alert('CÓ LỖI XẢY RA KHI ĐẶT HÀNG!');
            }
        });
    }
}

export default withRouter(Mycart);