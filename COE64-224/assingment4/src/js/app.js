const themeSwitcher = document.getElementById('theme-switcher');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    htmlElement.classList.add(savedTheme);
} else {
    htmlElement.classList.add('theme-formal');
}

themeSwitcher.addEventListener('click', () => {
    const themes = ['theme-formal', 'theme-softHouse'];
    const currentTheme = themes.find(theme => htmlElement.classList.contains(theme));
    htmlElement.classList.remove(currentTheme);

    const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    htmlElement.classList.add(nextTheme);
    localStorage.setItem('theme', nextTheme);

});
