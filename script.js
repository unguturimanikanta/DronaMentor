/* =========================================================
   DRONAMENTOR MAX — V7
   Global Student Learning & Career Platform
   ========================================================= */

"use strict";

/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE = {
  theme: "dronamentor_theme",
  language: "dronamentor_language",
  tasks: "dronamentor_tasks",
  skills: "dronamentor_skills",
  xp: "dronamentor_xp",
  streak: "dronamentor_streak",
  lastVisit: "dronamentor_last_visit",
  goal: "dronamentor_goal",
  scores: "dronamentor_scores",
  settings: "dronamentor_settings"
};

function loadJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* =========================================================
   GLOBAL STATE
   ========================================================= */

let state = {
  theme: localStorage.getItem(STORAGE.theme) || "dark",
  language: localStorage.getItem(STORAGE.language) || "English",
  tasks: loadJSON(STORAGE.tasks, []),
  skills: loadJSON(STORAGE.skills, {
    HTML: 25,
    CSS: 15,
    JavaScript: 10,
    Python: 20,
    AutoCAD: 40,
    CAD: 35,
    "Problem Solving": 30,
    Communication: 25
  }),
  xp: Number(localStorage.getItem(STORAGE.xp) || 0),
  streak: Number(localStorage.getItem(STORAGE.streak) || 0),
  goal: localStorage.getItem(STORAGE.goal) || "",
  scores: loadJSON(STORAGE.scores, {})
};

/* =========================================================
   DOM HELPERS
   ========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

function getElement(...ids) {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) return el;
  }
  return null;
}

/* =========================================================
   TOAST
   ========================================================= */

function toast(message, type = "info") {
  let box = document.querySelector(".dm-toast-container");

  if (!box) {
    box = document.createElement("div");
    box.className = "dm-toast-container";
    box.style.cssText = `
      position:fixed;
      right:20px;
      bottom:20px;
      z-index:99999;
      display:flex;
      flex-direction:column;
      gap:10px;
      pointer-events:none;
    `;
    document.body.appendChild(box);
  }

  const item = document.createElement("div");

  item.textContent = message;

  item.style.cssText = `
    min-width:220px;
    max-width:340px;
    padding:13px 16px;
    border-radius:14px;
    background:rgba(20,24,35,.96);
    color:#fff;
    border:1px solid rgba(255,255,255,.12);
    box-shadow:0 15px 40px rgba(0,0,0,.35);
    backdrop-filter:blur(15px);
    font-size:14px;
    animation:dmToastIn .25s ease;
    pointer-events:auto;
  `;

  if (type === "success") {
    item.style.borderColor = "rgba(80,220,150,.5)";
  }

  if (type === "error") {
    item.style.borderColor = "rgba(255,90,90,.5)";
  }

  box.appendChild(item);

  setTimeout(() => {
    item.style.opacity = "0";
    item.style.transform = "translateY(8px)";

    setTimeout(() => item.remove(), 250);
  }, 2800);
}

/* =========================================================
   THEME
   ========================================================= */

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;

  document.body.classList.toggle(
    "light-mode",
    state.theme === "light"
  );

  const buttons = $$(
    "[data-theme-toggle], #themeToggle, #darkModeToggle"
  );

  buttons.forEach(btn => {
    btn.textContent =
      state.theme === "dark" ? "☀️" : "🌙";
  });
}

function toggleTheme() {
  state.theme =
    state.theme === "dark" ? "light" : "dark";

  localStorage.setItem(STORAGE.theme, state.theme);

  applyTheme();

  toast(
    state.theme === "dark"
      ? "🌙 Dark mode enabled"
      : "☀️ Light mode enabled"
  );
}

/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {
  const menuBtn = getElement(
    "menuBtn",
    "mobileMenuBtn",
    "hamburger"
  );

  const sidebar = getElement(
    "sidebar",
    "mobileSidebar",
    "navMenu"
  );

  if (!menuBtn || !sidebar) return;

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtn.classList.toggle("active");
  });

  $$(".nav-link, .sidebar-link", sidebar).forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  });
}

/* =========================================================
   MODAL SYSTEM
   ========================================================= */

let activeModal = null;

function openModal(content, title = "") {
  closeModal();

  const modal = document.createElement("div");

  modal.className = "dm-modal";

  modal.innerHTML = `
    <div class="dm-modal-backdrop"></div>

    <div class="dm-modal-box">

      <button class="dm-modal-close" aria-label="Close">
        ×
      </button>

      ${
        title
          ? `<h2 class="dm-modal-title">${title}</h2>`
          : ""
      }

      <div class="dm-modal-content">
        ${content}
      </div>

    </div>
  `;

  document.body.appendChild(modal);

  activeModal = modal;

  requestAnimationFrame(() => {
    modal.classList.add("show");
  });

  $(".dm-modal-backdrop", modal)
    ?.addEventListener("click", closeModal);

  $(".dm-modal-close", modal)
    ?.addEventListener("click", closeModal);

  document.addEventListener(
    "keydown",
    modalEscapeHandler
  );
}

function modalEscapeHandler(e) {
  if (e.key === "Escape") closeModal();
}

