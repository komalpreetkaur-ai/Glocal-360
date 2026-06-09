import { useState } from 'react';
import { ArrowLeft, Facebook, Instagram, Filter, Plus, Globe, ThumbsUp, MessageSquare, Share2, ChevronDown, Check, Image as ImageIcon, HelpCircle, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CreateImagePostProps {
  onBack: () => void;
}

export function CreateImagePost({ onBack }: CreateImagePostProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook']);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [publishType, setPublishType] = useState('publish-now');
  const [isFocusedTitle, setIsFocusedTitle] = useState(false);
  const [isFocusedCaption, setIsFocusedCaption] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState<string>('4:5');
  const [previewPlatform, setPreviewPlatform] = useState<'facebook' | 'instagram'>('facebook');

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => {
      const next = prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p];
      if (next.length > 0 && !next.includes(previewPlatform)) {
        setPreviewPlatform(next[0] as 'facebook' | 'instagram');
      }
      return next;
    });
  }

  const MAX_IG_CHARS = 2200;
  const HOOK_LIMIT = 125;
  const MAX_HASHTAGS = 30;

  const currentChars = caption.length;
  const hashtagsMatch = caption.match(/(?:^|\s)(#[a-zA-Z0-9_]+)/g);
  const currentHashtags = hashtagsMatch ? hashtagsMatch.length : 0;
  
  const isOverHashtagLimit = currentHashtags > MAX_HASHTAGS;
  const isOverCharLimit = selectedPlatforms.includes('instagram') && currentChars > MAX_IG_CHARS;
  const isPublishDisabled = isOverHashtagLimit || isOverCharLimit || selectedPlatforms.length === 0;

  const Ratios = [
    { id: '4:5', label: 'Vertical', tooltip: '1080×1350 px (Best for Mobile)' },
    { id: '3:4', label: 'Grid', tooltip: '1080×1440 px (Profile Native)' },
    { id: '1:1', label: 'Square', tooltip: '1080×1080 px (Universal)' },
    { id: '9:16', label: 'Story/Reel', tooltip: '1080×1920 px (Full-screen)' },
    { id: '1.91:1', label: 'Landscape', tooltip: '1080×566 px (Wide)' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex-1 overflow-auto bg-[#F4F7F9] flex flex-col z-20"
    >
      {/* Header */}
      <header className="flex h-[80px] shrink-0 items-center justify-between px-8 pt-4 pb-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-105 hover:shadow-md active:scale-95 text-[#4A4D54]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-[#1A1C20] leading-none">Create Post</h1>
            <span className="text-[13px] text-[#747881] mt-1 block">Image Post</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button 
             onClick={onBack}
             className="px-5 py-2.5 rounded-full text-[14px] font-medium text-[#4A4D54] hover:bg-slate-200/50 transition-colors"
           >
             Cancel
           </button>
           <button 
             disabled={isPublishDisabled}
             className={`px-6 py-2.5 rounded-full text-[14px] font-medium transition-all text-white ${
                isPublishDisabled 
                ? 'bg-[#CFD4DC] cursor-not-allowed shadow-none' 
                : 'bg-[#1A73E8] shadow-md shadow-blue-500/20 hover:bg-[#1557B0] hover:shadow-lg active:scale-95'
             }`}
           >
             {publishType === 'schedule' ? 'Schedule' : 'Publish'}
           </button>
        </div>
      </header>

      <div className="flex flex-1 p-8 pt-4 gap-8 items-start">
        {/* Right Column - Publishing & Preview */}
        <div className="flex w-[380px] flex-col gap-6 shrink-0 h-full">
          
          {/* Publishing Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8ECEF]">
            <h2 className="mb-4 text-[15px] font-medium text-[#1A1C20]">Publishing Options</h2>
            
            <div className="flex flex-col gap-3">
              <label 
                className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${
                  publishType === 'publish-now' ? 'border-blue-500 bg-blue-50/50' : 'border-[#E8ECEF] hover:bg-[#F4F7F9]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${publishType === 'publish-now' ? 'border-blue-500' : 'border-[#CFD4DC]'}`}>
                    {publishType === 'publish-now' && <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />}
                  </div>
                  <span className={`text-[14px] font-medium ${publishType === 'publish-now' ? 'text-blue-900' : 'text-[#4A4D54]'}`}>Publish Now</span>
                </div>
              </label>

              <label 
                className={`flex flex-col gap-3 cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                  publishType === 'schedule' ? 'border-blue-500 bg-blue-50/50' : 'border-[#E8ECEF] hover:bg-[#F4F7F9]'
                }`}
              >
                <div className="flex items-center justify-between" onClick={() => setPublishType('schedule')}>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${publishType === 'schedule' ? 'border-blue-500' : 'border-[#CFD4DC]'}`}>
                      {publishType === 'schedule' && <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />}
                    </div>
                    <span className={`text-[14px] font-medium ${publishType === 'schedule' ? 'text-blue-900' : 'text-[#4A4D54]'}`}>Schedule Content</span>
                  </div>
                </div>

                <AnimatePresence>
                  {publishType === 'schedule' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-8"
                    >
                      <input 
                        type="datetime-local" 
                        className="w-full mt-2 rounded-xl border-none bg-white p-3 text-[13px] shadow-sm outline-none ring-1 ring-[#CFD4DC] focus:ring-2 focus:ring-blue-500 transition-all font-medium text-[#2C313B]"
                        defaultValue={"2026-06-09T10:00"}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </label>
            </div>
          </div>

          {/* Phone Mockup Preview */}
          <div className="relative mx-auto mt-2 flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[38px] border-[10px] border-[#1A1C20] bg-white shadow-2xl h-[650px] max-h-full">
            {/* Phone Notch / Dynamic Island */}
            <div className="absolute left-1/2 top-0 z-20 h-[24px] w-[120px] -translate-x-1/2 rounded-b-[16px] bg-[#1A1C20]"></div>
            
            <div className="bg-[#F8F9FA] px-4 pb-2.5 pt-8 border-b border-[#E8ECEF] flex items-center justify-between z-10">
              <span className="text-[11px] font-bold tracking-widest text-[#747881] uppercase">Live Mockup</span>
              
              <div className="flex items-center gap-1 bg-[#E8ECEF] p-1 rounded-lg">
                <button 
                  onClick={() => setPreviewPlatform('facebook')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold transition-colors outline-none ${previewPlatform === 'facebook' ? 'bg-white text-blue-700 shadow-sm' : 'text-[#747881] hover:text-[#4A4D54]'}`}
                >
                  <Facebook className="w-3.5 h-3.5" />
                  FB
                </button>
                <button 
                  onClick={() => setPreviewPlatform('instagram')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold transition-colors outline-none ${previewPlatform === 'instagram' ? 'bg-white text-pink-600 shadow-sm' : 'text-[#747881] hover:text-[#4A4D54]'}`}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  IG
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar overflow-x-hidden relative bg-white">
              {/* Header */}
              <div className="p-4 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-[14px] shadow-inner ${previewPlatform === 'facebook' ? 'bg-blue-100 text-[#1A73E8]' : 'bg-gradient-to-tr from-amber-200 via-pink-500 to-fuchsia-600 text-white'}`}>
                    {previewPlatform === 'facebook' ? 'U' : 'IG'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#1A1C20] leading-tight">
                      {previewPlatform === 'facebook' ? 'Facebook Page' : 'instagram_user'}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#747881] mt-0.5">
                      <span>Just now</span>
                      {previewPlatform === 'facebook' && <Globe className="h-2.5 w-2.5" />}
                    </div>
                  </div>
                </div>
                <button className="text-[18px] font-bold text-[#4A4D54]">⋮</button>
              </div>
              
              {/* Facebook Title (if FB) */}
              {title && previewPlatform === 'facebook' && (
                <div className="px-4 pb-2">
                  <h3 className="font-semibold text-[14px] text-[#1A1C20]">{title}</h3>
                </div>
              )}

              {/* Instagram specific layout - Image usually comes first on IG, but text first on FB */}
              {previewPlatform === 'facebook' && (
                <div className="px-4 pb-3">
                  {caption ? (
                    <div className="text-[13px] text-[#2C313B] whitespace-pre-wrap leading-relaxed">
                      {currentChars > HOOK_LIMIT ? (
                        <span>
                          {caption.substring(0, HOOK_LIMIT)}... <span className="text-[#747881] cursor-pointer font-medium hover:underline">more</span>
                        </span>
                      ) : caption}
                    </div>
                  ) : (
                    <p className="text-[13px] text-[#A0A4AE] italic">Caption will appear here...</p>
                  )}
                </div>
              )}
              
              <div 
                className="bg-[#FAFBFF] w-full flex items-center justify-center border-y border-[#E8ECEF] overflow-hidden relative"
                style={{
                  aspectRatio: selectedRatio.replace(':', '/')
                }}
              >
                <div className="absolute inset-0 bg-blue-50/20 z-0" />
                <ImageIcon className="h-10 w-10 text-[#CFD4DC] relative z-10" />
                
                {selectedRatio === '9:16' && previewPlatform === 'instagram' && (
                   <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none z-20 flex flex-col justify-between p-4">
                      {/* Top UI Elements */}
                      <div className="flex items-center justify-between w-full">
                        <div className="h-1 bg-white/20 rounded-full w-full mb-3 flex gap-1">
                          <div className="h-full bg-white w-1/4 rounded-full shadow-[0_0_2px_rgba(0,0,0,0.5)]" />
                        </div>
                      </div>
                      
                      {/* Right action bar & bottom info */}
                      <div className="flex justify-between items-end w-full pb-4">
                        <div className="flex flex-col text-white w-3/4 gap-2">
                           <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-white/20 border border-white/50 backdrop-blur-sm" />
                             <span className="text-sm font-semibold drop-shadow-md">instagram_user</span>
                           </div>
                           <p className="text-[12px] drop-shadow-md line-clamp-2">{caption || "Caption will appear here..."}</p>
                           <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm w-fit text-[11px] font-medium flex items-center gap-1 border border-white/30">
                             🎵 Original Audio
                           </div>
                        </div>
                        <div className="flex flex-col items-center gap-4 text-white pb-6">
                           <div className="flex flex-col items-center gap-1"><ThumbsUp className="w-6 h-6 fill-white drop-shadow-md" /> <span className="text-xs font-medium">1.2k</span></div>
                           <div className="flex flex-col items-center gap-1"><MessageSquare className="w-6 h-6 fill-white drop-shadow-md" /> <span className="text-xs font-medium">48</span></div>
                           <div className="flex flex-col items-center gap-1"><Share2 className="w-6 h-6 drop-shadow-md text-white" /> <span className="text-xs font-medium">Share</span></div>
                           <div className="w-6 h-6 rounded border border-white mt-2 bg-white/20 backdrop-blur-sm" />
                        </div>
                      </div>
                   </div>
                )}
              </div>

              {/* Instagram specific layout - Text comes after image */}
              {previewPlatform === 'instagram' && selectedRatio !== '9:16' && (
                <div className="flex flex-col gap-2 mt-3 px-4 pb-2">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <ThumbsUp className="h-5 w-5 text-[#1A1C20] hover:text-pink-600 transition-colors" strokeWidth={1.5} />
                       <MessageSquare className="h-5 w-5 text-[#1A1C20]" strokeWidth={1.5} />
                       <Share2 className="h-5 w-5 text-[#1A1C20]" strokeWidth={1.5} />
                     </div>
                     <Bookmark className="h-5 w-5 text-[#1A1C20]" strokeWidth={1.5} />
                   </div>
                   <span className="text-[13px] font-semibold text-[#1A1C20]">0 likes</span>
                   
                   <div className="text-[13px] text-[#2C313B] whitespace-pre-wrap leading-relaxed mt-1">
                      <span className="font-semibold mr-1.5">instagram_user</span>
                      {caption ? (
                        currentChars > HOOK_LIMIT ? (
                          <span>
                            {caption.substring(0, HOOK_LIMIT)}... <span className="text-[#747881] cursor-pointer font-medium hover:opacity-80">more</span>
                          </span>
                        ) : caption
                      ) : (
                        <span className="text-[#A0A4AE] italic font-normal">Caption will appear here...</span>
                      )}
                    </div>
                </div>
              )}
              
              {/* Facebook actions */}
              {previewPlatform === 'facebook' && (
                <div className="flex items-center justify-between border-t border-[#E8ECEF] pt-3 px-4 mt-3 pb-8">
                  <button className="flex flex-1 items-center justify-center gap-2 text-[12px] font-medium text-[#747881] hover:bg-[#F0F2F5] transition-colors py-1.5 rounded-lg">
                    <ThumbsUp className="h-[18px] w-[18px]" strokeWidth={1.5} />
                    Like
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 text-[12px] font-medium text-[#747881] hover:bg-[#F0F2F5] transition-colors py-1.5 rounded-lg">
                    <MessageSquare className="h-[18px] w-[18px]" strokeWidth={1.5} />
                    Comment
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 text-[12px] font-medium text-[#747881] hover:bg-[#F0F2F5] transition-colors py-1.5 rounded-lg">
                    <Share2 className="h-[18px] w-[18px]" strokeWidth={1.5} />
                    Share
                  </button>
                </div>
              )}
              
              {/* Fake Home Indicator for iPhone mockup */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-[#CFD4DC] rounded-full"></div>
            </div>
          </div>
          
        </div>

        {/* Left Column - Form */}
        <div className="flex-1 flex flex-col gap-6 max-w-3xl">
          {/* Platforms Selection Card */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8ECEF]">
            <h2 className="mb-4 text-[15px] font-medium text-[#1A1C20] flex items-center gap-2">
              Select Platforms
            </h2>
            <div className="flex gap-4">
              <button 
                onClick={() => togglePlatform('facebook')}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 ${
                  selectedPlatforms.includes('facebook') 
                  ? 'bg-blue-50 border-2 border-blue-500 shadow-sm' 
                  : 'bg-[#F8F9FA] border-2 border-transparent hover:bg-slate-100'
                }`}
              >
                <Facebook className={`h-6 w-6 ${selectedPlatforms.includes('facebook') ? 'text-blue-600' : 'text-[#747881]'}`} />
                <span className={`text-[14px] font-medium ${selectedPlatforms.includes('facebook') ? 'text-blue-700' : 'text-[#4A4D54]'}`}>Facebook</span>
                {selectedPlatforms.includes('facebook') && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </button>
              
              <button 
                onClick={() => togglePlatform('instagram')}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 ${
                  selectedPlatforms.includes('instagram') 
                  ? 'bg-pink-50 border-2 border-pink-500 shadow-sm' 
                  : 'bg-[#F8F9FA] border-2 border-transparent hover:bg-slate-100'
                }`}
              >
                <Instagram className={`h-6 w-6 ${selectedPlatforms.includes('instagram') ? 'text-pink-600' : 'text-[#747881]'}`} />
                <span className={`text-[14px] font-medium ${selectedPlatforms.includes('instagram') ? 'text-pink-700' : 'text-[#4A4D54]'}`}>Instagram</span>
                {selectedPlatforms.includes('instagram') && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 h-5 w-5 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </button>
            </div>
            
            <div className="mt-6 flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#4A4D54]">Select Outlet</label>
              <div className="relative w-[300px]">
                <select className="w-full appearance-none rounded-xl border-none bg-[#F4F7F9] px-4 py-3 text-[14px] text-[#1A1C20] font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-shadow">
                  <option>All Outlets</option>
                  <option>Main Branch</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#747881] pointer-events-none" />
              </div>
            </div>
          </section>

          {/* Media & Content Card */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8ECEF] flex flex-col gap-8">
            
            {/* Image Upload */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-[15px] font-medium text-[#1A1C20]">Media Upload</h2>
                <div className="group relative">
                  <HelpCircle className="h-4 w-4 text-[#747881] cursor-pointer" />
                  <div className="absolute left-1/2 -top-2 -translate-y-full -translate-x-1/2 w-[260px] bg-[#2C313B] text-white text-[12px] p-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none shadow-xl">
                    JPG/PNG for images. MP4/MOV for video. Max sizes: Image (10MB), Video (100MB). Keep images under 1MB to prevent platform compression.
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#2C313B]"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 bg-[#F4F7F9] p-1.5 rounded-xl self-start overflow-x-auto custom-scrollbar">
                {Ratios.map(ratio => (
                  <button 
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio.id)}
                    title={ratio.tooltip}
                    className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap outline-none ${
                      selectedRatio === ratio.id 
                      ? 'bg-white text-blue-700 shadow-sm border border-[#CFD4DC]/50' 
                      : 'text-[#4A4D54] hover:bg-[#E8ECEF]'
                    }`}
                  >
                    {ratio.label} ({ratio.id})
                  </button>
                ))}
              </div>

              <div className="group relative flex h-[280px] w-full max-w-[400px] mx-auto cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-[#CFD4DC] bg-[#FAFBFF] transition-all hover:border-blue-400 hover:bg-blue-50/50 overflow-hidden">
                <div className="flex h-14 w-14 items-center justify-center text-blue-600 transition-transform group-hover:scale-110 mb-1">
                  <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <div className="text-center px-4 relative z-10">
                  <p className="text-[14px] font-medium text-[#2C313B]">Upload {selectedRatio === '9:16' ? 'Story/Reel' : 'Post'} Asset</p>
                  <p className="text-[12px] text-[#747881] mt-1">{Ratios.find(r => r.id === selectedRatio)?.tooltip}</p>
                </div>

                {selectedRatio === '9:16' && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-[250px] bg-red-500/5 border-b border-red-500/30 flex items-end justify-center pb-2 pointer-events-none">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-red-600 bg-white/90 px-2 py-0.5 rounded shadow-sm border border-red-100">App Overlay Area</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[340px] max-h-[40%] bg-red-500/5 border-t border-red-500/30 flex items-start justify-center pt-2 pointer-events-none">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-red-600 bg-white/90 px-2 py-0.5 rounded shadow-sm border border-red-100">Profile / Reply Area</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Typography Details */}
            <div>
              <h2 className="mb-4 text-[15px] font-medium text-[#1A1C20]">Post Details</h2>
              
              {/* Title Input - Modern M3 Filled */}
              <div className={`relative mb-5 transition-all duration-300 rounded-t-xl border-b-2 bg-[#F4F7F9] ${isFocusedTitle ? 'border-b-blue-600 bg-blue-50/30' : 'border-b-[#CFD4DC]'}`}>
                <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocusedTitle || title ? 'top-2 text-[11px] text-blue-600' : 'top-4 text-[14px] text-[#747881]'}`}>
                  Post Title
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  onFocus={() => setIsFocusedTitle(true)}
                  onBlur={() => setIsFocusedTitle(false)}
                  className="w-full bg-transparent px-4 pb-2 pt-6 text-[15px] text-[#1A1C20] placeholder-transparent outline-none"
                  placeholder="Post Title"
                />
              </div>

              {/* Caption Input */}
              <div className={`relative transition-all duration-300 rounded-t-xl border-b-2 bg-[#F4F7F9] ${isFocusedCaption ? 'border-b-blue-600 bg-blue-50/30' : 'border-b-[#CFD4DC]'}`}>
                <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocusedCaption || caption ? 'top-2 text-[11px] text-blue-600' : 'top-4 text-[14px] text-[#747881]'}`}>
                  Caption & Hashtags
                </label>
                <textarea 
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  onFocus={() => setIsFocusedCaption(true)}
                  onBlur={() => setIsFocusedCaption(false)}
                  className="h-[140px] w-full resize-none bg-transparent px-4 pb-8 pt-6 text-[15px] text-[#1A1C20] placeholder-transparent outline-none"
                  placeholder="Caption & Hashtags"
                />
                <div className="absolute bottom-2 right-2 left-4 flex justify-between items-end pb-1">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-medium ${currentChars > HOOK_LIMIT ? 'text-amber-600' : 'text-[#747881]'}`}>
                        Hook: {Math.min(currentChars, HOOK_LIMIT)}/{HOOK_LIMIT}
                      </span>
                      {currentChars > HOOK_LIMIT && (
                        <span className="text-[10px] font-medium text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shadow-sm">
                          Truncates on mobile
                        </span>
                      )}
                    </div>
                    {selectedPlatforms.includes('instagram') && (
                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] font-medium ${isOverCharLimit ? 'text-red-500' : 'text-[#747881]'}`}>
                          IG Chars: {currentChars}/{MAX_IG_CHARS}
                        </span>
                        <span className={`text-[11px] font-medium ${isOverHashtagLimit ? 'text-red-500' : 'text-[#747881]'}`}>
                          Hashtags: {currentHashtags}/{MAX_HASHTAGS}
                        </span>
                      </div>
                    )}
                  </div>
                  <button className="rounded-full bg-white px-3 py-1.5 shadow-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5 border border-[#E8ECEF] text-[12px] text-[#4A4D54]">
                    ✨ AI Enhance
                  </button>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </motion.div>
  );
}
