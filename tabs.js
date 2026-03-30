const tabLinks = document.querySelectorAll(".tab-link");
const tabPanels = document.querySelectorAll(".tab-panel");
const vacancyDetails = document.querySelectorAll(".vacancy-details");

function setActiveTab(targetId) {
    tabPanels.forEach((panel) => {
        panel.hidden = panel.id !== targetId;
    });

    tabLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.tab === targetId);
    });
}

function activateVacancyFromHash(targetId) {
    const targetVacancy = document.getElementById(targetId);

    if (!targetVacancy || !targetVacancy.classList.contains("vacancy-details")) {
        return false;
    }

    setActiveTab("vacancies");
    targetVacancy.open = true;
    targetVacancy.scrollIntoView();
    return true;
}

function activateTabFromHash() {
    const targetId = window.location.hash.replace("#", "");

    if (!targetId) {
        setActiveTab("about");
        return;
    }

    if (targetId === "about" || targetId === "vacancies") {
        setActiveTab(targetId);
        return;
    }

    if (activateVacancyFromHash(targetId)) {
        return;
    }
}

function updateHash(hash) {
    if (window.location.hash !== hash) {
        window.history.pushState(null, "", hash);
    }
}

tabLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const targetId = link.dataset.tab;
        setActiveTab(targetId);
        updateHash(`#${targetId}`);
        document.getElementById(targetId).scrollIntoView();
    });
});

vacancyDetails.forEach((detail) => {
    detail.addEventListener("toggle", () => {
        if (detail.open) {
            updateHash(`#${detail.id}`);
            return;
        }

        if (window.location.hash === `#${detail.id}`) {
            updateHash("#vacancies");
        }
    });
});

window.addEventListener("hashchange", activateTabFromHash);

activateTabFromHash();
