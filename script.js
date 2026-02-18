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

let isWindowLoaded = false;
window.addEventListener('load', () => {
  isWindowLoaded = true;
});

function startBoot() {
  if (sessionStorage.getItem('bootCompleted')) {
    const bootScreen = document.getElementById('boot-screen');
    if (bootScreen) bootScreen.style.display = 'none';
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.add('visible');
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    setTimeout(() => {
      document.body.classList.remove('preload');
    }, 200);
    
    initializeApp();
    
    if (typeof window.initChatHint === 'function') {
      window.initChatHint();
    }
    return;
  }
  
  const bootLogs = document.getElementById('boot-logs');
  const progressFill = document.getElementById('boot-progress-fill');
  const bootPercent = document.getElementById('boot-percent');
  const bootStatus = document.getElementById('boot-status');
  const bootBtn = document.getElementById('boot-btn');

  if (!bootLogs || !bootBtn) {
    setTimeout(startBoot, 100);
    return;
  }

  let index = 0;
  let currentProgress = 0;
  let targetProgress = 0;

  // Function to update progress smoothly
  function updateProgress() {
    if (currentProgress < targetProgress) {
      currentProgress += 1;
      if (progressFill) progressFill.style.width = currentProgress + '%';
      if (bootPercent) bootPercent.textContent = Math.round(currentProgress) + '%';
    }
    
    if (currentProgress >= 100 && isWindowLoaded) {
      if (bootBtn) {
        bootBtn.classList.add('visible');
        bootBtn.addEventListener('click', enterSystem);
      }
      if (bootStatus) bootStatus.textContent = "System Ready.";
      return; // Stop updating
    }
    
    requestAnimationFrame(updateProgress);
  }
  
  updateProgress();

  const interval = setInterval(() => {
    // If messages are done but window isn't loaded, stick at 90%
    if (index >= BOOT_MESSAGES.length) {
      if (isWindowLoaded) {
        targetProgress = 100;
        clearInterval(interval);
      } else {
        targetProgress = 90; // Wait for load
      }
      return;
    }

    // Add log message
    const logDiv = document.createElement('div');
    logDiv.className = 'boot-log';
    logDiv.textContent = '>> ' + BOOT_MESSAGES[index];
    bootLogs.appendChild(logDiv);
    
    const container = bootLogs.parentElement;
    if (container) container.scrollTop = container.scrollHeight;
    
    // Calculate progress based on message index
    // We reserve the last 10% for the actual window load event
    const messageProgress = ((index + 1) / BOOT_MESSAGES.length) * 90;
    targetProgress = Math.max(targetProgress, messageProgress);
    
    if (bootStatus) bootStatus.textContent = BOOT_MESSAGES[index];
    
    index++;
  }, 300); // Slightly faster message updates
}

function enterSystem() {
  const bootScreen = document.getElementById('boot-screen');
  bootScreen.classList.add('hidden');
  
  sessionStorage.setItem('bootCompleted', 'true');
  
  window.scrollTo(0, 0);
  
  setTimeout(() => {
    bootScreen.style.display = 'none';
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.add('visible');
    document.body.classList.remove('preload');
    initializeApp();
    
    if (typeof window.initChatHint === 'function') {
      window.initChatHint();
    }
  }, 600);
}

function initializeApp() {
  const isMobile = window.innerWidth < 768;
  
  if (!isMobile) {
    init3D();
    setupCursor();
  }
  
  setupNav();
  populateSkills();
  populateTimeline();
  populateProjects();
  setupTerminal();
  setupScroll();
  setupScrollReveal();
  setupProjectSlideIn();
  setupSecurity();
}

function setupSecurity() {
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  
  document.addEventListener('keydown', (e) => {
    
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
      e.preventDefault();
    }
    
    // Ctrl+U
    if (e.ctrlKey && e.key.toUpperCase() === 'U') {
      e.preventDefault();
    }

    // Ctrl+S
    if (e.ctrlKey && e.key.toUpperCase() === 'S') {
      e.preventDefault();
    }
  });
}

function setupCursor() {
  const glow = document.getElementById('cursor-glow');
  
  document.addEventListener('mousemove', (e) => {
    // Global mouse state for 3D
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    
    // Direct 2D update (Robust & Compatible with CSS Animation)
    if (glow) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      if (glow.style.opacity === '0' || glow.style.opacity === '') {
        glow.style.opacity = '0.8';
      }
    }
  });
}

