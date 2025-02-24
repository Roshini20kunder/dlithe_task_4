document.getElementById("searchBox").addEventListener("keyup", function() {
    let filter = this.value.trim().toLowerCase();
    let rows = document.querySelectorAll("#portfolioTable tbody tr");
    
    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});

document.getElementById("addRowButton").addEventListener("click", function() {
    let table = document.getElementById("portfolioTable").getElementsByTagName('tbody')[0];
    let nameInput = document.getElementById("nameInput");
    let categoryInput = document.getElementById("categoryInput");
    let name = nameInput.value.trim();
    let category = categoryInput.value.trim();
    
    if (name && category) {
        let newRow = table.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        
        cell1.textContent = name;
        cell2.textContent = category;
        
        nameInput.value = "";
        categoryInput.value = "";
    } else {
        alert("Please enter both name and category");
    }
});
// Simulate getting the username from a login process
const username = localStorage.getItem('username') || 'User ';
document.getElementById('usernameDisplay').textContent = username;

function logout() {
    // Clear user session (this is just a simulation)
    localStorage.removeItem('username');
    window.location.href = 'login.html'; // Redirect to login page
}