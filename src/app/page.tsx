"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

// Add CSS to hide scrollbars and typing effect
const hideScrollbarCSS = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .typing-text {
    animation: typing 2s steps(25, end), blink-caret 0.75s step-end infinite;
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid white;
  }
  
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  
  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: white; }
  }
  
  .hover\\:rotateY-5:hover {
    transform: rotateY(5deg);
  }
  
  .hover\\:rotateX-5:hover {
    transform: rotateX(5deg);
  }

  /* Loading animations */
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
  }

  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(-180deg); }
  }

  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(90deg); }
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float-delayed 3.5s ease-in-out infinite;
    animation-delay: 0.5s;
  }

  .animate-float-slow {
    animation: float-slow 4s ease-in-out infinite;
    animation-delay: 1s;
  }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = hideScrollbarCSS;
  document.head.appendChild(style);
}
type Platform = "facebook" | "twitter" | "instagram" | "indianTrade";

type Post = {
  content: string;
  media: string[];
  platforms: Platform[];
  userId: string;
  hashtags: string[];
  publishResults: unknown[];
  postedAt: string; // ISO string
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
};

const rawPosts = [
  {
    "content": "test",
    "media": [],
    "platforms": [
      "facebook"
    ],
    "userId": "16844",
    "hashtags": [],
    "publishResults": [],
    "postedAt": {
      "$date": "2025-04-11T08:03:42.428Z"
    },
    "createdAt": {
      "$date": "2025-04-11T08:03:42.441Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T08:03:42.441Z"
    },
    "__v": 0
  },
  {
    "content": "Twitter is fun with followers,\n\nIf you're  in tech, say hi,\n\n#Let'sconnect\n",
    "media": [],
    "platforms": [
      "twitter"
    ],
    "userId": "16844",
    "hashtags": [],
    "publishResults": [],
    "postedAt": {
      "$date": "2025-04-11T08:08:51.579Z"
    },
    "createdAt": {
      "$date": "2025-04-11T08:08:51.591Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T08:08:51.591Z"
    },
    "__v": 0
  },
  {
    "content": "Twitter is fun with followers,\n\nIf you're  in tech, say hi,\n\nLetsconnect\n",
    "media": [],
    "platforms": [
      "twitter"
    ],
    "userId": "16844",
    "hashtags": [],
    "publishResults": [],
    "postedAt": {
      "$date": "2025-04-11T08:09:29.079Z"
    },
    "createdAt": {
      "$date": "2025-04-11T08:09:29.082Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T08:09:29.082Z"
    },
    "__v": 0
  },
  {
    "content": "Twitter is fun with followers,\n\nIf you're  in tech, say hi,\n\n#Letsconnect\n",
    "media": [],
    "platforms": [
      "twitter"
    ],
    "userId": "16844",
    "hashtags": [],
    "publishResults": [],
    "postedAt": {
      "$date": "2025-04-11T08:10:12.689Z"
    },
    "createdAt": {
      "$date": "2025-04-11T08:10:12.693Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T08:10:12.693Z"
    },
    "__v": 0
  },
  {
    "content": "hare krishna",
    "media": [],
    "platforms": [
      "facebook"
    ],
    "userId": "16844",
    "hashtags": [],
    "publishResults": [],
    "postedAt": {
      "$date": "2025-04-11T08:10:59.308Z"
    },
    "createdAt": {
      "$date": "2025-04-11T08:10:59.310Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T08:10:59.310Z"
    },
    "__v": 0
  },
  {
    "content": "try it at aarekhit.com",
    "media": [],
    "platforms": [
      "facebook",
      "instagram"
    ],
    "userId": "16844",
    "hashtags": [],
    "publishResults": [],
    "postedAt": {
      "$date": "2025-04-11T08:21:45.339Z"
    },
    "createdAt": {
      "$date": "2025-04-11T08:21:45.346Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T08:21:45.346Z"
    },
    "__v": 0
  },
  {
    "content": "try it here",
    "media": [],
    "platforms": [
      "instagram"
    ],
    "userId": "16844",
    "hashtags": [],
    "publishResults": [],
    "postedAt": {
      "$date": "2025-04-11T08:22:20.837Z"
    },
    "createdAt": {
      "$date": "2025-04-11T08:22:20.847Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T08:22:20.847Z"
    },
    "__v": 0
  },
  {
    "userId": "16844",
    "content": "Hey there, my incredible Facebook family! 🌟 I've been doing some deep diving into a fascinating topic lately - Nuclear Reactors. 💥🔬 I've been completely captivated by the science behind it, the sheer power it holds and its potential impact on our future. I decided to channel my curiosity into words and voila, a brand new blog post was born! \n\nI invite you all to join me on this learning journey. Whether you're a science enthusiast, a trivia buff or just plain curious, I promise it'll be an enlightening read! 📚🤓 \n\nFeel free to share your thoughts, questions, or even your favorite science facts in the comments. Let's make this a space for learning and sharing! 🌍💡 \n\nStay curious, stay wonderful! #NuclearReactor #ScienceBlog #LearningJourney\n\n#PowerOfNuclear #FutureEnergy #ScienceIsFun #KnowledgeIsPower",
    "mediaUrls": [],
    "platforms": [
      "indianTrade"
    ],
    "hashtags": [
      "PowerOfNuclear",
      "FutureEnergy",
      "ScienceIsFun",
      "KnowledgeIsPower"
    ],
    "postTime": {
      "$date": "2025-04-11T12:42:08.761Z"
    },
    "status": "success",
    "createdAt": {
      "$date": "2025-04-11T12:42:08.788Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T12:42:08.788Z"
    },
    "__v": 0
  },
  {
    "userId": "16844",
    "content": "Hey there, friends! 🌞 I spent the day diving into a fascinating subject - nuclear reactors. I know, it sounds intense, but stick with me here. 💡\n\nDid you know that nuclear power plants produce around 10% of the world's electricity? And they do it without releasing carbon dioxide into the atmosphere. Cool, right? 🌍\n\nI've decided to put together a blog post to break down the complex world of nuclear reactors into something more digestible. I'd love for you to check it out and share your thoughts. Let's learn and grow together! 🚀\n\nStay curious, my friends. Knowledge is power, after all. 💪📚\n\n#CuriousMinds #NuclearPower #SustainableEnergy #BlogPost\n\n#KnowledgeIsPower #NuclearFacts #EcoFriendlyEnergy #ScienceBlogging",
    "mediaUrls": [],
    "platforms": [
      "indianTrade"
    ],
    "hashtags": [
      "KnowledgeIsPower",
      "NuclearFacts",
      "EcoFriendlyEnergy",
      "ScienceBlogging"
    ],
    "postTime": {
      "$date": "2025-04-11T12:45:05.078Z"
    },
    "status": "success",
    "createdAt": {
      "$date": "2025-04-11T12:45:05.090Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T12:45:05.090Z"
    },
    "__v": 0
  },
  {
    "userId": "16844",
    "content": "test",
    "mediaUrls": [],
    "platforms": [
      "indianTrade"
    ],
    "hashtags": [],
    "postTime": {
      "$date": "2025-04-11T12:51:14.965Z"
    },
    "status": "success",
    "createdAt": {
      "$date": "2025-04-11T12:51:14.984Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T12:51:14.984Z"
    },
    "__v": 0
  },
  {
    "userId": "16844",
    "content": "test",
    "mediaUrls": [],
    "platforms": [
      "indianTrade"
    ],
    "hashtags": [],
    "postTime": {
      "$date": "2025-04-11T13:02:09.946Z"
    },
    "status": "success",
    "createdAt": {
      "$date": "2025-04-11T13:02:09.958Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T13:02:09.958Z"
    },
    "__v": 0
  },
  {
    "userId": "16844",
    "content": "test",
    "mediaUrls": [],
    "platforms": [
      "indianTrade"
    ],
    "hashtags": [],
    "postTime": {
      "$date": "2025-04-11T13:34:05.730Z"
    },
    "status": "success",
    "createdAt": {
      "$date": "2025-04-11T13:34:05.734Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T13:34:05.734Z"
    },
    "__v": 0
  },
  {
    "userId": "16844",
    "content": "test",
    "mediaUrls": [],
    "platforms": [
      "indianTrade"
    ],
    "hashtags": [],
    "postTime": {
      "$date": "2025-04-11T13:40:21.183Z"
    },
    "status": "success",
    "createdAt": {
      "$date": "2025-04-11T13:40:21.206Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T13:40:21.206Z"
    },
    "__v": 0
  },
  {
    "userId": "16844",
    "content": "test",
    "mediaUrls": [],
    "platforms": [
      "indianTrade"
    ],
    "hashtags": [],
    "postTime": {
      "$date": "2025-04-11T13:43:34.308Z"
    },
    "status": "success",
    "createdAt": {
      "$date": "2025-04-11T13:43:34.326Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T13:43:34.326Z"
    },
    "__v": 0
  },
  {
    "userId": "16844",
    "content": "test. ",
    "mediaUrls": [],
    "platforms": [
      "indianTrade"
    ],
    "hashtags": [],
    "postTime": {
      "$date": "2025-04-11T13:44:29.849Z"
    },
    "status": "success",
    "createdAt": {
      "$date": "2025-04-11T13:44:29.863Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T13:44:29.863Z"
    },
    "__v": 0
  },
  {
    "userId": "16844",
    "content": "tes c",
    "mediaUrls": [],
    "platforms": [
      "indianTrade"
    ],
    "hashtags": [],
    "postTime": {
      "$date": "2025-04-11T13:45:04.473Z"
    },
    "status": "success",
    "createdAt": {
      "$date": "2025-04-11T13:45:04.479Z"
    },
    "updatedAt": {
      "$date": "2025-04-11T13:45:04.479Z"
    },
    "__v": 0
  },
];

