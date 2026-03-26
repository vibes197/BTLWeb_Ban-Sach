// Favorites (Yêu thích) feature
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
    function toggleFavorite(book) {
        if (!window.requireLogin()) return;
        let favorites = JSON.parse(localStorage.getItem('ayaFavorites') || '[]');
        const index = favorites.findIndex(f => f.id === book.id);

        if (index !== -1) {
            favorites.splice(index, 1);
            showToast('🖤 Đã xóa khỏi danh sách Yêu thích: ' + (book.title || book.name));
        } else {
            favorites.push({
                id: book.id,
                title: book.title || book.name,
                img: book.img,
                price: book.price
            });
            showToast('❤️ Đã thêm vào danh sách Yêu thích: ' + (book.title || book.name));
        }
        localStorage.setItem('ayaFavorites', JSON.stringify(favorites));
        window.updateFavoriteUI(book.id);
    }

    function removeFavorite(bookId) {
        let favorites = JSON.parse(localStorage.getItem('ayaFavorites') || '[]');
        favorites = favorites.filter(f => f.id !== bookId);
        localStorage.setItem('ayaFavorites', JSON.stringify(favorites));

        // Favorites page defines `renderFavorites()` inline.
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
