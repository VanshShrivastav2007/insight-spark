/**
 * HackSort AI — demo data layer.
 *
 * Everything here is deterministic mock data that mimics the output of the
 * future AI pipeline (parse -> LLM analysis -> embeddings -> clustering ->
 * signals). Swap these functions for real API calls later; the UI only reads
 * the exported types below.
 */

export type Category =
  | "Agriculture"
  | "Healthcare"
  | "Education"
  | "Climate"
  | "FinTech"
  | "Accessibility"
  | "Smart City"
  | "Other";

export type Priority = "High Priority" | "Review" | "Standard";
export type Saturation = "Highly Saturated" | "Medium" | "Underexplored";

export interface SimilarLink {
  id: string;
  team: string;
  project: string;
  similarity: number;
  commonProblem: string;
  commonApproach: string;
  keyDifference: string;
}

export interface Submission {
  id: string;
  team: string;
  project: string;
  category: Category;
  problemArea: string;
  college: string;
  problem: string;
  targetUser: string;
  solution: string;
  technology: string;
  impact: string;
  prototype: "Working prototype" | "Partial prototype" | "Concept only";
  demoUrl: string;
  githubUrl: string;
  videoUrl: string;
  submittedAt: string;
  reviewed: boolean;
  scores: {
    problemRelevance: number;
    innovationSignal: number;
    solutionDifferentiation: number;
    technicalDifferentiation: number;
    impact: number;
    feasibility: number;
    similarity: number;
    presentationQuality: number;
    clarity: number;
    structure: number;
    visualQuality: number;
  };
  priority: Priority;
  hiddenGem: boolean;
  aiSummary: string;
  recommendation: string;
  whyHighlighted: string[];
  strengths: string[];
  concerns: string[];
  similar: SimilarLink[];
  humanScores?: { judge: string; total: number }[] | undefined;
}

/* ------------------------------------------------------------------ */
/* deterministic pseudo random                                         */
/* ------------------------------------------------------------------ */
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260817);
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)]!;
const between = (min: number, max: number) => Math.round(min + rand() * (max - min));

/* ------------------------------------------------------------------ */
/* landscape definition                                                */
/* ------------------------------------------------------------------ */

export interface ProblemArea {
  category: Category;
  area: string;
  count: number;
  saturation: Saturation;
  problem: string;
  approach: string;
  targetUser: string;
  tech: string[];
  impact: string;
}

