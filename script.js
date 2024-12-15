const staticQuotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "Never bend your head. Always hold it high.", author: "Helen Keller" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Do what you can with all you have, wherever you are.", author: "Theodore Roosevelt" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt" },
  { text: "The bad news is time flies. The good news is you're the pilot.", author: "Michael Altshuler" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "The best way to predict the future is to create it.", author: "Abraham Lincoln" }
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const quoteEl = document.getElementById("quote");
const newQuoteBtn = document.getElementById("new-quote-btn");
const addFavoriteBtn = document.getElementById("add-favorite-btn");
const toggleThemeBtn = document.getElementById("toggle-theme-btn");
const shareBtn = document.getElementById("share-btn");

// Fetch a new quote
async function fetchQuote() {
  const fallbackQuote = staticQuotes[Math.floor(Math.random() * staticQuotes.length)];

  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    quoteEl.textContent = `"${data.content}" - ${data.author}`;
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteEl.textContent = `"${fallbackQuote.text}" - ${fallbackQuote.author}`;
  }
}

// Add to Favorites
addFavoriteBtn.addEventListener("click", () => {
  const currentQuote = quoteEl.textContent;
  if (!favorites.includes(currentQuote)) {
    favorites.push(currentQuote);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Quote added to favorites!");
  } else {
    alert("Quote is already in favorites.");
  }
});

// Dark Mode Toggle
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Share Quote
shareBtn.addEventListener("click", () => {
  if (navigator.share) {
    navigator.share({
      title: "Daily Quote",
      text: quoteEl.textContent,
      url: window.location.href
    }).catch(error => console.error("Error sharing:", error));
  } else {
    alert("Sharing is not supported on this browser.");
  }
});

// Load Quote on Page Load
fetchQuote();
newQuoteBtn.addEventListener("click", fetchQuote);
