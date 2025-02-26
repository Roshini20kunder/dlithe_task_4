document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const dateFilter = document.getElementById("dateFilter");
    const popularityFilter = document.getElementById("popularityFilter");
    const newsContainer = document.querySelector(".news-container");

    const modal = document.getElementById("newsModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const closeBtn = document.querySelector(".close-btn");

    const newsData = [
        { id: 1, title: "Major Earthquake Hits City", image: "news-image1.jpg", category: "world", date: "2024-02-20", popularity: "high", content: "A devastating earthquake struck the city, causing widespread damage." },
        { id: 2, title: "Local Team Wins Championship", image: "news-image2.jpg", category: "sports", date: "2024-02-18", popularity: "medium", content: "The local team secured a stunning victory in the national championship." },
        { id: 3, title: "New Smartphone Released", image: "news-image3.jpg", category: "technology", date: "2024-02-15", popularity: "high", content: "A new smartphone with cutting-edge features has been released to the market." },
        { id: 4, title: "Flu Season Approaches", image: "news-image4.jpg", category: "health", date: "2024-02-10", popularity: "low", content: "Doctors warn about the upcoming flu season and recommend vaccinations." },
        { id: 5, title: "New Conservation Efforts Launched", image: "news-image5.jpg", category: "environment", date: "2024-02-12", popularity: "medium", content: "New initiatives have been launched to protect endangered species." }
    ];

    function loadNews(filteredNews) {
        newsContainer.innerHTML = "";
        if (filteredNews.length === 0) {
            newsContainer.innerHTML = `<p>No news articles found.</p>`;
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
            card.addEventListener("click", () => showModal(news));
            newsContainer.appendChild(card);
        });
    }

    function showModal(news) {
        modalTitle.textContent = news.title;
        modalImage.src = news.image;
        modalDescription.textContent = news.content;
        modal.style.display = "flex";
    }

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    function getDateRange(filter) {
        const today = new Date();
        if (filter === "today") {
            return [today.toISOString().split("T")[0]];
        } else if (filter === "week") {
            const weekAgo = new Date();
            weekAgo.setDate(today.getDate() - 7);
            return [weekAgo.toISOString().split("T")[0], today.toISOString().split("T")[0]];
        } else if (filter === "month") {
            const monthAgo = new Date();
            monthAgo.setMonth(today.getMonth() - 1);
            return [monthAgo.toISOString().split("T")[0], today.toISOString().split("T")[0]];
        }
        return null;
    }

    function filterNews() {
        let filtered = [...newsData];

        const searchQuery = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedDate = dateFilter.value;
        const selectedPopularity = popularityFilter.value;

        if (searchQuery) {
            filtered = filtered.filter(news => news.title.toLowerCase().includes(searchQuery));
        }
        if (selectedCategory !== "all") {
            filtered = filtered.filter(news => news.category === selectedCategory);
        }
        if (selectedDate !== "all") {
            const dateRange = getDateRange(selectedDate);
            if (dateRange.length === 1) {
                filtered = filtered.filter(news => news.date === dateRange[0]);
            } else {
                filtered = filtered.filter(news => news.date >= dateRange[0] && news.date <= dateRange[1]);
            }
        }
        if (selectedPopularity !== "all") {
            filtered = filtered.filter(news => news.popularity === selectedPopularity);
        }

        if (filtered.length === 0) {
            filtered = [...newsData]; // Show all news if no match found
        }

        loadNews(filtered);
    }

    searchInput.addEventListener("input", filterNews);
    categoryFilter.addEventListener("change", filterNews);
    dateFilter.addEventListener("change", filterNews);
    popularityFilter.addEventListener("change", filterNews);

    loadNews(newsData);
});
