document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const slider = document.querySelector('.slider');
    const navLinksContainer = document.querySelector('.nav-links');
    const categoriesDropdown = document.getElementById('categories-dropdown');
    const categoriesLink = document.getElementById('categories-link');
    const dropdownContainer = document.querySelector('.dropdown-container');

    // 初始化滑塊位置
    const initialActiveLink = document.querySelector('.nav-link.active');
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
            if (!link.classList.contains('dropdown-toggle')) {
                navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
                updateSliderPosition(link);
                dropdownContainer.classList.remove('open');
            } else {
                // 如果是 dropdown-toggle，只需要更新 active 類別，滑塊不移動
                navLinks.forEach(item => {
                    if (item !== link) {
                        item.classList.remove('active');
                    }
                });
                link.classList.toggle('active');
            }
        });
    });

    // 處理視窗大小改變事件 (重新定位滑塊)
    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-link.active');
        updateSliderPosition(activeLink);
    });

    // 處理「分類」連結點擊事件 (下拉選單開合)
    categoriesLink.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownContainer.classList.toggle('open');
    });

    // 點擊頁面其他地方時關閉下拉選單
    document.addEventListener('click', (e) => {
        if (!dropdownContainer.contains(e.target) && dropdownContainer.classList.contains('open')) {
            dropdownContainer.classList.remove('open');
            categoriesLink.classList.remove('active');
        }
    });

    // 動態載入並生成下拉選單內容
    async function loadCategories() {
        try {
            // **修正檔案路徑**
            const response = await fetch('../data/categories.json');
            const categories = await response.json();
            
            categoriesDropdown.innerHTML = '';
            
            categories.forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'dropdown-group';
                
                const categoryLink = document.createElement('a');
                categoryLink.href = category.link;
                categoryLink.className = 'dropdown-item main-category';
                categoryLink.textContent = category.name;
                categoryDiv.appendChild(categoryLink);
                
                if (category.subcategories && category.subcategories.length > 0) {
                    const subcategoryList = document.createElement('div');
                    subcategoryList.className = 'subcategory-list';
                    category.subcategories.forEach(sub => {
                        const subLink = document.createElement('a');
                        subLink.href = sub.link;
                        subLink.className = 'dropdown-item sub-category';
                        subLink.textContent = sub.name;
                        subcategoryList.appendChild(subLink);
                    });
                    categoryDiv.appendChild(subcategoryList);
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