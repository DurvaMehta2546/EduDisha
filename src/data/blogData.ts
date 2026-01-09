export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  tags: string[];
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "top-10-scholarships-gtu-students-2024",
    title: "Top 10 Scholarships for GTU Engineering Students in 2024",
    excerpt: "Discover the best scholarship opportunities available for GTU students this year. From government schemes to private foundations, we've compiled everything you need to know.",
    content: `
## Introduction

Pursuing engineering education at Gujarat Technological University (GTU) opens doors to numerous scholarship opportunities. Whether you're from an economically weaker section or an academic topper, there's likely a scholarship waiting for you.

## 1. Post-Matric Scholarship for SC/ST Students

This government-funded scholarship provides financial assistance to students from Scheduled Caste and Scheduled Tribe categories.

**Eligibility:**
- Must belong to SC/ST category
- Family income should be less than ₹2.5 lakhs per annum
- Must be enrolled in a recognized institution

**Benefits:** Up to ₹75,000 per year covering tuition fees, maintenance allowance, and study materials.

## 2. GTU Merit Scholarship

Gujarat Technological University offers merit-based scholarships to top-performing students.

**Eligibility:**
- CGPA above 8.5 in the previous semester
- No backlog in any subject
- Regular attendance above 75%

**Benefits:** ₹25,000 per year plus certificate of excellence.

## 3. Central Sector Scholarship Scheme

Funded by the Ministry of Human Resource Development, this scholarship supports meritorious students from low-income families.

**Eligibility:**
- Must be in the top 20 percentile of 12th board examination
- Family income less than ₹8 lakhs per annum

**Benefits:** ₹20,000 per year for technical courses.

## 4. AICTE Pragati Scholarship for Girls

Special scholarship for female students pursuing technical education.

**Eligibility:**
- Female students in AICTE approved institutions
- Family income less than ₹8 lakhs per annum

**Benefits:** ₹50,000 per year for up to 2 girls per family.

## 5. Tata Scholarship for Engineering Excellence

Private scholarship by Tata Trust for deserving engineering students.

**Eligibility:**
- Engineering students with CGPA above 7.5
- Demonstrated financial need

**Benefits:** Up to ₹50,000 per year.

## How to Apply

1. Visit the National Scholarship Portal (scholarships.gov.in)
2. Create an account and complete your profile
3. Upload required documents
4. Submit applications before deadlines

## Pro Tips

- **Start early:** Most scholarships have limited seats
- **Keep documents ready:** Maintain digital copies of all certificates
- **Track deadlines:** Set reminders for application deadlines
- **Apply to multiple:** Don't put all eggs in one basket

## Conclusion

With proper planning and timely applications, GTU students can significantly reduce their education expenses. Use EduDisha's Scholarship Hub to track deadlines and check your eligibility instantly!
    `,
    author: {
      name: "Priya Mehta",
      avatar: "PM",
      role: "Education Counselor",
    },
    date: "Mar 10, 2024",
    readTime: "5 min read",
    category: "Scholarships",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
    featured: true,
    tags: ["Scholarships", "GTU", "Financial Aid", "Government Schemes"],
  },
  {
    id: 2,
    slug: "peer-learning-transformed-dsa-skills",
    title: "How Peer Learning Transformed My DSA Skills",
    excerpt: "A personal journey of how skill exchange sessions helped me crack coding interviews at top tech companies.",
    content: `
## The Struggle Was Real

Six months ago, I was struggling with Data Structures and Algorithms. Despite watching countless YouTube tutorials and solving random problems, I wasn't making progress. Then I discovered EduDisha's Skill Exchange feature.

## Finding My First Study Partner

I listed "DSA Help Needed" in my profile and matched with Amit, a senior who had already cracked interviews at Amazon and Microsoft. The matching algorithm connected us based on skill compatibility and schedule availability.

## Our Learning Journey

### Week 1-2: Arrays and Strings
Amit started with the basics. Instead of just solving problems, he taught me the thought process:
- How to identify patterns
- When to use two-pointer technique
- Time complexity analysis for each approach

### Week 3-4: Linked Lists and Stacks
The beauty of peer learning is that you can ask "stupid" questions without judgment. Amit patiently explained concepts multiple times until they clicked.

### Week 5-8: Trees and Graphs
This is where the magic happened. Through Google Meet sessions, Amit would share his screen and walk through problems step by step.

## The Results

After 2 months of consistent peer learning:
- Solved 200+ LeetCode problems
- Improved from solving Easy problems in 30 mins to solving Medium in 20 mins
- Got interview calls from 5 top tech companies
- Received offers from 2 companies!

## What I Learned

1. **Teaching solidifies knowledge:** When I started helping juniors, my own concepts became crystal clear
2. **Consistency beats intensity:** 1 hour daily is better than 10 hours on weekends
3. **Community matters:** Having an accountability partner keeps you motivated

## Give Back

Now I'm a mentor on EduDisha, helping 3 juniors with their DSA preparation. The cycle continues!

## Start Your Journey

Don't struggle alone. Join EduDisha's Skill Exchange and find your learning partner today. Remember, the best investment you can make is in yourself.
    `,
    author: {
      name: "Amit Shah",
      avatar: "AS",
      role: "SDE at Microsoft",
    },
    date: "Mar 8, 2024",
    readTime: "4 min read",
    category: "Skill Exchange",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60",
    featured: true,
    tags: ["DSA", "Peer Learning", "Interview Prep", "Success Story"],
  },
  {
    id: 3,
    slug: "mastering-computer-networks-study-guide",
    title: "Mastering Computer Networks: A Complete Study Guide",
    excerpt: "Everything you need to ace your CN exams - from OSI model to TCP/IP protocols, with practical examples.",
    content: `
## Why Computer Networks Matter

In today's interconnected world, understanding computer networks is fundamental for any IT professional. This guide will help you master CN concepts for your GTU exams.

## The OSI Model - Your Foundation

The 7-layer OSI model is the backbone of networking concepts:

### Layer 7: Application Layer
- HTTP, FTP, SMTP, DNS
- Direct interaction with user applications

### Layer 6: Presentation Layer
- Data encryption and compression
- Format conversion

### Layer 5: Session Layer
- Session management
- Authentication and authorization

### Layer 4: Transport Layer
- TCP vs UDP
- Port numbers and multiplexing

### Layer 3: Network Layer
- IP addressing
- Routing protocols (RIP, OSPF, BGP)

### Layer 2: Data Link Layer
- MAC addresses
- Switches and bridges

### Layer 1: Physical Layer
- Cables, hubs, physical transmission

## TCP/IP Protocol Suite

Understanding the practical implementation:

\`\`\`
Application Layer → HTTP, DNS, FTP
Transport Layer → TCP, UDP
Internet Layer → IP, ICMP, ARP
Network Access → Ethernet, Wi-Fi
\`\`\`

## Key Topics for GTU Exams

1. **Subnetting and CIDR**
2. **Routing algorithms**
3. **Flow control mechanisms**
4. **Error detection and correction**
5. **Network security basics**

## Study Tips

- Draw diagrams for each protocol
- Practice subnetting problems daily
- Use Wireshark for practical understanding
- Review previous year question papers

## Recommended Resources

- Computer Networking by Kurose and Ross
- GTU official syllabus and question bank
- EduDisha's AI-powered syllabus summaries
    `,
    author: {
      name: "Dr. Rajesh Kumar",
      avatar: "RK",
      role: "Professor, GTU",
    },
    date: "Mar 5, 2024",
    readTime: "8 min read",
    category: "Academics",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
    featured: false,
    tags: ["Computer Networks", "OSI Model", "TCP/IP", "GTU Syllabus"],
  },
  {
    id: 4,
    slug: "ai-tools-engineering-students",
    title: "AI Tools Every Engineering Student Should Know",
    excerpt: "From ChatGPT to GitHub Copilot - leverage AI to supercharge your learning and productivity.",
    content: `
## The AI Revolution in Education

Artificial Intelligence is transforming how we learn and work. Here are the essential AI tools every engineering student should master.

## 1. ChatGPT & Claude

**Use Cases:**
- Explaining complex concepts in simple terms
- Debugging code errors
- Generating project ideas
- Writing documentation

**Pro Tips:**
- Be specific with your prompts
- Ask for step-by-step explanations
- Verify information from multiple sources

## 2. GitHub Copilot

The AI pair programmer that helps you code faster:
- Auto-completes entire functions
- Suggests optimal algorithms
- Learns from your coding style

## 3. Notion AI

For organizing your academic life:
- Summarize lecture notes
- Generate study schedules
- Create project documentation

## 4. Grammarly

Essential for:
- Report writing
- Email communication
- Research papers

## 5. Perplexity AI

Research assistant that:
- Provides cited sources
- Answers complex questions
- Summarizes research papers

## Ethical Considerations

- Always cite AI assistance
- Use as a learning aid, not replacement
- Verify generated code before using
- Understand the concepts, don't just copy

## Getting Started

Start with ChatGPT for conceptual learning, then gradually explore specialized tools for coding and research.
    `,
    author: {
      name: "Neha Sharma",
      avatar: "NS",
      role: "Tech Blogger",
    },
    date: "Mar 3, 2024",
    readTime: "6 min read",
    category: "AI & Tech",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    featured: false,
    tags: ["AI", "ChatGPT", "Productivity", "Learning Tools"],
  },
  {
    id: 5,
    slug: "building-first-fullstack-project",
    title: "Building Your First Full-Stack Project: A Beginner's Guide",
    excerpt: "Step-by-step tutorial to create a complete web application using React, Node.js, and MongoDB.",
    content: `
## Introduction

Building your first full-stack project can seem daunting, but with the right approach, it's achievable. This guide walks you through creating a complete web application.

## Tech Stack Overview

**Frontend:** React + Tailwind CSS
**Backend:** Node.js + Express
**Database:** MongoDB
**Deployment:** Vercel + Railway

## Step 1: Project Setup

\`\`\`bash
# Create React app
npx create-react-app my-app
cd my-app

# Install Tailwind
npm install -D tailwindcss
npx tailwindcss init
\`\`\`

## Step 2: Backend Setup

\`\`\`javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/myapp');

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
\`\`\`

## Step 3: Creating APIs

Build RESTful endpoints for:
- User authentication
- CRUD operations
- Data validation

## Step 4: Frontend Integration

Connect your React components to the backend using fetch or axios.

## Step 5: Deployment

1. Push code to GitHub
2. Deploy frontend on Vercel
3. Deploy backend on Railway
4. Configure environment variables

## Project Ideas

- Todo list application
- Blog platform
- E-commerce store
- Social media clone

Start simple and gradually add features!
    `,
    author: {
      name: "Rahul Verma",
      avatar: "RV",
      role: "Full Stack Developer",
    },
    date: "Feb 28, 2024",
    readTime: "10 min read",
    category: "Skill Exchange",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
    featured: false,
    tags: ["Full Stack", "React", "Node.js", "MongoDB", "Tutorial"],
  },
  {
    id: 6,
    slug: "time-management-semester-exams",
    title: "Time Management Tips for Semester Exams",
    excerpt: "Proven strategies to balance multiple subjects and ace your GTU examinations without burnout.",
    content: `
## The Challenge

Managing 6-8 subjects during semester exams while maintaining your sanity is tough. Here's how to do it effectively.

## 1. Create a Study Schedule

**Week 1-2:** Cover all subjects once
**Week 3:** Revise weak areas
**Week 4:** Solve previous papers

## 2. The 80/20 Rule

Focus on the 20% of topics that contribute to 80% of marks:
- Check weightage from syllabus
- Prioritize frequently asked questions
- Don't ignore any chapter completely

## 3. Active Learning Techniques

- Teach concepts to peers
- Create mind maps
- Practice problems, don't just read

## 4. Break Strategy

Follow the Pomodoro Technique:
- 25 minutes study
- 5 minutes break
- Long break after 4 cycles

## 5. Health Matters

- Sleep 7-8 hours
- Exercise daily
- Eat healthy meals
- Stay hydrated

## 6. Use Technology

- EduDisha's Study Planner
- Flashcard apps
- YouTube for visual learning

## Day Before Exam

- Light revision only
- No new topics
- Good sleep
- Prepare materials

Remember: Consistency beats cramming!
    `,
    author: {
      name: "Prof. Meera Patel",
      avatar: "MP",
      role: "Academic Counselor",
    },
    date: "Feb 25, 2024",
    readTime: "5 min read",
    category: "Academics",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
    featured: false,
    tags: ["Time Management", "Exams", "Study Tips", "Productivity"],
  },
];

