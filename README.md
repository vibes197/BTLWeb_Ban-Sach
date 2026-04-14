# 📚 AyaBook - Web Bán Sách (Project Bài Tập Lớn)

AyaBook là một dự án website bán sách trực tuyến với giao diện hiện đại, dễ sử dụng, được xây dựng bằng HTML, CSS và JavaScript thuần. Dự án này bao gồm đầy đủ các luồng hoạt động cơ bản của một trang thương mại điện tử như xem danh sách sản phẩm, chi tiết sản phẩm, giỏ hàng, và quy trình thanh toán.

## 🚀 Tính năng nổi bật (Features)

- **🏠 Trang chủ (Home):** Trưng bày các đầu sách mới, sách bán chạy, và các danh mục sách (Manga, Tiểu thuyết, Kỹ năng, v.v.).
- **📖 Chi tiết sản phẩm (Book Details):** Xem thông tin chi tiết, giá tiền và thêm sách vào giỏ hàng.
- **🛒 Giỏ hàng & Thanh toán (Shopping Cart & Checkout):** 
  - Thêm, sửa, xóa sản phẩm trong giỏ hàng.
  - Tự động tính toán tổng tiền đơn hàng.
  - Lưu và quản lý giỏ hàng cục bộ thông qua `localStorage` (không bị mất dữ liệu khi tải lại trang).
  - Trang xác nhận đặt hàng thành công và tạo mã số đơn hàng tự động.
- **👤 Tài khoản (Authentication):** Giao diện đăng nhập và đăng ký cơ bản.
- **❤️ Yêu thích (Favorites):** Tính năng lưu giữ và xem lại các cuốn sách người dùng đã thả tim ưu thích.
- **❓ Hỗ trợ (FAQ):** Khu vực để giải đáp các câu hỏi thường gặp của khách hàng.

## 📂 Kiến trúc và Cấu trúc thư mục (Project Structure)

```text
BTLWeb_Ban-Sach/
│
├── assets/                 # Các tài nguyên và tệp tĩnh
│   ├── fonts/              # Các font chữ và bộ icon (Themify Icons)
│   ├── img/                # Hình ảnh sử dụng cho đồ hoạ của dự án
│   └── src/                # Tài nguyên mã nguồn tĩnh
│       ├── css/            # Các file định dạng giao diện (StyleSheets)
│       └── js/             # Các file JavaScript được tổ chức dạng module (core, features, ui, utils)
│
├── components/             # Các thành phần giao diện được tái sử dụng (Header, Footer,...)
│
├── pages/                  # Thư mục chứa các trang HTML phụ
│   ├── chitiet.html        # Trang hiển thị thông tin cụ thể (mô tả, giá) của một quyển sách
│   ├── chude.html          # Trang hiển thị danh sách sách theo các chủ đề
│   ├── dangNhap.html       # Trang nhập thông tin Đăng nhập
│   ├── dangKi.html         # Trang Đăng ký người dùng mới
│   ├── donhang.html        # Trang xem và quản lý những món đồ có trong giỏ hàng
│   ├── thanhtoan.html      # Trang điền thông tin và thao tác quá trình thanh toán
│   ├── thanhcong.html      # Trang hiển thị trạng thái Đặt hàng thành công
│   ├── timkiem.html        # Trang danh sách kết quả tìm kiếm
│   ├── vechungtoi.html     # Trang giới thiệu về cửa hàng
│   ├── yeuthich.html       # Trang chứa danh sách các quyển sách yêu thích
│   └── faq.html            # Trang câu hỏi thường gặp và hướng dẫn (FAQ)
│
└── index.html              # Trang chủ hiển thị sách theo các kệ sách, chuyên mục
```

## 🛠️ Công nghệ sử dụng (Technologies)

- **Ngôn ngữ đánh dấu & Định dạng:** HTML5, CSS3.
- **Ngôn ngữ lập trình logic:** Vanilla JavaScript.
- **Giao diện & Icon:** Themify Icons.
- **Lưu trữ dữ liệu:** Trình duyệt `localStorage` (để quản lý thao tác của giỏ hàng và dữ liệu hóa đơn xuyên suốt các trang).

## 💻 Hướng dẫn chạy dự án (How to run)

Vì dự án được xây dựng hoàn toàn ở phía Front-end với cơ chế tĩnh, bạn có thể dễ dàng chạy ứng dụng mà không cần cài đặt môi trường server phức tạp.

1. **Tải về / Clone dự án:**
   ```bash
   git clone <đường-dẫn-repo-của-bạn>
   ```
2. **Mở dự án:**
   Chỉ cần click đúp vào file `index.html` trong thư mục chính để mở trang web bằng bất kỳ trình duyệt web nào (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari...).

3. **(Khuyến nghị) Chạy qua Local Server:** 
   Để trải nghiệm tốt nhất các module của JS mà không bị lỗi CORS đôi khi xảy ra với protocol `file:///`, bạn nên sử dụng công cụ tạo local server:
   - Nếu bạn dùng **VS Code**, hãy cài đặt extension **Live Server**. Sau đó click chuột phải vào file `index.html` và chọn **"Open with Live Server"**.
   - Hoặc bạn có thể dùng Python (nếu có cài sẵn) trong terminal:
     ```bash
     python3 -m http.server 8000
     ```
     Sau đó truy cập `http://localhost:8000` trên trình duyệt.

## 📌 Lưu ý (Notes)
- Đây là một project hỗ trợ việc học tập và thực hành phát triển Web (đồ án/bài tập lớn). Một số chức năng hệ thống như cơ sở dữ liệu người dùng (Đăng nhập/Đăng ký) đang được mô phỏng hoàn toàn ở phía Front-end.
- Các hình ảnh, nội dung giới thiệu sách trên trang này được tham khảo từ các tác phẩm gốc và các nhà xuất bản; các quyền sở hữu tài sản bản quyền thuộc về tác giả gốc.

---
*Dự án được xây dựng và hoàn thiện với mục đích giáo dục.*
