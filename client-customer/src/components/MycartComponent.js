import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import { Link } from 'react-router-dom';

class Mycart extends Component {
    static contextType = MyContext;

    componentDidMount() {
        window.document.title = "Giỏ hàng của bạn | KSHOP";
    }

    // ⚡ Hàm thay đổi số lượng sản phẩm trong giỏ hàng kèm check tồn kho
    handleQuantityChange(item, newQty) {
        const quantity = parseInt(newQty);
        
        // 1. Nếu số lượng nhỏ hơn 1, giữ nguyên không cho giảm tiếp (muốn xóa phải bấm icon thùng rác)
        if (isNaN(quantity) || quantity < 1) return;

        // 2. Kiểm tra tồn kho của sản phẩm thực tế trong DB
        if (quantity > item.product.quantity) {
            alert(`Rất tiếc! Sản phẩm này hiện chỉ còn tối đa ${item.product.quantity} cái trong kho.`);
            return;
        }

        // 3. Cập nhật số lượng mới vào Context giỏ hàng toàn cục
        const mycart = this.context.mycart;
        const index = mycart.findIndex(x => x.product._id === item.product._id);
        if (index !== -1) {
            mycart[index].quantity = quantity;
            this.context.setMycart(mycart);
        }
    }

    render() {
        const mycartItems = this.context.mycart.map((item, index) => {
            return (
                <tr key={item.product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-4 text-center text-gray-500 font-bold text-base">{index + 1}</td>
                    <td className="py-6 px-4">
                        {/* 🎯 PHÓNG TO KHỐI HIỂN THỊ SẢN PHẨM VÀ CỠ CHỮ */}
                        <div className="flex items-center space-x-5">
                          <img
                              src={"data:image/jpg;base64," + item.product.image}
                              className="w-24 h-24 object-cover rounded-xl shadow-md border border-gray-100 flex-shrink-0"
                              alt={item.product.name}
                          />
                          <div className="space-y-1">
                              <div className="text-gray-900 font-black text-lg hover:text-blue-600 transition-colors">{item.product.name}</div>
                              <div className="text-xs font-mono text-gray-400">ID: {item.product._id}</div>
                          </div>
                        </div>
                    </td>
                    <td className="py-6 px-4 text-gray-600 uppercase text-xs font-bold tracking-wider">{item.product.category.name}</td>
                    <td className="py-6 px-4 text-gray-900 font-bold text-lg text-right">{item.product.price.toLocaleString()} đ</td>
                    
                    {/* 🎯 CỤM BỘ NÚT TĂNG GIẢM SỐ LƯỢNG THÔNG MINH KÈM BADGE CHECK KHO */}
                    <td className="py-6 px-4 text-center">
                        <div className="inline-flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 shadow-inner">
                            <button
                                type="button"
                                onClick={() => this.handleQuantityChange(item, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center font-bold text-gray-500 hover:text-blue-600 hover:bg-white rounded-lg transition-all active:scale-95 text-lg"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                max={item.product.quantity}
                                onChange={(e) => this.handleQuantityChange(item, e.target.value)}
                                className="w-12 text-center bg-transparent border-none text-base font-black text-gray-900 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                                type="button"
                                onClick={() => this.handleQuantityChange(item, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center font-bold text-gray-500 hover:text-blue-600 hover:bg-white rounded-lg transition-all active:scale-95 text-lg"
                            >
                                +
                            </button>
                        </div>
                        <span className="block text-[10px] text-orange-600 font-bold mt-1 bg-orange-50 rounded px-1 py-0.5 inline-block border border-orange-100">
                            Kho còn: {item.product.quantity}
                        </span>
                    </td>

                    <td className="py-6 px-4 text-blue-600 font-black text-xl text-right">
                        {(item.product.price * item.quantity).toLocaleString()} đ
                    </td>
                    <td className="py-6 px-4 text-center">
                        <button
                            className="text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-all border border-transparent hover:border-red-100"
                            onClick={() => this.lnkRemoveClick(item.product._id)}
                            title="Xóa sản phẩm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="bg-gray-50 min-h-screen py-12">
                {/* 🎯 MỞ RỘNG ĐỘ RỘNG CONTAINER LÊN max-w-7xl CHO THOÁNG MẮT */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between mb-10 border-b-2 border-gray-200 pb-5">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">GIỎ HÀNG CỦA BẠN</h2>
                        <span className="text-gray-500 text-lg font-bold bg-white px-4 py-1.5 rounded-xl border border-gray-100 shadow-sm">{this.context.mycart.length} sản phẩm</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Danh sách sản phẩm bên trái */}
                        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="py-5 px-4 text-center text-gray-400 font-bold uppercase text-[11px] tracking-wider w-16">STT</th>
                                            <th className="py-5 px-4 text-gray-400 font-bold uppercase text-[11px] tracking-wider">Sản phẩm</th>
                                            <th className="py-5 px-4 text-gray-400 font-bold uppercase text-[11px] tracking-wider w-28">Loại</th>
                                            <th className="py-5 px-4 text-right text-gray-400 font-bold uppercase text-[11px] tracking-wider w-36">Đơn giá</th>
                                            <th className="py-5 px-4 text-center text-gray-400 font-bold uppercase text-[11px] tracking-wider w-40">Số lượng</th>
                                            <th className="py-5 px-4 text-right text-gray-400 font-bold uppercase text-[11px] tracking-wider w-44">Thành tiền</th>
                                            <th className="py-5 px-4 w-16"></th>
                                        </tr>
                                     Sappho </thead>
                                    <tbody>
                                        {mycartItems}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Tóm tắt thanh toán bên phải (Phóng to chữ và form rộng rãi) */}
                        <div className="w-full lg:w-96 space-y-6 flex-shrink-0">
                            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 mb-6">Tóm tắt đơn hàng</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-base text-gray-600">
                                        <span>Tạm tính</span>
                                        <span className="font-semibold text-gray-900">{CartUtil.getTotal(this.context.mycart).toLocaleString()} đ</span>
                                    </div>
                                    <div className="flex justify-between text-base text-gray-600 border-b border-gray-100 pb-4">
                                        <span>Giao hàng</span>
                                        <span className="text-green-600 font-bold bg-green-50 px-2.5 py-0.5 rounded-md border border-green-100">Miễn phí</span>
                                    </div>
                                    <div className="flex justify-between pt-4">
                                        <span className="text-gray-900 font-bold text-lg">Tổng cộng</span>
                                        <span className="text-3xl font-black text-blue-600 tracking-tight">
                                            {CartUtil.getTotal(this.context.mycart).toLocaleString()} đ
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => this.lnkCheckoutClick()}
                                    className="w-full mt-8 bg-blue-600 text-white py-4.5 rounded-xl font-black text-base shadow-lg shadow-blue-100 hover:bg-blue-700 hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-2 uppercase tracking-wide"
                                >
                                    <span>ĐẶT HÀNG NGAY</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                            <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-100 flex items-start space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-xs text-blue-800 font-medium leading-relaxed">
                                    Vui lòng kiểm tra lại kỹ danh sách sản phẩm, số lượng đặt hàng trước khi nhấn nút Đặt hàng.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    lnkRemoveClick(id) {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            const mycart = this.context.mycart;
            const index = mycart.findIndex(x => x.product._id === id);
            if (index !== -1) {
                mycart.splice(index, 1);
                this.context.setMycart(mycart);
            }
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