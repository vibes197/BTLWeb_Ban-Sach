// Decide relative href/src prefixes depending on whether the current page
// lives in the root folder or inside `pages/`.
(function () {
    const p = window.location.pathname || "";
    window.ayaInPagesFolder = p.includes("/pages/") || p.includes("\\pages\\");
    window.ayaPagesPrefix = window.ayaInPagesFolder ? "" : "pages/";
    window.ayaSrcPrefix = window.ayaInPagesFolder ? "../assets/src/" : "./assets/src/";
    window.ayaAssetsPrefix = window.ayaInPagesFolder ? "../assets/" : "./assets/";
    window.ayaIndexHref = window.ayaInPagesFolder ? "../index.html" : "index.html";
})();
