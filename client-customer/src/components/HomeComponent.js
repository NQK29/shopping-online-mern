import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MyContext from '../contexts/MyContext';

class Home extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  // ⚡ HÀM XỬ LÝ MUA NGAY SIÊU TỐC
  handleQuickBuy(e, item) {
    e.preventDefault();
    const mycart = this.context.mycart || [];
    const index = mycart.findIndex(x => x.product._id === item._id);

    if (index === -1) {
      mycart.push({ product: item, quantity: 1 });
    } else {
      mycart[index].quantity += 1;
    }

    this.context.setMycart(mycart);
    this.props.navigate('/mycart'); // 🚀 Chuyển hướng thẳng vào giỏ hàng
  }

  // Hàm render Card sản phẩm để dùng chung cho cả 2 danh sách
  renderProductCard(item, badgeText, badgeColor) {
    // Nếu sản phẩm cũ chưa có slug trong DB, ta dùng tạm ID để link không bị lỗi sập trang
    const productLink = `/product/${item.slug || item._id}`;

    return (
      <div key={item._id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative flex flex-col h-full">
        <div className={`absolute top-2.5 left-2.5 z-10 ${badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider`}>
          {badgeText}
        </div>

        {/* Đổi link bọc ảnh thành productLink */}
        <Link to={productLink} className="block overflow-hidden flex-shrink-0 bg-gray-50">
          <img
            src={"data:image/jpg;base64," + item.image}
            alt={`Mua sắm thiết bị công nghệ chính hãng: ${item.name}`}
            className="w-full h-48 sm:h-52 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Thêm flex flex-col và flex-grow để các nút luôn thẳng hàng đều nhau dưới đáy card */}
        <div className="p-3.5 flex flex-col flex-grow justify-between">
          <div>
            {/* Đổi link tiêu đề thành productLink */}
            <Link to={productLink}>
              <h3 className="text-gray-800 font-semibold text-sm line-clamp-2 hover:text-blue-600 transition-colors h-10 overflow-hidden mb-1">
                {item.name}
              </h3>
            </Link>
          </div>

          <div className="mt-2 flex flex-col space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-black text-lg">
                {item.price.toLocaleString()} <span className="text-xs underline">đ</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">Freeship</span>
            </div>

            {/* 🎯 NÚT MUA NGAY SIÊU TỐC */}
            <button
              onClick={(e) => this.handleQuickBuy(e, item)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-lg transition-all duration-300 shadow-sm shadow-blue-100 transform active:scale-95 tracking-wider uppercase"
            >
              MUA NGAY
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const newprods = this.state.newprods.map((item) => this.renderProductCard(item, "Mới", "bg-green-500"));
    const hotprods = this.state.hotprods.map((item) => this.renderProductCard(item, "Bán chạy", "bg-red-500"));

    const allProductsLink = "/product/all";

    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

          <Helmet>
            <title>KSHOP - Điện thoại, Máy tính & Phụ kiện chính hãng</title>
            <meta name="description" content="Hệ thống bán lẻ thiết bị công nghệ, linh kiện máy tính, build PC gaming đồ họa uy tín, giá tốt nhất thị trường tại KSHOP." />
          </Helmet>

          <h1 className="sr-only">KSHOP - Siêu thị Thiết bị Công nghệ, Điện thoại & Linh kiện PC chính hãng</h1>

          {/* 🎯 KHỐI DANH MỤC NỔI BẬT */}
          <section className="mb-10 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xs sm:text-sm font-black text-gray-400 uppercase tracking-wider mb-5">
              Danh mục công nghệ nổi bật
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

              {/* TIN CÔNG NGHỆ */}
              <Link to="/blog" className="flex items-center space-x-4 p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md group">
                <span className="text-3xl sm:text-4xl filter drop-shadow">📰</span>
                <div>
                  <h3 className="text-sm font-black text-gray-800 group-hover:text-blue-600 uppercase tracking-wide">Tin Công Nghệ</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Kiến thức & xu hướng</p>
                </div>
              </Link>

              {/* HI-END PC */}
              <Link to={allProductsLink} className="flex items-center space-x-4 p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md group">
                <span className="text-3xl sm:text-4xl filter drop-shadow">💻</span>
                <div>
                  <h3 className="text-sm font-black text-gray-800 group-hover:text-blue-600 uppercase tracking-wide">Hi-End PC</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Build theo yêu cầu</p>
                </div>
              </Link>

              {/* GAMING GEAR */}
              <Link to={allProductsLink} className="flex items-center space-x-4 p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md group">
                <span className="text-3xl sm:text-4xl filter drop-shadow">🕹️</span>
                <div>
                  <h3 className="text-sm font-black text-gray-800 group-hover:text-blue-600 uppercase tracking-wide">Gaming Gear</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Phụ kiện đỉnh cao</p>
                </div>
              </Link>

              {/* TRẢ GÓP 0% */}
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-transparent shadow-sm">
                <span className="text-3xl sm:text-4xl filter drop-shadow">🛡️</span>
                <div>
                  <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">Trả Góp 0%</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Thủ tục siêu tốc</p>
                </div>
              </div>

            </div>
          </section>

          {/* Section: NEW PRODUCTS (Đã chỉnh grid 5 cột) */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6 border-l-4 border-blue-600 pl-3">
              <h2 className="text-xl sm:text-2xl font-black text-gray-950 uppercase tracking-tight">SẢN PHẨM MỚI ĐỔ BỘ</h2>
              <Link to={allProductsLink} className="text-blue-600 hover:underline font-bold text-xs">Xem tất cả →</Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {newprods}
            </div>
          </section>

          {/* Section: HOT PRODUCTS (Đã chỉnh grid 5 cột) */}
          {this.state.hotprods.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6 border-l-4 border-red-600 pl-3">
                <h2 className="text-xl sm:text-2xl font-black text-gray-950 uppercase tracking-tight">XU HƯỚNG MUA SẮM HOT</h2>
                <Link to={allProductsLink} className="text-red-600 hover:underline font-bold text-xs">Bán chạy nhất →</Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {hotprods}
              </div>
            </section>
          )}

        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
    window.document.title = "KSHOP - Điện thoại, Máy tính & Phụ kiện công nghệ chính hãng";
  }

  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      this.setState({ newprods: res.data });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      this.setState({ hotprods: res.data });
    });
  }
}

export default Home;