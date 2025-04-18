let decks = JSON.parse(localStorage.getItem("decks") || "{}");
let currentDeck = [];
let currentIndex = 0;
let showingFront = true;

const fileInput = document.getElementById("fileInput");
const deckList = document.getElementById("deckList");
const cardContainer = document.getElementById("cardContainer");
const card = document.getElementById("card");

fileInput.addEventListener("change", handleFileUpload);

function handleFileUpload(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const lines = reader.result.split("\n").filter(Boolean);
    const deck = lines.map(line => {
      const parts = line.split(" - ");
      return { q: parts[0], a: parts[1] };
    });
    const deckName = prompt("Enter a name for this deck:");
    if (deckName) {
      decks[deckName] = deck;
      localStorage.setItem("decks", JSON.stringify(decks));
      loadDeckList();
    }
  };
  reader.readAsText(file);
}

function loadDeckList() {
  deckList.innerHTML = "";
  Object.keys(decks).forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.onclick = () => {
      currentDeck = decks[name];
      currentIndex = 0;
      showingFront = true;
      showCard();
    };
    deckList.appendChild(btn);
  });
}

function showCard() {
  if (!currentDeck.length) return;
  const item = currentDeck[currentIndex];
  card.textContent = showingFront ? item.q : item.a;
  cardContainer.classList.remove("hidden");
}

function flipCard() {
  showingFront = !showingFront;
  showCard();
}

function nextCard() {
  if (currentIndex < currentDeck.length - 1) currentIndex++;
  showingFront = true;
  showCard();
}

function prevCard() {
  if (currentIndex > 0) currentIndex--;
  showingFront = true;
  showCard();
}

loadDeckList();
