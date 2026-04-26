// ============================================
// KNOTCRAFT EATERY - CORRECTED SCRIPT
// No errors. Works on all pages.
// ============================================

// ----- Accessibility Toggles (safe on any page) -----
const highContrastBtn = document.getElementById('highContrastToggle');
const dyslexiaBtn = document.getElementById('dyslexiaToggle');
const announceBtn = document.getElementById('announceMode');

if (highContrastBtn) {
    highContrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        announce('High contrast mode toggled');
    });
}
if (dyslexiaBtn) {
    dyslexiaBtn.addEventListener('click', () => {
        document.body.classList.toggle('dyslexia');
        announce('Dyslexia-friendly font toggled');
    });
}
if (announceBtn) {
    announceBtn.addEventListener('click', () => {
        announce('Accessibility features available. Use contrast and font buttons.');
    });
}

// Helper: screen reader announcement
function announce(msg) {
    let announcer = document.getElementById('liveRegion');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'liveRegion';
        announcer.setAttribute('aria-live', 'polite');
        announcer.style.position = 'absolute';
        announcer.style.left = '-9999px';
        document.body.appendChild(announcer);
    }
    announcer.textContent = msg;
}

// ----- Live Kitchen Pulse (only if elements exist) -----
const tensionFill = document.querySelector('.tension-fill');
const tensionTextSpan = document.getElementById('tensionText');

function updatePulse() {
    if (!tensionFill || !tensionTextSpan) return; // No pulse on this page – safe exit
    const random = Math.floor(Math.random() * 100);
    tensionFill.style.width = random + '%';
    if (random > 70) tensionTextSpan.innerText = 'Busy weave';
    else if (random > 30) tensionTextSpan.innerText = 'Steady rhythm';
    else tensionTextSpan.innerText = 'Calm knot';
}

// Only start the interval if the pulse elements actually exist on this page
if (tensionFill && tensionTextSpan) {
    updatePulse(); // initial call
    setInterval(updatePulse, 8000);
}

// ----- Story‑Knots & Mood Threads (Reservation page only) -----
const reservationForm = document.getElementById('moodReservationForm');

function displayStoryKnots() {
    const container = document.getElementById('storyKnotsList');
    if (!container) return;
    const stories = JSON.parse(localStorage.getItem('knotcraft_stories') || '[]');
    if (stories.length === 0) {
        container.innerHTML = '<div class="knot-card"><em>No story‑knots yet. Be the first to tie one.</em></div>';
        return;
    }
    container.innerHTML = stories.map(s => `
        <div class="knot-card">
            <em>“${s.story || 'A beautiful meal worth remembering'}”</em><br>
            <small>— ${s.name.split(' ')[0]}</small>
        </div>
    `).join('');
}

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('resName')?.value.trim();
        const email = document.getElementById('resEmail')?.value.trim();
        const date = document.getElementById('resDate')?.value;
        const time = document.getElementById('resTime')?.value;
        const guests = document.getElementById('resGuests')?.value;
        const threads = [...document.querySelectorAll('input[name="thread"]:checked')].map(cb => cb.value);
        const story = document.getElementById('storyKnot')?.value.trim() || '';

        if (!name || !email || !date || !time || !guests) {
            alert('Please fill all required fields.');
            return;
        }

        const knot = {
            name,
            email,
            date,
            time,
            guests,
            threads,
            story,
            timestamp: new Date().toISOString()
        };

        let allKnots = JSON.parse(localStorage.getItem('knotcraft_stories') || '[]');
        allKnots.unshift(knot);
        localStorage.setItem('knotcraft_stories', JSON.stringify(allKnots.slice(0, 10)));

        alert(`Thank you ${name}! Your knot is tied. We've saved your mood threads.`);
        reservationForm.reset();
        displayStoryKnots(); // refresh the wall
    });

    // Initial load of story-knots on reservation page
    displayStoryKnots();
}

// ----- Mobile menu toggle (works on all pages) -----
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ----- Smooth scroll for internal anchor links (if any) -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ----- Add ARIA live region to body (for announcements) -----
if (!document.getElementById('liveRegion')) {
    const live = document.createElement('div');
    live.id = 'liveRegion';
    live.setAttribute('aria-live', 'polite');
    live.style.position = 'absolute';
    live.style.left = '-9999px';
    document.body.appendChild(live);
}

console.log('KnotCraft Eatery — accessible & error‑free ✅');

  // Contact form handling (specific to this page)
        const contactForm = document.getElementById('contactMessageForm');
        const feedbackDiv = document.getElementById('contactFormFeedback');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('contactName').value.trim();
                const email = document.getElementById('contactEmail').value.trim();
                const subject = document.getElementById('contactSubject').value.trim();
                const message = document.getElementById('contactMessage').value.trim();

                if (!name || !email || !message) {
                    feedbackDiv.innerHTML = '<span class="error">❌ Please fill all required fields.</span>';
                    return;
                }
                // Simple email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    feedbackDiv.innerHTML = '<span class="error">❌ Please enter a valid email address.</span>';
                    return;
                }

                // Store message in localStorage (demo) – in real app send to server
                const messages = JSON.parse(localStorage.getItem('knotcraft_contact') || '[]');
                messages.push({ name, email, subject, message, date: new Date().toISOString() });
                localStorage.setItem('knotcraft_contact', JSON.stringify(messages));

                feedbackDiv.innerHTML = '<span class="success">✅ Thank you! Your thread has been sent. We’ll reply soon.</span>';
                contactForm.reset();
                setTimeout(() => { feedbackDiv.innerHTML = ''; }, 5000);
            });
        }