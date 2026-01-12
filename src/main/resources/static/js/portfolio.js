// Custom Color Palette Configuration
const colorPalette = {
  // Logo Blues (from VanessaLogo.png)
  cloudySky: "#5697d3",
  brightOcean: "#418cc7",
  blueGrey: "#5a9cd3",
  vanillaCustard: "#ecdca0",
  babyBlueIce: "#90b9e2",

  // Headshot Neutrals (from headshot.png)
  dustGrey: "#D4CCC7",
  darkCoffee: "#3D2824",
  chocolatePlum: "#5B4747",
  paleOak: "#CDB7A2",
  mauveBark: "#7D5D51"
};

const defaultConfig = {
  // Dark Mode Colors
  background_color: "#1a1412", // Darker version of darkCoffee for better contrast
  surface_color: "#3D2824", // darkCoffee for cards/surfaces
  text_color: "#ecdca0", // vanillaCustard for text
  primary_action_color: "#5697d3", // cloudySky for primary buttons
  secondary_action_color: "#418cc7", // brightOcean for secondary elements
  accent_color: "#90b9e2", // babyBlueIce for highlights
  card_background: "#3D2824", // darkCoffee
  card_text: "#ecdca0", // vanillaCustard

  // Typography
  font_family: "system-ui",
  font_size: 16,

  // Content
  site_title: "Vanessa Senethong",
  tagline: "Software Engineer & Frontend Developer",
  about_heading: "Hi, I'm Vanessa Senethong.",
  about_text: "I'm a results-driven Software Engineer and Frontend Developer with experience building user-focused web applications.",
  projects_heading: "Featured Projects"
};

// Light Mode Colors (Accessible variants)
const lightModeConfig = {
  background_color: "#faf8f6", // Very light version of paleOak
  surface_color: "#ffffff", // Pure white for cards
  text_color: "#3D2824", // darkCoffee for text (good contrast on white)
  primary_action_color: "#418cc7", // brightOcean (darker blue for better contrast)
  secondary_action_color: "#5697d3", // cloudySky
  accent_color: "#5a9cd3", // blueGrey
  card_background: "#ffffff",
  card_text: "#3D2824",

  // Muted backgrounds for light mode
  muted_background: "#D4CCC7", // dustGrey for subtle sections
  border_color: "#CDB7A2" // paleOak for borders
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
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('open');
  sidebar.classList.add('collapsed');

  initializeAnimations();
  initializeCarousel();
  initializeSidebar();
  initializeTheme();
  initializeScrollEffects();
  initializeTypingEffects();
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
  // Start with sidebar closed
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
      secondary_action_color: "#6366f1",
      card_background: "#ffffff",
      card_text: "#1f2937"
    });
    document.getElementById('themeIcon').textContent = '☀️';
    document.getElementById('themeText').textContent = 'Light Mode';
  } else {
    applyConfig({
      ...defaultConfig,
      card_background: "#1f2937",
      card_text: "#f3f4f6"
    });
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

  // Project cards - apply theme
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.backgroundColor = config.card_background || '#1f2937';
    card.style.color = config.card_text || '#f3f4f6';
  });

  document.querySelectorAll('.project-card p').forEach(p => {
    if (currentTheme === 'light') {
      p.style.color = '#4b5563'; // gray-600 for light mode
    } else {
      p.style.color = '#d1d5db'; // gray-300 for dark mode
    }
  });

  // Contact cards
  document.querySelectorAll('.contact-card').forEach(card => {
    if (currentTheme === 'light') {
      card.style.background = 'rgba(255, 255, 255, 0.9)';
      card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
      card.style.background = 'rgba(31, 41, 55, 0.5)';
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    }
  });

  document.querySelectorAll('.contact-item, .stat-card').forEach(item => {
    if (currentTheme === 'light') {
      item.style.background = 'rgba(99, 102, 241, 0.05)';
    } else {
      item.style.background = 'rgba(99, 102, 241, 0.1)';
    }
  });
}

// Typing Effect for About Heading
function initializeTypingEffects() {
  const typingConfigs = [
    { headingId: 'about-heading', threshold: 0.3 },
    { headingId: 'connect-heading', threshold: 0.4 }
  ];

  typingConfigs.forEach(setupTypingObserver);
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
    {
      root: document.querySelector('.scroll-container'),
      threshold,
      rootMargin: '0px'
    }
  );

  observer.observe(heading);
  console.log('Observing:', headingId);
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

// Theme Toggle with Custom Colors
function initializeTheme() {
  applyTheme();
}

document.getElementById('themeToggle')?.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme();
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
});

function applyTheme() {
  if (currentTheme === 'light') {
    applyConfig({
      ...lightModeConfig,
      font_family: defaultConfig.font_family,
      font_size: defaultConfig.font_size,
      site_title: defaultConfig.site_title,
      tagline: defaultConfig.tagline,
      about_heading: defaultConfig.about_heading,
      about_text: defaultConfig.about_text,
      projects_heading: defaultConfig.projects_heading
    });
    document.getElementById('themeIcon').textContent = '☀️';
    document.getElementById('themeText').textContent = 'Light Mode';
  } else {
    applyConfig(defaultConfig);
    document.getElementById('themeIcon').textContent = '🌙';
    document.getElementById('themeText').textContent = 'Dark Mode';
  }
}

