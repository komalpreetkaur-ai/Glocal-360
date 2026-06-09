import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { UtilityRow } from './components/UtilityRow';
import { StatsStrip } from './components/StatsStrip';
import { TabBar } from './components/TabBar';
import { PostCard } from './components/PostCard';
import { PostCardSkeleton } from './components/PostCardSkeleton';
import { DetailPanel } from './components/DetailPanel';
import { CreateImagePost } from './components/CreateImagePost';
import { mockPosts } from './data';
import { Post } from './types';
import { motion } from 'motion/react';
import { FileHeart } from 'lucide-react';

export default function App() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'create-image-post'>('dashboard');
  const [filters, setFilters] = useState<{ postedBy: string[], platform: string[], postType: string[], dateRange: string }>({
    postedBy: [], platform: [], postType: [], dateRange: 'Last 30 Days'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = posts.filter(post => {
    let match = true;
    
    if (filters.postType.length > 0) {
      if (!filters.postType.includes(post.type === 'COVER_IMAGE' ? 'Cover Image' : post.type.charAt(0) + post.type.slice(1).toLowerCase())) {
        match = false;
      }
    }
    
    if (filters.platform.length > 0) {
      if (!filters.platform.map(p => p.toLowerCase()).includes(post.platform)) {
        match = false;
      }
    }

    if (filters.postedBy.length > 0) {
      // Mock data postedBy: 'admin' | 'user' | 'sarah'. AGL/Brands/Dealer don't match, so let's just make it a generic fallback check mapping 'admin' to 'AGL', etc. to demonstrate it works.
      const postedByMap: Record<string, string> = { 'admin': 'AGL', 'user': 'Brands', 'sarah': 'Dealer' };
      const mappedRole = postedByMap[post.postedBy] || post.postedBy;
      if (!filters.postedBy.includes(mappedRole)) {
        match = false;
      }
    }

    if (filters.dateRange && filters.dateRange !== 'All Time') {
      const postDate = new Date(post.date);
      const now = new Date();
      // Calculate start of 'today' for accurate "Today" comparison if needed, or simple diff:
      const timeDiff = now.getTime() - postDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      
      if (filters.dateRange === 'Today' && (postDate.getDate() !== now.getDate() || postDate.getMonth() !== now.getMonth() || postDate.getFullYear() !== now.getFullYear())) {
        match = false;
      } else if (filters.dateRange === 'Last 7 Days' && daysDiff > 7) {
        match = false;
      } else if (filters.dateRange === 'Last 30 Days' && daysDiff > 30) {
        match = false;
      } else if (filters.dateRange === 'Last 90 Days' && daysDiff > 90) {
        match = false;
      } else if (filters.dateRange.startsWith('Custom:')) {
        const datesStr = filters.dateRange.replace('Custom: ', '');
        const [startStr, endStr] = datesStr.split(' to ');
        if (startStr && endStr) {
          const startDate = new Date(startStr);
          const endDate = new Date(endStr);
          endDate.setHours(23, 59, 59, 999);
          if (postDate < startDate || postDate > endDate) {
            match = false;
          }
        }
      }
    }

    return match;
  });

  // Background dimension scaling logic when panel is open
  const mainScale = selectedPost ? 0.98 : 1;

  return (
    <div className="flex h-screen bg-[#F1F3F5] text-[#1C1B1F] overflow-hidden">
      <Sidebar />
      
      <motion.main 
        className="relative flex-1 flex flex-col min-w-0 bg-[#F1F3F5] origin-right transition-transform"
        animate={{ scale: mainScale }}
        transition={{ type: 'tween', ease: [0.34, 1.56, 0.64, 1], duration: 0.3 }}
      >
        {selectedPost && (
          <div className="absolute inset-0 z-30 bg-black/10 pointer-events-none transition-opacity duration-300" />
        )}
        
        {currentView === 'dashboard' ? (
          <>
            <Topbar onCreatePost={setCurrentView} />
            <div className="flex-1 overflow-y-auto">
              <UtilityRow filters={filters} onFilterChange={setFilters} />
              <StatsStrip />
              <TabBar />
              
              <div className="p-8">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <PostCardSkeleton key={`skeleton-${i}`} />
                    ))}
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
                    {filteredPosts.map(post => (
                      <PostCard 
                        key={post.id} 
                        post={post} 
                        onClick={() => setSelectedPost(post)} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5 outline outline-[8px] outline-slate-50">
                      <FileHeart className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-[18px] font-medium text-slate-900 mb-1.5">No posts yet</h3>
                    <p className="text-[13px] text-slate-500 mb-6 max-w-sm">
                      You haven't created any posts. Why not start now and engage your audience?
                    </p>
                    <button className="h-10 px-8 bg-primary text-white text-[14px] font-medium rounded-full hover:brightness-110 active:scale-[0.97] transition-all shadow-sm">
                      Create First Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <CreateImagePost onBack={() => setCurrentView('dashboard')} />
        )}
      </motion.main>

      <DetailPanel 
        post={selectedPost} 
        isOpen={!!selectedPost} 
        onClose={() => setSelectedPost(null)} 
      />
    </div>
  );
}
