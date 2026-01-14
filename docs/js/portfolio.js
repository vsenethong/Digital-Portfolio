// ============================================
// COLOR PALETTE & CONFIGURATION
// ============================================
const colorPalette = {
  // Brand Blues
  cloudySky: "#5697d3",
  brightOcean: "#418cc7",
  blueGrey: "#5a9cd3",
  babyBlueIce: "#90b9e2",
  
  // Neutrals
  vanillaCustard: "#ecdca0",
  dustGrey: "#D4CCC7",
  darkCoffee: "#3D2824",
  chocolatePlum: "#5B4747",
  paleOak: "#CDB7A2",
  
  // Dark Mode Navy
  midnightNavy: "#0B1324",
  deepNavy: "#141E36",
  navyBorder: "#24345C",
  mutedNavyText: "#B8C2D9"
};

const defaultConfig = {
  background_color: "#0B1324",
  surface_color: "#141E36",
  text_color: "#ecdca0",
  primary_action_color: "#5697d3",
  secondary_action_color: "#418cc7",
  accent_color: "#90b9e2",
  card_background: "#141E36",
  card_text: "#ecdca0"
};

const lightModeConfig = {
  background_color: "#faf8f6",
  surface_color: "#ffffff",
  text_color: "#3D2824",
  primary_action_color: "#418cc7",
  secondary_action_color: "#5697d3",
  accent_color: "#5a9cd3",
  card_background: "#ffffff",
  card_text: "#3D2824",
  border_color: "#CDB7A2"
};

// ============================================
// STATE MANAGEMENT
// ============================================
let currentTheme = 'dark';
let currentCodingIndex = 0;
let currentCreativeIndex = 0;

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initializeSidebar();
  initializeAnimations();
  initializeCarousel();
  initializeTheme();
  initializeScrollEffects();
  initializeTypingEffects();
  setupEventListeners();
});

// ============================================
// SIDEBAR MANAGEMENT
// ============================================
function initializeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.add('collapsed');
  sidebar.classList.remove('open');
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const isOpen = sidebar.classList.contains('open');
  
  if (isOpen) {
    sidebar.classList.remove('open');
    sidebar.classList.add('collapsed');
  } else {
    sidebar.classList.remove('collapsed');
    sidebar.classList.add('open');
  }
}

// ============================================
// CAROUSEL MANAGEMENT
// ============================================
function initializeCarousel() {
  updateCodingCarousel();
  updateCreativeCarousel();
}

function updateCodingCarousel() {
  const items = document.querySelectorAll('.coding-carousel');
  const total = items.length;
  
  items.forEach((item, index) => {
    item.classList.remove('active', 'prev', 'next', 'hidden');
    
    if (index === currentCodingIndex) {
      item.classList.add('active');
    } else if (index === (currentCodingIndex - 1 + total) % total) {
      item.classList.add('prev');
    } else if (index === (currentCodingIndex + 1) % total) {
      item.classList.add('next');
    } else {
      item.classList.add('hidden');
    }
  });
}

function updateCreativeCarousel() {
  const items = document.querySelectorAll('.creative-carousel');
  const total = items.length;
  
  items.forEach((item, index) => {
    item.classList.remove('active', 'prev', 'next', 'hidden');
    
    if (index === currentCreativeIndex) {
      item.classList.add('active');
    } else if (index === (currentCreativeIndex - 1 + total) % total) {
      item.classList.add('prev');
    } else if (index === (currentCreativeIndex + 1) % total) {
      item.classList.add('next');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ============================================
// ANIMATIONS
// ============================================
function initializeAnimations() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animateFadeElements(entry.target);
      }
    });
  }, { root: null, threshold: 0.1, rootMargin: '0px' });
  
  sections.forEach(section => observer.observe(section));
}

function animateFadeElements(target) {
  const fadeElements = target.querySelectorAll('.fade-in-up');
  fadeElements.forEach((el, index) => {
    setTimeout(() => el.classList.add('animated'), index * 100);
  });
}

// ============================================
// TYPING EFFECT
// ============================================
function initializeTypingEffects() {
  setupTypingObserver({ headingId: 'about-heading', threshold: 0.3 });
  setupTypingObserver({ headingId: 'connect-heading', threshold: 0.4 });
}

