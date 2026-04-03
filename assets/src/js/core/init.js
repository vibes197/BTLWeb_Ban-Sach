
(function () {
    function fixMovedPageAssetPaths() {
        if (!window.ayaInPagesFolder) return;

        const fromAssets = "./assets/";
        const toAssets = "../assets/";

        const fromSrc = "./assets/src/";
        const toSrc = "../assets/src/";

        document.querySelectorAll('link[href^="./assets/"]').forEach(link => {
            const href = link.getAttribute("href");
            if (!href) return;
            link.setAttribute("href", href.replace(fromAssets, toAssets));
        });

        document.querySelectorAll('link[href^="./src/"]').forEach(link => {
            const href = link.getAttribute("href");
            if (!href) return;
            link.setAttribute("href", href.replace("./src/", toSrc));
        });

        document.querySelectorAll('img[src^="./assets/"]').forEach(img => {
            const src = img.getAttribute("src");
            if (!src) return;
            img.setAttribute("src", src.replace(fromAssets, toAssets));
        });
    }

    window.ayaStart = function () {
        const run = function () {
            fixMovedPageAssetPaths();
            if (typeof window.renderAppComponents === "function") {
                window.renderAppComponents();
            }

            if (document.getElementById("userName")) {
                if (typeof window.updateLoginUI === "function") window.updateLoginUI();
            } else {
                if (typeof window.updateNavUI === "function") window.updateNavUI();
            }

            if (document.getElementById("btn-fav")) {
                const urlParams = new URLSearchParams(window.location.search);
                const currentId = urlParams.get('id') || 'akutami';
                if (typeof window.updateFavoriteUI === "function") window.updateFavoriteUI(currentId);
            }

            const mobileMenuBtn = document.getElementById("mobile-menu-btn");
            const nav = document.getElementById("nav");
            if (mobileMenuBtn && nav) {
                mobileMenuBtn.addEventListener("click", function () {
                    nav.classList.toggle("active");
                });
            }

            const categoryBtn = document.getElementById("category-btn");
            const categoryItem = document.getElementById("category-item");
            if (categoryBtn && categoryItem) {
                categoryBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    categoryItem.classList.toggle("open");
                });
            }

            if (typeof window.setupSearchRedirect === "function") window.setupSearchRedirect();
            if (typeof window.renderSearchResults === "function") window.renderSearchResults();
            if (typeof window.renderCategoryResults === "function") window.renderCategoryResults();
        };

        if (document.readyState === "loading") {
            document.addEventListener('DOMContentLoaded', run, { once: true });
        } else {
            run();
        }
    };
})();
