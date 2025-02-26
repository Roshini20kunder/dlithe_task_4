document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("searchBox");
    const addRowButton = document.getElementById("addRowButton");
    const portfolioTable = document.getElementById("portfolioTable").querySelector("tbody");
    const nameInput = document.getElementById("nameInput");
    const categoryInput = document.getElementById("categoryInput");
    const usernameDisplay = document.getElementById("usernameDisplay");

    // ✅ Live Search Functionality
    searchBox.addEventListener("keyup", () => {
        const filter = searchBox.value.trim().toLowerCase();
        document.querySelectorAll("#portfolioTable tbody tr").forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? "" : "none";
        });
    });

    // ✅ Add New Row to Table
    addRowButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const category = categoryInput.value.trim();

        if (name && category) {
            const newRow = portfolioTable.insertRow();
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${category}</td>
                <td><button class="delete-btn">Delete</button></td>
            `;

            nameInput.value = "";
            categoryInput.value = "";
        } else {
            alert("Please enter both name and category");
        }
    });

    // ✅ Delete Row Using Event Delegation
    portfolioTable.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            event.target.closest("tr").remove();
        }
    });

    // ✅ Simulated User Login and Logout
    const username = localStorage.getItem("username") || "User";
    usernameDisplay.textContent = username;

    window.logout = function () {
        localStorage.removeItem("username");
        window.location.href = "login.html"; // Redirect to login page
    };
});
