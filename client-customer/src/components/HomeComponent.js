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
        <div className={`absolute top-3 left-3 z-10 ${badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider`}>
          {badgeText}
        </div>

        {/* Đổi link bọc ảnh thành productLink */}
        <Link to={productLink} className="block overflow-hidden flex-shrink-0">
          <img
            src={"data:image/jpg;base64," + item.image}
            alt={`Mua sắm thiết bị công nghệ chính hãng: ${item.name}`} // 👈 TỐI ƯU THẺ ALT CHỨA TỪ KHÓA ĐỘNG CHO GOOGLE IMAGES INDEX
            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Thêm flex flex-col và flex-grow để các nút luôn thẳng hàng đều nhau dưới đáy card */}
        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            {/* Đổi link tiêu đề thành productLink */}
            <Link to={productLink}>
              {/* 🎯 HỆ THỐNG PHÂN CẤP HEADING: Tên sản phẩm ở trang chủ đặt thẻ H3 là chuẩn SEO */}
              <h3 className="text-gray-800 font-semibold text-base line-clamp-2 hover:text-blue-600 transition-colors h-12 overflow-hidden mb-2">
                {item.name}
              </h3>
            </Link>
          </div>

          <div className="mt-3 flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-black text-xl">
                {item.price.toLocaleString()} <span className="text-sm underline">đ</span>
              </span>
              <span className="text-[11px] text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">Freeship</span>
            </div>

            {/* 🎯 NÚT MUA NGAY SIÊU TỐC THAY THẾ CHO ICON GIỎ HÀNG CŨ */}
            <button
              onClick={(e) => this.handleQuickBuy(e, item)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl transition-all duration-300 shadow-md shadow-blue-100 transform active:scale-95 tracking-wider uppercase"
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

    // Lưu ý: Sửa đường dẫn xem tất cả từ "/products" sang "/product/all" để khớp với Route mới tạo ở MainComponent
    const allProductsLink = "/product/all";

    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

          <Helmet>
            <title>KSHOP - Điện thoại, Máy tính & Phụ kiện chính hãng</title>
            <meta name="description" content="Hệ thống bán lẻ thiết bị công nghệ, linh kiện máy tính, build PC gaming đồ họa uy tín, giá tốt nhất thị trường tại KSHOP." />
          </Helmet>

          {/* 🎯 ĐỘC NHẤT H1 CHO TRANG CHỦ: Class "sr-only" giúp ẩn text khỏi màn hình nhưng Google Bot vẫn quét được 100% */}
          <h1 className="sr-only">KSHOP - Siêu thị Thiết bị Công nghệ, Điện thoại & Linh kiện PC chính hãng</h1>

          {/* 🎯 KHỐI CTA DỮ LIỆU LIÊN KẾT NỘI BỘ (INTERNAL LINKING) DANH MỤC NỔI BẬT */}
          {/* 🎯 KHỐI CTA DANH MỤC NỔI BẬT ĐÃ ĐƯỢC PHÓNG TO & TỐI ƯU UX */}
          <section className="mb-12 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-base font-black text-gray-400 uppercase tracking-wider mb-6">
              Danh mục công nghệ nổi bật
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Ý 1: TIN CÔNG NGHỆ */}
              <Link to="/blog" className="flex items-center space-x-4 p-5 bg-slate-50 hover:bg-blue-50 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md group">
                <span className="text-4xl filter drop-shadow">📰</span>
                <div>
                  <h3 className="text-sm font-black text-gray-800 group-hover:text-blue-600 uppercase tracking-wide">Tin Công Nghệ</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Kiến thức & xu hướng</p>
                </div>
              </Link>

              {/* Ý 2: HI-END PC */}
              <Link to={allProductsLink} className="flex items-center space-x-4 p-5 bg-slate-50 hover:bg-blue-50 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md group">
                <span className="text-4xl filter drop-shadow">💻</span>
                <div>
                  <h3 className="text-sm font-black text-gray-800 group-hover:text-blue-600 uppercase tracking-wide">Hi-End PC</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Build theo yêu cầu</p>
                </div>
              </Link>

              {/* Ý 3: GAMING GEAR */}
              <Link to={allProductsLink} className="flex items-center space-x-4 p-5 bg-slate-50 hover:bg-blue-50 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md group">
                <span className="text-4xl filter drop-shadow">🕹️</span>
                <div>
                  <h3 className="text-sm font-black text-gray-800 group-hover:text-blue-600 uppercase tracking-wide">Gaming Gear</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Phụ kiện đỉnh cao</p>
                </div>
              </Link>

              {/* Ý 4: TRẢ GÓP 0% */}
              <div className="flex items-center space-x-4 p-5 bg-slate-50 rounded-2xl border border-transparent shadow-sm">
                <span className="text-4xl filter drop-shadow">🛡️</span>
                <div>
                  <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">Trả Góp 0%</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Thủ tục siêu tốc</p>
                </div>
              </div>

            </div>
          </section>

          {/* Section: NEW PRODUCTS */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8 border-l-4 border-blue-600 pl-4">
              {/* Sửa tiêu đề khối thành H2 */}
              <h2 className="text-2xl font-black text-gray-950 uppercase tracking-tight">SẢN PHẨM MỚI ĐỔ BỘ</h2>
              <Link to={allProductsLink} className="text-blue-600 hover:underline font-bold text-xs">Xem tất cả →</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {newprods}
            </div>
          </section>

          {/* Section: HOT PRODUCTS */}
          {this.state.hotprods.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-8 border-l-4 border-red-600 pl-4">
                {/* Sửa tiêu đề khối thành H2 */}
                <h2 className="text-2xl font-black text-gray-950 uppercase tracking-tight">XU HƯỚNG MUA SẮM HOT</h2>
                <Link to={allProductsLink} className="text-red-600 hover:underline font-bold text-xs">Bán chạy nhất →</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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