export const PROBLEM_AREAS: ProblemArea[] = [
  // Agriculture — 120
  {
    category: "Agriculture",
    area: "Crop Disease",
    count: 31,
    saturation: "Highly Saturated",
    problem:
      "Smallholder farmers detect crop disease too late, losing a large share of yield before treatment begins.",
    approach: "Leaf-image classification with a CNN model served through a mobile app.",
    targetUser: "Smallholder farmers with 1-5 acre plots",
    tech: ["TensorFlow Lite", "React Native", "FastAPI", "Firebase"],
    impact: "Earlier detection can reduce avoidable crop loss during a single growing season.",
  },
  {
    category: "Agriculture",
    area: "Irrigation",
    count: 24,
    saturation: "Highly Saturated",
    problem:
      "Water is over-applied to fields because irrigation schedules are based on habit rather than soil moisture.",
    approach: "IoT soil-moisture sensors feeding a scheduling dashboard.",
    targetUser: "Farm cooperatives and irrigation managers",
    tech: ["ESP32", "MQTT", "Node.js", "Grafana"],
    impact: "Reduced water usage per acre with maintained yield.",
  },
  {
    category: "Agriculture",
    area: "Farmer Marketplace",
    count: 18,
    saturation: "Medium",
    problem:
      "Farmers sell through intermediaries and capture only a fraction of the final market price.",
    approach: "Direct-to-buyer marketplace with transparent price discovery.",
    targetUser: "Farmer producer organisations and local buyers",
    tech: ["Next.js", "Postgres", "Razorpay", "Twilio"],
    impact: "Higher realised price per quintal for participating farmers.",
  },
  {
    category: "Agriculture",
    area: "Yield Prediction",
    count: 20,
    saturation: "Highly Saturated",
    problem: "Farmers cannot plan storage or credit because expected yield is unknown until harvest.",
    approach: "Satellite NDVI time series combined with a gradient-boosted regressor.",
    targetUser: "Agronomists and district planners",
    tech: ["Sentinel-2", "XGBoost", "Python", "Mapbox"],
    impact: "Earlier planning of storage, credit and logistics.",
  },
  {
    category: "Agriculture",
    area: "Soil Health",
    count: 16,
    saturation: "Medium",
    problem: "Soil testing is slow and rarely reaches farmers in time for the next sowing decision.",
    approach: "Low-cost spectrometry plus a recommendation engine for fertiliser mix.",
    targetUser: "Village-level soil testing centres",
    tech: ["Arduino", "scikit-learn", "Flutter"],
    impact: "Fertiliser recommendations tuned to the actual plot instead of a district average.",
  },
  {
    category: "Agriculture",
    area: "Small-Farm Cold Storage",
    count: 4,
    saturation: "Underexplored",
    problem:
      "Perishable produce spoils between harvest and market because cold storage is priced for large operators.",
    approach: "Shared micro-cold-storage booking with solar-buffered thermal control.",
    targetUser: "Small farms selling perishable produce",
    tech: ["Raspberry Pi", "Solar controller", "Supabase", "React"],
    impact: "Extended shelf life for produce that currently spoils within 48 hours.",
  },
  {
    category: "Agriculture",
    area: "Post-Flood Crop Recovery",
    count: 3,
    saturation: "Underexplored",
    problem:
      "After flooding, farmers have no structured guidance on which crops can still be salvaged and what to replant.",
    approach: "Waterlogging duration modelling plus a replanting decision assistant.",
    targetUser: "Farmers in flood-prone river basins",
    tech: ["Sentinel-1 SAR", "Weather API", "PyTorch", "React"],
    impact: "Faster recovery decisions in the two-week window after water recedes.",
  },
  {
    category: "Agriculture",
    area: "Livestock Monitoring",
    count: 4,
    saturation: "Medium",
    problem: "Illness in dairy cattle is noticed only after milk yield already drops.",
    approach: "Wearable activity and rumination tracking with anomaly alerts.",
    targetUser: "Dairy farmers",
    tech: ["BLE wearables", "Kotlin", "InfluxDB"],
    impact: "Earlier veterinary intervention for individual animals.",
  },

  // Healthcare — 95
  {
    category: "Healthcare",
    area: "Symptom Triage Chatbot",
    count: 26,
    saturation: "Highly Saturated",
    problem: "Patients cannot judge whether a symptom needs emergency care, a clinic visit, or rest.",
    approach: "LLM-based triage chatbot over a symptom knowledge base.",
    targetUser: "Urban patients with smartphone access",
    tech: ["OpenAI API", "Next.js", "Pinecone"],
    impact: "Fewer unnecessary emergency visits.",
  },
  {
    category: "Healthcare",
    area: "Medical Imaging",
    count: 21,
    saturation: "Highly Saturated",
    problem: "Radiology backlogs delay diagnosis in district hospitals.",
    approach: "CNN pre-screening of X-ray scans with a confidence-ranked worklist.",
    targetUser: "Radiologists in high-volume hospitals",
    tech: ["PyTorch", "DICOM", "FastAPI"],
    impact: "Reordered reading queues so urgent scans surface first.",
  },
  {
    category: "Healthcare",
    area: "Medication Adherence",
    count: 15,
    saturation: "Medium",
    problem: "Chronic patients miss doses and clinicians only learn at the next appointment.",
    approach: "Smart pill dispenser with caregiver notifications.",
    targetUser: "Chronic care patients and caregivers",
    tech: ["ESP32", "Twilio", "Supabase"],
    impact: "Measurable improvement in adherence tracking between visits.",
  },
  {
    category: "Healthcare",
    area: "Rural Teleconsultation",
    count: 14,
    saturation: "Medium",
    problem: "Rural patients travel hours for consultations that could be handled remotely.",
    approach: "Low-bandwidth teleconsultation with offline case queueing.",
    targetUser: "Primary health centre staff",
    tech: ["WebRTC", "Service workers", "Postgres"],
    impact: "Consultations completed without travel for routine cases.",
  },
  {
    category: "Healthcare",
    area: "Mental Health Support",
    count: 12,
    saturation: "Medium",
    problem: "Students in distress rarely reach counselling services in time.",
    approach: "Guided journaling with escalation to human counsellors.",
    targetUser: "College students",
    tech: ["React Native", "Supabase", "Sentiment models"],
    impact: "Earlier escalation of high-risk cases to trained humans.",
  },
  {
    category: "Healthcare",
    area: "Blood & Organ Logistics",
    count: 5,
    saturation: "Underexplored",
    problem: "Blood units expire in one bank while another runs short on the same day.",
    approach: "Cross-bank inventory matching with expiry-aware routing.",
    targetUser: "Blood bank coordinators",
    tech: ["Go", "Postgres", "Mapbox"],
    impact: "Fewer expired units through inter-bank transfer.",
  },
  {
    category: "Healthcare",
    area: "Elderly Home Care",
    count: 2,
    saturation: "Underexplored",
    problem: "Falls and slow deterioration in elderly people living alone go unnoticed for hours.",
    approach: "Passive ambient sensing without cameras, using door and motion patterns.",
    targetUser: "Elderly people living alone and their families",
    tech: ["Zigbee sensors", "Edge inference", "Flutter"],
    impact: "Alerting families to routine breaks rather than only to emergencies.",
  },

  // Education — 85
  {
    category: "Education",
    area: "Generic AI Study Assistant",
    count: 28,
    saturation: "Highly Saturated",
    problem: "Students struggle to get quick explanations while studying alone.",
    approach: "Chat assistant over uploaded notes.",
    targetUser: "Undergraduate students",
    tech: ["OpenAI API", "React", "Vector store"],
    impact: "Faster doubt clearing outside class hours.",
  },
  {
    category: "Education",
    area: "Automated Grading",
    count: 17,
    saturation: "Highly Saturated",
    problem: "Teachers spend hours grading short answers instead of teaching.",
    approach: "Rubric-anchored LLM grading with teacher override.",
    targetUser: "School teachers",
    tech: ["Python", "LangChain", "Postgres"],
    impact: "Reduced grading turnaround for large classes.",
  },
  {
    category: "Education",
    area: "Vernacular Learning",
    count: 13,
    saturation: "Medium",
    problem: "Quality STEM content is unavailable in regional languages.",
    approach: "Translation and localisation pipeline with community review.",
    targetUser: "Rural school students",
    tech: ["IndicTrans", "Next.js", "CDN"],
    impact: "Curriculum content usable in the student's first language.",
  },
  {
    category: "Education",
    area: "Dropout Early Warning",
    count: 9,
    saturation: "Medium",
    problem: "Schools identify at-risk students only after attendance collapses.",
    approach: "Attendance and assessment signals combined into a risk list for counsellors.",
    targetUser: "School administrators",
    tech: ["Python", "Streamlit", "Postgres"],
    impact: "Interventions weeks earlier than the current process.",
  },
  {
    category: "Education",
    area: "Skill-to-Job Mapping",
    count: 11,
    saturation: "Medium",
    problem: "Students cannot see which concrete skills local employers actually hire for.",
    approach: "Job posting mining mapped onto a course catalogue.",
    targetUser: "Placement cells",
    tech: ["Scrapy", "Embeddings", "Next.js"],
    impact: "Course choices grounded in local hiring demand.",
  },
  {
    category: "Education",
    area: "Lab Access for Low-Resource Schools",
    count: 7,
    saturation: "Underexplored",
    problem: "Schools without science labs skip practical work entirely.",
    approach: "Browser-based physics and chemistry simulations that run offline on low-end devices.",
    targetUser: "Government school science teachers",
    tech: ["WebAssembly", "Canvas", "PWA"],
    impact: "Practical sessions in schools that currently have none.",
  },

  // Climate — 70
  {
    category: "Climate",
    area: "Carbon Footprint Tracking",
    count: 22,
    saturation: "Highly Saturated",
    problem: "Individuals and small firms cannot quantify their emissions.",
    approach: "Expense-based emissions estimation dashboard.",
    targetUser: "Small businesses",
    tech: ["Next.js", "Plaid-style parsers", "Postgres"],
    impact: "Baseline emissions visibility for organisations with no reporting today.",
  },
  {
    category: "Climate",
    area: "Waste Segregation",
    count: 16,
    saturation: "Highly Saturated",
    problem: "Mixed waste makes municipal recycling economically unviable.",
    approach: "Camera-based waste classification at collection points.",
    targetUser: "Municipal waste operators",
    tech: ["YOLO", "Jetson Nano", "React"],
    impact: "Higher share of correctly segregated recyclables.",
  },
  {
    category: "Climate",
    area: "Air Quality Monitoring",
    count: 13,
    saturation: "Medium",
    problem: "Official air quality stations are too sparse to reflect neighbourhood exposure.",
    approach: "Low-cost sensor mesh with calibration against reference stations.",
    targetUser: "City residents and school administrators",
    tech: ["PM sensors", "LoRaWAN", "Mapbox"],
    impact: "Street-level exposure data where only city averages exist.",
  },
  {
    category: "Climate",
    area: "Flood Early Warning",
    count: 10,
    saturation: "Medium",
    problem: "Warnings reach riverside communities too late to move livestock and equipment.",
    approach: "River-gauge telemetry plus SMS cascade to village volunteers.",
    targetUser: "Flood-prone village committees",
    tech: ["LoRa", "Twilio", "Node.js"],
    impact: "Additional lead time before water reaches settlements.",
  },
  {
    category: "Climate",
    area: "Urban Heat Islands",
    count: 6,
    saturation: "Underexplored",
    problem: "Heat mitigation budgets are spent without knowing which streets are hottest.",
    approach: "Thermal satellite imagery combined with pedestrian routing to suggest shade corridors.",
    targetUser: "City planning departments",
    tech: ["Landsat thermal", "GeoPandas", "Deck.gl"],
    impact: "Shade investment targeted at the hottest pedestrian corridors.",
  },
  {
    category: "Climate",
    area: "Community Solar Sharing",
    count: 3,
    saturation: "Underexplored",
    problem: "Rooftop solar owners waste surplus generation that neighbours could use.",
    approach: "Peer-to-peer surplus allocation with settlement ledger.",
    targetUser: "Housing societies",
    tech: ["Smart meters", "Postgres", "React"],
    impact: "Surplus generation consumed locally instead of curtailed.",
  },

  // FinTech — 60
  {
    category: "FinTech",
    area: "Fraud Detection",
    count: 18,
    saturation: "Highly Saturated",
    problem: "UPI fraud patterns evolve faster than static rule engines.",
    approach: "Behavioural anomaly scoring on transaction streams.",
    targetUser: "Payment operations teams",
    tech: ["Kafka", "PyTorch", "Redis"],
    impact: "Faster flagging of novel fraud patterns.",
  },
  {
    category: "FinTech",
    area: "Personal Finance Assistant",
    count: 15,
    saturation: "Highly Saturated",
    problem: "Young earners have no visibility into where their money goes.",
    approach: "Statement parsing with budgeting nudges.",
    targetUser: "First-time earners",
    tech: ["React Native", "Supabase", "OCR"],
    impact: "Spending categories made visible without manual entry.",
  },
  {
    category: "FinTech",
    area: "Credit for Informal Workers",
    count: 12,
    saturation: "Medium",
    problem: "Gig and informal workers have no credit history and are priced out of formal lending.",
    approach: "Alternative-data underwriting using earning consistency signals.",
    targetUser: "Gig platform workers",
    tech: ["Python", "Postgres", "Account aggregator APIs"],
    impact: "Credit access for workers rejected by bureau-only scoring.",
  },
  {
    category: "FinTech",
    area: "Insurance Claims",
    count: 9,
    saturation: "Medium",
    problem: "Claim documentation is rejected for formatting errors that customers cannot interpret.",
    approach: "Guided claim assembly with pre-submission validation.",
    targetUser: "Retail insurance customers",
    tech: ["Next.js", "OCR", "Rules engine"],
    impact: "Fewer rejections caused by documentation errors.",
  },
  {
    category: "FinTech",
    area: "Micro-Pension for Gig Workers",
    count: 6,
    saturation: "Underexplored",
    problem: "Gig workers have irregular income and no retirement contribution mechanism.",
    approach: "Round-up contributions that flex with weekly earnings volatility.",
    targetUser: "Delivery and ride-hailing workers",
    tech: ["UPI Autopay", "Go", "Postgres"],
    impact: "Contribution behaviour that survives income volatility.",
  },

  // Accessibility — 30
  {
    category: "Accessibility",
    area: "Sign Language Translation",
    count: 11,
    saturation: "Highly Saturated",
    problem: "Deaf users cannot access spoken-only public services.",
    approach: "Pose-estimation based sign recognition.",
    targetUser: "Deaf and hard-of-hearing users",
    tech: ["MediaPipe", "TensorFlow", "React"],
    impact: "Basic two-way communication at service counters.",
  },
  {
    category: "Accessibility",
    area: "Screen Reader Enhancement",
    count: 8,
    saturation: "Medium",
    problem: "Complex web dashboards are unusable with standard screen readers.",
    approach: "Semantic re-rendering layer that restructures pages for linear reading.",
    targetUser: "Blind and low-vision professionals",
    tech: ["Browser extension", "ARIA", "LLM summarisation"],
    impact: "Usable navigation of dashboards that are currently inaccessible.",
  },
  {
    category: "Accessibility",
    area: "Mobility Mapping",
    count: 7,
    saturation: "Medium",
    problem: "Wheelchair users cannot tell whether a route is actually navigable.",
    approach: "Crowd-sourced kerb and ramp mapping with routing.",
    targetUser: "Wheelchair users",
    tech: ["OpenStreetMap", "Flutter", "Postgres"],
    impact: "Routes chosen on verified accessibility rather than distance.",
  },
  {
    category: "Accessibility",
    area: "Elderly Digital Access",
    count: 4,
    saturation: "Underexplored",
    problem: "Elderly users abandon government service portals at the OTP and form stages.",
    approach: "Voice-guided co-pilot that walks through the actual portal step by step.",
    targetUser: "Senior citizens using government portals",
    tech: ["Speech APIs", "Browser automation", "React"],
    impact: "Completion of applications that are currently abandoned midway.",
  },

  // Smart City — 25
  {
    category: "Smart City",
    area: "Traffic Optimisation",
    count: 10,
    saturation: "Highly Saturated",
    problem: "Fixed-timer signals create queues that ripple across junctions.",
    approach: "Camera-based queue estimation with adaptive signal timing.",
    targetUser: "Traffic control rooms",
    tech: ["YOLO", "SUMO", "Python"],
    impact: "Shorter queues at coordinated junction groups.",
  },
  {
    category: "Smart City",
    area: "Civic Issue Reporting",
    count: 9,
    saturation: "Highly Saturated",
    problem: "Citizen complaints disappear into ticket systems with no accountability.",
    approach: "Photo-based reporting with automated department routing.",
    targetUser: "City residents",
    tech: ["React Native", "Supabase", "Geo APIs"],
    impact: "Traceable complaint lifecycle with escalation.",
  },
  {
    category: "Smart City",
    area: "Street Lighting Efficiency",
    count: 6,
    saturation: "Underexplored",
    problem: "Street lights run at full power all night in empty streets while faults go unreported.",
    approach: "Presence-adaptive dimming with fault self-reporting.",
    targetUser: "Municipal electrical departments",
    tech: ["LoRaWAN", "Edge sensors", "Grafana"],
    impact: "Lower energy draw with faster fault repair.",
  },

  // Other — 15
  {
    category: "Other",
    area: "Disaster Volunteer Coordination",
    count: 8,
    saturation: "Medium",
    problem: "Relief volunteers duplicate effort in some areas and miss others entirely.",
    approach: "Live needs board matched to volunteer skills and location.",
    targetUser: "Relief coordinators",
    tech: ["Next.js", "Supabase", "Mapbox"],
    impact: "Coverage gaps visible during the first 72 hours.",
  },
  {
    category: "Other",
    area: "Local Language Legal Aid",
    count: 7,
    saturation: "Underexplored",
    problem: "People cannot understand legal notices written in English legalese.",
    approach: "Notice explanation with next-step checklists in regional languages.",
    targetUser: "Citizens receiving legal notices",
    tech: ["LLM", "IndicNLP", "React"],
    impact: "Understanding of deadlines and required responses.",
  },
];

