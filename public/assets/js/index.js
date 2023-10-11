//Show menu
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toogle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

document.addEventListener('click', (event) => {
    const targetElement = event.target;
    const isMenuOpen = navMenu.classList.contains('show-menu');

    // Check if the click happened outside the menu or menu trigger button
    if (isMenuOpen && !navMenu.contains(targetElement) && !targetElement.matches('#nav-toogle')) {
        navMenu.classList.remove('show-menu');
    }
});

//Remove menu mobile
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

navLink.forEach(value => value.addEventListener('click', linkAction));


// Add blur to header
const blurHeader = () => {
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}

window.addEventListener('scroll', blurHeader);

//Email Js
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message');

const sendEmail = e => {
    e.preventDefault();

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';

    // Load event to make sure the library was loaded correctly
    script.addEventListener('load', function () {
        //emailjs
        emailjs.sendForm('service_bg7an1z', 'template_2t3mopu', '#contact-form', 'XvcnQAO5d2cfOGG9h')
            .then(() => {
                contactMessage.textContent = 'Message sent successfully ✔️';
                setTimeout(() => { contactMessage.textContent = '' }, 5000);
                contactForm.reset();
            }, () => {
                contactMessage.textContent = 'Message not sent (service error) ❌';
            });
    });

    document.body.appendChild(script);
}

contactForm.addEventListener('submit', sendEmail);

const footerYear = document.getElementById('footer__year');
footerYear.textContent = `${new Date().getFullYear()}`

//Show scroll up
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);

//Scroll sections active link
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
});

sr.reveal(`.home__data, .home__social, .contact__container, footer__container`)
sr.reveal(`.home__image`, { origin: 'bottom' })
sr.reveal(`.about__data, .skills__data `, { origin: 'left' })
sr.reveal(`.about__image, .skills__content`, { origin: 'right' })
sr.reveal(`.services__card, .projects__card`, { interval: 100 })


hideFloatingIcons = () => {
    const floatingIcons = document.querySelectorAll('.FloatPhone, .float');
    for (let i = 0; i < floatingIcons.length; i++) {
        floatingIcons[i].style.display = 'none';
    }
}

// Function to show floating icons when there is no scroll
showFloatingIcons = () => {
    const floatingIcons = document.querySelectorAll('.FloatPhone, .float');
    for (let i = 0; i < floatingIcons.length; i++) {
        floatingIcons[i].style.display = 'block';
    }
}

// Event fired when scrolling
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop > 0 && (scrollTop + clientHeight) < scrollHeight) {
        hideFloatingIcons();
    } else {
        showFloatingIcons();
    }
});


downloadCv = async () => {
    const url = 'https://firebasestorage.googleapis.com/v0/b/lbs66-de0d2.appspot.com/o/cv_jesus_chicho_hernandez.pdf?alt=media&token=11867c77-fa79-4ac2-892d-a5c65a2e452e&_gl=1*16q651s*_ga*MTcyNTY2MTM1Ny4xNjg0ODcwMzQz*_ga_CW55HF8NVT*MTY5Njk2OTk2NC44LjEuMTY5Njk2OTk4Ny4zNy4wLjA.';
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = 'jesus_chicho_hernandez_cv.pdf';
    downloadLink.target = '_blank';
    downloadLink.click();
}


const textElement = document.getElementById('typing-text');
const spanElement = document.getElementById('typing-span');
const text = "Chicho_Hernández";

let index = 0;

const typeWriter = () => {
    if (index < text.length) {
        if (text.charAt(index) === ' ') {
            textElement.innerHTML += ' ';
        } else {
            spanElement.innerHTML += text.charAt(index).replace('_', ' ');
        }
        index++;
        setTimeout(typeWriter, 100);
    }
}

typeWriter();

const handleAnimationHover = element => {
    element.addEventListener('mouseenter', () => {
        element.classList.add('no-animation');
    });

    element.addEventListener('mouseleave', () => {
        element.classList.remove('no-animation');
    });
}

const floatPhone = document.querySelector('.FloatPhone');
const floatWhatsapp = document.querySelector('.FloatWhatsapp');

handleAnimationHover(floatPhone);
handleAnimationHover(floatWhatsapp);

// Get the service container
const servicesContainer = document.getElementById("services-container");

// Dynamically generate services
servicesData.forEach(servicio => {
    const article = document.createElement("article");
    article.className = "services__card";

    const icono = document.createElement("i");
    icono.className = servicio.icono + " services__icon";

    const titulo = document.createElement("h2");
    titulo.className = "services__title";
    titulo.textContent = servicio.titulo;

    const descripcion = document.createElement("p");
    descripcion.className = "services__description";
    descripcion.textContent = servicio.descripcion;

    article.appendChild(icono);
    article.appendChild(titulo);
    article.appendChild(descripcion);

    servicesContainer.appendChild(article);
});

const projectsContainer = document.getElementById('projects-container');

projects.forEach(project => {
    const article = document.createElement('article');
    article.className = 'projects__card';

    const img = document.createElement('img');
    img.setAttribute('data-src', project.imgSrc);
    img.alt = 'projects-img';
    img.className = 'projects__img lazyload';

    const modalDiv = document.createElement('div');
    modalDiv.className = 'projects__modal';

    const subtitle = document.createElement('span');
    subtitle.className = 'projects__subtitle';
    subtitle.textContent = project.subtitle;

    const title = document.createElement('h2');
    title.className = 'projects__title';
    title.textContent = project.title;

    const demoLink = document.createElement('a');
    demoLink.href = project.demoLink;
    demoLink.className = 'projects__button';
    demoLink.textContent = 'Ver demo ';

    const externalLinkIcon = document.createElement('i');
    externalLinkIcon.className = 'ri-external-link-line';
    demoLink.appendChild(externalLinkIcon);

    modalDiv.appendChild(subtitle);
    modalDiv.appendChild(title);
    modalDiv.appendChild(demoLink);

    article.appendChild(img);
    article.appendChild(modalDiv);

    projectsContainer.appendChild(article);
});