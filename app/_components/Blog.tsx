"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  icon?: string;
  hasSearch?: boolean;
  url: string;
  date: string; 
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Minimalism in UI Design",
    description:
      "Explore how simplicity in user interfaces can lead to better user experiences and cleaner code.",
    icon: "Aa",
    url: "/blog/minimalism-ui-design",
    date: "January 1, 2023", 
  },
  {
    id: "2",
    title: "Semantic Search in Modern Web Apps",
    description:
      "Implementing advanced search capabilities in web applications using natural language processing.",
    hasSearch: true,
    url: "/blog/semantic-search",
    date: "February 15, 2023",
  },
  {
    id: "3",
    title: "Visualizing Data with React and D3",
    description:
      "A deep dive into creating interactive data visualizations using React and D3.js libraries.",
    icon: "📊",
    url: "/blog/react-d3-visualization",
    date: "March 10, 2023", 
  },
];

const BlogPost = ({ post }: { post: BlogPost }) => {
  return (
    <a
      href={post.url}
      className="h-28 rounded-xl p-4 flex items-center space-x-4 border border-[#2E2E2E] hover:border-blue-400 transition-colors relative overflow-hidden"
    >
      <div className="max-w-80 group relative z-10">
        <div className="flex justify-between items-start">
          <h3 className="item-title mb-1">{post.title}</h3>
        </div>
        <p className="item-description">{post.description}</p>
        <div className="flex items-center mt-2 justify-between text-xs">
          <div className="flex items-center text-blue-400">
            Read more
            <ArrowUpRight className="ml-1 inline w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <span className="ml-2 text-[#a1a1a1]">{post.date}</span>
        </div>
      </div>
    </a>
  );
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<
    "Technical" | "Philosophical"
  >("Technical");

  const philosophicalPosts = blogPosts.filter((post) => post.hasSearch);
  const technicalPosts = blogPosts.filter((post) => !post.hasSearch);

  const filteredPosts =
    selectedCategory === "Technical" ? technicalPosts : philosophicalPosts;

  return (
    <>
      <div className="flex items-center justify-between mb-4 mt-12">
        <h2 className="flex items-center font-semibold text-white group">
          <BookOpen className="section-title-icon mr-2" />
          Blog Posts
          <ArrowUpRight className="inline ml-1 w-5 h-5 text-neutral-500 group-hover:translate-x-1 transition-transform" />
        </h2>
        <div className="flex items-center space-x-1 p-1 bg-[#2E2E2E] rounded-full text-xs font-semibold">
          <label
            className={`flex items-center cursor-pointer transition-colors duration-300 rounded-full py-1 px-3 ${
              selectedCategory === "Technical"
                ? "bg-blue-400 text-white"
                : "bg-black text-gray-400"
            }`}
            onClick={() => setSelectedCategory("Technical")}
          >
            Technical
          </label>
          <label
            className={`flex items-center cursor-pointer transition-colors duration-300 rounded-full py-1 px-3 ${
              selectedCategory === "Philosophical"
                ? "bg-blue-400 text-white"
                : "bg-black text-gray-400"
            }`}
            onClick={() => setSelectedCategory("Philosophical")}
          >
            Philosophical
          </label>
        </div>
      </div>
      <div className="overflow-x-auto relative overflow-y-hidden">
        <div
          className="flex space-x-4"
          style={{
            width: "100%",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filteredPosts.map((post, index) => (
            <div key={index} className="flex-shrink-0">
              <BlogPost post={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