export const CATEGORIES: Category[] = [
  "Agriculture",
  "Healthcare",
  "Education",
  "Climate",
  "FinTech",
  "Accessibility",
  "Smart City",
  "Other",
];

export const CATEGORY_COUNTS: Record<Category, number> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c] = PROBLEM_AREAS.filter((p) => p.category === c).reduce((s, p) => s + p.count, 0);
    return acc;
  },
  {} as Record<Category, number>,
);

/* ------------------------------------------------------------------ */
/* naming                                                              */
/* ------------------------------------------------------------------ */
const PREFIX: Record<Category, string[]> = {
  Agriculture: ["Agri", "Krishi", "Farm", "Crop", "Terra", "Harvest", "Soil", "Bhoomi", "Green"],
  Healthcare: ["Medi", "Care", "Arogya", "Pulse", "Vital", "Cure", "Heal", "Clinic"],
  Education: ["Edu", "Vidya", "Learn", "Scholar", "Path", "Class", "Mentor", "Gyan"],
  Climate: ["Eco", "Carbon", "Prithvi", "Clima", "Verde", "Aqua", "Solar", "Zero"],
  FinTech: ["Fin", "Paisa", "Credit", "Ledger", "Vault", "Coin", "Trust", "Nidhi"],
  Accessibility: ["Access", "Able", "Saksham", "Sight", "Signa", "Reach", "Ease"],
  "Smart City": ["Urban", "Nagar", "Civic", "Metro", "Grid", "Street", "Junction"],
  Other: ["Nova", "Relief", "Nyaya", "Setu", "Bridge", "Common"],
};
const SUFFIX = [
  "Vision",
  "Sense",
  "Guard",
  "Link",
  "Flow",
  "Lens",
  "Nest",
  "Loop",
  "Mind",
  "Track",
  "Bridge",
  "Scope",
  "Wave",
  "Pilot",
  "Grid",
  "Sync",
  "Bloom",
  "Spark",
];
const COLLEGES = [
  "IIT Kharagpur",
  "NIT Trichy",
  "VIT Vellore",
  "BITS Pilani",
  "COEP Pune",
  "PSG Tech Coimbatore",
  "Jadavpur University",
  "Manipal Institute of Technology",
  "IIIT Hyderabad",
  "Anna University",
  "DTU Delhi",
  "Amrita Vishwa Vidyapeetham",
  "SRM Chennai",
  "NIT Rourkela",
  "Thapar University",
];
const JUDGE_NAMES = ["Dr. Anita Rao", "Vikram Shetty", "Priya Nair", "Rahul Menon"];

