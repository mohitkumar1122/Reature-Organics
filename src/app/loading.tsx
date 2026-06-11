import React from "react";

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8FAF7]/90 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* Pulsing Leaf Icon Container */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 shadow-inner">
          {/* Inner glowing circle */}
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-md animate-pulse">
            <span className="text-3xl filter drop-shadow-sm">🌿</span>
          </div>
          {/* Pulsing outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-75" style={{ animationDuration: "2s" }} />
        </div>
        
        {/* Loading text */}
        <div className="text-center space-y-1.5 animate-pulse">
          <h2 className="font-serif font-bold text-darkText text-lg tracking-wide">
            Reature Organic
          </h2>
          <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
            Dispensing Wellness...
          </p>
        </div>
      </div>
    </div>
  );
}
