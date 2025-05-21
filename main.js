// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Contact form handling
  // const nodemailer = require('nodemailer');

  // const transporter = nodemailer.createTransport({
  //   service: 'Gmail',
  //   auth: {
  //     user: 'youremail@gmail.com',
  //     pass: 'yourpassword_or_app_password'
  //   }
  // });
  
  // const mailOptions = {
  //   from: 'youremail@gmail.com',
  //   to: 'recipient@example.com',
  //   subject: 'Subject Here',
  //   text: 'Your message here'
  // };
  
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      console.log(email);
      console.log("Email")
      
      const message = document.getElementById('message').value;
      const number = document.getElementById('number').value;


        // Using EmailJS to send emails from client-side
      const templateParams = {
        title: name,
        from_name: name,
        reply_to: email,
        email: email,
        message: message,
        number: number,
        from_email: email
      };
      
      emailjs.send('service_j6rxabe', 'template_2g04g09', templateParams)
        .then(function() {
          showToast('Message Sent!', 'We\'ll get back to you soon.');
          contactForm.reset();
        }, function(error) {
          console.error('Email error:', error);
          showToast('Error', 'Failed to send message. Please try again.');
          contactForm.reset();
        });
    });
  }

  document.querySelector("form").addEventListener("submit", function (e) {
    const phone = document.getElementById("number").value;
    const regex = /^\+?[0-9]{10,15}$/;
    if (!regex.test(phone)) {
      e.preventDefault();
      alert("Please enter a valid phone number (10–15 digits, optional +).");
    }
  });
  
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
