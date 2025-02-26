document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const destination = document.getElementById("destination").value;

    if (name && email && destination) {
        alert(`Thank you, ${name}! You have successfully registered for a trip to ${destination}.`);
        window.location.href = "travel.html";
    } else {
        alert("Please fill in all fields.");
    }
});