function closeModal() {
  if (!activeModal) return;

  activeModal.remove();
  activeModal = null;

  document.removeEventListener(
    "keydown",
    modalEscapeHandler
  );
}

/* =========================================================
   LANGUAGE
   ========================================================= */

const LANGUAGES = [
  "English",
  "Telugu",
  "Hindi",
  "Spanish",
  "French",
  "Arabic",
  "Bengali",
  "Portuguese",
  "German",
  "Japanese"
];

function openLanguagePicker() {
  const html = `
    <div class="language-grid">

      ${LANGUAGES.map(lang => `
        <button
          class="language-option"
          data-language="${lang}"
        >
          ${lang}
          ${
            state.language === lang
              ? " ✓"
              : ""
          }
        </button>
      `).join("")}

    </div>

    <p style="opacity:.7;margin-top:16px;font-size:13px">
      🌍 DronaMentor MAX is designed for global learners.
    </p>
  `;

  openModal(html, "🌍 Choose Language");

  $$(".language-option").forEach(btn => {
    btn.addEventListener("click", () => {
      state.language =
        btn.dataset.language;

      localStorage.setItem(
        STORAGE.language,
        state.language
      );

      closeModal();

      toast(
        `🌍 Language selected: ${state.language}`
      );

      updateLanguageButton();
    });
  });
}

function updateLanguageButton() {
  $$(
    "#languageBtn, #languageSelector, [data-language-button]"
  ).forEach(btn => {
    btn.textContent = `🌍 ${state.language}`;
  });
}

/* =========================================================
   SUBJECT SEARCH
   ========================================================= */

function initSearch() {
  const searchInputs = $$(
    "#subjectSearch, #globalSearch, [data-search]"
  );

  searchInputs.forEach(input => {
    input.addEventListener("input", () => {
      const query =
        input.value.trim().toLowerCase();

      filterCards(query);
    });
  });
}

function filterCards(query) {
  const cards = $$(
    ".subject-card, .course-card, .career-card, .project-card, [data-searchable]"
  );

  cards.forEach(card => {
    const text =
      card.textContent.toLowerCase();

    card.style.display =
      !query || text.includes(query)
        ? ""
        : "none";
  });
}

/* =========================================================
   LEVEL FILTER
   ========================================================= */

function initLevelFilters() {
  $$("[data-level-filter]").forEach(button => {
    button.addEventListener("click", () => {

      $$("[data-level-filter]").forEach(b =>
        b.classList.remove("active")
      );

      button.classList.add("active");

      const level =
        button.dataset.levelFilter
          ?.toLowerCase();

      $$(".course-card, .project-card").forEach(card => {

        if (!level || level === "all") {
          card.style.display = "";
          return;
        }

        const cardLevel =
          (
            card.dataset.level ||
            card.textContent
          ).toLowerCase();

        card.style.display =
          cardLevel.includes(level)
            ? ""
            : "none";
      });
    });
  });
}

/* =========================================================
   GOAL SYSTEM
   ========================================================= */

const GOALS = [
  "Become a Software Developer",
  "Become a Web Developer",
  "Become a CAD Designer",
  "Become a Mechanical Engineer",
  "Become a UI/UX Designer",
  "Become a Data Analyst",
  "Learn Cybersecurity",
  "Learn Cloud Computing",
  "Learn AI / ML",
  "Build My Own Projects",
  "Get an Internship",
  "Get My First Job"
];

function openGoalPicker() {
  openModal(`
    <div class="goal-list">

      ${GOALS.map(goal => `
        <button
          class="goal-option"
          data-goal="${goal}"
        >
          🎯 ${goal}
        </button>
      `).join("")}

    </div>
  `, "🎯 Choose Your Career Goal");

  $$(".goal-option").forEach(btn => {
    btn.addEventListener("click", () => {
      state.goal = btn.dataset.goal;

      localStorage.setItem(
        STORAGE.goal,
        state.goal
      );

      updateGoalUI();

      closeModal();

      addXP(25);

      toast(
        `🎯 Goal saved: ${state.goal}`,
        "success"
      );
    });
  });
}

function updateGoalUI() {
  $$(
    "#careerGoal, #goalText, [data-career-goal]"
  ).forEach(el => {
    el.textContent =
      state.goal || "Set your career goal";
  });
}

/* =========================================================
   CAREER FINDER
   ========================================================= */