export const JUDGES = JUDGE_NAMES.map((name, i) => ({
  id: `judge-${i + 1}`,
  name,
  affiliation: [
    "Professor, Agricultural Systems",
    "Partner, Northbridge Ventures",
    "Director of Product, Medlytic",
    "Head of Engineering, Civicstack",
  ][i]!,
  assigned: [140, 130, 120, 110][i]!,
  completed: [96, 74, 61, 43][i]!,
  avgScore: [7.4, 6.8, 7.9, 7.1][i]!,
}));

/* ------------------------------------------------------------------ */
/* submission generation                                               */
/* ------------------------------------------------------------------ */

const usedNames = new Set<string>();
function makeName(category: Category) {
  for (let i = 0; i < 200; i++) {
    const n = `${pick(PREFIX[category])}${pick(SUFFIX)}`;
    if (!usedNames.has(n)) {
      usedNames.add(n);
      return n;
    }
  }
  const fallback = `${pick(PREFIX[category])}${usedNames.size}`;
  usedNames.add(fallback);
  return fallback;
}

const clamp = (n: number) => Math.max(1, Math.min(99, Math.round(n)));

interface Seed {
  team: string;
  project: string;
  area: string;
  archetype: Archetype;
}

type Archetype =
  | "gem" // strong signals, weak deck
  | "polished-generic" // beautiful deck, crowded idea
  | "strong" // strong all round
  | "repetitive"
  | "weak"
  | "unique";

