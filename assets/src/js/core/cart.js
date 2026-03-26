(function () {
    function showToast(message, type = 'success') {
        // Tạo element toast
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;

        // Style cho toast
        toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        font-size: 14px;
        font-family: Arial, sans-serif;
        z-index: 9999;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
        transition: opacity 0.3s ease-out;
    `;

        // Thêm animation keyframes nếu chưa có
        if (!document.querySelector('#toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateY(100%);
                    opacity: 1;
                }
                to {
                    transform: translateY(0%);
                    opacity: 1;
                }
            }
        `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        // Tự động xóa toast sau 3 giây
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    function loadOrderSummary() {
        const cart = JSON.parse(localStorage.getItem('ayaCart') || '[]');

        const SHIPPING = 20000;

        let subtotal = 0;
        let originalTotal = 0;

        cart.forEach(item => {
            const price = parseInt(String(item.price || '0').replace(/[^0-9]/g, ''), 10) || 0;
            const original = parseInt(String(item.originalPrice || item.price || '0').replace(/[^0-9]/g, ''), 10) || price;
            const qty = item.qty || item.quantity || 1;
            subtotal += price * qty;
            originalTotal += original * qty;
        });

        const discount = originalTotal - subtotal;
        const total = subtotal > 0 ? subtotal + SHIPPING : 0;

        const fmt = n => n.toLocaleString('vi-VN') + 'đ';

        document.getElementById('subtotal').textContent = fmt(subtotal);
        document.getElementById('discount').textContent = discount > 0 ? fmt(discount) : '0đ';
        document.getElementById('shipping').textContent = subtotal > 0 ? fmt(SHIPPING) : '0đ';
        document.getElementById('total').textContent = fmt(total);
    }

    if (localStorage.getItem('loggedIn') !== 'true') {
        showToast('Bạn cần đăng nhập để thanh toán!', "error");
        window.location.href = 'dangNhap.html';
    } else {
        loadOrderSummary();
    }

    document.getElementById('btn-dathang') && document.getElementById('btn-dathang').addEventListener('click', function () {
        const cart = JSON.parse(localStorage.getItem('ayaCart') || '[]');
        if (cart.length === 0) {
            showToast('Giỏ hàng của bạn đang trống!', "error");
            return;
        }

        const fullName = document.getElementById('full-name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const province = document.getElementById('province').value;
        const district = document.getElementById('district').value;
        const ward = document.getElementById('ward').value;
        const address = document.getElementById('address').value.trim();

        if (!fullName || !phone || !email || !province || !district || !ward || !address) {
            showToast('Vui lòng điền đầy đủ thông tin giao hàng!', "error");
            return;
        }

        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        if (!phoneRegex.test(phone)) {
            showToast('Vui lòng nhập số điện thoại hợp lệ!', "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Vui lòng nhập định dạng email hợp lệ!', "error");
            return;
        }

        const totalAmount = document.getElementById('total').textContent;

        localStorage.removeItem('ayaCart');
        window.location.href = 'thanhcong.html?total=' + encodeURIComponent(totalAmount);
    });
    function parsePrice(str) {
        return parseInt((str || '0').replace(/[^\d]/g, ''), 10) || 0;
    }

    function formatPrice(n) {
        return n.toLocaleString('vi-VN') + 'đ';
    }

    let donhangItems = JSON.parse(localStorage.getItem('ayaCart') || '[]');

    function renderItems() {
        const list = document.getElementById('item-list');

        if (donhangItems.length === 0) {
            list.innerHTML = '<p class="empty-msg">Không có sản phẩm nào trong đơn hàng.</p>';
            updateSummary();
            return;
        }

        function normalizeImgSrc(src) {
            if (!src || typeof src !== 'string') return src;

            // Items may be stored from earlier pages at root, e.g. "./assets/..."
            // When this page is under /pages/, those become broken.
            if (src.startsWith("./assets/")) return src.replace("./assets/", "../assets/");
            if (src.startsWith(".\\assets\\")) return src.replace(".\\assets\\", "../assets/");
            return src;
        }

        list.innerHTML = donhangItems.map((item, idx) => `
            <div class="order-item" data-idx="${idx}">
                <img src="${normalizeImgSrc(item.img)}" alt="${item.name}" class="item-img">
                <div class="item-info">
                    <div class="item-header">
                        <span class="item-name">${item.name}</span>
                        <button class="btn-delete" onclick="removeItem(${idx})" title="Xóa">🗑</button>
                    </div>
                    <div class="item-price-display">${item.price}</div>
                    <div class="item-qty-row">
                        <span class="qty-label">Số lượng</span>
                        <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
                        <span class="qty-val">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${idx}, +1)">+</button>
                    </div>
                    <div class="item-total">Thành tiền: <span class="sum-val">${formatPrice(parsePrice(item.price) * item.qty)}</span></div>
                </div>
            </div>`).join('');

        updateSummary();
    }

    function updateSummary() {
        let subtotal = donhangItems.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0);

        let original = donhangItems.reduce((s, i) => s + parsePrice(i.originalPrice || i.price) * i.qty, 0);

        let discount = original - subtotal;

        document.getElementById('sum-subtotal').textContent = formatPrice(subtotal);
        document.getElementById('sum-discount').textContent = discount > 0 ? formatPrice(discount) : '0đ';
        document.getElementById('sum-total').textContent = formatPrice(subtotal);
    }

    function changeQty(idx, delta) {
        donhangItems[idx].qty = Math.max(1, (donhangItems[idx].qty || 1) + delta);

        localStorage.setItem('ayaCart', JSON.stringify(donhangItems));

        renderItems();
    }

    function removeItem(idx) {
        donhangItems.splice(idx, 1);

        localStorage.setItem('ayaCart', JSON.stringify(donhangItems));

        renderItems();
    }

    renderItems();
})();