const CAREERS = {
  "Software Developer": {
    skills: [
      "Programming",
      "Data Structures",
      "Git",
      "Problem Solving"
    ],
    tools: [
      "VS Code",
      "GitHub",
      "Python",
      "JavaScript"
    ],
    path: [
      "Programming Basics",
      "Web / Software Fundamentals",
      "Data Structures",
      "Projects",
      "GitHub Portfolio",
      "Internship",
      "Job Preparation"
    ]
  },

  "Web Developer": {
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    tools: [
      "VS Code",
      "GitHub",
      "Chrome DevTools"
    ],
    path: [
      "HTML",
      "CSS",
      "JavaScript",
      "Projects",
      "Portfolio",
      "Internship",
      "Job"
    ]
  },

  "CAD Designer": {
    skills: [
      "Technical Drawing",
      "AutoCAD",
      "3D Modeling",
      "Engineering Drawing"
    ],
    tools: [
      "AutoCAD",
      "SolidWorks",
      "Fusion 360"
    ],
    path: [
      "Drafting",
      "2D CAD",
      "3D Modeling",
      "Projects",
      "Portfolio",
      "Internship",
      "Job"
    ]
  },

  "Data Analyst": {
    skills: [
      "Excel",
      "SQL",
      "Python",
      "Statistics",
      "Data Visualization"
    ],
    tools: [
      "Excel",
      "SQL",
      "Python",
      "Power BI"
    ],
    path: [
      "Excel",
      "Statistics",
      "SQL",
      "Python",
      "Projects",
      "Portfolio",
      "Job"
    ]
  },

  "AI / ML": {
    skills: [
      "Python",
      "Mathematics",
      "Machine Learning",
      "Deep Learning"
    ],
    tools: [
      "Python",
      "Jupyter",
      "PyTorch",
      "TensorFlow"
    ],
    path: [
      "Python",
      "Data",
      "Machine Learning",
      "Deep Learning",
      "GenAI",
      "AI Projects",
      "Deployment"
    ]
  }
};

function openCareerFinder() {
  openModal(`
    <p style="opacity:.75">
      Select a career to explore the recommended path.
    </p>

    <div class="career-picker">

      ${Object.keys(CAREERS).map(career => `
        <button
          class="career-option"
          data-career="${career}"
        >
          🚀 ${career}
        </button>
      `).join("")}

    </div>
  `, "🚀 Career Explorer");

  $$(".career-option").forEach(btn => {
    btn.addEventListener("click", () => {
      showCareerDetails(
        btn.dataset.career
      );
    });
  });
}

function showCareerDetails(career) {
  const data = CAREERS[career];

  if (!data) return;

  openModal(`
    <h3>${career}</h3>

    <h4>🧠 Skills</h4>

    <div class="tag-list">
      ${data.skills
        .map(skill => `<span>${skill}</span>`)
        .join("")}
    </div>

    <h4>🛠 Tools</h4>

    <div class="tag-list">
      ${data.tools
        .map(tool => `<span>${tool}</span>`)
        .join("")}
    </div>

    <h4>🗺 Learning Path</h4>

    <ol>
      ${data.path
        .map(step => `<li>${step}</li>`)
        .join("")}
    </ol>

    <button
      class="primary-btn"
      id="saveCareerGoal"
    >
      🎯 Set This As My Goal
    </button>
  `, `🚀 ${career}`);

  $("#saveCareerGoal")
    ?.addEventListener("click", () => {

      state.goal = `Become a ${career}`;

      localStorage.setItem(
        STORAGE.goal,
        state.goal
      );

      updateGoalUI();

      closeModal();

      addXP(25);

      toast(
        `🎯 ${career} added as your goal!`,
        "success"
      );
    });
}

/* =========================================================
   ROADMAP
   ========================================================= */

function openRoadmap() {
  openModal(`
    <div class="roadmap">

      ${[
        ["1", "Beginner", "Understand the basics"],
        ["2", "Fundamentals", "Build strong foundations"],
        ["3", "Practice", "Solve exercises"],
        ["4", "Projects", "Build real projects"],
        ["5", "Portfolio", "Show your work"],
        ["6", "Internship", "Gain experience"],
        ["7", "Job", "Prepare and apply"]
      ].map(step => `
        <div class="roadmap-step">
          <strong>${step[0]}</strong>
          <div>
            <h4>${step[1]}</h4>
            <p>${step[2]}</p>
          </div>
        </div>
      `).join("")}

    </div>
  `, "🗺 Career Roadmap");
}

/* =========================================================
   SKILL GAP
   ========================================================= */

function openSkillGap() {
  const entries =
    Object.entries(state.skills);

  const weakest =
    entries.sort((a, b) => a[1] - b[1]);

  openModal(`
    <p>
      Focus on your lowest-progress skills first.
    </p>

    ${weakest.map(([skill, value]) => `
      <div style="margin:15px 0">

        <div style="
          display:flex;
          justify-content:space-between;
        ">
          <strong>${skill}</strong>
          <span>${value}%</span>
        </div>

        <div class="progress-bar">
          <span style="width:${value}%"></span>
        </div>

      </div>
    `).join("")}

    <button class="primary-btn" id="focusWeakest">
      🚀 Start With ${weakest[0]?.[0] || "Your Skills"}
    </button>
  `, "🧩 Skill Gap Analysis");

  $("#focusWeakest")
    ?.addEventListener("click", () => {
      closeModal();

      toast(
        `🎯 Focus mode: ${weakest[0]?.[0] || "Skills"}`,
        "success"
      );
    });
}

/* =========================================================
   TASK / PRODUCTIVITY SYSTEM
   ========================================================= */

