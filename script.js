document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Filter functionality for Storage Units
  const filterButtons = document.querySelectorAll(".filter-btn");
  const unitCards = document.querySelectorAll(".unit-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filterType = btn.getAttribute("data-filter-type");
      const filterValue = btn.getAttribute("data-filter-value");

      unitCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "flex";
        } else {
          // Check if the card matches the exact data attribute
          const match = card.getAttribute(`data-${filterType}`) === filterValue;
          card.style.display = match ? "flex" : "none";
        }
      });
    });
  });

  // FAQ Accordion functionality
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isOpen = content.style.maxHeight;

      // Close all other accordions
      document.querySelectorAll(".accordion-content").forEach((item) => {
        item.style.maxHeight = null;
        item.parentElement.classList.remove("active");
      });

      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        header.parentElement.classList.add("active");
      }
    });
  });

  // Scroll Animations using Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optionally unobserve if we only want it to trigger once
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element);
  });

  // Form Submission & Toast Notification
  const contactForm = document.getElementById("enquiry-form");
  const toast = document.getElementById("toast");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Display success toast message
      toast.classList.add("show");
      contactForm.reset();

      setTimeout(() => {
        toast.classList.remove("show");
      }, 4000);
    });
  }
});
