// ES6+ Enhanced JavaScript Code

// Object to manage table operations
const tableManager = {
    table: document.getElementById("dataTable"),

    // Function to filter table rows based on search input
    filterRows(filter) {
        let rows = document.querySelectorAll("#dataTable tr:not(:first-child)");
        rows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
        });
    },

    // Function to add a new row dynamically
    addRow(name, category) {
        if (name && category) {
            let newRow = this.table.insertRow();
            newRow.innerHTML = `<td>${name}</td><td>${category}</td><td><button class="delete-btn">Delete</button></td>`;
            
            document.getElementById("nameInput").value = "";
            document.getElementById("categoryInput").value = "";

            // Attach delete functionality to the new button
            newRow.querySelector(".delete-btn").addEventListener("click", function() {
                newRow.remove();
            });
        } else {
            alert("Please enter both name and category");
        }
    }
};

// Event Listener for Search Box
document.getElementById("searchBox").addEventListener("keyup", function() {
    tableManager.filterRows(this.value.toLowerCase());
});

// Event Listener for Add Row Button
document.getElementById("addRowButton").addEventListener("click", function() {
    let name = document.getElementById("nameInput").value;
    let category = document.getElementById("categoryInput").value;
    tableManager.addRow(name, category);
});

// Function to initialize default rows
const initializeTable = () => {
    const defaultData = [
        { name: "John Doe", category: "Employee" },
        { name: "Jane Smith", category: "Manager" },
        { name: "Alice Johnson", category: "Developer" }
    ];
    
    defaultData.forEach(({ name, category }) => tableManager.addRow(name, category));
};

// Call function on page load
document.addEventListener("DOMContentLoaded", initializeTable);

// Using ES6+ Features
const extraCategories = ["Books", "Movies", "Music"];
console.log("Extra Categories:", ...extraCategories);

// Using Template Literals & Destructuring
const [firstCategory, ...otherCategories] = extraCategories;
console.log(`First Category: ${firstCategory}, Other Categories: ${otherCategories.join(", ")}`);
