function register() {
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPassword").value;
    let name = document.getElementById("regName").value;
    let agree = document.getElementById("agree").checked;

    if (!email || !pass || !name) {
        alert("Nhập đầy đủ thông tin!");
        return;
    }
    if (!agree) {
        alert("Bạn phải đồng ý điều khoản!");
        return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", pass);
    localStorage.setItem("name", name);

    alert("Đăng ký thành công!");
    window.location.href = "dangNhap.html";
}

function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    let savedEmail = localStorage.getItem("email");
    let savedPass = localStorage.getItem("password");

    if (email === savedEmail && pass === savedPass) {
        localStorage.setItem("loggedIn", "true");
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    } else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

// Kiểm tra đăng nhập — gọi trước khi mua/thêm giỏ hàng
function requireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        alert("Bạn cần đăng nhập để thực hiện chức năng này!");
        window.location.href = "dangNhap.html";
        return false;
    }
    return true;
}

// Cập nhật NAV: chỉ nút Đăng Nhập/Đăng Xuất (dùng cho mọi trang)
function updateNavUI() {
    let isLoggedIn = localStorage.getItem("loggedIn") === "true";
    let loginBtn = document.getElementById("loginBtn");
    if (!loginBtn) return;

    if (isLoggedIn) {
        loginBtn.textContent = "Đăng Xuất";
        loginBtn.onclick = function (e) { e.preventDefault(); logout(); };
        loginBtn.removeAttribute("href");
    } else {
        loginBtn.textContent = "Đăng Nhập";
        loginBtn.onclick = null;
        loginBtn.setAttribute("href", "./dangNhap.html");
    }
}

// Cập nhật NAV + phần chào sidebar (chỉ trang chủ)
function updateLoginUI() {
    let isLoggedIn = localStorage.getItem("loggedIn") === "true";
    let email = localStorage.getItem("email") || "ayabook@gmail.com";
    let name = localStorage.getItem("name") || email.split("@")[0];

    let loginBtn = document.getElementById("loginBtn");
    let userName = document.getElementById("userName");
    let userEmail = document.getElementById("userEmail");

    if (!loginBtn) return;

    if (isLoggedIn) {
        loginBtn.textContent = "Đăng Xuất";
        loginBtn.onclick = function (e) { e.preventDefault(); logout(); };
        loginBtn.removeAttribute("href");
        if (userName) userName.textContent = "Chào " + name;
        if (userEmail) userEmail.textContent = email;
    } else {
        loginBtn.textContent = "Đăng Nhập";
        loginBtn.onclick = null;
        loginBtn.setAttribute("href", "./dangNhap.html");
        if (userName) userName.textContent = "Chào Bạn!";
        if (userEmail) userEmail.textContent = "ayabook@gmail.com";
    }
}

function toggleFavorite(book) {
    if (!requireLogin()) return;
    let favorites = JSON.parse(localStorage.getItem('ayaFavorites') || '[]');
    const index = favorites.findIndex(f => f.id === book.id);

    if (index !== -1) {
        favorites.splice(index, 1);
        alert('Đã xóa khỏi danh sách Yêu thích: ' + (book.title || book.name));
    } else {
        favorites.push({
            id: book.id,
            title: book.title || book.name,
            img: book.img,
            price: book.price
        });
        alert('❤️ Đã thêm vào danh sách Yêu thích: ' + (book.title || book.name));
    }
    localStorage.setItem('ayaFavorites', JSON.stringify(favorites));
    updateFavoriteUI(book.id);
}

function removeFavorite(bookId) {
    let favorites = JSON.parse(localStorage.getItem('ayaFavorites') || '[]');
    favorites = favorites.filter(f => f.id !== bookId);
    localStorage.setItem('ayaFavorites', JSON.stringify(favorites));
    if (typeof renderFavorites === 'function') {
        renderFavorites();
    }
}

function isFavorite(bookId) {
    let favorites = JSON.parse(localStorage.getItem('ayaFavorites') || '[]');
    return favorites.some(f => f.id === bookId);
}

function updateFavoriteUI(bookId) {
    let btn = document.getElementById('btn-fav');
    if (!btn) return;
    if (isFavorite(bookId)) {
        btn.innerHTML = '<i class="ti-heart"></i> Đã yêu thích';
        btn.classList.add('active-fav');
    } else {
        btn.innerHTML = '<i class="ti-heart"></i> Yêu thích';
        btn.classList.remove('active-fav');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("userName")) {
        updateLoginUI(); // trang chủ
    } else {
        updateNavUI();   // các trang khác
    }

    // Nếu ở trang chi tiết, cập nhật UI nút yêu thích
    if (document.getElementById("btn-fav")) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentId = urlParams.get('id') || 'akutami';
        updateFavoriteUI(currentId);
    }
});