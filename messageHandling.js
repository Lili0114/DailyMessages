import { messages } from "./messages.js";

const STORAGE = {
  used: "usedMessages",
  todayMsg: "todayMessage",
  todayDate: "todayDate"
};

function formatDate(date = new Date()) {
  return date.toLocaleDateString("hu-HU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    const confettiPieces = 50;

    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.delay = Math.random() * 0.3 + 's';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

const today = new Date().toISOString().slice(0, 10);
document.getElementById("date").innerText = formatDate();

let used = JSON.parse(localStorage.getItem(STORAGE.used)) || [];

// reset, ha elfogyott
if (used.length >= messages.length) {
  used = [];
  localStorage.setItem(STORAGE.used, JSON.stringify([]));
}

document.getElementById("btn").addEventListener("click", () => {

  const storedDate = localStorage.getItem(STORAGE.todayDate);
  const storedMsg = localStorage.getItem(STORAGE.todayMsg);

  if (storedDate === today && storedMsg) {
    showMessage(storedMsg, true);
    return;
  }

  const availableIndexes = messages
    .map((_, i) => i)
    .filter(i => !used.includes(i));

  const randomIndex =
    availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

  const msg = messages[randomIndex];

  used.push(randomIndex);
  localStorage.setItem(STORAGE.used, JSON.stringify(used));
  localStorage.setItem(STORAGE.todayMsg, msg);
  localStorage.setItem(STORAGE.todayDate, today);

  showMessage(msg, false);
});

function showMessage(msg, alreadyHad) {
  document.getElementById('message').classList.remove('pulse');
  document.getElementById("message").innerText = msg;
  document.getElementById("hint").innerText = alreadyHad
    ? "A mai üzenetet már megkaptad, gyere vissza holnap 😌"
    : "Holnap új üzenet vár 😘";
  document.getElementById("btn").disabled = true;
  
  if (!alreadyHad) {
    createConfetti();
  }
}