function setupTypingObserver({ headingId, threshold }) {
  const heading = document.getElementById(headingId);
  if (!heading) return;
  
  const fullText = heading.textContent;
  let hasTyped = false;
  
  heading.setAttribute('data-text', fullText);
  heading.textContent = '';
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
          hasTyped = true;
          typeText(heading, fullText);
          observer.unobserve(entry.target);
        }
      });
    },
    { root: document.querySelector('.scroll-container'), threshold, rootMargin: '0px' }
  );
  
  observer.observe(heading);
}

function typeText(element, text, speed = 80) {
  let index = 0;
  element.classList.add('typing');
  
  const typeInterval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        element.classList.remove('typing');
        element.classList.add('typing-complete');
      }, 500);
    }
  }, speed);
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initializeScrollEffects() {
  const scrollContainer = document.querySelector('.scroll-container');
  if (!scrollContainer) return;
  
  let lastScrollTop = 0;
  scrollContainer.addEventListener('scroll', () => {
    const scrollTop = scrollContainer.scrollTop;
    const menuToggle = document.getElementById('menuToggle');
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      menuToggle.style.opacity = '0.5';
    } else {
      menuToggle.style.opacity = '1';
    }
    
    lastScrollTop = scrollTop;
  });
}

// ============================================
// THEME MANAGEMENT
// ============================================
function initializeTheme() {
  applyTheme();
}

function applyTheme() {
  const config = currentTheme === 'light' ? lightModeConfig : defaultConfig;
  
  // Update theme toggle
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  if (themeIcon && themeText) {
    themeIcon.textContent = currentTheme === 'light' ? '☀️' : '🌙';
    themeText.textContent = currentTheme === 'light' ? 'Light Mode' : 'Dark Mode';
  }
  
  // Apply colors
  applyColors(config);
}

