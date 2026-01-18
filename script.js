// Boot sequence - Start immediately when script loads
console.log('[BOOT] Script loaded');

const BOOT_MESSAGES = [
  'Initializing kernel modules...',
  'Loading system drivers...',
  'Mounting file systems...',
  'Scanning network interfaces...',
  'Initializing 3D renderer...',
  'Loading security protocols...',
  'Establishing secure connection...',
  'Compiling portfolio data...',
  'System check complete.'
];

// Start boot sequence immediately
function startBoot() {
  // Check if boot has already been shown in this session
  if (sessionStorage.getItem('bootCompleted')) {
    console.log('[BOOT] Boot already completed, skipping animation');
    const bootScreen = document.getElementById('boot-screen');
    bootScreen.style.display = 'none';
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.add('visible');
    window.scrollTo(0, 0);
    initializeApp();
    
    // Initialize chat hint even when boot is skipped
    if (typeof window.initChatHint === 'function') {
      window.initChatHint();
    }
    return;
  }
  
  console.log('[BOOT] Starting boot sequence');
  const bootLogs = document.getElementById('boot-logs');
  const progressFill = document.getElementById('boot-progress-fill');
  const bootPercent = document.getElementById('boot-percent');
  const bootStatus = document.getElementById('boot-status');
  const bootBtn = document.getElementById('boot-btn');

  if (!bootLogs || !bootBtn) {
    console.error('[BOOT] Elements not found. Retrying...');
    setTimeout(startBoot, 100);
    return;
  }

  console.log('[BOOT] Elements found, starting animation');
  let index = 0;
  let currentProgress = 0;

  const interval = setInterval(() => {
    if (index < BOOT_MESSAGES.length) {
      const logDiv = document.createElement('div');
      logDiv.className = 'boot-log';
      logDiv.textContent = '>> ' + BOOT_MESSAGES[index];
      bootLogs.appendChild(logDiv);
      
      // Auto-scroll
      const container = bootLogs.parentElement;
      if (container) container.scrollTop = container.scrollHeight;
      
      // Calculate target progress
      const targetProgress = ((index + 1) / BOOT_MESSAGES.length) * 100;
      bootStatus.textContent = BOOT_MESSAGES[index];
      
      // Smooth animate from current to target
      animateProgress(currentProgress, targetProgress, progressFill, bootPercent, 350);
      currentProgress = targetProgress;
      
      console.log('[BOOT]', index + 1, '/', BOOT_MESSAGES.length);
      index++;
    } else {
      clearInterval(interval);
      // Ensure it reaches 100%
      animateProgress(currentProgress, 100, progressFill, bootPercent, 200);
      setTimeout(() => {
        console.log('[BOOT] Complete! Showing button...');
        bootBtn.classList.add('visible');
        bootBtn.addEventListener('click', enterSystem);
      }, 200);
    }
  }, 400);
}

function animateProgress(start, end, progressFill, bootPercent, duration) {
  const startTime = Date.now();
  
  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = start + (end - start) * progress;
    
    progressFill.style.width = current + '%';
    bootPercent.textContent = Math.round(current) + '%';
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  update();
}

function enterSystem() {
  console.log('[BOOT] Entering system...');
  const bootScreen = document.getElementById('boot-screen');
  bootScreen.classList.add('hidden');
  
  // Mark boot as completed for this session
  sessionStorage.setItem('bootCompleted', 'true');
  
  // Instantly scroll to top
  window.scrollTo(0, 0);
  
  setTimeout(() => {
    bootScreen.style.display = 'none';
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.add('visible');
    initializeApp();
    
    // Initialize chat hint after boot screen is dismissed (2 seconds after this point)
    if (typeof window.initChatHint === 'function') {
      window.initChatHint();
    }
  }, 600);
}

function initializeApp() {
  console.log('[APP] Initializing application');
  init3D();
  setupNav();
  populateSkills();
  populateTimeline();
  populateProjects();
  setupTerminal();
  setupScroll();
}

// ==================== 3D BACKGROUND ====================
let scene, camera, renderer;
let cube, torus, sphere, particles;
let mouseX = 0, mouseY = 0;

function init3D() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  try {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 8;
    camera.position.y = 2;

    // Cube
    const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x00ff9f,
      wireframe: true,
      emissive: 0x00ff9f,
      emissiveIntensity: 0.2
    });
    cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.set(-3, 1, 0);
    scene.add(cube);

    // Torus
    const torusGeo = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x0080ff,
      wireframe: true,
      emissive: 0x0080ff,
      emissiveIntensity: 0.2
    });
    torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(3, 1, -2);
    scene.add(torus);

    // Sphere
    const sphereGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xff0080,
      wireframe: true,
      emissive: 0xff0080,
      emissiveIntensity: 0.2
    });
    sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(0, -2, -3);
    scene.add(sphere);

    // Particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x00ff9f,
      size: 0.03,
      transparent: true,
      opacity: 0.6
    });
    particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Grid
    const grid = new THREE.GridHelper(20, 20, 0x00ff9f, 0x004433);
    grid.position.y = -3;
    scene.add(grid);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light1 = new THREE.PointLight(0x00ff9f, 1.5, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    const light2 = new THREE.PointLight(0x0080ff, 1.5, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate3D();
  } catch (e) {
    console.warn('3D disabled:', e);
  }
}

