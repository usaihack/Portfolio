document.addEventListener("DOMContentLoaded", () => {
  const scripts = document.getElementsByTagName("script");
  let rootPath = "./";
  for (let script of scripts) {
    if (script.src.includes("components.js")) {
      rootPath = script.getAttribute("data-root") || "./";
      break;
    }
  }


  // Inject Footer with SVGs instead of Lordicon
  const footerTemplate = `
      <div class="footer-links">
        <a href="https://github.com/usaihack" target="_blank" class="social-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/usman701441070" target="_blank" class="social-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z"/></svg>
          LinkedIn
        </a>
        <a href="mailto:70-1-4-4-10-70@proton.me" target="_blank" rel="noopener" class="social-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          Email
        </a>
        <a href="https://www.reddit.com/user/usmansaid54/" target="_blank" class="social-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
          Reddit
        </a>
        <a href="https://x.com/usmansaid54" target="_blank" class="social-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          X (Twitter)
        </a>
      </div>
      <p class="footer-copy">&copy; 2026 Muhammad Usman Said</p>
    `;

  const isHubPage = !!document.querySelector(".tree-folder");
  const isLessonPage = !isHubPage && !!document.querySelector(".page-nav");
  const isIntroPage = window.location.pathname.endsWith("intro.html");

  const topbars = document.querySelectorAll(".topbar");
  
  if (isLessonPage) {
    let courseHub = "../intro.html";
    if (window.location.pathname.includes("Month-01-Kali-Basics")) {
      courseHub = "../kali.html";
    } else if (window.location.pathname.includes("Month-02-Networking-Basics")) {
      courseHub = "../networking.html";
    }
    
    topbars.forEach((tb) => {
      tb.innerHTML = `<a href="${courseHub}">&#8592; Back to Course</a>`;
    });
  } else if (isIntroPage) {
    topbars.forEach((tb) => {
      tb.innerHTML = "";
      tb.style.display = "none";
    });
  } else if (isHubPage) {
    topbars.forEach((tb) => {
      tb.innerHTML = `<a href="intro.html">&#8592; Learning Hub</a>`;
      tb.style.display = "flex";
    });
  }

  const footers = document.querySelectorAll(".page-footer");
  footers.forEach((ft) => (ft.innerHTML = footerTemplate));

  // --- PROGRESS TRACKING LOGIC ---

  // Inject CSS for Progress Tracking
  const style = document.createElement("style");
  style.innerHTML = `
    .track-status-badge { font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 12px; margin-left: auto; font-weight: 600; white-space: nowrap; }
    .track-not-started { background: rgba(255,255,255,0.05); color: rgba(212,224,237,0.5); }
    .track-in-progress { background: rgba(0, 128, 255, 0.15); color: var(--secondary, #0080ff); }
    .track-completed { background: rgba(0, 255, 159, 0.15); color: var(--accent, #00ff9f); }
    
    .course-progress-container { margin: 1.5rem auto 0; max-width: 400px; background: var(--bg2, #0f1923); padding: 1rem; border-radius: 12px; border: 1px solid var(--border, rgba(0,255,159,0.15)); }
    .course-progress-header { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.6rem; color: var(--text); font-weight: 500;}
    .course-progress-bar { height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
    .course-progress-fill { height: 100%; background: var(--accent, #00ff9f); width: 0%; transition: width 0.5s ease-out; }
    
    .mark-complete-btn { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; max-width: 300px; margin: 2rem auto; padding: 0.8rem; background: transparent; border: 1px solid var(--accent, #00ff9f); color: var(--accent, #00ff9f); border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 1rem; transition: all 0.3s; font-family: inherit; }
    .mark-complete-btn:hover { background: rgba(0,255,159,0.1); }
    .mark-complete-btn.is-completed { background: var(--accent, #00ff9f); color: var(--bg, #0a0e17); pointer-events: none; }
  `;
  document.head.appendChild(style);

  // Initialize progress data
  let progressData = JSON.parse(localStorage.getItem("learningProgress")) || {};

  if (isHubPage) {
    const courseFiles = document.querySelectorAll(".tree-file");
    let completedCount = 0;
    let trackableFilesCount = 0;

    courseFiles.forEach((fileLink) => {
      const href = fileLink.getAttribute("href");
      
      // Skip external links or non-html files
      if (!href || href.startsWith("http")) return;
      
      const isQuoteFile = href.toLowerCase().includes("quote");

      // Only count towards course progress if it's NOT a quote
      if (!isQuoteFile) {
        trackableFilesCount++;
      }

      const fileKey = decodeURIComponent(href);
      let status = progressData[fileKey] || "not-started";

      let statusText = isQuoteFile ? "Not viewed" : "Not started";
      let statusClass = "track-not-started";

      if (!isQuoteFile && status === "in-progress") {
        statusText = "In progress";
        statusClass = "track-in-progress";
      } else if (status === "completed") {
        // If it's a quote, visually display "Viewed" instead of "Completed"
        if (isQuoteFile) {
          statusText = "Viewed";
          statusClass = "track-completed"; // Keep green color
        } else {
          statusText = "Completed";
          statusClass = "track-completed";
          completedCount++; // Only increment progress for actual lessons
        }
      }

      const badge = document.createElement("span");
      badge.className = `track-status-badge ${statusClass}`;
      badge.textContent = statusText;
      fileLink.appendChild(badge);
    });

    // Remove existing hardcoded badges/progress to avoid duplicates
    const oldBadges = document.querySelectorAll(
      ".completed-badge, .active-badge, .progress-wrap",
    );
    oldBadges.forEach((el) => el.remove());

    // Inject New Progress Bar
    if (trackableFilesCount > 0) {
      const pct = Math.round((completedCount / trackableFilesCount) * 100);
      const pageHeader = document.querySelector(".page-header");
      if (pageHeader) {
        const progContainer = document.createElement("div");
        progContainer.className = "course-progress-container";
        progContainer.innerHTML = `
          <div class="course-progress-header">
            <span>Course Progress</span>
            <span>${completedCount} / ${trackableFilesCount} (${pct}%)</span>
          </div>
          <div class="course-progress-bar">
            <div class="course-progress-fill" style="width: ${pct}%"></div>
          </div>
        `;
        pageHeader.appendChild(progContainer);
      }
    }
  }

  if (isLessonPage) {
    // Construct the file key based on the URL so it matches the hub page href
    const pathParts = window.location.pathname.split("/");
    const filename = decodeURIComponent(pathParts.pop());
    const foldername = decodeURIComponent(pathParts.pop());
    const fileKey = foldername + "/" + filename;

    // Mark as in-progress if not already completed
    if (progressData[fileKey] !== "completed") {
      progressData[fileKey] = "in-progress";
      localStorage.setItem("learningProgress", JSON.stringify(progressData));
    }

    // Inject Mark Complete Button
    const pageNav = document.querySelector(".page-nav");
    if (pageNav) {
      const btnContainer = document.createElement("div");
      const markBtn = document.createElement("button");
      markBtn.className = "mark-complete-btn";
      
      const isQuoteFile = window.location.pathname.toLowerCase().includes("quote");
      const completedText = isQuoteFile ? "&#10004; Viewed" : "&#10004; Completed";
      const actionText = isQuoteFile ? "Mark as Viewed" : "Mark as Complete";

      if (progressData[fileKey] === "completed") {
        markBtn.classList.add("is-completed");
        markBtn.innerHTML = completedText;
      } else {
        markBtn.innerHTML = actionText;
        markBtn.addEventListener("click", () => {
          progressData[fileKey] = "completed";
          localStorage.setItem(
            "learningProgress",
            JSON.stringify(progressData),
          );
          markBtn.classList.add("is-completed");
          markBtn.innerHTML = completedText;
        });
      }

      btnContainer.appendChild(markBtn);
      pageNav.parentNode.insertBefore(btnContainer, pageNav);
    }
  }

  if (isIntroPage) {
    const updateIntroProgress = (url, countId, totalId, pctId, barId) => {
      fetch(url)
        .then(r => r.text())
        .then(html => {
          const doc = new DOMParser().parseFromString(html, "text/html");
          const links = doc.querySelectorAll(".tree-file");
          let total = 0;
          let completed = 0;
          links.forEach(link => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("http") || href.toLowerCase().includes("quote")) return;
            total++;
            const fileKey = decodeURIComponent(href);
            if (progressData[fileKey] === "completed") {
              completed++;
            }
          });
          const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
          
          const countEl = document.getElementById(countId);
          const totalEl = document.getElementById(totalId);
          const pctEl = document.getElementById(pctId);
          const barEl = document.getElementById(barId);
          
          if (countEl) countEl.textContent = completed;
          if (totalEl) totalEl.textContent = total;
          if (pctEl) pctEl.textContent = pct + "%";
          if (barEl) setTimeout(() => barEl.style.width = pct + "%", 300);
        })
        .catch(err => console.error("Failed to fetch course data", err));
    };

    updateIntroProgress("kali.html", "m1-count", "m1-total", "m1-pct", "m1-bar");
    updateIntroProgress("networking.html", "m2-count", "m2-total", "m2-pct", "m2-bar");
  }
});
