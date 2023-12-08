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
const spanElement = document.getElementById('typingText');
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



const languageSelect = document.getElementById('language');
const languageImage = document.getElementById('languaje'); // Assuming you have set the correct ID for the image

// Iterate over the languages array and add options to the select
languages.forEach(language => {
    const option = document.createElement('option');
    option.value = language.value;
    option.textContent = language.description;
    languageSelect.appendChild(option);
});

// Toggle language select visibility on image click
languageImage.addEventListener('click', () => {
    languageSelect.style.display = languageSelect.style.display === 'none' ? 'block' : 'none';
});

// Hide language select initially
languageSelect.style.display = 'none';


lastUpdateDate = (selectedLanguage) => {
    const lastUpdatedElement = document.getElementById("last-updated");

    // Gets the last modified date
    const lastModified = new Date(`${lastUpdated}T00:00:00`);

    // format date
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const locale = selectedLanguage === "en" ? "en-US" : "es-ES";

    const formattedDate = lastModified.toLocaleDateString(locale, options);

    // Update article content with formatted date
    lastUpdatedElement.textContent = formattedDate; // Set instead of append
}

// Function to be executed when you change the language
updateLanguageContent = async (dataLanguage) => {
    try {

        const menuItems = dataLanguage.header.menuItems;
        menuItems.forEach(({ id, text }) => {
            const menuItem = document.getElementById(id);
            if (menuItem) {
                menuItem.textContent = text;
            }
        });

        // Actualizar contenido de las etiquetas en la sección Home
        document.getElementById('helloText').textContent = dataLanguage.sections.homeSection.home.hello;
        document.getElementById('soyText').textContent = dataLanguage.sections.homeSection.home.soy;
        document.getElementById('homeTitle').textContent = dataLanguage.sections.homeSection.title;
        document.getElementById('homeEducation').textContent = dataLanguage.sections.homeSection.education;
        document.getElementById('homeDescription').textContent = dataLanguage.sections.homeSection.description;
        document.getElementById('homeButton').textContent = dataLanguage.sections.homeSection.button;

        document.getElementById('developmentText').textContent = dataLanguage.sections.homeSection.developmentText;
        document.getElementById('innovationText').textContent = dataLanguage.sections.homeSection.innovationText;
        //
        document.getElementById('aboutSubtitle').textContent = dataLanguage.sections.aboutSection.subtitle;
        document.getElementById('aboutTitle').textContent = dataLanguage.sections.aboutSection.title;
        dataLanguage.sections.aboutSection.description.forEach(({ id, text, url }) => {
            const element = document.getElementById(id);
            if (element) {
                // Limpiamos el contenido existente del elemento
                element.innerHTML = "";

                if (url) {
                    // Si es un enlace, creamos un elemento <a> y lo agregamos al elemento principal
                    const linkElement = document.createElement("a");
                    linkElement.href = url;
                    linkElement.target = "_blank";
                    linkElement.rel = "noopener nofollow noreferrer";

                    // Creamos un contenedor <span> para envolver el texto y el elemento <strong>
                    const spanElement = document.createElement("span");
                    spanElement.innerHTML = text;

                    // Creamos el elemento <i> y lo agregamos al enlace
                    const iconElement = document.createElement("i");
                    iconElement.className = "ri-external-link-line";
                    linkElement.appendChild(spanElement);
                    linkElement.appendChild(iconElement);

                    // Agregamos el enlace al elemento principal
                    element.appendChild(linkElement);
                } else {
                    // Si no es un enlace, simplemente agregamos el texto al elemento principal
                    element.innerHTML = text;
                }
            }
        });
        document.getElementById('contactButton').textContent = dataLanguage.sections.aboutSection.contactButton;

        const downloadButton = document.getElementById('downloadButton');
        if (downloadButton) {
            downloadButton.textContent = dataLanguage.sections.aboutSection.downloadButton.text;
        }
        // Actualizar contenido de la sección "skills"
        document.getElementById('skillsSubtitle').innerHTML = dataLanguage.sections.skillsSection.subtitle;
        document.getElementById('skillsTitle').textContent = dataLanguage.sections.skillsSection.title;
        document.getElementById('skillsDescription').textContent = dataLanguage.sections.skillsSection.description;
        document.getElementById('skillsButton').textContent = dataLanguage.sections.skillsSection.button;

        // Actualizar grupos de habilidades
        dataLanguage.sections.skillsSection.groups.forEach((group, index) => {
            const startNumber = group.start;
            const groupElement = document.getElementById(`skillsGroup${index + 1}`);
            if (groupElement) {
                groupElement.innerHTML = ""; // Limpiamos el contenido existente

                group.items.forEach((item, itemIndex) => {
                    const listItemElement = document.createElement("li");
                    listItemElement.className = "skills__item";
                    listItemElement.textContent = item;
                    groupElement.appendChild(listItemElement);
                });
            }
        });

        // Actualizar contenido de la sección "services"
        const servicesContainer = document.getElementById("services-container");
        const servicesSubtitleText = document.getElementById("servicesSubtitleText");
        const servicesSubtitleSpan = document.getElementById("servicesSubtitleSpan");
        const servicesTitleText = document.getElementById("servicesTitleText");

        // Limpiar contenido existente
        servicesContainer.innerHTML = "";

        // Agregar nuevos servicios
        dataLanguage.sections.servicesSection.dataServices.forEach(servicio => {
            const article = document.createElement("article");
            article.className = "services__card";

            const icono = document.createElement("i");
            icono.className = servicio.icon + " services__icon";

            const titulo = document.createElement("h2");
            titulo.className = "services__title";
            titulo.textContent = servicio.title;

            const descripcion = document.createElement("p");
            descripcion.className = "services__description";
            descripcion.textContent = servicio.description;

            article.appendChild(icono);
            article.appendChild(titulo);
            article.appendChild(descripcion);

            servicesContainer.appendChild(article);
        });

        // Actualizar subtítulo y título de la sección "services"
        servicesSubtitleText.textContent = dataLanguage.sections.servicesSection.subtitle;
        servicesSubtitleSpan.textContent = dataLanguage.sections.servicesSection.subtitleSpan;
        servicesTitleText.textContent = dataLanguage.sections.servicesSection.title;


        // Actualizar contenido de la sección "projects"
        const projectsContainer = document.getElementById('projects-container');
        const projectsSubtitleText = document.getElementById('projectsSubtitleText');
        const projectsSubtitleSpan = document.getElementById('projectsSubtitleSpan');
        const projectsTitle = document.getElementById('projectsTitle');

        if (projectsContainer && projectsSubtitleText && projectsSubtitleSpan && projectsTitle) {
            // Actualizar subtítulo y título
            projectsSubtitleText.textContent = dataLanguage.sections.projectsSection.subtitle;
            projectsSubtitleSpan.textContent = dataLanguage.sections.projectsSection.subtitleSpan;
            projectsTitle.textContent = dataLanguage.sections.projectsSection.title;

            // Limpiar contenido existente
            projectsContainer.innerHTML = "";

            // Agregar nuevos proyectos
            dataLanguage.sections.projectsSection.dataProjects.forEach(project => {
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
                demoLink.textContent = 'View demo ';

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
        }


        document.getElementById('contactSubtitleText').textContent = dataLanguage.sections.contactSection.subtitle;
        document.getElementById('contactSubtitleSpan').textContent = dataLanguage.sections.contactSection.subtitleSpan;
        document.getElementById('contactTitle').textContent = dataLanguage.sections.contactSection.title;
        document.getElementById('nameLabel').textContent = dataLanguage.sections.contactSection.form.nameLabel;
        document.getElementById('emailLabel').textContent = dataLanguage.sections.contactSection.form.emailLabel;
        document.getElementById('messageLabel').textContent = dataLanguage.sections.contactSection.form.messageLabel;
        document.getElementById('user_name').placeholder = dataLanguage.sections.contactSection.form.namePlaceholder;
        document.getElementById('user_email').placeholder = dataLanguage.sections.contactSection.form.emailPlaceholder;
        document.getElementById('user_description').placeholder = dataLanguage.sections.contactSection.form.messagePlaceholder;
        document.getElementById('submitButton').textContent = dataLanguage.sections.contactSection.submitButton;


        // Actualizar contenido de la sección de íconos flotantes
        const phoneIconText = document.getElementById('phoneIconText');
        const phoneIconTooltip = document.getElementById('phoneIconTooltip');

        if (phoneIconText && phoneIconTooltip) {
            phoneIconText.textContent = dataLanguage.sections.floatIconsSection.phone.text;
            phoneIconTooltip.textContent = dataLanguage.sections.floatIconsSection.phone.tooltip;

        }
        //
        const footerData = dataLanguage.footer;

        // Actualizar contenido de la sección de footer
        document.getElementById('footerEducation').textContent = footerData.footerEducation;
        document.getElementById('copyright').textContent = footerData.copyright;
        document.getElementById('lastUpdatedText').textContent = footerData.lastUpdatedText;
        document.getElementById('emailText').textContent = footerData.emailText;



    } catch (error) {
        console.error(error);
    }
};

// Función para cambiar el idioma al hacer clic
const onChangeLanguage = async () => {
    try {
        const selectedLanguage = languageSelect.value;
        const requestLanguage = await fetch(`public/assets/js/language/${selectedLanguage}.json`);
        const dataLanguage = await requestLanguage.json();
        //console.log("dataLanguage", selectedLanguage);
        //console.log(JSON.stringify(dataLanguage, null, 2));

        // Inicializar o actualizar el contenido al cambiar el idioma
        lastUpdateDate(selectedLanguage);
        updateLanguageContent(dataLanguage);
    } catch (error) {
        console.error(error);
    }
};

// Llamada inicial para cargar el contenido en el idioma actual
onChangeLanguage();
// Escuchar cambios en el selector de idioma
languageSelect.addEventListener('change', onChangeLanguage);