
(function () {
    function toggleFavorite(book) {
        if (!window.requireLogin()) return;
        let favorites = JSON.parse(localStorage.getItem('ayaFavorites') || '[]');
        const index = favorites.findIndex(f => f.id === book.id);

        if (index !== -1) {
            favorites.splice(index, 1);
            if (window.showToast) window.showToast('Đã xóa khỏi danh sách Yêu thích', 'success');
        } else {
            favorites.push({
                id: book.id,
                title: book.title || book.name,
                img: book.img,
                price: book.price
            });
            if (window.showToast) window.showToast('❤️ Đã thêm vào danh sách Yêu thích', 'success');
        }
        localStorage.setItem('ayaFavorites', JSON.stringify(favorites));
        window.updateFavoriteUI(book.id);
    }

    function removeFavorite(bookId) {
        let favorites = JSON.parse(localStorage.getItem('ayaFavorites') || '[]');
        favorites = favorites.filter(f => f.id !== bookId);
        localStorage.setItem('ayaFavorites', JSON.stringify(favorites));

        if (typeof window.renderFavorites === 'function') {
            window.renderFavorites();
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

    window.toggleFavorite = toggleFavorite;
    window.removeFavorite = removeFavorite;
    window.isFavorite = isFavorite;
    window.updateFavoriteUI = updateFavoriteUI;
})();
