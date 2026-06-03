// Custom Cursor and Floating Label
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a, .project-item, .expertise-block');

// Create floating cursor label
const cursorLabel = document.createElement('div');
cursorLabel.className = 'cursor-label';
document.body.appendChild(cursorLabel);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorLabel.style.left = e.clientX + 'px';
    cursorLabel.style.top = e.clientY + 'px';
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Expertise Section Interaction
const expertiseBlocks = document.querySelectorAll('.expertise-block');
const mediaGrid = document.querySelector('.media-grid');
const gridImgs = document.querySelectorAll('.grid-img-wrap');

function activateExpertise(id) {
    mediaGrid.className = 'media-grid hover-' + id;
    expertiseBlocks.forEach(b => {
        if (b.getAttribute('data-hover') == id) {
            b.classList.add('active');
            const labelText = b.querySelector('.expertise-label').innerText;
            cursorLabel.innerText = 'VIEW ' + labelText;
            cursorLabel.classList.add('visible');
        } else {
            b.classList.remove('active');
        }
    });
}

function deactivateExpertise() {
    mediaGrid.className = 'media-grid';
    expertiseBlocks.forEach(b => b.classList.remove('active'));
    cursorLabel.classList.remove('visible');
}

expertiseBlocks.forEach(block => {
    block.addEventListener('mouseenter', () => {
        activateExpertise(block.getAttribute('data-hover'));
    });
    block.addEventListener('mouseleave', deactivateExpertise);
});

gridImgs.forEach((imgWrap, index) => {
    imgWrap.addEventListener('mouseenter', () => {
        activateExpertise(index + 1);
    });
    imgWrap.addEventListener('mouseleave', deactivateExpertise);
});

// GSAP Animations & Parallax
gsap.registerPlugin(ScrollTrigger);

// Lando Norris Block Interaction
const landoBlock = document.querySelector('.lando-block');
const landoHelmet = document.querySelector('.lando-helmet');

