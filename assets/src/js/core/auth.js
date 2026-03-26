// Authentication helpers
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
    function register() {
        let email = document.getElementById("regEmail")?.value;
        let pass = document.getElementById("regPassword")?.value;
        let name = document.getElementById("regName")?.value;
        let agree = document.getElementById("agree")?.checked;

        if (!email || !pass || !name) {
            showToast("Nhập đầy đủ thông tin!", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Vui lòng nhập định dạng email hợp lệ!", "error");
            return;
        }
        if (!agree) {
            showToast("Bạn phải đồng ý điều khoản!", "error");
            return;
        }

        localStorage.setItem("email", email);
        localStorage.setItem("password", pass);
        localStorage.setItem("name", name);

        showToast("Đăng ký thành công!");
        window.location.href = `${window.ayaPagesPrefix}dangNhap.html`;
    }

    function login() {
        let email = document.getElementById("email")?.value;
        let pass = document.getElementById("password")?.value;

        if (!email || !pass) {
            showToast("Nhập đầy đủ thông tin!", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Vui lòng nhập định dạng email hợp lệ!", "error");
            return;
        }

        let savedEmail = localStorage.getItem("email");
        let savedPass = localStorage.getItem("password");

        if (email === savedEmail && pass === savedPass) {
            localStorage.setItem("loggedIn", "true");
            showToast("Đăng nhập thành công!");
            window.location.href = window.ayaIndexHref;
        } else {
            showToast("Sai tài khoản hoặc mật khẩu!", "error");
        }
    }

    function logout() {
        localStorage.removeItem("loggedIn");
        window.location.href = window.ayaIndexHref;
    }

    function requireLogin() {
        if (localStorage.getItem("loggedIn") !== "true") {
            showToast("Bạn cần đăng nhập để thực hiện chức năng này!", "error");
            window.location.href = `${window.ayaPagesPrefix}dangNhap.html`;
            return false;
        }
        return true;
    }

    function updateNavUI() {
        let isLoggedIn = localStorage.getItem("loggedIn") === "true";
        let loginBtn = document.getElementById("loginBtn");
        if (!loginBtn) return;

        if (isLoggedIn) {
            loginBtn.innerHTML = '<i class="ti-shift-left"></i> Sign Out';
            loginBtn.onclick = function (e) { e.preventDefault(); logout(); };
            loginBtn.removeAttribute("href");
        } else {
            loginBtn.innerHTML = '<i class="ti-shift-right"></i> Sign In';
            loginBtn.onclick = null;
            loginBtn.setAttribute("href", `${window.ayaPagesPrefix}dangNhap.html`);
        }
    }

    function updateLoginUI() {
        let isLoggedIn = localStorage.getItem("loggedIn") === "true";
        let email = localStorage.getItem("email") || "ayabook@gmail.com";
        let name = localStorage.getItem("name") || email.split("@")[0];

        let loginBtn = document.getElementById("loginBtn");
        let userName = document.getElementById("userName");
        let userEmail = document.getElementById("userEmail");

        if (!loginBtn) return;

        if (isLoggedIn) {
            loginBtn.innerHTML = '<i class="ti-shift-left"></i> Sign Out';
            loginBtn.onclick = function (e) { e.preventDefault(); logout(); };
            loginBtn.removeAttribute("href");
            if (userName) userName.textContent = "Hi, " + name + "!";
            if (userEmail) userEmail.textContent = email;
        } else {
            loginBtn.innerHTML = '<i class="ti-shift-right"></i> Sign In';
            loginBtn.onclick = null;
            loginBtn.setAttribute("href", `${window.ayaPagesPrefix}dangNhap.html`);
            if (userName) userName.textContent = "Welcome back!";
            if (userEmail) userEmail.textContent = "ayabook@gmail.com";
        }
    }

    // Expose to window for inline onclick calls.
    window.register = register;
    window.login = login;
    window.logout = logout;
    window.requireLogin = requireLogin;
    window.updateNavUI = updateNavUI;
    window.updateLoginUI = updateLoginUI;
})();
