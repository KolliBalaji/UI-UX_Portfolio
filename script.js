/* 
  BALAJI KOLLI - CREATIVE PORTFOLIO LOGIC
*/

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initFigmaCanvas();
  initTypingEffect();
  initNavbarScroll();
  initSkillsFilter();
  initScrollReveal();
  initContactForm();
  initMobileMenu();
});

/* ==========================================================================
   1. CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (!cursor || !cursorDot) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instant dot movement
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Lag effect for outer cursor circle
  function animateCursor() {
    let dx = mouseX - cursorX;
    let dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states
  const hoverElements = document.querySelectorAll('a, button, .sketch-card, .filter-btn, .form-control');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

/* ==========================================================================
   2. INTERACTIVE FIGMA CANVAS
   ========================================================================== */
function initFigmaCanvas() {
  const cursor1 = document.querySelector('.figma-cursor.c1');
  const cursor2 = document.querySelector('.figma-cursor.c2');
  const canvas = document.querySelector('.canvas-board');
  
  if (!canvas || !cursor1 || !cursor2) return;

  // Let the Figma cursors float slightly inside the canvas
  let time = 0;
  
  function animateFigmaCursors() {
    time += 0.015;
    
    // Hover offset paths
    const x1 = Math.sin(time) * 40 + 60;
    const y1 = Math.cos(time * 0.8) * 35 + 75;
    
    const x2 = Math.cos(time * 1.2) * 50 + 260;
    const y2 = Math.sin(time * 0.7) * 40 + 240;
    
    cursor1.style.transform = `translate(${x1}px, ${y1}px)`;
    cursor2.style.transform = `translate(${x2}px, ${y2}px)`;
    
    requestAnimationFrame(animateFigmaCursors);
  }
  
  animateFigmaCursors();
}

/* ==========================================================================
   3. TYPING/ROTATING TEXT EFFECT
   ========================================================================== */
function initTypingEffect() {
  const roles = [
    "UI/UX Designer",
    "Web Developer",
    "AI Enthusiast"
  ];
  
  const target = document.getElementById('typing-text');
  if (!target) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. NAVBAR SCROLL INTERACTION & SCROLL PROGRESS
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('.main-header');
  const progressBar = document.querySelector('.scroll-progress');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // 1. Scrolled class toggle
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 2. Scroll progress calculator
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = `${scrolled}%`;

    // 3. Active Link intersection highlights
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. SKILLS GRID FILTER
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillItems = document.querySelectorAll('.skill-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active states
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter grid cards
      skillItems.forEach(item => {
        const itemType = item.getAttribute('data-type');
        
        if (filterValue === 'all' || itemType === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger once only
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(el => {
    revealObserver.observe(el);
  });
}

/* ==========================================================================
   7. CONTACT FORM VALIDATION UI
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBanner = document.getElementById('success-banner');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let hasErrors = false;
    
    // Validate Name
    const nameInput = document.getElementById('contact-name');
    const nameGroup = nameInput.closest('.form-group');
    if (nameInput.value.trim() === '') {
      nameGroup.classList.add('error');
      hasErrors = true;
    } else {
      nameGroup.classList.remove('error');
    }

    // Validate Email
    const emailInput = document.getElementById('contact-email');
    const emailGroup = emailInput.closest('.form-group');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailGroup.classList.add('error');
      hasErrors = true;
    } else {
      emailGroup.classList.remove('error');
    }

    // Validate Message
    const msgInput = document.getElementById('contact-message');
    const msgGroup = msgInput.closest('.form-group');
    if (msgInput.value.trim() === '') {
      msgGroup.classList.add('error');
      hasErrors = true;
    } else {
      msgGroup.classList.remove('error');
    }

    // Handle Submission
    if (!hasErrors) {
      const submitBtn = form.querySelector('.sketch-button');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
      
      if (window.location.protocol === 'file:') {
        // Fallback for local files: Use mailto to open default mail client
        const subject = encodeURIComponent(`Portfolio Message from ${nameInput.value.trim()}`);
        const body = encodeURIComponent(
          `Name: ${nameInput.value.trim()}\n` +
          `Email: ${emailInput.value.trim()}\n\n` +
          `Message:\n${msgInput.value.trim()}`
        );
        
        // Redirect to mailto link
        window.location.href = `mailto:xhaviour6@gmail.com?subject=${subject}&body=${body}`;
        
        // Show success banner locally
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        if (successBanner) {
          successBanner.style.display = 'flex';
          setTimeout(() => {
            successBanner.style.display = 'none';
          }, 6000);
        }
      } else {
        // Perform AJAX POST request to FormSubmit.co (works on http/https web servers)
        fetch("https://formsubmit.co/ajax/xhaviour6@gmail.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            Name: nameInput.value.trim(),
            Email: emailInput.value.trim(),
            Message: msgInput.value.trim()
          })
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Form submission failed.');
          }
        })
        .then(data => {
          console.log("FormSubmit Server Response:", data);
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          
          if (successBanner) {
            successBanner.style.display = 'flex';
            setTimeout(() => {
              successBanner.style.display = 'none';
            }, 6000);
          }
        })
        .catch(error => {
          console.error(error);
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          alert("Oops! There was a problem sending your message via AJAX. Opening your mail client as fallback...");
          
          // Fallback if AJAX fails
          const subject = encodeURIComponent(`Portfolio Message from ${nameInput.value.trim()}`);
          const body = encodeURIComponent(
            `Name: ${nameInput.value.trim()}\n` +
            `Email: ${emailInput.value.trim()}\n\n` +
            `Message:\n${msgInput.value.trim()}`
          );
          window.location.href = `mailto:xhaviour6@gmail.com?subject=${subject}&body=${body}`;
        });
      }
    }
  });

  // Clear errors when typing
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (input.value.trim() !== '') {
        group.classList.remove('error');
      }
    });
  });
}

/* ==========================================================================
   8. MOBILE RESPONSIVE HAMBURGER NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu drawer when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}
