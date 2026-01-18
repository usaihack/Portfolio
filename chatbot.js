const chatBot = document.getElementById("chatbot");
const openChat = document.getElementById("open-chat");
const closeChat = document.getElementById("chat-toggle");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const chatHint = document.getElementById("chat-hint");

/* ======================
   STATE
====================== */

// State variables are now in the CHAT HINT section

/* ======================
   DATA
====================== */

const responses = {
  about: [
    "👋 ABOUT ME",
    "",
    "I’m an aspiring cybersecurity professional and developer.",
    "I explore systems, code, and security together.",
    "",
    "🔐 Understanding weaknesses is how defense is built.",
  ],

  skills: [
    "🧠 SKILLS",
    "",
    "🐍 Python — hacking, networking, web security (60%)",
    "🌐 JavaScript — secure frontend logic (80%)",
    "☕ Java — OOP fundamentals (10%)",
    "🛡️ Web Security — XSS, validation (50%)",
    "🦠 Malware Analysis — behavioral analysis (45%)",
    "⚙️ C & Assembly — low-level basics (35%)",
  ],

  projects: [
    "📂 PROJECTS",
    "",
    "🔐 Caesar Cipher — Python cryptography",
    "🎮 Java Tic Tac Toe — secure OOP design",
    "🧪 JS Form Validator — input sanitization",
    "📡 Network Scanner — Python recon tool",
  ],

  learning: [
    "🛤️ LEARNING PATH",
    "",
    "📘 Foundations — Python, Linux, Networking",
    "🌐 Web Security — SQLi, XSS, CSRF",
    "🦠 Malware Analysis — reverse engineering",
    "🚩 Advanced Security — pentesting & exploits",
  ],

  contact: [
    "📬 CONTACT",
    "",
    "✉️ Email: abc@proton.me",
    "🐙 GitHub: github.com/usman",
    "💼 LinkedIn: linkedin.com/in/usman",
    "📱 WhatsApp: 12345678901",
  ],

  default: [
    "🤖 I’m Sentinel.",
    "",
    "Ask me about Usman's:",
    "• bio",
    "• skills",
    "• projects",
    "• learning path",
    "• contact",
    "• quotes",
  ],
};

let quotes = [
  " 'CTFs sharpen the knife. Real hacking decides where to cut.'",
  " 'Hackers don’t guess. They observe.'",
  " 'Every login is a trust decision.'",
  " 'Most hacks are old mistakes, repeated.'",
  " 'Discipline is choosing future pride over present comfort.'",
  " 'Consistency beats intensity. Always.'",
  " 'Momentum is not perfection. It’s recovery speed.'",
  " 'Starting is the real battle.'",
];

/* ======================
   HELPERS
====================== */

function formatText(lines) {
  return lines.join("\n");
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* ======================
   BUTTONS
====================== */

function clearOldButtons() {
  const old = chatBody.querySelector(".chat-buttons");
  if (old) old.remove();
}

function addButtons(
  commands = [
    "about",
    "skills",
    "projects",
    "learning path",
    "contact",
    "quote",
  ]
) {
  clearOldButtons();

  const container = document.createElement("div");
  container.className = "chat-buttons";

  commands.forEach((cmd) => {
    const btn = document.createElement("button");
    btn.className = "chat-btn";
    btn.textContent = cmd;
    btn.onclick = () => handleUserInput(cmd);
    container.appendChild(btn);
  });

  chatBody.appendChild(container);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* ======================
   THINKING + TYPING
====================== */

function botReply(text) {
  const thinking = document.createElement("div");
  thinking.className = "message bot";
  thinking.textContent = "Sentinel is thinking";
  chatBody.appendChild(thinking);

  let dots = 0;
  const dotAnim = setInterval(() => {
    dots = (dots + 1) % 4;
    thinking.textContent = "Sentinel is thinking" + ".".repeat(dots);
  }, 400);

  setTimeout(() => {
    clearInterval(dotAnim);
    chatBody.removeChild(thinking);
    typeText(text);
  }, 3500);
}

function typeText(text) {
  const div = document.createElement("div");
  div.className = "message bot";

  // Respect line breaks
  div.style.whiteSpace = "pre-line";

  chatBody.appendChild(div);

  let i = 0;
  const typer = setInterval(() => {
    div.textContent += text[i];
    i++;
    chatBody.scrollTop = chatBody.scrollHeight;

    if (i >= text.length) {
      clearInterval(typer);
      addButtons();
    }
  }, 25);
}

/* ======================
   INPUT HANDLER
====================== */

function handleUserInput(input) {
  addMessage(input, "user");

  const msg = input.toLowerCase().trim();
  let reply;

  if (msg === "about") reply = responses.about;
  else if (msg === "skills") reply = responses.skills;
  else if (msg === "projects") reply = responses.projects;
  else if (msg.includes("learning")) reply = responses.learning;
  else if (msg === "contact") reply = responses.contact;
  else if (msg === "quote") {
    if (quotes.length === 0) reply = ["⚠️ No more quotes until refresh."];
    else {
      const i = Math.floor(Math.random() * quotes.length);
      reply = ["💬 " + quotes.splice(i, 1)[0]];
    }
  } else reply = responses.default;

  botReply(formatText(reply));
}

/* ======================
   CHAT HINT
====================== */

let chatInteracted = false; // Track if user has ever clicked the chatbot icon
let hintInterval; // Store the interval ID

function scheduleChatHint() {
  if (chatInteracted) return; // Only stop if user clicked chatbot icon
  
  // Show hint every 12 seconds repeatedly
  hintInterval = setInterval(() => {
    // Only show hint if chat is currently hidden and user hasn't clicked chatbot
    if (!chatBot.classList.contains("show") && !chatInteracted) {
      chatHint.classList.add("show");
    }
  }, 12000); // Repeat every 12 seconds
}

// Initialize hint - this will be called from script.js after boot screen
function initChatHint() {
  scheduleChatHint();
}

// Make it accessible globally
window.initChatHint = initChatHint;

if (chatHint) {
  // Close button only hides temporarily - hint will show again after 2s
  const closeBtn = chatHint.querySelector(".hint-close");
  closeBtn.onclick = (e) => {
    e.stopPropagation();
    chatHint.classList.remove("show");
    // Don't set any permanent flags - hint will appear again
  };

  // Clicking the hint opens chat (which will permanently stop hints)
  chatHint.onclick = () => {
    openChat.click(); // This will permanently stop the hints
  };
}

/* ======================
   EVENTS
====================== */

openChat.onclick = () => {
  // Mark that user has clicked chatbot icon - hint will NEVER show again until refresh
  chatInteracted = true;
  
  // Stop the repeating hint interval permanently
  if (hintInterval) {
    clearInterval(hintInterval);
    hintInterval = null;
  }
  
  // Clear old chat for fresh start
  chatBody.innerHTML = "";
  chatInput.value = "";

  chatBot.classList.add("show");
  openChat.style.display = "none";
  chatHint.classList.remove("show");

  botReply(formatText(responses.default));
};

closeChat.onclick = () => {
  chatBot.classList.remove("show");
  // delay showing open button to match animation
  setTimeout(() => {
    openChat.style.display = "block";
  }, 400);
};

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && chatInput.value.trim()) {
    handleUserInput(chatInput.value.trim());
    chatInput.value = "";
  }
});

/* ======================
   INIT
====================== */

// Chat hint will be initialized from script.js after boot screen is dismissed
// Don't auto-start anymore: scheduleChatHint();
