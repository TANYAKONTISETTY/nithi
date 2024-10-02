// Select all checkboxes for games
const gameCheckboxes = document.querySelectorAll('input[name="game"]');
const subtotalDisplay = document.getElementById('subtotal-amount');

// Function to calculate and update subtotal
function calculateSubtotal() {
    let subtotal = 0;

    // Loop through each checkbox
    gameCheckboxes.forEach(checkbox => {
        // If the checkbox is checked, add its price to the subtotal
        if (checkbox.checked) {
            subtotal += parseInt(checkbox.getAttribute('data-price'));
        }
    });

    // Update the subtotal display
    subtotalDisplay.textContent = `₹${subtotal}`;
    document.getElementById("total_amount").value = subtotal; // Store the subtotal in a hidden field if needed
}

// Attach event listener to each checkbox
gameCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculateSubtotal);
});

// Player Count Logic
let playerCount = 1;
const maxPlayers = 11;
const minPlayers = 1;

function addPlayer() {
    if (playerCount < maxPlayers) {
        playerCount++;
        let newPlayer = document.createElement("input");
        newPlayer.setAttribute("type", "text");
        newPlayer.setAttribute("name", "player_name[]");
        newPlayer.setAttribute("placeholder", `Player ${playerCount}`);
        document.getElementById("player-names").appendChild(newPlayer);
        document.getElementById("player-names").appendChild(document.createElement("br"));
    }
}

function removePlayer() {
    if (playerCount > minPlayers) {
        let playerNames = document.getElementById("player-names");
        playerNames.removeChild(playerNames.lastChild);  // remove <br> too
        playerNames.removeChild(playerNames.lastChild);
        playerCount--;
    }
}

// Ensure form validation and subtotal calculation after DOM has loaded
document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registration-form");
    const subtotalElement = document.getElementById("subtotal-amount");

    // Ensure that the subtotal is updated on form change
    registrationForm.addEventListener("change", updateSubtotal);
});

function updateSubtotal() {
    let subtotal = 0;
    const games = document.querySelectorAll('input[name="game[]"]:checked');
    games.forEach((game) => {
        subtotal += parseInt(game.getAttribute("data-price"));
    });
    subtotalElement.textContent = `₹${subtotal}`;
    document.getElementById("total_amount").value = subtotal; // Store the subtotal in a hidden field if needed

    // Ensure subtotal section is visible at the bottom
    const subtotalSection = document.getElementById("subtotal-section");
    subtotalSection.scrollIntoView({ behavior: "smooth", block: "end" });
}

// Event listeners for dynamically adding/removing players
document.getElementById('add-player').addEventListener('click', addPlayer);
document.getElementById('remove-player').addEventListener('click', removePlayer);

// Validation for form submission
document.querySelector('form').addEventListener('submit', function(event) {
    const checkboxes = document.querySelectorAll('input[name="game"]:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one game to register.');
        event.preventDefault(); // Prevent form submission if no game is selected
    }

    const transactionId = document.getElementById('transaction-id').value;
    const regex = /^[A-Za-z0-9]{12}$/;
    if (!regex.test(transactionId)) {
        alert('Please enter a valid Transaction ID consisting of exactly 12 alphanumeric characters.');
        event.preventDefault(); // Prevent form submission if invalid Transaction ID is entered
    }
});

// Show bank details if the Bank Transfer payment method is selected
document.getElementById("payment-form").addEventListener("change", function() {
    const bankDetails = document.getElementById("bank-details");
    if (document.getElementById("bank-transfer").checked) {
        bankDetails.style.display = "block";
    } else {
        bankDetails.style.display = "none";
    }
});
