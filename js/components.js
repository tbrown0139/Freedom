function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
        <footer class="main-footer">
            <div class="footer-content" style="max-width:1200px;margin:0 auto;padding:2rem;text-align:center;">
                <img src="images/Knovon_black.png" alt="Knovon" height="36" style="margin-bottom:1rem;">
                <p style="color:#555;line-height:1.6;max-width:600px;margin:0 auto 1rem;">
                    Defend the Constitution. Protect the Bill of Rights. Educate yourself — because government counts on your ignorance.
                </p>
                <p style="color:#999;font-size:0.9rem;">&copy; ${new Date().getFullYear()} Knovon</p>
            </div>
        </footer>
    `;
}

document.addEventListener('DOMContentLoaded', renderFooter);
