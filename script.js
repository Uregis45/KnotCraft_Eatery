// =========================
// KNOTCRAFT CLEAN JS
// =========================

// ---------- Helpers ----------
const $ = (id) => document.getElementById(id);

// ---------- Accessibility ----------
function announce(msg) {
  let live = $("liveRegion");
  if (!live) {
    live = document.createElement("div");
    live.id = "liveRegion";
    live.setAttribute("aria-live", "polite");
    live.style.position = "absolute";
    live.style.left = "-9999px";
    document.body.appendChild(live);
  }
  live.textContent = msg;
}

$("highContrastToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("high-contrast");
  announce("Contrast toggled");
});

$("dyslexiaToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dyslexia");
  announce("Font toggled");
});

$("announceMode")?.addEventListener("click", () => {
  announce("Accessibility mode active");
});

// ---------- Mobile Menu ----------
const menuToggle = $("menuToggle");
const navLinks = $("navLinks");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// ---------- Live Pulse ----------
const fill = document.querySelector(".tension-fill");
const text = $("tensionText");

function pulse() {
  if (!fill || !text) return;

  const val = Math.random() * 100;
  fill.style.width = val + "%";

  text.textContent =
    val > 70 ? "Busy weave" :
    val > 30 ? "Steady rhythm" :
    "Calm knot";
}

if (fill) {
  pulse();
  setInterval(pulse, 7000);
}

// ---------- Reservation ----------
const form = $("moodReservationForm");

function loadStories() {
  const box = $("storyKnotsList");
  if (!box) return;

  const data = JSON.parse(localStorage.getItem("knot_stories") || "[]");

  box.innerHTML = data.length
    ? data.map(s => `
        <div class="knot-card">
          <p>“${s.story || "Memory saved"}”</p>
          <small>${s.name.split(" ")[0]}</small>
        </div>
      `).join("")
    : "<p>No story-knots yet.</p>";
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: $("resName").value,
    email: $("resEmail").value,
    date: $("resDate").value,
    time: $("resTime").value,
    guests: $("resGuests").value,
    story: $("storyKnot").value,
    timeStamp: Date.now()
  };

  if (!data.name || !data.email) {
    alert("Fill required fields");
    return;
  }

  const saved = JSON.parse(localStorage.getItem("knot_stories") || "[]");
  saved.unshift(data);

  localStorage.setItem("knot_stories", JSON.stringify(saved.slice(0, 10)));

  form.reset();
  loadStories();
});

loadStories();

// ---------- Contact ----------
const contact = $("contactMessageForm");

contact?.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = {
    name: $("contactName").value,
    email: $("contactEmail").value,
    message: $("contactMessage").value
  };

  if (!msg.name || !msg.email || !msg.message) return;

  const saved = JSON.parse(localStorage.getItem("knot_contact") || "[]");
  saved.push(msg);

  localStorage.setItem("knot_contact", JSON.stringify(saved));

  alert("Message sent ✔");
  contact.reset();
});

// ---------- ACTIVE NAVIGATION AUTO SYSTEM ----------
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("active")) {
            icon.classList.replace("fa-bars", "fa-times");
        } else {
            icon.classList.replace("fa-times", "fa-bars");
        }
    });
}