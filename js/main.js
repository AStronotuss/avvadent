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