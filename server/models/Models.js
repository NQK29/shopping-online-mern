const mongoose = require('mongoose');

// 1. Admin Schema
const AdminSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
  },
  { versionKey: false }
);

// 2. Category Schema (Đã bổ sung slug để đồng bộ SEO)
const CategorySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    slug: { type: String, index: true }, 
  },
  { versionKey: false }
);

// 3. Customer Schema
const CustomerSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    name: String,
    phone: String,
    email: String,
    active: Number,
    token: String,
  },
  { versionKey: false }
);

// 4. Product Schema
const ProductSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    slug: { type: String, index: true }, 
    price: Number,
    image: String,
    cdate: Number,
    category: CategorySchema,
    quantity: { type: Number, default: 0 },
  },
  { versionKey: false }
);

ProductSchema.index({ name: 'text' });

// 5. Item Schema (Sử dụng trong Order)
const ItemSchema = mongoose.Schema(
  {
    product: ProductSchema,
    quantity: Number,
  },
  {
    versionKey: false,
    _id: false,
  }
);

// 6. Order Schema
const OrderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    cdate: Number,
    total: Number,
    status: String,
    customer: CustomerSchema,
    items: [ItemSchema],
  },
  { versionKey: false }
);

// 7. 🔥 BLOG SCHEMA (Bổ sung mới để làm trang Tin Tức / Blog chuẩn SEO)
const BlogSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,                     // Tiêu đề bài viết (ví dụ: Top 5 chuột gaming giá rẻ)
    slug: { type: String, index: true }, // Đường dẫn bài viết dạng chữ không dấu (top-5-chuot-gaming-gia-re)
    summary: String,                   // Đoạn tóm tắt ngắn hiển thị ở danh sách bài viết
    content: String,                   // Nội dung chi tiết bài viết (chứa text, HTML để chèn link sản phẩm)
    image: String,                     // Ảnh đại diện bài viết (Base64 tương tự Product)
    cdate: Number,                     // Ngày đăng bài viết (timestamp)
  },
  { versionKey: false }
);

// Models
const Admin = mongoose.model('Admin', AdminSchema);
const Category = mongoose.model('Category', CategorySchema);
const Customer = mongoose.model('Customer', CustomerSchema);
const Product = mongoose.model('Product', ProductSchema);
const Order = mongoose.model('Order', OrderSchema);
const Blog = mongoose.model('Blog', BlogSchema); // Định nghĩa Model Blog

module.exports = {
  Admin,
  Category,
  Customer,
  Product,
  Order,
  Blog, // Xuất bản Model Blog ra ngoài hệ thống
};