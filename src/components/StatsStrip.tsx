import { BarChart3, CheckCircle2, Clock, XCircle } from 'lucide-react';

export function StatsStrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white px-8 py-5 shrink-0 border-b border-[#E1E3E1]/50">
      
      {/* Total Posts */}
      <div className="group relative flex flex-col gap-1.5 rounded-[20px] bg-[#F0F4F9] p-5 transition-all hover:bg-[#E1E3E1]/40 border border-transparent">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-semibold text-[#44474E] tracking-wide uppercase">Total Posts</span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E3E3E3] group-hover:bg-[#D3E3FD] transition-colors">
            <BarChart3 size={16} strokeWidth={2.5} className="text-[#44474E] group-hover:text-[#0b57d0] transition-colors" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[32px] font-bold text-[#1F1F1F] leading-none tracking-tight">3</span>
          <span className="text-[12px] font-medium text-[#0b57d0] bg-[#D3E3FD]/50 px-2 py-0.5 rounded-full">+100%</span>
        </div>
      </div>
      
      {/* Published */}
      <div className="group relative flex flex-col gap-1.5 rounded-[20px] bg-[#E8F5E9]/60 p-5 transition-all hover:bg-[#C4EED0]/40 border border-transparent">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-semibold text-[#146C2E] tracking-wide uppercase">Published</span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C4EED0]/60 group-hover:bg-[#C4EED0] transition-colors">
            <CheckCircle2 size={16} strokeWidth={2.5} className="text-[#146C2E]" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[32px] font-bold text-[#146C2E] leading-none tracking-tight">3</span>
          <span className="text-[12px] font-medium text-[#146C2E] bg-[#C4EED0]/40 px-2 py-0.5 rounded-full">All clear</span>
        </div>
      </div>
      
      {/* Pending */}
      <div className="group relative flex flex-col gap-1.5 rounded-[20px] bg-[#FFF8E1]/60 p-5 transition-all hover:bg-[#FFECB3]/40 border border-transparent">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-semibold text-[#B8860B] tracking-wide uppercase">Pending</span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFECB3]/60 group-hover:bg-[#FFECB3] transition-colors">
            <Clock size={16} strokeWidth={2.5} className="text-[#B8860B]" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[32px] font-bold text-[#B8860B] leading-none tracking-tight">0</span>
          <span className="text-[12px] font-medium text-[#B8860B] bg-[#FFECB3]/40 px-2 py-0.5 rounded-full">In queue</span>
        </div>
      </div>
      
      {/* Failed */}
      <div className="group relative flex flex-col gap-1.5 rounded-[20px] bg-[#FCE8E6]/60 p-5 transition-all hover:bg-[#F9DEDC]/40 border border-transparent">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-semibold text-[#B3261E] tracking-wide uppercase">Failed</span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F9DEDC]/60 group-hover:bg-[#F9DEDC] transition-colors">
            <XCircle size={16} strokeWidth={2.5} className="text-[#B3261E]" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[32px] font-bold text-[#B3261E] leading-none tracking-tight">0</span>
          <span className="text-[12px] font-medium text-[#B3261E] bg-[#F9DEDC]/40 px-2 py-0.5 rounded-full">Needs action</span>
        </div>
      </div>

    </div>
  );
}
