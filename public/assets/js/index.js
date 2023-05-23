//Show menu
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toogle'),
    navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    });
}
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
    e.preventDefault()
    //Service EmailJs
    emailjs.sendForm('service_bg7an1z', 'template_2t3mopu', '#contact-form', 'XvcnQAO5d2cfOGG9h')
        .then(() => {
            contactMessage.textContent = 'Message send successfully ✔️';
            setTimeout(() => { contactMessage.textContent = '' }, 5000);
            contactForm.reset();
        }, () => {
            contactMessage.textContent = 'Message not sent (service error)';
        });
}
contactForm.addEventListener('submit', sendEmail)

const footerYear = document.getElementById('footer__year');
footerYear.textContent = `${new Date().getFullYear()}`

//Show scroll up
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);

//SCROLL SECTIONS ACTIVE LINK
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

// Función para mostrar los iconos flotantes cuando no hay scroll
showFloatingIcons = () => {
    const floatingIcons = document.querySelectorAll('.FloatPhone, .float');
    for (let i = 0; i < floatingIcons.length; i++) {
        floatingIcons[i].style.display = 'block';
    }
}

// Evento que se dispara al hacer scroll
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
    const url = 'https://firebasestorage.googleapis.com/v0/b/lbs66-de0d2.appspot.com/o/cv_jesus_chicho_hernandez.pdf?alt=media&token=6945c8f9-da99-418f-98cb-01ad3ba57f68';
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = 'jesus_chicho_hernandez_cv.pdf';
    downloadLink.target = '_blank';
    downloadLink.click();

    /*  const response = await fetch(url);
    console.log(response)
    if (!response?.ok) { return console.log('Error al generar descarga del archivo.') }
    const blob = await response.blob();
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'jesus_chicho_hernandez_cv.pdf';
    downloadLink.click(); */
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


//https://www.youtube.com/watch?v=Y4-xMb-eHOQ&list=PL07efmqYWHZ_rVeQ1ws0ER9eL6cxo-d5V