function getIsoDate(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "$date" in (value as any)) {
    return String((value as any)["$date"]);
  }
  return "";
}

function normalizePosts(input: any[]): Post[] {
  return (Array.isArray(input) ? input : []).map((raw) => {
    const postedAt = getIsoDate(raw?.postedAt ?? raw?.postTime);
    return {
      content: String(raw?.content ?? ""),
      media: Array.isArray(raw?.media)
        ? raw.media
        : Array.isArray(raw?.mediaUrls)
          ? raw.mediaUrls
          : [],
      platforms: Array.isArray(raw?.platforms) ? raw.platforms : [],
      userId: String(raw?.userId ?? ""),
      hashtags: Array.isArray(raw?.hashtags) ? raw.hashtags : [],
      publishResults: Array.isArray(raw?.publishResults)
        ? raw.publishResults
        : [],
      postedAt,
      createdAt: getIsoDate(raw?.createdAt),
      updatedAt: getIsoDate(raw?.updatedAt),
      __v: Number(raw?.__v ?? 0),
    } as Post;
  });
}

const posts: Post[] = normalizePosts(rawPosts);

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  // Use consistent formatting to avoid hydration mismatch
  const year = date.getFullYear();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function truncateText(text: string, maxChars: number): string {
  const normalized = (text ?? "").trim().replace(/\s+/g, " ");
  if (normalized.length <= maxChars) return normalized;
  return normalized.slice(0, Math.max(0, maxChars - 1)).trimEnd() + "…";
}

