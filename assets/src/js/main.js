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
        "ui/customAlert.js",
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
})();
