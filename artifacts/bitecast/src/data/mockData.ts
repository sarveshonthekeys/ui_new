export interface Clip {
  id: string;
  title: string;
  author: string;
  podcastName: string;
  thumbnailColor: string;
  likes: number;
  views: number;
  bookmarks: number;
  duration: string;
  liked: boolean;
  saved: boolean;
  hashtags: string[];
  description: string;
}

export interface Playlist {
  id: string;
  title: string;
  clipCount: number;
  thumbnailColor: string;
  author: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  iconColor: string;
}

export const clips: Clip[] = [
  {
    id: "1",
    title: "Why you need to suffer in your mind",
    author: "Unknown",
    podcastName: "The Mind Podcast",
    thumbnailColor: "#1a1a1a",
    likes: 0,
    views: 0,
    bookmarks: 0,
    duration: "2:34",
    liked: false,
    saved: false,
    hashtags: ["#mindset", "#psychology", "#growth"],
    description: "Understanding the role of mental suffering in personal growth.",
  },
  {
    id: "2",
    title: "Lenin's Definition of Freedom: Freedom From Dissent",
    author: "Unknown",
    podcastName: "Philosophy Today",
    thumbnailColor: "#1c1c1c",
    likes: 0,
    views: 10,
    bookmarks: 0,
    duration: "3:12",
    liked: false,
    saved: false,
    hashtags: ["#philosophy", "#history", "#freedom"],
    description: "Exploring Lenin's controversial take on freedom and political dissent.",
  },
  {
    id: "3",
    title: "The 'My Way or the Highway' dogma",
    author: "Raj Shamani",
    podcastName: "Indian History shocking facts you never knew",
    thumbnailColor: "#181818",
    likes: 0,
    views: 0,
    bookmarks: 0,
    duration: "4:05",
    liked: false,
    saved: false,
    hashtags: ["#leadership", "#business", "#mindset"],
    description: "Raj Shamani discusses the dangers of rigid thinking in leadership.",
  },
  {
    id: "4",
    title: "The 'Heart' Brain Game That Changes Everything",
    author: "Mel Robbins",
    podcastName: "The Mel Robbins Podcast",
    thumbnailColor: "#202020",
    likes: 0,
    views: 0,
    bookmarks: 0,
    duration: "3:45",
    liked: false,
    saved: false,
    hashtags: ["#neuroscience", "#habits", "#motivation"],
    description: "How connecting with your heart changes your brain patterns.",
  },
  {
    id: "5",
    title: "Why you still need basic math skills? e...",
    author: "Unknown",
    podcastName: "Education Talks",
    thumbnailColor: "#151515",
    likes: 0,
    views: 0,
    bookmarks: 1,
    duration: "2:58",
    liked: false,
    saved: true,
    hashtags: ["#education", "#skills", "#math"],
    description: "The case for keeping basic math skills in the age of calculators.",
  },
  {
    id: "6",
    title: "I Want To Remove Every Slum In Mum...",
    author: "Unknown",
    podcastName: "Social Impact Stories",
    thumbnailColor: "#1e1e1e",
    likes: 0,
    views: 0,
    bookmarks: 0,
    duration: "5:20",
    liked: false,
    saved: true,
    hashtags: ["#social", "#impact", "#india"],
    description: "An inspiring story about urban development and social change in Mumbai.",
  },
  {
    id: "7",
    title: "Why mindset is actually a survival tool",
    author: "Unknown",
    podcastName: "The Mind Podcast",
    thumbnailColor: "#111111",
    likes: 1,
    views: 0,
    bookmarks: 1,
    duration: "3:10",
    liked: true,
    saved: true,
    hashtags: ["#mindset", "#survival", "#growth"],
    description: "How shifting your mindset can be a key to survival.",
  },
  {
    id: "8",
    title: "Do Black Holes Erase Our Existence?",
    author: "Unknown",
    podcastName: "Science Bites",
    thumbnailColor: "#0a0a0a",
    likes: 0,
    views: 0,
    bookmarks: 0,
    duration: "4:22",
    liked: false,
    saved: false,
    hashtags: ["#science", "#space", "#physics"],
    description: "What happens to information when it falls into a black hole?",
  },
  {
    id: "9",
    title: "Natural Selection Is the Blind Watch...",
    author: "Unknown",
    podcastName: "Science Bites",
    thumbnailColor: "#0f0f0f",
    likes: 0,
    views: 0,
    bookmarks: 0,
    duration: "3:50",
    liked: false,
    saved: false,
    hashtags: ["#evolution", "#biology", "#science"],
    description: "Richard Dawkins' famous analogy explained and explored.",
  },
  {
    id: "10",
    title: "Why Traditional Pricing is Dead: Th...",
    author: "Unknown",
    podcastName: "Business Bytes",
    thumbnailColor: "#161616",
    likes: 0,
    views: 0,
    bookmarks: 0,
    duration: "4:45",
    liked: false,
    saved: false,
    hashtags: ["#business", "#pricing", "#strategy"],
    description: "How subscription models and dynamic pricing are replacing traditional methods.",
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Business & Finance",
    description: "Entrepreneurship, investing, and business strategy",
    color: "#0f1a0a",
    iconColor: "#4ade80",
  },
  {
    id: "2",
    name: "Motivation & Mindset",
    description: "Mindset shifts, self-improvement, and peak performance",
    color: "#1a0f00",
    iconColor: "#fb923c",
  },
  {
    id: "3",
    name: "Science & Tech",
    description: "Scientific discoveries, and innovations",
    color: "#00101a",
    iconColor: "#38bdf8",
  },
  {
    id: "4",
    name: "History, Culture & Daily Affairs",
    description: "Insights, and current affairs",
    color: "#1a001a",
    iconColor: "#c084fc",
  },
  {
    id: "5",
    name: "Health & Fitness",
    description: "Physical health, fitness tips, and wellness strategies",
    color: "#1a0000",
    iconColor: "#f87171",
  },
  {
    id: "6",
    name: "Philosophy",
    description: "Deep thinking, ethics, and philosophical discussions",
    color: "#0a0a1a",
    iconColor: "#a78bfa",
  },
];

