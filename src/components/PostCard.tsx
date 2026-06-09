import React, { useState } from 'react';
import { MoreHorizontal, Image as ImageIcon, Copy, Edit2, Trash2, Send, Tag, User, Instagram, Facebook, Twitter, Linkedin, Layers, Video, ChevronLeft, ChevronRight, Film, Smartphone, Monitor, PlayCircle, Play } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: () => void;
  key?: React.Key;
}

export function PostCard({ post, onClick }: PostCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagesList = post.images && post.images.length > 0 ? post.images : [post.image];
  const hasCarousel = post.type === 'CAROUSEL' && imagesList.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'CAROUSEL': return <Layers className="w-3 h-3" />;
      case 'IMAGE': return <ImageIcon className="w-3 h-3" />;
      case 'VIDEO': return <Video className="w-3 h-3" />;
      case 'REEL': return <Film className="w-3 h-3" />;
      case 'STORY': return <Smartphone className="w-3 h-3" />;
      case 'COVER_IMAGE': return <Monitor className="w-3 h-3" />;
      default: return null;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-3.5 h-3.5 text-white" />;
      case 'facebook': return <Facebook className="w-3.5 h-3.5 text-white" />;
      case 'twitter': return <Twitter className="w-3.5 h-3.5 text-white" />;
      case 'linkedin': return <Linkedin className="w-3.5 h-3.5 text-white" />;
      default: return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500';
      case 'facebook': return 'bg-[#1877F2]';
      case 'twitter': return 'bg-[#1DA1F2]';
      case 'linkedin': return 'bg-[#0A66C2]';
      default: return 'bg-slate-800';
    }
  };

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#E1E3E1] bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#1D6FB8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6FB8]"
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      {/* HEADER ZONE */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${getPlatformColor(post.platform)}`}>
             {getPlatformIcon(post.platform)}
          </div>
          <div>
            <div className="text-[13px] font-medium text-[#1C1B1F] leading-tight">{post.accountName}</div>
            <div className="text-[11px] text-[#74777F] mt-0.5 leading-none">{post.date}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-[6px] bg-[#F1F3F5] px-2 py-1 text-[#44474E] shrink-0">
          {getTypeIcon(post.type)}
          <span className="text-[11px] font-medium uppercase tracking-wider">{post.type.replace('_', ' ').toLowerCase()}</span>
        </div>
      </div>

      {/* IMAGE ZONE */}
      <div className={`relative w-full overflow-hidden bg-slate-50 shrink-0 h-[172px]`}>
        <img 
          src={imagesList[currentImageIndex]} 
          alt={`Post thumbnail ${currentImageIndex + 1}`} 
          className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />

        {post.type === 'VIDEO' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
            <PlayCircle className="w-12 h-12 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" strokeWidth={1.5} />
          </div>
        )}

        {(post.type === 'REEL' || post.type === 'STORY') && (
          <div className="absolute inset-x-0 bottom-0 top-auto h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10">
            <div className="absolute bottom-3 left-3 text-white flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
               <Play className="w-4 h-4" fill="currentColor" />
               <span className="text-xs font-semibold tracking-wide drop-shadow-md">
                 {post.type === 'REEL' ? 'Reel' : 'Story'}
               </span>
            </div>
          </div>
        )}
        
        {hasCarousel && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
              {imagesList.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50'}`} 
                />
              ))}
            </div>
          </>
        )}

        {/* Quick action pill on hover */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-white/95 backdrop-blur-sm p-1 rounded-full border border-slate-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out shadow-sm delay-75 transform translate-y-1 group-hover:translate-y-0 z-10">
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary inset-0">
            <Copy className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary inset-0">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 inset-0">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BODY ZONE */}
      <div className="flex flex-col gap-3 p-3">
        <p className="text-[12px] leading-relaxed text-[#44474E] line-clamp-2">
          {post.caption}
        </p>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 rounded-[6px] border border-[#E1E3E1] px-2 py-1 text-[11px] text-[#74777F]">
            <Send className="w-3.5 h-3.5" />
            <span>{post.outletsCount} Outlets</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-[6px] border border-[#E1E3E1] px-2 py-1 text-[11px] text-[#74777F]">
            <Tag className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </div>
        </div>
      </div>

      {/* FOOTER ZONE */}
      <div className="flex items-center justify-between border-t border-[#F1F3F5] px-3 py-2.5 bg-white shrink-0 mt-auto">
        <div className="flex items-center gap-1.5 text-[11px] text-[#74777F]">
          <User className="w-3 h-3" />
          <span className="font-medium truncate max-w-[100px]">{post.postedBy}</span>
        </div>
        
        <div className="flex items-center">
          {post.status === 'Published' && (
            <div className="rounded-full bg-[#ECFDF5] px-2.5 py-1 text-[11px] font-medium text-[#065F46] flex items-center gap-1.5">
              Published ({post.publishedCount}/{post.totalCount})
            </div>
          )}
          {post.status === 'Pending' && (
            <div className="rounded-full bg-[#FFFBEB] px-2.5 py-1 text-[11px] font-medium text-[#92400E] flex items-center gap-1.5">
              Pending ({post.totalCount})
            </div>
          )}
          {post.status === 'Failed' && (
            <div className="rounded-full bg-[#FEF2F2] px-2.5 py-1 text-[11px] font-medium text-[#991B1B] flex items-center gap-1.5">
              Failed ({post.totalCount})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
