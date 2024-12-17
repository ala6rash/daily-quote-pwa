const quoteEl = document.getElementById("quote");
const newQuoteBtn = document.getElementById("new-quote-btn");
const addFavoriteBtn = document.getElementById("add-favorite-btn");
const toggleThemeBtn = document.getElementById("toggle-theme-btn");
const shareBtn = document.getElementById("share-btn");

const staticQuotes = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "Never bend your head. Always hold it high.", author: "Helen Keller" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "What you get by achieving your goals is not as important as what you become.", author: "Zig Ziglar" },
  { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" }
];

function displayQuote(quote) {
  quoteEl.textContent = `"${quote.text}" - ${quote.author}`;
}

// Fetch a random quote (with fallback)
async function fetchQuote() {
  const fallbackQuote = staticQuotes[Math.floor(Math.random() * staticQuotes.length)];

  try {
    const response = await fetch('https://type.fit/api/quotes');
    if (!response.ok) throw new Error("API response failed.");
    const data = await response.json();
    displayQuote({ text: data.content, author: data.author });
  } catch (error) {
    console.error("Error fetching quote:", error);
    displayQuote(fallbackQuote); // Fallback quote
  }
}

// Add quote to favorites
function addToFavorites() {
  const favoriteQuotes = JSON.parse(localStorage.getItem("favorites")) || [];
  favoriteQuotes.push(quoteEl.textContent);
  localStorage.setItem("favorites", JSON.stringify(favoriteQuotes));
  alert("Quote added to favorites!");
}

// Toggle light/dark theme
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

// Share the current quote
function shareQuote() {
  if (navigator.share) {
    navigator.share({
      title: "Daily Quote",
      text: quoteEl.textContent,
      url: window.location.href
    }).catch(error => console.error("Error sharing:", error));
  } else {
    alert("Share feature is not supported in this browser.");
  }
}

// Event Listeners
newQuoteBtn.addEventListener("click", fetchQuote);
addFavoriteBtn.addEventListener("click", addToFavorites);
toggleThemeBtn.addEventListener("click", toggleTheme);
shareBtn.addEventListener("click", shareQuote);

// Load a quote on page load
fetchQuote();
