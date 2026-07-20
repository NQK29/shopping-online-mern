require("../utils/MongooseUtil");
const Models = require("./Models");

const BlogDAO = {
  // 📰 LẤY TẤT CẢ BÀI VIẾT (Sắp xếp bài mới nhất lên đầu)
  async selectAll() {
    const query = {};
    const blogs = await Models.Blog.find(query).sort({ cdate: -1 }).exec();
    return blogs;
  },

  // 🔍 LẤY CHI TIẾT BÀI VIẾT THEO SLUG CHUẨN SEO
  async selectBySlug(blogSlug) {
    const query = { slug: blogSlug };
    const blog = await Models.Blog.findOne(query).exec();
    return blog;
  },

  // ➕ THÊM BÀI VIẾT MỚI (Dành cho Admin)
  async insert(blog) {
    const mongoose = require("mongoose");
    blog._id = new mongoose.Types.ObjectId();
    const result = await Models.Blog.create(blog);
    return result;
  },

  // ✏️ CẬP NHẬT BÀI VIẾT (Dành cho Admin)
  async update(blog) {
    const newvalues = {
      title: blog.title,
      slug: blog.slug,
      summary: blog.summary,
      content: blog.content,
      image: blog.image,
    };
    const result = await Models.Blog.findByIdAndUpdate(
      blog._id,
      newvalues,
      { new: true }
    );
    return result;
  },

  // ❌ XÓA BÀI VIẾT (Dành cho Admin)
  async delete(_id) {
    const result = await Models.Blog.findByIdAndDelete(_id);
    return result;
  }
};

module.exports = BlogDAO;