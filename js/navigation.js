/**
 * Site-wide navigation and footer.
 * Loaded on every page. Injects the hamburger menu and footer into placeholders.
 */

const NAV_LINKS = [
    { href: './index.html', label: 'Home' },
    { href: './about.html', label: 'About Me' },
    { href: './gallery.html', label: 'Gallery' },
];

function buildNavHtml() {
    const links = NAV_LINKS.map(({ href, label }) => {
        return `<a href="${href}">${label}</a>`;
    }).join('\n            ');

    return `
        <button type="button" id="menuBars" aria-controls="menu" aria-expanded="false" aria-label="Open navigation menu">
            <div class="other"></div>
            <div class="other"></div>
            <div class="other"></div>
        </button>
        <nav id="menu">
            ${links}
        </nav>`;
}

function buildFooterHtml() {
  const year = new Date().getFullYear();
  return `
        <p>Shootin' Shots Photography &mdash; Cassidy Sophier</p>
        <p><a href="mailto:baby8sophier@outlook.com?subject=Shootin'%20Shots%20Photography">baby8sophier@outlook.com</a></p>`;
}

function toggleMenu(menu, menuButton, forceOpen) {
    const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !menu.classList.contains('shown');
    menu.classList.toggle('shown', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

function closeMenu(menu, menuButton) {
    if (menu.classList.contains('shown')) {
        toggleMenu(menu, menuButton, false);
    }
}

function initNavigation() {
    const navContainer = document.querySelector('[data-nav]');
    if (!navContainer) {
        return;
    }

    navContainer.innerHTML = buildNavHtml();

    const menu = document.getElementById('menu');
    const menuButton = document.getElementById('menuBars');
    const menuContainer = document.getElementById('menu-container');

    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu(menu, menuButton);
    });

    // Close when clicking outside the menu panel and toggle button
    document.addEventListener('click', (event) => {
        if (!menuContainer.contains(event.target)) {
            closeMenu(menu, menuButton);
        }
    });

    // Close on Escape for keyboard users
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu(menu, menuButton);
        }
    });
}

function initFooter() {
    const footerContainer = document.querySelector('[data-footer]');
    if (!footerContainer) {
        return;
    }
    footerContainer.innerHTML = buildFooterHtml();
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFooter();
});
