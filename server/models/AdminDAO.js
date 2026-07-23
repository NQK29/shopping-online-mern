require('../utils/MongooseUtil');
const Models = require('./Models');

const AdminDAO = {
  // Hàm đăng nhập cũ của bạn
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    const admin = await Models.Admin.findOne(query);
    return admin;
  },

  // ⚡ HÀM MỚI: Tải số liệu thống kê Live cho Admin Dashboard
  async getDashboardStats() {
    // 1. Tính tổng doanh thu từ các đơn hàng đã APPROVED
    const revenueAggregate = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } }, // Thay 'APPROVED' nếu DB của bạn dùng từ khác (vd: 'COMPLETED')
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]).exec();
    
    const totalRevenue = revenueAggregate.length > 0 ? revenueAggregate[0].totalRevenue : 0;

    // 2. Đếm số đơn hàng mới đang chờ duyệt (PENDING)
    const newOrders = await Models.Order.countDocuments({ status: 'PENDING' }).exec();

    // 3. Đếm tổng số khách hàng đã đăng ký
    const totalCustomers = await Models.Customer.countDocuments({}).exec();

    // 4. Đếm tổng số sản phẩm hiện có trong kho
    const totalProducts = await Models.Product.countDocuments({}).exec();

    return {
      totalRevenue,
      newOrders,
      totalCustomers,
      totalProducts
    };
  }
};

module.exports = AdminDAO;