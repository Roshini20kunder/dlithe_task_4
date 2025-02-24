document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("newsModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const modalDate = document.getElementById("modalDate");
    const modalCategory = document.getElementById("modalCategory");
    const closeModal = document.querySelector(".close-btn");

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const dateFilter = document.getElementById("dateFilter");

    const newsData = [
        { id: 1, title: "Major Earthquake Hits City", image: "news-image1.jpg", description: "A 7.8 earthquake struck the city, causing widespread panic.", category: "World", date: "2024-02-20" },
        { id: 2, title: "Local Team Wins Championship", image: "news-image2.jpg", description: "The local team secured the title in an intense final match.", category: "Sports", date: "2024-02-18" },
        { id: 3, title: "New Smartphone Released", image: "news-image3.jpg", description: "The latest smartphone with AI features is now available.", category: "Technology", date: "2024-02-22" },
        { id: 4, title: "Flu Season Approaches", image: "news-image4.jpg", description: "Health officials urge vaccinations ahead of flu season.", category: "Health", date: "2024-02-15" },
        { id: 5, title: "New Conservation Efforts Launched", image: "news-image5.jpg", description: "Authorities announce new initiatives for wildlife protection.", category: "Environment", date: "2024-02-10" }
    ];

    function loadNews(filteredNews) {
        const container = document.querySelector(".news-container");
        container.innerHTML = "";
        if (filteredNews.length === 0) {
            container.innerHTML = `<p>No news found.</p>`;
            return;
        }
        filteredNews.forEach(news => {
            const card = document.createElement("div");
            card.classList.add("news-card");
            card.setAttribute("data-id", news.id);
            card.innerHTML = `
                <img src="${news.image}" class="news-image">
                <h2>${news.title}</h2>
            `;
            card.addEventListener("click", () => showNewsDetails(news));
            container.appendChild(card);
        });
    }

    function showNewsDetails(news) {
        modalTitle.textContent = news.title;
        modalImage.src = news.image;
        modalDescription.textContent = news.description;
        modalDate.textContent = `Published on: ${news.date}`;
        modalCategory.textContent = `Category: ${news.category}`;
        modal.style.display = "flex";
    }

    function filterNews() {
        let filtered = newsData;

        const searchQuery = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedDate = dateFilter.value;

        if (searchQuery) {
            filtered = filtered.filter(news => news.title.toLowerCase().includes(searchQuery));
        }

        if (selectedCategory !== "all") {
            filtered = filtered.filter(news => news.category === selectedCategory);
        }

        if (selectedDate !== "all") {
            const today = new Date();
            filtered = filtered.filter(news => {
                const newsDate = new Date(news.date);
                if (selectedDate === "today") return newsDate.toDateString() === today.toDateString();
                if (selectedDate === "week") return (today - newsDate) / (1000 * 60 * 60 * 24) <= 7;
                if (selectedDate === "month") return (today - newsDate) / (1000 * 60 * 60 * 24) <= 30;
            });
        }

        loadNews(filtered);
    }

    searchInput.addEventListener("input", filterNews);
    categoryFilter.addEventListener("change", filterNews);
    dateFilter.addEventListener("change", filterNews);
    closeModal.addEventListener("click", () => modal.style.display = "none");

    loadNews(newsData);
});