// platform badges removed for image-first template

export default function Home() {
  const [isSmall, setIsSmall] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());
  const [scrollY, setScrollY] = useState(0);
  const [showHiranImage, setShowHiranImage] = useState(false);
  const [sliceAnimation, setSliceAnimation] = useState(false);
  const [currentImage, setCurrentImage] = useState<'elephant' | 'hiran'>('elephant');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const imageRefs = useRef<Map<number, HTMLImageElement | null>>(new Map());

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    // Initialize from current viewport
    setIsSmall(mq.matches);
    setVisibleCount(mq.matches ? 3 : 6);
    const onChange = (e: MediaQueryListEvent) => {
      setIsSmall(e.matches);
      setVisibleCount(e.matches ? 3 : 6);
    };
    // Listen
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange as any);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange as any);
    };
  }, []);

  // Continuous loop: elephant -> hiran -> elephant every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage === 'elephant') {
        // Switch to hiran with slice animation
        setSliceAnimation(true);
        setTimeout(() => {
          setCurrentImage('hiran');
          setShowHiranImage(true);
        }, 2000);
      } else {
        // Switch back to elephant
        setTimeout(() => {

          setCurrentImage('elephant');
          setShowHiranImage(false);
          setSliceAnimation(false);
        }, 2500);
      }
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, [currentImage]);

  useEffect(() => {
    const handleScroll = () => {
      imageRefs.current.forEach((imgRef) => {
        if (!imgRef) return;

        const rect = imgRef.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // How visible the image is within the viewport (0 = below screen, 1 = fully visible)
        const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);

        // Parallax movement — stronger but capped
        const maxOffset = 80; // You can tweak this (40–80 looks great)
        const parallaxOffset = (0.5 - progress) * maxOffset;

        // Apply cinematic movement with subtle zoom
        imgRef.style.transform = `translateY(${parallaxOffset}px) scale(1.12)`;

        //extra dynamic
        imgRef.style.objectPosition = `center ${(progress * 30).toFixed(1)}%`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const defaultVisibleCount = isSmall ? 3 : 6;
  const step = defaultVisibleCount;
  const visiblePosts = posts.slice(0, Math.min(visibleCount || defaultVisibleCount, posts.length));

  const handleMaximizeClick = (postIndex: number) => {
    setSelectedPost(posts[postIndex]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  // Simulate loading more posts (replace with actual API call)
  const loadMorePosts = useCallback(async () => {
    if (isLoading || !hasMorePosts) return;
    
    setIsLoading(true);
    
    // Simulate API delay (replace with actual fetch)
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Check if we have more posts to show
    const nextBatch = visibleCount + step;
    if (nextBatch >= posts.length) {
      setVisibleCount(posts.length); // Show all remaining posts
      setHasMorePosts(false);
    } else {
      setVisibleCount(nextBatch);
    }
    
    setIsLoading(false);
  }, [isLoading, hasMorePosts, visibleCount, step, posts.length]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !hasMorePosts) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Load more when user is 200px from bottom
      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts, isLoading, hasMorePosts]);
  return (
    <div className="min-h-dvh px-4 lg:px-12 py-6 lg:py-8 bg-gradient-to-br from-[#0b0f17] to-[#0a0a0a] sm:from-[#f8fafc] sm:to-[#eef2ff] dark:from-[#0b0f17] dark:to-[#0a0a0a]">
      <div className="mx-auto max-w-8xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-gray-900 dark:text-white">Posts</h1>
          <span className="text-sm text-gray-400 sm:text-foreground/60 dark:text-gray-400">{posts.length} total</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post, index) => (
            <article
              key={index}
              className="group relative rounded-2xl shadow-lg transition hover:shadow-xl bg-gray-800 sm:bg-white dark:bg-gray-800 h-[500px] sm:h-[495px]"
            >
              {/* Platform logos above image */}
              <div className="p-2 border-b border-gray-600 sm:border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {post.platforms.map((platform, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 flex items-center justify-center"
                        title={platform}
                      >
                        {platform === 'facebook' ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        ) : platform === 'twitter' ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1DA1F2">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        ) : platform === 'instagram' ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E4405F">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        ) : platform === 'indianTrade' ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF6B35">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                        ) : (
                          <span className="text-xs font-bold text-gray-600">
                            {String(platform).charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleMaximizeClick(index)}
                    className="p-1 rounded transition-colors"
                    title="View full post"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 hover:text-gray-500 dark:text-gray-600">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image section - full width */}
              <div className="relative w-auto h-100 bg-black overflow-hidden">
                {/* Random transition effects based on post index */}
                {index % 7 === 0 ? (
                  <>
                    {/* Ripple wave effect */}
                    <img
                      ref={(el) => { imageRefs.current.set(index, el) }}
                      src="/elephants.jpg"
                      alt="Post cover"
                      className="w-full h-full object-cover transition-all duration-1000 ease-out will-change-transform"
                      style={{
                        transform: currentImage === 'elephant' ? 'translateY(0px) scale(1.2)' : 'translateY(50px) scale(1.1)',
                        objectPosition: 'center 40%',
                        opacity: currentImage === 'elephant' ? '1' : '0',
                        clipPath: currentImage === 'elephant' ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)',
                        transition: 'opacity 1s ease-in-out, transform 1s ease-out, clip-path 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }}
                      loading="lazy"
                    />
                    <img
                      src="/hiran.jpg"
                      alt="Post cover"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out will-change-transform"
                      style={{
                        transform: currentImage === 'hiran' ? 'translateY(0px) scale(1.2)' : 'translateY(-50px) scale(1.1)',
                        objectPosition: 'center 40%',
                        opacity: currentImage === 'hiran' ? '1' : '0',
                        clipPath: currentImage === 'hiran' ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)',
                        transition: 'opacity 1s ease-in-out, transform 1s ease-out, clip-path 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }}
                      loading="lazy"
                    />
                  </>
                ) : index % 7 === 2 ? (
                  <>
                    {/* Scroll reveal effect */}
                    <img
                      ref={(el) => { imageRefs.current.set(index, el) }}
                      src="/elephants.jpg"
                      alt="Post cover"
                      className="w-full h-full object-cover transition-all duration-1000 ease-out will-change-transform"
                      style={{
                        transform: currentImage === 'elephant' ? 'translateY(0px) scale(1.2)' : 'translateY(50px) scale(1.1)',
                        objectPosition: 'center 40%',
                        opacity: currentImage === 'elephant' ? '1' : '0',
                        clipPath: currentImage === 'elephant' ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                        transition: 'opacity 1s ease-in-out, transform 1s ease-out, clip-path 1.2s ease-out'
                      }}
                      loading="lazy"
                    />
                    <img
                      src="/hiran.jpg"
                      alt="Post cover"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out will-change-transform"
                      style={{
                        transform: currentImage === 'hiran' ? 'translateY(0px) scale(1.2)' : 'translateY(-50px) scale(1.1)',
                        objectPosition: 'center 40%',
                        opacity: currentImage === 'hiran' ? '1' : '0',
                        clipPath: currentImage === 'hiran' ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                        transition: 'opacity 1s ease-in-out, transform 1s ease-out, clip-path 1.2s ease-out'
                      }}
                      loading="lazy"
                    />
                  </>
                ) : index % 7 === 4 ? (
                  <>
                    {/* Slice by slice effect */}
                    <img
                      ref={(el) => { imageRefs.current.set(index, el) }}
                      src="/elephants.jpg"
                      alt="Post cover"
                      className="w-full h-full object-cover transition-all duration-500 ease-out will-change-transform"
                      style={{
                        transform: 'translateY(0px) scale(1.2)',
                        objectPosition: 'center 40%',
                        opacity: currentImage === 'elephant' ? '1' : '0',
                        transition: 'opacity 0.5s ease-in-out'
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0">
                      {Array.from({ length: 8 }, (_, sliceIndex) => (
                        <div
                          key={sliceIndex}
                          className="absolute overflow-hidden transition-all duration-400 ease-out"
                          style={{
                            width: '100%',
                            height: '12.5%',
                            top: `${sliceIndex * 12.5}%`,
                            left: '0%',
                            transform: (sliceAnimation && currentImage === 'hiran')
                              ? 'translateX(0px) scaleY(1)'
                              : `translateX(${sliceIndex % 2 === 0 ? '-100%' : '100%'}) scaleY(0.3)`,
                            transitionDelay: `${sliceIndex * 150}ms`,
                            opacity: (sliceAnimation && currentImage === 'hiran') ? '1' : '0'
                          }}
                        >
                          <img
                            src="/hiran.jpg"
                            alt="Post cover"
                            className="w-full h-full object-cover"
                            style={{
                              transform: 'scale(1.2)',
                              objectPosition: 'center 40%',
                              marginTop: `-${sliceIndex * 12.5}%`,
                              height: '800%'
                            }}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Regular elephant image for other posts */
                  <img
                    ref={(el) => { imageRefs.current.set(index, el) }}
                    src="/elephants.jpg"
                    alt="Post cover"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out will-change-transform"
                    style={{ transform: 'translateY(0px) scale(1.2)', objectPosition: 'center 40%' }}
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 p-2">
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="relative z-10">
                    {expandedPosts.has(index) ? (
                      <div>
                        <p className="text-sm font-medium leading-4 text-white drop-shadow mb-1">
                          {post.content}
                        </p>
                        {post.hashtags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {post.hashtags.map((hashtag, idx) => (
                              <span
                                key={idx}
                                className="text-xs text-blue-300 hover:text-blue-200"
                              >
                                #{hashtag}
                              </span>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => {
                            const newExpanded = new Set(expandedPosts);
                            newExpanded.delete(index);
                            setExpandedPosts(newExpanded);
                          }}
                          className="text-xs text-gray-500 hover:text-gray-400 underline"
                        >
                          less
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium leading-5 text-white drop-shadow " title={post.content}>
                          {post.content.length > 60 ? `${post.content.substring(0, 60)}...` : post.content}
                        </p>
                        {(post.content.length > 60 || post.hashtags.length > 0) && (
                          <button
                            onClick={() => {
                              const newExpanded = new Set(expandedPosts);
                              newExpanded.add(index);
                              setExpandedPosts(newExpanded);
                            }}
                            className="text-xs text-gray-500 hover:text-gray-400 underline"
                          >
                            more
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Interaction buttons and date below image */}
              <div className="p-3 border-t border-gray-600 sm:border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <button className="text-red-500 hover:text-red-600 transition-colors" title="Like">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      <span className="text-sm text-gray-300 sm:text-gray-600 dark:text-gray-400">{((index * 7 + 3) % 50) + 1}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="text-gray-100 hover:text-blue-500 transition-colors" title="Comment">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                      <span className="text-sm text-gray-300 sm:text-gray-600 dark:text-gray-400">{((index * 5 + 2) % 20) + 1}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="text-gray-100 hover:text-green-500 transition-colors" title="Share">
                        <svg className="w-6 h-6 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                      <span className="text-sm text-gray-300 sm:text-gray-600 dark:text-gray-400">{((index * 3 + 1) % 15) + 1}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 sm:text-gray-500 dark:text-gray-400">
                    {formatDate(post.postedAt)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* Loading indicator with skeleton cards */}
        {isLoading && (
          <div className="mt-6">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
            
            {/* Skeleton loading cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: step }, (_, i) => (
                <div key={i} className="group relative rounded-2xl shadow-lg bg-white dark:bg-gray-800 h-[500px] sm:h-[495px] overflow-hidden">
                  {/* Platform logos skeleton */}
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                      </div>
                      <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    </div>
                  </div>

                  {/* Image skeleton with shimmer effect */}
                  <div className="relative w-auto h-100 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/30 rounded-full animate-float"></div>
                    <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/20 rounded-full animate-float-delayed"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-white/25 rounded-full animate-float-slow"></div>
                  </div>

                  {/* Content skeleton */}
                  <div className="absolute inset-x-0 bottom-0 p-2">
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="relative z-10">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4"></div>
                    </div>
                  </div>

                  {/* Bottom section skeleton */}
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                      </div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* End of posts message */}
        {/* {!hasMorePosts && visibleCount >= posts.length && (
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-foreground/60 backdrop-blur">
              No more posts to load
            </div>
          </div>
        )} */}

      </div>

      {/* Modal Overlay */}
      {showModal && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blurred Background */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />


          {/* Modal Content */}
          <div
            className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-[450px] w-full max-h-[90vh] sm:h-[94vh] overflow-y-auto overflow-x-hidden hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="pt-10">

              <div className="absolute top-3 left-3 z-10 flex items-center gap-1">
                {selectedPost.platforms.map((platform, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-7 flex items-center justify-center"
                    title={platform}
                  >
                    {platform === 'facebook' ? (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ) : platform === 'twitter' ? (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1DA1F2">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    ) : platform === 'instagram' ? (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#E4405F">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ) : platform === 'indianTrade' ? (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FF6B35">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    ) : (
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                        {String(platform).charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* X button overlay */}
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* logo and "x" button here */}

            {/* Image Section with X button */}
            <div className="relative pl-2 pr-2">
              {/* Default image if no media */}
              {selectedPost.media.length === 0 && (
                <img
                  src="/elephants.jpg"
                  alt="Post cover"
                  className="pt-11 w-full h-[350px] sm:h-[370px] scale-125 object-fill rounded-t-2xl"
                />
              )}

              {/* Media images if available */}
              {selectedPost.media.length > 0 && (
                <img
                  src={selectedPost.media[0]}
                  alt="Post cover"
                  className="pt-11 p-3 w-full h-[250px] sm:h-[370px] scale-125 object-fill rounded-t-2xl"
                />
              )}

              {/* Platform logos top-left */}

            </div>

            {/* Post Content */}
            <div className="p-4 pt-15">
              {/* Date Only */}
              <div className="mb-4">
                <p className="text-sm text-gray-400">
                  {formatDate(selectedPost.postedAt)}
                </p>
              </div>

              {/* Post Content */}
              <div className="prose dark:prose-invert mb-4">
                <p className="text-gray-300 leading-7 text-base">
                  {selectedPost.content}
                </p>
              </div>

              {/* Hashtags */}
              {selectedPost.hashtags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {selectedPost.hashtags.map((hashtag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                    >
                      #{hashtag}
                    </span>
                  ))}
                </div>
              )}


              {/* External Link */}
              <div className="pt-4 border-gray-200 lg:pl-30 pl-22 dark:border-gray-700">
                  <a 
                    href="#" 
                    className="inline-flex bg-gray-700 items-center justify-center px-4 py-2 text-[16px] font-medium text-gray-400 hover:text-blue-700 transition-colors rounded-lg"
                  >
                  View Full Details
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
