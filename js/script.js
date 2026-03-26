//Chức năng đăng ký, đăng nhập, đăng xuất
function register() {
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPassword").value;
    let name = document.getElementById("regName").value;
    let agree = document.getElementById("agree").checked;

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
    window.location.href = "dangNhap.html";
}

function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

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
        window.location.href = "index.html";
    } else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

function requireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        alert("Bạn cần đăng nhập để thực hiện chức năng này!");
        window.location.href = "dangNhap.html";
        return false;
    }
    return true;
}

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

//Chức năng yêu thích
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


//Chức năng tìm kiếm sách
const booksData = [
    { id: 'nina', name: 'Nina ở thị trấn cao nguyên - Tập 2', price: '34,200đ', img: './assets/img/trangchu/nina.png', category: 'manga' },
    { id: 'tet', name: 'Những ngày tết ta', price: '81,000đ', img: './assets/img/trangchu/tet.png', category: 'thieunhi' },
    { id: 'worldtrigger', name: 'World Trigger - Tập 4', price: '31,500đ', img: './assets/img/trangchu/worldtrigger.png', category: 'manga' },
    { id: 'bantusach', name: 'Những người bạn từ trang sách', price: '85,500đ', img: './assets/img/trangchu/bantusach.png', category: 'tieuthuyet' },
    { id: 'shin', name: 'Shin - Cậu bé bút chì - Tập 1', price: '19,500đ', img: './assets/img/trangchu/shin.png', category: 'manga' },
    { id: 'naruto', name: 'Naruto - Quyển 20', price: '21,000đ', img: './assets/img/trangchu/naruto.png', category: 'manga' },
    { id: 'onepi', name: 'One Piece - Tập 101', price: '25,000đ', img: './assets/img/trangchu/onepi.png', category: 'manga' },
    { id: 'akutami', name: 'Chú thuật hồi chiến - Tập 1', price: '30,000đ', img: './assets/img/trangchu/akutami.png', category: 'manga' },
    { id: 'xebuyt', name: 'XE BUÝT ĐƯA EM ĐI', price: '36,000đ', img: './assets/img/trangchu/xebuyt.png', category: 'tieuthuyet' },
    { id: 'rantaro', name: 'Ninja Rontaro - Tập 19', price: '36,000đ', img: './assets/img/trangchu/rantaro.png', category: 'manga' },
    { id: 'drstone', name: 'Doctor Stone - Tập 21', price: '22,500đ', img: './assets/img/trangchu/drstone.png', category: 'manga' },
    { id: 'doraemondoiquan', name: 'Đội quân Doraemon - Tập 4', price: '19,800đ', img: './assets/img/trangchu/doraemondoiquan.png', category: 'manga' },
    { id: 'thiendinh', name: 'THIỀN ĐỊNH MỖI NGÀY', price: '118,000đ', img: './assets/img/trangchu/thiendinh.png', category: 'kynang' },
    { id: 'tute', name: 'MỘT NĂM SỐNG TỬ TẾ', price: '168,000đ', img: './assets/img/trangchu/tute.png', category: 'kynang' },
    { id: 'sohoc', name: 'THAY ĐỔI CUỘC SỐNG VỚI NHÂN SỐ HỌC', price: '181,040đ', img: './assets/img/trangchu/sohoc.png', category: 'kynang' },
    { id: 'damnghi', name: 'DÁM NGHĨ LẠI', price: '117,600đ', img: './assets/img/trangchu/damnghi.png', category: 'kynang' }
];

function setupSearchRedirect() {
    let searchInput = document.getElementById("book-search-input");
    let searchBtn = document.getElementById("book-search-button");

    if (!searchInput || !searchBtn) return;

    function doSearch() {
        let query = searchInput.value.trim();
        if (query !== "") {
            window.location.href = `timkiem.html?q=${encodeURIComponent(query)}`;
        }
    }

    searchBtn.addEventListener("click", doSearch);
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            doSearch();
            e.preventDefault();
        }
    });
}

