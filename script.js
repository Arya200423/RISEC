// Sticky header on scroll
window.addEventListener('scroll', function () {
    const header = document.getElementById('main-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current nav item
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ✅ WhatsApp Appointment Booking Form Logic (with confirmation + device detection)
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent normal form submission

    // ✅ Admin WhatsApp number (no + or spaces)
    const adminNumber = "918767963513"; // Example: +91 8767963513 → 918767963513

    // ✅ Get user input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const date = document.getElementById("date") ? document.getElementById("date").value.trim() : "";
    const time = document.getElementById("time") ? document.getElementById("time").value.trim() : "";

    // ✅ Validate input fields
    if (!name || !email || !subject || !message) {
        alert("⚠️ Please fill out all required fields before sending.");
        return;
    }

    // ✅ Create the WhatsApp message text
    const whatsappMessage = `📅 *New Appointment Request via RISEC Website* 

👤 Name: ${name}
📧 Email: ${email}
📌 Subject: ${subject}
📝 Message: ${message}
${date ? "📆 Date: " + date : ""}
${time ? "⏰ Time: " + time : ""}

Please contact this user to confirm their appointment.`;

    // ✅ Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // ✅ Detect mobile or desktop device
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // ✅ Choose correct WhatsApp link
    const whatsappURL = isMobile
        ? `https://api.whatsapp.com/send?phone=${adminNumber}&text=${encodedMessage}` // mobile app
        : `https://web.whatsapp.com/send?phone=${adminNumber}&text=${encodedMessage}`; // desktop web

    // ✅ Confirmation before sending
    const confirmSend = confirm("📨 Do you want to send your appointment request via WhatsApp?");
    if (!confirmSend) return; // stop if user cancels

    // ✅ Open WhatsApp
    window.open(whatsappURL, "_blank");

    // ✅ Clear the form after sending
    document.getElementById("contactForm").reset();

    // ✅ Notify user
    alert("✅ Your appointment request has been sent via WhatsApp!");
});
