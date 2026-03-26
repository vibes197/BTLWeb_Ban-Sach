// App Header/Footer injected into pages
(function () {
    window.appHeaderHTML = `
        <div class="header-inner">
            <a href="${window.ayaIndexHref}" class="logo-text">AyaBook</a>
            <ul id="nav">
                <li><a href="${window.ayaIndexHref}">Trang chủ</a></li>
                <li><a href="${window.ayaPagesPrefix}faq.html">FAQ &amp; Hỏi đáp</a></li>
                <li><a href="${window.ayaPagesPrefix}vechungtoi.html">Về chúng tôi</a></li>
                <li><a href="#footer">Liên hệ với chúng tôi</a></li>
                <li class="push-right"><a href="${window.ayaPagesPrefix}yeuthich.html"><img class="shop" src="${window.ayaAssetsPrefix}img/trangchu/Fav.png" alt="Yêu thích"></a></li>
                <li><a href="${window.ayaPagesPrefix}donhang.html"><img class="fav" src="${window.ayaAssetsPrefix}img/trangchu/VectorShop .png" alt="Giỏ hàng"></a></li>
                <button><a href="${window.ayaPagesPrefix}thanhtoan.html">Thanh toán</a></button>
            </ul>

            <div class="header-right">
                <a id="loginBtn" href="${window.ayaPagesPrefix}dangNhap.html" class="btn-login"><i class="ti-shift-right"></i> Sign In</a>
                <div class="mobile-menu-btn" id="mobile-menu-btn">
                    <i class="ti-menu"></i>
                </div>
            </div>
        </div>
    `;

    window.appFooterHTML = `
            <div class="footer-container">
                <div class="footer-column">
                    <h3>DỊCH VỤ</h3>
                    <ul>
                        <li><a href="#">Điều khoản sử dụng</a></li>
                        <li><a href="#">Chính sách bảo mật</a></li>
                        <li><a href="#">Liên hệ</a></li>
                        <li><a href="#">Hệ thống nhà sách</a></li>
                        <li><a href="#">Tra cứu đơn hàng</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3>HỖ TRỢ</h3>
                    <ul>
                        <li><a href="#">Hướng dẫn đặt hàng</a></li>
                        <li><a href="#">Chính sách đổi trả - hoàn tiền</a></li>
                        <li><a href="#">Chính sách vận chuyển</a></li>
                        <li><a href="#">Phương thức thanh toán</a></li>
                        <li><a href="#">Chính sách khách hàng</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3>KẾT NỐI MẠNG XÃ HỘI</h3>
                    <div class="social-icons">
                        <a href="#"><i class="ti-facebook"></i></a>
                        <a href="#"><i class="ti-youtube"></i></a>
                        <a href="#"><i class="ti-instagram"></i></a>
                    </div>
                </div>
            </div>
        `;

    window.renderAppComponents = function () {
        const headerEl = document.getElementById("header");
        if (headerEl) {
            headerEl.innerHTML = window.appHeaderHTML;
        }
        const footerEl = document.getElementById("footer");
        if (footerEl) {
            footerEl.innerHTML = window.appFooterHTML;
        }

        // Sticky-ish effect for injected header
        window.addEventListener('scroll', function () {
            if (headerEl) {
                if (window.scrollY > 10) {
                    headerEl.classList.add('header-scrolled');
                } else {
                    headerEl.classList.remove('header-scrolled');
                }
            }
        });
    };
})();
