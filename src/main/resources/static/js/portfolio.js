const defaultConfig = {
  background_color: "#0f172a",
  surface_color: "#1e293b",
  text_color: "#f1f5f9",
  primary_action_color: "#8b5cf6",
  secondary_action_color: "#6366f1",
  font_family: "system-ui",
  font_size: 16,
  site_title: "Vanessa Senethong",
  tagline: "Creative Designer & Developer",
  about_heading: "Hi, I'm Vanessa Senethong.",
  about_text: "I'm a passionate creative professional with expertise in design and development. I love bringing ideas to life through innovative digital experiences that engage and inspire.",
  projects_heading: "My Projects"
};

let currentTheme = 'dark';
let currentCodingIndex = 0;
let currentCreativeIndex = 0;
const codingCarouselItems = document.querySelectorAll('.coding-carousel');
const creativeCarouselItems = document.querySelectorAll('.creative-carousel');
const totalCodingItems = codingCarouselItems.length;
const totalCreativeItems = creativeCarouselItems.length;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
  initializeCarousel();
  initializeSidebar();
  initializeTheme();
  initializeScrollEffects();
  initializeTypingEffect();
  applyConfig(defaultConfig);
});

// Section Visibility Observer
function initializeAnimations() {
  const sections = document.querySelectorAll('.section');

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger fade-in-up animations
        const fadeElements = entry.target.querySelectorAll('.fade-in-up');
        fadeElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('animated');
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Carousel Functions
function initializeCarousel() {
  updateCodingCarousel();
  updateCreativeCarousel();
}

function updateCodingCarousel() {
  codingCarouselItems.forEach((item, index) => {
    item.classList.remove('active', 'prev', 'next', 'hidden');

    if (index === currentCodingIndex) {
      item.classList.add('active');
    } else if (index === (currentCodingIndex - 1 + totalCodingItems) % totalCodingItems) {
      item.classList.add('prev');
    } else if (index === (currentCodingIndex + 1) % totalCodingItems) {
      item.classList.add('next');
    } else {
      item.classList.add('hidden');
    }
  });
}

function updateCreativeCarousel() {
  creativeCarouselItems.forEach((item, index) => {
    item.classList.remove('active', 'prev', 'next', 'hidden');

    if (index === currentCreativeIndex) {
      item.classList.add('active');
    } else if (index === (currentCreativeIndex - 1 + totalCreativeItems) % totalCreativeItems) {
      item.classList.add('prev');
    } else if (index === (currentCreativeIndex + 1) % totalCreativeItems) {
      item.classList.add('next');
    } else {
      item.classList.add('hidden');
    }
  });
}

// Coding Carousel Controls
document.querySelector('.coding-prev-btn')?.addEventListener('click', () => {
  currentCodingIndex = (currentCodingIndex - 1 + totalCodingItems) % totalCodingItems;
  updateCodingCarousel();
  addButtonFeedback(document.querySelector('.coding-prev-btn'));
});

document.querySelector('.coding-next-btn')?.addEventListener('click', () => {
  currentCodingIndex = (currentCodingIndex + 1) % totalCodingItems;
  updateCodingCarousel();
  addButtonFeedback(document.querySelector('.coding-next-btn'));
});

// Creative Carousel Controls
document.querySelector('.creative-prev-btn')?.addEventListener('click', () => {
  currentCreativeIndex = (currentCreativeIndex - 1 + totalCreativeItems) % totalCreativeItems;
  updateCreativeCarousel();
  addButtonFeedback(document.querySelector('.creative-prev-btn'));
});

document.querySelector('.creative-next-btn')?.addEventListener('click', () => {
  currentCreativeIndex = (currentCreativeIndex + 1) % totalCreativeItems;
  updateCreativeCarousel();
  addButtonFeedback(document.querySelector('.creative-next-btn'));
});

// Add click feedback animation
function addButtonFeedback(button) {
  if (button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 100);
  }
}

// Sidebar Functions
function initializeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.add('collapsed');
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const isCollapsed = sidebar.classList.contains('collapsed');

  if (isCollapsed) {
    sidebar.classList.remove('collapsed');
    sidebar.classList.add('open');
  } else {
    sidebar.classList.remove('open');
    sidebar.classList.add('collapsed');
  }
}

document.getElementById('menuToggle')?.addEventListener('click', (e) => {
  toggleSidebar();
  e.stopPropagation();
});

document.getElementById('closeSidebar')?.addEventListener('click', (e) => {
  toggleSidebar();
  e.stopPropagation();
});

// Close sidebar when clicking navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');

    // Smooth scroll to section
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();

      // Close sidebar first
      const sidebar = document.getElementById('sidebar');
      if (sidebar.classList.contains('open')) {
        toggleSidebar();
      }

      // Wait for sidebar to close, then scroll
      setTimeout(() => {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  if (!anchor.classList.contains('nav-link')) {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }
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

// Theme Toggle
function initializeTheme() {
  applyTheme();
}

document.getElementById('themeToggle')?.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme();

  // Add transition effect
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
});

function applyTheme() {
  if (currentTheme === 'light') {
    applyConfig({
      background_color: "#f8fafc",
      surface_color: "#ffffff",
      text_color: "#0f172a",
      primary_action_color: "#8b5cf6",
      secondary_action_color: "#6366f1"
    });
    document.getElementById('themeIcon').textContent = '☀️';
    document.getElementById('themeText').textContent = 'Light Mode';
  } else {
    applyConfig(defaultConfig);
    document.getElementById('themeIcon').textContent = '🌙';
    document.getElementById('themeText').textContent = 'Dark Mode';
  }
}

