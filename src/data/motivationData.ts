export interface MotivationQuote {
  id: number;
  quote: string;
  author: string;
  category: "study" | "success" | "perseverance" | "goals" | "academic";
  isForIncompleteTask?: boolean;
}

export const motivationQuotes: MotivationQuote[] = [
  // General Study Motivation
  {
    id: 1,
    quote: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
    category: "study"
  },
  {
    id: 2,
    quote: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
    category: "success"
  },
  {
    id: 3,
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: "perseverance"
  },
  {
    id: 4,
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "goals"
  },
  {
    id: 5,
    quote: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    category: "academic"
  },
  
  // Quotes for incomplete tasks
  {
    id: 6,
    quote: "You don't have to be great to get started, but you have to get started to be great.",
    author: "Les Brown",
    category: "perseverance",
    isForIncompleteTask: true
  },
  {
    id: 7,
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "goals",
    isForIncompleteTask: true
  },
  {
    id: 8,
    quote: "Procrastination is the thief of time. Start now!",
    author: "Edward Young",
    category: "study",
    isForIncompleteTask: true
  },
  {
    id: 9,
    quote: "A year from now you may wish you had started today.",
    author: "Karen Lamb",
    category: "goals",
    isForIncompleteTask: true
  },
  {
    id: 10,
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "perseverance",
    isForIncompleteTask: true
  },
  
  // More academic motivation
  {
    id: 11,
    quote: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
    category: "academic"
  },
  {
    id: 12,
    quote: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
    category: "academic"
  },
  {
    id: 13,
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "perseverance"
  },
  {
    id: 14,
    quote: "Your limitation—it's only your imagination.",
    author: "Unknown",
    category: "goals"
  },
  {
    id: 15,
    quote: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown",
    category: "study",
    isForIncompleteTask: true
  },
  
  // More motivational quotes
  {
    id: 16,
    quote: "Great things never come from comfort zones.",
    author: "Unknown",
    category: "goals"
  },
  {
    id: 17,
    quote: "Dream it. Wish it. Do it.",
    author: "Unknown",
    category: "goals",
    isForIncompleteTask: true
  },
  {
    id: 18,
    quote: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown",
    category: "success",
    isForIncompleteTask: true
  },
  {
    id: 19,
    quote: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
    category: "success"
  },
  {
    id: 20,
    quote: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown",
    category: "perseverance",
    isForIncompleteTask: true
  }
];

// Helper functions
export const getRandomQuote = (): MotivationQuote => {
  const randomIndex = Math.floor(Math.random() * motivationQuotes.length);
  return motivationQuotes[randomIndex];
};

export const getQuoteForIncompleteTask = (): MotivationQuote => {
  const incompleteTaskQuotes = motivationQuotes.filter(q => q.isForIncompleteTask);
  const randomIndex = Math.floor(Math.random() * incompleteTaskQuotes.length);
  return incompleteTaskQuotes[randomIndex];
};

export const getQuotesByCategory = (category: string): MotivationQuote[] => {
  return motivationQuotes.filter(q => q.category === category);
};