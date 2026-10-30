/* =====================================================
   DRONAMENTOR MAX — FINAL SCRIPT
   ROMING AI MENTOR + DASHBOARD + LEARNING + CAREER
===================================================== */

(function () {

  "use strict";

  /* ===================================================
     GLOBAL STATE
  =================================================== */

  const STORAGE_KEY = "dronamentor_max_state";

  const defaultState = {
    theme: "dark",
    language: "EN",
    tasks: [],
    xp: 1240,
    streak: 7,
    badges: 8,
    progress: 68,
    goal: "",
    skills: {
      html: 80,
      ai: 45,
      communication: 60
    },
    completedLessons: [],
    mentorMessages: []
  };

  let state = loadState();

  function loadState() {

    try {

      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        return {
          ...defaultState,
          ...JSON.parse(saved)
        };
      }

    } catch (error) {
      console.log("State load error:", error);
    }

    return {
      ...defaultState
    };
  }

  function saveState() {

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );
    } catch (error) {
      console.log("State save error:", error);
    }
  }


  /* ===================================================
     HELPERS
  =================================================== */

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHTML(value) {

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* ===================================================
     TOAST
  =================================================== */

  function toast(message) {

    let box = document.querySelector(".toast");

    if (!box) {

      box = document.createElement("div");

      box.className = "toast";

      document.body.appendChild(box);

    }

    box.textContent = message;

    box.classList.add("show");

    clearTimeout(box._timer);

    box._timer = setTimeout(function () {

      box.classList.remove("show");

    }, 2500);
  }


  /* ===================================================
     MODAL
  =================================================== */

  const modal = $("modal");
  const modalContent = $("modalContent");
  const closeBtn = $("close");

  function openModal(content) {

    if (!modal || !modalContent) return;

    modalContent.innerHTML = content;

    modal.classList.add("show");
    modal.classList.add("open");

    document.body.style.overflow = "hidden";
  }

  function closeModal() {

    if (!modal) return;

    modal.classList.remove("show");
    modal.classList.remove("open");

    document.body.style.overflow = "";

  }

  if (closeBtn) {

    closeBtn.addEventListener(
      "click",
      closeModal
    );

  }

  if (modal) {

    modal.addEventListener(
      "click",
      function (event) {

        if (event.target === modal) {
          closeModal();
        }

      }
    );

  }

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeModal();
      }

    }
  );


  /* ===================================================
     THEME
  =================================================== */

  function applyTheme() {

    document.body.classList.toggle(
      "light",
      state.theme === "light"
    );

    const button = $("themeBtn");

    if (button) {

      button.textContent =
        state.theme === "light"
          ? "🌙"
          : "☀️";

    }
  }

  const themeBtn = $("themeBtn");

  if (themeBtn) {

    themeBtn.addEventListener(
      "click",
      function () {

        state.theme =
          state.theme === "dark"
            ? "light"
            : "dark";

        saveState();
        applyTheme();

      }
    );

  }


  /* ===================================================
     MOBILE MENU
  =================================================== */

  const menuBtn = $("menuBtn");
  const mobileNav = $("mobileNav");

  if (menuBtn && mobileNav) {

    menuBtn.addEventListener(
      "click",
      function () {

        mobileNav.classList.toggle("open");

      }
    );

    mobileNav.querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            mobileNav.classList.remove("open");

          }
        );

      });

  }


  /* ===================================================
     LANGUAGE
  =================================================== */

  const langBtn = $("langBtn");

  if (langBtn) {

    langBtn.textContent = state.language;

    langBtn.addEventListener(
      "click",
      function () {

        const languages = [
          "EN",
          "TE",
          "HI",
          "ES",
          "FR",
          "AR",
          "BN",
          "PT",
          "DE",
          "JA"
        ];

        const current =
          languages.indexOf(state.language);

        const next =
          (current + 1) % languages.length;

        state.language =
          languages[next];

        langBtn.textContent =
          state.language;

        saveState();

        toast(
          "Language set to " +
          state.language
        );

      }
    );

  }


  /* ===================================================
     DASHBOARD
  =================================================== */

  function updateDashboard() {

    const xp = $("xp");
    const streak = $("streak");
    const badges = $("badges");
    const progress = $("heroProgress");

    if (xp) {
      xp.textContent = state.xp;
    }

    if (streak) {
      streak.textContent = state.streak;
    }

    if (badges) {
      badges.textContent = state.badges;
    }

    if (progress) {
      progress.textContent =
        state.progress + "%";
    }

    const ring =
      document.querySelector(".progressRing");

    if (ring) {

      ring.style.background =
        `conic-gradient(
          var(--accent2) ${state.progress}%,
          rgba(255,255,255,.08) 0
        )`;

    }

  }


  /* ===================================================
     XP
  =================================================== */

  function addXP(amount) {

    amount = Number(amount) || 0;

    state.xp += amount;

    if (state.xp >= 2000) {
      state.badges = Math.max(
        state.badges,
        9
      );
    }

    saveState();

    updateDashboard();

    toast("+" + amount + " XP earned! ⚡");

  }


  /* ===================================================
     GOAL
  =================================================== */

  const goalBtn = $("goalBtn");

  if (goalBtn) {

    goalBtn.addEventListener(
      "click",
      function () {

        openModal(`
          <h2>🎯 Set Your Career Goal</h2>

          <p style="color:var(--muted);margin:10px 0 20px">
            Choose the direction you want DronaMentor MAX
            to help you with.
          </p>

          <select id="goalSelect"
            style="
              width:100%;
              padding:13px;
              border-radius:12px;
              border:1px solid var(--line);
              background:var(--bg2);
              color:var(--text);
            ">

            <option value="">Choose a goal</option>
            <option value="Software Developer">💻 Software Developer</option>
            <option value="AI Developer">🤖 AI Developer</option>
            <option value="Data Analyst">📊 Data Analyst</option>
            <option value="UI/UX Designer">🎨 UI/UX Designer</option>
            <option value="CAD / Mechanical">⚙️ CAD / Mechanical</option>
            <option value="Cloud & DevOps">☁️ Cloud & DevOps</option>

          </select>

          <button
            id="saveGoal"
            style="
              margin-top:15px;
              padding:12px 18px;
              border:0;
              border-radius:12px;
              background:linear-gradient(135deg,var(--accent),var(--accent2));
              color:white;
              font-weight:800;
            "
          >
            Save Goal
          </button>
        `);

        const saveGoal = $("saveGoal");

        if (saveGoal) {

          saveGoal.addEventListener(
            "click",
            function () {

              const select =
                $("goalSelect");

              if (!select.value) {

                toast("Please choose a goal.");

                return;
              }

              state.goal =
                select.value;

              saveState();

              closeModal();

              toast(
                "Goal saved: " +
                state.goal +
                " 🎯"
              );

            }
          );

        }

      }
    );

  }


  /* ===================================================
     START JOURNEY
  =================================================== */

  const startBtn = $("startBtn");

  if (startBtn) {

    startBtn.addEventListener(
      "click",
      function () {

        if (!state.goal) {

          if (goalBtn) {
            goalBtn.click();
          }

          return;
        }

        location.hash = "learn";

        toast(
          "Your learning journey starts now 🚀"
        );

      }
    );

  }


  /* ===================================================
     TASK SYSTEM
  =================================================== */

  const taskInput = $("taskInput");
  const addTask = $("addTask");
  const taskList = $("taskList");

  function renderTasks() {

    if (!taskList) return;

    taskList.innerHTML = "";

    if (!state.tasks.length) {

      taskList.innerHTML =
        "<li>No tasks yet. Add your first goal 🎯</li>";

      return;
    }

    state.tasks.forEach(
      function (task, index) {

        const li =
          document.createElement("li");

        li.innerHTML = `
          <label style="
            display:flex;
            align-items:center;
            gap:8px;
            margin:0;
          ">
            <input
              type="checkbox"
              data-task="${index}"
              ${task.done ? "checked" : ""}
            >

            <span
              style="
                ${task.done
                  ? "text-decoration:line-through;opacity:.5;"
                  : ""}
              "
            >
              ${escapeHTML(task.text)}
            </span>
          </label>
        `;

        taskList.appendChild(li);

      }
    );

    taskList
      .querySelectorAll("[data-task]")
      .forEach(function (checkbox) {

        checkbox.addEventListener(
          "change",
          function () {

            const index =
              Number(
                checkbox.dataset.task
              );

            state.tasks[index].done =
              checkbox.checked;

            if (checkbox.checked) {
              addXP(20);
            }

            saveState();

            renderTasks();

          }
        );

      });

  }

  if (addTask) {

    addTask.addEventListener(
      "click",
      function () {

        const text =
          taskInput
            ? taskInput.value.trim()
            : "";

        if (!text) {

          toast("Enter a task first.");

          return;
        }

        state.tasks.push({
          text:text,
          done:false
        });

        saveState();

        if (taskInput) {
          taskInput.value = "";
        }

        renderTasks();

        toast("Task added 🎯");

      }
    );

  }

  if (taskInput) {

    taskInput.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Enter") {

          if (addTask) {
            addTask.click();
          }

        }

      }
    );

  }


  /* ===================================================
     FOCUS TIMER
  =================================================== */

  let timerSeconds = 25 * 60;
  let timerInterval = null;

  const timerDisplay = $("timer");
  const startTimer = $("startTimer");
  const resetTimer = $("resetTimer");

  function renderTimer() {

    if (!timerDisplay) return;

    const minutes =
      Math.floor(timerSeconds / 60);

    const seconds =
      timerSeconds % 60;

    timerDisplay.textContent =
      String(minutes).padStart(2,"0")
      + ":"
      + String(seconds).padStart(2,"0");

  }

  if (startTimer) {

    startTimer.addEventListener(
      "click",
      function () {

        if (timerInterval) {

          clearInterval(timerInterval);

          timerInterval = null;

          startTimer.textContent =
            "Start";

          return;
        }

        startTimer.textContent =
          "Pause";

        timerInterval =
          setInterval(function () {

            if (timerSeconds <= 0) {

              clearInterval(timerInterval);

              timerInterval = null;

              startTimer.textContent =
                "Start";

              addXP(50);

              toast(
                "Focus session complete! 🎉"
              );

              timerSeconds =
                25 * 60;

              renderTimer();

              return;
            }

            timerSeconds--;

            renderTimer();

          },1000);

      }
    );

  }

  if (resetTimer) {

    resetTimer.addEventListener(
      "click",
      function () {

        clearInterval(timerInterval);

        timerInterval = null;

        timerSeconds =
          25 * 60;

        renderTimer();

        if (startTimer) {
          startTimer.textContent =
            "Start";
        }

      }
    );

  }


  /* ===================================================
     SKILL TRACKER
  =================================================== */

  const saveProgress =
    $("saveProgress");

  const skillRanges =
    document.querySelectorAll(
      '.panel input[type="range"]'
    );

  function loadSkills() {

    if (skillRanges.length >= 3) {

      skillRanges[0].value =
        state.skills.html;

      skillRanges[1].value =
        state.skills.ai;

      skillRanges[2].value =
        state.skills.communication;

    }

  }

  if (saveProgress) {

    saveProgress.addEventListener(
      "click",
      function () {

        if (skillRanges.length >= 3) {

          state.skills.html =
            Number(skillRanges[0].value);

          state.skills.ai =
            Number(skillRanges[1].value);

          state.skills.communication =
            Number(skillRanges[2].value);

        }

        state.progress =
          Math.round(
            (
              state.skills.html +
              state.skills.ai +
              state.skills.communication
            ) / 3
          );

        saveState();

        updateDashboard();

        addXP(25);

        toast(
          "Progress saved successfully 📈"
        );

      }
    );

  }


  /* ===================================================
     CAREER FINDER
  =================================================== */

  const careerQuiz = $("careerQuiz");

  if (careerQuiz) {

    careerQuiz.addEventListener(
      "click",
      function () {

        openModal(`

          <h2>🧭 Career Finder</h2>

          <p style="color:var(--muted);margin:8px 0 20px">
            Answer three quick questions.
          </p>

          <label>
            What do you enjoy?
          </label>

          <select id="careerInterest"
            style="width:100%;padding:12px;margin:7px 0 15px;background:var(--bg2);color:var(--text);border:1px solid var(--line);border-radius:10px">

            <option value="code">💻 Coding</option>
            <option value="data">📊 Numbers & Data</option>
            <option value="design">🎨 Design</option>
            <option value="ai">🤖 AI & Technology</option>
            <option value="mechanical">⚙️ Machines & Design</option>

          </select>

          <label>
            What do you prefer building?
          </label>

          <select id="careerBuild"
            style="width:100%;padding:12px;margin:7px 0 15px;background:var(--bg2);color:var(--text);border:1px solid var(--line);border-radius:10px">

            <option value="software">Software</option>
            <option value="analysis">Reports & Insights</option>
            <option value="visual">Visual Designs</option>
            <option value="ai">AI Applications</option>
            <option value="physical">Physical Products</option>

          </select>

          <button id="findCareer"
            style="
              padding:12px 18px;
              border:0;
              border-radius:11px;
              background:linear-gradient(135deg,var(--accent),var(--accent2));
              color:white;
              font-weight:800;
            ">
            Find My Career
          </button>

        `);

        const findCareer =
          $("findCareer");

        if (findCareer) {

          findCareer.addEventListener(
            "click",
            function () {

              const interest =
                $("careerInterest").value;

              const build =
                $("careerBuild").value;

              let result =
                "Software Developer";

              if (
                interest === "ai" ||
                build === "ai"
              ) {
                result =
                  "🤖 AI Developer";
              }

              else if (
                interest === "data" ||
                build === "analysis"
              ) {
                result =
                  "📊 Data Analyst";
              }

              else if (
                interest === "design" ||
                build === "visual"
              ) {
                result =
                  "🎨 UI/UX Designer";
              }

              else if (
                interest === "mechanical" ||
                build === "physical"
              ) {
                result =
                  "⚙️ CAD / Mechanical";
              }

              else {
                result =
                  "💻 Software Developer";
              }

              state.goal =
                result.replace(
                  /^[^\w]+/,
                  ""
                );

              saveState();

              openModal(`

                <h2>Your recommended path 🎯</h2>

                <div style="
                  margin:20px 0;
                  padding:20px;
                  border:1px solid var(--line);
                  border-radius:16px;
                  background:var(--bg2);
                ">

                  <h3>${result}</h3>

                  <p style="color:var(--muted);margin-top:8px">
                    DronaMentor MAX can now build a
                    learning roadmap around this direction.
                  </p>

                </div>

                <button
                  onclick="location.hash='learn';document.getElementById('modal').classList.remove('show','open');document.body.style.overflow='';"
                  style="
                    padding:12px 18px;
                    border:0;
                    border-radius:11px;
                    background:linear-gradient(135deg,var(--accent),var(--accent2));
                    color:white;
                    font-weight:800;
                  "
                >
                  Start Learning →
                </button>

              `);

            }
          );

        }

      }
    );

  }


  /* ===================================================
     ROADMAP
  =================================================== */

  const roadmapBtn =
    $("roadmapBtn");

  if (roadmapBtn) {

    roadmapBtn.addEventListener(
      "click",
      function () {

        const goal =
          state.goal ||
          "Software Developer";

        openModal(`

          <h2>🛣️ ${escapeHTML(
