import { motion } from 'motion/react';
import { useState } from 'react';

export function TabBar() {
  const [activeTab, setActiveTab] = useState('recent');
  const tabs = [
    { id: 'recent', label: 'All Posts' },
    { id: 'published', label: 'Published' },
    { id: 'scheduled', label: 'Scheduled' }
  ];

  return (
    <div className="flex border-b border-[#E1E3E1] bg-white px-8 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative cursor-pointer py-3 px-1 mr-5 text-[14px] font-medium focus:outline-none transition-colors ${
            activeTab === tab.id ? 'text-[#1D6FB8]' : 'text-[#44474E] hover:text-[#1D6FB8]'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-[3px] bg-[#1D6FB8]"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