function animate3D() {
  requestAnimationFrame(animate3D);
  if (!renderer || !scene) return;

  const targetX = mouseX * 0.002;
  const targetY = mouseY * 0.002;

  if (cube) {
    cube.rotation.x += 0.008 + targetY;
    cube.rotation.y += 0.008 + targetX;
    cube.rotation.z += 0.003;
  }
  if (torus) {
    torus.rotation.x += 0.005 - targetY;
    torus.rotation.y += 0.01 + targetX;
  }
  if (sphere) {
    sphere.rotation.x += 0.003;
    sphere.rotation.y += 0.007;
    sphere.rotation.z += 0.002;
  }
  if (particles) particles.rotation.y += 0.0005;

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = scrollHeight > 0 ? window.pageYOffset / scrollHeight : 0;

  if (camera) {
    camera.position.z = 8 - scrollProgress * 15;
    camera.position.y = 2 - scrollProgress * 8;
    camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 2;
    camera.rotation.x = scrollProgress * 0.5;
  }

  if (cube) cube.position.y = 1 + Math.sin(scrollProgress * Math.PI * 4) * 2;
  if (torus) torus.position.y = 1 + Math.cos(scrollProgress * Math.PI * 3) * 2;
  if (sphere) sphere.position.y = -2 + Math.sin(scrollProgress * Math.PI * 5) * 1.5;

  renderer.render(scene, camera);
}

// ==================== NAVIGATION ====================
function setupNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  let isScrolling = false; // Flag to prevent updates during programmatic scroll
  let scrollTimeout;
  
  // Click handler for smooth scrolling
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Immediately set active class on clicked item
      navItems.forEach(navItem => navItem.classList.remove('active'));
      item.classList.add('active');
      
      // Set flag to prevent scroll handler from interfering
      isScrolling = true;
      
      const target = document.querySelector(item.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        
        // Reset flag after scroll completes (smooth scroll takes ~1 second)
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          updateActiveNav(); // Update based on actual position
        }, 1000);
      }
    });
  });
  
  // Scroll handler to update active nav item based on current section
  function updateActiveNav() {
    // Don't update if user just clicked a nav item
    if (isScrolling) return;
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      // Check if section is in viewport (with offset for navbar)
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    // Update active class
    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href === '#' + current) {
        item.classList.add('active');
      }
    });
  }
  
  // Run on scroll
  window.addEventListener('scroll', updateActiveNav);
  
  // Run once on load
  updateActiveNav();
}

// ==================== SKILLS ====================
function populateSkills() {
  const skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;

  const skills = [
    { name: 'Python for Hacking', level: 60 },
    { name: 'Networking', level: 10 },
    { name: 'Web Security', level: 50 },
    { name: 'Java', level: 80 },
    { name: 'Malware Analysis', level: 45 },
    { name: 'Low Level Languages (Assembly/C)', level: 35 }
  ];

  skillsGrid.innerHTML = '';
  skills.forEach((skill, idx) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
      <h3>${skill.name}</h3>
      <div class="skill-level-bar">
        <div class="skill-level-fill" data-level="${skill.level}" style="width: 0%;"></div>
      </div>
      <p class="skill-percentage"><span class="skill-value">0</span>%</p>
    `;
    skillsGrid.appendChild(card);
  });

  // Animate bars when scrolling to skills section
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = document.querySelectorAll('.skill-level-fill');
          
          fills.forEach((fill, idx) => {
            // Reset animation first
            fill.style.transition = 'none';
            fill.style.width = '0%';
            const valueSpan = fill.parentElement.nextElementSibling.querySelector('.skill-value');
            valueSpan.textContent = '0';
            
            setTimeout(() => {
              const targetLevel = parseInt(fill.getAttribute('data-level'));
              
              // Force reflow to ensure transition works
              fill.offsetHeight;
              
              // Apply transition
              fill.style.transition = 'width 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
              fill.style.width = targetLevel + '%';
              
              // Animate the percentage number
              let current = 0;
              const step = Math.max(1, Math.ceil(targetLevel / 30));
              const interval = setInterval(() => {
                current += step;
                if (current >= targetLevel) {
                  current = targetLevel;
                  clearInterval(interval);
                }
                valueSpan.textContent = current;
              }, 50);
            }, idx * 120);
          });
          
          // Animation can now replay on every intersection
        }
      });
    }, { threshold: 0.2 });
    observer.observe(skillsSection);
  }
}

// ==================== TIMELINE ====================
function populateTimeline() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  const items = [
    { title: 'Foundations', desc: 'Python, Linux basics, networking fundamentals, system administration' },
    { title: 'Web Security', desc: 'SQL injection, XSS attacks, CSRF, web application penetration testing' },
    { title: 'Malware Analysis', desc: 'Reverse engineering, behavioral analysis, sandboxing, threat intelligence' },
    { title: 'Advanced Security', desc: 'Penetration testing, privilege escalation, exploit development, red team ops' }
  ];

  timeline.innerHTML = '';
  items.forEach((item, idx) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.innerHTML = `
      <div class="timeline-item-content">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;
    timeline.appendChild(timelineItem);
    
    // Add hover animations
    timelineItem.addEventListener('mouseenter', function() {
      this.classList.add('hovered');
    });
    
    timelineItem.addEventListener('mouseleave', function() {
      this.classList.remove('hovered');
    });

    // Individual card animation when it scrolls into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reset animation first
          entry.target.classList.remove('visible');
          
          // Force reflow
          void entry.target.offsetHeight;
          
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 0);
          
          // Animation can now replay on every intersection
        } else {
          // Remove visible class when scrolled out of view to allow re-animation
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.15 });
    
    observer.observe(timelineItem);
  });
}

