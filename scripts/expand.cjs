// Polymath Data Expansion Script
// Adds MIT/Harvard/Stanford/Oxford courses + Psychology, Economics, Data Science disciplines
const fs = require('fs');
const path = 'C:/Users/Administrator/.kun/default_workspace/polymath/data/';

// Load current data
const disc = JSON.parse(fs.readFileSync(path+'disciplines.json','utf8'));
const courses = JSON.parse(fs.readFileSync(path+'courses.json','utf8'));
const prereqs = JSON.parse(fs.readFileSync(path+'prerequisites.json','utf8'));
const skills = JSON.parse(fs.readFileSync(path+'skills.json','utf8'));

const existingDiscIds = new Set(disc.disciplines.map(d=>d.id));
const existingCourseIds = new Set(courses.courses.map(c=>c.id));
const existingSkillIds = new Set(skills.skills.map(s=>s.id));

console.log('Current: '+courses.courses.length+' courses, '+disc.disciplines.length+' disciplines, '+prereqs.prerequisites.length+' prereqs');

// ═══ ADD DISCIPLINES ═══
const newDiscs = [
  {id:'disc_psych',name:'Psychology',iscedCode:'0313',cipCode:'42.0101',level:'detailed_field',parentId:'disc_socsci',description:'The scientific study of mind, brain, and behavior — covering cognition, development, social interaction, neuroscience, and mental health.',aliases:['Psychological Science','Behavioral Science'],color:'#E879F9'},
  {id:'disc_socsci',name:'Social Sciences',iscedCode:'03',cipCode:'45',level:'broad_field',description:'The study of human society and social relationships, encompassing economics, psychology, sociology, political science, and anthropology.',aliases:['Social Studies'],color:'#C084FC'},
  {id:'disc_natsci',name:'Natural Sciences',iscedCode:'05',cipCode:'26',level:'broad_field',description:'The study of the natural world through observation and experiment, including physics, chemistry, biology, and earth sciences.',aliases:['Physical Sciences'],color:'#34D399'}
];

let addedDiscs = 0;
for (const nd of newDiscs) {
  if (!existingDiscIds.has(nd.id)) {
    disc.disciplines.push(nd);
    existingDiscIds.add(nd.id);
    addedDiscs++;
  }
}
disc.disciplineCount = disc.disciplines.length;
console.log('Added '+addedDiscs+' new disciplines. Total: '+disc.disciplines.length);

// ═══ ADD COURSES ═══
// Helper: only include skills that exist
const s = (ids) => ids.filter(id => existingSkillIds.has(id));

