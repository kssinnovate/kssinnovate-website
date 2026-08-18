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

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const number = document.getElementById('number').value.trim();

      // Validate phone
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(number)) {
        showToast('Invalid Phone', 'Please enter a valid phone number (10–15 digits).');
        return;
      }

      // Using EmailJS to send emails from client-side
      const templateParams = {
        to_name: 'KSS Innovate',
        from_name: name,
        from_email: email,
        reply_to: email,
        email: email,
        subject: 'New Enquiry from ' + name + ' via KSS Innovate Website',
        title: 'New Website Enquiry',
        message: 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + number + '\n\nMessage:\n' + message,
        number: number
      };
      
      emailjs.send('service_j6rxabe', 'template_2g04g09', templateParams)
        .then(function() {
          showToast('Message Sent!', 'We\'ll get back to you soon.');
          contactForm.reset();
        }, function(error) {
          console.error('Email error:', error);
          showToast('Error', 'Failed to send message. Please try again.');
        });
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
