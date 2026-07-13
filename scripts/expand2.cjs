const fs=require('fs');
const path='C:/Users/Administrator/.kun/default_workspace/polymath/data/';

const courses=JSON.parse(fs.readFileSync(path+'courses.json','utf8'));
const eids=new Set(courses.courses.map(c=>c.id));

const nc=[
  {id:'course_cs_mit_dist',name:'Distributed Systems',shortName:'6.824',disciplineId:'disc_cs',level:'graduate',degreeLevel:'master',credits:{us:4,ects:7.5},description:'MIT 6.824: Fault tolerance, replication, consistency, Raft consensus, MapReduce, and distributed transactions.',learningOutcomes:['Design fault-tolerant distributed protocols','Implement Raft consensus algorithm','Build MapReduce systems','Analyze consistency vs availability tradeoffs'],skills:['skill_python'],tags:['distributed','consensus','mit'],typicalYear:5,isCore:true},
  {id:'course_cs_mit_sec',name:'Computer Systems Security',shortName:'6.858',disciplineId:'disc_cs',crossDisciplineIds:['disc_se'],level:'graduate',degreeLevel:'master',credits:{us:4,ects:7.5},description:'MIT 6.858: Threat models, buffer overflows, sandboxing, web security, network attacks, and security architecture.',learningOutcomes:['Identify vulnerability classes','Implement privilege separation','Design secure web apps','Strengthen sandboxing'],skills:['skill_cyber'],tags:['security','systems','mit'],typicalYear:5,isCore:false},
  {id:'course_cs_mit_theory',name:'Automata, Computability & Complexity',shortName:'6.045',disciplineId:'disc_cs',level:'advanced',degreeLevel:'bachelor',credits:{us:4,ects:7.5},description:'MIT 6.045: Turing machines, decidability, P vs NP, polynomial-time reductions, limits of computation.',learningOutcomes:['Prove undecidability via reduction','Classify P, NP, PSPACE problems','Construct polynomial-time reductions','Explain Cook-Levin theorem'],skills:['skill_algorithms'],tags:['theory','complexity','mit'],typicalYear:3,isCore:true},
  {id:'course_cs_stan_ai',name:'AI: Principles & Techniques',shortName:'CS221',disciplineId:'disc_ai',level:'graduate',degreeLevel:'master',credits:{us:4,ects:7.5},description:'Stanford CS221: Search, MDPs, game playing, constraint satisfaction, Bayesian networks, logic.',learningOutcomes:['Implement A* and MDP solvers','Model with Bayesian networks','Apply constraint satisfaction','Design game-playing agents'],skills:['skill_python','skill_ml'],tags:['ai','search','stanford'],typicalYear:5,isCore:true},
  {id:'course_cs_stan_rl',name:'Reinforcement Learning',shortName:'CS234',disciplineId:'disc_ai',level:'graduate',degreeLevel:'master',credits:{us:3,ects:6},description:'Stanford CS234: MDPs, dynamic programming, Monte Carlo, TD learning, policy gradients, deep RL.',learningOutcomes:['Implement Q-learning and policy gradients','Apply deep RL to control','Design exploration strategies','Analyze sample efficiency'],skills:['skill_python','skill_ml','skill_deep_learning'],tags:['reinforcement-learning','stanford'],typicalYear:5,isCore:false},
  {id:'course_cs_stan_dm',name:'Mining Massive Datasets',shortName:'CS246',disciplineId:'disc_ds',crossDisciplineIds:['disc_cs'],level:'graduate',degreeLevel:'master',credits:{us:3,ects:6},description:'Stanford CS246: MapReduce, PageRank, recommender systems, social network analysis, streaming algorithms.',learningOutcomes:['Implement MapReduce algorithms','Build recommendation systems','Analyze social network graphs','Apply streaming algorithms'],skills:['skill_sql','skill_python'],tags:['big-data','recommendations','stanford'],typicalYear:5,isCore:false},
  {id:'course_cs_harv_ml',name:'Machine Learning',shortName:'CS181',disciplineId:'disc_ai',crossDisciplineIds:['disc_ds','disc_math'],level:'advanced',degreeLevel:'bachelor',credits:{us:4,ects:7.5},description:'Harvard CS181: Bayesian methods, kernels, neural networks, graphical models, reinforcement learning.',learningOutcomes:['Derive Bayesian inference algorithms','Implement kernel SVMs','Design neural architectures','Apply graphical models'],skills:['skill_python','skill_ml','skill_deep_learning'],tags:['machine-learning','bayesian','harvard'],typicalYear:3,isCore:false},
  {id:'course_psych_stan_neuro',name:'Introduction to Neuroscience',shortName:'PSYCH204',disciplineId:'disc_psych',level:'intermediate',degreeLevel:'bachelor',credits:{us:4,ects:7.5},description:'Stanford: Neural signaling, sensory systems, motor control, learning and memory, brain development.',learningOutcomes:['Explain action potential mechanisms','Map sensory brain pathways','Analyze synaptic learning','Design fMRI paradigms'],skills:['skill_critical_thinking'],tags:['neuroscience','brain','stanford'],typicalYear:2,isCore:false},
  {id:'course_psych_ox_perception',name:'Human Perception',shortName:'PERC',disciplineId:'disc_psych',level:'intermediate',degreeLevel:'bachelor',credits:{us:3,ects:7.5,uk:15},description:'Oxford: Vision, audition, touch, taste, multisensory integration. Psychophysics, signal detection theory.',learningOutcomes:['Apply signal detection theory','Design psychophysical experiments','Model perceptual decision-making','Analyze multisensory integration'],skills:['skill_critical_thinking','skill_statistics'],tags:['perception','psychophysics','oxford'],typicalYear:2,isCore:false},
  {id:'course_econ_stan_game',name:'Game Theory & Economic Applications',shortName:'ECON280',disciplineId:'disc_econ',level:'advanced',degreeLevel:'bachelor',credits:{us:4,ects:7.5},description:'Stanford ECON 280: Nash equilibrium, subgame perfection, Bayesian games, mechanism design, auctions, evolutionary game theory.',learningOutcomes:['Compute Nash equilibria','Design incentive-compatible mechanisms','Analyze auction strategies','Apply evolutionary stability'],skills:['skill_econ_analysis','skill_analytical'],tags:['game-theory','mechanism-design','stanford'],typicalYear:3,isCore:false},
  {id:'course_econ_ox_labor',name:'Labour Economics',shortName:'LAB',disciplineId:'disc_econ',level:'advanced',degreeLevel:'bachelor',credits:{us:3,ects:7.5,uk:15},description:'Oxford: Wage determination, human capital, discrimination, migration, unions, labor market policy.',learningOutcomes:['Analyze education returns via Mincer','Evaluate minimum wage effects','Model migration decisions','Assess labor market discrimination'],skills:['skill_econ_analysis','skill_statistics'],tags:['labor','wages','oxford'],typicalYear:3,isCore:false},
  {id:'course_bus_stan_design',name:'Design Thinking & Innovation',shortName:'DSGN',disciplineId:'disc_mgmt',level:'advanced',degreeLevel:'master',credits:{us:3,ects:6},description:'Stanford d.school: Human-centered design — empathy, ideation, prototyping, testing, iteration. Applied to real-world challenges.',learningOutcomes:['Conduct empathy interviews','Facilitate ideation sessions','Build and test rapid prototypes','Apply design thinking to strategy'],skills:['skill_innovation','skill_leadership'],tags:['design-thinking','innovation','stanford'],typicalYear:5,isCore:false},
  {id:'course_bus_harv_gov',name:'Corporate Governance & Boards',shortName:'GOV',disciplineId:'disc_mgmt',level:'graduate',degreeLevel:'master',credits:{us:3,ects:6},description:'HBS: Board structure, director duties, shareholder activism, executive compensation, governance across legal systems.',learningOutcomes:['Evaluate board composition','Design executive compensation','Analyze shareholder activism','Compare governance jurisdictions'],skills:['skill_strategy','skill_leadership'],tags:['governance','board','hbs'],typicalYear:5,isCore:false},
  {id:'course_ds_mit_causal',name:'Causal Inference',shortName:'CI',disciplineId:'disc_ds',crossDisciplineIds:['disc_econ','disc_math'],level:'graduate',degreeLevel:'master',credits:{us:4,ects:7.5},description:'MIT: Potential outcomes, DAGs, instrumental variables, difference-in-differences, RDD, and modern causal ML methods.',learningOutcomes:['Apply potential outcomes framework','Design instrumental variable studies','Implement difference-in-differences','Use causal graphical models'],skills:['skill_statistics','skill_python'],tags:['causality','econometrics','mit'],typicalYear:5,isCore:false},
];

