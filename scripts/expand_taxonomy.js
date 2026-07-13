// expand_taxonomy.js — Add new disciplines, courses, and prerequisites to Polymath taxonomy
const fs = require('fs');
const path = 'C:/Users/Administrator/.kun/default_workspace/polymath/data/';

const disciplines = JSON.parse(fs.readFileSync(path + 'disciplines.json', 'utf8'));
const courses = JSON.parse(fs.readFileSync(path + 'courses.json', 'utf8'));
const prereqs = JSON.parse(fs.readFileSync(path + 'prerequisites.json', 'utf8'));

// ── TASK 1: Add disc_psych discipline ──
const existingIds = new Set(disciplines.disciplines.map(d => d.id));
console.log('Existing discipline IDs:', [...existingIds]);

// Add disc_psych
if (!existingIds.has('disc_psych')) {
  disciplines.disciplines.push({
    "id": "disc_psych",
    "name": "Psychology",
    "iscedCode": "0313",
    "cipCode": "42.0101",
    "level": "detailed_field",
    "parentId": "disc_socsci",
    "description": "The scientific study of mind, brain, and behavior — encompassing cognition, development, social interaction, neuroscience, and mental health.",
    "aliases": ["Psychological Science", "Behavioral Science"],
    "color": "#E879F9"
  });
  existingIds.add('disc_psych');
  console.log('Added disc_psych');
}

// Add disc_socsci — parent for Economics and Psychology
if (!existingIds.has('disc_socsci')) {
  disciplines.disciplines.push({
    "id": "disc_socsci",
    "name": "Social Sciences",
    "iscedCode": "03",
    "cipCode": "45",
    "level": "broad_field",
    "description": "The broad field encompassing economics, psychology, sociology, political science, and anthropology — studying human society and social relationships.",
    "aliases": ["Social Studies", "Behavioral Sciences"],
    "color": "#C084FC"
  });
  existingIds.add('disc_socsci');
  console.log('Added disc_socsci');
}

// Add disc_natsci — parent for Mathematics
if (!existingIds.has('disc_natsci')) {
  disciplines.disciplines.push({
    "id": "disc_natsci",
    "name": "Natural Sciences",
    "iscedCode": "05",
    "cipCode": "27",
    "level": "broad_field",
    "description": "The broad field encompassing mathematics, physics, chemistry, biology, and earth sciences — studying the natural world through observation and experiment.",
    "aliases": ["Science", "Physical Sciences"],
    "color": "#34D399"
  });
  existingIds.add('disc_natsci');
  console.log('Added disc_natsci');
}

console.log('disc_econ exists:', existingIds.has('disc_econ'));
console.log('disc_ds (Data Science) exists:', existingIds.has('disc_ds'));

disciplines.disciplineCount = disciplines.disciplines.length;
fs.writeFileSync(path + 'disciplines.json', JSON.stringify(disciplines, null, 2), 'utf8');
console.log('disciplines.json written, count:', disciplines.disciplineCount);

