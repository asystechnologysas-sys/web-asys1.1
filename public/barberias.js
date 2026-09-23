/* =========================================================
   ASYS TECHNOLOGY
   SOFTWARE PARA BARBERÍAS
   JAVASCRIPT
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const WHATSAPP_NUMBER = "573117304768";


/* =========================================================
   RECORRIDO INMERSIVO DEL PRODUCTO
   Un único listener ligero actualiza la escena durante el scroll.
========================================================= */

const productJourney = document.querySelector(".product-journey");
let journeyFramePending = false;

function actualizarRecorrido() {

    journeyFramePending = false;

    if (!productJourney) return;

    const rect = productJourney.getBoundingClientRect();
    const distancia = Math.max(productJourney.offsetHeight - window.innerHeight, 1);
    const progreso = Math.min(1, Math.max(0, -rect.top / distancia));
    const paso = Math.min(4, Math.floor(progreso * 5));

    productJourney.dataset.step = paso;

    const barra = productJourney.querySelector(".journey-progress span");

    if (barra) {
        barra.style.width = `${progreso * 100}%`;
    }

}

if (productJourney) {

    actualizarRecorrido();

    window.addEventListener("scroll", () => {

        if (journeyFramePending) return;

        journeyFramePending = true;
        requestAnimationFrame(actualizarRecorrido);

    }, { passive: true });

    window.addEventListener("resize", actualizarRecorrido);

}


/* =========================================================
   MENÚ MÓVIL
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const abierto = navLinks.classList.contains("open");

        menuToggle.textContent = abierto ? "✕" : "☰";

    });


    // Cerrar menú al seleccionar una opción

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.textContent = "☰";

        });

    });

}


/* =========================================================
   CAMBIO DEL HEADER AL HACER SCROLL
========================================================= */

const navbar = document.getElementById("navbar");

function actualizarNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {

        navbar.style.background =
            "rgba(255,255,255,.94)";

        navbar.style.boxShadow =
            "0 10px 30px rgba(27,34,79,.07)";

    } else {

        navbar.style.background =
            "rgba(255,255,255,.80)";

        navbar.style.boxShadow =
            "none";

    }

}

window.addEventListener(
    "scroll",
    actualizarNavbar
);

actualizarNavbar();


/* =========================================================
   SCROLL SUAVE
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", function (event) {

        const destino =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!destino) return;

        event.preventDefault();

        const headerHeight =
            navbar
                ? navbar.offsetHeight
                : 0;

        const posicion =
            destino.offsetTop -
            headerHeight -
            15;

        window.scrollTo({

            top: posicion,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   ANIMACIONES AL APARECER
========================================================= */

const elementosAnimados = document.querySelectorAll(
    ".problem-card, " +
    ".feature-card, " +
    ".plan-card, " +
    ".included-box, " +
    ".demo-content, " +
    ".phone-demo, " +
    ".faq-list, " +
    ".section-heading, " +
    ".cta-box"
);


elementosAnimados.forEach(elemento => {

    elemento.classList.add("animate-on-scroll");

});


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-shown");

            // Las tarjetas de precio tienen su propia animación y hover en CSS.
            // Se eliminan estos estilos inline al entrar en pantalla para no
            // bloquear sus transformaciones.
            if (entry.target.classList.contains("plan-card")) {

                entry.target.classList.add("price-card-ready");
                animarPrecio(entry.target);

            }

            observer.unobserve(entry.target);

        });

    },

    {
        threshold: 0.12
    }

);


elementosAnimados.forEach(elemento => {

    observer.observe(elemento);

});


/* Respaldo de scroll real: mantiene activas las entradas en cualquier navegador. */
const elementosScroll = [...elementosAnimados];
let scrollRevealPending = false;

function revelarConScroll() {

    scrollRevealPending = false;

    elementosScroll.forEach(elemento => {

        if (elemento.classList.contains("is-shown")) return;

        const limite = window.innerHeight * .88;

        if (elemento.getBoundingClientRect().top < limite) {
            elemento.classList.add("is-shown");

            if (elemento.classList.contains("plan-card")) {
                elemento.classList.add("price-card-ready");
                animarPrecio(elemento);
            }

        }

    });

}

