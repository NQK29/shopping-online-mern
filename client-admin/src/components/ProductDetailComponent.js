import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class ProductDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: "",
      txtName: "",
      txtPrice: 0,
      txtQuantity: 0, 
      cmbCategory: "",
      imgProduct: "",
    };
  }

  render() {
    const cates = this.state.categories.map((cate) => {
      return (
        <option key={cate._id} value={cate._id}>
          {cate.name}
        </option>
      );
    });

    return (
      <div className="space-y-6">
        <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">
            {this.state.txtID ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
          </h2>
          {this.state.txtID && (
            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-mono text-slate-500">
              ID: {this.state.txtID.slice(-6)}
            </span>
          )}
        </div>

        <form className="space-y-4">
          {/* Vùng chọn ảnh */}
          <div className="flex justify-center">
            <div className="relative group w-full aspect-square max-w-[180px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
              {this.state.imgProduct ? (
                <img src={this.state.imgProduct} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-slate-300 text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-[10px] font-bold uppercase">Chưa có ảnh</p>
                </div>
              )}
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <span className="text-white text-xs font-bold uppercase">Thay đổi ảnh</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => this.previewImage(e)} />
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest italic font-sans">Tên sản phẩm *</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                value={this.state.txtName}
                onChange={(e) => this.setState({ txtName: e.target.value })}
                placeholder="Ví dụ: iPhone 15 Pro..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest italic font-sans">Giá bán</label>
                <input
                  type="number"
                  min="0"
                  className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-indigo-600 outline-none"
                  value={this.state.txtPrice}
                  onChange={(e) => this.setState({ txtPrice: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest italic font-sans">Tồn kho</label>
                <input
                  type="number"
                  min="0"
                  className="w-full mt-1 px-4 py-2.5 bg-white border-2 border-indigo-100 rounded-xl text-sm font-black text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={this.state.txtQuantity}
                  onChange={(e) => this.setState({ txtQuantity: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest italic font-sans">Danh mục</label>
              <select
                className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                value={this.state.cmbCategory}
                onChange={(e) => this.setState({ cmbCategory: e.target.value })}
              >
                <option value="" disabled>Chọn danh mục...</option>
                {cates}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-4 border-t border-gray-50">
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95 text-xs uppercase"
              onClick={(e) => this.btnAddClick(e)}
            >
              Thêm mới sản phẩm
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 text-xs uppercase disabled:opacity-50"
                disabled={!this.state.txtID}
                onClick={(e) => this.btnUpdateClick(e)}
              >
                Cập nhật
              </button>
              <button
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95 text-xs uppercase disabled:opacity-50"
                disabled={!this.state.txtID}
                onClick={(e) => this.btnDeleteClick(e)}
              >
                Xóa bỏ
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // LOGIC SỬA LỖI ĐỂ TRÁNH TRUYỀN GIÁ TRỊ NaN VÀO BACKEND

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item && this.props.item !== null) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        // Nếu quantity không tồn tại hoặc null thì ép về 0 để tránh NaN
        txtQuantity: this.props.item.quantity || 0, 
        cmbCategory: this.props.item.category._id,
        imgProduct: "data:image/jpg;base64," + this.props.item.image,
      });
    }
  }

  btnAddClick(e) {
    e.preventDefault();
    const { txtName, txtPrice, txtQuantity, cmbCategory, imgProduct } = this.state;
    const image = imgProduct.replace(/^data:image\/[a-z]+;base64,/, "");

    // SỬA LỖI NaN TẠI ĐÂY:
    const quantity = parseInt(txtQuantity);
    const finalQuantity = isNaN(quantity) ? 0 : quantity;

    if (txtName && txtPrice && cmbCategory && image) {
      this.apiPostProduct({ 
        name: txtName, 
        price: parseInt(txtPrice), 
        quantity: finalQuantity, 
        category: cmbCategory, 
        image: image 
      });
    } else {
      alert("Vui lòng nhập đầy đủ thông tin và chọn ảnh!");
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const { txtID, txtName, txtPrice, txtQuantity, cmbCategory, imgProduct } = this.state;
    const image = imgProduct.replace(/^data:image\/[a-z]+;base64,/, "");

    // SỬA LỖI NaN TẠI ĐÂY:
    const quantity = parseInt(txtQuantity);
    const finalQuantity = isNaN(quantity) ? 0 : quantity;

    if (txtID && txtName && txtPrice && cmbCategory && image) {
      this.apiPutProduct(txtID, { 
        name: txtName, 
        price: parseInt(txtPrice), 
        quantity: finalQuantity, 
        category: cmbCategory, 
        image: image 
      });
    } else {
        alert("Thông tin không hợp lệ!");
    }
  }

  // Các hàm API giữ nguyên
  componentDidMount() { this.apiGetCategories(); }
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => { this.setState({ imgProduct: evt.target.result }); };
      reader.readAsDataURL(file);
    }
  }
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm("ARE YOU SURE?")) { if (this.state.txtID) this.apiDeleteProduct(this.state.txtID); }
  }
  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/categories", config).then((res) => { this.setState({ categories: res.data }); });
  }
  apiPostProduct(prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.post("/api/admin/products", prod, config).then((res) => {
      if (res.data) { alert("SUCCESS!"); this.apiGetProducts(); }
    });
  }
  apiDeleteProduct(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.delete("/api/admin/products/" + id, config).then((res) => {
      if (res.data) { alert("SUCCESS!"); this.apiGetProducts(); }
    });
  }
  apiPutProduct(id, prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/admin/products/" + id, prod, config).then((res) => {
      if (res.data) { alert("SUCCESS!"); this.apiGetProducts(); }
    });
  }
  apiGetProducts() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/products?page=" + this.props.curPage, config).then((res) => {
      const result = res.data;
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages, result.curPage);
      } else if (this.props.curPage > 1) {
        axios.get("/api/admin/products?page=" + (this.props.curPage - 1), config).then((res) => {
          this.props.updateProducts(res.data.products, res.data.noPages, res.data.curPage);
        });
      }
    });
  }
}
export default ProductDetail;