export const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: "Rahul Patel",
    avatar: "RP",
    content: "This is super helpful! I applied for the GTU Merit Scholarship after reading this and got it. Thank you so much!",
    date: "Mar 11, 2024",
    likes: 24,
  },
  {
    id: 2,
    postId: 1,
    author: "Sneha Gupta",
    avatar: "SG",
    content: "Can you also include scholarships for OBC category students? That would be really helpful.",
    date: "Mar 10, 2024",
    likes: 12,
  },
  {
    id: 3,
    postId: 2,
    author: "Vikram Singh",
    avatar: "VS",
    content: "Amit's story is so inspiring! I just signed up for skill exchange on EduDisha. Hope to find a great mentor too.",
    date: "Mar 9, 2024",
    likes: 18,
  },
  {
    id: 4,
    postId: 2,
    author: "Priya Sharma",
    avatar: "PS",
    content: "I'm a mentor on the platform too. It's amazing how teaching others helps solidify your own knowledge!",
    date: "Mar 8, 2024",
    likes: 15,
  },
  {
    id: 5,
    postId: 3,
    author: "Karan Mehta",
    avatar: "KM",
    content: "The OSI model explanation is crystal clear. Saved for revision!",
    date: "Mar 6, 2024",
    likes: 21,
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPost: BlogPost): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, 3);
};

export const getPostComments = (postId: number): Comment[] => {
  return comments.filter(comment => comment.postId === postId);
};
