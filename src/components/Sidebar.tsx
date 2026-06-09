import { useState } from 'react';
import { LayoutGrid, Clock, CalendarCheck, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SocionixLogo = ({ collapsed, scale = 1 }: { collapsed?: boolean, scale?: number }) => (
  <div className={`flex items-center justify-center transition-all ${collapsed ? 'w-fit mx-auto' : ''}`} style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
    {!collapsed && <span className="text-[24px] font-extrabold text-[#2C2C2C] tracking-tight leading-none">S</span>}
    <div className={`relative ${collapsed ? 'w-8 h-8' : 'w-[22px] h-[22px] mx-[1px]'} text-[#F97316] shrink-0`}>
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow-sm">
        <circle cx="50" cy="15" r="5"/>
        <circle cx="75" cy="25" r="4"/>
        <circle cx="85" cy="50" r="5"/>
        <circle cx="75" cy="75" r="4"/>
        <circle cx="50" cy="85" r="5"/>
        <circle cx="25" cy="75" r="4"/>
        <circle cx="15" cy="50" r="5"/>
        <circle cx="25" cy="25" r="4"/>

        <circle cx="50" cy="30" r="4"/>
        <circle cx="64" cy="36" r="3"/>
        <circle cx="70" cy="50" r="4"/>
        <circle cx="64" cy="64" r="3"/>
        <circle cx="50" cy="70" r="4"/>
        <circle cx="36" cy="64" r="3"/>
        <circle cx="30" cy="50" r="4"/>
        <circle cx="36" cy="36" r="3"/>
        
        <path d="M50 15 L50 30 M75 25 L64 36 M85 50 L70 50 M75 75 L64 64 M50 85 L50 70 M25 75 L36 64 M15 50 L30 50 M25 25 L36 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    </div>
    {!collapsed && <span className="text-[24px] font-extrabold text-[#2C2C2C] tracking-[-0.02em] leading-none">CIONIX</span>}
  </div>
);

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeId, setActiveId] = useState('recent');

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 88 : 288 }}
      className="z-20 flex flex-col border-r border-[#E1E3E1] bg-[#FCFDFD] py-5 shrink-0 h-screen relative"
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-9 flex h-7 w-7 items-center justify-center rounded-full border border-[#E1E3E1] bg-white text-[#44474E] shadow-sm hover:text-[#0b57d0] hover:bg-[#F0F4F9] z-10 transition-all hover:scale-105"
      >
        {isCollapsed ? <ChevronRight size={16} strokeWidth={2.5} /> : <ChevronLeft size={16} strokeWidth={2.5} />}
      </button>

      {/* Switch Platforms Area */}
      <div className="px-4 mt-4 mb-6">
        <button className={`flex items-center ${isCollapsed ? 'justify-center w-14 h-14 mx-auto rounded-full' : 'justify-between w-full h-16 px-4 rounded-[24px]'} bg-white border border-[#C7CFCF] outline-none focus:ring-2 focus:ring-[#0b57d0]/30 hover:bg-[#F0F4F9] transition-all shadow-sm group`}>
          {isCollapsed ? (
             <div className="flex items-center justify-center">
                <SocionixLogo collapsed={true} scale={1} />
             </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-start justify-center pt-0.5">
                  <span className="text-[10px] font-bold text-[#747881] uppercase tracking-widest pl-[1px] mb-[2px]">Workspace</span>
                  <SocionixLogo scale={0.7} />
                </div>
              </div>
              <ChevronDown size={20} className="text-[#44474E] group-hover:text-[#0b57d0] transition-colors" />
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-1.5 px-3 flex-1 overflow-hidden">
        <button
          onClick={() => setActiveId('recent')}
          className={`flex items-center ${isCollapsed ? 'justify-center w-14 h-14 mx-auto rounded-full' : 'w-full px-5 h-14 rounded-full gap-4'} transition-all duration-200 outline-none shrink-0 ${
            activeId === 'recent' 
              ? 'bg-[#C2E7FF] text-[#001D35]' 
              : 'text-[#44474E] hover:bg-[#E1E3E1]/50'
          }`}
        >
          <Clock size={24} strokeWidth={activeId === 'recent' ? 2.5 : 2} className={activeId === 'recent' ? 'text-[#001D35]' : 'text-[#44474E]'} />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className={`text-[14px] whitespace-nowrap ${activeId === 'recent' ? 'font-bold' : 'font-medium'}`}
              >
                Recent Posts
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={() => setActiveId('approvals')}
          className={`flex items-center ${isCollapsed ? 'justify-center w-14 h-14 mx-auto rounded-full' : 'w-full px-5 h-14 rounded-full gap-4'} transition-all duration-200 outline-none shrink-0 ${
            activeId === 'approvals' 
              ? 'bg-[#C2E7FF] text-[#001D35]' 
              : 'text-[#44474E] hover:bg-[#E1E3E1]/50'
          }`}
        >
          <CalendarCheck size={24} strokeWidth={activeId === 'approvals' ? 2.5 : 2} className={activeId === 'approvals' ? 'text-[#001D35]' : 'text-[#44474E]'} />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className={`text-[14px] whitespace-nowrap ${activeId === 'approvals' ? 'font-bold' : 'font-medium'}`}
              >
                Approvals
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="mt-auto flex flex-col gap-2 px-3 pt-3 overflow-hidden">
        <div className="h-[1px] bg-[#E1E3E1] mx-4 my-1"></div>

        <button className={`flex items-center shrink-0 ${isCollapsed ? 'justify-center w-14 h-14 mx-auto' : 'w-full p-2 pr-4 h-[68px] rounded-[32px] gap-3'} transition-all duration-200 text-[#1F1F1F] hover:bg-[#E1E3E1]/30 outline-none mt-1`}>
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#0b57d0] text-white font-bold text-[16px] shrink-0 shadow-sm">
            K
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex flex-col items-start overflow-hidden whitespace-nowrap"
              >
                <span className="text-[14px] font-bold leading-tight">Komalpreet</span>
                <span className="text-[12px] font-medium text-[#44474E] truncate w-full">komalpreet@adglobal.com</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
