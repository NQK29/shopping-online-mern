import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class Product extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: true,
      currentPage: 1,
      totalPages: 1,
      sortType: 'default'
    };
  }

  // ⚡ HÀM XỬ LÝ MUA NGAY SIÊU TỐC CHO TRANG DANH SÁCH / TẤT CẢ SẢN PHẨM
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
    this.props.navigate('/mycart'); // 🚀 Đưa thẳng người dùng về giỏ hàng để hoàn tất thanh toán
  }

  // ⚡ Hàm xử lý sắp xếp sản phẩm trực tiếp ở Frontend
  handleSortChange(e) {
    const sortValue = e.target.value;
    let sortedProducts = [...this.state.products];

    if (sortValue === 'priceAsc') {
      // Sắp xếp giá thấp đến cao
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'priceDesc') {
      // Sắp xếp giá cao đến thấp
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      // Mặc định (Mới nhất) -> Xếp theo ID/Thời gian giảm dần
      sortedProducts.sort((a, b) => b._id.localeCompare(a._id));
    }

    this.setState({
      products: sortedProducts,
      sortType: sortValue
    });
  }

  render() {
    const { params } = this.props;
    // 🎨 LOGIC TẠO GIAO DIỆN NÚT BẤM PHÂN TRANG
    const paginationLinks = [];
    for (let i = 1; i <= this.state.totalPages; i++) {
      const isActive = i === this.state.currentPage;
      paginationLinks.push(
        <button
          key={i}
          onClick={() => this.apiGetAllProducts(i)}
          className={`mx-1 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive
            ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
        >
          {i}
        </button>
      );
    }

    const title = params.keyword
      ? `Kết quả tìm kiếm cho: "${params.keyword}"`
      : "DANH SÁCH SẢN PHẨM";

    const prods = this.state.products.map((item) => {
      const productLink = `/product/${item.slug || item._id}`;

      return (
        <div key={item._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative flex flex-col h-full">
          {/* Sửa link bọc ảnh */}
          <Link to={productLink} className="block overflow-hidden bg-gray-50 flex-shrink-0">
            <img
              src={"data:image/jpg;base64," + item.image}
              alt={`Mua trực tuyến sản phẩm: ${item.name} chính hãng giá tốt tại KSHOP`} // 👈 TỐI ƯU THẺ ALT CHỨA TỪ KHÓA ĐỘNG CHO TỪNG SẢN PHẨM
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </Link>

          {/* Áp dụng cấu hình flex layout để giữ khoảng cách nút luôn bằng nhau dưới đáy */}
          <div className="p-5 text-left flex flex-col flex-grow justify-between">
            <div>
              {/* Sửa link tiêu đề */}
              <Link to={productLink}>
                {/* 🎯 PHÂN CẤP TIÊU ĐỀ: Tên sản phẩm trong danh sách lưới bọc trong H3 là chuẩn quy tắc cấu trúc cây SEO */}
                <h3 className="text-gray-800 font-bold text-base line-clamp-2 hover:text-blue-600 transition-colors h-12 overflow-hidden mb-2">
                  {item.name}
                </h3>
              </Link>
            </div>

            <div className="mt-3 flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold mb-0.5">Giá bán</p>
                  <span className="text-blue-600 font-black text-xl">
                    {item.price.toLocaleString()} <span className="text-sm underline italic">đ</span>
                  </span>
                </div>
                <span className="text-[10px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded border border-green-100">Còn hàng</span>
              </div>

              {/* 🎯 NÚT MUA NGAY ĐỒNG BỘ TOÀN HỆ THỐNG */}
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
    });

    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0 border-b border-gray-200 pb-6">
            <div>
              {/* 🎯 NÂNG CẤP LÊN H1: Tên danh mục/Từ khóa tìm kiếm phải là duy nhất và nằm trong H1 ở trang danh sách này */}
              <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
                {title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Tìm thấy {this.state.products.length} sản phẩm phù hợp</p>
            </div>

            {/* Bộ lọc đơn giản (UI) */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Sắp xếp:</span>
              <select
                value={this.state.sortType}
                onChange={(e) => this.handleSortChange(e)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
              >
                <option value="default">Mới nhất</option>
                <option value="priceAsc">Giá thấp đến cao</option>
                <option value="priceDesc">Giá cao đến thấp</option>
              </select>
            </div>
          </div>

          {/* Grid hiển thị sản phẩm */}
          {this.state.isLoading ? (
            // 1. Trạng thái đang tải dữ liệu từ API
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mb-4"></div>
              <p className="text-lg font-bold text-gray-500">KSHOP đang kết nối kho hàng, vui lòng đợi trong giây lát...</p>
            </div>
          ) : this.state.products.length > 0 ? (
            // Trạng thái tải xong và CÓ sản phẩm
            <div className="space-y-12">
              {/* Lưới sản phẩm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {prods}
              </div>

              {/* 🎯 THANH BẤM ĐIỀU HƯỚNG PHÂN TRANG CHUYÊN NGHIỆP */}
              {this.state.totalPages > 1 && (
                <div className="flex justify-center items-center pt-6 border-t border-gray-100">
                  <button
                    disabled={this.state.currentPage === 1}
                    onClick={() => this.apiGetAllProducts(this.state.currentPage - 1)}
                    className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 mr-2 text-sm font-bold"
                  >
                    ← Trước
                  </button>

                  {paginationLinks}

                  <button
                    disabled={this.state.currentPage === this.state.totalPages}
                    onClick={() => this.apiGetAllProducts(this.state.currentPage + 1)}
                    className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 ml-2 text-sm font-bold"
                  >
                    Sau →
                  </button>
                </div>
              )}
            </div>
          ) : (
            // 3. Trạng thái tải xong và THẬT SỰ KHÔNG CÓ sản phẩm nào
            <div className="text-center py-20 bg-white rounded-3xl shadow-inner border border-dashed border-gray-200">
              <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-xl font-bold text-gray-400">Rất tiếc, không tìm thấy sản phẩm nào!</p>
              <Link to="/home" className="mt-4 inline-block text-blue-600 font-bold hover:underline">Quay lại trang chủ</Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    const categoryParam = params.slug || params.cid || params.id;

    if (categoryParam) {
      this.apiGetProductsByCatSlug(categoryParam);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    } else {
      // 🎯 Nếu không có params nào, tức là người dùng đang ở trang /product/all
      this.apiGetAllProducts(1);
    }
  }

  componentDidUpdate(prevProps) {
    // 🎯 Kiểm tra sự thay đổi địa chỉ URL (pathname)
    if (this.props.location && prevProps.location && this.props.location.pathname !== prevProps.location.pathname) {
      const params = this.props.params;
      const categoryParam = params.slug || params.cid || params.id;

      if (categoryParam) {
        this.apiGetProductsByCatSlug(categoryParam);
      } else if (params.keyword) {
        this.apiGetProductsByKeyword(params.keyword);
      } else {
        // Trường hợp /product/all
        this.apiGetAllProducts(1);
      }
    }
  }

  apiGetProductsByCatSlug(slugOrId) {
    this.setState({ isLoading: true });
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slugOrId);

    const url = isObjectId
      ? '/api/customer/products/category/' + slugOrId
      : '/api/customer/products/category/' + slugOrId;

    axios.get(url).then((res) => {
      this.setState({ products: res.data, sortType: 'default', isLoading: false });

      if (res.data.length > 0) {
        const cateName = res.data[0].category.name;
        window.document.title = cateName.toUpperCase() + " | KSHOP";
      } else {
        window.document.title = "Sản phẩm | KSHOP";
      }
    });
  }

  apiGetProductsByKeyword(keyword) {
    this.setState({ isLoading: true });
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      this.setState({ products: res.data, sortType: 'default', isLoading: false });

      window.document.title = `Kết quả tìm kiếm cho "${keyword}" | KSHOP`;
    });
  }

  apiGetAllProducts(page = 1) {
    this.setState({ isLoading: true });

    // Gửi kèm query string ?page= sang cho Backend nhận diện
    axios.get(`/api/customer/products?page=${page}`).then((res) => {
      this.setState({
        products: res.data.products, // Lấy mảng sản phẩm ra
        totalPages: res.data.totalPages, // Lấy số trang
        currentPage: res.data.currentPage, // Lấy trang hiện tại
        sortType: 'default',
        isLoading: false
      });
      window.document.title = `TẤT CẢ SẢN PHẨM - TRANG ${res.data.currentPage} | KSHOP`;
    });
  }
}

export default withRouter(Product);