function renderTasks() {
  const container = getElement(
    "taskList",
    "tasksList",
    "focusTasks"
  );

  if (!container) return;

  if (!state.tasks.length) {
    container.innerHTML = `
      <div class="empty-state">
        📝 No tasks yet. Add your first focus task.
      </div>
    `;
    return;
  }

  container.innerHTML =
    state.tasks.map((task, index) => `
      <div class="task-item ${
        task.completed ? "completed" : ""
      }">

        <label>
          <input
            type="checkbox"
            data-task-complete="${index}"
            ${task.completed ? "checked" : ""}
          >

          <span>${escapeHTML(task.text)}</span>
        </label>

        <button
          data-task-delete="${index}"
          aria-label="Delete task"
        >
          🗑️
        </button>

      </div>
    `).join("");

  $$("[data-task-complete]", container)
    .forEach(check => {
      check.addEventListener("change", () => {

        const index =
          Number(check.dataset.taskComplete);

        state.tasks[index].completed =
          check.checked;

        saveJSON(
          STORAGE.tasks,
          state.tasks
        );

        if (check.checked) {
          addXP(10);
          toast(
            "✅ Task completed! +10 XP",
            "success"
          );
        }

        renderTasks();
        updateDashboardProgress();
      });
    });

  $$("[data-task-delete]", container)
    .forEach(button => {
      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.taskDelete);

        state.tasks.splice(index, 1);

        saveJSON(
          STORAGE.tasks,
          state.tasks
        );

        renderTasks();

        toast("🗑️ Task removed");
      });
    });
}

function addTask(text) {
  text = text.trim();

  if (!text) {
    toast("⚠️ Enter a task first", "error");
    return;
  }

  state.tasks.push({
    text,
    completed: false,
    createdAt: Date.now()
  });

  saveJSON(
    STORAGE.tasks,
    state.tasks
  );

  renderTasks();

  toast("📝 Task added", "success");
}

function initTasks() {
  const input = getElement(
    "taskInput",
    "focusTaskInput"
  );

  const button = getElement(
    "addTaskBtn",
    "addTask",
    "createTask"
  );

  if (button) {
    button.addEventListener("click", () => {
      if (!input) return;

      addTask(input.value);
      input.value = "";
    });
  }

  input?.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      addTask(input.value);
      input.value = "";
    }
  });

  renderTasks();
}

/* =========================================================
   FOCUS TIMER
   ========================================================= */

let timerSeconds = 25 * 60;
let timerInterval = null;

function renderTimer() {
  const displays = $$(
    "#focusTimer, #timerDisplay, [data-focus-timer]"
  );

  const minutes =
    Math.floor(timerSeconds / 60)
      .toString()
      .padStart(2, "0");

  const seconds =
    (timerSeconds % 60)
      .toString()
      .padStart(2, "0");

  displays.forEach(el => {
    el.textContent =
      `${minutes}:${seconds}`;
  });
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      addXP(20);

      toast(
        "⏰ Focus session complete! +20 XP",
        "success"
      );

      timerSeconds = 25 * 60;
      renderTimer();

      return;
    }

    timerSeconds--;

    renderTimer();

  }, 1000);

  toast("🎯 Focus session started!");
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;

  timerSeconds = 25 * 60;

  renderTimer();

  toast("🔄 Timer reset");
}

function initTimer() {
  $$(
    "#startTimer, #startFocus, [data-start-timer]"
  ).forEach(btn => {
    btn.addEventListener("click", startTimer);
  });

  $$(
    "#resetTimer, #resetFocus, [data-reset-timer]"
  ).forEach(btn => {
    btn.addEventListener("click", resetTimer);
  });

  renderTimer();
}

/* =========================================================
   SKILL TRACKER
   ========================================================= */

function renderSkills() {
  $$(".skill-progress").forEach(element => {

    const skill =
      element.dataset.skill;

    if (!skill || state.skills[skill] === undefined)
      return;

    const value =
      state.skills[skill];

    element.style.width =
      `${value}%`;
  });

  $$("[data-skill-value]").forEach(element => {

    const skill =
      element.dataset.skillValue;

    if (state.skills[skill] !== undefined) {
      element.textContent =
        `${state.skills[skill]}%`;
    }
  });

  $$("[data-skill-range]").forEach(input => {

    const skill =
      input.dataset.skillRange;

    if (state.skills[skill] !== undefined) {
      input.value =
        state.skills[skill];
    }
  });
}

function initSkills() {
  $$("[data-skill-range]").forEach(input => {

    input.addEventListener("input", () => {

      const skill =
        input.dataset.skillRange;

      const value =
        Number(input.value);

      state.skills[skill] = value;

      saveJSON(
        STORAGE.skills,
        state.skills
      );

      renderSkills();
      updateDashboardProgress();
    });
  });

  renderSkills();
}

/* =========================================================
   DASHBOARD PROGRESS
   ========================================================= */

function calculateProgress() {

  const skills =
    Object.values(state.skills);

  const skillAverage =
    skills.length
      ? skills.reduce((a, b) => a + b, 0)
        / skills.length
      : 0;

  const taskProgress =
    state.tasks.length
      ? (
          state.tasks.filter(t => t.completed)
            .length /
          state.tasks.length
        ) * 100
      : 0;

  return Math.round(
    skillAverage * 0.7 +
    taskProgress * 0.3
  );
}