// ── TASK 2: New courses ──
const newCourses = [
  // ── Computer Science (MIT) - 10 courses ──
  {
    "id": "course_cs_mit_algo",
    "name": "Introduction to Algorithms",
    "shortName": "6.006",
    "disciplineId": "disc_cs",
    "level": "intermediate",
    "degreeLevel": "bachelor",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Comprehensive introduction to the design and analysis of algorithms. Covers sorting, searching, graph algorithms, dynamic programming, greedy algorithms, and NP-completeness. Taught in the style of MIT's legendary 6.006.",
    "learningOutcomes": [
      "Analyze asymptotic running time using Big-O, Ω, and Θ notation",
      "Design divide-and-conquer, dynamic programming, and greedy algorithms",
      "Implement graph algorithms: BFS, DFS, Dijkstra, Bellman-Ford",
      "Prove correctness of algorithms using loop invariants",
      "Classify problems as P, NP, NP-complete"
    ],
    "skills": ["skill_algorithms", "skill_python"],
    "careerPaths": [],
    "typicalYear": 2,
    "isCore": true,
    "tags": ["algorithms", "complexity", "mit", "core"]
  },
  {
    "id": "course_cs_mit_sys",
    "name": "Computer System Engineering",
    "shortName": "6.033",
    "disciplineId": "disc_cs",
    "level": "advanced",
    "degreeLevel": "bachelor",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Design principles for computer systems: modularity, abstraction, naming, layering, and client-server organization. Case studies from operating systems, networking, databases, and distributed systems.",
    "learningOutcomes": [
      "Apply modularity and abstraction to system design",
      "Analyze trade-offs in naming, caching, and consistency",
      "Evaluate fault-tolerance and recovery mechanisms",
      "Design networked client-server architectures",
      "Critique real-world system designs using engineering principles"
    ],
    "skills": ["skill_system_design", "skill_distributed_sys"],
    "careerPaths": ["career_swe"],
    "typicalYear": 3,
    "isCore": true,
    "tags": ["systems", "design", "mit", "engineering"]
  },
  {
    "id": "course_cs_mit_dist",
    "name": "Distributed Systems Engineering",
    "shortName": "6.824",
    "disciplineId": "disc_cs",
    "level": "graduate",
    "degreeLevel": "master",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Engineering principles for building distributed systems. Covers RPC, consistency models, consensus (Raft/Paxos), replication, fault tolerance, and distributed transactions. Labs implement a key-value store and replicated state machine.",
    "learningOutcomes": [
      "Implement consensus protocols including Raft",
      "Reason about consistency, availability, and partition tolerance",
      "Design fault-tolerant replicated storage systems",
      "Debug distributed concurrency issues",
      "Evaluate trade-offs between strong and eventual consistency"
    ],
    "skills": ["skill_distributed_sys", "skill_system_design", "skill_linux"],
    "careerPaths": ["career_swe", "career_devops"],
    "typicalYear": 5,
    "isCore": false,
    "tags": ["distributed", "consensus", "mit", "graduate"]
  },
  {
    "id": "course_cs_mit_perf",
    "name": "Performance Engineering of Software Systems",
    "shortName": "6.172",
    "disciplineId": "disc_cs",
    "level": "advanced",
    "degreeLevel": "bachelor",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Techniques for writing high-performance software: memory hierarchy optimization, vectorization, multi-threading, cache-efficient algorithms, and profiling. Heavy project-based learning in C.",
    "learningOutcomes": [
      "Profile and benchmark software to identify bottlenecks",
      "Optimize cache utilization and memory access patterns",
      "Apply SIMD vectorization and instruction-level parallelism",
      "Design and debug multi-threaded programs",
      "Measure and model performance analytically"
    ],
    "skills": ["skill_algorithms", "skill_comp_arch", "skill_linux"],
    "careerPaths": ["career_swe"],
    "typicalYear": 4,
    "isCore": false,
    "tags": ["performance", "optimization", "mit", "systems"]
  },
  {
    "id": "course_cs_mit_os",
    "name": "Operating System Engineering",
    "shortName": "6.828",
    "disciplineId": "disc_cs",
    "level": "advanced",
    "degreeLevel": "bachelor",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Hands-on OS design and implementation. Students build a working operating system (kernel, virtual memory, file system, processes) from scratch, modeled on MIT's 6.828 / xv6.",
    "learningOutcomes": [
      "Implement process management and context switching",
      "Design virtual memory with paging and TLB management",
      "Build a file system with crash consistency",
      "Write kernel-level synchronization primitives",
      "Debug OS-level concurrency using gdb and QEMU"
    ],
    "skills": ["skill_linux", "skill_comp_arch", "skill_system_design"],
    "careerPaths": ["career_swe", "career_devops"],
    "typicalYear": 4,
    "isCore": false,
    "tags": ["os", "kernel", "mit", "systems"]
  },
  {
    "id": "course_cs_mit_sec",
    "name": "Computer Systems Security",
    "shortName": "6.858",
    "disciplineId": "disc_cs",
    "level": "graduate",
    "degreeLevel": "master",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Security architecture and engineering for computer systems. Covers threat modeling, memory safety, sandboxing, web security, network security, cryptography in practice, and secure system design.",
    "learningOutcomes": [
      "Model threats and attack surfaces systematically",
      "Exploit and defend against buffer overflow and injection attacks",
      "Design sandboxed and capability-based security architectures",
      "Apply cryptographic primitives correctly in system design",
      "Audit real-world systems for security vulnerabilities"
    ],
    "skills": ["skill_cyber", "skill_system_design", "skill_linux"],
    "careerPaths": ["career_cybersecurity_analyst"],
    "typicalYear": 5,
    "isCore": false,
    "tags": ["security", "mit", "graduate", "systems"]
  },
  {
    "id": "course_cs_mit_ml",
    "name": "Introduction to Machine Learning",
    "shortName": "6.036",
    "disciplineId": "disc_cs",
    "level": "advanced",
    "degreeLevel": "bachelor",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Foundations of machine learning: supervised learning (regression, classification, SVMs, neural nets), unsupervised learning (clustering, PCA, EM), and reinforcement learning fundamentals.",
    "learningOutcomes": [
      "Implement linear regression, logistic regression, and SVMs from scratch",
      "Train feed-forward neural networks with backpropagation",
      "Apply clustering algorithms (k-means, GMM, EM) to real data",
      "Evaluate models using cross-validation, precision/recall, ROC",
      "Analyze bias-variance trade-off and regularization"
    ],
    "skills": ["skill_ml", "skill_python", "skill_linear_algebra"],
    "careerPaths": ["career_data_scientist", "career_ai_ml_engineer"],
    "typicalYear": 3,
    "isCore": true,
    "tags": ["ml", "mit", "core", "python"]
  },
  {
    "id": "course_cs_mit_vision",
    "name": "Advances in Computer Vision",
    "shortName": "6.869",
    "disciplineId": "disc_cs",
    "level": "graduate",
    "degreeLevel": "master",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Advanced topics in computer vision: convolutional neural networks, object detection, semantic segmentation, generative models, 3D reconstruction, and self-supervised learning. Research-oriented with paper readings.",
    "learningOutcomes": [
      "Implement state-of-the-art CNN architectures for vision tasks",
      "Apply object detection frameworks (R-CNN, YOLO, DETR)",
      "Train generative models (GANs, diffusion models) for image synthesis",
      "Perform 3D reconstruction from multi-view images",
      "Critically read and reproduce results from top vision papers"
    ],
    "skills": ["skill_deep_learning", "skill_ml", "skill_python"],
    "careerPaths": ["career_ai_ml_engineer"],
    "typicalYear": 5,
    "isCore": false,
    "tags": ["vision", "deep-learning", "mit", "graduate"]
  },
  {
    "id": "course_cs_mit_pl",
    "name": "Computer Language Engineering",
    "shortName": "6.035",
    "disciplineId": "disc_cs",
    "level": "advanced",
    "degreeLevel": "bachelor",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Design and implementation of programming languages. Covers parsing (lex/yacc), semantic analysis, intermediate representations, optimization passes, and code generation. Students build a working compiler.",
    "learningOutcomes": [
      "Build a lexer and parser using formal grammar specifications",
      "Implement semantic analysis with type checking and symbol tables",
      "Design intermediate representations and optimization passes",
      "Generate target code through instruction selection and register allocation",
      "Analyze language design trade-offs in type systems and memory models"
    ],
    "skills": ["skill_java", "skill_algorithms"],
    "careerPaths": ["career_swe"],
    "typicalYear": 4,
    "isCore": false,
    "tags": ["compilers", "mit", "languages", "engineering"]
  },
  {
    "id": "course_cs_mit_theory",
    "name": "Automata, Computability, and Complexity",
    "shortName": "6.045",
    "disciplineId": "disc_cs",
    "level": "advanced",
    "degreeLevel": "bachelor",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Theoretical foundations of computer science: finite automata, Turing machines, decidability, reducibility, and computational complexity theory including P, NP, PSPACE, and beyond.",
    "learningOutcomes": [
      "Prove language regularity or non-regularity using pumping lemma",
      "Construct Turing machines for computable functions",
      "Prove undecidability via diagonalization and reduction",
      "Classify problems by complexity class (P, NP, PSPACE, EXPTIME)",
      "Analyze NP-completeness through polynomial-time reductions"
    ],
    "skills": ["skill_discrete_math", "skill_critical_thinking"],
    "careerPaths": [],
    "typicalYear": 3,
    "isCore": true,
    "tags": ["theory", "automata", "complexity", "mit", "core"]
  },

  // ── Computer Science (Harvard/Stanford) - 10 courses ──
  {
    "id": "course_cs_harv_cs50",
    "name": "Introduction to Computer Science",
    "shortName": "CS50",
    "disciplineId": "disc_cs",
    "level": "foundation",
    "degreeLevel": "bachelor",
    "credits": { "us": 3, "ects": 6, "uk": 15, "china": 3 },
    "description": "Harvard's legendary introduction to the intellectual enterprises of computer science and the art of programming. Covers C, Python, SQL, HTML, CSS, JavaScript, data structures, algorithms, and computational thinking.",
    "learningOutcomes": [
      "Write programs in C, Python, and JavaScript",
      "Design and query relational databases with SQL",
      "Build full-stack web applications",
      "Analyze algorithmic efficiency and correctness",
      "Apply computational thinking to problems across disciplines"
    ],
    "skills": ["skill_python", "skill_js", "skill_sql", "skill_algorithms", "skill_web_dev"],
    "careerPaths": ["career_swe"],
    "typicalYear": 1,
    "isCore": true,
    "tags": ["harvard", "intro", "full-stack", "beginner"]
  },
  {
    "id": "course_cs_harv_sys",
    "name": "Systems Programming and Machine Organization",
    "shortName": "CS61",
    "disciplineId": "disc_cs",
    "level": "intermediate",
    "degreeLevel": "bachelor",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Deep dive into computer systems from a programmer's perspective: data representation, assembly, memory hierarchy, linking, exceptional control flow, virtual memory, and concurrent programming in C.",
    "learningOutcomes": [
      "Read and write x86-64 assembly code",
      "Analyze memory layout and cache behavior of programs",
      "Implement concurrent programs with pthreads and synchronization",
      "Debug memory errors using Valgrind and GDB",
      "Optimize code for modern CPU microarchitecture"
    ],
    "skills": ["skill_comp_arch", "skill_linux"],
    "careerPaths": ["career_swe"],
    "typicalYear": 2,
    "isCore": true,
    "tags": ["systems", "harvard", "assembly", "c"]
  },
  {
    "id": "course_cs_harv_ml",
    "name": "Machine Learning",
    "shortName": "CS181",
    "disciplineId": "disc_cs",
    "level": "advanced",
    "degreeLevel": "bachelor",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Comprehensive introduction to machine learning with a Bayesian emphasis: probabilistic modeling, graphical models, variational inference, deep generative models, and reinforcement learning. Harvard CS181 style.",
    "learningOutcomes": [
      "Derive and implement Bayesian inference algorithms",
      "Build probabilistic graphical models with exact and approximate inference",
      "Train deep generative models (VAEs, GANs, diffusion)",
      "Apply reinforcement learning with model-based and model-free methods",
      "Design ML experiments with proper uncertainty quantification"
    ],
    "skills": ["skill_ml", "skill_deep_learning", "skill_stats", "skill_python"],
    "careerPaths": ["career_data_scientist", "career_ai_ml_engineer", "career_ml_engineer"],
    "typicalYear": 3,
    "isCore": false,
    "tags": ["ml", "harvard", "bayesian", "probabilistic"]
  },
  {
    "id": "course_cs_harv_ai",
    "name": "Artificial Intelligence",
    "shortName": "CS182",
    "disciplineId": "disc_ai",
    "level": "advanced",
    "degreeLevel": "bachelor",
    "credits": { "us": 4, "ects": 7.5, "uk": 20, "china": 4 },
    "description": "Broad introduction to AI: search, constraint satisfaction, knowledge representation, planning, probabilistic reasoning, machine learning, natural language, and computer vision. Harvard CS182 style.",
    "learningOutcomes": [
      "Implement classical search algorithms (A*, minimax, MCTS)",
      "Solve constraint satisfaction problems with backtracking and local search",
      "Apply first-order logic and Bayesian networks for knowledge representation",
      "Design planning systems with STRIPS and hierarchical task networks",
      "Integrate learning and reasoning in hybrid AI architectures"
    ],
    "skills": ["skill_ml", "skill_python", "skill_algorithms"],
    "careerPaths": ["career_ai_ml_engineer"],
    "typicalYear": 3,
    "isCore": true,
    "tags": ["ai", "harvard", "search", "reasoning"]
  },
  {
    "id": "course_cs_stan_ai",
    "name": "Artificial Intelligence: Principles and Techniques",
    "shortName": "CS221",
    "disciplineId": "disc_ai",
    "level": "graduate",
    "degreeLevel": "master",
    "credits": { "us": 3, "ects": 6, "uk": 15, "china": 3 },
    "description": "Stanford's flagship AI course covering core principles: search, Markov decision processes, game playing, constraint satisfaction, graphical models, and logic. Emphasizes modeling and algorithmic thinking.",
    "learningOutcomes": [
      "Model real-world problems as search, MDPs, or CSPs",
      "Implement value iteration and policy iteration for MDPs",
      "Apply Bayesian networks and variable elimination for probabilistic reasoning",
      "Design heuristics and admissible search strategies",
      "Formulate learning as optimization over model parameters"
    ],
    "skills": ["skill_algorithms", "skill_stats", "skill_python"],
    "careerPaths": ["career_ai_ml_engineer"],
    "typicalYear": 5,
    "isCore": true,
    "tags": ["ai", "stanford", "graduate", "search"]
  },
  {
    "id": "course_cs_stan_nlp",
    "name": "Natural Language Processing with Deep Learning",
    "shortName": "CS224N",
    "disciplineId": "disc_ai",
    "level": "graduate",
    "degreeLevel": "master",
    "credits": { "us": 3, "ects": 6, "uk": 15, "china": 3 },
    "description": "Cutting-edge NLP combining linguistics, statistics, and deep learning. Covers word vectors, RNNs, attention, Transformers, BERT, GPT, text generation, question answering, and machine translation.",
    "learningOutcomes": [
      "Implement word2vec and contextual embeddings (BERT, GPT)",
      "Build Transformer-based models for classification and generation",
      "Design neural machine translation systems with attention",
      "Apply few-shot and zero-shot prompting with large language models",
      "Evaluate NLP models on benchmark tasks (GLUE, SQuAD)"
    ],
    "skills": ["skill_nlp", "skill_deep_learning", "skill_ml", "skill_python"],
    "careerPaths": ["career_ai_ml_engineer", "career_ml_engineer"],
    "typicalYear": 5,
    "isCore": false,
    "tags": ["nlp", "stanford", "deep-learning", "transformers", "graduate"]
  },
  {
    "id": "course_cs_stan_ml",
    "name": "Machine Learning",
    "shortName": "CS229",
    "disciplineId": "disc_cs",
    "level": "graduate",
    "degreeLevel": "master",
    "credits": { "us": 3, "ects": 6, "uk": 15, "china": 3 },
    "description": "Stanford's rigorous ML course: supervised learning, generative learning, SVMs, kernel methods, learning theory, bias/variance, deep learning, reinforcement learning, and EM. Heavy mathematical treatment.",
    "learningOutcomes": [
      "Derive learning algorithms from first principles (MLE, MAP)",
      "Prove generalization bounds using VC dimension and Rademacher complexity",
      "Implement kernel SVMs and Gaussian processes",
      "Analyze convergence of gradient descent and stochastic variants",
      "Derive EM algorithm and apply to mixture models and HMMs"
    ],
    "skills": ["skill_ml", "skill_stats", "skill_linear_algebra", "skill_python"],
    "careerPaths": ["career_data_scientist", "career_ai_ml_engineer", "career_ml_engineer"],
    "typicalYear": 5,
    "isCore": false,
    "tags": ["ml", "stanford", "graduate", "math-heavy"]
  },
  {
    "id": "course_cs_stan_cv",
    "name": "Convolutional Neural Networks for Visual Recognition",
    "shortName": "CS231N",
    "disciplineId": "disc_ai",
    "level": "graduate",
    "degreeLevel": "master",
    "credits": { "us": 3, "ects": 6, "uk": 15, "china": 3 },
    "description": "Deep learning for computer vision: CNNs, image classification, object detection, segmentation, generative models (GANs, VAEs), visual attention, and self-supervised learning. Stanford's famous CS231N.",
    "learningOutcomes": [
      "Design and train CNN architectures (ResNet, EfficientNet, ViT)",
      "Implement object detection and instance segmentation models",
      "Train generative adversarial networks for image synthesis",
      "Apply transfer learning and data augmentation strategies",
      "Visualize and interpret what neural networks learn"
    ],
    "skills": ["skill_deep_learning", "skill_ml", "skill_python"],
    "careerPaths": ["career_ai_ml_engineer", "career_ml_engineer"],
    "typicalYear": 5,
    "isCore": false,
    "tags": ["vision", "cnn", "stanford", "deep-learning", "graduate"]
  },
  {
    "id": "course_cs_stan_rl",
    "name": "Reinforcement Learning",
    "shortName": "CS234",
    "disciplineId": "disc_ai",
    "level": "graduate",
    "degreeLevel": "master",
    "credits": { "us": 3, "ects": 6, "uk": 15, "china": 3 },
    "description": "Principles of reinforcement learning: MDPs, dynamic programming, Monte Carlo, TD learning, Q-learning, policy gradients, actor-critic, exploration/exploitation, and deep RL (DQN, PPO, AlphaGo).",
    "learningOutcomes": [
      "Formulate sequential decision problems as MDPs",
      "Implement tabular RL: Q-learning, SARSA, Monte Carlo",
      "Derive policy gradient theorems and implement REINFORCE, PPO",
      "Apply deep RL to control tasks with function approximation",
      "Analyze exploration-exploitation trade-offs (UCB, Thompson sampling)"
    ],
    "skills": ["skill_ml", "skill_deep_learning", "skill_python", "skill_stats"],
    "careerPaths": ["career_ai_ml_engineer", "career_ml_engineer"],
    "typicalYear": 5,
    "isCore": false,
    "tags": ["reinforcement-learning", "stanford", "graduate", "deep-rl"]
  },
  {
    "id": "course_cs_stan_dm",
    "name": "Mining Massive Datasets",
    "shortName": "CS246",
    "disciplineId": "disc_ds",
    "level": "graduate",
    "degreeLevel": "master",
    "credits": { "us": 3, "ects": 6, "uk": 15, "china": 3 },
    "description": "Algorithms and systems for mining very large datasets: MapReduce, locality-sensitive hashing, streaming, link analysis, recommendation systems, clustering at scale, and graph mining.",
    "learningOutcomes": [
      "Design MapReduce algorithms for terabyte-scale data processing",
      "Implement locality-sensitive hashing for near-neighbor search",
      "Apply PageRank and HITS for web-scale link analysis",
      "Build collaborative filtering and matrix factorization recommenders",
      "Process data streams with limited memory using sketches"
    ],
    "skills": ["skill_data_analytics", "skill_algorithms", "skill_python"],
    "careerPaths": ["career_data_scientist", "career_data_engineer"],
    "typicalYear": 5,
    "isCore": false,
    "tags": ["big-data", "stanford", "graduate", "mining"]
  }
];

// Write incrementally. We'll append to courses in batches.
courses.courses = courses.courses.concat(newCourses);
console.log('Added first batch, current count:', courses.courses.length);

// Continue with batches via script execution
fs.writeFileSync(path + 'courses_tmp.json', JSON.stringify(courses, null, 2), 'utf8');
console.log('Temp courses written, continue expanding...');
