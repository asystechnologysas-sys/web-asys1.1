document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const isOpen =
                navLinks.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });

    }


    /* =====================================================
       ANIMACIONES AL HACER SCROLL
    ===================================================== */

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");
                    entry.target.classList.add("is-shown");

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    document
        .querySelectorAll(
            ".animate-on-scroll, .scroll-reveal"
        )
        .forEach(element => {

            observer.observe(element);

        });


    /* =====================================================
       DASHBOARD HERO
    ===================================================== */

    const dashboard = document.querySelector(
        ".dashboard-window"
    );

    const heroVisual = document.querySelector(
        ".hero-visual"
    );

    if (dashboard && heroVisual) {

        heroVisual.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth <= 700) return;

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 5;

                const rotateX =
                    ((y / rect.height) - 0.5) * -4;

                dashboard.style.transform =
                    `perspective(1200px)
                     rotateY(${rotateY - 5}deg)
                     rotateX(${rotateX + 2}deg)`;

            }
        );

        heroVisual.addEventListener(
            "mouseleave",
            () => {

                if (window.innerWidth <= 700) return;

                dashboard.style.transform =
                    "perspective(1200px) rotateY(-5deg) rotateX(2deg)";

            }
        );

    }


    /* =====================================================
       PLAN ASYS BARBER
       UN SOLO PLAN
    ===================================================== */

    const planCard = document.querySelector(
        ".plan-card"
    );

    const planButton = document.querySelector(
        ".plan-button"
    );

    const selectedPlanWhatsapp =
        document.getElementById(
            "selectedPlanWhatsapp"
        );

    const whatsappNumber =
        "573117304768";

    const planPrice =
        "$40.000 COP / mes";


    function createWhatsappLink() {

        const message =
            `Hola ASYS Technology, estoy interesado en ASYS Barber. Quiero conocer más sobre el plan de ${planPrice}.`;

        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    }


    if (planCard) {

        planCard.classList.add("selected");

    }


    if (planButton) {

        planButton.href =
            createWhatsappLink();

        planButton.target =
            "_blank";

        planButton.rel =
            "noopener noreferrer";

    }


    if (selectedPlanWhatsapp) {

        selectedPlanWhatsapp.href =
            createWhatsappLink();

        selectedPlanWhatsapp.target =
            "_blank";

        selectedPlanWhatsapp.rel =
            "noopener noreferrer";

    }


    /* =====================================================
       CTA WHATSAPP
    ===================================================== */

    const ctaButton =
        document.querySelector(".cta-button");

    if (ctaButton) {

        ctaButton.href =
            createWhatsappLink();

        ctaButton.target =
            "_blank";

        ctaButton.rel =
            "noopener noreferrer";

    }


    /* =====================================================
       BOTÓN WHATSAPP FLOTANTE
    ===================================================== */

    const whatsappButton =
        document.querySelector(
            ".whatsapp-button"
        );

    if (whatsappButton) {

        whatsappButton.href =
            createWhatsappLink();

        whatsappButton.target =
            "_blank";

        whatsappButton.rel =
            "noopener noreferrer";

    }


    /* =====================================================
       FAQ
    ===================================================== */

    const faqDetails =
        document.querySelectorAll(
            ".faq-list details"
        );

    faqDetails.forEach(detail => {

        detail.addEventListener(
            "toggle",
            () => {

                if (!detail.open) return;

                faqDetails.forEach(other => {

                    if (
                        other !== detail &&
                        other.open
                    ) {
                        other.open = false;
                    }

                });

            }
        );

    });


    /* =====================================================
       PRODUCT JOURNEY
    ===================================================== */

    const journey =
        document.querySelector(
            ".product-journey"
        );

    if (journey) {

        const totalSteps = 5;

        function updateJourney() {

            const rect =
                journey.getBoundingClientRect();

            const viewportHeight =
                window.innerHeight;

            const totalHeight =
                journey.offsetHeight;

            const scrollable =
                totalHeight - viewportHeight;

            const progress =
                Math.min(
                    Math.max(
                        -rect.top / scrollable,
                        0
                    ),
                    1
                );

            const step =
                Math.min(
                    totalSteps - 1,
                    Math.floor(
                        progress * totalSteps
                    )
                );

            journey.dataset.step =
                String(step);

            const progressBar =
                journey.querySelector(
                    ".journey-progress span"
                );

            if (progressBar) {

                progressBar.style.width =
                    `${progress * 100}%`;

            }

        }

        window.addEventListener(
            "scroll",
            updateJourney,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateJourney
        );

        updateJourney();

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       AÑO DEL FOOTER
    ===================================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom span"
        );

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} ASYS Technology. Todos los derechos reservados.`;

    }

});