function updateDashboardProgress() {

  const progress =
    calculateProgress();

  $$(
    "#careerProgress, #dashboardProgress, [data-progress]"
  ).forEach(el => {

    if (
      el.tagName === "INPUT" ||
      el.tagName === "PROGRESS"
    ) {
      el.value = progress;
    } else {
      el.textContent = `${progress}%`;
    }
  });

  $$("[data-progress-ring]").forEach(ring => {

    const radius =
      Number(
        ring.getAttribute("r") || 45
      );

    const circumference =
      2 * Math.PI * radius;

    ring.style.strokeDasharray =
      circumference;

    ring.style.strokeDashoffset =
      circumference -
      (progress / 100) * circumference;
  });
}

/* =========================================================
   XP SYSTEM
   ========================================================= */

function addXP(amount) {

  state.xp += amount;

  localStorage.setItem(
    STORAGE.xp,
    state.xp
  );

  updateXPUI();

  checkBadges();
}

function updateXPUI() {

  $$(
    "#xpValue, #totalXP, [data-xp]"
  ).forEach(el => {
    el.textContent =
      `${state.xp} XP`;
  });

  const level =
    Math.floor(state.xp / 100) + 1;

  $$(
    "#levelValue, #studentLevel, [data-level]"
  ).forEach(el => {
    el.textContent =
      `Level ${level}`;
  });
}

function checkBadges() {

  const badges = [];

  if (state.xp >= 100)
    badges.push("🌱 Starter");

  if (state.xp >= 500)
    badges.push("🔥 Consistent Learner");

  if (state.xp >= 1000)
    badges.push("🚀 Rising Builder");

  if (state.xp >= 2500)
    badges.push("🏆 DronaMentor Pro");

  $$(
    "#badgeList, [data-badges]"
  ).forEach(el => {

    el.innerHTML =
      badges.length
        ? badges.map(b => `<span>${b}</span>`).join("")
        : "No badges yet";
  });
}

/* =========================================================
   STREAK
   ========================================================= */

function updateStreak() {

  const today =
    new Date().toISOString().slice(0, 10);

  const last =
    localStorage.getItem(
      STORAGE.lastVisit
    );

  if (last === today) {
    return;
  }

  if (last) {

    const previous =
      new Date(last);

    const current =
      new Date(today);

    const difference =
      Math.round(
        (
          current - previous
        ) /
        (1000 * 60 * 60 * 24)
      );

    if (difference === 1) {
      state.streak++;
    } else {
      state.streak = 1;
    }

  } else {
    state.streak = 1;
  }

  localStorage.setItem(
    STORAGE.lastVisit,
    today
  );

  localStorage.setItem(
    STORAGE.streak,
    state.streak
  );

  $$(
    "#streakValue, [data-streak]"
  ).forEach(el => {
    el.textContent =
      `${state.streak} day${state.streak === 1 ? "" : "s"}`;
  });
}

/* =========================================================
   QUICK QUIZ
   ========================================================= */

const QUIZ = [
  {
    q: "What does HTML mainly define?",
    options: [
      "Structure of a webpage",
      "Database storage",
      "Operating system",
      "Internet speed"
    ],
    answer: 0
  },

  {
    q: "Which language is widely used for web interactivity?",
    options: [
      "HTML",
      "JavaScript",
      "SQL",
      "XML"
    ],
    answer: 1
  },

  {
    q: "Which tool is commonly used for version control?",
    options: [
      "Git",
      "Photoshop",
      "Excel",
      "AutoCAD"
    ],
    answer: 0
  },

  {
    q: "Python is commonly used in:",
    options: [
      "AI and data science",
      "Only video playback",
      "Only hardware repair",
      "None of these"
    ],
    answer: 0
  }
];

function startQuiz() {

  let current = 0;
  let score = 0;

  function renderQuestion() {

    const question =
      QUIZ[current];

    openModal(`
      <div class="quiz-box">

        <p>
          Question ${current + 1}
          of ${QUIZ.length}
        </p>

        <h3>
          ${question.q}
        </h3>

        <div class="quiz-options">

          ${question.options.map(
            (option, index) => `
              <button
                class="quiz-option"
                data-answer="${index}"
              >
                ${option}
              </button>
            `
          ).join("")}

        </div>

      </div>
    `, "🧠 Quick Quiz");

    $$(".quiz-option").forEach(btn => {

      btn.addEventListener("click", () => {

        const answer =
          Number(btn.dataset.answer);

        if (answer === question.answer) {
          score++;
          toast("✅ Correct!", "success");
        } else {
          toast(
            `❌ Correct answer: ${question.options[question.answer]}`
          );
        }

        current++;

        if (current >= QUIZ.length) {
          finishQuiz();
        } else {
          setTimeout(renderQuestion, 350);
        }
      });
    });
  }

  function finishQuiz() {

    const percentage =
      Math.round(
        (score / QUIZ.length) * 100
      );

    state.scores.quiz =
      Math.max(
        state.scores.quiz || 0,
        percentage
      );

    saveJSON(
      STORAGE.scores,
      state.scores
    );

    addXP(score * 15);

    openModal(`
      <div style="text-align:center">

        <div style="font-size:50px">
          🏆
        </div>

        <h2>${percentage}%</h2>

        <p>
          You scored ${score}/${QUIZ.length}
        </p>

        <button
          class="primary-btn"
          id="quizAgain"
        >
          🔄 Play Again
        </button>

      </div>
    `, "Quiz Complete");

    $("#quizAgain")
      ?.addEventListener("click", startQuiz);
  }

  renderQuestion();
}

