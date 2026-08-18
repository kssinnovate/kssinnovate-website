// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Hamburger menu functionality
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('header')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // Contact form handling (Formsubmit.co)
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const number = document.getElementById('number').value.trim();

      // Validate required fields are filled in
      if (!name) {
        showToast('Missing Name', 'Please enter your name.');
        return;
      }
      if (!email) {
        showToast('Missing Email', 'Please enter your email address.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Invalid Email', 'Please enter a valid email address.');
        return;
      }
      if (!number) {
        showToast('Missing Telephone', 'Please enter your telephone number.');
        return;
      }
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(number)) {
        showToast('Invalid Phone', 'Please enter a valid phone number (10–15 digits).');
        return;
      }
      if (!message) {
        showToast('Missing Message', 'Please enter a message.');
        return;
      }

      // Send via WhatsApp (pre-formatted message)
      const whatsappNumber = '27728580193';
      const whatsappMessage = `*New Quote Request*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(number)}%0A*Message:* ${encodeURIComponent(message)}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      // Also send via email (mailto fallback)
      const mailSubject = encodeURIComponent(`Quote Request from ${name}`);
      const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${number}\nMessage: ${message}`);
      const mailtoUrl = `mailto:kssinnovate@gmail.com?subject=${mailSubject}&body=${mailBody}`;

      // Open WhatsApp with the message
      window.open(whatsappUrl, '_blank');
      
      showToast('Message Sent!', 'WhatsApp opened with your message. You can also reach us via email.');
      contactForm.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
  
      // Skip if href is just "#"
      if (!targetId || targetId === '#') return;
  
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault(); // only prevent default when we are scrolling
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

    // Initialize pricing section toggle functionality if it exists
  const pricingToggle = document.getElementById('billingToggle');
  if (pricingToggle) {
    pricingToggle.addEventListener('change', function() {
      const monthlyPrices = document.querySelectorAll('.price-monthly');
      const yearlyPrices = document.querySelectorAll('.price-yearly');
      
      if (this.checked) {
        // Yearly
        monthlyPrices.forEach(el => el.style.display = 'none');
        yearlyPrices.forEach(el => el.style.display = 'block');
      } else {
        // Monthly
        monthlyPrices.forEach(el => el.style.display = 'block');
        yearlyPrices.forEach(el => el.style.display = 'none');
      }
    });
  }
});

// Toast notification function
function showToast(title, message) {
  // Create toast elements
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const toastContent = document.createElement('div');
  
  const toastTitle = document.createElement('div');
  toastTitle.className = 'toast-title';
  toastTitle.textContent = title;
  
  const toastDescription = document.createElement('div');
  toastDescription.className = 'toast-description';
  toastDescription.textContent = message;
  
  toastContent.appendChild(toastTitle);
  toastContent.appendChild(toastDescription);
  toast.appendChild(toastContent);
  
  // Add toast to document
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Hide toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    
    // Remove toast from DOM after transition
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 5000);
}
