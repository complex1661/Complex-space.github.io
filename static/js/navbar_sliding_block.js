document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const slider = document.querySelector('.slider');
    const activeLink = document.querySelector('.nav-link.active');

    if (activeLink) {
        updateSlider(activeLink);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            updateSlider(link);
            dropdownMenu.classList.remove('show'); // 點擊其他連結時隱藏下拉選單
        });
    });

    // 處理下拉選單的顯示與隱藏
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle('show');
    });

    // 點擊頁面其他地方時隱藏下拉選單
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdownMenu.classList.remove('show');
        }
    });

    /**
     * 更新滑塊的寬度和位置
     * @param {HTMLElement} target - 想要移動到的目標連結元素
     */
    function updateSlider(target) {
        const targetWidth = target.offsetWidth;
        const targetOffsetLeft = target.offsetLeft;
        slider.style.width = `${targetWidth}px`;
        slider.style.transform = `translateX(${targetOffsetLeft}px)`;
    }
});