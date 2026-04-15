const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const tabbedProfiles = document.querySelectorAll(".tabbed-profile");

if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
}

tabbedProfiles.forEach((profile) => {
    const panels = Array.from(profile.querySelectorAll(".tab-panel"));
    const label = profile.querySelector("#profile-section-label");
    const prevButton = profile.querySelector('[data-carousel-direction="prev"]');
    const nextButton = profile.querySelector('[data-carousel-direction="next"]');

    function setActivePanel(nextIndex) {
        panels.forEach((panel, index) => {
            const isActive = index === nextIndex;
            panel.classList.toggle("is-active", isActive);
            panel.hidden = !isActive;
        });

        if (label) {
            label.textContent = panels[nextIndex]?.dataset.panelLabel || "";
        }
    }

    function getActiveIndex() {
        return panels.findIndex((panel) => !panel.hidden);
    }

    prevButton?.addEventListener("click", () => {
        const activeIndex = getActiveIndex();
        const nextIndex = activeIndex <= 0 ? panels.length - 1 : activeIndex - 1;
        setActivePanel(nextIndex);
    });

    nextButton?.addEventListener("click", () => {
        const activeIndex = getActiveIndex();
        const nextIndex = activeIndex >= panels.length - 1 ? 0 : activeIndex + 1;
        setActivePanel(nextIndex);
    });
});
