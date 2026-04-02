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
            alert("Bạn cần đăng nhập để thực hiện chức năng này!");
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
            loginBtn.innerHTML = '<i class="ti-shift-left"></i><span>Sign Out</span>';
            loginBtn.onclick = function (e) { e.preventDefault(); logout(); };
            loginBtn.removeAttribute("href");
        } else {
            loginBtn.innerHTML = '<i class="ti-shift-right"></i><span>Sign In</span>';
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
            loginBtn.innerHTML = '<i class="ti-shift-left"></i><span>Sign Out</span>';
            loginBtn.onclick = function (e) { e.preventDefault(); logout(); };
            loginBtn.removeAttribute("href");
            if (userName) userName.textContent = "Hi, " + name + "!";
            if (userEmail) userEmail.textContent = email;
        } else {
            loginBtn.innerHTML = '<i class="ti-shift-right"></i><span>Sign In</span>';
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
