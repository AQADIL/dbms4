document.addEventListener('DOMContentLoaded', function() {
    // Language switching
    const langEn = document.getElementById('lang-en');
    const langRu = document.getElementById('lang-ru');
    
    const englishText = {
        mainTitle: "Online Quiz System - DBMS Journey",
        subtitle: "PostgreSQL Assignments Showcase",
        reflectionTitle: "My SQL Journey Reflection",
        reflectionText1: "During my work on SQL assignments, I consistently completed 7 tasks, each of which expanded my skills in working with relational databases and queries in PostgreSQL. The first task involved using aggregate functions to analyze the maximum score by quiz difficulty levels. I particularly enjoyed using GROUP BY and ROUND, as well as sorting by descending average value - this allowed me to quickly determine how \"generous\" quizzes of different levels were.",
        reflectionText2: "Each assignment gave me new knowledge and pleasure from building competent, readable and efficient SQL queries. It was especially pleasant to format queries with explanations, turning code into a tool for data analysis and management.",
        reflectionText3: "These 6 assignments helped me comprehend the wisdom and features of working with databases. And I can confidently say that I'm already ready to work with large-scale projects.",
        reflectionText4: "THANK YOU 😊<br>p/s<br>Sagacious AKADIL",
        viewerTitle: "Assignment Viewer"
    };
    
    const russianText = {
        mainTitle: "Online Quiz System - Путешествие в DBMS",
        subtitle: "Демонстрация заданий PostgreSQL",
        reflectionTitle: "Размышления о моём SQL-путешествии",
        reflectionText1: "В ходе работы над заданиями по SQL, я последовательно выполнил 7 задач, каждая из которых расширила мои навыки работы с реляционными базами данных и запросами в PostgreSQL. Первое задание включало использование агрегатных функций для анализа максимального балла по уровням сложности тестов. Мне особенно понравилось использовать GROUP BY и ROUND, а также сортировку по убыванию среднего значения - это позволило быстро определить, насколько \"щедрыми\" были тесты разных уровней.",
        reflectionText2: "Каждое задание давало мне новые знания и удовольствие от построения грамотных, читаемых и эффективных SQL-запросов. Особенно приятно было форматировать запросы с пояснениями, превращая код в инструмент анализа и управления данными.",
        reflectionText3: "Эти 6 заданий помогли мне постичь мудрость и особенности работы с базами данных. И я могу уверенно сказать, что уже готов работать с крупномасштабными проектами.",
        reflectionText4: "СПАСИБО ВАМ 😊<br>p/s<br>Мудрый AKADIL",
        viewerTitle: "Просмотр задания"
    };
    
    function setLanguage(lang) {
        const texts = lang === 'en' ? englishText : russianText;
        
        document.getElementById('main-title').textContent = texts.mainTitle;
        document.getElementById('subtitle').textContent = texts.subtitle;
        document.getElementById('reflection-title').textContent = texts.reflectionTitle;
        document.getElementById('reflection-text-1').innerHTML = texts.reflectionText1;
        document.getElementById('reflection-text-2').innerHTML = texts.reflectionText2;
        document.getElementById('reflection-text-3').innerHTML = texts.reflectionText3;
        document.getElementById('reflection-text-4').innerHTML = texts.reflectionText4;
        document.getElementById('viewer-title').textContent = texts.viewerTitle;
        
        langEn.classList.toggle('active', lang === 'en');
        langRu.classList.toggle('active', lang === 'ru');
    }
    
    langEn.addEventListener('click', () => setLanguage('en'));
    langRu.addEventListener('click', () => setLanguage('ru'));
    
    // Assignment viewer
    const assignmentCards = document.querySelectorAll('.assignment-card');
    const assignmentViewer = document.getElementById('viewer');
    const closeViewer = document.getElementById('close-viewer');
    const fullscreenBtn = document.getElementById('fullscreen');
    const downloadBtn = document.getElementById('download');
    const pdfViewer = document.getElementById('pdf-viewer');
    const imageViewer = document.getElementById('image-viewer');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    
    let currentScale = 1;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLargeMobile = isMobile && (window.screen.width >= 414 || window.screen.height >= 896);
    
    assignmentCards.forEach(card => {
        card.addEventListener('click', function() {
            const assignmentNum = this.getAttribute('data-assignment');
            const type = this.getAttribute('data-type');
            
            if (type === 'image') {
                imageViewer.src = `ass${assignmentNum}.png`;
                imageViewer.style.display = 'block';
                pdfViewer.style.display = 'none';
            } else {
                pdfViewer.src = `ass${assignmentNum}.pdf#toolbar=0&navpanes=0&scrollbar=0`;
                pdfViewer.style.display = 'block';
                imageViewer.style.display = 'none';
                currentScale = 1;
            }
            
            assignmentViewer.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            if (isLargeMobile) {
                document.querySelector('.viewer-header h2').style.display = 'none';
                document.querySelector('.viewer-content').style.paddingTop = '60px';
            }
        });
    });
    
    // Zoom functionality for mobile
    zoomInBtn?.addEventListener('click', function() {
        currentScale += 0.25;
        pdfViewer.style.transform = `scale(${currentScale})`;
    });
    
    zoomOutBtn?.addEventListener('click', function() {
        if (currentScale > 0.5) {
            currentScale -= 0.25;
            pdfViewer.style.transform = `scale(${currentScale})`;
        }
    });
    
    closeViewer.addEventListener('click', function() {
        assignmentViewer.classList.remove('active');
        document.body.style.overflow = 'auto';
        pdfViewer.style.transform = 'scale(1)';
        if (isLargeMobile) {
            document.querySelector('.viewer-header h2').style.display = 'block';
            document.querySelector('.viewer-content').style.paddingTop = '0';
        }
    });
    
    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
    
    // Download functionality
    downloadBtn.addEventListener('click', function() {
        const currentSrc = pdfViewer.style.display !== 'none' ? pdfViewer.src : imageViewer.src;
        if (currentSrc) {
            const link = document.createElement('a');
            link.href = currentSrc;
            link.download = currentSrc.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
    
    // Close viewer when clicking outside content
    assignmentViewer.addEventListener('click', function(e) {
        if (e.target === assignmentViewer) {
            closeViewer.click();
        }
    });
    
    // Theme switcher
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
    
    // SQL Download Functionality
    document.getElementById('downloadSql').addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = 'akadildb.sql';
        link.download = 'akadildb.sql';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        const btn = this;
        btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-download"></i> Download SQL';
        }, 2000);
    });
    
    // Mobile swipe to close
    if (isMobile) {
        let startY;
        assignmentViewer.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        assignmentViewer.addEventListener('touchmove', (e) => {
            if (startY - e.touches[0].clientY > 100) {
                closeViewer.click();
            }
        }, { passive: true });
    }
});