// Enhanced Apply Configuration with Custom Colors
function applyConfig(config) {
  const baseSize = config.font_size || defaultConfig.font_size;
  const customFont = config.font_family || defaultConfig.font_family;
  const baseFontStack = 'system-ui, -apple-system, sans-serif';

  // Body styles with custom colors
  document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;
  document.body.style.color = config.text_color || defaultConfig.text_color;
  document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
  document.body.style.fontSize = `${baseSize}px`;

  // Sidebar with darkCoffee/white
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

  // Theme toggle with cloudySky
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
    themeToggle.style.color = currentTheme === 'light' ? '#ffffff' : '#ecdca0';
  }

  // Menu toggle
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.style.color = config.text_color || defaultConfig.text_color;
  }

  // Scroll buttons with brightOcean
  document.querySelectorAll('.scroll-btn').forEach(btn => {
    btn.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
    btn.style.color = '#ffffff';
    btn.style.fontFamily = `${customFont}, ${baseFontStack}`;
  });

  // About section headings
  const aboutHeading = document.getElementById('about-heading');
  if (aboutHeading) {
    const storedText = aboutHeading.getAttribute('data-text');
    if (!storedText) {
      aboutHeading.textContent = config.about_heading || defaultConfig.about_heading;
    }
    aboutHeading.style.fontSize = `${baseSize * 3.125}px`;
    aboutHeading.style.color = config.text_color || defaultConfig.text_color;
    aboutHeading.style.fontFamily = `${customFont}, ${baseFontStack}`;
  }

  // Skill badges with blueGrey/brightOcean
  document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.style.backgroundColor = config.secondary_action_color || defaultConfig.secondary_action_color;
    badge.style.color = '#ffffff';
    badge.style.fontFamily = `${customFont}, ${baseFontStack}`;
  });

  // Carousel buttons with cloudySky
  document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.style.backgroundColor = config.secondary_action_color || defaultConfig.secondary_action_color;
    btn.style.color = '#ffffff';
    btn.style.fontFamily = `${customFont}, ${baseFontStack}`;
  });

  // Project cards with darkCoffee/white
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.backgroundColor = config.card_background || defaultConfig.card_background;
    card.style.color = config.card_text || defaultConfig.card_text;
    card.style.borderColor = currentTheme === 'light' ? (config.border_color || '#CDB7A2') : 'transparent';
  });

  // Project card text
  document.querySelectorAll('.project-card p').forEach(p => {
    if (currentTheme === 'light') {
      p.style.color = '#5B4747'; // chocolatePlum for better readability
    } else {
      p.style.color = '#D4CCC7'; // dustGrey for dark mode
    }
  });

  // Tech stack badges
  document.querySelectorAll('.project-card .text-xs').forEach(badge => {
    if (currentTheme === 'light') {
      badge.style.backgroundColor = 'rgba(65, 140, 199, 0.15)'; // brightOcean with transparency
      badge.style.color = '#418cc7'; // brightOcean
    } else {
      badge.style.backgroundColor = 'rgba(144, 185, 226, 0.2)'; // babyBlueIce with transparency
      badge.style.color = '#90b9e2'; // babyBlueIce
    }
  });

  // Contact cards with darkCoffee/white
  document.querySelectorAll('.contact-card').forEach(card => {
    if (currentTheme === 'light') {
      card.style.background = '#ffffff';
      card.style.boxShadow = '0 4px 6px rgba(61, 40, 36, 0.1)';
      card.style.border = '1px solid #D4CCC7'; // dustGrey border
    } else {
      card.style.background = 'rgba(61, 40, 36, 0.6)'; // darkCoffee with transparency
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
      card.style.border = 'none';
    }
  });

  // Contact items with blueGrey
  document.querySelectorAll('.contact-item').forEach(item => {
    if (currentTheme === 'light') {
      item.style.background = 'rgba(90, 156, 211, 0.08)'; // blueGrey with low opacity
    } else {
      item.style.background = 'rgba(90, 156, 211, 0.15)';
    }
  });

  // Contact icons with cloudySky
  document.querySelectorAll('.contact-icon').forEach(icon => {
    if (currentTheme === 'light') {
      icon.style.background = 'rgba(86, 151, 211, 0.15)'; // cloudySky
    } else {
      icon.style.background = 'rgba(86, 151, 211, 0.25)';
    }
  });

  // Download button with gradient
  document.querySelectorAll('.download-btn').forEach(btn => {
    if (currentTheme === 'light') {
      btn.style.background = `linear-gradient(135deg, ${colorPalette.brightOcean}, ${colorPalette.cloudySky})`;
    } else {
      btn.style.background = `linear-gradient(135deg, ${colorPalette.cloudySky}, ${colorPalette.babyBlueIce})`;
    }
    btn.style.color = '#ffffff';
  });

  // Stat cards
  document.querySelectorAll('.stat-card').forEach(card => {
    if (currentTheme === 'light') {
      card.style.background = 'rgba(65, 140, 199, 0.08)'; // brightOcean
      card.style.border = '1px solid rgba(90, 156, 211, 0.2)'; // blueGrey
    } else {
      card.style.background = 'rgba(90, 156, 211, 0.15)';
      card.style.border = 'none';
    }
  });

  // Gallery items border
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (currentTheme === 'light') {
      item.style.border = '2px solid #D4CCC7'; // dustGrey
    } else {
      item.style.border = '2px solid rgba(86, 151, 211, 0.3)'; // cloudySky
    }
  });
}
