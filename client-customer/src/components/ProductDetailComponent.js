import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

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
      const isOutOfStock = prod.quantity <= 0;

      // Định nghĩa giá tiền định dạng chữ để chèn vào Meta Description cho hấp dẫn
      const formattedPrice = prod.price.toLocaleString();

      return (
        <main className="bg-gray-50 min-h-screen py-12">
          {/* 🎯 CẤU HÌNH THẺ META ĐỘNG (DYNAMIC META TAGS CHUẨN SEO ON-PAGE) */}
          <Helmet>
            <title>{`${prod.name} Chính Hãng, Giá Tốt Nhất | KSHOP`}</title>
            <meta
              name="description"
              content={`Mua ngay sản phẩm ${prod.name} thuộc danh mục ${prod.category.name} chính hãng với giá chỉ ${formattedPrice}đ. Số lượng có hạn tại hệ thống KSHOP, ưu đãi tốt nhất hôm nay!`}
            />
            <meta name="keywords" content={`${prod.name}, ${prod.name} gia re, mua ${prod.name}, kshop`} />

            {/* Thẻ Open Graph giúp tối ưu hiển thị khi chia sẻ link lên Facebook, Zalo */}
            <meta property="og:title" content={`${prod.name} Chính Hãng, Giá Tốt Nhất | KSHOP`} />
            <meta property="og:description" content={`Mua ngay sản phẩm ${prod.name} chính hãng với giá chỉ ${formattedPrice}đ tại KSHOP.`} />
            <meta property="og:type" content="product" />
          </Helmet>

          <div className="max-w-5xl mx-auto px-4">

            {/* Thanh điều hướng Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6 font-medium" aria-label="Breadcrumb">
              <Link to="/home" className="hover:text-blue-600 transition-colors">Trang chủ</Link> / {' '}

              <Link
                to={`/product/category/${prod.category.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {prod.category.name}
              </Link> / {' '}

              <Link
                to={`/product/${prod.slug}`}
                className="text-gray-800 font-semibold hover:text-blue-600 transition-colors"
              >
                {prod.name}
              </Link>
            </nav>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

              {/* VÙNG HIỂN THỊ HÌNH ẢNH */}
              <div className="md:w-1/2 p-8 bg-white flex items-center justify-center border-r border-gray-50">
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={"data:image/jpg;base64," + prod.image}
                    className={`w-full h-auto max-h-[500px] object-contain transform group-hover:scale-105 transition-transform duration-500 ${isOutOfStock ? 'grayscale opacity-50' : ''}`}
                    alt={`Hình ảnh sản phẩm ${prod.name} chính hãng tại KSHOP`}
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-6 py-2 rounded-full font-black text-xl rotate-12 shadow-2xl">HẾT HÀNG</span>
                    </div>
                  )}
                </div>
              </div>

              {/* VÙNG THÔNG TIN CHI TIẾT */}
              <div className="md:w-1/2 p-10 flex flex-col justify-center">

                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
                  Danh mục: {prod.category.name}
                </p>

                {/* TIÊU ĐỀ CHÍNH H1 */}
                <h1 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
                  {prod.name}
                </h1>

                <p className="text-sm text-gray-400 mb-6 font-mono">Mã sản phẩm: {prod._id}</p>

                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-black text-blue-600">
                    {prod.price.toLocaleString()}
                  </span>
                  <span className="ml-1 text-xl font-bold text-blue-600 underline">đ</span>
                </div>

                <div className="flex items-center space-x-2 mb-8">
                  <div className={`w-3 h-3 rounded-full ${!isOutOfStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <p className={`text-sm font-bold ${!isOutOfStock ? 'text-green-600' : 'text-red-600'}`}>
                    {!isOutOfStock ? `Tình trạng: Còn hàng (${prod.quantity} sản phẩm)` : "Tình trạng: Tạm thời hết hàng"}
                  </p>
                </div>

                <hr className="mb-8 border-gray-100" />

                {/* Phần mô tả sản phẩm bổ sung */}
                <div className="mb-6">
                  <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Đặc điểm nổi bật:</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Sản phẩm {prod.name} sở hữu thiết kế hiện đại, cấu hình mạnh mẽ đáp ứng tối đa nhu cầu của người dùng. Cam kết phân phối chính hãng độc quyền tại hệ thống cửa hàng KSHOP.
                  </p>
                </div>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                      Số lượng mua:
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="1"
                        max={prod.quantity}
                        disabled={isOutOfStock}
                        className={`w-24 bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-bold text-center transition-all ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
                        value={this.state.txtQuantity}
                        onChange={(e) => this.setState({ txtQuantity: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* 🎯 HỆ THỐNG CẶP NÚT BÁN HÀNG TỐI ƯU UX CONVERSION */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* NÚT 1: MUA NGAY SIÊU TỐC */}
                    <button
                      disabled={isOutOfStock}
                      className={`flex-[2] font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all transform active:scale-95 shadow-lg ${
                        !isOutOfStock
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-orange-100 cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                      }`}
                      onClick={(e) => this.btnBuyNowClick(e)}
                    >
                      <span>⚡ MUA NGAY CHÍNH HÃNG</span>
                    </button>

                    {/* NÚT 2: THÊM VÀO GIỎ TRƯỚC */}
                    <button
                      type="submit"
                      disabled={isOutOfStock}
                      className={`flex-1 font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all transform active:scale-95 shadow-lg ${
                        !isOutOfStock
                          ? 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 cursor-pointer'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                      }`}
                      onClick={(e) => this.btnAdd2CartClick(e)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>THÊM VÀO GIỎ</span>
                    </button>
                  </div>
                </form>

                {/* 🔥 KHỐI CTA CAM KẾT CHẤT LƯỢNG TĂNG ĐỘ UY TÍN (TRUST BADGES CHUẨN ĐỒ ÁN) */}
                <div className="mt-6 grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🛡️</span>
                    <span className="text-xs font-bold text-slate-700">Bảo hành 12 tháng chính hãng</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🚚</span>
                    <span className="text-xs font-bold text-slate-700">Miễn phí vận chuyển toàn quốc</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🔄</span>
                    <span className="text-xs font-bold text-slate-700">Lỗi là đổi mới trong 30 ngày</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">💳</span>
                    <span className="text-xs font-bold text-slate-700">Hỗ trợ trả góp 0% thủ tục nhanh</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      );
    }
    return <div className="flex justify-center items-center h-screen text-gray-400">Đang tải thông tin sản phẩm...</div>;
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.slug);
  }

  apiGetProduct(slug) {
    axios.get('/api/customer/products/' + slug).then((res) => {
      this.setState({ product: res.data });

      if (res.data) {
        const prod = res.data;
        window.document.title = `${prod.name} Chính Hãng - ${prod.price.toLocaleString()}đ | KSHOP`;
      }
    });
  }

  // ⚡ HÀM XỬ LÝ MUA NGAY ĐI THẲNG ĐẾN TRANG GIỎ HÀNG KÈM SỐ LƯỢNG ĐỘNG
  btnBuyNowClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantityBought = parseInt(this.state.txtQuantity);

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
        if (mycart[index].quantity + quantityBought > product.quantity) {
          alert('Số lượng hàng trong kho không đủ để thêm tiếp!');
          return;
        }
        mycart[index].quantity += quantityBought;
      }

      this.context.setMycart(mycart);
      this.props.navigate('/mycart'); // 🚀 Điều hướng trực diện sang trang thanh toán giỏ hàng
    } else {
      alert('Vui lòng nhập số lượng hợp lệ');
    }
  }

  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantityBought = parseInt(this.state.txtQuantity);

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