const searchForm = document.getElementById("searchForm");
const keywordInput = document.getElementById("keyword");
const locationInput = document.getElementById("location");
const jobCards = document.querySelectorAll(".job-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("noResults");
const themeBtn = document.getElementById("themeBtn");

let currentFilter = "all";

// Search and filter jobs
function filterJobs() {
    const keyword = keywordInput.value.trim().toLowerCase();
    const location = locationInput.value.trim().toLowerCase();
    let count = 0;

    jobCards.forEach((card) => {
        const title = card.dataset.title.toLowerCase();
        const type = card.dataset.type.toLowerCase();
        const city = card.dataset.location.toLowerCase();
        const text = card.innerText.toLowerCase();

        const matchesKeyword = !keyword || title.includes(keyword) || text.includes(keyword);

        const matchesLocation = !location || city.includes(location);

        const matchesType =
            currentFilter === "all" || type === currentFilter;

        const show =
            matchesKeyword && matchesLocation && matchesType;

        card.hidden = !show;

        if (show) count++;
    });

    noResults.hidden = count > 0;
}

// Search button
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    filterJobs();

    document.getElementById("jobs").scrollIntoView({
        behavior: "smooth"
    });
});

// Live search
keywordInput.addEventListener("input", filterJobs);
locationInput.addEventListener("input", filterJobs);

// IT and Non-IT filters
filterButtons.forEach((button) => {
    button.addEventListener("click", function() {
        currentFilter = this.dataset.filter;

        filterButtons.forEach((btn) => {
            btn.classList.remove("selected");
        });

        this.classList.add("selected");
        filterJobs();
    });
});

// Apply button demo
document.querySelectorAll(".apply-btn").forEach((button) => {
    button.addEventListener("click", function() {
        alert(
            "You selected: " + this.dataset.job +
            "\n\nThis is a demo project. A real application form is not connected."
        );
    });
});

// Dark mode toggle
themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");

    themeBtn.innerHTML = darkMode ?
        '<i class="fa-solid fa-sun"></i>' :
        '<i class="fa-solid fa-moon"></i>';
});