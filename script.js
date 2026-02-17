// =========================
// Scroll Reveal (IntersectionObserver)
// =========================
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-stagger, .reveal-left, .reveal-right"
);

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target); // anima 1 vez
      }
    });
  },
  {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealElements.forEach((el) => observer.observe(el));


// =========================
// i18n (ES/EN)
// =========================
const translations = {
  en: {
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.engineering": "Engineering",
    "nav.contact": "Contact",

    "hero.title": "Luciana Moretto",
    "hero.subtitle": "Building scalable digital systems.",
    "hero.description": "Software Engineering Student · Java · Full-Stack in Progress · Architecture Driven",

    "buttons.projects": "View Projects",
    "buttons.contact": "Let’s Talk →",
    "buttons.cv": "Download CV",

    "projects.title": "Selected Projects",
    "projects.p1": "Short description of the project explaining the problem solved and technologies used.",
    "projects.p2": "Another strong project showcasing architecture, backend integration or UI design.",
    "projects.p3": "A third project that highlights problem solving and clean implementation.",

    "about.title": "About Me",
    "about.description1": "I am a Software Engineering student focused on building clean, scalable systems.",
    "about.description2": "My approach combines strong backend architecture with modern frontend experiences.",
    "about.description3": "I am passionate about learning new technologies and applying best practices in software development.",
    "about.description4": "I currently excel in these technologies:",

    "engineering.title": "How I Think Software",
    "engineering.principles.clean": "Clean Architecture",
    "engineering.principles.solid": "SOLID Principles",
    "engineering.principles.modular": "Modular Design",
    "engineering.principles.scalability": "Scalability Focus",

    "contact.title": "Let’s Connect",
    "contact.description": "Interested in collaborating or working together? Feel free to reach out."
  },

  es: {
    "nav.projects": "Proyectos",
    "nav.about": "Sobre mí",
    "nav.engineering": "Ingeniería",
    "nav.contact": "Contacto",

    "hero.title": "Luciana Moretto",
    "hero.subtitle": "Construyendo sistemas digitales escalables.",
    "hero.description": "Estudiante de Ingeniería de Software · Java · Full-Stack en progreso · Orientada a arquitectura",

    "buttons.projects": "Ver proyectos",
    "buttons.contact": "Hablemos →",
    "buttons.cv": "Descargar CV",

    "projects.title": "Proyectos destacados",
    "projects.p1": "Descripción breve del proyecto: problema resuelto y tecnologías usadas.",
    "projects.p2": "Otro proyecto fuerte que muestra arquitectura, integración backend o diseño UI.",
    "projects.p3": "Un tercer proyecto que destaca resolución de problemas e implementación limpia.",

    "about.title": "Sobre mí",
    "about.description1": "Soy estudiante de Ingeniería de Software enfocada en construir sistemas limpios y escalables.",
    "about.description2": "Mi enfoque combina una sólida arquitectura backend con experiencias modernas de frontend.",
    "about.description3": "Me apasiona aprender nuevas tecnologías y aplicar buenas prácticas en el desarrollo de software.",
    "about.description4": "Actualmente me destaco en estas tecnologías:",

    "engineering.title": "Cómo pienso el software",
    "engineering.principles.clean": "Arquitectura limpia",
    "engineering.principles.solid": "Principios SOLID",
    "engineering.principles.modular": "Diseño modular",
    "engineering.principles.scalability": "Enfoque en escalabilidad",

    "contact.title": "Conectemos",
    "contact.description": "¿Te interesa colaborar o trabajar juntos? Escribime."
  }
};

// CV files per language (adjust filenames if you want)
const cvByLang = {
  en: "cv/Luciana_Moretto_CV_EN.pdf",
  es: "cv/Luciana_Moretto_CV_ES.pdf"
};

function setCvLink(lang){
  const cvLink = document.getElementById("cv-link");
  if (!cvLink) return;

  const href = cvByLang[lang] || cvByLang.en;
  cvLink.setAttribute("href", href);

  // Accessible label updates too
  const label = lang === "es" ? "Descargar CV" : "Download CV";
  cvLink.setAttribute("aria-label", label);
}

function setLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.documentElement.lang = lang;

  // Cambia textos según data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = dict[key];
    if (value === undefined) return;

    if ((el.tagName === "INPUT" || el.tagName === "TEXTAREA") && "placeholder" in el) {
      el.placeholder = value;
    } else {
      el.textContent = value;
    }
  });

  // Actualiza CV (texto ya se actualiza por data-i18n, acá solo el link)
  setCvLink(lang);

  // Guardar preferencia
  localStorage.setItem("lang", lang);

  // UI botones activos
  const btnES = document.getElementById("lang-es");
  const btnEN = document.getElementById("lang-en");
  if (btnES && btnEN) {
    btnES.classList.toggle("active", lang === "es");
    btnEN.classList.toggle("active", lang === "en");
  }
}

// Botones
document.getElementById("lang-es")?.addEventListener("click", () => setLanguage("es"));
document.getElementById("lang-en")?.addEventListener("click", () => setLanguage("en"));

// Idioma inicial: localStorage -> navegador -> en
const saved = localStorage.getItem("lang");
const browser = (navigator.language || "en").slice(0, 2);
const initialLang = saved || (translations[browser] ? browser : "en");
setLanguage(initialLang);
