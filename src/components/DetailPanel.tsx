import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Star, Settings2, Edit2, Copy, Share, Send, User, Hash, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Post } from '../types';

interface DetailPanelProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailPanel({ post, isOpen, onClose }: DetailPanelProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-transparent z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'tween', 
              ease: [0.34, 1.56, 0.64, 1], 
              duration: 0.32 
            }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] border-l border-[#E1E3E1] bg-white z-50 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="h-[64px] px-6 flex items-center justify-between border-b border-[#E1E3E1] shrink-0 bg-white">
              <h2 className="text-[15px] font-medium">Post Details</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#1D6FB814] transition-all focus:outline-none"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto w-full px-6 py-6">
              {/* Caption Section */}
              <div className="mb-6 space-y-3">
                <div className="text-[12px] leading-relaxed text-[#44474E] relative group">
                  {post.caption}
                  <button className="text-[#1D6FB8] font-medium ml-1 inline text-[12px] hover:underline focus:outline-none">Read more</button>
                </div>
                <div className="inline-flex items-center rounded-full bg-[#DDE1FF] px-3 py-1 text-[11px] font-medium text-[#001466]">
                  {post.hashtags.length} hashtags
                </div>
              </div>

              {/* Image Carousel */}
              <div className="relative mb-8 overflow-hidden rounded-[16px] bg-[#F1F3F5] shrink-0 flex items-center justify-center">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className={`w-full object-cover ${
                    post.type === 'REEL' || post.type === 'STORY' ? 'aspect-[9/16]' : 
                    post.type === 'VIDEO' || post.type === 'COVER_IMAGE' ? 'aspect-video' : 'aspect-square'
                  }`} 
                />
                
                {/* Controls */}
                <button className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 bg-white/70 flex items-center justify-center text-[#1C1B1F] shadow-sm focus:outline-none">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20 bg-white/70 flex items-center justify-center text-[#1C1B1F] shadow-sm focus:outline-none">
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 z-10">
                  <div className="w-[12px] h-[6px] rounded-full bg-[#1D6FB8]"></div>
                  <div className="w-[6px] h-[6px] rounded-full bg-white/60"></div>
                  <div className="w-[6px] h-[6px] rounded-full bg-white/60"></div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="mb-8 grid grid-cols-2 gap-y-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#74777F]">Post Title</span>
                  <span className="text-[13px] font-medium text-[#1D6FB8]">{post.accountName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#74777F]">Category</span>
                  <div className="flex w-fit items-center gap-1 rounded-[6px] bg-[#FFFBEB] px-2 py-0.5 text-[12px] text-[#92400E]">
                    <Star className="w-3 h-3" />
                    {post.category}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#74777F]">Posted Outlets</span>
                  <span className="text-[13px] font-medium text-[#1D6FB8]">{post.outletsCount} Outlets</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#74777F]">Posted By</span>
                  <span className="text-[13px] font-medium text-[#1D6FB8]">{post.postedBy}</span>
                </div>
              </div>

              {/* Status & Stats Row */}
              <div className="mb-6">
                <div className="bg-slate-50/50 border border-slate-100 rounded-[12px] p-4 flex flex-wrap items-center gap-3">
                  {post.publishedCount > 0 ? (
                    <div className="px-3 py-1 bg-status-published-bg text-status-published-text rounded-full text-[12px] font-medium flex items-center gap-1.5 shadow-sm shadow-emerald-900/5">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                       Published ({post.publishedCount}/{post.totalCount})
                    </div>
                  ) : null}
                  
                  {/* Conditional Text when zero stats */}
                  <div className="text-[12px] text-slate-500 font-medium">
                    No rejections, failures, or pending approvals.
                  </div>
                </div>
              </div>

              {/* Outlet Table */}
              <div className="pb-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#1C1B1F]">Outlet Performance</h3>
                  <button className="flex items-center gap-1.5 text-[11px] font-medium text-[#1D6FB8] focus:outline-none">
                    <Settings2 className="w-3.5 h-3.5" />
                    Filters
                  </button>
                </div>
                
                <div className="overflow-hidden rounded-lg border border-[#E1E3E1]">
                  <table className="w-full text-left text-[12px]">
                    <thead className="bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest text-[#74777F]">
                      <tr>
                        <th className="px-3 py-2">Outlet Name</th>
                        <th className="px-3 py-2">Time of Posting</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2 text-right">Platform</th>
                      </tr>
                    </thead>
                    <tbody>
                      {post.outlets.map((outlet, i) => (
                        <React.Fragment key={outlet.id}>
                          <tr 
                            className={`cursor-pointer border-t border-[#F1F3F5] ${i % 2 === 1 ? 'bg-[#F1F3F5]/40' : 'bg-white'}`}
                            onClick={() => setExpandedRow(expandedRow === outlet.id ? null : outlet.id)}
                            role="button"
                            tabIndex={0}
                            aria-expanded={expandedRow === outlet.id}
                          >
                            <td className="px-3 py-3 text-[#1C1B1F]">{outlet.name}</td>
                            <td className="px-3 py-3 text-[#44474E]">{outlet.time}</td>
                            <td className="px-3 py-3">
                              <span className="rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[11px] text-[#065F46]">
                                {outlet.status}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-right text-[#44474E]">
                              IG
                            </td>
                          </tr>
                          {/* Expanded content */}
                          <AnimatePresence>
                            {expandedRow === outlet.id && (
                              <motion.tr
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-slate-50 overflow-hidden"
                              >
                                <td colSpan={4} className="p-0 border-t border-slate-200/50">
                                  <div className="px-8 py-5 grid grid-cols-2 gap-y-5 gap-x-8">
                                    <div>
                                      <div className="text-[11px] font-medium uppercase tracking-[0.05em] text-slate-400 mb-1">Code</div>
                                      <div className="text-[13px] font-medium text-slate-900">{outlet.code}</div>
                                    </div>
                                    <div>
                                      <div className="text-[11px] font-medium uppercase tracking-[0.05em] text-slate-400 mb-1">Zone</div>
                                      <div className="text-[13px] font-medium text-slate-900">{outlet.zone}</div>
                                    </div>
                                    <div>
                                      <div className="text-[11px] font-medium uppercase tracking-[0.05em] text-slate-400 mb-1">Region</div>
                                      <div className="text-[13px] font-medium text-slate-900">{outlet.region}</div>
                                    </div>
                                    <div>
                                      <div className="text-[11px] font-medium uppercase tracking-[0.05em] text-slate-400 mb-1">City</div>
                                      <div className="text-[13px] font-medium text-slate-900">{outlet.city}</div>
                                    </div>
                                  </div>
                                </td>
                              </motion.tr>
                            )}
                          </AnimatePresence>
                        </React.Fragment>
                      ))}
                      {post.outlets.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-10 text-center text-slate-400 text-[13px] bg-slate-50/50">
                            No outlet details available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sticky Action Bar */}
            <div className="absolute bottom-0 flex h-[64px] w-full items-center gap-3 border-t border-[#E1E3E1] bg-white px-6">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#C4C7C5] h-10 text-[13px] font-medium text-[#1D6FB8] hover:bg-[#1D6FB808]">
                Edit post
              </button>
              <button className="flex h-10 items-center justify-center rounded-full px-4 text-[13px] font-medium text-[#44474E]">
                Duplicate
              </button>
              <button className="flex items-center gap-2 text-[13px] font-medium text-[#44474E]">
                <Share className="w-4 h-4" />
                Share
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
