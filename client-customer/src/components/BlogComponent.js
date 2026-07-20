import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { Helmet } from 'react-helmet';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],      // Lưu danh sách bài viết
      blog: null      // Lưu chi tiết bài viết đang đọc
    };
  }

  render() {
    const params = this.props.params;

    // Khai báo các biến chứa tiêu đề và nội dung động để quản lý tập trung
    let pageTitle = "Tin Công Nghệ & Thủ Thuật PC Mới Nhất | KSHOP";
    let pageDescription = "Kênh tổng hợp tin tức công nghệ, đánh giá phần cứng máy tính, kinh nghiệm build PC chính xác và chuyên sâu nhất tại KSHOP.";
    let mainContent = null;

    // 🔴 TRƯỜNG HỢP 1: HIỂN THỊ CHI TIẾT BÀI VIẾT VÌ CÓ PARAM :SLUG TRÊN URL
    if (params.slug) {
      const item = this.state.blog;
      if (item) {
        // Cập nhật tiêu đề động dựa theo bài viết thật
        pageTitle = `${item.title} | Tin Công Nghệ KSHOP`;
        pageDescription = item.summary;

        mainContent = (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* 🎯 BREADCRUMB CHUẨN SEO: Đưa tên bài viết thật trở lại, ép cứng trên 1 dòng bằng truncate để không bao giờ bị nhảy dòng */}
            <nav className="text-sm text-gray-500 mb-6 font-semibold flex items-center bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm" aria-label="Breadcrumb">
              <Link to="/home" className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0">Trang chủ</Link>
              <span className="text-gray-300 mx-1.5">/</span>
              <Link to="/blog" className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0">Tin công nghệ</Link>
              <span className="text-gray-300 mx-1.5">/</span>
              <span className="text-blue-600 font-bold bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 truncate max-w-[300px] md:max-w-[500px]" title={item.title}>
                {item.title}
              </span>
            </nav>

            <article className="bg-white rounded-3xl shadow-xl p-8 md:p-14 border border-gray-100">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4 inline-block bg-blue-50/70 border border-blue-100 rounded-lg px-3 py-1">
                📅 Đăng ngày: {new Date(item.cdate).toLocaleDateString('vi-VN')}
              </p>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                {item.title}
              </h1>

              {item.image && (
                <div className="overflow-hidden rounded-2xl mb-8 border border-gray-100 shadow-sm max-h-[500px] w-full">
                  <img
                    src={"data:image/jpg;base64," + item.image}
                    alt={`Hình ảnh bài viết: ${item.title}`}
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}

              <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border-l-4 border-blue-600 mb-10 shadow-inner">
                {item.summary}
              </p>

              {/* 🎯 TỐI ƯU TYPOGRAPHY: Loại bỏ md:prose-lg, đồng bộ cỡ chữ text-base (16px) cho cả đoạn văn và bảng biểu */}
              {(() => {
                const finalContent = item.image
                  ? item.content.replace(/\[MAIN_IMAGE\]/g, `<img src="data:image/jpg;base64,${item.image}" alt="${item.title}" class="w-full rounded-2xl shadow-md my-8 border border-gray-100 object-cover max-h-[500px]" />`)
                  : item.content;

                return (
                  <div
                    className="prose prose-slate max-w-none text-gray-700 text-base leading-relaxed
                               prose-p:my-5 prose-p:text-slate-600 prose-p:leading-loose prose-p:text-base
                               prose-headings:text-gray-900 prose-headings:font-black prose-headings:tracking-tight
                               prose-h2:text-xl md:text-2xl prose-h2:border-l-4 prose-h2:border-blue-600 prose-h2:pl-4 prose-h2:mt-10 prose-h2:mb-5
                               prose-h3:text-lg md:text-xl prose-h3:mt-8 prose-h3:mb-4
                               prose-a:text-blue-600 prose-a:font-extrabold hover:prose-a:underline
                               prose-table:w-full prose-table:my-8 prose-table:border prose-table:border-gray-200 prose-table:text-base
                               prose-th:bg-slate-50/80 prose-th:p-4 prose-th:font-bold prose-th:text-gray-900 prose-th:border
                               prose-td:p-4 prose-td:text-slate-600 prose-td:border font-normal"
                    dangerouslySetInnerHTML={{ __html: finalContent }}
                  />
                );
              })()}
            </article>
            <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white text-center shadow-xl shadow-indigo-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left max-w-md">
                <h4 className="text-xl font-black mb-1">Tìm kiếm thiết bị nâng cấp góc máy?</h4>
                <p className="text-xs text-indigo-100 leading-relaxed">Tất cả linh kiện phần cứng, phụ kiện Gaming xuất hiện trong bài viết đều đang sẵn hàng chính hãng 100% với ưu đãi trả góp 0% tại KSHOP.</p>
              </div>
              <Link
                to="/home"
                className="whitespace-nowrap bg-white text-indigo-600 hover:bg-indigo-50 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all transform active:scale-95 inline-flex items-center space-x-2"
              >
                <span>XEM KHUYẾN MÃI NGAY</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        );
      } else {
        mainContent = <div className="text-center py-20 text-gray-400">Đang tải nội dung bài viết...</div>;
      }
    } else {
      // 🟢 TRƯỜNG HỢP 2: HIỂN THỊ DANH SÁCH TOÀN BỘ BÀI VIẾT BLOG (/blog)
      const blogItems = this.state.blogs.map((item) => {
        return (
          <div key={item._id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {item.image && (
              <Link to={'/blog/' + item.slug} className="block overflow-hidden h-48 bg-gray-100">
                <img
                  src={"data:image/jpg;base64," + item.image}
                  alt={`Bản tin công nghệ: ${item.title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-bold text-blue-600 mb-2 block">
                {new Date(item.cdate).toLocaleDateString('vi-VN')}
              </span>

              {/* 🎯 NÂNG CẤP LÊN H2: Các tiêu đề bài viết con trong danh sách lưới bọc trong thẻ h2 là chuẩn quy tắc cấu trúc cây SEO */}
              <h2 className="text-lg font-black text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                <Link to={'/blog/' + item.slug}>{item.title}</Link>
              </h2>

              <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow leading-relaxed">
                {item.summary}
              </p>
              <Link
                to={'/blog/' + item.slug}
                className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 space-x-1 mt-auto"
              >
                <span>Đọc bài viết</span>
                <svg xmlns="http://www.w3.org/2000/xl" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        );
      });

      mainContent = (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {/* Thẻ H1 duy nhất làm tiêu đề lớn của trang */}
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase mb-3">
              TIN CÔNG NGHỆ
            </h1>

            {/* 🎯 TỐI ƯU THEO YÊU CẦU: Không dùng thẻ Heading cho dòng mô tả phụ, tăng cỡ chữ to lên text-base và làm nổi font-medium */}
            <p className="text-base font-medium text-gray-600 leading-relaxed">
              Cập nhật xu hướng phần cứng máy tính và kiến thức build PC mới nhất hàng ngày.
            </p>
          </div>

          {this.state.blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogItems}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100 shadow-sm">
              📭 Hiện tại chưa có bài viết nào được xuất bản.
            </div>
          )}
        </div>
      );
    }

    // 🎯 ĐẦU RA DUY NHẤT: Đảm bảo Helmet luôn bắt được đúng sự thay đổi ở gốc cây thư mục DOM
    return (
      <main className="bg-gray-50 min-h-screen py-12">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
        </Helmet>

        {mainContent}
      </main>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.slug) {
      this.apiGetBlogDetail(params.slug);
    } else {
      this.apiGetBlogs();
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.slug !== prevProps.params.slug) {
      if (params.slug) {
        this.setState({ blog: null }, () => {
          this.apiGetBlogDetail(params.slug);
        });
      } else {
        this.setState({ blog: null }, () => {
          this.apiGetBlogs();
        });
      }
    }
  }

  apiGetBlogs() {
    axios.get('/api/customer/blogs').then((res) => {
      this.setState({ blogs: res.data });
      // 🚀 ÉP TIÊU ĐỀ TRÌNH DUYỆT BẰNG JAVASCRIPT THUẦN KHI VÀO TRANG DANH SÁCH BLOG
      window.document.title = "Tin Công Nghệ & Thủ Thuật PC Mới Nhất | KSHOP";
    });
  }

  apiGetBlogDetail(slug) {
    axios.get('/api/customer/blogs/' + slug).then((res) => {
      this.setState({ blog: res.data });
      if (res.data) {
        // 🚀 ÉP TIÊU ĐỀ TRÌNH DUYỆT BẰNG JAVASCRIPT THUẦN THEO TÊN BÀI VIẾT THẬT
        window.document.title = res.data.title + " | Tin Công Nghệ KSHOP";
      }
    });
  }
}

export default withRouter(Blog);