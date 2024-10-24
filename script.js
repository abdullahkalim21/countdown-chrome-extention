// Variables for the menu and theme change
const hamburgerMenu = document.getElementById('hamburger-menu');
const sideMenu = document.getElementById('side-menu');
const body = document.body;
const timerDisplay = document.getElementById('timer');
let timerInterval;

// Retrieve and start the countdown if a timer is saved
window.addEventListener('load', () => {
    const savedEndDate = localStorage.getItem('endDate');

    if (savedEndDate) {
        const eventDate = new Date(savedEndDate);

        // If the stored date is valid and in the future, start the countdown
        if (eventDate > new Date()) {
            startCountdown(eventDate);
        } else {
            timerDisplay.innerHTML = "Timer has expired. Please set a new timer.";
        }
    }
});

// Function to start the countdown
function startCountdown(eventDate) {
    function updateTimer() {
        const now = new Date();
        const timeLeft = eventDate - now;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            timerDisplay.innerHTML = "Event reached!";
            localStorage.removeItem('endDate'); // Remove expired timer
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        timerDisplay.innerHTML = `
            ${days} ${days === 1 || days == 0 ? 'DAY' : 'DAYS'} 
            ${hours} ${hours === 1 || hours === 0 ? 'HOUR' : 'HOURS'} 
            ${minutes} ${minutes === 1 || minutes === 0 ? 'MINUTE' : 'MINUTES'} 
            ${seconds} ${seconds === 1 || seconds == 0 ? 'SECOND' : 'SECONDS'}
        `;
    }

    // Update the timer every second
    timerInterval = setInterval(updateTimer, 1000);
}

// Timer Setting Logic
document.getElementById('set-timer').addEventListener('click', function () {
    const eventDate = new Date(document.getElementById('event-date').value);

    if (!eventDate || eventDate <= new Date()) {
        timerDisplay.innerHTML = "Please choose a future date.";
        return;
    }

    // Save the event date to localStorage
    localStorage.setItem('endDate', eventDate);

    // Start the countdown
    startCountdown(eventDate);
});

// Changing color of the Text
function getColorByRemainingTime(totalTime, remainingTime) {
    const percentage = remainingTime / totalTime; // Calculate percentage of time left
    const red = Math.floor(255 * (1 - percentage)); // Red color increases as time decreases
    const green = Math.floor(255 * percentage); // Green color decreases as time decreases
    const blue = 0; // Keep blue at 0 for red shades

    return `rgb(${red}, ${green}, ${blue})`; // Return the color as a string in RGB format
}

// Array of quotes
const quotes = [
    "Time is what we want most, but what we use worst.",
    "You may delay, but time will not.",
    "Time flies over us, but leaves its shadow behind.",
    "Lost time is never found again.",
    "The future depends on what you do today.",
    "Don’t wait. The time will never be just right.",
    "The bad news is time flies. The good news is you’re the pilot.",
    "Time is the most valuable thing a man can spend.",
    "Your time is limited, so don’t waste it living someone else’s life.",
    "Do not squander time, for that is the stuff life is made of.",
    "Time is what we want most, but what we use worst.",
    "The two most powerful warriors are patience and time.",
    "Time flies over us, but leaves its shadow behind.",
    "Lost time is never found again.",
    "The future depends on what you do today.",
    "Time is the most valuable thing a man can spend.",
    "Every moment is a fresh beginning.",
    "Time is a created thing. To say 'I don’t have time,' is like saying, 'I don’t want to.'",
    "You may delay, but time will not.",
    "The only reason for time is so that everything doesn’t happen at once.",
    "Time is the wisest counselor of all.",
    "A year from now you may wish you had started today.",
    "Time is the most precious gift we can give someone.",
    "What we do in life echoes in eternity.",
    "The way we spend our time defines who we are.",
    "Time is a treasure; we should spend it wisely.",
    "Every second is of infinite value.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Time is like a river; you cannot touch the same water twice."
];

// Select a random quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Display the random quote in the center
// const quoteDisplay = document.getElementById('quoteDisplay');
// quoteDisplay.innerText = getRandomQuote();
document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');

    // Check if the quoteDisplay element exists
    if (quoteDisplay) {
        // Display random quote
        quoteDisplay.innerText = getRandomQuote();
    } else {
        console.error("Element with id 'quoteDisplay' not found.");
    }
});