/* =========================================================
   MEMORY GAME
   ========================================================= */

function startMemoryGame() {

  const symbols = [
    "🚀", "🧠", "💻",
    "🎯", "⭐", "🔥"
  ];

  const cards =
    [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5);

  openModal(`
    <div class="memory-grid">

      ${cards.map((symbol, index) => `
        <button
          class="memory-card"
          data-index="${index}"
          data-symbol="${symbol}"
        >
          ?
        </button>
      `).join("")}

    </div>
  `, "🧠 Memory Match");

  let first = null;
  let second = null;
  let lock = false;
  let matched = 0;

  $$(".memory-card").forEach(card => {

    card.addEventListener("click", () => {

      if (
        lock ||
        card.classList.contains("matched") ||
        card === first
      ) return;

      card.textContent =
        card.dataset.symbol;

      if (!first) {
        first = card;
        return;
      }

      second = card;
      lock = true;

      if (
        first.dataset.symbol ===
        second.dataset.symbol
      ) {

        first.classList.add("matched");
        second.classList.add("matched");

        matched += 2;

        first = null;
        second = null;
        lock = false;

        if (matched === cards.length) {
          addXP(30);

          toast(
            "🏆 Memory game completed! +30 XP",
            "success"
          );
        }

      } else {

        setTimeout(() => {

          first.textContent = "?";
          second.textContent = "?";

          first = null;
          second = null;
          lock = false;

        }, 650);
      }
    });
  });
}

/* =========================================================
   NUMBER CHALLENGE
   ========================================================= */

function startNumberChallenge() {

  const a =
    Math.floor(Math.random() * 50) + 10;

  const b =
    Math.floor(Math.random() * 50) + 10;

  const operation =
    Math.random() > .5 ? "+" : "-";

  const answer =
    operation === "+"
      ? a + b
      : a - b;

  openModal(`
    <div style="text-align:center">

      <h2>
        ${a} ${operation} ${b} = ?
      </h2>

      <input
        id="numberAnswer"
        type="number"
        placeholder="Your answer"
        style="
          width:100%;
          padding:13px;
          border-radius:12px;
          border:1px solid #555;
          margin:15px 0;
        "
      >

      <button
        class="primary-btn"
        id="checkNumber"
      >
        Check Answer
      </button>

    </div>
  `, "🔢 Number Challenge");

  $("#checkNumber")
    ?.addEventListener("click", () => {

      const userAnswer =
        Number($("#numberAnswer")?.value);

      if (userAnswer === answer) {

        addXP(15);

        toast(
          "🎉 Correct! +15 XP",
          "success"
        );

        closeModal();

      } else {

        toast(
          "❌ Not quite. Try another one."
        );
      }
    });
}

/* =========================================================
   WORD SCRAMBLE
   ========================================================= */

function startWordScramble() {

  const words = [
    "JAVASCRIPT",
    "PYTHON",
    "CODING",
    "CAREER",
    "PROJECT",
    "LEARNING",
    "DESIGN",
    "FUTURE"
  ];

  const word =
    words[Math.floor(Math.random() * words.length)];

  const scrambled =
    word
      .split("")
      .sort(() => Math.random() - .5)
      .join("");

  openModal(`
    <div style="text-align:center">

      <p>Unscramble this word:</p>

      <h2 style="letter-spacing:6px">
        ${scrambled}
      </h2>

      <input
        id="wordAnswer"
        placeholder="Your answer"
        style="
          width:100%;
          padding:13px;
          border-radius:12px;
          margin:15px 0;
        "
      >

      <button
        class="primary-btn"
        id="checkWord"
      >
        Check
      </button>

    </div>
  `, "🔤 Word Scramble");

  $("#checkWord")
    ?.addEventListener("click", () => {

      const answer =
        $("#wordAnswer")?.value
          .trim()
          .toUpperCase();

      if (answer === word) {

        addXP(20);

        toast(
          "🎉 Correct! +20 XP",
          "success"
        );

        closeModal();

      } else {

        toast("❌ Try again!");
      }
    });
}

/* =========================================================
   DAILY CHALLENGE
   ========================================================= */

function dailyChallenge() {

  const challenges = [
    "Learn one new concept today.",
    "Solve 5 coding questions.",
    "Build a small project feature.",
    "Improve one resume section.",
    "Practice speaking for 10 minutes.",
    "Read about a career you are interested in.",
    "Complete one lesson without distractions."
  ];

  const day =
    new Date().getDate();

  const challenge =
    challenges[day % challenges.length];

  openModal(`
    <div style="text-align:center">

      <div style="font-size:55px">
        🎯
      </div>

      <h2>Today's Challenge</h2>

      <p style="font-size:18px">
        ${challenge}
      </p>

      <button
        class="primary-btn"
        id="completeDaily"
      >
        ✅ Mark Complete
      </button>

    </div>
  `, "🔥 Daily Challenge");

  $("#completeDaily")
    ?.addEventListener("click", () => {

      addXP(50);

      toast(
        "🔥 Daily challenge completed! +50 XP",
        "success"
      );

      closeModal();
    });
}

