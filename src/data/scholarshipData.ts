export interface Scholarship {
  id: number;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string;
  status: "eligible" | "applied" | "not-eligible" | "deadline-passed";
  link: string;
  category: "Government" | "Private" | "Corporate";
  benefits?: string;
  keyCriteria?: string;
}

export const scholarships: Scholarship[] = [
  // Government Scholarships (Gujarat)
  {
    id: 1,
    name: "Mukhyamantri Yuva Swavalamban Yojana (MYSY)",
    provider: "Government of Gujarat",
    amount: "50% of Tuition Fee (up to ₹50,000 for BE/B.Tech); ₹5,000 for books; ₹1,200/month hostel grant",
    deadline: "March 31, 2024",
    eligibility: "1st-year Degree/Diploma students in Gujarat",
    status: "eligible",
    link: "https://mysy.gujarat.gov.in/",
    category: "Government",
    benefits: "50% of Tuition Fee (up to ₹50,000 for BE/B.Tech); ₹5,000 for books; ₹1,200/month hostel grant",
    keyCriteria: "80th percentile in 10th/12th; Family income < ₹6 Lakh/year"
  },
  {
    id: 2,
    name: "Digital Gujarat (Post-Matric SC/ST/SEBC/OBC)",
    provider: "Government of Gujarat",
    amount: "Variable tuition fee coverage + Instrumental Assistance (₹8,000 for Engineering)",
    deadline: "April 30, 2024",
    eligibility: "Students from SC/ST/SEBC/OBC categories",
    status: "eligible",
    link: "https://www.digitalgujarat.gov.in/",
    category: "Government",
    benefits: "Variable tuition fee coverage + Instrumental Assistance (₹8,000 for Engineering)",
    keyCriteria: "Must be a resident of Gujarat; Income limits vary by category (e.g., ₹2.5L for SC/ST)"
  },
  {
    id: 3,
    name: "Mukhyamantri Kanya Kelavani Nidhi (MKKN)",
    provider: "Government of Gujarat",
    amount: "Financial assistance that often matches or supplements MYSY for female students",
    deadline: "March 31, 2024",
    eligibility: "Meritorious female students in professional courses (Medicine/Eng.)",
    status: "eligible",
    link: "https://mksy.up.gov.in/",
    category: "Government",
    benefits: "Financial assistance that often matches or supplements MYSY for female students",
    keyCriteria: "Focus on promoting higher education for girls in self-financed courses"
  },
  {
    id: 4,
    name: "Food Bill Assistance (SEBC/ST/SC)",
    provider: "Government of Gujarat",
    amount: "₹1,200 to ₹1,500 per month for 10 months",
    deadline: "May 15, 2024",
    eligibility: "Category students staying in hostels",
    status: "eligible",
    link: "https://digitalgujaratscholarship.co.in/",
    category: "Government",
    benefits: "₹1,200 to ₹1,500 per month for 10 months",
    keyCriteria: "Only for students in recognized hostels whose family income is within limits"
  },

  // Government Scholarships (Central/National)
  {
    id: 5,
    name: "Pragati Scholarship (AICTE)",
    provider: "AICTE",
    amount: "₹50,000 per year for the duration of the course",
    deadline: "February 28, 2024",
    eligibility: "Girls only in 1st year of Degree/Diploma",
    status: "eligible",
    link: "http://www.aicte-pragati-saksham-gov.in/",
    category: "Government",
    benefits: "₹50,000 per year for the duration of the course",
    keyCriteria: "Max 2 girls per family; Income < ₹8 Lakh; Admission through centralized counselling"
  },
  {
    id: 6,
    name: "Central Sector Scheme (CSSS)",
    provider: "Ministry of Education",
    amount: "₹12,000 per year for graduation (3 years) and ₹20,000 for PG",
    deadline: "March 15, 2024",
    eligibility: "Top 20th percentile of successful 12th-grade students",
    status: "applied",
    link: "https://scholarships.gov.in/",
    category: "Government",
    benefits: "₹12,000 per year for graduation (3 years) and ₹20,000 for PG",
    keyCriteria: "Family income < ₹4.5 Lakh (recently updated to ₹8L in some states)"
  },
  {
    id: 7,
    name: "Saksham Scholarship",
    provider: "AICTE",
    amount: "₹50,000 per year for tuition and incidentals",
    deadline: "February 28, 2024",
    eligibility: "Specially-abled students (>40% disability)",
    status: "eligible",
    link: "http://www.aicte-pragati-saksham-gov.in/",
    category: "Government",
    benefits: "₹50,000 per year for tuition and incidentals",
    keyCriteria: "Admitted to AICTE-approved technical institutions"
  },
  {
    id: 8,
    name: "PM-YASASVI (Post-Matric)",
    provider: "Ministry of Social Justice",
    amount: "Up to ₹20,000 per year for degree courses",
    deadline: "April 10, 2024",
    eligibility: "OBC, EBC, and DNT students",
    status: "eligible",
    link: "https://www.myscheme.gov.in/",
    category: "Government",
    benefits: "Up to ₹20,000 per year for degree courses",
    keyCriteria: "Family income < ₹2.5 Lakh; Must belong to targeted categories"
  },

  // Private and Corporate Scholarships
  {
    id: 9,
    name: "Reliance Foundation Undergraduate",
    provider: "Reliance Foundation",
    amount: "Up to ₹2 Lakh over the duration of the degree",
    deadline: "June 30, 2024",
    eligibility: "1st-year students of any stream",
    status: "eligible",
    link: "https://scholarships.reliancefoundation.org/",
    category: "Private",
    benefits: "Up to ₹2 Lakh over the duration of the degree",
    keyCriteria: "Aptitude test required; Family income < ₹15 Lakh (priority < ₹3 Lakh)"
  },
  {
    id: 10,
    name: "Foundation For Excellence (FFE)",
    provider: "Foundation For Excellence",
    amount: "₹50,000 per year + Mentorship & Skill training",
    deadline: "May 31, 2024",
    eligibility: "1st-year BE/B.Tech, MBBS, or Law",
    status: "eligible",
    link: "https://ffe.org/",
    category: "Private",
    benefits: "₹50,000 per year + Mentorship & Skill training",
    keyCriteria: "70% in 12th; Income < ₹3 Lakh; Only for 'General/Open' merit seats"
  },
  {
    id: 11,
    name: "ONGC Scholarship",
    provider: "ONGC",
    amount: "₹48,000 per year (₹4,000/month)",
    deadline: "July 15, 2024",
    eligibility: "n-EWS in Engineering/MB BS",
    status: "eligible",
    link: "https://www.ongcfoundation.org/scholarship-scheme/",
    category: "Corporate",
    benefits: "₹48,000 per year (₹4,000/month)",
    keyCriteria: "60% marks in 12th; Income < ₹2L (Gen/OBC) or ₹4.5L (SC/ST)"
  },
  {
    id: 12,
    name: "Kotak Kanya Scholarship",
    provider: "Kotak Education Foundation",
    amount: "₹1.5 Lakh per year",
    deadline: "August 31, 2024",
    eligibility: "Girls only at premier institutes (IIT/NIT/etc.)",
    status: "eligible",
    link: "https://www.kotakeducationfoundation.org/",
    category: "Private",
    benefits: "₹1.5 Lakh per year",
    keyCriteria: "75% marks in 12th; Income < ₹6 Lakh"
  },
  {
    id: 13,
    name: "JK Lakshmi Vidya Scholarship",
    provider: "JK Lakshmi Cement",
    amount: "₹30,000 per year",
    deadline: "September 30, 2024",
    eligibility: "Students pursuing UG (Engineering/Ba chelors); Residents of Gujarat, Haryana, Rajasthan, UP",
    status: "eligible",
    link: "https://www.vidyasaarathi.co.in/",
    category: "Corporate",
    benefits: "₹30,000 per year",
    keyCriteria: "Minimum 50% in Class 12; Family income < ₹5 Lakhs; Open to all genders"
  },
  {
    id: 14,
    name: "SBIF Asha Scholarship",
    provider: "SBI Foundation",
    amount: "Up to ₹75,000 per year",
    deadline: "October 15, 2024",
    eligibility: "1st-year UG students in top NIRF-ranked universities/coll eges",
    status: "eligible",
    link: "https://www.sbipscholarship.co.in/",
    category: "Private",
    benefits: "Up to ₹75,000 per year",
    keyCriteria: "Minimum 75% marks in previous academic year; Family income < ₹6 Lakhs"
  },
  {
    id: 15,
    name: "Kind Circle Scholarship",
    provider: "Kind Circle Foundation",
    amount: "₹30,000 to ₹50,000 per year",
    deadline: "November 30, 2024",
    eligibility: "Students pursuing UG/PG/Engineering/Medical courses across India",
    status: "eligible",
    link: "https://www.kindcircle.org/",
    category: "Private",
    benefits: "₹30,000 to ₹50,000 per year",
    keyCriteria: "Minimum 75% marks in the previous qualifying exam; Family income < ₹6 Lakhs"
  },
  {
    id: 16,
    name: "AICTE Swanath Scholarship",
    provider: "AICTE",
    amount: "₹50,000 per year",
    deadline: "December 31, 2024",
    eligibility: "Orphans, wards of parents who died of Covid-19, or wards of Armed Forces/Paramilit ary martyrs",
    status: "eligible",
    link: "https://www.aicte.gov.in/",
    category: "Government",
    benefits: "₹50,000 per year",
    keyCriteria: "Family income < ₹8 Lakhs; Must be studying in an AICTE-approved institution"
  },
  {
    id: 17,
    name: "Colgate Keep India Smiling Scholarship",
    provider: "Colgate-Palmolive",
    amount: "₹30,000 per year (for 4 years)",
    deadline: "January 15, 2025",
    eligibility: "Students enrolled in the 1st year of a 4-year Engineering (B.E./B.Tech.) degree",
    status: "eligible",
    link: "https://www.colgate.com/",
    category: "Corporate",
    benefits: "₹30,000 per year (for 4 years)",
    keyCriteria: "Minimum 60% in Class 12 board exams; Family income < ₹6 Lakhs"
  },
  {
    id: 18,
    name: "Sitaram Jindal Foundation Scholarship",
    provider: "Sitaram Jindal Foundation",
    amount: "₹2,500 to ₹3,200 per month",
    deadline: "February 28, 2025",
    eligibility: "Engineering (B.E./B.Tech.) students in recognized Govt./Private colleges",
    status: "eligible",
    link: "https://www.sitaramjindalfoundation.org/",
    category: "Private",
    benefits: "₹2,500 to ₹3,200 per month",
    keyCriteria: "Strictly merit-based; Family income must be within ₹4 Lakhs to ₹5 Lakhs (varies by category)"
  },
  {
    id: 19,
    name: "Bharti Airtel Scholarship",
    provider: "Bharti Airtel Foundation",
    amount: "100% Fee covered (Tuition + Hostel + Mess) + Free Laptop",
    deadline: "March 31, 2025",
    eligibility: "1st-year students in top 50 NIRF engineering colleges (ECE, IT, CS, AI, etc.)",
    status: "eligible",
    link: "https://www.bhartiairtelFoundation.org/",
    category: "Corporate",
    benefits: "100% Fee covered (Tuition + Hostel + Mess) + Free Laptop",
    keyCriteria: "Family income < ₹6.5 Lakhs; Preference to girls and PwD students"
  },
  {
    id: 20,
    name: "LIC HFL Vidyadhan Scholarship",
    provider: "LIC Housing Finance",
    amount: "Up to ₹25,000 per year for 3 years",
    deadline: "April 30, 2025",
    eligibility: "Students in 1st year of Graduation (Engineering included)",
    status: "eligible",
    link: "https://lichflvidyadhan.com/",
    category: "Corporate",
    benefits: "Up to ₹25,000 per year for 3 years",
    keyCriteria: "Min 60% in Class 12; Family income < ₹3.6 Lakhs; Preference to crisis-hit families"
  }
];

export const getScholarshipsByCategory = (category: string) => {
  if (category === "All") return scholarships;
  return scholarships.filter(s => s.category === category);
};

export const getEligibleScholarships = () => {
  return scholarships.filter(s => s.status === "eligible");
};

export const getAppliedScholarships = () => {
  return scholarships.filter(s => s.status === "applied");
};