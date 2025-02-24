document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("travelModal");
    const registrationModal = document.getElementById("registrationModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const modalCost = document.getElementById("modalCost");
    const modalDistance = document.getElementById("modalDistance");
    const closeModalButtons = document.querySelectorAll(".close-btn");
    const searchInput = document.getElementById("searchInput");
    const costFilter = document.getElementById("costFilter");
    const distanceFilter = document.getElementById("distanceFilter");

    const travelData = [
        { id: 1, title: "Paris, France", image: "paris.jpg", description: "The City of Love.", cost: 2500, distance: 4500 },
        { id: 2, title: "Bali, Indonesia", image: "bali.jpg", description: "Tropical paradise.", cost: 1500, distance: 3500 },
        { id: 3, title: "New York, USA", image: "newyork.jpg", description: "The Big Apple.", cost: 3000, distance: 7000 },
        { id: 4, title: "Tokyo, Japan", image: "tokyo.jpg", description: "Tech meets tradition.", cost: 2800, distance: 8000 },
        { id: 5, title: "Santorini, Greece", image: "santorini.jpg", description: "Breathtaking sunsets.", cost: 2000, distance: 3000 }
    ];

    function loadDestinations(filteredData) {
        const container = document.querySelector(".destination-container");
        container.innerHTML = "";
        if (filteredData.length === 0) {
            container.innerHTML = `<p>No destinations found.</p>`;
            return;
        }
        filteredData.forEach(destination => {
            const card = document.createElement("div");
            card.classList.add("destination-card");
            card.setAttribute("data-id", destination.id);
            card.innerHTML = `
                <img src="${destination.image}" class="destination-image">
                <h2>${destination.title}</h2>
            `;
            card.addEventListener("click", () => showDestinationDetails(destination));
            container.appendChild(card);
        });
    }

    function showDestinationDetails(destination) {
        modalTitle.textContent = destination.title;
        modalImage.src = destination.image;
        modalDescription.textContent = destination.description;
        modalCost.textContent = `$${destination.cost}`;
        modalDistance.textContent = `${destination.distance} km`;
        modal.style.display = "flex";
    }

    function filterDestinations() {
        let filtered = travelData;

        const searchQuery = searchInput.value.toLowerCase();
        const selectedCost = costFilter.value;
        const selectedDistance = distanceFilter.value;

        if (searchQuery) {
            filtered = filtered.filter(dest => dest.title.toLowerCase().includes(searchQuery));
        }

        if (selectedCost !== "all") {
            filtered = filtered.filter(dest => {
                if (selectedCost === "low") return dest.cost < 2000;
                if (selectedCost === "medium") return dest.cost >= 2000 && dest.cost <= 3000;
                if (selectedCost === "high") return dest.cost > 3000;
            });
        }

        if (selectedDistance !== "all") {
            filtered = filtered.filter(dest => {
                if (selectedDistance === "short") return dest.distance <= 3000;
                if (selectedDistance === "medium") return dest.distance > 3000 && dest.distance <= 6000;
                if (selectedDistance === "long") return dest.distance > 6000;
            });
        }

        loadDestinations(filtered);
    }

    searchInput.addEventListener("input", filterDestinations);
    costFilter.addEventListener("change", filterDestinations);
    distanceFilter.addEventListener("change", filterDestinations);

    closeModalButtons.forEach(button => button.addEventListener("click", () => {
        modal.style.display = "none";
        registrationModal.style.display = "none";
    }));

    loadDestinations(travelData);
});