/* =========================================================
   LESSON OPEN
   ========================================================= */

function openLesson(title = "Learning Session") {

  openModal(`
    <div>

      <h3>📚 ${escapeHTML(title)}</h3>

      <p>
        This learning space is ready for your next step.
      </p>

      <div class="lesson-actions">

        <button
          class="primary-btn"
          id="lessonStart"
        >
          🚀 Start Learning
        </button>

      </div>

    </div>
  `, "📚 Lesson");

  $("#lessonStart")
    ?.addEventListener("click", () => {

      addXP(10);

      toast(
        "📚 Learning session started! +10 XP",
        "success"
      );

      closeModal();
    });
}

function initLessonButtons() {

  $$(
    ".open-lesson, [data-open-lesson], [data-lesson]"
  ).forEach(button => {

    button.addEventListener("click", () => {

      const title =
        button.dataset.lesson ||
        button.dataset.openLesson ||
        button.textContent.trim() ||
        "Learning Session";

      openLesson(title);
    });
  });
}

/* =========================================================
   RESUME BUILDER
   ========================================================= */

function openResumeBuilder() {

  openModal(`
    <h3>📄 Resume Builder</h3>

    <div class="resume-fields">

      <input
        id="resumeName"
        placeholder="Full Name"
      >

      <input
        id="resumeRole"
        placeholder="Target Role"
      >

      <textarea
        id="resumeSkills"
        placeholder="Skills"
      ></textarea>

      <textarea
        id="resumeProjects"
        placeholder="Projects"
      ></textarea>

      <button
        class="primary-btn"
        id="generateResume"
      >
        ✨ Generate Preview
      </button>

    </div>
  `, "📄 Resume Builder");

  $("#generateResume")
    ?.addEventListener("click", () => {

      const name =
        $("#resumeName")?.value ||
        "Your Name";

      const role =
        $("#resumeRole")?.value ||
        "Your Target Role";

      const skills =
        $("#resumeSkills")?.value ||
        "Add your skills";

      const projects =
        $("#resumeProjects")?.value ||
        "Add your projects";

      openModal(`
        <div class="resume-preview">

          <h1>${escapeHTML(name)}</h1>

          <h3>${escapeHTML(role)}</h3>

          <hr>

          <h4>Skills</h4>
          <p>${escapeHTML(skills)}</p>

          <h4>Projects</h4>
          <p>${escapeHTML(projects)}</p>

          <button
            class="primary-btn"
            onclick="window.print()"
          >
            🖨️ Print / Save PDF
          </button>

        </div>
      `, "📄 Resume Preview");

      addXP(25);
    });
}

/* =========================================================
   PROJECT IDEAS
   ========================================================= */

function openProjectIdeas() {

  const projects = [
    "Personal Portfolio Website",
    "Student Task Manager",
    "Weather Dashboard",
    "Expense Tracker",
    "Quiz Application",
    "AI Study Assistant",
    "CAD Portfolio",
    "Resume Builder",
    "Career Roadmap App",
    "Learning Progress Tracker"
  ];

  openModal(`
    <div class="project-ideas">

      ${projects.map((project, i) => `
        <div class="project-idea">

          <strong>
            ${i + 1}. ${project}
          </strong>

          <button
            data-project="${project}"
          >
            Start
          </button>

        </div>
      `).join("")}

    </div>
  `, "💡 Project Ideas");

  $$("[data-project]").forEach(button => {

    button.addEventListener("click", () => {

      addXP(10);

      toast(
        `🚀 Project selected: ${button.dataset.project}`,
        "success"
      );

      closeModal();
    });
  });
}

/* =========================================================
   INTERVIEW PREPARATION
   ========================================================= */

function openInterviewPrep() {

  const categories = [
    "HR Interview",
    "Technical Interview",
    "Fresher Interview",
    "Mechanical Interview",
    "Software Interview",
    "CAD Interview",
    "General Interview"
  ];

  openModal(`
    <div class="interview-list">

      ${categories.map(category => `
        <button
          data-interview="${category}"
        >
          🎤 ${category}
        </button>
      `).join("")}

    </div>
  `, "🎤 Interview Preparation");

  $$("[data-interview]").forEach(button => {

    button.addEventListener("click", () => {

      const category =
        button.dataset.interview;

      openModal(`
        <h3>${category}</h3>

        <p>
          Practice these fundamentals:
        </p>

        <ul>
          <li>Introduce yourself</li>
          <li>Explain your strengths</li>
          <li>Explain your projects</li>
          <li>Explain your career goal</li>
          <li>Answer role-specific questions</li>
        </ul>

        <button
          class="primary-btn"
          id="practiceInterview"
        >
          🎤 Start Practice
        </button>
      `, `🎤 ${category}`);

      $("#practiceInterview")
        ?.addEventListener("click", () => {

          addXP(15);

          toast(
            "🎤 Interview practice started! +15 XP",
            "success"
          );
        });
    });
  });
}

