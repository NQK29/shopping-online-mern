# 🛒 Hệ Thống Quản Lý Bán Hàng Trực Tuyến (MERN Stack)

Dự án xây dựng website bán hàng Full-stack hiện đại, tập trung vào trải nghiệm người dùng và hệ thống quản lý kho (Inventory Management) dành cho Admin.

---

## 🌟 Tính năng nổi bật

### 🛡️ Trang Quản Trị (Admin Dashboard)
* **Quản lý sản phẩm:** Thêm, sửa, xóa sản phẩm kèm hình ảnh (Base64).
* **Quản lý kho:** Theo dõi và cập nhật số lượng tồn kho (**Quantity**) trực tiếp.
* **Quản lý đơn hàng:** Tiếp nhận, duyệt hoặc hủy đơn hàng từ khách hàng.
* **Bảo mật:** Xác thực quyền truy cập bằng **JSON Web Token (JWT)**.

### 👤 Trang Khách Hàng (Customer Website)
* **Mua sắm:** Xem sản phẩm mới, sản phẩm hot, tìm kiếm theo tên/danh mục.
* **Giỏ hàng:** Thêm/bớt sản phẩm, tính toán tổng tiền tự động.
* **Đặt hàng:** Quy trình đặt hàng nhanh chóng, tự động trừ số lượng trong kho khi đơn hàng được duyệt.
* **Xác thực:** Gửi Email kích hoạt tài khoản thông qua **Nodemailer**.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Thành phần | Công nghệ |
|---|---|
| **Frontend** | ReactJS, Tailwind CSS, Axios |
| **Backend** | NodeJS (Runtime), ExpressJS (Framework) |
| **Database** | MongoDB (NoSQL), Mongoose (ODM) |
| **Authentication** | JWT (JSON Web Token), Crypto (SHA256) |
| **Tools** | Postman, Git/GitHub, VS Code |



---

## 📂 Cấu trúc dự án

```text
shoppingonline/
├── client-admin/      # Giao diện quản lý (ReactJS)
├── client-customer/   # Giao diện người mua (ReactJS)
├── server/            # API Server & Database Logic (NodeJS)
└── .gitignore         # Quy định các file không đưa lên GitHub