const newCourses = [
  // ── MIT CS ──
  {id:'course_cs_mit_algo',name:'Design & Analysis of Algorithms',shortName:'6.046',disciplineId:'disc_cs',level:'advanced',degreeLevel:'bachelor',credits:{us:4,ects:7.5,uk:20,china:4},description:'Advanced techniques for algorithm design and analysis: divide-and-conquer, dynamic programming, amortized analysis, randomization, network flow, linear programming, and approximation algorithms. Modeled after MIT 6.046.',learningOutcomes:['Analyze algorithm complexity using advanced asymptotic techniques','Apply network flow and linear programming to optimization problems','Design approximation algorithms for NP-hard problems','Implement randomized algorithms with provable guarantees','Prove correctness and optimality of greedy algorithms'],skills:s(['skill_algorithms','skill_python']),tags:['algorithms','complexity','np-complete','mit'],typicalYear:3,isCore:true},
  {id:'course_cs_mit_sys',name:'Computer System Engineering',shortName:'6.033',disciplineId:'disc_cs',level:'advanced',degreeLevel:'bachelor',credits:{us:4,ects:7.5,uk:20,china:4},description:'Principles of computer system design: modularity, abstraction, naming, networking, fault tolerance, security, and real-world case studies including the Internet, DNS, and cloud systems. Modeled after MIT 6.033.',learningOutcomes:['Design modular systems with clean abstractions','Analyze system trade-offs in performance, reliability, and security','Apply fault-tolerance techniques including replication and consensus','Evaluate real-world systems through case-study methodology','Design naming and addressing schemes for distributed systems'],skills:s(['skill_system_design','skill_distributed_sys']),tags:['systems','design','mit','fault-tolerance'],typicalYear:3,isCore:true},
  {id:'course_cs_mit_dist',name:'Distributed Systems Engineering',shortName:'6.824',disciplineId:'disc_cs',level:'graduate',degreeLevel:'master',credits:{us:4,ects:7.5,uk:20,china:4},description:'Engineering distributed systems: RPC, threads, concurrency control, replication, consensus (Raft/Paxos), fault tolerance, and distributed transactions. Heavy implementation focus — students build a key-value store. Modeled after MIT 6.824.',learningOutcomes:['Implement the Raft consensus algorithm','Design linearizable distributed storage systems','Apply two-phase commit for distributed transactions','Debug distributed race conditions and deadlocks','Evaluate consistency vs availability trade-offs (CAP)'],skills:s(['skill_distributed_sys','skill_system_design']),tags:['distributed-systems','raft','consensus','mit','graduate'],typicalYear:5,isCore:true},
  {id:'course_cs_mit_sec',name:'Computer Systems Security',shortName:'6.858',disciplineId:'disc_cs',level:'graduate',degreeLevel:'master',credits:{us:4,ects:7.5,uk:20,china:4},description:'Security architecture and engineering: threat modeling, privilege separation, capability systems, information flow control, sandboxing, and web security. Includes hands-on security lab projects. Modeled after MIT 6.858.',learningOutcomes:['Conduct systematic threat modeling using STRIDE and attack trees','Design privilege-separated system architectures','Implement information flow control mechanisms','Analyze web application vulnerabilities (XSS, CSRF, SQLi)','Build secure sandbox environments'],skills:s(['skill_cyber','skill_system_design']),tags:['security','mit','threat-modeling','graduate'],typicalYear:5,isCore:false},

  // ── Harvard/Stanford CS ──
  {id:'course_cs_harv_cs50',name:'Introduction to Computer Science',shortName:'CS50',disciplineId:'disc_cs',level:'foundation',degreeLevel:'bachelor',credits:{us:4,ects:7.5,uk:20,china:4},description:'Harvard\'s legendary introduction to the intellectual enterprises of computer science and the art of programming. Covers C, Python, SQL, HTML/CSS/JavaScript, algorithms, data structures, and computational thinking. Modeled after Harvard CS50.',learningOutcomes:['Write programs in C, Python, and JavaScript','Design and query SQL databases','Implement fundamental algorithms and data structures','Build full-stack web applications','Think algorithmically and solve problems efficiently'],skills:s(['skill_python','skill_sql','skill_algorithms']),tags:['cs50','harvard','intro','programming','c'],typicalYear:1,isCore:true},
  {id:'course_cs_harv_ml',name:'Machine Learning',shortName:'CS181',disciplineId:'disc_ai',crossDisciplineIds:['disc_cs','disc_ds'],level:'advanced',degreeLevel:'bachelor',credits:{us:4,ects:7.5,uk:20,china:4},description:'A comprehensive introduction to machine learning: supervised and unsupervised learning, Bayesian methods, kernel methods, neural networks, and reinforcement learning. Modeled after Harvard CS181.',learningOutcomes:['Derive and implement Bayesian and frequentist ML algorithms','Apply kernel methods including SVMs and Gaussian processes','Design and train deep neural networks for classification and regression','Evaluate bias-variance trade-offs in model selection','Implement reinforcement learning algorithms'],skills:s(['skill_ml','skill_python','skill_deep_learning']),tags:['machine-learning','harvard','bayesian','kernels'],typicalYear:3,isCore:true},
  {id:'course_cs_stan_ai',name:'Artificial Intelligence: Principles & Techniques',shortName:'CS221',disciplineId:'disc_ai',crossDisciplineIds:['disc_cs'],level:'graduate',degreeLevel:'master',credits:{us:3,ects:6,uk:15,china:3},description:'Survey of modern AI: search, Markov decision processes, game playing, constraint satisfaction, Bayesian networks, and logic. Emphasis on practical implementation. Modeled after Stanford CS221.',learningOutcomes:['Implement A* search and adversarial search algorithms','Model sequential decision problems as MDPs','Design Bayesian networks for probabilistic reasoning','Apply constraint satisfaction for scheduling and planning','Build game-playing agents using minimax and Monte Carlo tree search'],skills:s(['skill_python','skill_ml']),tags:['ai','stanford','search','mdp','bayesian'],typicalYear:5,isCore:true},
  {id:'course_cs_stan_nlp',name:'Natural Language Processing with Deep Learning',shortName:'CS224N',disciplineId:'disc_ai',crossDisciplineIds:['disc_cs'],level:'graduate',degreeLevel:'master',credits:{us:3,ects:6,uk:15,china:3},description:'Cutting-edge NLP with deep learning: word vectors, RNNs, LSTMs, attention, Transformers, BERT, GPT architectures, and large language models. Modeled after Stanford CS224N.',learningOutcomes:['Implement word2vec and GloVe embeddings','Design sequence-to-sequence models with attention','Build and fine-tune Transformer architectures','Pre-train and adapt large language models','Evaluate NLP systems on benchmarks (GLUE, SuperGLUE)'],skills:s(['skill_nlp','skill_deep_learning','skill_python']),tags:['nlp','transformers','stanford','llm','attention'],typicalYear:5,isCore:false},
  {id:'course_cs_stan_rl',name:'Reinforcement Learning',shortName:'CS234',disciplineId:'disc_ai',crossDisciplineIds:['disc_cs'],level:'graduate',degreeLevel:'master',credits:{us:3,ects:6,uk:15,china:3},description:'Theoretical and practical reinforcement learning: MDPs, value iteration, policy gradients, Q-learning, deep RL, exploration, and applications to robotics and games. Modeled after Stanford CS234.',learningOutcomes:['Implement value iteration and policy iteration algorithms','Apply deep Q-networks (DQN) to complex environments','Design policy gradient methods (REINFORCE, PPO)','Balance exploration vs exploitation in online learning','Evaluate RL agents in simulated environments (Gym)'],skills:s(['skill_ml','skill_deep_learning','skill_python']),tags:['reinforcement-learning','stanford','deep-rl','mdp'],typicalYear:5,isCore:false},

  // ── Data Science ──
  {id:'course_ds_harv_data',name:'Introduction to Data Science',shortName:'DS101',disciplineId:'disc_ds',level:'foundation',degreeLevel:'bachelor',credits:{us:4,ects:7.5,uk:20,china:4},description:'The data science lifecycle: data wrangling, exploratory analysis, statistical modeling, machine learning, and communication of results. Heavy use of R and Python. Modeled after Harvard Data Science course.',learningOutcomes:['Wrangle messy real-world datasets into analysis-ready form','Perform exploratory data analysis with ggplot2 and matplotlib','Fit and interpret regression and classification models','Communicate data insights through visualizations and reports','Apply the full data science workflow to a capstone project'],skills:s(['skill_python','skill_sql','skill_stats']),tags:['data-science','harvard','r','eda','modeling'],typicalYear:1,isCore:true},
  {id:'course_ds_stan_stats',name:'Statistical Learning',shortName:'STATS216',disciplineId:'disc_ds',crossDisciplineIds:['disc_ai'],level:'graduate',degreeLevel:'master',credits:{us:3,ects:6,uk:15,china:3},description:'Modern statistical learning methods: regularization, splines, GAMs, trees, random forests, boosting, SVMs, and deep learning. Emphasis on statistical foundations. Modeled after Stanford Stats 216 / ISLR.',learningOutcomes:['Apply ridge regression and LASSO for high-dimensional data','Build tree-based ensembles (random forest, gradient boosting)','Analyze the bias-variance trade-off in model selection','Implement cross-validation and bootstrap for model assessment','Interpret black-box models using SHAP and LIME'],skills:s(['skill_stats','skill_ml','skill_python']),tags:['statistical-learning','stanford','regularization','ensemble'],typicalYear:5,isCore:false},

  // ── Psychology ──
  {id:'course_psych_harv_intro',name:'Introduction to Psychology',shortName:'PSYCH1',disciplineId:'disc_psych',level:'foundation',degreeLevel:'bachelor',credits:{us:3,ects:6,uk:15,china:3},description:'A comprehensive survey of psychological science: brain and behavior, sensation and perception, learning and memory, cognition, development, social psychology, personality, and psychopathology. Modeled after Harvard\'s introductory psychology course.',learningOutcomes:['Describe major theoretical perspectives in psychology','Explain the neural basis of behavior and cognition','Evaluate research methods and experimental designs','Apply psychological principles to everyday situations','Critically analyze claims about human behavior using evidence'],skills:s(['skill_critical_thinking','skill_research']),tags:['psychology','harvard','intro','mind','behavior'],typicalYear:1,isCore:true},
  {id:'course_psych_stan_social',name:'Social Psychology',shortName:'PSYCH215',disciplineId:'disc_psych',level:'intermediate',degreeLevel:'bachelor',credits:{us:3,ects:6,uk:15,china:3},description:'How social situations shape human behavior: conformity, obedience, persuasion, group dynamics, prejudice, attraction, and altruism. Classic experiments and modern replications. Modeled after Stanford social psychology.',learningOutcomes:['Analyze classic social psychology experiments (Milgram, Asch, Zimbardo)','Apply attribution theory to explain social judgments','Design experiments to test social influence hypotheses','Evaluate the replication crisis and open science practices','Develop interventions to reduce prejudice and discrimination'],skills:s(['skill_critical_thinking','skill_research']),tags:['social-psychology','stanford','conformity','prejudice'],typicalYear:2,isCore:true},
  {id:'course_psych_mit_cog',name:'Cognitive Science',shortName:'9.012',disciplineId:'disc_psych',level:'advanced',degreeLevel:'bachelor',credits:{us:4,ects:7.5,uk:20,china:4},description:'The interdisciplinary study of mind and intelligence: perception, attention, memory, language, reasoning, decision-making, and consciousness. Integrates psychology, neuroscience, computer science, and philosophy. Modeled after MIT 9.012.',learningOutcomes:['Model cognitive processes using computational frameworks','Analyze perceptual illusions to understand sensory processing','Compare theories of memory encoding, storage, and retrieval','Evaluate the modularity of mind hypothesis','Apply Bayesian models to understand human reasoning'],skills:s(['skill_critical_thinking','skill_research']),tags:['cognitive-science','mit','perception','memory','consciousness'],typicalYear:3,isCore:false},

  // ── Economics ──
  {id:'course_econ_mit_micro',name:'Microeconomic Theory & Public Policy',shortName:'14.121',disciplineId:'disc_econ',level:'graduate',degreeLevel:'master',credits:{us:4,ects:7.5,uk:20,china:4},description:'Advanced microeconomic theory: consumer and producer theory, general equilibrium, welfare economics, market failures, game theory, and mechanism design. Applications to public policy. Modeled after MIT 14.121.',learningOutcomes:['Derive demand functions from utility maximization','Analyze general equilibrium in competitive markets','Design mechanisms for efficient resource allocation','Apply game theory to strategic interactions and auctions','Evaluate public policies using welfare economics frameworks'],skills:s(['skill_econ_analysis']),tags:['microeconomics','mit','game-theory','welfare','mechanism-design'],typicalYear:5,isCore:true},
  {id:'course_econ_harv_behavioral',name:'Behavioral Economics',shortName:'ECON2070',disciplineId:'disc_econ',crossDisciplineIds:['disc_psych'],level:'advanced',degreeLevel:'bachelor',credits:{us:3,ects:6,uk:15,china:3},description:'How psychological factors influence economic decision-making: heuristics, biases, framing, prospect theory, nudging, and time inconsistency. Policy applications. Modeled after Harvard\'s behavioral economics course.',learningOutcomes:['Identify cognitive biases (anchoring, availability, representativeness)','Apply prospect theory to decisions under risk','Design nudges and choice architecture for policy','Analyze intertemporal choice and self-control problems','Evaluate the ethics of behavioral interventions'],skills:s(['skill_critical_thinking','skill_econ_analysis']),tags:['behavioral-economics','harvard','nudge','biases','prospect-theory'],typicalYear:3,isCore:false},
  {id:'course_econ_stan_econometrics',name:'Econometrics: Causal Inference',shortName:'ECON270',disciplineId:'disc_econ',level:'graduate',degreeLevel:'master',credits:{us:4,ects:7.5,uk:20,china:4},description:'Modern causal inference methods: randomized experiments, matching, difference-in-differences, instrumental variables, regression discontinuity, and synthetic control. Heavy use of R and Stata. Modeled after Stanford econometrics.',learningOutcomes:['Design and analyze randomized controlled experiments','Apply difference-in-differences for policy evaluation','Implement instrumental variables for endogenous regressors','Use regression discontinuity for quasi-experimental designs','Critique causal claims in published economic research'],skills:s(['skill_stats','skill_econ_analysis']),tags:['econometrics','stanford','causal-inference','rcts','policy'],typicalYear:5,isCore:true},

  // ── Business ──
  {id:'course_bus_harv_neg',name:'Negotiation & Deal-Making',shortName:'HBS2001',disciplineId:'disc_mgmt',level:'graduate',degreeLevel:'master',credits:{us:3,ects:6,uk:15,china:3},description:'The art and science of negotiation: distributive and integrative bargaining, BATNA analysis, coalition dynamics, cross-cultural negotiation, and deal design. Case-method teaching. Modeled after Harvard Business School\'s legendary negotiation course.',learningOutcomes:['Prepare and execute multi-issue negotiation strategies','Analyze BATNA and reservation points systematically','Build and sustain coalitions in multi-party negotiations','Navigate cross-cultural negotiation differences','Structure complex deal terms for mutual gain'],skills:s(['skill_negotiation','skill_communication']),tags:['negotiation','harvard','deal-making','batna','hbs'],typicalYear:5,isCore:false},
  {id:'course_bus_stan_entrep',name:'Entrepreneurship & Venture Creation',shortName:'GSB301',disciplineId:'disc_bus',level:'advanced',degreeLevel:'bachelor',credits:{us:3,ects:6,uk:15,china:3},description:'From idea to venture: opportunity recognition, customer discovery, lean startup methodology, business model design, fundraising, and scaling. Students develop and pitch their own venture. Modeled after Stanford GSB entrepreneurship course.',learningOutcomes:['Identify and validate entrepreneurial opportunities','Conduct customer discovery interviews (minimum 20)','Design and iterate business models using Lean Canvas','Build and present compelling pitch decks to investors','Navigate venture capital term sheets and cap tables'],skills:s(['skill_entrepreneurship']),tags:['entrepreneurship','stanford','lean-startup','venture-capital','pitch'],typicalYear:4,isCore:false}
];