/* =========================================================
   AI ACADEMY
   ========================================================= */

function openAIAcademy() {

  const path = [
    "Python",
    "Data + ML",
    "Deep Learning",
    "Generative AI",
    "Prompt Engineering",
    "RAG",
    "AI Agents",
    "Deployment"
  ];

  openModal(`
    <div class="ai-path">

      ${path.map((step, i) => `
        <div class="ai-step">

          <span>${i + 1}</span>

          <strong>${step}</strong>

        </div>
      `).join("")}

    </div>
  `, "🤖 AI Academy");
}

/* =========================================================
   BUTTON ROUTER
   ========================================================= */

function initActionButtons() {

  $$(
    "[data-action]"
  ).forEach(button => {

    button.addEventListener("click", () => {

      const action =
        button.dataset.action;

      switch (action) {

        case "goal":
          openGoalPicker();
          break;

        case "career":
        case "career-finder":
          openCareerFinder();
          break;

        case "roadmap":
          openRoadmap();
          break;

        case "skill-gap":
          openSkillGap();
          break;

        case "resume":
          openResumeBuilder();
          break;

        case "projects":
          openProjectIdeas();
          break;

        case "interview":
          openInterviewPrep();
          break;

        case "ai":
        case "ai-academy":
          openAIAcademy();
          break;

        case "quiz":
          startQuiz();
          break;

        case "memory":
          startMemoryGame();
          break;

        case "number":
          startNumberChallenge();
          break;

        case "word":
          startWordScramble();
          break;

        case "daily":
          dailyChallenge();
          break;

        case "lesson":
          openLesson(
            button.dataset.title ||
            "Learning Session"
          );
          break;

        case "timer":
          startTimer();
          break;

        default:
          toast(
            "✨ Feature is ready for the next update."
          );
      }
    });
  });
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function initNavigation() {

  $$(
    "[data-scroll], .nav-link[href^='#'], a[href^='#']"
  ).forEach(link => {

    link.addEventListener("click", e => {

      const target =
        link.getAttribute("href") ||
        link.dataset.scroll;

      if (!target || target === "#") return;

      const id =
        target.replace("#", "");

      const element =
        document.getElementById(id);

      if (!element) return;

      e.preventDefault();

      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

/* =========================================================
   GLOBAL KEYBOARD SHORTCUTS
   ========================================================= */

function initKeyboard() {

  document.addEventListener("keydown", e => {

    if (
      e.ctrlKey &&
      e.key.toLowerCase() === "k"
    ) {

      e.preventDefault();

      const search =
        getElement(
          "globalSearch",
          "subjectSearch"
        );

      search?.focus();

      toast("🔎 Search focused");
    }
  });
}

/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   DIRECT BUTTON IDS
   ========================================================= */

function initDirectButtons() {

  $$(
    "#themeToggle, #darkModeToggle, [data-theme-toggle]"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      toggleTheme
    );
  });

  $$(
    "#languageBtn, #languageSelector, [data-language-button]"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      openLanguagePicker
    );
  });

  $$(
    "#goalBtn, #setGoal, #careerGoalBtn"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      openGoalPicker
    );
  });

  $$(
    "#careerFinder, #findCareer"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      openCareerFinder
    );
  });

  $$(
    "#roadmapBtn, #viewRoadmap"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      openRoadmap
    );
  });

  $$(
    "#skillGapBtn, #skillGap"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      openSkillGap
    );
  });

  $$(
    "#resumeBtn, #resumeBuilder"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      openResumeBuilder
    );
  });

  $$(
    "#projectBtn, #projectIdeas"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      openProjectIdeas
    );
  });

  $$(
    "#interviewBtn, #interviewPrep"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      openInterviewPrep
    );
  });

  $$(
    "#aiBtn, #aiAcademy"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      openAIAcademy
    );
  });

  $$(
    "#quizBtn, #quickQuiz"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      startQuiz
    );
  });

  $$(
    "#memoryBtn, #memoryGame"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      startMemoryGame
    );
  });

  $$(
    "#numberBtn, #numberChallenge"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      startNumberChallenge
    );
  });

  $$(
    "#wordBtn, #wordScramble"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      startWordScramble
    );
  });

  $$(
    "#dailyBtn, #dailyChallenge"
  ).forEach(btn => {
    btn.addEventListener(
      "click",
      dailyChallenge
    );
  });
}

/* =========================================================
   INITIALIZATION
   ========================================================= */

function initDronaMentor() {

  console.log(
    "🚀 DronaMentor MAX V7 initialized"
  );

  applyTheme();

  updateLanguageButton();

  updateGoalUI();

  updateXPUI();

  updateStreak();

  updateDashboardProgress();

  initMobileMenu();

  initSearch();

  initLevelFilters();

  initTasks();

  initTimer();

  initSkills();

  initLessonButtons();

  initActionButtons();

  initDirectButtons();

  initNavigation();

  initKeyboard();

  checkBadges();

  renderTasks();

  renderSkills();

  updateDashboardProgress();
}

/* =========================================================
   START
   ========================================================= */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initDronaMentor
  );

} else {

  initDronaMentor();
}
