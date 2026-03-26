// AyaBook JS loader: tách code theo chức năng trong `src/js/`.
(function () {
    if (window.__ayaModulesLoadingStarted) return;
    window.__ayaModulesLoadingStarted = true;

    const current = document.currentScript;
    const scriptSrc = current && current.src ? current.src : "";
    const baseDir = scriptSrc.includes("/")
        ? scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1)
        : "./";

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = src;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Failed to load: " + src));
            document.head.appendChild(s);
        });
    }

    const files = [
        "utils/paths.js",
        "core/data.js",
        "core/auth.js",
        "core/favorites.js",
        "features/search.js",
        "features/category.js",
        "ui/appShell.js",
        "core/init.js"
    ];

    (async () => {
        try {
            for (const f of files) {
                await loadScript(baseDir + f);
            }
            if (typeof window.ayaStart === "function") {
                window.ayaStart();
            }
        } catch (err) {
            console.error(err);
        }
    })();
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
})();