const FEATURED: Seed[] = [
  { team: "AgriRecover", project: "Post-Flood Crop Recovery Advisor", area: "Post-Flood Crop Recovery", archetype: "gem" },
  { team: "AgriVision", project: "Weather-Aware Crop Disease Detection", area: "Crop Disease", archetype: "strong" },
  { team: "FarmAI", project: "LeafScan Disease Classifier", area: "Crop Disease", archetype: "polished-generic" },
  { team: "CropGuard", project: "Disease Alerts for Smallholders", area: "Crop Disease", archetype: "repetitive" },
  { team: "ChillShare", project: "Shared Micro Cold Storage", area: "Small-Farm Cold Storage", archetype: "gem" },
  { team: "SilverStep", project: "Ambient Fall Risk Sensing", area: "Elderly Home Care", archetype: "gem" },
  { team: "PortalPal", project: "Voice Co-Pilot for Government Portals", area: "Elderly Digital Access", archetype: "gem" },
  { team: "RedRoute", project: "Expiry-Aware Blood Unit Routing", area: "Blood & Organ Logistics", archetype: "unique" },
  { team: "LabLite", project: "Offline Science Lab Simulations", area: "Lab Access for Low-Resource Schools", archetype: "gem" },
  { team: "ShadeMap", project: "Pedestrian Heat Corridor Planner", area: "Urban Heat Islands", archetype: "unique" },
  { team: "SolarShare", project: "Neighbourhood Surplus Solar Ledger", area: "Community Solar Sharing", archetype: "gem" },
  { team: "PensionKit", project: "Flexible Micro-Pension for Gig Workers", area: "Micro-Pension for Gig Workers", archetype: "unique" },
  { team: "StudyBuddy", project: "AI Notes Chat Assistant", area: "Generic AI Study Assistant", archetype: "polished-generic" },
  { team: "DoubtDesk", project: "Instant Doubt Solver", area: "Generic AI Study Assistant", archetype: "repetitive" },
  { team: "TriageTalk", project: "Symptom Triage Companion", area: "Symptom Triage Chatbot", archetype: "polished-generic" },
];

