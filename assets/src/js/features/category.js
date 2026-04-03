
(function () {
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
                    <a href="${window.ayaIndexHref}" class="btn-continue">Về trang chủ</a>
                </div>`;
            return;
        }

        let results = (window.booksData || []).filter(b => b.category === categoryId);

        if (results.length === 0) {
            grid.innerHTML = `
                <div id="empty-favorites" style="text-align: center; padding: 50px; width: 100%;">
                    <p style="font-size: 18px; margin-bottom: 20px;">Không tìm thấy sách nào thuộc chủ đề "${catName}".</p>
                    <a href="${window.ayaIndexHref}" class="btn-continue">Về trang chủ</a>
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

    window.renderCategoryResults = renderCategoryResults;
})();