window.addEventListener("scroll", () => {

    if (scrollRevealPending) return;

    scrollRevealPending = true;
    requestAnimationFrame(revelarConScroll);

}, { passive: true });

revelarConScroll();


/* =========================================================
   REVELADO SUAVE DE CONTENIDO AL HACER SCROLL
========================================================= */

const bloquesRevelables = document.querySelectorAll(
    ".center-heading, .cta-content, .faq-grid, .footer-main"
);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (reduceMotion.matches) {

    bloquesRevelables.forEach(bloque => {
        bloque.classList.add("scroll-reveal", "is-visible");
    });

} else {

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);

        });

    }, { threshold: .16 });

    bloquesRevelables.forEach((bloque, indice) => {

        bloque.classList.add("scroll-reveal");
        bloque.style.transitionDelay = `${Math.min(indice % 3, 2) * .08}s`;
        revealObserver.observe(bloque);

    });

}


/* =========================================================
   EFECTO DEL DASHBOARD
========================================================= */

const dashboard =
    document.querySelector(".dashboard-window");


const heroVisual =
    document.querySelector(".hero-visual");


if (dashboard && heroVisual) {

    heroVisual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const porcentajeX =
                (x / rect.width) - 0.5;

            const porcentajeY =
                (y / rect.height) - 0.5;

            const rotacionY =
                porcentajeX * 5;

            const rotacionX =
                porcentajeY * -3;

            dashboard.style.transform =
                `
                perspective(1200px)
                rotateY(${rotacionY - 3}deg)
                rotateX(${rotacionX + 2}deg)
                `;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            dashboard.style.transform =
                `
                perspective(1200px)
                rotateY(-5deg)
                rotateX(2deg)
                `;

        }
    );

}


/* =========================================================
   BOTONES DE PLANES
========================================================= */

const planButtons =
    document.querySelectorAll(".plan-button");


const selectedPlanName = document.getElementById("selectedPlanName");
const selectedPlanWhatsapp = document.getElementById("selectedPlanWhatsapp");

planButtons.forEach(button => {

    button.addEventListener("click", function () {

        const plan =
            this
                .closest(".plan-card")
                ?.querySelector(".plan-label")
                ?.textContent
                .trim();

        if (!plan) return;

        let mensaje = "";

        if (plan.includes("1 BARBERO")) {

            mensaje =
                "Hola ASYS, quiero información sobre el plan para 1 barbero.";

        }

        else if (plan.includes("2 BARBEROS")) {

            mensaje =
                "Hola ASYS, quiero información sobre el plan para 2 barberos.";

        }

        else {

            mensaje =
                "Hola ASYS, quiero información sobre el plan para 3 o más barberos.";

        }

        const enlace = generarWhatsApp(mensaje);
        const card = this.closest(".plan-card");
        const precio = card?.querySelector("[data-price]")?.dataset.price;

        this.href = enlace;

        document.querySelectorAll(".plan-card").forEach(otraTarjeta => {
            otraTarjeta.classList.toggle("selected", otraTarjeta === card);
        });

        if (selectedPlanName && precio) {
            selectedPlanName.textContent =
                `${plan} · $${formatearPrecio(Number(precio))} COP / mes`;
        }

        if (selectedPlanWhatsapp) {
            selectedPlanWhatsapp.href = enlace;
        }

    });

});


/* =========================================================
   GENERADOR DE WHATSAPP
========================================================= */

function generarWhatsApp(mensaje) {

    return (
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(mensaje)
    );

}


/* =========================================================
   WHATSAPP FLOTANTE
========================================================= */

const whatsappButton =
    document.querySelector(".whatsapp-button");


if (whatsappButton) {

    whatsappButton.addEventListener(
        "click",
        () => {

            const mensaje =
                "Hola ASYS, quiero conocer la solución para barberías.";

            whatsappButton.href =
                generarWhatsApp(mensaje);

        }
    );

}


/* =========================================================
   CTA PRINCIPAL
========================================================= */

const ctaButton =
    document.querySelector(".cta-button");

const ctaSecondary =
    document.querySelector(".cta-secondary");


if (ctaButton) {

    ctaButton.addEventListener(
        "click",
        () => {

            ctaButton.href = selectedPlanWhatsapp
                ? selectedPlanWhatsapp.href
                : generarWhatsApp(
                    "Hola ASYS, quiero conocer el sistema para barberías."
                );

        }
    );

}


