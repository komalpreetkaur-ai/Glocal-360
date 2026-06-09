import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TopbarProps {
  onCreatePost?: (view: 'create-image-post') => void;
}

export function Topbar({ onCreatePost }: TopbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const postTypes = [
    'Image Post',
    'Carousel Post',
    'Video Post',
    'Reels',
    'Story',
    'Cover Image'
  ];

  const handleCreateNew = (type: string) => {
    setIsDropdownOpen(false);
    if (type === 'Image Post' && onCreatePost) {
      onCreatePost('create-image-post');
    }
  };

  return (
    <header className="h-[72px] px-8 flex items-center justify-between bg-white shrink-0 border-b border-[#E1E3E1] z-20 relative">
      <h1 className="text-[20px] font-medium tracking-tight">Recent Posts</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#44474E]" />
          <input
            type="text"
            placeholder="Search by caption or account..."
            className="w-[280px] h-[40px] pl-10 pr-4 rounded-lg border border-[#C4C7C5] bg-[#F9FAFB] text-[13px] outline-none focus:ring-2 focus:ring-[#1D6FB8]"
          />
        </div>
        
        <div className="relative flex shadow-sm rounded-md" ref={dropdownRef}>
          <button 
            className="flex h-[40px] items-center gap-1.5 rounded-l-md bg-[#1D6FB8] pl-5 pr-3.5 text-[14px] font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
            onClick={() => handleCreateNew('Image Post')}
          >
            <span>+ New Post</span>
          </button>
          <div className="w-[1px] bg-blue-400/40 my-1.5" />
          <button 
            className="flex h-[40px] items-center rounded-r-md bg-[#1D6FB8] px-2 text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <ChevronDown className="h-[18px] w-[18px]" />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-48 rounded-[6px] border border-[#E1E3E1] bg-white py-2 shadow-lg z-50 overflow-hidden"
              >
                {postTypes.map((type) => (
                  <button
                    key={type}
                    className="w-full px-4 py-2.5 text-left text-[14px] text-[#44474E] hover:bg-[#F9FAFB] hover:text-[#1C1B1F] transition-colors"
                    onClick={() => handleCreateNew(type)}
                  >
                    {type}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