let added = 0;
for (const nc of newCourses) {
  if (!existingCourseIds.has(nc.id)) {
    courses.courses.push(nc);
    existingCourseIds.add(nc.id);
    added++;
  }
}
courses.courseCount = courses.courses.length;
console.log('Added '+added+' new courses. Total: '+courses.courses.length);

// ═══ ADD PREREQUISITES ═══
const newPrereqs = [
  // MIT CS prereqs
  {courseId:'course_cs_mit_algo',prerequisiteId:'course_cs_dsa',strength:'strict',reason:'Advanced algorithms requires mastery of fundamental data structures and algorithm analysis'},
  {courseId:'course_cs_mit_sys',prerequisiteId:'course_cs_os',strength:'strict',reason:'System engineering builds on operating system concepts'},
  {courseId:'course_cs_mit_sys',prerequisiteId:'course_cs_networks',strength:'recommended',reason:'Network protocols are key case studies in system design'},
  {courseId:'course_cs_mit_dist',prerequisiteId:'course_mcs_dist_sys',strength:'recommended',reason:'MIT 6.824 extends distributed systems theory with hands-on implementation'},
  {courseId:'course_cs_mit_dist',prerequisiteId:'course_cs_os',strength:'strict',reason:'Distributed systems require OS-level concurrency understanding'},
  {courseId:'course_cs_mit_sec',prerequisiteId:'course_cs_os',strength:'strict',reason:'System security builds on OS architecture'},
  {courseId:'course_cs_mit_sec',prerequisiteId:'course_cs_networks',strength:'strict',reason:'Network security requires protocol understanding'},
  // Harvard CS
  {courseId:'course_cs_harv_ml',prerequisiteId:'course_math_linalg',strength:'strict',reason:'ML algorithms use linear algebra extensively',crossDiscipline:true},
  {courseId:'course_cs_harv_ml',prerequisiteId:'course_math_stats',strength:'strict',reason:'Statistical foundations are essential for ML',crossDiscipline:true},
  // Stanford CS
  {courseId:'course_cs_stan_ai',prerequisiteId:'course_ai_ml',strength:'strict',reason:'Stanford CS221 assumes prior ML knowledge'},
  {courseId:'course_cs_stan_nlp',prerequisiteId:'course_ai_dl',strength:'strict',reason:'CS224N requires deep learning foundations'},
  {courseId:'course_cs_stan_nlp',prerequisiteId:'course_ai_ml',strength:'recommended',reason:'ML fundamentals support NLP understanding'},
  {courseId:'course_cs_stan_rl',prerequisiteId:'course_ai_ml',strength:'strict',reason:'RL builds on supervised and unsupervised ML paradigms'},
  {courseId:'course_cs_stan_rl',prerequisiteId:'course_math_stats',strength:'recommended',reason:'Probability theory underlies MDP formalization',crossDiscipline:true},
  // Data Science
  {courseId:'course_ds_stan_stats',prerequisiteId:'course_math_stats',strength:'strict',reason:'Statistical learning extends probability and statistics',crossDiscipline:true},
  {courseId:'course_ds_stan_stats',prerequisiteId:'course_ds_intro',strength:'recommended',reason:'Data wrangling experience aids statistical modeling'},
  // Psychology
  {courseId:'course_psych_stan_social',prerequisiteId:'course_psych_harv_intro',strength:'recommended',reason:'Social psych extends introductory psychological science'},
  {courseId:'course_psych_mit_cog',prerequisiteId:'course_psych_harv_intro',strength:'recommended',reason:'Cognitive science requires basic psychology understanding'},
  // Economics
  {courseId:'course_econ_mit_micro',prerequisiteId:'course_bus_micro',strength:'strict',reason:'Graduate micro requires undergraduate micro foundations',crossDiscipline:true},
  {courseId:'course_econ_mit_micro',prerequisiteId:'course_math_calc2',strength:'strict',reason:'Advanced micro uses multivariable calculus',crossDiscipline:true},
  {courseId:'course_econ_harv_behavioral',prerequisiteId:'course_bus_micro',strength:'strict',reason:'Behavioral econ critiques and extends standard microeconomics',crossDiscipline:true},
  {courseId:'course_econ_stan_econometrics',prerequisiteId:'course_math_stats',strength:'strict',reason:'Econometrics requires probability and statistics',crossDiscipline:true},
  {courseId:'course_econ_stan_econometrics',prerequisiteId:'course_bus_micro',strength:'recommended',reason:'Economic intuition aids causal model specification',crossDiscipline:true},
  // Business
  {courseId:'course_bus_harv_neg',prerequisiteId:'course_bus_negotiation',strength:'recommended',reason:'HBS negotiation builds on foundational bargaining skills'},
  {courseId:'course_bus_stan_entrep',prerequisiteId:'course_bus_entrep',strength:'recommended',reason:'Stanford GSB extends entrepreneurial foundations'},
];