// ==================== PROJECTS ====================
function populateProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  const projects = [

    { name: 'Caesar Cipher', desc: 'Classic encryption/decryption tool implemented in Python. Demonstrates fundamental cryptography concepts including key rotation, frequency analysis, and cipher breaking techniques.', tech: ['Python', 'Cryptography'] },
    { name: 'Java Tic Tac Toe', desc: 'Secure tic tac toe implementation with tight encapsulation and access control', tech: ['Java', 'Security'] },
    { name: 'JavaScript Form Validator', desc: 'Frontend form validation with security best practices and input sanitization', tech: ['JavaScript', 'Web Security'] },
    { name: 'Network Scanner', desc: 'Python-based network reconnaissance tool for port scanning and service enumeration', tech: ['Python', 'Networking'] }
  ];

  projectsGrid.innerHTML = '';
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    const techTags = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
    card.innerHTML = `
      <div class="project-card-content">
        <h3>${project.name}</h3>
        <p>${project.desc}</p>
        <div class="project-tech">${techTags}</div>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

// ==================== TERMINAL ====================
function setupTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  const commands = {
    'help': 'Commands: about | skills | projects | goto [section] | theme | clear | time | focus',
    'about': 'Cybersecurity enthusiast specializing in hacking, malware analysis, and security research.',
    'skills': 'Python for Hacking, Networking, Web Security, Java, Malware Analysis, Low Level Languages',
    'projects': 'Visit the PROJECTS section to see my work',
    'focus': 'Focus areas: Networking, Python for Hacking, Malware Analysis & Creation, Low Level Languages',
    'theme': 'Theme toggled!',
    'time': new Date().toLocaleTimeString(),
    'clear': ''
  };

  input.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;

    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    let result = commands[cmd];

    if (cmd === 'clear') {
      output.innerHTML = '';
      input.value = '';
      return;
    }

    if (cmd.startsWith('goto ')) {
      const section = cmd.substring(5);
      const target = document.querySelector('#' + section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        result = `Going to ${section}...`;
      } else {
        result = `Not found: ${section}`;
      }
    } else if (cmd === 'theme') {
      document.body.classList.toggle('light-theme');
    } else if (!result) {
      result = 'Unknown command';
    }

    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="terminal-prompt">$</span> ${cmd}<br><span style="color: var(--secondary);">${result || ''}</span>`;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
    input.value = '';
  });
}

// ==================== SCROLL PROGRESS ====================
function setupScroll() {
  const scrollProgress = document.getElementById('scroll-progress');
  const finalProgress = document.getElementById('final-progress');

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';
    if (finalProgress) finalProgress.textContent = Math.round(scrolled);
  });
}

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    // Icon switching is handled by CSS
  });
}

// ==================== MOVE TO TOP BUTTON ====================
const moveToTopBtn = document.createElement('button');
moveToTopBtn.id = 'move-to-top';
moveToTopBtn.className = 'move-to-top';
moveToTopBtn.innerHTML = '↑ TOP';
moveToTopBtn.setAttribute('title', 'Move to top');
document.body.appendChild(moveToTopBtn);

moveToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    moveToTopBtn.classList.add('visible');
  } else {
    moveToTopBtn.classList.remove('visible');
  }
});

// ==================== START HERE ====================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startBoot);
} else {
  startBoot();
}
