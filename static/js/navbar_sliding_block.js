document.addEventListener('DOMContentLoaded', () => {
    // 選擇除了 dropdown-toggle 之外的所有 nav-link
    const navLinks = document.querySelectorAll('.nav-links > .nav-link:not(.dropdown-toggle)');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const slider = document.querySelector('.slider');
    const activeLink = document.querySelector('.nav-links > .nav-link.active');

    // 載入 JSON 資料並動態生成多層下拉選單
    fetch('static/data/categories.json')
        .then(response => response.json())
        .then(data => {
            dropdownMenu.innerHTML = ''; // 清空現有內容

            if (Array.isArray(data)) {
                data.forEach(category => {
                    const dropdownItem = document.createElement('a');
                    dropdownItem.className = 'dropdown-item';
                    dropdownItem.href = category.link || '#';
                    dropdownItem.textContent = category.name;

                    // 檢查是否有子分類
                    if (category.subcategories && category.subcategories.length > 0) {
                        const subMenu = document.createElement('div');
                        subMenu.className = 'sub-menu';

                        category.subcategories.forEach(subcategory => {
                            const subItem = document.createElement('a');
                            subItem.className = 'dropdown-item';
                            subItem.href = subcategory.link || '#';
                            subItem.textContent = subcategory.name;
                            subMenu.appendChild(subItem);
                        });
                        dropdownItem.appendChild(subMenu);
                    }
                    dropdownMenu.appendChild(dropdownItem);
                });
            } else {
                console.error('JSON 格式錯誤或無分類資料');
            }
        })
        .catch(error => {
            console.error('載入分類資料失敗:', error);
        });

    // 初始化滑塊位置
    if (activeLink) {
        updateSlider(activeLink);
    } else {
        // 如果沒有 active 連結，預設滑塊在第一個連結下方
        // 注意這裡要排除 dropdown-container
        const defaultLink = document.querySelector('.nav-links > .nav-link');
        if(defaultLink) {
            updateSlider(defaultLink);
            defaultLink.classList.add('active');
        }
    }

    // 處理點擊一般導覽列連結
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // 移除所有 active 狀態
            document.querySelectorAll('.nav-link, .dropdown-item').forEach(l => l.classList.remove('active'));
            // 為點擊的連結新增 active 狀態
            link.classList.add('active');
            // 更新滑塊位置
            updateSlider(link);
        });
    });

    // 處理點擊主分類連結時，滑塊移到「分類」下方
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(l => l.classList.remove('active'));
        dropdownToggle.classList.add('active');
        updateSlider(dropdownToggle);
    });

    // 處理點擊 dropdown-item 時，滑塊移到「分類」下方
    dropdownMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('dropdown-item')) {
            document.querySelectorAll('.nav-link, .dropdown-item').forEach(l => l.classList.remove('active'));
            dropdownToggle.classList.add('active');
            updateSlider(dropdownToggle);
        }
    });

    // 點擊頁面其他地方時隱藏下拉選單 (這部分改用CSS的hover處理，所以JS可以不用)

    /**
     * 更新滑塊的寬度和位置
     * @param {HTMLElement} target - 想要移動到的目標連結元素
     */
    function updateSlider(target) {
        if (!target) return;
        const targetWidth = target.offsetWidth;
        const targetOffsetLeft = target.offsetLeft;
        slider.style.width = `${targetWidth}px`;
        slider.style.transform = `translateX(${targetOffsetLeft}px)`;
    }
});