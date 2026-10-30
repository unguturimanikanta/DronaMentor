/* =========================================================
   DRONAMENTOR MAX — SUBJECT LIBRARY
   ROMING AI MENTOR READY
   ========================================================= */

const DRONA_SUBJECTS = [
  ["mathematics","Mathematics","School & Foundation","📐","Build strong mathematical thinking.","Arithmetic|Algebra|Geometry|Trigonometry|Calculus|Probability"],
  ["physics","Physics","School & Foundation","⚛️","Understand motion, energy, forces and modern physics.","Mechanics|Waves|Thermodynamics|Electricity|Magnetism|Modern Physics"],
  ["chemistry","Chemistry","School & Foundation","🧪","Learn matter, atoms, molecules and reactions.","Atoms|Periodic Table|Chemical Bonding|Organic Chemistry|Reactions|Electrochemistry"],
  ["biology","Biology","School & Foundation","🧬","Explore cells, genetics, organisms and ecosystems.","Cells|Genetics|Human Biology|Plants|Evolution|Ecology"],
  ["general-science","General Science","School & Foundation","🔬","A broad introduction to scientific concepts.","Matter|Energy|Earth|Space|Life Science|Technology"],
  ["environmental-science","Environmental Science","School & Foundation","🌍","Understand environment, climate and sustainability.","Climate|Pollution|Ecosystems|Resources|Sustainability|Conservation"],
  ["history","History","School & Foundation","🏛️","Explore civilizations and historical change.","Ancient History|Medieval History|Modern History|World History|Civilizations"],
  ["geography","Geography","School & Foundation","🗺️","Learn about Earth, countries, climate and landscapes.","Physical Geography|Human Geography|Maps|Climate|Countries|Resources"],
  ["economics","Economics","School & Foundation","📈","Understand economies, markets and money.","Demand|Supply|Markets|Inflation|GDP|Global Economy"],
  ["civics","Civics & Political Science","School & Foundation","🏛️","Learn about governments, citizenship and political systems.","Government|Democracy|Constitution|Rights|Elections|Global Politics"],
  ["general-knowledge","General Knowledge","School & Foundation","🧠","Improve your awareness of the world.","World|Science|Technology|Sports|History|Current Affairs"],

  ["english","English","Languages","🇬🇧","Improve grammar, vocabulary, speaking and writing.","Grammar|Vocabulary|Speaking|Writing|Reading|Communication"],
  ["telugu","Telugu","Languages","🪷","Learn Telugu language, grammar, reading and writing.","Alphabet|Grammar|Vocabulary|Reading|Writing|Literature"],
  ["hindi","Hindi","Languages","🇮🇳","Learn Hindi communication and grammar.","Alphabet|Grammar|Speaking|Reading|Writing|Vocabulary"],
  ["spanish","Spanish","Languages","🇪🇸","Learn Spanish for communication and travel.","Basics|Grammar|Vocabulary|Speaking|Reading"],
  ["french","French","Languages","🇫🇷","Build French language skills step by step.","Basics|Grammar|Vocabulary|Speaking|Reading"],
  ["german","German","Languages","🇩🇪","Learn German language fundamentals.","Basics|Grammar|Vocabulary|Speaking|Reading"],
  ["japanese","Japanese","Languages","🇯🇵","Learn Japanese writing and communication.","Hiragana|Katakana|Kanji|Grammar|Speaking"],
  ["arabic","Arabic","Languages","🌙","Learn Arabic language fundamentals.","Alphabet|Grammar|Vocabulary|Speaking|Reading"],
  ["portuguese","Portuguese","Languages","🇵🇹","Learn Portuguese communication skills.","Basics|Grammar|Vocabulary|Speaking"],
  ["bengali","Bengali","Languages","🌏","Learn Bengali language basics.","Alphabet|Grammar|Vocabulary|Reading|Writing"],

  ["computer-science","Computer Science","Technology","💻","Build a complete foundation in computer science.","Programming|Algorithms|Data Structures|Systems|Networks"],
  ["programming","Programming Fundamentals","Technology","👨‍💻","Learn programming logic and problem solving.","Variables|Conditions|Loops|Functions|Arrays|Algorithms"],
  ["python","Python","Technology","🐍","Learn Python from basics to real projects.","Syntax|Functions|OOP|Files|APIs|Projects"],
  ["java","Java","Technology","☕","Learn Java programming and object-oriented development.","Syntax|OOP|Collections|Exceptions|Projects"],
  ["c-programming","C Programming","Technology","⚙️","Master C programming fundamentals.","Variables|Pointers|Arrays|Functions|Structures|Memory"],
  ["cpp","C++","Technology","🔷","Learn modern C++ and object-oriented programming.","OOP|STL|Pointers|Templates|Algorithms"],
  ["csharp","C#","Technology","🎮","Learn C# for applications and game development.","Syntax|OOP|Collections|APIs|Unity Basics"],
  ["html","HTML","Web Development","🌐","Build the structure of modern websites.","Elements|Forms|Tables|Semantic HTML|Accessibility"],
  ["css","CSS","Web Development","🎨","Design responsive and modern websites.","Selectors|Flexbox|Grid|Animations|Responsive Design"],
  ["javascript","JavaScript","Web Development","⚡","Create interactive web applications.","DOM|Events|Functions|Async|APIs|Projects"],
  ["react","React","Web Development","⚛️","Build modern component-based web applications.","Components|Props|State|Hooks|Routing|Projects"],
  ["sql","SQL & Databases","Technology","🗄️","Learn relational databases and SQL.","SELECT|Joins|Indexes|Transactions|Database Design"],
  ["data-structures","Data Structures","Computer Science","🧱","Master efficient ways to organize data.","Arrays|Linked Lists|Stacks|Queues|Trees|Graphs"],
  ["algorithms","Algorithms","Computer Science","🧮","Develop algorithmic problem-solving skills.","Searching|Sorting|Recursion|Greedy|Dynamic Programming"],
  ["operating-systems","Operating Systems","Computer Science","🖥️","Understand how operating systems work.","Processes|Threads|Memory|File Systems|Scheduling"],
  ["computer-networks","Computer Networks","Computer Science","🌐","Understand how computers communicate.","OSI|TCP/IP|HTTP|DNS|Routing|Security"],
  ["software-engineering","Software Engineering","Computer Science","🛠️","Learn professional software development practices.","SDLC|Testing|Architecture|Agile|Version Control"],
  ["git-github","Git & GitHub","Technology","🐙","Learn version control and collaborative development.","Git Basics|Branches|Commits|Pull Requests|GitHub Pages"],
  ["linux","Linux","Technology","🐧","Learn Linux commands and system administration.","Terminal|Files|Permissions|Processes|Shell"],

  ["engineering-mathematics","Engineering Mathematics","Engineering","📊","Mathematics used across engineering disciplines.","Calculus|Matrices|Differential Equations|Transforms|Statistics"],
  ["engineering-physics","Engineering Physics","Engineering","⚛️","Physics concepts applied to engineering.","Mechanics|Optics|Lasers|Quantum Physics|Materials"],
  ["mechanical-engineering","Mechanical Engineering","Engineering","⚙️","Explore mechanical engineering fundamentals.","Mechanics|Machines|Materials|Thermodynamics|Design"],
  ["civil-engineering","Civil Engineering","Engineering","🏗️","Learn construction and infrastructure engineering.","Structures|Concrete|Surveying|Geotechnical|Transportation"],
  ["electrical-engineering","Electrical Engineering","Engineering","⚡","Learn electrical systems and circuits.","Circuits|Machines|Power|Control|Electronics"],
  ["electronics","Electronics & Communication","Engineering","📡","Explore electronics and communication systems.","Diodes|Transistors|Digital Electronics|Signals|Communication"],
  ["mechatronics","Mechatronics","Engineering","🤖","Combine mechanical, electrical and software engineering.","Sensors|Actuators|Control|Robotics|Automation"],
  ["automobile-engineering","Automobile Engineering","Engineering","🚗","Learn vehicle systems and automotive technology.","Engine|Transmission|Brakes|EV|Vehicle Design"],
  ["manufacturing","Manufacturing Engineering","Engineering","🏭","Understand modern manufacturing processes.","Machining|CNC|Production|Quality|Automation"],
  ["thermodynamics","Thermodynamics","Engineering","🔥","Study heat, energy and thermodynamic systems.","Laws|Cycles|Entropy|Heat Engines|Refrigeration"],
  ["fluid-mechanics","Fluid Mechanics","Engineering","💧","Understand fluids at rest and in motion.","Pressure|Flow|Bernoulli|Pumps|Turbines"],
  ["strength-of-materials","Strength of Materials","Engineering","🔩","Learn how materials behave under loads.","Stress|Strain|Bending|Torsion|Columns"],
  ["machine-design","Machine Design","Engineering","⚙️","Design safe and functional mechanical components.","Shafts|Gears|Bearings|Bolts|Design Standards"],
  ["engineering-drawing","Engineering Drawing","Engineering","📏","Learn technical drawing and engineering visualization.","Projection|Sections|Dimensions|Tolerances|Assembly"],
  ["cad-design","CAD Design","Engineering","📐","Learn computer-aided design workflows.","2D Drafting|3D Modeling|Assemblies|Dimensions|Drawings"],
  ["cam","CAM Programming","Engineering","🛠️","Learn computer-aided manufacturing concepts.","Toolpaths|CNC|G-Code|Machining|Simulation"],

  ["artificial-intelligence","Artificial Intelligence","AI & Data","🤖","Understand modern AI concepts and applications.","AI Basics|Search|Learning|Generative AI|AI Systems"],
  ["machine-learning","Machine Learning","AI & Data","🧠","Build systems that learn from data.","Regression|Classification|Clustering|Features|Evaluation"],
  ["deep-learning","Deep Learning","AI & Data","🧬","Learn neural networks and deep learning systems.","Neural Networks|CNN|RNN|Transformers|Training"],
  ["data-science","Data Science","AI & Data","📊","Turn data into useful insights.","Statistics|Python|Data Cleaning|Visualization|ML"],
  ["data-analytics","Data Analytics","AI & Data","📈","Analyze data to support better decisions.","Excel|SQL|Charts|Dashboards|Business Analytics"],
  ["generative-ai","Generative AI","AI & Data","✨","Understand and build with generative AI.","LLMs|Text Generation|Image AI|AI Apps|Evaluation"],
  ["prompt-engineering","Prompt Engineering","AI & Data","💬","Learn to create effective prompts and AI workflows.","Prompt Structure|Few-Shot|Reasoning|Evaluation|Workflows"],
  ["rag","RAG Systems","AI & Data","📚","Learn retrieval-augmented generation systems.","Embeddings|Vector Search|Retrieval|Context|Evaluation"],
  ["ai-agents","AI Agents","AI & Data","🕹️","Learn how AI agents use tools and workflows.","Tools|Planning|Memory|Workflows|Agent Evaluation"],
  ["computer-vision","Computer Vision","AI & Data","👁️","Teach computers to understand images and video.","Images|Classification|Detection|Segmentation|Vision Models"],
  ["nlp","Natural Language Processing","AI & Data","🗣️","Learn how computers process human language.","Text|Tokens|Embeddings|Classification|Language Models"],

  ["cloud-computing","Cloud Computing","Technology","☁️","Learn modern cloud computing concepts.","Cloud Basics|Compute|Storage|Databases|Networking"],
  ["devops","DevOps","Technology","♾️","Learn software delivery and infrastructure automation.","CI/CD|Containers|Automation|Monitoring|Infrastructure"],
  ["cybersecurity","Cybersecurity","Technology","🔐","Learn defensive cybersecurity and security fundamentals.","Security Basics|Networks|Authentication|Threats|Defense"],
  ["network-security","Network Security","Technology","🛡️","Understand how networks are protected.","Firewalls|Encryption|VPN|Monitoring|Security Architecture"],
  ["iot","Internet of Things","Technology","📡","Build connected smart devices and systems.","Sensors|Microcontrollers|Connectivity|Cloud|Projects"],
  ["blockchain","Blockchain","Technology","⛓️","Understand decentralized data systems.","Blocks|Hashing|Consensus|Smart Contracts|Applications"],

  ["ui-ux","UI/UX Design","Creative","🎨","Design useful and engaging digital experiences.","UX Research|Wireframes|UI|Prototypes|Usability"],
  ["graphic-design","Graphic Design","Creative","🖌️","Learn visual communication and design principles.","Typography|Color|Layout|Branding|Composition"],
  ["photoshop","Adobe Photoshop","Creative","🖼️","Learn professional image editing workflows.","Layers|Masks|Selections|Retouching|Compositing"],
  ["video-editing","Video Editing","Creative","🎬","Create engaging video content.","Cuts|Transitions|Audio|Color|Storytelling"],
  ["3d-modeling","3D Modeling","Creative","🧊","Create and visualize 3D objects.","Modeling|Materials|Lighting|Rendering|Animation"],
  ["animation","Animation","Creative","🎞️","Learn animation principles and workflows.","Keyframes|Motion|Timing|Character Animation|3D"],
  ["photography","Photography","Creative","📷","Learn composition and photography fundamentals.","Exposure|Composition|Lighting|Lenses|Editing"],
  ["motion-graphics","Motion Graphics","Creative","✨","Create animated visual designs.","Typography|Animation|Transitions|Compositing|Brand Motion"],

  ["business-studies","Business Studies","Business & Career","💼","Understand how businesses operate.","Management|Marketing|Operations|Finance|Strategy"],
  ["accounting","Accounting","Business & Career","🧾","Learn accounting principles and financial records.","Journal|Ledger|Balance Sheet|Profit & Loss|Financial Statements"],
  ["finance","Finance","Business & Career","💰","Understand personal and business finance.","Budgeting|Investing|Risk|Markets|Financial Planning"],
  ["marketing","Marketing","Business & Career","📣","Learn modern marketing principles.","Branding|Digital Marketing|SEO|Content|Analytics"],
  ["entrepreneurship","Entrepreneurship","Business & Career","🚀","Learn how to turn ideas into useful ventures.","Ideas|Validation|Business Models|Marketing|Growth"],
  ["project-management","Project Management","Business & Career","📋","Plan, execute and manage projects effectively.","Planning|Agile|Scrum|Risk|Delivery"],
  ["communication","Communication Skills","Business & Career","🗣️","Improve professional and everyday communication.","Speaking|Writing|Listening|Presentation|Confidence"],
  ["leadership","Leadership","Business & Career","👑","Develop leadership and teamwork skills.","Decision Making|Teamwork|Delegation|Conflict|Vision"],
  ["resume-building","Resume Building","Business & Career","📄","Build a clear and professional resume.","Structure|Skills|Projects|Experience|ATS"],
  ["interview-skills","Interview Skills","Business & Career","🎤","Prepare for professional interviews.","HR|Technical|Behavioral|Communication|Mock Interviews"],
  ["career-planning","Career Planning","Business & Career","🧭","Plan your education, skills and career direction.","Self Assessment|Career Options|Skills|Roadmaps|Job Search"],

  ["psychology","Psychology","Life & Society","🧠","Explore human behavior and basic psychology.","Behavior|Memory|Learning|Emotion|Social Psychology"],
  ["sociology","Sociology","Life & Society","👥","Understand society, groups and social behavior.","Society|Culture|Groups|Institutions|Social Change"],
  ["health-education","Health Education","Life & Society","❤️","Learn general health and wellbeing concepts.","Nutrition Basics|Exercise|Sleep|Hygiene|Wellbeing"],
  ["financial-literacy","Financial Literacy","Life & Society","💳","Build practical money-management knowledge.","Budgeting|Saving|Banking|Credit|Planning"],
  ["critical-thinking","Critical Thinking","Life & Society","🔎","Improve reasoning and decision-making.","Logic|Evidence|Bias|Arguments|Problem Solving"],
  ["time-management","Time Management","Life & Society","⏱️","Learn practical systems for managing time and priorities.","Planning|Priorities|Focus|Habits|Scheduling"],

  ["music","Music","Arts & Media","🎵","Explore music theory, rhythm and creativity.","Rhythm|Melody|Harmony|Notation|Composition"],
  ["film-making","Film Making","Arts & Media","🎥","Learn the fundamentals of visual storytelling.","Story|Camera|Lighting|Editing|Sound"],
  ["creative-writing","Creative Writing","Arts & Media","✍️","Develop storytelling and writing skills.","Characters|Plot|Dialogue|Poetry|Storytelling"],
  ["public-speaking","Public Speaking","Arts & Media","🎙️","Become more confident speaking to an audience.","Voice|Body Language|Structure|Presentation|Confidence"],

  ["electrical-work","Electrical Basics","Vocational Skills","🔌","Learn basic electrical concepts and safety.","Circuits|Components|Wiring Concepts|Measurement|Safety"],
  ["welding","Welding Fundamentals","Vocational Skills","🔥","Explore welding concepts, processes and workshop safety.","Welding Types|Materials|Tools|Joints|Safety"],
  ["cnc-machining","CNC Machining","Vocational Skills","🏭","Learn CNC machining concepts and programming fundamentals.","CNC Basics|Coordinates|G-Code|Tooling|Machining"],
  ["quality-control","Quality Control","Vocational Skills","✅","Learn inspection and quality-management fundamentals.","Inspection|Measurement|Defects|Standards|Quality Tools"],
  ["industrial-safety","Industrial Safety","Vocational Skills","🦺","Understand workplace safety fundamentals.","Hazards|PPE|Risk Assessment|Emergency|Safety Culture"]
].map(([id,name,category,icon,description,topics]) => ({
  id,name,category,icon,description,
  levels: ["Beginner","Intermediate","Advanced"],
  topics: topics.split("|")
}));