let addedPrereqs = 0;
for (const np of newPrereqs) {
  if (existingCourseIds.has(np.courseId) && existingCourseIds.has(np.prerequisiteId)) {
    // Check for duplicates
    const dup = prereqs.prerequisites.find(p => p.courseId === np.courseId && p.prerequisiteId === np.prerequisiteId);
    if (!dup) {
      prereqs.prerequisites.push(np);
      addedPrereqs++;
    }
  }
}
prereqs.edgeCount = prereqs.prerequisites.length;
console.log('Added '+addedPrereqs+' new prerequisites. Total: '+prereqs.prerequisites.length);

// ═══ WRITE FILES ═══
fs.writeFileSync(path+'disciplines.json', JSON.stringify(disc, null, 2));
fs.writeFileSync(path+'courses.json', JSON.stringify(courses, null, 2));
fs.writeFileSync(path+'prerequisites.json', JSON.stringify(prereqs, null, 2));

console.log('\n✓ All files written');
console.log('✓ Validating...');

// Validate
const courses2 = JSON.parse(fs.readFileSync(path+'courses.json','utf8'));
const prereqs2 = JSON.parse(fs.readFileSync(path+'prerequisites.json','utf8'));
const ids = new Set(courses2.courses.map(c=>c.id));
let bad = 0;
prereqs2.prerequisites.forEach(p => {
  if (!ids.has(p.courseId)) { bad++; console.log('  BAD courseId: '+p.courseId); }
  if (!ids.has(p.prerequisiteId)) { bad++; console.log('  BAD prereqId: '+p.prerequisiteId); }
});
console.log('  Bad edges: '+bad);

const disciplines2 = JSON.parse(fs.readFileSync(path+'disciplines.json','utf8'));
console.log('  Total disciplines: '+disciplines2.disciplines.length);
console.log('  Total courses: '+courses2.courses.length);
console.log('  Total prerequisites: '+prereqs2.prerequisites.length);
console.log('  Discipline distribution:');
const dist = {};
courses2.courses.forEach(c => { dist[c.disciplineId] = (dist[c.disciplineId]||0)+1; });
for (const [k,v] of Object.entries(dist).sort((a,b)=>b[1]-a[1])) {
  console.log('    '+k+': '+v);
}
