<div className="flex min-h-screen bg-gray-100">
  {/* SIDEBAR BÊN TRÁI (Cố định) */}
  <aside className="w-64 bg-slate-900 text-white hidden md:block">
    <div className="p-6 text-2xl font-bold border-b border-slate-800">ADMIN PANEL</div>
    <nav className="p-4 space-y-2">
      <Link to="/admin/home" className="block p-3 hover:bg-slate-800 rounded-lg">🏠 Thống kê</Link>
      <Link to="/admin/category" className="block p-3 hover:bg-slate-800 rounded-lg">📂 Danh mục</Link>
      <Link to="/admin/product" className="block p-3 hover:bg-slate-800 rounded-lg">📦 Sản phẩm</Link>
      <Link to="/admin/order" className="block p-3 hover:bg-slate-800 rounded-lg">🛒 Đơn hàng</Link>
    </nav>
  </aside>

  {/* NỘI DUNG BÊN PHẢI */}
  <main className="flex-1 p-8">
    <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">Quản lý hệ thống</h2>
      <button className="text-red-500 font-bold">Đăng xuất</button>
    </header>
    
    <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[500px]">
       {/* Các Component Admin sẽ render ở đây */}
    </div>
  </main>
</div>