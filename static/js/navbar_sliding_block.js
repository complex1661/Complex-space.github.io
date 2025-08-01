document.addEventListener('DOMContentLoaded', () => {
    // 選擇除了 .dropdown-toggle 之外的所有 nav-link
    const navLinks = document.querySelectorAll('.nav-links > .nav-link');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const slider = document.querySelector('.slider');

    // 找到頁面載入時預設的 active 連結
    const activeLink = document.querySelector('.nav-links > .nav-link.active');

    // 初始化滑塊位置
    if (activeLink) {
        updateSlider(activeLink);
    } else {
        // 如果沒有 active 連結，預設滑塊在第一個連結下方
        updateSlider(navLinks[0]);
        navLinks[0].classList.add('active');
    }

    // 處理點擊一般導覽列連結
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // 移除所有 active 狀態
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            // 為點擊的連結新增 active 狀態
            link.classList.add('active');
            // 更新滑塊位置
            updateSlider(link);
            // 隱藏下拉選單
            dropdownMenu.classList.remove('show');
        });
    });

    // 處理點擊下拉選單切換
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle('show');
    });

    // 點擊下拉選單中的項目，同時更新滑塊位置
    dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // 移除所有 active 狀態，包括 dropdown-toggle
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            // 為 dropdown-toggle 新增 active 狀態
            dropdownToggle.classList.add('active');
            // 更新滑塊位置到 "分類" 連結下方
            updateSlider(dropdownToggle);
            // 隱藏下拉選單
            dropdownMenu.classList.remove('show');
        });
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
        // 確保目標元素是有效的
        if (!target) return;

        const targetWidth = target.offsetWidth;
        const targetOffsetLeft = target.offsetLeft;
        slider.style.width = `${targetWidth}px`;
        slider.style.transform = `translateX(${targetOffsetLeft}px)`;
    }
});