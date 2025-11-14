// main.js

let currentPage = 'home';

// Основная функция навигации
function showPage(pageId) {
    // Скрываем все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Показываем выбранную страницу
    document.getElementById(pageId).classList.add('active');

    // Обновляем навигацию
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
            link.classList.add('active');
        }
    });

    currentPage = pageId;

    // Перемещаем футер на активную страницу
    const footer = document.getElementById('footer');
    const activePage = document.getElementById(pageId);
    activePage.appendChild(footer);

    // Плавная прокрутка к верху
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Запускаем анимации для новой страницы
    animatePageElements();
}

// Параллакс эффект для фоновых фигур
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        const xPos = (x - 0.5) * speed * 15;
        const yPos = (y - 0.5) * speed * 15;
        shape.style.transform = `translate(${xPos}px, ${yPos}px) rotate(var(--start-rotation, 0deg))`;
    });
});

// Анимация элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.advantage-card, .stat-card');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

// Анимация элементов страницы
function animatePageElements() {
    const elements = document.querySelectorAll('.advantage-card, .stat-card, .contact-item');

    elements.forEach((element, index) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "all 0.6s ease";

        setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }, 100 * index);
    });
}

// Умная шапка для мобильных устройств
function initSmartHeader() {
    const header = document.querySelector('header');
    const navLinks = document.querySelector('.nav-links');

    let lastScrollY = window.scrollY;
    let isMobile = window.innerWidth <= 768;

    function updateHeaderState() {
        isMobile = window.innerWidth <= 768;
        const scrollY = window.scrollY;

        if (isMobile) {
            if (scrollY === 0) {
                // В самом верху - показываем все
                header.classList.add('expanded');
                header.classList.remove('compact');
            } else if (scrollY > 50) {
                // Ниже 50px - скрываем кнопки
                header.classList.add('compact');
                header.classList.remove('expanded');
            }
        } else {
            // На десктопе убираем все компактные стили
            header.classList.remove('compact', 'expanded');
        }

        lastScrollY = scrollY;
    }

    // Обработчики событий
    window.addEventListener('scroll', updateHeaderState);
    window.addEventListener('resize', updateHeaderState);

    // Клик по логотипу на мобильных - развернуть меню
    header.addEventListener('click', function(e) {
        if (isMobile && e.target.closest('.logo')) {
            header.classList.toggle('expanded');
            // Прокрутка к верху при клике на логотип
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Клик по ссылке на мобильных - закрыть меню если компактный режим
    navLinks.addEventListener('click', function(e) {
        if (isMobile && e.target.tagName === 'A' && header.classList.contains('compact')) {
            header.classList.remove('expanded');
        }
    });

    // Инициализация при загрузке
    updateHeaderState();
}

// Ripple эффект для glass элементов
document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.glass').forEach(element => {
        element.addEventListener('click', function(e) {
            // Создаем элемент ripple
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Добавляем стили для ripple анимации
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    initSmartHeader();
});

// Обработка ховер эффектов для карточек
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.advantage-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});



// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем начальную позицию футера
    const footer = document.getElementById('footer');
    const homePage = document.getElementById('home');
    if (footer && homePage) {
        homePage.appendChild(footer);
    }

    // Запускаем анимации
    animatePageElements();

    // Добавляем обработчик скролла
    window.addEventListener('scroll', animateOnScroll);

    // Инициализируем первую анимацию
    animateOnScroll();

    console.log('Стоматология AVVADENT - сайт инициализирован');
});

// Экспорт функций для глобального использования
window.showPage = showPage;
