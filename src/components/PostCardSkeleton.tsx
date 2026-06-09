import { motion } from 'motion/react';

export function PostCardSkeleton() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#E1E3E1] bg-white shadow-sm">
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
          repeatDelay: 0.1
        }}
      />

      {/* HEADER ZONE */}
      <div className="flex items-center justify-between p-3 relative z-0">
        <div className="flex items-center gap-2 w-full">
          <div className="h-8 w-8 rounded-full bg-[#F1F3F5] shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-3 w-1/2 rounded bg-[#F1F3F5]" />
            <div className="h-2 w-1/3 rounded bg-[#F1F3F5]" />
          </div>
        </div>
        <div className="h-6 w-16 rounded-[6px] bg-[#F1F3F5] shrink-0 ml-4" />
      </div>

      {/* IMAGE ZONE */}
      <div className="w-full h-[172px] bg-[#F1F3F5] shrink-0 relative z-0" />

      {/* BODY ZONE */}
      <div className="flex flex-col gap-3 p-3 relative z-0 mt-2">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full rounded bg-[#F1F3F5]" />
          <div className="h-3 w-5/6 rounded bg-[#F1F3F5]" />
        </div>
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-20 rounded-[6px] bg-[#F1F3F5]" />
          <div className="h-6 w-16 rounded-[6px] bg-[#F1F3F5]" />
        </div>
      </div>

      {/* FOOTER ZONE */}
      <div className="flex items-center justify-between border-t border-[#F1F3F5] px-3 py-2.5 bg-white shrink-0 relative z-0 mt-auto">
        <div className="h-4 w-28 rounded bg-[#F1F3F5]" />
        <div className="h-6 w-24 rounded-full bg-[#F1F3F5]" />
      </div>
    </div>
  );
}
