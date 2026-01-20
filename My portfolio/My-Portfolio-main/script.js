
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});


document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});


window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(0, 20, 40, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
  } else {
    navbar.style.background = 'rgba(0, 20, 40, 0.95)';
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
  }
});


const contactButton = document.getElementById("contact_button");
const contactPopup = document.getElementById("contactPopup");
const submissionPopup = document.getElementById("submissionPopup");
const contactForm = document.getElementById("contactForm");


contactButton.addEventListener("click", function (e) {
  e.preventDefault();
  contactPopup.style.display = "flex";
});


function closeContactPopup() {
  contactPopup.style.display = "none";
  submissionPopup.style.display = "none";
  // Reset form
  document.getElementById("contact-popup-email").value = "";
  document.getElementById("contact-popup-message").value = "";
}


contactPopup.addEventListener('click', function(e) {
  if (e.target === contactPopup) {
    closeContactPopup();
  }
});

submissionPopup.addEventListener('click', function(e) {
  if (e.target === submissionPopup) {
    closeContactPopup();
  }
});


contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("contact-popup-submit");
  const originalBtnText = submitBtn.innerText;
  
  const email = document.getElementById("contact-popup-email").value;
  const message = document.getElementById("contact-popup-message").value;

  
  if (!email || !message) {
    alert("Please fill in all fields");
    return;
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  
  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;

  
  const scriptURL = 'https://script.google.com/macros/s/AKfycbydVfIVt1EjXqgAqKmPprjRh1vW9hwk14LRw4MhnnnhIqlJCO0iI6HJouZx-bznCWP9pA/exec';

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors', 
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, message: message })
  })
  .then(() => {
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;

    
    document.getElementById("contactPopup").style.display = "none";
    document.getElementById("submissionPopup").style.display = "flex";

    
    document.getElementById("contact-popup-email").value = "";
    document.getElementById("contact-popup-message").value = "";
  })
  .catch(error => {
    console.error('Error!', error.message);
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
    alert("Submission failed. Please check your console for errors.");
  });
});


const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);


document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PortfolioTests, closeContactPopup };
}