const DronaSubjectApp = {
  selectedCategory: "All",
  selectedLevel: "All",
  searchQuery: "",

  getCategories() {
    return ["All", ...new Set(DRONA_SUBJECTS.map(s => s.category))];
  },

  getFilteredSubjects() {
    const q = this.searchQuery.toLowerCase().trim();
    return DRONA_SUBJECTS.filter(s => {
      const categoryMatch = this.selectedCategory === "All" || s.category === this.selectedCategory;
      const levelMatch = this.selectedLevel === "All" || s.levels.includes(this.selectedLevel);
      const text = `${s.name} ${s.category} ${s.description} ${s.topics.join(" ")}`.toLowerCase();
      return categoryMatch && levelMatch && (!q || text.includes(q));
    });
  },

  escape(value) {
    return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;")
      .replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  },

  card(s) {
    return `<article class="subject-card">
      <div class="subject-icon">${s.icon}</div>
      <div class="subject-card-content">
        <span class="subject-category-label">${this.escape(s.category)}</span>
        <h3>${this.escape(s.name)}</h3>
        <p>${this.escape(s.description)}</p>
        <div class="subject-topics">${s.topics.slice(0,4).map(t=>`<span>${this.escape(t)}</span>`).join("")}</div>
        <div class="subject-card-bottom">
          <span class="subject-level">${s.levels[0]}</span>
          <button class="subject-open" data-open-subject="${s.id}">Start Learning →</button>
        </div>
      </div>
    </article>`;
  },

  render() {
    const container = document.getElementById("subjectLibrary");
    if (!container) return;
    const subjects = this.getFilteredSubjects();

    container.innerHTML = `<div class="subject-library">
      <div class="subject-library-head">
        <div><span class="eyebrow">LEARNING HUB</span>
        <h2>Explore Subjects</h2>
        <p>Learn at your own pace with lessons, quizzes, projects and ROMING AI Mentor support.</p></div>
        <div class="subject-count"><strong>${subjects.length}</strong><span>Subjects</span></div>
      </div>

      <div class="subject-controls">
        <input id="subjectSearch" class="subject-search" type="search" placeholder="🔎 Search subjects..." value="${this.escape(this.searchQuery)}">
        <select id="subjectLevel" class="subject-select">
          <option value="All">All Levels</option><option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option>
        </select>
      </div>

      <div class="subject-categories">${this.getCategories().map(c =>
        `<button class="subject-category ${c===this.selectedCategory?"active":""}" data-category="${this.escape(c)}">${this.escape(c)}</button>`
      ).join("")}</div>

      <div class="subject-grid">${subjects.length ? subjects.map(s=>this.card(s)).join("") :
        `<div class="empty-subjects"><div>🔍</div><h3>No subjects found</h3><p>Try another search or category.</p></div>`}</div>
    </div>`;

    const search = document.getElementById("subjectSearch");
    const level = document.getElementById("subjectLevel");
    level.value = this.selectedLevel;

    search.addEventListener("input", e => { this.searchQuery=e.target.value; this.render(); });
    level.addEventListener("change", e => { this.selectedLevel=e.target.value; this.render(); });

    document.querySelectorAll(".subject-category").forEach(btn =>
      btn.addEventListener("click", () => { this.selectedCategory=btn.dataset.category; this.render(); })
    );

    document.querySelectorAll("[data-open-subject]").forEach(btn =>
      btn.addEventListener("click", () => this.open(btn.dataset.openSubject))
    );
  },

  open(id) {
    const s = DRONA_SUBJECTS.find(x=>x.id===id);
    if (!s) return;

    const modal = document.createElement("div");
    modal.className = "subject-modal-overlay";
    modal.innerHTML = `<div class="subject-modal">
      <button class="subject-modal-close">×</button>
      <div class="subject-modal-icon">${s.icon}</div>
      <span class="eyebrow">${this.escape(s.category)}</span>
      <h2>${this.escape(s.name)}</h2>
      <p class="subject-modal-description">${this.escape(s.description)}</p>
      <div class="subject-modal-section"><h3>📚 Topics</h3>
        <div class="modal-topic-list">${s.topics.map(t=>`<span>${this.escape(t)}</span>`).join("")}</div>
      </div>
      <div class="subject-learning-flow">
        <div><strong>01</strong><span>Learn</span></div>
        <div><strong>02</strong><span>Practice</span></div>
        <div><strong>03</strong><span>Quiz</span></div>
        <div><strong>04</strong><span>Build</span></div>
      </div>
      <button class="primary-btn subject-start-btn">🚀 Start Learning</button>
      <button class="mentor-btn">🤖 Ask ROMING AI Mentor</button>
    </div>`;

    document.body.appendChild(modal);
    modal.querySelector(".subject-modal-close").onclick=()=>modal.remove();
    modal.onclick=e=>{if(e.target===modal) modal.remove();};

    modal.querySelector(".subject-start-btn").onclick=()=>{
      localStorage.setItem("drona_active_subject", JSON.stringify({
        id:s.id,name:s.name,startedAt:new Date().toISOString()
      }));
      modal.remove();
      if(typeof toast==="function") toast(`${s.name} added to your learning journey 🚀`);
    };

    modal.querySelector(".mentor-btn").onclick=()=>{
      modal.remove();
      if(typeof toast==="function") toast(`ROMING AI Mentor is ready for ${s.name} 🤖`);
    };
  }
};

window.DRONA_SUBJECTS = DRONA_SUBJECTS;
window.DronaSubjectApp = DronaSubjectApp;

document.addEventListener("DOMContentLoaded", () => DronaSubjectApp.render());
