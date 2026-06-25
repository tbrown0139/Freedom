function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
        <footer class="main-footer">
            <div class="footer-content">
                <div class="footer-grid" style="grid-template-columns: 1.5fr 1fr 1fr; align-items: start;">
                    <div class="footer-brand">
                        <img src="images/Knovon_black.png" alt="Knovon" class="footer-logo">
                        <p class="footer-description">Knovon is proudly American. We promote the U.S. Constitution, educate citizens on the Bill of Rights, and rally people to defend liberty.</p>
                    </div>
                    <div class="footer-column">
                        <h4>On This Page</h4>
                        <ul>
                            <li><a href="#mission">Our Mission</a></li>
                            <li><a href="#rights">Your Rights</a></li>
                            <li><a href="#education">Learn</a></li>
                            <li><a href="#protect">Protect</a></li>
                            <li><a href="#join">Get Involved</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Founding Documents</h4>
                        <ul>
                            <li><a href="https://www.archives.gov/founding-docs/constitution" target="_blank" rel="noopener noreferrer">The Constitution</a></li>
                            <li><a href="https://www.archives.gov/founding-docs/bill-of-rights" target="_blank" rel="noopener noreferrer">Bill of Rights</a></li>
                            <li><a href="https://constitutioncenter.org/" target="_blank" rel="noopener noreferrer">Constitution Center</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Knovon. Defending the Constitution of the United States.</p>
                </div>
            </div>
        </footer>
    `;
}

document.addEventListener('DOMContentLoaded', renderFooter);
