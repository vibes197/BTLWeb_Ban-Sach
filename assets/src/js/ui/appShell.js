// App Header/Footer injected into pages
(function () {
    window.appHeaderHTML = `
        <div class="header-inner">
            <!-- LEFT: Logo only -->
            <div class="header-left">
                <a href="${window.ayaIndexHref}" class="logo-text">AyaBook</a>
            </div>

            <!-- CENTER: Nav links + Search -->
            <div class="header-center">
                <nav class="header-nav">
                    <a href="${window.ayaIndexHref}" class="nav-link">Trang chủ</a>
                    <a href="${window.ayaPagesPrefix}faq.html" class="nav-link">FAQ</a>
                    <a href="${window.ayaPagesPrefix}vechungtoi.html" class="nav-link">Về chúng tôi</a>

                    <!-- Chủ đề dropdown -->
                    <div id="category-item" class="nav-dropdown">
                        <button id="category-btn" class="nav-link nav-dropdown-btn">
                            Chủ đề <i class="ti-angle-down"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="${window.ayaPagesPrefix}chude.html?c=tieuthuyet">Tiểu thuyết</a></li>
                            <li><a href="${window.ayaPagesPrefix}chude.html?c=manga">Manga</a></li>
                            <li><a href="${window.ayaPagesPrefix}chude.html?c=kynang">Sách kỹ năng</a></li>
                            <li><a href="${window.ayaPagesPrefix}chude.html?c=hoctap">Sách học tập</a></li>
                            <li><a href="${window.ayaPagesPrefix}chude.html?c=thieunhi">Sách thiếu nhi</a></li>
                            <li><a href="${window.ayaPagesPrefix}chude.html?c=trinhtham">Trinh thám</a></li>
                        </ul>
                    </div>
                </nav>

                <!-- Search bar -->
                <div class="header-search">
                    <input id="book-search-input" type="text" placeholder="Tìm kiếm sách, tác giả...">
                    <button id="book-search-button" type="button" aria-label="Tìm kiếm">
                        <i class="ti-search"></i>
                    </button>
                </div>
            </div>

            <!-- RIGHT: Yêu thích + Giỏ hàng + Account + Mobile toggle -->
            <div class="header-right">
                <a href="${window.ayaPagesPrefix}yeuthich.html" class="header-icon-btn">
                    <i class="ti-heart"></i>
                    <span>Yêu thích</span>
                </a>
                <a href="${window.ayaPagesPrefix}donhang.html" class="header-icon-btn">
                    <i class="ti-shopping-cart"></i>
                    <span>Giỏ hàng</span>
                </a>
                <a id="loginBtn" href="${window.ayaPagesPrefix}dangNhap.html" class="header-icon-btn">
                    <i class="ti-user"></i>
                    <span>Tài Khoản</span>
                </a>
                <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu">
                    <i class="ti-menu"></i>
                </button>
            </div>
        </div>

        <!-- Mobile nav drawer -->
        <div class="mobile-nav" id="mobile-nav">
            <a href="${window.ayaIndexHref}">Trang chủ</a>
            <a href="${window.ayaPagesPrefix}faq.html">FAQ & Hỏi đáp</a>
            <a href="${window.ayaPagesPrefix}vechungtoi.html">Về chúng tôi</a>
            <a href="${window.ayaPagesPrefix}chude.html?c=tieuthuyet">Tiểu thuyết</a>
            <a href="${window.ayaPagesPrefix}chude.html?c=manga">Manga</a>
            <a href="${window.ayaPagesPrefix}chude.html?c=kynang">Sách kỹ năng</a>
            <div class="mobile-nav-search">
                <input id="mobile-search-input" type="text" placeholder="Tìm kiếm sách...">
                <button id="mobile-search-btn" type="button"><i class="ti-search"></i></button>
            </div>
        </div>
    `;

    window.appFooterHTML = `
        <div class="footer-bottom">
            <div class="footer-copy">
                <p>&copy; 2026 <strong>AyaBook</strong>. All rights reserved.</p>
                <p class="footer-sub">Mua sách online dễ dàng &amp; chuyên nghiệp.</p>
            </div>
            <div class="footer-social">
                <p>KẾT NỐI VỚI CHÚNG TÔI</p>
                <div class="social-icons">
                    <a href="https://www.facebook.com/" target="_blank" aria-label="Facebook"><i class="ti-facebook"></i></a>
                    <a href="https://www.youtube.com/" target="_blank" aria-label="YouTube"><i class="ti-youtube"></i></a>
                    <a href="https://www.instagram.com/" target="_blank" aria-label="Instagram"><i class="ti-instagram"></i></a>
                </div>
            </div>
        </div>
        <div id="aya-toast-container"></div>
    `;

    window.renderAppComponents = function () {
        const headerEl = document.getElementById("header");
        if (headerEl) {
            headerEl.innerHTML = window.appHeaderHTML;

            // Mobile menu toggle
            const mobileBtn = document.getElementById('mobile-menu-btn');
            const mobileNav = document.getElementById('mobile-nav');
            if (mobileBtn && mobileNav) {
                mobileBtn.addEventListener('click', function () {
                    mobileNav.classList.toggle('open');
                });
            }

            // Mobile search mirrors main search
            const mobileSearchBtn = document.getElementById('mobile-search-btn');
            const mobileSearchInput = document.getElementById('mobile-search-input');
            if (mobileSearchBtn && mobileSearchInput) {
                mobileSearchBtn.addEventListener('click', function () {
                    const q = mobileSearchInput.value.trim();
                    if (q) window.location.href = window.ayaPagesPrefix + 'timkiem.html?q=' + encodeURIComponent(q);
                });
            }
        }

        const footerEl = document.getElementById("footer");
        if (footerEl) {
            footerEl.innerHTML = window.appFooterHTML;
        }

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

    // ─── Toast/Popup Notification ────────────────────────────────────────
    window.showToast = function (message, type) {
        type = type || 'success';
        let container = document.getElementById('aya-toast-container');
        // If footer not yet rendered, attach to body
        if (!container) {
            container = document.createElement('div');
            container.id = 'aya-toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = 'aya-toast aya-toast--' + type;
        const icon = type === 'success' ? 'ti-check' : (type === 'cart' ? 'ti-shopping-cart' : 'ti-info-alt');
        toast.innerHTML = '<i class="' + icon + '"></i><span>' + message + '</span>';
        container.appendChild(toast);
        // Animate in
        setTimeout(function () { toast.classList.add('show'); }, 30);
        // Animate out and remove
        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { toast.remove(); }, 400);
        }, 3000);
    };

})();