let added=0;
nc.forEach(x=>{if(!eids.has(x.id)){courses.courses.push(x);eids.add(x.id);added++}});
courses.courseCount=courses.courses.length;
fs.writeFileSync(path+'courses.json',JSON.stringify(courses,null,2));

const prereqs=JSON.parse(fs.readFileSync(path+'prerequisites.json','utf8'));
const pe=new Set();
prereqs.prerequisites.forEach(p=>pe.add(p.courseId+'|'+p.prerequisiteId));
const np=[
  {courseId:'course_cs_mit_theory',prerequisiteId:'course_cs_discrete',strength:'strict',reason:'Theory builds on discrete math',crossDiscipline:true},
  {courseId:'course_cs_mit_theory',prerequisiteId:'course_cs_oop',strength:'recommended',reason:'Programming maturity for proofs'},
  {courseId:'course_cs_stan_ai',prerequisiteId:'course_ai_ml',strength:'strict',reason:'AI principles assume ML'},
  {courseId:'course_cs_stan_rl',prerequisiteId:'course_ai_ml',strength:'strict',reason:'RL extends classical ML'},
  {courseId:'course_cs_stan_dm',prerequisiteId:'course_cs_db',strength:'strict',reason:'Big data builds on databases'},
  {courseId:'course_cs_harv_ml',prerequisiteId:'course_math_linalg',strength:'strict',reason:'ML uses linear algebra',crossDiscipline:true},
  {courseId:'course_cs_harv_ml',prerequisiteId:'course_math_stats',strength:'strict',reason:'ML uses probability',crossDiscipline:true},
  {courseId:'course_cs_mit_dist',prerequisiteId:'course_cs_os',strength:'strict',reason:'Distributed systems extend OS'},
  {courseId:'course_cs_mit_sec',prerequisiteId:'course_cs_networks',strength:'strict',reason:'Security needs network knowledge'},
  {courseId:'course_econ_stan_game',prerequisiteId:'course_bus_micro',strength:'recommended',reason:'Game theory extends micro',crossDiscipline:true},
  {courseId:'course_psych_stan_neuro',prerequisiteId:'course_psych_harv_intro',strength:'recommended',reason:'Neuro builds on psych'},
  {courseId:'course_psych_ox_perception',prerequisiteId:'course_psych_harv_intro',strength:'recommended',reason:'Perception needs psych foundation'},
  {courseId:'course_bus_stan_design',prerequisiteId:'course_bus_mgmt',strength:'recommended',reason:'Design thinking in org context'},
  {courseId:'course_ds_mit_causal',prerequisiteId:'course_math_stats',strength:'strict',reason:'Causal inference is statistical',crossDiscipline:true},
];

