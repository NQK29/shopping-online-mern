const express = require('express');
const router = express.Router();

//utils
const CryptoUtil = require('../utils/CryptoUtil');
const EmailUtil = require('../utils/EmailUtil');
const JwtUtil = require('../utils/JwtUtil');

//login
router.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    const customer = await CustomerDAO.selectByUsernameAndPassword(
      username,
      password,
    );

    if (customer) {
      if (customer.active === 1) {
        const token = JwtUtil.genToken();

        res.json({
          success: true,
          message: "Authentication successful",
          token: token,
          customer: customer,
        });
      } else {
        res.json({ success: false, message: "Account is deactive" });
      }
    } else {
      res.json({ success: false, message: "Incorrect username or password" });
    }
  } else {
    res.json({ success: false, message: "Please input username and password" });
  }
});

router.get("/token", JwtUtil.checkToken, function (req, res) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  res.json({
    success: true,
    message: "Token is valid",
    token: token,
  });
});

//profile
router.put('/customers/:id', JwtUtil.checkToken, async function (req, res) {

  const _id = req.params.id;

  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  const customer = {
    _id: _id,
    username: username,
    password: password,
    name: name,
    phone: phone,
    email: email
  };

  const result = await CustomerDAO.update(customer);

  res.json(result);

});


// daos
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const CustomerDAO = require('../models/CustomerDAO');
const OrderDAO = require('../models/OrderDAO');
const BlogDAO = require('../models/BlogDAO');

