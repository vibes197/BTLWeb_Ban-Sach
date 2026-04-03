
(function () {
    function setupSearchRedirect() {
        let searchInput = document.getElementById("book-search-input");
        let searchBtn = document.getElementById("book-search-button");

        if (!searchInput || !searchBtn) return;

        function doSearch() {
            let query = searchInput.value.trim();
            if (query !== "") {
                window.location.href = `${window.ayaPagesPrefix}timkiem.html?q=${encodeURIComponent(query)}`;
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
        let results = (window.booksData || []).filter(b => b.name.toLowerCase().includes(qLower));

        grid.innerHTML = '';

        if (!query) {
            grid.innerHTML = `
                <div id="empty-favorites" style="text-align: center; padding: 50px; width: 100%;">
                    <p style="font-size: 18px; margin-bottom: 20px;">Bạn chưa nhập từ khóa tìm kiếm.</p>
                    <a href="${window.ayaIndexHref}" class="btn-continue">Bắt đầu tìm kiếm</a>
                </div>`;
            return;
        }

        if (results.length === 0) {
            grid.innerHTML = `
                <div id="empty-favorites" style="text-align: center; padding: 50px; width: 100%;">
                    <p style="font-size: 18px; margin-bottom: 20px;">Không tìm thấy sách nào cho "${query}".</p>
                    <a href="${window.ayaIndexHref}" class="btn-continue">Tiếp tục tìm kiếm</a>
                </div>`;
            return;
        }

        results.forEach(book => {
            let item = document.createElement('div');
            item.className = 'book-item';

            item.innerHTML = `
                <a href="${window.ayaPagesPrefix}chitiet.html?id=${book.id}" class="book-link">
                    <img src="${book.img}" alt="${book.name}">
                </a>
                <p class="book-name">${book.name}</p>
                <p class="book-price">${book.price}</p>
            `;
            grid.appendChild(item);
        });
    }

    window.setupSearchRedirect = setupSearchRedirect;
    window.renderSearchResults = renderSearchResults;
})();