let padd=0;
np.forEach(x=>{const k=x.courseId+'|'+x.prerequisiteId;if(!pe.has(k)&&eids.has(x.courseId)&&eids.has(x.prerequisiteId)){prereqs.prerequisites.push(x);pe.add(k);padd++}});
prereqs.edgeCount=prereqs.prerequisites.length;
fs.writeFileSync(path+'prerequisites.json',JSON.stringify(prereqs,null,2));

const manifest=JSON.parse(fs.readFileSync(path+'manifest.json','utf8'));
manifest.counts.courses=courses.courses.length;
manifest.counts.prerequisites=prereqs.prerequisites.length;
manifest.generatedAt=new Date().toISOString();
fs.writeFileSync(path+'manifest.json',JSON.stringify(manifest,null,2));

// Verify
const vCourses=JSON.parse(fs.readFileSync(path+'courses.json','utf8'));
const vPrereqs=JSON.parse(fs.readFileSync(path+'prerequisites.json','utf8'));
const ids=new Set(vCourses.courses.map(c=>c.id));
let bad=0;
vPrereqs.prerequisites.forEach(p=>{if(!ids.has(p.courseId)){bad++;console.log('BAD course:',p.courseId)}if(!ids.has(p.prerequisiteId)){bad++;console.log('BAD prereq:',p.prerequisiteId)}});

console.log('Added',added,'courses. Total:',vCourses.courses.length);
console.log('Added',padd,'prereqs. Total:',vPrereqs.prerequisites.length);
console.log('Bad edges:',bad);
console.log('Discs:',[...new Set(vCourses.courses.map(c=>c.disciplineId))].join(', '));