// Clean globals
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

    const cursorLight = new THREE.PointLight(0x00ff9f, 2, 12);
    cursorLight.position.set(0, 0, 5);
    scene.add(cursorLight);
    
    // Assign to a global-ish variable accessible in animate3D
    window.cursorLight = cursorLight;

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

    const grid = new THREE.GridHelper(20, 20, 0x00ff9f, 0x004433);
    grid.position.y = -3;
    scene.add(grid);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light1 = new THREE.PointLight(0x00ff9f, 1.5, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    const light2 = new THREE.PointLight(0x0080ff, 1.5, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);



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

  if (window.cursorLight) {
    window.cursorLight.position.x = mouseX * 8;
    window.cursorLight.position.y = mouseY * 5;
  }
  


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

function setupNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  let isScrolling = false;
  let scrollTimeout;
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      
      // Allow external/non-anchor links to navigate normally
      if (!href || !href.startsWith('#')) return;
      
      e.preventDefault();
      
      navItems.forEach(navItem => navItem.classList.remove('active'));
      item.classList.add('active');
      
      if (typeof item.blur === 'function') {
        item.blur();
      }
      
      isScrolling = true;
      
      const target = document.querySelector(item.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          updateActiveNav(); 
        }, 1000);
      }
    });
  });
  
  function updateActiveNav() {
    if (isScrolling) return;
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href === '#' + current) {
        item.classList.add('active');
      }
    });
  }
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  updateActiveNav();
}

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

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = document.querySelectorAll('.skill-level-fill');
          
          fills.forEach((fill, idx) => {
            fill.style.transition = 'none';
            fill.style.width = '0%';
            const valueSpan = fill.parentElement.nextElementSibling.querySelector('.skill-value');
            valueSpan.textContent = '0';
            
            setTimeout(() => {
              const targetLevel = parseInt(fill.getAttribute('data-level'));
              
              fill.offsetHeight;
              
              fill.style.transition = 'width 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
              fill.style.width = targetLevel + '%';
              
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
          
        }
      });
    }, { threshold: 0.2 });
    observer.observe(skillsSection);
  }
}

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
    
    timelineItem.addEventListener('mouseenter', function() {
      this.classList.add('hovered');
    });
    
    timelineItem.addEventListener('mouseleave', function() {
      this.classList.remove('hovered');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('visible');
          
          void entry.target.offsetHeight;
          
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 0);
          
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.15 });
    
    observer.observe(timelineItem);
  });
}

function populateProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  const projects = [
    {
      name: 'Caesar Cipher',
      desc: 'Classic encryption/decryption tool implemented in Python. Demonstrates fundamental cryptography concepts including key rotation, frequency analysis, and cipher breaking techniques.',
      tech: ['Python', 'Cryptography'],
      buttons: [
        { label: 'View CLI Version', url: 'https://github.com/usaihack/Caesar-CLI' },
        { label: 'View GUI Version', url: 'https://usaihack.github.io/Caesar-GUI/' }
      ]
    },
    {
      name: 'Java Tic Tac Toe',
      desc: 'Secure tic tac toe implementation with tight encapsulation and access control. Features human vs human and human vs AI gameplay modes.',
      tech: ['Java', 'Security'],
      buttons: [
        { label: 'View Project', url: 'https://github.com/usaihack/TicTacToe' }
      ]
    },
    {
      name: 'JavaScript Form Validator',
      desc: 'Frontend form validation with security best practices and input sanitization. Real-time error feedback and clean UI.',
      tech: ['JavaScript', 'Web Security'],
      buttons: [
        { label: 'View Project', url: 'https://usaihack.github.io/Form-Validator/' }
      ]
    },
    {
      name: 'Learning Path',
      desc: 'A structured 18-month cybersecurity learning journey documented lesson by lesson — from Kali Linux fundamentals to networking protocols and beyond.',
      tech: ['Cybersecurity', 'Networking'],
      buttons: [
        { label: 'View Project', url: 'https://github.com/usaihack/My-Notes' }
      ]
    }
  ];

  projectsGrid.innerHTML = '';
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    const techTags = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
    const btnHtml = project.buttons.map(b =>
      `<a href="${b.url}" target="_blank" rel="noopener" class="project-btn">${b.label}</a>`
    ).join('');
    card.innerHTML = `
      <div class="project-card-content">
        <h3>${project.name}</h3>
        <p>${project.desc}</p>
        <div class="project-tech">${techTags}</div>
      </div>
      <div class="project-actions">${btnHtml}</div>
    `;
    projectsGrid.appendChild(card);
  });
}

function setupTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  const commands = {
    'help': 'Commands: about | skills | projects | goto [section] | clear | time | focus',
    'about': 'Cybersecurity enthusiast specializing in hacking, malware analysis, and security research.',
    'skills': 'Python for Hacking, Networking, Web Security, Java, Malware Analysis, Low Level Languages',
    'projects': 'Visit the PROJECTS section to see my work',
    'focus': 'Focus areas: Networking, Python for Hacking, Malware Analysis & Creation, Low Level Languages',
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



const moveToTopBtn = document.createElement('button');
moveToTopBtn.id = 'move-to-top';
moveToTopBtn.className = 'move-to-top';
moveToTopBtn.innerHTML = '<span class="top-icon">▲</span><span class="top-text"> TOP</span>';
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startBoot);
} else {
  startBoot();
}

// ============================================
// SCROLL REVEAL — content panels fade + slide up
// ============================================
function setupScrollReveal() {
  const panels = document.querySelectorAll('.content-panel');
  if (!panels.length) return;

  panels.forEach(panel => panel.classList.add('scroll-reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Clean up will-change after animation
        setTimeout(() => {
          entry.target.style.willChange = 'auto';
        }, 700);
      }
    });
  }, { threshold: 0.1 });

  panels.forEach(panel => observer.observe(panel));
}

// ============================================
// PROJECT CARDS — sliding card motion
// ============================================
function setupProjectSlideIn() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  cards.forEach((card, idx) => {
    card.classList.add('slide-card');
    card.classList.add(idx % 2 === 0 ? 'slide-left' : 'slide-right');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger the reveal
        const card = entry.target;
        const idx = Array.from(cards).indexOf(card);
        setTimeout(() => {
          card.classList.add('revealed');
          // Clean up will-change after animation
          setTimeout(() => {
            card.style.willChange = 'auto';
          }, 700);
        }, idx * 150);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
}
