// Authentication helpers
(function () {
    function register() {
        let email = document.getElementById("regEmail")?.value;
        let pass = document.getElementById("regPassword")?.value;
        let name = document.getElementById("regName")?.value;
        let agree = document.getElementById("agree")?.checked;

        if (!email || !pass || !name) {
            alert("Nhập đầy đủ thông tin!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Vui lòng nhập định dạng email hợp lệ!");
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
        window.location.href = `${window.ayaPagesPrefix}dangNhap.html`;
    }

    function login() {
        let email = document.getElementById("email")?.value;
        let pass = document.getElementById("password")?.value;

        if (!email || !pass) {
            alert("Nhập đầy đủ thông tin!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Vui lòng nhập định dạng email hợp lệ!");
            return;
        }

        let savedEmail = localStorage.getItem("email");
        let savedPass = localStorage.getItem("password");

        if (email === savedEmail && pass === savedPass) {
            localStorage.setItem("loggedIn", "true");
            alert("Đăng nhập thành công!");
            window.location.href = window.ayaIndexHref;
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    }

    function logout() {
        localStorage.removeItem("loggedIn");
        window.location.href = window.ayaIndexHref;
    }

    function requireLogin() {
        if (localStorage.getItem("loggedIn") !== "true") {
            if (window.showToast) {
                window.showToast("Bạn cần đăng nhập để thực hiện chức năng này!", "info");
            } else {
                alert("Bạn cần đăng nhập để thực hiện chức năng này!");
            }
            return false;
        }
        return true;
    }

    function updateNavUI() {
        let isLoggedIn = localStorage.getItem("loggedIn") === "true";
        let name = localStorage.getItem("name") || "";
        let loginBtn = document.getElementById("loginBtn");
        let userAvatarBtn = document.getElementById("user-avatar-btn");
        let userDropdownName = document.getElementById("user-dropdown-name");

        if (isLoggedIn) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (userAvatarBtn) userAvatarBtn.style.display = 'flex';
            if (userDropdownName && name) userDropdownName.textContent = 'Xin chào, ' + name;
        } else {
            if (loginBtn) loginBtn.style.display = '';
            if (userAvatarBtn) userAvatarBtn.style.display = 'none';
        }
    }

    function updateLoginUI() {
        let isLoggedIn = localStorage.getItem("loggedIn") === "true";
        let email = localStorage.getItem("email") || "ayabook@gmail.com";
        let name = localStorage.getItem("name") || email.split("@")[0];

        let loginBtn = document.getElementById("loginBtn");
        let userAvatarBtn = document.getElementById("user-avatar-btn");
        let userDropdownName = document.getElementById("user-dropdown-name");
        let userName = document.getElementById("userName");
        let userEmail = document.getElementById("userEmail");

        if (isLoggedIn) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (userAvatarBtn) userAvatarBtn.style.display = 'flex';
            if (userDropdownName) userDropdownName.textContent = 'Xin chào, ' + name;
            if (userName) userName.textContent = "Hi, " + name + "!";
            if (userEmail) userEmail.textContent = email;
        } else {
            if (loginBtn) loginBtn.style.display = '';
            if (userAvatarBtn) userAvatarBtn.style.display = 'none';
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
