// State Management
let telegramUsername = "rsrsolution";

// DOM Elements
const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const serviceCtas = document.querySelectorAll(".service-cta");
const telegramInput = document.getElementById("telegram-username-input");
const btnSaveTelegram = document.getElementById("btn-save-telegram");
const contactDisplayName = document.getElementById("contact-display-name");
const btnDirectContact = document.getElementById("btn-direct-contact");
const footerTgLink = document.querySelector(".footer-tg-link");
const copyrightYear = document.getElementById("copyright-year");
const toast = document.getElementById("toast-notification");
const toastMessage = document.getElementById("toast-message");

// Set dynamic copyright year
if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}

// 1. Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    if (navMenu.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark fa-xl";
    } else {
        icon.className = "fa-solid fa-bars fa-xl";
    }
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.querySelector("i").className = "fa-solid fa-bars fa-xl";
    });
});

// 2. Header Style on Scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// 3. Dynamic Telegram Link Generator
function updateTelegramLinks() {
    // Sanitize username: remove @ symbol and spaces if entered
    let username = telegramInput.value.trim().replace(/^@/, "").replace(/\s+/g, "");
    if (!username) {
        showToast("Please enter a valid Telegram username!", "error");
        return;
    }
    
    telegramUsername = username;
    
    // Update service button hrefs
    serviceCtas.forEach(btn => {
        const serviceName = btn.getAttribute("data-service");
        // Pre-composed professional message
        const messageText = `សួស្តី! ខ្ញុំចាប់អារម្មណ៍លើសេវាកម្ម៖ ${serviceName}`;
        const encodedMessage = encodeURIComponent(messageText);
        
        btn.href = `https://t.me/${telegramUsername}?text=${encodedMessage}`;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
    });

    // Update main contact display and buttons
    if (contactDisplayName) {
        contactDisplayName.textContent = `Username: @${telegramUsername}`;
    }
    if (btnDirectContact) {
        btnDirectContact.href = `https://t.me/${telegramUsername}`;
    }
    if (footerTgLink) {
        footerTgLink.href = `https://t.me/${telegramUsername}`;
    }
}

// Initial setup on load
updateTelegramLinks();

// Save new telegram username
if (btnSaveTelegram) {
    btnSaveTelegram.addEventListener("click", () => {
        updateTelegramLinks();
        showToast(`Telegram username updated to @${telegramUsername}!`);
    });
}

// 4. Scroll Reveal & Active Nav Link Observer
const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px", // Trigger when section occupies the sweet spot of viewport
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class for entrance animation
            entry.target.classList.add("visible");
            
            // Set active nav link
            const id = entry.target.getAttribute("id");
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Toast notification helper
function showToast(message, type = "success") {
    toastMessage.textContent = message;
    
    if (type === "error") {
        toast.style.borderColor = "hsl(0, 100%, 65%)";
        toast.querySelector(".toast-icon").className = "fa-solid fa-circle-exclamation toast-icon";
        toast.querySelector(".toast-icon").style.color = "hsl(0, 100%, 65%)";
    } else {
        toast.style.borderColor = "var(--primary)";
        toast.querySelector(".toast-icon").className = "fa-solid fa-circle-check toast-icon";
        toast.querySelector(".toast-icon").style.color = "var(--primary)";
    }
    
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}