function renderSearchResults() {
    let grid = document.getElementById("search-results-grid");
    if (!grid) return;

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';

    let title = document.getElementById("search-title");
    if (title) {
        title.textContent = query ? `Kết quả tìm kiếm: "${query}"` : "Kết quả tìm kiếm";
    }

    let qLower = query.toLowerCase();
    let results = booksData.filter(b => b.name.toLowerCase().includes(qLower));

    grid.innerHTML = '';

    if (!query) {
        grid.innerHTML = `
            <div id="empty-favorites" style="text-align: center; padding: 50px; width: 100%;">
                <p style="font-size: 18px; margin-bottom: 20px;">Bạn chưa nhập từ khóa tìm kiếm.</p>
                <a href="index.html" class="btn-continue">Bắt đầu tìm kiếm</a>
            </div>`;
        return;
    }

    if (results.length === 0) {
        grid.innerHTML = `
            <div id="empty-favorites" style="text-align: center; padding: 50px; width: 100%;">
                <p style="font-size: 18px; margin-bottom: 20px;">Không tìm thấy sách nào cho "${query}".</p>
                <a href="index.html" class="btn-continue">Tiếp tục tìm kiếm</a>
            </div>`;
        return;
    }

    results.forEach(book => {
        let item = document.createElement('div');
        item.className = 'book-item';

        item.innerHTML = `
            <a href="chitiet.html?id=${book.id}" class="book-link">
                <img src="${book.img}" alt="${book.name}">
            </a>
            <p class="book-name">${book.name}</p>
            <p class="book-price">${book.price}</p>
        `;
        grid.appendChild(item);
    });
}

//Chức năng danh mục sách   
function renderCategoryResults() {
    let grid = document.getElementById("category-results-grid");
    if (!grid) return;

    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('c');

    let title = document.getElementById("category-title");

    const categoryNames = {
        'tieuthuyet': 'Tiểu thuyết',
        'manga': 'Manga',
        'kynang': 'Sách kỹ năng',
        'hoctap': 'Sách học tập',
        'thieunhi': 'Sách thiếu nhi',
        'trinhtham': 'Trinh thám'
    };

    let catName = categoryNames[categoryId] || categoryId;

    if (title) {
        title.textContent = catName ? `Chủ đề: ${catName}` : "Tất cả chủ đề";
    }

    grid.innerHTML = '';

    if (!categoryId) {
        grid.innerHTML = `
            <div id="empty-favorites" style="text-align: center; padding: 50px; width: 100%;">
                <p style="font-size: 18px; margin-bottom: 20px;">Vui lòng chọn một chủ đề để xem sách.</p>
                <a href="index.html" class="btn-continue">Về trang chủ</a>
            </div>`;
        return;
    }

    let results = booksData.filter(b => b.category === categoryId);

    if (results.length === 0) {
        grid.innerHTML = `
            <div id="empty-favorites" style="text-align: center; padding: 50px; width: 100%;">
                <p style="font-size: 18px; margin-bottom: 20px;">Không tìm thấy sách nào thuộc chủ đề "${catName}".</p>
                <a href="index.html" class="btn-continue">Về trang chủ</a>
            </div>`;
        return;
    }

    results.forEach(book => {
        let item = document.createElement('div');
        item.className = 'book-item';
        item.innerHTML = `
            <a href="chitiet.html?id=${book.id}" class="book-link">
                <img src="${book.img}" alt="${book.name}">
            </a>
            <p class="book-name">${book.name}</p>
            <p class="book-price">${book.price}</p>
        `;
        grid.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("userName")) {
        updateLoginUI();
    } else {
        updateNavUI();
    }

    if (document.getElementById("btn-fav")) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentId = urlParams.get('id') || 'akutami';
        updateFavoriteUI(currentId);
    }

    setupSearchRedirect();
    renderSearchResults();
    renderCategoryResults();
});