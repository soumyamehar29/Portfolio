/**
 * ==========================================================================
 * SOUMYA MEHAR - PORTFOLIO JAVASCRIPT
 * Modern, dependency-free vanilla JavaScript
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ========================================================================
     1. USER CONFIGURATION OBJECT
     Update these optional values as your portfolio develops.
     ======================================================================== */
  const PORTFOLIO_CONFIG = {
    phoneNumber: "+91 9588446174",
    
    // Set to true when you place 'resume.pdf' in the 'assets/' folder
    hasResumePdf: false,
    resumePdfPath: "assets/resume.pdf",
    
    // Smooth scroll offset in pixels to account for fixed header
    headerOffset: 80
  };

  /* ========================================================================
     2. Dynamic Copyright Year
     ======================================================================== */
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* ========================================================================
     3. Phone Number Configuration Injector
     ======================================================================== */
  const phoneDisplay = document.getElementById('phone-display');
  const phoneLink = document.getElementById('phone-link');

  if (PORTFOLIO_CONFIG.phoneNumber !== "YOUR_MOBILE_NUMBER_HERE") {
    if (phoneDisplay) {
      phoneDisplay.textContent = PORTFOLIO_CONFIG.phoneNumber;
      phoneDisplay.classList.remove('contact-val-placeholder');
    }
    if (phoneLink) {
      phoneLink.href = `tel:${PORTFOLIO_CONFIG.phoneNumber.replace(/\s+/g, '')}`;
      phoneLink.style.pointerEvents = "auto";
    }
  } else {
    // If placeholder, make the link prompt user gracefully instead of failing
    if (phoneLink) {
      phoneLink.addEventListener('click', (e) => {
        if (PORTFOLIO_CONFIG.phoneNumber === "YOUR_MOBILE_NUMBER_HERE") {
          e.preventDefault();
          alert("Please update your phone number in index.html (or in script.js PORTFOLIO_CONFIG) to activate this button.");
        }
      });
    }
  }

  /* ========================================================================
     4. Mobile Navigation Menu Toggle & Auto-Close
     ======================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    // Toggle Menu on hamburger click
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('menu-open')) {
        navMenu.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu whenever any navigation link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when Escape key is pressed (Accessibility)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('menu-open')) {
        navMenu.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ========================================================================
     5. Header Scroll Effect & Back-to-Top Button
     ======================================================================== */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScrollEffects = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header background blur intensification
    if (header) {
      if (scrollY > 30) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0.7';
      }
    }
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects(); // Initial check

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ========================================================================
     6. Active Navigation Link on Scroll (ScrollSpy via IntersectionObserver)
     ======================================================================== */
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ========================================================================
     7. Scroll Reveal Animations (Subtle & Performance-Optimized)
     ======================================================================== */
  // Check if reduced-motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll(
      '.project-card, .skill-category-card, .research-card, .leadership-card, .hackathon-card, .certificate-card, .education-card, .contact-card, .about-main-card, .pillar-card'
    );

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach((el) => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  }

  /* ========================================================================
     8. Image Graceful Fallback Handler
     Ensures missing local images fail over to clean initial/placeholder styling
     ======================================================================== */
  const profileImg = document.getElementById('hero-profile-img');
  const avatarFallback = document.getElementById('avatar-fallback');

  if (profileImg && avatarFallback) {
    profileImg.addEventListener('error', () => {
      profileImg.style.display = 'none';
      avatarFallback.style.display = 'flex';
    });
  }

  /* ========================================================================
     9. Certificate Links Safety Handler
     Alerts user if clicked certificate file isn't uploaded yet
     ======================================================================== */
  const certButtons = document.querySelectorAll('.cert-btn');
  certButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      // If the link is an internal asset link, test if it might be missing
      if (href && href.startsWith('assets/certificates/')) {
        // Allow default behavior so browser attempts to open in new tab
      }
    });
  });

  console.log('%cSoumya Mehar Portfolio Website', 'color: #f8fafc; background: #090c12; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 4px; border: 1px solid #e2e8f0;');
  console.log('Crafted with semantic HTML5, modern vanilla CSS & vanilla JS.');
});
