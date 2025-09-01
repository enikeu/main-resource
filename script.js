// Ждем, пока весь HTML документ будет загружен
document.addEventListener('DOMContentLoaded', function() {

    // ===== ПЕРЕКЛЮЧЕНИЕ ОСНОВНЫХ РАЗДЕЛОВ =====
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Функция для переключения разделов
    function switchSection(sectionId) {
        // 1. Убираем класс 'active' у всех кнопок и секций
        navLinks.forEach(link => link.classList.remove('active'));
        contentSections.forEach(section => section.classList.add('hidden'));

        // 2. Находим нужную секцию и активируем ее
        const targetSection = document.getElementById(`${sectionId}-section`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        // 3. Активируем соответствующую кнопку в навигации
        const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Вешаем обработчик клика на все ссылки в главном меню
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем переход по ссылке
            const sectionId = this.getAttribute('data-section');
            switchSection(sectionId);
        });
    });


    // ===== ПЕРЕКЛЮЧЕНИЕ ПОДРАЗДЕЛОВ (на примере Главной страницы) =====
    const subNavBtns = document.querySelectorAll('.sub-nav-btn');
    const subSections = document.querySelectorAll('.subsection');

    function switchSubSection(subSectionId) {
        // Аналогичная логика для подразделов
        subNavBtns.forEach(btn => btn.classList.remove('active'));
        subSections.forEach(sub => sub.classList.add('hidden'));

        const targetSubSection = document.getElementById(`${subSectionId}-subsection`);
        if (targetSubSection) {
            targetSubSection.classList.remove('hidden');
        }

        const activeBtn = document.querySelector(`.sub-nav-btn[data-subsection="${subSectionId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    // Вешаем обработчик на кнопки подразделов
    subNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const subSectionId = this.getAttribute('data-subsection');
            switchSubSection(subSectionId);
        });
    });

    // (Опционально) Можно сгенерировать тестовые новости
    const newsList = document.getElementById('news-list');
    const testNews = [
        'Запуск нового корпоративного портала!',
        'Завтра корпоратив в 18:00.',
        'Обновление регламента отпусков.'
    ];

    testNews.forEach(newsItem => {
        const li = document.createElement('li');
        li.textContent = newsItem;
        newsList.appendChild(li);
    });
});

    // ===== ФУНКЦИОНАЛ НАСТРОЕК =====

    // Элементы настроек
    const themeSelect = document.getElementById('theme-select');
    const languageSelect = document.getElementById('language-select');
    const notificationsToggle = document.getElementById('notifications-toggle');
    const resetSettingsBtn = document.getElementById('reset-settings-btn');

    // Загружаем сохранённые настройки при запуске
    function loadSettings() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedLanguage = localStorage.getItem('language') || 'ru';
        const savedNotifications = localStorage.getItem('notifications') === 'true';

        // Применяем настройки
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);

        languageSelect.value = savedLanguage;
        applyLanguage(savedLanguage);

        notificationsToggle.checked = savedNotifications;
    }

    // Применяем тему
    function applyTheme(theme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(theme + '-theme');
        localStorage.setItem('theme', theme);
    }

    // Применяем язык (заглушка для демонстрации)
    function applyLanguage(lang) {
        console.log('Язык изменён на: ', lang);
        // Здесь будет сложная логика перевода всего интерфейса
        // Для примера просто сохраним выбор
        localStorage.setItem('language', lang);

        // Можно добавить всплывающее уведомление о смене языка
        if(lang === 'en') {
            alert('Language changed! Actual translation would be implemented here.');
        } else {
            alert('Язык изменён! Здесь будет реализован полноценный перевод.');
        }
    }

    // Обработчики событий для настроек
    themeSelect.addEventListener('change', () => applyTheme(themeSelect.value));
    languageSelect.addEventListener('change', () => applyLanguage(languageSelect.value));
    
    notificationsToggle.addEventListener('change', function() {
        localStorage.setItem('notifications', this.checked);
        if(this.checked) {
            // Здесь можно запросить разрешение на реальные уведомления
            alert('Уведомления включены. В реальном приложении здесь браузер запросил бы разрешение.');
        }
    });

    // Кнопка сброса настроек
    resetSettingsBtn.addEventListener('click', function() {
        if(confirm('Вы уверены, что хотите сбросить все настройки к значениям по умолчанию?')) {
            localStorage.clear();
            loadSettings(); // Перезагружаем настройки (default)
            alert('Настройки сброшены!');
        }
    });

    // Загружаем настройки при старте
    loadSettings();