if (landoBlock && landoHelmet) {
    landoBlock.addEventListener('mousemove', (e) => {
        const rect = landoBlock.getBoundingClientRect();
        // Calculate relative position (-1 to 1)
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        
        // Move helmet slightly more to create parallax depth
        gsap.to(landoHelmet, {
            x: x * 30, 
            y: y * 30,
            rotationY: x * 10,
            rotationX: -y * 10,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // Slightly move face in opposite direction
        const faceImg = landoBlock.querySelector('.lando-face img');
        if (faceImg) {
            gsap.to(faceImg, {
                x: -x * 10,
                y: -y * 10,
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });

    landoBlock.addEventListener('mouseleave', () => {
        // Reset positions
        gsap.to(landoHelmet, {
            x: 0, y: 0, rotationY: 0, rotationX: 0,
            duration: 1, ease: "elastic.out(1, 0.3)"
        });
        const faceImg = landoBlock.querySelector('.lando-face img');
        if (faceImg) {
            gsap.to(faceImg, {
                x: 0, y: 0, scale: 1,
                duration: 1, ease: "power2.out"
            });
        }
    });
}


// Custom smooth parallax implementation for data-speed elements
const parallaxElements = document.querySelectorAll('[data-speed]');

parallaxElements.forEach(el => {
    // Determine translation amount based on speed attribute
    const speed = parseFloat(el.getAttribute('data-speed'));

    // Normal speed is 1. Less than 1 = slower (moves down slightly relative to scroll),
    // Greater than 1 = faster (moves up slightly relative to scroll)
    // To make it look like Blit Studio, we use y offsets
    const yOffset = (1 - speed) * 300;

    gsap.fromTo(el,
        { y: -yOffset },
        {
            y: yOffset,
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1 // smooth scrubbing
            }
        }
    );
});

// Fade in projects
const projects = document.querySelectorAll('.project-item');
projects.forEach(project => {
    gsap.from(project.querySelector('.project-title'), {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
            trigger: project,
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });
});

// Header scroll effect
const header = document.querySelector('.brutal-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- i18n & THEMES --- //

const translations = {
    ru: {
        "marquee": "UX/UI ✦ WEB-ДИЗАЙН ✦ ЛОГОТИПЫ ✦ ИЛЛЮСТРАЦИИ ✦ РЕКЛАМНЫЕ МАТЕРИАЛЛЫ ✦",
        "nav-about": "Обо мне",
        "nav-projects": "Работы",
        "nav-contact": "Контакты",
        "hero-title": "DIGITAL<br>CRAFTER",
        "hero-sub1": "Меня зовут Пётр Баркун.",
        "hero-sub2": "Я создаю цифровое будущее.",
        "about-title": "ИННОВАЦИИ<br>В КАЖДОМ<br>ПИКСЕЛЕ.",
        "about-desc": "Специалист по компьютерной графике с 8-летним опытом. Проектирую мобильные и веб-интерфейсы, которые работают и впечатляют. Создаю рекламные баннеры, логотипы брендбуки и многое другое.",
        "about-li1": "Возраст: 27 лет",
        "about-li2": "Проживаю: Минск, Беларусь",
        "about-li3": "AI, Figma, Illustrator, HTML5-баннеры",
        "exp-title": "Вместо того чтобы подстраиваться<br>под изменения, я их создаю.",
        "exp-btn": "СМОТРЕТЬ РАБОТЫ",
        "exp-label1": "UX/UI",
        "exp-desc1": "ПРОЕКТИРУЮ ИНТЕРФЕЙСЫ,<br>КОТОРЫЕ ВПЕЧАТЛЯЮТ И РАБОТАЮТ.",
        "exp-label2": "WEB",
        "exp-desc2": "СОЗДАЮ БЫСТРЫЕ И НАДЕЖНЫЕ<br>ЦИФРОВЫЕ ПЛАТФОРМЫ.",
        "exp-label3": "Брендинг",
        "exp-desc3": "ФОРМИРУЮ УЗНАВАЕМЫЙ<br>ВИЗУАЛЬНЫЙ ЯЗЫК КОМПАНИИ.",
        "exp-label4": "Иллюстрация",
        "exp-desc4": "РИСУЮ УНИКАЛЬНУЮ ГРАФИКУ<br>ДЛЯ ЛЮБЫХ ЗАДАЧ.",
        "proj1-title": "APP INTERFACE",
        "proj1-desc": "Интерфейс мобильного приложения. Грамотное юзабилити.",
        "proj2-title": "BRAND IDENTITY",
        "proj2-desc": "Отрисовка логотипа и брендбука для корпорации.",
        "proj3-title": "WEB PLATFORM",
        "proj3-desc": "UX/UI дизайн для крупной веб-платформы.",
        "contact-title": "LET'S TALK"
    },
    en: {
        "marquee": "UX/UI ✦ WEB DESIGN ✦ LOGOS ✦ ILLUSTRATION ✦ ADS ✦",
        "nav-about": "About",
        "nav-projects": "Works",
        "nav-contact": "Contact",
        "hero-title": "DIGITAL<br>CRAFTER",
        "hero-sub1": "My name is Peter Barkun.",
        "hero-sub2": "I shape the digital future.",
        "about-title": "INNOVATION<br>IN EVERY<br>PIXEL.",
        "about-desc": "Computer graphics specialist with 8 years of experience. I design mobile and web interfaces that work and impress. I create advertising banners, logos, brandbooks, and much more.",
        "about-li1": "Age: 27",
        "about-li2": "Location: Minsk, Belarus",
        "about-li3": "AI, Figma, Illustrator, HTML5-banners",
        "exp-title": "Instead of adapting to change,<br>we shape it.",
        "exp-btn": "SEE OUR WORK",
        "exp-label1": "UX/UI",
        "exp-desc1": "I DESIGN INTERFACES<br>THAT IMPRESS AND WORK.",
        "exp-label2": "WEB",
        "exp-desc2": "I BUILD FAST AND RELIABLE<br>DIGITAL PLATFORMS.",
        "exp-label3": "Branding",
        "exp-desc3": "I SHAPE A RECOGNIZABLE<br>VISUAL LANGUAGE FOR COMPANIES.",
        "exp-label4": "Illustration",
        "exp-desc4": "I DRAW UNIQUE GRAPHICS<br>FOR ANY PURPOSE.",
        "proj1-title": "APP INTERFACE",
        "proj1-desc": "Mobile app interface. Smart usability.",
        "proj2-title": "BRAND IDENTITY",
        "proj2-desc": "Designing a logo and brandbook for a corporation.",
        "proj3-title": "WEB PLATFORM",
        "proj3-desc": "UX/UI design for a large web platform.",
        "contact-title": "LET'S TALK"
    },
    be: {
        "marquee": "UX/UI ✦ WEB-ДЫЗАЙН ✦ ЛАГАТЫПЫ ✦ ІЛЮСТРАЦЫІ ✦ РЭКЛАМНЫЯ МАТЭРЫЯЛЛЫ ✦",
        "nav-about": "Пра мяне",
        "nav-projects": "Работы",
        "nav-contact": "Кантакты",
        "hero-title": "DIGITAL<br>CRAFTER",
        "hero-sub1": "Мяне клiчуць Пётр Баркун.",

        "hero-sub2": "Я ствараю лічбавую будучыню.",
        "about-title": "ІНАВАЦЫІ<br>Ў КОЖНЫМ<br>ПІКСЕЛІ.",
        "about-desc": "Спецыяліст па камп'ютарнай графіцы з 8-гадовым вопытам. Праектую мабільныя і вэб-інтэрфейсы, якія працуюць і ўражваюць. Ствараю рэкламныя банеры, лагатыпы брэндбукі і многае іншае.",
        "about-li1": "Узрост: 27 гадоў",
        "about-li2": "Месцазнаходжанне: Мінск, Беларусь",
        "about-li3": "AI, Figma, Illustrator, HTML5-банеры",
        "exp-title": "Замест таго каб падладжвацца<br>пад змены, я іх ствараю.",
        "exp-btn": "ГЛЯДЗЕЦЬ РАБОТЫ",
        "exp-label1": "UX/UI",
        "exp-desc1": "ПРАЕКТУЮ ІНТЭРФЕЙСЫ,<br>ЯКІЯ ЎРАЖВАЮЦЬ І ПРАЦУЮЦЬ.",
        "exp-label2": "WEB",
        "exp-desc2": "СТВАРАЮ ХУТКІЯ І НАДЗЕЙНЫЯ<br>ЛІЧБАВЫЯ ПЛАТФОРМЫ.",
        "exp-label3": "Брэндынг",
        "exp-desc3": "ФАРМУЮ ПАЗНАВАЛЬНУЮ<br>ВІЗУАЛЬНУЮ МОВУ КАМПАНІІ.",
        "exp-label4": "Ілюстрацыя",
        "exp-desc4": "МАЛЮЮ ЎНІКАЛЬНУЮ ГРАФІКУ<br>ДЛЯ ЛЮБЫХ ЗАДАЧ.",
        "proj1-title": "APP INTERFACE",
        "proj1-desc": "Інтэрфейс мабільнага дадатку. Пісьменнае юзабіліці.",
        "proj2-title": "BRAND IDENTITY",
        "proj2-desc": "Маляванне лагатыпа і брэндбука для карпарацыі.",
        "proj3-title": "WEB PLATFORM",
        "proj3-desc": "UX/UI дызайн для буйной вэб-платформы.",
        "contact-title": "LET'S TALK"
    }
};

// Language logic
const langBtns = document.querySelectorAll('.lang-btn');
const savedLang = localStorage.getItem('language') || 'ru';

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        // Do not translate theme toggle this way
        if (key !== 'theme-toggle' && translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    langBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    localStorage.setItem('language', lang);
    setTimeout(() => ScrollTrigger.refresh(), 100);
}

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        applyLanguage(btn.getAttribute('data-lang'));
    });
});

// Theme Logic
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('theme-light');
        themeToggle.innerText = 'DARK';
    } else {
        document.body.classList.remove('theme-light');
        themeToggle.innerText = 'LIGHT';
    }
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('theme-light');
    applyTheme(isLight ? 'dark' : 'light');
});

// Cursor link hover update for UI controls
document.querySelectorAll('.lang-btn, .theme-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    btn.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Init
applyLanguage(savedLang);
applyTheme(savedTheme);
