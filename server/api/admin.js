const express = require('express');
const router = express.Router();
const slugify = require('slugify');

// utils
const JwtUtil = require('../utils/JwtUtil');
const EmailUtil = require('../utils/EmailUtil');

// daos
const AdminDAO = require('../models/AdminDAO');
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const OrderDAO = require('../models/OrderDAO');
const CustomerDAO = require('../models/CustomerDAO');
const BlogDAO = require('../models/BlogDAO');

// login
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    const admin = await AdminDAO.selectByUsernameAndPassword(username, password);
    if (admin) {
      const token = JwtUtil.genToken(username, password);
      res.json({ success: true, message: 'Authentication successful', token: token });
    } else {
      res.json({ success: false, message: 'Incorrect username or password' });
    }
  } else {
    res.json({ success: false, message: 'Please input username and password' });
  }
});

// check token
router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  res.json({ success: true, message: 'Token is valid', token: token });
});

// category
router.get('/categories', JwtUtil.checkToken, async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});
router.post('/categories', JwtUtil.checkToken, async function (req, res) {
  const name = req.body.name;
  const generatedSlug = slugify(name, { lower: true, locale: 'vi' });
  const category = { name: name, slug: generatedSlug }; // Cập nhật slug cho đồng bộ
  const result = await CategoryDAO.insert(category);
  res.json(result);
});
router.put('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const generatedSlug = slugify(name, { lower: true, locale: 'vi' });
  const category = { _id: _id, name: name, slug: generatedSlug };
  const result = await CategoryDAO.update(category);
  res.json(result);
});
router.delete('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const result = await CategoryDAO.delete(_id);
  res.json(result);
});

// product
router.get('/products', JwtUtil.checkToken, async function (req, res) {
  const noProducts = await ProductDAO.selectByCount();
  const sizePage = 4;
  const noPages = Math.ceil(noProducts / sizePage);
  var curPage = 1;
  if (req.query.page) curPage = parseInt(req.query.page);
  const skip = (curPage - 1) * sizePage;
  const products = await ProductDAO.selectBySkipLimit(skip, sizePage);
  const result = { products: products, noPages: noPages, curPage: curPage };
  res.json(result);
});

router.post('/products', JwtUtil.checkToken, async function (req, res) {
  const name = req.body.name;
  const price = req.body.price;
  const cid = req.body.category;
  const image = req.body.image;
  const now = new Date().getTime();
  const generatedSlug = slugify(name, { lower: true, locale: 'vi' });

  const rawQuantity = req.body.quantity ? parseInt(req.body.quantity) : 0;
  const quantity = isNaN(rawQuantity) ? 0 : rawQuantity;

  const category = await CategoryDAO.selectByID(cid);
  const product = {
    name: name,
    slug: generatedSlug,
    price: price,
    image: image,
    cdate: now,
    category: category,
    quantity: quantity
  };

  const result = await ProductDAO.insert(product);
  res.json(result);
});

router.put('/products/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const price = req.body.price;
  const cid = req.body.category;
  const image = req.body.image;
  const now = new Date().getTime();
  const generatedSlug = slugify(name, { lower: true, locale: 'vi' });

  const rawQuantity = req.body.quantity ? parseInt(req.body.quantity) : 0;
  const quantity = isNaN(rawQuantity) ? 0 : rawQuantity;

  const category = await CategoryDAO.selectByID(cid);
  const product = {
    _id: _id,
    name: name,
    slug: generatedSlug,
    price: price,
    image: image,
    cdate: now,
    category: category,
    quantity: quantity
  };

  const result = await ProductDAO.update(product);
  res.json(result);
});

router.delete('/products/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const result = await ProductDAO.delete(_id);
  res.json(result);
});

// orders
router.get('/orders', JwtUtil.checkToken, async function (req, res) {
  const orders = await OrderDAO.selectAll();
  res.json(orders);
});
router.put('/orders/status/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const newStatus = req.body.status;
  const result = await OrderDAO.update(_id, newStatus);
  res.json(result);
});
router.get('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  const _cid = req.params.cid;
  const orders = await OrderDAO.selectByCustID(_cid);
  res.json(orders);
});

// customer
router.get('/customers', JwtUtil.checkToken, async function (req, res) {
  const customers = await CustomerDAO.selectAll();
  res.json(customers);
});
router.put('/customers/deactive/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const token = req.body.token;
  const result = await CustomerDAO.active(_id, token, 0);
  res.json(result);
});
router.get('/customers/sendmail/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const cust = await CustomerDAO.selectByID(_id);
  if (cust) {
    const send = await EmailUtil.send(cust.email, cust._id, cust.token);
    if (send) {
      res.json({ success: true, message: 'Please check email' });
    } else {
      res.json({ success: false, message: 'Email failure' });
    }
  } else {
    res.json({ success: false, message: 'Not exists customer' });
  }
});



router.get('/blogs', JwtUtil.checkToken, async function (req, res) {
  const blogs = await BlogDAO.selectAll();
  res.json(blogs);
});

router.post('/blogs', JwtUtil.checkToken, async function (req, res) {
  const title = req.body.title;
  const summary = req.body.summary;
  const content = req.body.content;
  const image = req.body.image;
  const now = new Date().getTime();


  const generatedSlug = slugify(title, { lower: true, locale: 'vi' });

  const blog = {
    title: title,
    slug: generatedSlug,
    summary: summary,
    content: content,
    image: image,
    cdate: now
  };

  const result = await BlogDAO.insert(blog);
  res.json(result);
});


router.put('/blogs/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const title = req.body.title;
  const summary = req.body.summary;
  const content = req.body.content;
  const image = req.body.image;

  const generatedSlug = slugify(title, { lower: true, locale: 'vi' });

  const blog = {
    _id: _id,
    title: title,
    slug: generatedSlug,
    summary: summary,
    content: content,
    image: image
  };

  const result = await BlogDAO.update(blog);
  res.json(result);
});

router.delete('/blogs/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const result = await BlogDAO.delete(_id);
  res.json(result);
});

module.exports = router;