document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links .nav-link:not(.dropdown-toggle)');
    const slider = document.querySelector('.slider');
    const navLinksContainer = document.querySelector('.nav-links');
    const categoriesLink = document.getElementById('categories-link');
    const dropdownContainer = document.querySelector('.dropdown-container');
    const categoriesDropdown = document.getElementById('categories-dropdown');

    // 初始化滑塊位置
    const initialActiveLink = document.querySelector('.nav-links .nav-link.active');
    if (initialActiveLink) {
        updateSliderPosition(initialActiveLink);
    }

    function updateSliderPosition(element) {
        if (element && slider) {
            const linkRect = element.getBoundingClientRect();
            const containerRect = navLinksContainer.getBoundingClientRect();
            
            slider.style.width = `${linkRect.width}px`;
            slider.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
            slider.style.opacity = '1';
        } else if (slider) {
            slider.style.opacity = '0';
        }
    }

    // 處理導覽列連結點擊事件 (滑塊移動)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            updateSliderPosition(link);
            if (dropdownContainer) {
                dropdownContainer.classList.remove('open');
            }
        });
    });

    // 處理視窗大小改變事件 (重新定位滑塊)
    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-links .nav-link.active');
        updateSliderPosition(activeLink);
    });

    // 處理「分類」連結點擊事件 (下拉選單開合)
    if (categoriesLink && dropdownContainer) {
        categoriesLink.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownContainer.classList.toggle('open');
            // 點擊分類時，滑塊移到分類連結上
            updateSliderPosition(categoriesLink);
            // 確保其他連結的 active 狀態被移除
            navLinks.forEach(item => item.classList.remove('active'));
        });
    }

    // 點擊頁面其他地方時關閉下拉選單
    document.addEventListener('click', (e) => {
        if (dropdownContainer && !dropdownContainer.contains(e.target) && !categoriesLink.contains(e.target) && dropdownContainer.classList.contains('open')) {
            dropdownContainer.classList.remove('open');
        }
    });

    // 動態載入並生成下拉選單內容 (新邏輯)
    async function loadCategories() {
        if (!categoriesDropdown) return;
        try {
            const response = await fetch('./data/categories.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const categories = await response.json();
            
            categoriesDropdown.innerHTML = '';
            
            categories.forEach(category => {
                const categoryDiv = document.createElement('div');
                
                if (category.subcategories && category.subcategories.length > 0) {
                    categoryDiv.className = 'dropdown-item has-submenu';
                    
                    const categoryLink = document.createElement('a');
                    categoryLink.href = '#'; // 沒有子分類時可以連結，有子分類時用 #
                    categoryLink.textContent = category.name;
                    categoryDiv.appendChild(categoryLink);

                    const subMenu = document.createElement('div');
                    subMenu.className = 'submenu';
                    
                    category.subcategories.forEach(sub => {
                        const subLink = document.createElement('a');
                        subLink.href = sub.link;
                        subLink.className = 'dropdown-item sub-category';
                        subLink.textContent = sub.name;
                        subMenu.appendChild(subLink);
                    });
                    categoryDiv.appendChild(subMenu);
                } else {
                    categoryDiv.className = 'dropdown-item';
                    const categoryLink = document.createElement('a');
                    categoryLink.href = category.link;
                    categoryLink.textContent = category.name;
                    categoryDiv.appendChild(categoryLink);
                }
                
                categoriesDropdown.appendChild(categoryDiv);
            });
        } catch (error) {
            console.error('無法載入分類資料:', error);
            categoriesDropdown.innerHTML = '<div class="dropdown-item">無法載入分類</div>';
        }
    }
    
    loadCategories();
});