// Scroll Effects
function initializeScrollEffects() {
  const scrollContainer = document.querySelector('.scroll-container');
  let lastScrollTop = 0;

  scrollContainer.addEventListener('scroll', () => {
    const scrollTop = scrollContainer.scrollTop;
    const menuToggle = document.getElementById('menuToggle');

    // Hide/show menu button on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      menuToggle.style.opacity = '0.5';
    } else {
      menuToggle.style.opacity = '1';
    }

    lastScrollTop = scrollTop;
  });
}

// Apply Configuration
function applyConfig(config) {
  const baseSize = config.font_size || defaultConfig.font_size;
  const customFont = config.font_family || defaultConfig.font_family;
  const baseFontStack = 'system-ui, -apple-system, sans-serif';

  // Body styles
  document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;
  document.body.style.color = config.text_color || defaultConfig.text_color;
  document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
  document.body.style.fontSize = `${baseSize}px`;

  // Sidebar
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
    sidebar.style.transition = 'all 0.3s ease';
  }

  // Sidebar elements
  const sidebarTitle = document.getElementById('sidebar-title');
  if (sidebarTitle) {
    sidebarTitle.style.color = config.text_color || defaultConfig.text_color;
  }

  const closeSidebar = document.getElementById('closeSidebar');
  if (closeSidebar) {
    closeSidebar.style.color = config.text_color || defaultConfig.text_color;
  }

  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.style.color = config.text_color || defaultConfig.text_color;
  });

  // Theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
    themeToggle.style.color = '#ffffff';
  }

  // Menu toggle
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.style.color = config.text_color || defaultConfig.text_color;
  }

  // Site title
  const siteTitle = document.getElementById('site-title');
  if (siteTitle) {
    siteTitle.textContent = config.site_title || defaultConfig.site_title;
    siteTitle.style.fontSize = `${baseSize * 3.75}px`;
    siteTitle.style.color = config.text_color || defaultConfig.text_color;
    siteTitle.style.fontFamily = `${customFont}, ${baseFontStack}`;
  }

  // Tagline
  const tagline = document.getElementById('tagline');
  if (tagline) {
    tagline.textContent = config.tagline || defaultConfig.tagline;
    tagline.style.fontSize = `${baseSize * 1.5}px`;
    tagline.style.color = config.text_color || defaultConfig.text_color;
    tagline.style.fontFamily = `${customFont}, ${baseFontStack}`;
  }

  // Scroll buttons
  document.querySelectorAll('.scroll-btn').forEach(btn => {
    btn.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
    btn.style.color = '#ffffff';
    btn.style.fontFamily = `${customFont}, ${baseFontStack}`;
  });

  // About section
  const aboutHeading = document.getElementById('about-heading');
  if (aboutHeading) {
    // Only update if it's not the typing text
    const storedText = aboutHeading.getAttribute('data-text');
    if (!storedText) {
      aboutHeading.textContent = config.about_heading || defaultConfig.about_heading;
    }
    aboutHeading.style.fontSize = `${baseSize * 3.125}px`;
    aboutHeading.style.color = config.text_color || defaultConfig.text_color;
    aboutHeading.style.fontFamily = `${customFont}, ${baseFontStack}`;
  }

  const aboutText = document.getElementById('about-text');
  if (aboutText) {
    aboutText.textContent = config.about_text || defaultConfig.about_text;
    aboutText.style.fontSize = `${baseSize * 1.125}px`;
    aboutText.style.color = config.text_color || defaultConfig.text_color;
    aboutText.style.fontFamily = `${customFont}, ${baseFontStack}`;
  }

  // Skill badges
  document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.style.backgroundColor = config.secondary_action_color || defaultConfig.secondary_action_color;
    badge.style.color = '#ffffff';
    badge.style.fontFamily = `${customFont}, ${baseFontStack}`;
  });

  // Projects section
  const projectsHeading = document.getElementById('projects-heading');
  if (projectsHeading) {
    projectsHeading.textContent = config.projects_heading || defaultConfig.projects_heading;
    projectsHeading.style.fontSize = `${baseSize * 3.125}px`;
    projectsHeading.style.color = config.text_color || defaultConfig.text_color;
    projectsHeading.style.fontFamily = `${customFont}, ${baseFontStack}`;
  }

  // Carousel buttons
  document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.style.backgroundColor = config.secondary_action_color || defaultConfig.secondary_action_color;
    btn.style.color = '#ffffff';
    btn.style.fontFamily = `${customFont}, ${baseFontStack}`;
  });
}

// Typing Effect for About Heading
function initializeTypingEffect() {
  const aboutHeading = document.getElementById('about-heading');
  if (!aboutHeading) return;

  const fullText = aboutHeading.textContent;
  let hasTyped = false;

  // Store original text and clear it
  aboutHeading.setAttribute('data-text', fullText);
  aboutHeading.textContent = '';

  const observerOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasTyped) {
        hasTyped = true;
        typeText(aboutHeading, fullText);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    observer.observe(aboutSection);
  }
}

function typeText(element, text, speed = 80) {
  let index = 0;

  // Add cursor
  element.classList.add('typing');

  const typeInterval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typeInterval);
      // Remove cursor after typing is complete
      setTimeout(() => {
        element.classList.remove('typing');
        element.classList.add('typing-complete');
      }, 500);
    }
  }, speed);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const sidebar = document.getElementById('sidebar');

  // ESC to close sidebar
  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    toggleSidebar();
  }

  // Arrow keys for carousel
  if (e.key === 'ArrowLeft') {
    document.querySelector('.coding-prev-btn')?.click();
  } else if (e.key === 'ArrowRight') {
    document.querySelector('.coding-next-btn')?.click();
  }
});