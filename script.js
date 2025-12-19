// ==================== NAVIGATION ====================
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");

// Scroll effect for header
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.style.overflow = nav.classList.contains("active")
    ? "hidden"
    : "";
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    nav.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Smooth scroll to appointment section
const btnAppointment = document.getElementById("btnAppointment");
if (btnAppointment) {
  btnAppointment.addEventListener("click", () => {
    document.getElementById("appointment").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// ==================== INTERSECTION OBSERVER ====================
// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards
const cards = document.querySelectorAll(
  ".service-card, .doctor-card, .testimonial-card"
);

cards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// ==================== FORM HANDLING ====================
const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
  // Set minimum date to today
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  appointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = appointmentForm.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Enviando...</span>";
    submitBtn.style.opacity = "0.7";

    // Collect form data
    const formData = new FormData(appointmentForm);
    const data = Object.fromEntries(formData);

    try {
      // Simulate API call (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      showNotification(
        "¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.",
        "success"
      );

      // Reset form
      appointmentForm.reset();
    } catch (error) {
      showNotification(
        "Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo.",
        "error"
      );
    } finally {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      submitBtn.style.opacity = "1";
    }
  });
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = "success") {
  // Remove existing notification if any
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "100px",
    right: "20px",
    padding: "1rem 1.5rem",
    background:
      type === "success"
        ? "linear-gradient(135deg, #10b981, #059669)"
        : "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    zIndex: "10000",
    fontWeight: "600",
    maxWidth: "400px",
    animation: "slideIn 0.3s ease",
    cursor: "pointer",
  });

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 5000);

  // Remove on click
  notification.addEventListener("click", () => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  });
}

// Add animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== FORM VALIDATION ====================
const inputs = document.querySelectorAll("input, select");

inputs.forEach((input) => {
  input.addEventListener("invalid", (e) => {
    e.preventDefault();
    input.style.borderColor = "#ef4444";
    input.style.animation = "shake 0.3s ease";
  });

  input.addEventListener("input", () => {
    if (input.checkValidity()) {
      input.style.borderColor = "#10b981";
    } else {
      input.style.borderColor = "#e2e8f0";
    }
  });
});

// Add shake animation
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// ==================== PHONE NUMBER FORMATTING ====================
const phoneInput = document.getElementById("telefono");

if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    // Format as Colombian phone number
    if (value.length > 0) {
      if (value.startsWith("57")) {
        value = "+" + value;
      } else if (!value.startsWith("+")) {
        value = "+57" + value;
      }
    }

    e.target.value = value;
  });
}

// ==================== SMOOTH SCROLL FOR ALL LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ==================== ACTIVE LINK HIGHLIGHTING ====================
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ==================== ACCESSIBILITY ====================
// Trap focus in mobile menu when open
menuToggle.addEventListener("click", () => {
  if (nav.classList.contains("active")) {
    const focusableElements = nav.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    nav.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }

      if (e.key === "Escape") {
        menuToggle.click();
      }
    });
  }
});

// ==================== CONSOLE INFO ====================
console.log(
  "%c🦷 DentalCare Website",
  "font-size: 20px; font-weight: bold; color: #667eea;"
);
console.log(
  "%cWebsite optimizado y listo para uso",
  "font-size: 14px; color: #4a5568;"
);

// ==================== INITIALIZE ====================
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Website loaded successfully");
});