function scoresFor(archetype: Archetype, area: ProblemArea) {
  const saturationPenalty =
    area.saturation === "Highly Saturated" ? 18 : area.saturation === "Medium" ? 6 : 0;
  const base = {
    gem: {
      problemRelevance: between(86, 94),
      diff: between(84, 92),
      impact: between(85, 93),
      feasibility: between(74, 86),
      pres: between(38, 55),
      sim: between(14, 30),
    },
    unique: {
      problemRelevance: between(78, 90),
      diff: between(78, 90),
      impact: between(75, 88),
      feasibility: between(68, 84),
      pres: between(58, 74),
      sim: between(18, 36),
    },
    strong: {
      problemRelevance: between(80, 90),
      diff: between(72, 84),
      impact: between(76, 88),
      feasibility: between(74, 88),
      pres: between(74, 90),
      sim: between(40, 60),
    },
    "polished-generic": {
      problemRelevance: between(60, 74),
      diff: between(32, 48),
      impact: between(55, 70),
      feasibility: between(72, 88),
      pres: between(84, 95),
      sim: between(72, 88),
    },
    repetitive: {
      problemRelevance: between(55, 70),
      diff: between(24, 42),
      impact: between(48, 64),
      feasibility: between(60, 78),
      pres: between(55, 74),
      sim: between(74, 90),
    },
    weak: {
      problemRelevance: between(40, 58),
      diff: between(26, 44),
      impact: between(38, 56),
      feasibility: between(40, 62),
      pres: between(38, 60),
      sim: between(52, 72),
    },
  }[archetype];

  const solutionDifferentiation = clamp(base.diff - saturationPenalty * 0.35);
  const technicalDifferentiation = clamp(base.diff + between(-8, 8) - saturationPenalty * 0.25);
  const innovationSignal = clamp(
    base.problemRelevance * 0.22 +
      solutionDifferentiation * 0.3 +
      technicalDifferentiation * 0.2 +
      base.impact * 0.16 +
      (100 - base.sim) * 0.12,
  );
  const clarity = clamp(base.pres + between(-6, 6));
  const structure = clamp(base.pres + between(-6, 8));
  const visualQuality = clamp(base.pres + between(-9, 5));
  return {
    problemRelevance: clamp(base.problemRelevance),
    innovationSignal,
    solutionDifferentiation,
    technicalDifferentiation,
    impact: clamp(base.impact),
    feasibility: clamp(base.feasibility),
    similarity: clamp(base.sim),
    presentationQuality: Math.round((clarity + structure + visualQuality) / 3),
    clarity,
    structure,
    visualQuality,
  };
}

function buildSubmission(index: number, area: ProblemArea, seed: Seed | null, archetype: Archetype): Submission {
  const team = seed?.team ?? makeName(area.category);
  const project = seed?.project ?? `${area.area} ${pick(["Assistant", "Platform", "Toolkit", "Companion", "Engine"])}`;
  const s = scoresFor(archetype, area);
  const hiddenGem = s.innovationSignal >= 78 && s.presentationQuality <= 58;
  const priority: Priority =
    hiddenGem || s.innovationSignal >= 82
      ? "High Priority"
      : s.innovationSignal >= 66
        ? "Review"
        : "Standard";
  const prototype: Submission["prototype"] =
    s.feasibility > 76 ? "Working prototype" : s.feasibility > 58 ? "Partial prototype" : "Concept only";
  const day = between(1, 14);
  const areaTotal = area.count;

  const whyHighlighted: string[] = [];
  if (s.similarity < 40) whyHighlighted.push(`Low similarity to the dominant ${area.category} cluster (${s.similarity}% peak match)`);
  if (area.saturation === "Underexplored")
    whyHighlighted.push(`Only ${areaTotal} of ${CATEGORY_COUNTS[area.category]} ${area.category} submissions address ${area.area.toLowerCase()}`);
  if (s.problemRelevance >= 80) whyHighlighted.push("Problem statement is specific, evidenced and tied to a named user group");
  if (s.technicalDifferentiation >= 75) whyHighlighted.push("Technical approach differs from the dominant approach in this cluster");
  if (prototype === "Working prototype") whyHighlighted.push("Prototype evidence available (demo URL and repository present)");
  if (s.presentationQuality < 60) whyHighlighted.push("Presentation clarity is weak, which typically reduces reviewer attention");
  if (whyHighlighted.length === 0)
    whyHighlighted.push(`Sits inside a ${area.saturation.toLowerCase()} problem area with ${areaTotal} comparable submissions`);

  const strengths = [
    s.problemRelevance >= 75 ? "Strong problem relevance with a clearly named user" : "Problem is understandable but broadly framed",
    s.solutionDifferentiation >= 70 ? "Differentiated approach relative to the cluster" : "Approach follows the common pattern in this cluster",
    prototype === "Working prototype" ? "Working prototype with reachable demo" : "Prototype is partially built",
    s.impact >= 75 ? "Impact framed with a measurable outcome" : "Impact described qualitatively",
  ];
  const concerns = [
    s.feasibility < 70 ? "Feasibility within the stated timeline is unclear" : "Limited validation data beyond the pilot set",
    s.presentationQuality < 60 ? "Presentation clarity is weak; key claims are buried" : "Deck is clear but light on evaluation detail",
    s.similarity > 70 ? `High overlap with ${Math.round(areaTotal * 0.6)} other submissions in this cluster` : "Small prototype dataset",
  ];

  const recommendation = hiddenGem
    ? "Recommend deeper human review — strong project signals paired with weak presentation signals."
    : s.similarity > 72
      ? "Cluster review recommended — highly comparable to several other submissions."
      : s.innovationSignal >= 78
        ? "Recommend review — differentiated relative to the current submission pool."
        : "Standard review path.";

  const aiSummary = `${team} addresses ${area.problem.charAt(0).toLowerCase()}${area.problem.slice(1)} The team proposes ${archetype === "gem" || archetype === "unique" ? "an approach that departs from the dominant pattern in this cluster" : "an approach broadly aligned with the dominant pattern in this cluster"}: ${area.approach} The intended users are ${area.targetUser.toLowerCase()}, and the stated outcome is that ${area.impact.charAt(0).toLowerCase()}${area.impact.slice(1)} Relative to ${areaTotal} comparable submissions in ${area.area}, the strongest signal is ${s.solutionDifferentiation >= 70 ? "solution differentiation" : "problem relevance"} and the weakest is ${s.presentationQuality < 60 ? "presentation quality" : "validation evidence"}.`;

  return {
    id: `HS-${(1000 + index).toString()}`,
    team,
    project,
    category: area.category,
    problemArea: area.area,
    college: pick(COLLEGES),
    problem: area.problem,
    targetUser: area.targetUser,
    solution: area.approach,
    technology: area.tech.join(", "),
    impact: area.impact,
    prototype,
    demoUrl: `https://demo.hacksort.ai/${team.toLowerCase()}`,
    githubUrl: `https://github.com/hacksort-demo/${team.toLowerCase()}`,
    videoUrl: `https://videos.hacksort.ai/${team.toLowerCase()}`,
    submittedAt: `2026-03-${String(day).padStart(2, "0")}`,
    reviewed: rand() < 0.256,
    scores: s,
    priority,
    hiddenGem,
    aiSummary,
    recommendation,
    whyHighlighted,
    strengths,
    concerns,
    similar: [],
    humanScores:
      rand() < 0.3
        ? JUDGES.slice(0, between(2, 4)).map((j) => ({ judge: j.name, total: Number((6 + rand() * 3.6).toFixed(1)) }))
        : undefined,
  };
}

