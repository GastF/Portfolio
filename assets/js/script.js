// script.js

// NAVIGATION

const navButtons =
    document.querySelectorAll(".nav-button");

const sections =
    document.querySelectorAll(".page-section");

navButtons.forEach(button =>
{
    button.addEventListener("click", () =>
    {
        navButtons.forEach(btn =>
            btn.classList.remove("active"));

        button.classList.add("active");

        const targetSection =
            button.dataset.section;

        sections.forEach(section =>
        {
            section.classList.add("hidden-section");
        });

        document
            .getElementById(targetSection)
            .classList.remove("hidden-section");
    });
});

// FILTERS

const filterButtons =
    document.querySelectorAll(".filter-button");

const cards =
    document.querySelectorAll(".project-card");

filterButtons.forEach(button =>
{
    button.addEventListener("click", () =>
    {
        filterButtons.forEach(btn =>
            btn.classList.remove("active"));

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        cards.forEach(card =>
        {
            const categories =
                card.dataset.category;

            if(filter === "all")
            {
                card.style.display = "block";
            }
            else
            {
                card.style.display =
                    categories.includes(filter)
                        ? "block"
                        : "none";
            }
        });
    });
});