function applyColors(config) {
  // Body
  document.body.style.backgroundColor = config.background_color;
  document.body.style.color = config.text_color;
  
  // Sidebar
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.style.backgroundColor = config.surface_color;
  
  // Text elements
  ['sidebar-title', 'closeSidebar', 'menuToggle'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.color = config.text_color;
  });
  
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.style.color = config.text_color;
  });
  
  // Theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.style.backgroundColor = config.primary_action_color;
    themeToggle.style.color = currentTheme === 'light' ? '#ffffff' : colorPalette.vanillaCustard;
  }
  
  // Action buttons
  document.querySelectorAll('.scroll-btn').forEach(btn => {
    btn.style.backgroundColor = config.primary_action_color;
    btn.style.color = '#ffffff';
  });
  
  document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.style.backgroundColor = config.secondary_action_color;
    btn.style.color = '#ffffff';
  });
  
  // Skill badges
  document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.style.backgroundColor = config.secondary_action_color;
    badge.style.color = '#ffffff';
  });
  
  // Project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.backgroundColor = config.card_background;
    card.style.color = config.card_text;
    card.style.borderColor = currentTheme === 'light' ? config.border_color : colorPalette.navyBorder;
  });
  
  document.querySelectorAll('.project-card p').forEach(p => {
    p.style.color = currentTheme === 'light' ? colorPalette.chocolatePlum : colorPalette.mutedNavyText;
  });
  
  // Tech badges
  document.querySelectorAll('.project-card .text-xs').forEach(badge => {
    if (currentTheme === 'light') {
      badge.style.backgroundColor = 'rgba(65, 140, 199, 0.15)';
      badge.style.color = colorPalette.brightOcean;
    } else {
      badge.style.backgroundColor = 'rgba(144, 185, 226, 0.2)';
      badge.style.color = colorPalette.babyBlueIce;
    }
  });
  
  // Contact cards
  document.querySelectorAll('.contact-card').forEach(card => {
    card.style.backgroundColor = config.card_background;
    card.style.color = config.card_text;
    
    if (currentTheme === 'light') {
      card.style.border = `1px solid ${config.border_color}`;
      card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.06)';
    } else {
      card.style.border = `1px solid ${colorPalette.navyBorder}`;
      card.style.boxShadow = '0 10px 24px rgba(11, 19, 36, 0.45)';
    }
  });
  
  // Contact items
  document.querySelectorAll('.contact-item').forEach(item => {
    item.style.background = currentTheme === 'light' 
      ? 'rgba(90, 156, 211, 0.08)' 
      : 'rgba(90, 156, 211, 0.15)';
  });
  
  // Contact icons
  document.querySelectorAll('.contact-icon').forEach(icon => {
    icon.style.background = currentTheme === 'light' 
      ? 'rgba(86, 151, 211, 0.15)' 
      : 'rgba(86, 151, 211, 0.25)';
  });
  
  // Download button
  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.style.background = currentTheme === 'light'
      ? `linear-gradient(135deg, ${colorPalette.brightOcean}, ${colorPalette.cloudySky})`
      : `linear-gradient(135deg, ${colorPalette.cloudySky}, ${colorPalette.babyBlueIce})`;
    btn.style.color = '#ffffff';
  });
  
  // Stat cards
  document.querySelectorAll('.stat-card').forEach(card => {
    if (currentTheme === 'light') {
      card.style.background = 'rgba(65, 140, 199, 0.08)';
      card.style.border = '1px solid rgba(90, 156, 211, 0.2)';
    } else {
      card.style.background = 'rgba(90, 156, 211, 0.15)';
      card.style.border = 'none';
    }
  });
  
  // Gallery items
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.border = currentTheme === 'light' 
      ? `2px solid ${colorPalette.dustGrey}` 
      : '2px solid rgba(86, 151, 211, 0.3)';
  });
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
  // Sidebar controls
  document.getElementById('menuToggle')?.addEventListener('click', (e) => {
    toggleSidebar();
    e.stopPropagation();
  });
  
  document.getElementById('closeSidebar')?.addEventListener('click', (e) => {
    toggleSidebar();
    e.stopPropagation();
  });
  
  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      if (sidebar.classList.contains('open')) {
        toggleSidebar();
      }
    }
  });
  
  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (!anchor.classList.contains('nav-link')) {
      anchor.addEventListener('click', handleAnchorClick);
    }
  });
  
  // Carousel controls
  document.querySelector('.coding-prev-btn')?.addEventListener('click', () => {
    const total = document.querySelectorAll('.coding-carousel').length;
    currentCodingIndex = (currentCodingIndex - 1 + total) % total;
    updateCodingCarousel();
  });
  
  document.querySelector('.coding-next-btn')?.addEventListener('click', () => {
    const total = document.querySelectorAll('.coding-carousel').length;
    currentCodingIndex = (currentCodingIndex + 1) % total;
    updateCodingCarousel();
  });
  
  document.querySelector('.creative-prev-btn')?.addEventListener('click', () => {
    const total = document.querySelectorAll('.creative-carousel').length;
    currentCreativeIndex = (currentCreativeIndex - 1 + total) % total;
    updateCreativeCarousel();
  });
  
  document.querySelector('.creative-next-btn')?.addEventListener('click', () => {
    const total = document.querySelectorAll('.creative-carousel').length;
    currentCreativeIndex = (currentCreativeIndex + 1) % total;
    updateCreativeCarousel();
  });
  
  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    applyTheme();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboard);
}

// ============================================
// EVENT HANDLERS
// ============================================
function handleNavClick(e) {
  const targetId = e.target.getAttribute('href');
  
  if (targetId && targetId.startsWith('#')) {
    e.preventDefault();
    
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('open')) {
      toggleSidebar();
    }
    
    setTimeout(() => {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }
}

function handleAnchorClick(e) {
  const targetId = e.target.getAttribute('href');
  if (targetId && targetId !== '#') {
    e.preventDefault();
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function handleKeyboard(e) {
  const sidebar = document.getElementById('sidebar');
  
  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    toggleSidebar();
  }
  
  if (e.key === 'ArrowLeft') {
    document.querySelector('.coding-prev-btn')?.click();
  } else if (e.key === 'ArrowRight') {
    document.querySelector('.coding-next-btn')?.click();
  }
}