/* =========================================================
   INTERACCIÓN CON LAS TARJETAS
========================================================= */

const cards =
    document.querySelectorAll(
        ".feature-card, .problem-card"
    );


cards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.transform =
                "translateY(-7px)";

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "translateY(0)";

        }
    );

});


/* =========================================================
   FAQ
========================================================= */

const preguntas =
    document.querySelectorAll(
        ".faq-list details"
    );


preguntas.forEach(pregunta => {

    pregunta.addEventListener(
        "toggle",
        () => {

            if (!pregunta.open) return;

            preguntas.forEach(otraPregunta => {

                if (
                    otraPregunta !== pregunta &&
                    otraPregunta.open
                ) {

                    otraPregunta.open = false;

                }

            });

        }
    );

});


/* =========================================================
   EFECTO DE LOS PLANES
========================================================= */

const planes =
    document.querySelectorAll(".plan-card");


planes.forEach(plan => {

    plan.addEventListener(
        "mouseenter",
        () => {

            planes.forEach(otro => {

                if (otro !== plan) {

                    otro.style.opacity = ".72";

                }

            });

        }
    );


    plan.addEventListener(
        "mouseleave",
        () => {

            planes.forEach(otro => {

                otro.style.opacity = "1";

            });

        }
    );

});


/* =========================================================
   DETECCIÓN DE SECCIÓN ACTIVA
========================================================= */

const secciones =
    document.querySelectorAll(
        "main section[id]"
    );


const enlacesNavegacion =
    document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const id =
                    entry.target.getAttribute("id");

                // Algunas escenas narrativas no tienen enlace propio en el
                // menú. En ellas se conserva el último enlace navegable.
                const enlaceDeSeccion = Array.from(enlacesNavegacion).find(
                    enlace => enlace.getAttribute("href") === `#${id}`
                );

                if (!enlaceDeSeccion) return;

                enlacesNavegacion.forEach(enlace => {

                    enlace.classList.remove(
                        "active"
                    );

                });

                enlaceDeSeccion.classList.add("active");

            });

        },

        {
            threshold: 0.35
        }

    );


secciones.forEach(seccion => {

    sectionObserver.observe(seccion);

});


/* =========================================================
   BOTONES DE CTA
========================================================= */

const botonesCTA =
    document.querySelectorAll(
        ".btn-primary, .nav-cta"
    );


botonesCTA.forEach(boton => {

    boton.addEventListener(
        "mouseenter",
        () => {

            boton.style.transform =
                "translateY(-2px)";

        }
    );


    boton.addEventListener(
        "mouseleave",
        () => {

            boton.style.transform =
                "translateY(0)";

        }
    );

});


/* =========================================================
   CONTADOR VISUAL DE PLANES
   Preparado para futuras modificaciones
========================================================= */

const precios = {

    uno: 35000,

    dos: 50000,

    tres: 70000

};


function formatearPrecio(valor) {

    return new Intl.NumberFormat(
        "es-CO"
    ).format(valor);

}

if (ctaSecondary) {

    ctaSecondary.addEventListener("click", () => {

        if (selectedPlanWhatsapp) {
            ctaSecondary.href = selectedPlanWhatsapp.href;
        }

    });

}


function animarPrecio(tarjeta) {

    const precio = tarjeta.querySelector("[data-price]");

    if (!precio || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const total = Number(precio.dataset.price);
    const inicio = performance.now();
    const duracion = 700;

    function actualizarPrecio(ahora) {

        const progreso = Math.min((ahora - inicio) / duracion, 1);
        const suavizado = 1 - Math.pow(1 - progreso, 3);
        const valor = Math.round((total * suavizado) / 1000) * 1000;

        precio.textContent = `$${formatearPrecio(valor)}`;

        if (progreso < 1) {
            requestAnimationFrame(actualizarPrecio);
        }

    }

    precio.textContent = "$0";
    requestAnimationFrame(actualizarPrecio);

}


/* =========================================================
   CONSOLA DE DESARROLLO
========================================================= */

console.log(
    "ASYS Technology | Sistema para Barberías cargado correctamente."
);

console.log(
    "Planes:",
    precios
);