export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Socialism",
    clipCount: 10,
    thumbnailColor: "#1a1a1a",
    author: "Various",
  },
  {
    id: "2",
    title: "Stoicism",
    clipCount: 10,
    thumbnailColor: "#111111",
    author: "Various",
  },
  {
    id: "3",
    title: "The Future Mark Zuckerberg is Tryin...",
    clipCount: 9,
    thumbnailColor: "#0f1a1a",
    author: "Various",
  },
  {
    id: "4",
    title: "The Secret to Writing a Business ...",
    clipCount: 10,
    thumbnailColor: "#1a0f0f",
    author: "Various",
  },
  {
    id: "5",
    title: "The Truth About Debt",
    clipCount: 10,
    thumbnailColor: "#0a0a14",
    author: "Various",
  },
  {
    id: "6",
    title: "Truth about making money in India",
    clipCount: 40,
    thumbnailColor: "#14100a",
    author: "Various",
  },
  {
    id: "7",
    title: "Tyson and Dawkins",
    clipCount: 10,
    thumbnailColor: "#0a140a",
    author: "Various",
  },
  {
    id: "8",
    title: "What bothers physicists about bl...",
    clipCount: 40,
    thumbnailColor: "#0a0a0a",
    author: "Various",
  },
];

export const activityHistory = [
  { id: "1", clipTitle: "Do Black Holes Erase Our Existence?", timeAgo: "Just now" },
  { id: "2", clipTitle: "Natural Selection Is the Blind Watch...", timeAgo: "Just now" },
  { id: "3", clipTitle: "The 'My Way or the Highway' dogma", timeAgo: "1m ago" },
  { id: "4", clipTitle: "Lenin's Definition of Freedom: Freedo...", timeAgo: "1m ago" },
  { id: "5", clipTitle: "The 'Heart' Brain Game That Changes...", timeAgo: "2m ago" },
  { id: "6", clipTitle: "Why Traditional Pricing is Dead: Th...", timeAgo: "5m ago" },
  { id: "7", clipTitle: "Why mindset is actually a survival tool", timeAgo: "10m ago" },
];

export const quickStats = {
  totalClips: 17,
  published: 12,
  totalViews: 10,
  totalLikes: 1,
};
