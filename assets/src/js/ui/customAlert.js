(function () {
    // Thêm CSS cho custom modal
    const styleId = "aya-custom-alert-styles";
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
            .aya-custom-toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 999999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                align-items: flex-end;
            }
            .aya-custom-toast {
                background: #fff;
                width: fit-content;
                min-width: 240px;
                max-width: 95vw;
                border-radius: 8px;
                padding: 8px 14px;
                box-shadow: 0 6px 16px rgba(0,0,0,0.12);
                font-family: Arial, sans-serif;
                transform: translateX(120%);
                opacity: 0;
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease;
            }
            .aya-custom-toast.aya-show {
                transform: translateX(0);
                opacity: 1;
            }
            .aya-custom-toast.aya-hide {
                transform: translateX(0);
                opacity: 0;
                transition: opacity 0.4s ease; /* Fade-out effect */
            }
            .aya-custom-toast-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 4px;
            }
            .aya-custom-toast-title-wrap {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .aya-custom-toast-title {
                margin: 0;
                font-family: 'Playfair Display', "Times New Roman", serif;
                font-size: 16px;
                font-weight: 700;
                color: #111;
            }
            .aya-custom-toast-close {
                background: none;
                border: none;
                font-size: 20px;
                color: #888;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            .aya-custom-toast-close:hover {
                color: #333;
            }
            .aya-custom-toast-body {
                margin-bottom: 8px;
                font-size: 13px;
                color: #444;
                line-height: 1.3;
                word-wrap: break-word;
            }
            .aya-custom-toast-footer {
                display: flex;
                justify-content: flex-end;
            }
            .aya-custom-toast-btn {
                background: #111;
                color: #fff;
                border: none;
                padding: 4px 14px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s;
            }
            .aya-custom-toast-btn:hover {
                background: #333;
            }
        `;
        document.head.appendChild(style);
    }

    const errorIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d32f2f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

    // Container for toasts
    let toastContainer = null;

    // Overriding the default window.alert
    window.alert = function (message) {
        return new Promise((resolve) => {
            if (!toastContainer) {
                toastContainer = document.createElement("div");
                toastContainer.className = "aya-custom-toast-container";
                document.body.appendChild(toastContainer);
            }

            const toast = document.createElement("div");
            toast.className = "aya-custom-toast";

            // If empty message, fallback to default text from image
            const displayMessage = message || "Invalid credentials";

            toast.innerHTML = `
                <div class="aya-custom-toast-header">
                    <div class="aya-custom-toast-title-wrap">
                        ${errorIcon}
                        <h3 class="aya-custom-toast-title">Login Failed</h3>
                    </div>
                    <button class="aya-custom-toast-close">&times;</button>
                </div>
                <div class="aya-custom-toast-body">
                    ${displayMessage}
                </div>
                <div class="aya-custom-toast-footer">
                    <button class="aya-custom-toast-btn">OK</button>
                </div>
            `;

            toastContainer.appendChild(toast);

            // trigger slide-in animation
            requestAnimationFrame(() => {
                toast.classList.add("aya-show");
            });

            let autoHideTimeout;

            function closeToast() {
                clearTimeout(autoHideTimeout);
                toast.classList.remove("aya-show");
                toast.classList.add("aya-hide"); // trigger fade-out

                setTimeout(() => {
                    if (toastContainer.contains(toast)) {
                        toastContainer.removeChild(toast);
                    }
                    if (toastContainer.children.length === 0) {
                        if (document.body.contains(toastContainer)) {
                            document.body.removeChild(toastContainer);
                        }
                        toastContainer = null;
                    }
                    resolve();
                }, 400); // 400ms corresponds to transition duration
            }

            // Auto hide after 5 seconds
            autoHideTimeout = setTimeout(() => {
                closeToast();
            }, 5000);

            const closeBtn = toast.querySelector(".aya-custom-toast-close");
            const okBtn = toast.querySelector(".aya-custom-toast-btn");

            closeBtn.addEventListener("click", closeToast);
            okBtn.addEventListener("click", closeToast);
        });
    };
})();
