import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  render() {
    const prod = this.state.product;
    if (prod != null) {
      // KIỂM TRA TRẠNG THÁI KHO
      const isOutOfStock = prod.quantity <= 0;

      return (
        <div className="bg-gray-50 min-h-screen py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
                Chi tiết sản phẩm
              </h2>
              <div className="h-1 w-20 bg-blue-600 mt-2"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
              <div className="md:w-1/2 p-8 bg-white flex items-center justify-center border-r border-gray-50">
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={"data:image/jpg;base64," + prod.image}
                    className={`w-full h-auto max-h-[500px] object-contain transform group-hover:scale-105 transition-transform duration-500 ${isOutOfStock ? 'grayscale opacity-50' : ''}`}
                    alt={prod.name}
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-6 py-2 rounded-full font-black text-xl rotate-12 shadow-2xl">HẾT HÀNG</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4 self-start uppercase">
                  {prod.category.name}
                </span>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">
                  {prod.name}
                </h1>
                
                <p className="text-sm text-gray-400 mb-6 font-mono">Mã sản phẩm: {prod._id}</p>

                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-black text-blue-600">
                    {prod.price.toLocaleString()}
                  </span>
                  <span className="ml-1 text-xl font-bold text-blue-600 underline">đ</span>
                </div>

                {/* HIỂN THỊ SỐ LƯỢNG TỒN KHO - SỬA Ở ĐÂY */}
                <div className="flex items-center space-x-2 mb-8 animate-pulse">
                  <div className={`w-3 h-3 rounded-full ${!isOutOfStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <p className={`text-sm font-bold ${!isOutOfStock ? 'text-green-600' : 'text-red-600'}`}>
                    {!isOutOfStock ? `Còn lại: ${prod.quantity} sản phẩm` : "Hiện tại đã hết hàng"}
                  </p>
                </div>

                <hr className="mb-8 border-gray-100" />

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                      Số lượng mua:
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="1"
                        max={prod.quantity} // Giới hạn tối đa bằng tồn kho
                        disabled={isOutOfStock}
                        className={`w-24 bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-bold text-center transition-all ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
                        value={this.state.txtQuantity}
                        onChange={(e) => this.setState({ txtQuantity: e.target.value })}
                      />
                      <span className="text-gray-400 text-xs italic">
                        {isOutOfStock ? "Vui lòng quay lại sau" : "Nhập số lượng bạn muốn"}
                      </span>
                    </div>
                  </div>

                  {/* NÚT MUA HÀNG - SỬA LOGIC Ở ĐÂY */}
                  <button
                    type="submit"
                    disabled={isOutOfStock}
                    className={`w-full font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-3 transition-all transform active:scale-95 shadow-lg shadow-blue-200 ${
                      !isOutOfStock 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 cursor-pointer' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                    }`}
                    onClick={(e) => this.btnAdd2CartClick(e)}
                  >
                    {!isOutOfStock ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span>THÊM VÀO GIỎ HÀNG</span>
                      </>
                    ) : (
                      <span>HẾT HÀNG</span>
                    )}
                  </button>
                </form>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>Chính hãng 100%</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>Đổi trả miễn phí</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div className="flex justify-center items-center h-screen text-gray-400">Đang tải sản phẩm...</div>;
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      this.setState({ product: res.data });
    });
  }

  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantityBought = parseInt(this.state.txtQuantity);

    // KIỂM TRA LẠI MỘT LẦN NỮA VỀ SỐ LƯỢNG KHO
    if (quantityBought > product.quantity) {
        alert(`Rất tiếc! Bạn chỉ có thể mua tối đa ${product.quantity} sản phẩm này.`);
        return;
    }

    if (quantityBought && quantityBought > 0) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id);

      if (index === -1) {
        mycart.push({ product: product, quantity: quantityBought });
      } else {
        // Kiểm tra xem tổng giỏ hàng + số lượng mới có vượt quá kho không
        if (mycart[index].quantity + quantityBought > product.quantity) {
            alert('Số lượng trong giỏ hàng đã đạt mức tối đa hiện có trong kho!');
            return;
        }
        mycart[index].quantity += quantityBought;
      }

      this.context.setMycart(mycart);
      alert('Đã thêm sản phẩm vào giỏ hàng thành công! 🛒');
    } else {
      alert('Vui lòng nhập số lượng hợp lệ');
    }
  }
}

export default withRouter(ProductDetail);