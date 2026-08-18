(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('language-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const siteHeader = document.querySelector('.site-header');
  const navLinks = document.querySelector('.nav-links');
  const englishNodes = document.querySelectorAll('.lang-en');
  const chineseNodes = document.querySelectorAll('.lang-zh');

  function applyLanguage(language, persist) {
    const isChinese = language === 'zh';
    root.dataset.lang = isChinese ? 'zh' : 'en';
    root.lang = isChinese ? 'zh-CN' : 'en';

    englishNodes.forEach((node) => { node.hidden = isChinese; });
    chineseNodes.forEach((node) => { node.hidden = !isChinese; });

    toggle.textContent = isChinese ? 'EN' : '中文';
    toggle.setAttribute('aria-label', isChinese ? 'Switch to English' : '切换至中文');
    toggle.setAttribute('aria-pressed', String(isChinese));

    document.title = isChinese ? '梅一樊 Yifan Mei' : 'Yifan Mei 梅一樊';

    if (persist) {
      try { localStorage.setItem('yifan-homepage-language', isChinese ? 'zh' : 'en'); } catch (_) {}
    }
  }

  const initialLanguage = root.dataset.lang === 'zh' ? 'zh' : 'en';
  applyLanguage(initialLanguage, false);
  toggle.addEventListener('click', () => applyLanguage(root.dataset.lang === 'zh' ? 'en' : 'zh', true));

  function closeMenu() {
    siteHeader.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }

  menuToggle.addEventListener('click', () => {
    const willOpen = !siteHeader.classList.contains('menu-open');
    siteHeader.classList.toggle('menu-open', willOpen);
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
  });
  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
})();
