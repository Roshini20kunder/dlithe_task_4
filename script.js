document.getElementById("searchBox").addEventListener("keyup", function() {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll("#dataTable tr:not(:first-child)");
    
    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});

document.getElementById("addRowButton").addEventListener("click", function() {
    let table = document.getElementById("dataTable");
    let name = document.getElementById("nameInput").value;
    let category = document.getElementById("categoryInput").value;
    
    if (name && category) {
        let newRow = table.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        
        cell1.textContent = name;
        cell2.textContent = category;
        
        document.getElementById("nameInput").value = "";
        document.getElementById("categoryInput").value = "";
    } else {
        alert("Please enter both name and category");
    }
});