function archetypeFor(area: ProblemArea, i: number): Archetype {
  const r = rand();
  if (area.saturation === "Highly Saturated") {
    if (r < 0.45) return "repetitive";
    if (r < 0.7) return "polished-generic";
    if (r < 0.85) return "weak";
    if (r < 0.96) return "strong";
    return "gem";
  }
  if (area.saturation === "Medium") {
    if (r < 0.3) return "repetitive";
    if (r < 0.5) return "strong";
    if (r < 0.65) return "polished-generic";
    if (r < 0.85) return "weak";
    return i % 2 === 0 ? "gem" : "unique";
  }
  if (r < 0.4) return "gem";
  if (r < 0.75) return "unique";
  if (r < 0.9) return "strong";
  return "weak";
}

function generate(): Submission[] {
  const out: Submission[] = [];
  let index = 1;
  for (const area of PROBLEM_AREAS) {
    const seeds = FEATURED.filter((f) => f.area === area.area);
    for (let i = 0; i < area.count; i++) {
      const seed = seeds[i] ?? null;
      const archetype = seed ? seed.archetype : archetypeFor(area, i);
      out.push(buildSubmission(index++, area, seed, archetype));
    }
  }
  // similarity links inside each problem area
  const byArea = new Map<string, Submission[]>();
  for (const s of out) {
    const list = byArea.get(s.problemArea) ?? [];
    list.push(s);
    byArea.set(s.problemArea, list);
  }
  for (const s of out) {
    const peers = (byArea.get(s.problemArea) ?? []).filter((p) => p.id !== s.id);
    const area = PROBLEM_AREAS.find((a) => a.area === s.problemArea)!;
    const ranked = peers
      .map((p) => ({
        p,
        d: Math.abs(p.scores.solutionDifferentiation - s.scores.solutionDifferentiation),
      }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 4);
    s.similar = ranked.map(({ p, d }, i) => ({
      id: p.id,
      team: p.team,
      project: p.project,
      similarity: clamp(s.scores.similarity + 8 - i * 5 - d * 0.4),
      commonProblem: area.area,
      commonApproach: area.approach,
      keyDifference:
        s.scores.solutionDifferentiation > p.scores.solutionDifferentiation + 12
          ? `${p.team} follows the dominant approach for this cluster, while ${s.team} changes the core method rather than the interface.`
          : `${s.team} and ${p.team} share the same core method; the difference is mainly in scope of deployment and data sources.`,
    }));
  }
  return out;
}

export const SUBMISSIONS: Submission[] = generate();

/* explicit featured overrides so the scripted demo always reads well */
const agriRecover = SUBMISSIONS.find((s) => s.team === "AgriRecover")!;
agriRecover.scores = {
  ...agriRecover.scores,
  problemRelevance: 92,
  innovationSignal: 91,
  solutionDifferentiation: 89,
  technicalDifferentiation: 87,
  impact: 90,
  feasibility: 81,
  similarity: 22,
  clarity: 48,
  structure: 52,
  visualQuality: 43,
  presentationQuality: 48,
};
agriRecover.hiddenGem = true;
agriRecover.priority = "High Priority";
agriRecover.prototype = "Working prototype";
agriRecover.whyHighlighted = [
  "Only 3 of 120 Agriculture submissions address post-flood crop recovery",
  "Low similarity to the dominant crop-disease cluster (peak match 22%)",
  "Solution differs from the dominant image-classification approach by modelling waterlogging duration from radar imagery",
  "Working prototype with a reachable demo and public repository",
  "Presentation clarity is weak (48/100), which typically reduces reviewer attention",
];
agriRecover.recommendation =
  "Strong differentiation detected despite relatively weak presentation clarity. Only 3 submissions address this specific problem area.";
agriRecover.aiSummary =
  "AgriRecover targets the two-week window after flood water recedes, when farmers must decide which standing crops can still be salvaged and what to replant. Rather than classifying leaf images like most Agriculture submissions, the team estimates waterlogging duration per plot from Sentinel-1 radar and combines it with crop-stage data to produce a replanting plan. The prototype is working and covers three river-basin districts with ground-truth from 42 farms. Only 3 of 120 Agriculture submissions address this problem area, and peak similarity to any other submission is 22%. The deck itself is weak: the core method is described on slide 7 with no diagram, which is a likely reason this submission would be skimmed.";
agriRecover.strengths = [
  "Strong problem relevance in a problem area addressed by only 3 submissions",
  "Differentiated technical approach (radar-derived waterlogging duration, not leaf imagery)",
  "Working prototype validated against 42 farms",
  "Impact framed as a decision made inside a specific recovery window",
];
agriRecover.concerns = [
  "Limited validation data — 42 farms across a single season",
  "Small prototype dataset for radar model calibration",
  "Presentation buries the core differentiator on a dense text slide",
];

/* ------------------------------------------------------------------ */
/* derived aggregates                                                  */
/* ------------------------------------------------------------------ */

export const HIDDEN_GEMS = SUBMISSIONS.filter((s) => s.hiddenGem)
  .sort((a, b) => b.scores.innovationSignal - a.scores.innovationSignal)
  .slice(0, 17);
const gemIds = new Set(HIDDEN_GEMS.map((g) => g.id));
SUBMISSIONS.forEach((s) => {
  s.hiddenGem = gemIds.has(s.id);
});

export const HIGH_PRIORITY = SUBMISSIONS.filter((s) => s.priority === "High Priority");

export const STATS = {
  total: SUBMISSIONS.length,
  analyzed: SUBMISSIONS.length,
  highPriority: 42,
  hiddenGems: HIDDEN_GEMS.length,
  clusters: PROBLEM_AREAS.length,
  saturated: PROBLEM_AREAS.filter((p) => p.saturation === "Highly Saturated").length,
  reviewed: 128,
  get remaining() {
    return this.total - this.reviewed;
  },
};

export const CATEGORY_CHART = CATEGORIES.map((c) => ({
  category: c,
  count: CATEGORY_COUNTS[c],
}));

export const TREND_CHART = [
  { day: "Mar 01", submissions: 12, analyzed: 12 },
  { day: "Mar 03", submissions: 28, analyzed: 26 },
  { day: "Mar 05", submissions: 47, analyzed: 45 },
  { day: "Mar 07", submissions: 66, analyzed: 63 },
  { day: "Mar 09", submissions: 88, analyzed: 85 },
  { day: "Mar 11", submissions: 121, analyzed: 118 },
  { day: "Mar 13", submissions: 178, analyzed: 172 },
  { day: "Mar 15", submissions: 314, analyzed: 305 },
  { day: "Mar 16", submissions: 438, analyzed: 430 },
  { day: "Mar 17", submissions: 500, analyzed: 500 },
];

export const SIGNAL_DISTRIBUTION = [
  { band: "0-20", count: SUBMISSIONS.filter((s) => s.scores.innovationSignal < 20).length },
  { band: "20-40", count: SUBMISSIONS.filter((s) => s.scores.innovationSignal >= 20 && s.scores.innovationSignal < 40).length },
  { band: "40-60", count: SUBMISSIONS.filter((s) => s.scores.innovationSignal >= 40 && s.scores.innovationSignal < 60).length },
  { band: "60-80", count: SUBMISSIONS.filter((s) => s.scores.innovationSignal >= 60 && s.scores.innovationSignal < 80).length },
  { band: "80-100", count: SUBMISSIONS.filter((s) => s.scores.innovationSignal >= 80).length },
];

export const SATURATION_BOARD = {
  saturated: PROBLEM_AREAS.filter((p) => p.saturation === "Highly Saturated").sort((a, b) => b.count - a.count),
  medium: PROBLEM_AREAS.filter((p) => p.saturation === "Medium").sort((a, b) => b.count - a.count),
  underexplored: PROBLEM_AREAS.filter((p) => p.saturation === "Underexplored").sort((a, b) => a.count - b.count),
};

export function getSubmission(id: string) {
  return SUBMISSIONS.find((s) => s.id === id);
}

export const SLIDES = [
  {
    title: "Problem",
    body: "Farmers in flood-prone river basins lose the crop that survived the flood because nobody tells them what is salvageable.",
    insight: "Problem statement names a specific user, geography and decision window — stronger than the cluster average.",
    tone: "positive" as const,
  },
  {
    title: "Why existing tools fail",
    body: "Disease detection apps assume a healthy field. None of them model waterlogging duration or post-flood soil state.",
    insight: "Differentiation claim is explicit and checkable against the 31 crop-disease submissions in this competition.",
    tone: "positive" as const,
  },
  {
    title: "Our approach",
    body: "Sentinel-1 radar → waterlogging duration per plot → crop-stage model → replanting plan with a cost estimate.",
    insight: "This is the core differentiator, but it is presented as dense text with no diagram on slide 3.",
    tone: "warning" as const,
  },
  {
    title: "Prototype",
    body: "Working web app covering three districts, calibrated with ground-truth from 42 farms in the 2025 monsoon.",
    insight: "Prototype evidence available; validation set is small (42 farms, single season).",
    tone: "warning" as const,
  },
  {
    title: "Impact",
    body: "Recovery decisions made within the 14-day window after water recedes instead of the following season.",
    insight: "Impact is framed as a decision-timing change rather than an unverifiable percentage claim.",
    tone: "positive" as const,
  },
  {
    title: "Team & next steps",
    body: "Four members, agronomy advisor from the district agriculture office. Next: expand to eight districts.",
    insight: "No competitive analysis slide and no evaluation metrics table — a likely cause of low presentation scores.",
    tone: "concern" as const,
  },
];

export const NOTIFICATIONS = [
  { id: 1, text: "17 potential hidden gems identified.", time: "4 min ago", tone: "gem" as const },
  { id: 2, text: "42 high-priority submissions need review.", time: "21 min ago", tone: "warning" as const },
  { id: 3, text: "12 new submissions analyzed.", time: "1 hr ago", tone: "info" as const },
  { id: 4, text: "Judge evaluation deadline approaching (Mar 19, 18:00).", time: "3 hrs ago", tone: "warning" as const },
];

export const SCATTER_DATA = SUBMISSIONS.map((s) => ({
  x: s.scores.presentationQuality,
  y: s.scores.innovationSignal,
  team: s.team,
  id: s.id,
  overlooked: s.hiddenGem,
}));
