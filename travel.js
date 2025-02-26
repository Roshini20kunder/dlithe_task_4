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
    const container = document.querySelector(".destination-container");

    const travelData = [
        { id: 1, title: "Paris, France", image: "paris.jpg", description: "The City of Love.", cost: 2500, distance: 4500 },
        { id: 2, title: "Bali, Indonesia", image: "bali.jpg", description: "Tropical paradise.", cost: 1500, distance: 3500 },
        { id: 3, title: "New York, USA", image: "newyork.jpg", description: "The Big Apple.", cost: 3000, distance: 7000 },
        { id: 4, title: "Tokyo, Japan", image: "tokyo.jpg", description: "Tech meets tradition.", cost: 2800, distance: 8000 },
        { id: 5, title: "Santorini, Greece", image: "santorini.jpg", description: "Breathtaking sunsets.", cost: 2000, distance: 3000 }
    ];

    function loadDestinations(filteredData) {
        container.innerHTML = filteredData.length
            ? filteredData.map(destination => `
                <div class="destination-card" data-id="${destination.id}">
                    <img src="${destination.image}" alt="${destination.title}" class="destination-image">
                    <h2>${destination.title}</h2>
                </div>
            `).join('')
            : `<p>No destinations found.</p>`;

        document.querySelectorAll(".destination-card").forEach(card => 
            card.addEventListener("click", () => showDestinationDetails(
                travelData.find(dest => dest.id == card.dataset.id)
            ))
        );
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
        const searchQuery = searchInput.value.toLowerCase();
        const selectedCost = costFilter.value;
        const selectedDistance = distanceFilter.value;

        const filtered = travelData.filter(dest => {
            const matchesSearch = dest.title.toLowerCase().includes(searchQuery);
            const matchesCost = selectedCost === "all" || 
                (selectedCost === "low" && dest.cost < 2000) || 
                (selectedCost === "medium" && dest.cost >= 2000 && dest.cost <= 3000) || 
                (selectedCost === "high" && dest.cost > 3000);

            const matchesDistance = selectedDistance === "all" || 
                (selectedDistance === "short" && dest.distance <= 3000) || 
                (selectedDistance === "medium" && dest.distance > 3000 && dest.distance <= 6000) || 
                (selectedDistance === "long" && dest.distance > 6000);

            return matchesSearch && matchesCost && matchesDistance;
        });

        loadDestinations(filtered);
    }

    searchInput.addEventListener("input", filterDestinations);
    costFilter.addEventListener("change", filterDestinations);
    distanceFilter.addEventListener("change", filterDestinations);

    closeModalButtons.forEach(button => 
        button.addEventListener("click", () => {
            modal.style.animation = "fadeOut 0.3s";
            setTimeout(() => {
                modal.style.display = "none";
                modal.style.animation = "";
            }, 250);
            registrationModal.style.display = "none";
        })
    );

    loadDestinations(travelData);
});
