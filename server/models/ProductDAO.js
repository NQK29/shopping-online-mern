require("../utils/MongooseUtil");
const Models = require("./Models");
const mongoose = require("mongoose");

const ProductDAO = {
  // Lấy tổng số lượng sản phẩm (phục vụ phân trang)
  async selectByCount() {
    const query = {};
    const noProducts = await Models.Product.countDocuments(query).exec();
    return noProducts;
  },

  // Lấy danh sách sản phẩm theo trang
  async selectBySkipLimit(skip, limit) {
    const products = await Models.Product.find({})
      .skip(skip)
      .limit(limit)
      .exec();
    return products;
  },

  // Thêm sản phẩm mới
  async insert(product) {
    product._id = new mongoose.Types.ObjectId();
    const result = await Models.Product.create(product);
    return result;
  },

  // Lấy chi tiết 1 sản phẩm theo ID
  async selectByID(_id) {
    const product = await Models.Product.findById(_id).exec();
    return product;
  },

  // Cập nhật thông tin sản phẩm (Bao gồm số lượng quantity)
  async update(product) {
    const newvalues = {
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: isNaN(parseInt(product.quantity)) ? 0 : parseInt(product.quantity),
    };

    const result = await Models.Product.findByIdAndUpdate(
      product._id,
      newvalues,
      { new: true },
    );
    return result;
  },

  // Xóa sản phẩm
  async delete(_id) {  
    const result = await Models.Product.findByIdAndDelete(_id);
    return result;
  },

  // Lấy các sản phẩm mới nhất
  async selectTopNew(top) {
    const query = {};
    const mysort = { cdate: -1 }; 
    const products = await Models.Product.find(query).sort(mysort).limit(top).exec();
    return products;
  },

  // Lấy các sản phẩm bán chạy (dựa trên các đơn hàng APPROVED)
  async selectTopHot(top) {
    const items = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.product._id', sum: { $sum: '$items.quantity' } } },
      { $sort: { sum: -1 } },
      { $limit: top }
    ]).exec();

    var products = [];
    for (const item of items) {
      const product = await this.selectByID(item._id); // Dùng this để gọi hàm trong cùng object
      if (product) products.push(product);
    }
    return products;
  },

  // Lấy sản phẩm theo danh mục
  async selectByCatID(_cid) {
    const query = { 'category._id': _cid };
    const products = await Models.Product.find(query).exec();
    return products;
  },
  
  // Tìm kiếm sản phẩm theo từ khóa
  async selectByKeyword(keyword) {
    const query = { name: { $regex: new RegExp(keyword, 'i') } };
    const products = await Models.Product.find(query).exec();
    return products;
  },

  // HÀM QUAN TRỌNG: Trừ kho khi khách đặt hàng thành công
  async updateQuantity(_id, quantityBought) {
    const result = await Models.Product.findByIdAndUpdate(
      _id,
      { $inc: { quantity: -quantityBought } },
      { new: true }
    );
    return result;
  },
};

module.exports = ProductDAO;