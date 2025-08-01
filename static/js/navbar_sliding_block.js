document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const slider = document.querySelector('.slider');
    const activeLink = document.querySelector('.nav-link.active');

    // 頁面載入時，將滑塊定位到當前作用中的連結
    if (activeLink) {
        updateSlider(activeLink);
    }

    // 點擊導覽列連結時，更新滑塊位置
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // 移除所有連結的 active 類別
            navLinks.forEach(l => l.classList.remove('active'));
            // 為被點擊的連結新增 active 類別
            link.classList.add('active');
            // 更新滑塊位置
            updateSlider(link);
        });
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