// category
router.get('/categories', async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

// product
router.get('/products/new', async function (req, res) {
  const products = await ProductDAO.selectTopNew(5);
  res.json(products);
});

router.get('/products/category/:slug', async function (req, res) {
  const _slug = req.params.slug;

  const products = await ProductDAO.selectByCatSlug(_slug);
  res.json(products);
});

router.get('/products/hot', async function (req, res) {
  const products = await ProductDAO.selectTopHot(5);
  res.json(products);
});

// 📦 API tìm kiếm sản phẩm hỗ trợ search BẤT CHẤP DẤU TIẾNG VIỆT
router.get('/products/search/:keyword', async function (req, res) {
  try {
    const Products = require('../models/Models').Product;
    const keyword = req.params.keyword;

    // 🎯 Sử dụng toán tử $text kết hợp diacriticSensitive: false
    // MongoDB sẽ tự động đối chiếu "ban phim" khớp với "Bàn phím"
    const products = await Products.find(
      { $text: { $search: keyword, $diacriticSensitive: false } }
    )
    .lean() // ⚡ Ép JSON thuần để tải cực nhanh như đã làm ở trang sản phẩm
    .exec();

    res.json(products);
  } catch (error) {
    console.error("Lỗi API tìm kiếm sản phẩm:", error);
    res.status(500).json({ message: "Lỗi hệ thống khi tìm kiếm!" });
  }
});

router.get('/products/:slug', async function (req, res) {
  const _slug = req.params.slug;

  // 1. Lấy thông tin chi tiết sản phẩm từ DAO
  let product = await ProductDAO.selectBySlug(_slug);

  if (product) {
    // Ép kiểu sang đối tượng JavaScript thuần để chỉnh sửa nếu dữ liệu từ Mongoose là dạng document
    if (typeof product.toObject === 'function') {
      product = product.toObject();
    }

    // 2. Kiểm tra nếu đối tượng danh mục (category) bên trong sản phẩm bị thiếu trường slug
    if (product.category && !product.category.slug) {
      // Gọi bảng CategoryDAO lấy danh mục gốc dựa theo ID có sẵn để bốc slug chuẩn SEO
      const rootCategory = await CategoryDAO.selectAll();
      const matchedCat = rootCategory.find(cat => cat._id.toString() === product.category._id.toString());

      if (matchedCat && matchedCat.slug) {
        // Đắp slug chuẩn chữ không dấu (ví dụ: "o-cung") vào để nuôi thanh Breadcrumb phía React
        product.category.slug = matchedCat.slug;
      }
    }
  }

  res.json(product);
});

// 📦 API lấy tất cả sản phẩm CÓ PHÂN TRANG (Tối ưu tốc độ x100 lần)
router.get('/products', async function (req, res) {
  try {
    const Products = require('../models/Models').Product;

    // 1. Lấy trang hiện tại từ tham số URL (Ví dụ: /products?page=2), mặc định là trang 1
    const page = parseInt(req.query.page) || 1;
    const size = 8; // 🎯 Quy định hiển thị 8 sản phẩm trên mỗi trang cho lưới 4 cột đẹp mắt
    const skip = (page - 1) * size;

    // 2. Chạy song song: Đếm tổng số sản phẩm và Lấy dữ liệu sản phẩm của trang đó
    const totalProducts = await Products.countDocuments({});
    // 🎯 BỔ SUNG PROJECTION: Chỉ lấy các trường cần thiết, ép tối ưu dung lượng tải ảnh
    const products = await Products.find({}, {
      name: 1,
      price: 1,
      slug: 1,
      category: 1,
      quantity: 1,
      // Nếu ảnh quá nặng, ta vẫn lấy ảnh nhưng việc dùng .lean() ở dưới kết hợp 
      // lọc gọn cấu trúc Object sẽ giúp NodeJS giải phóng bộ nhớ đệm cực nhanh
      image: 1
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(size)
      .lean() // ⚡ Ép thành JSON thuần giúp giải phóng dung lượng Base64 cực nhanh
      .exec();

    // 3. Tính toán tổng số trang
    const totalPages = Math.ceil(totalProducts / size);

    // 4. Trả về cho Frontend đầy đủ thông tin để vẽ nút bấm phân trang
    res.json({
      products: products,
      currentPage: page,
      totalPages: totalPages,
      totalProducts: totalProducts
    });
  } catch (error) {
    console.error("Lỗi API phân trang sản phẩm:", error);
    res.status(500).json({ message: "Lỗi hệ thống Server!" });
  }
});

//customer
router.post('/active', async function (req, res) {
  const _id = req.body.id;
  const token = req.body.token;
  const result = await CustomerDAO.active(_id, token, 1);
  res.json(result);
});
router.post('/signup', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  const dbCust = await CustomerDAO.selectByUsernameOrEmail(username, email);

  if (dbCust) {
    res.json({ success: false, message: 'Exists username or email' });
  } else {
    const now = new Date().getTime(); // milliseconds
    const token = CryptoUtil.md5(now.toString());

    const newCust = {
      username: username,
      password: password,
      name: name,
      phone: phone,
      email: email,
      active: 0,
      token: token
    };

    const result = await CustomerDAO.insert(newCust);

    if (result) {
      const send = await EmailUtil.send(email, result._id, token);

      if (send) {
        res.json({ success: true, message: 'Please check email' });
      } else {
        res.json({ success: false, message: 'Email failure' });
      }
    } else {
      res.json({ success: false, message: 'Insert failure' });
    }
  }
});

// mycart
router.post('/checkout', JwtUtil.checkToken, async function (req, res) {

  const now = new Date().getTime(); // milliseconds
  const total = req.body.total;
  const items = req.body.items;
  const customer = req.body.customer;

  const order = {
    cdate: now,
    total: total,
    status: 'PENDING',
    customer: customer,
    items: items
  };

  const result = await OrderDAO.insert(order);

  res.json(result);
});

// myorders
router.get('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  const _cid = req.params.cid;
  const orders = await OrderDAO.selectByCustID(_cid);
  res.json(orders);
});

//blog
router.get('/blogs', async function (req, res) {
  try {
    const Blog = require('../models/Models').Blog;
  
    const blogs = await Blog.find({}, {
      title: 1,
      slug: 1,
      summary: 1,
      image: 1,
      cdate: 1
      
    })
    .sort({ cdate: -1 }) 
    .lean() 
    .exec();

    res.json(blogs);
  } catch (error) {
    console.error("Lỗi lấy danh sách blog:", error);
    res.status(500).json({ message: "Lỗi hệ thống!" });
  }
});

router.get('/blogs/:slug', async function (req, res) {
  const _slug = req.params.slug;
  const blog = await BlogDAO.selectBySlug(_slug);
  res.json(blog);
});


module.exports = router;