import React from 'react';

interface LoaderGlowProps {
  text?: string;
  className?: string;
}

export const LoaderGlow = ({ 
  text = "Memproses...", 
  className = "" 
}: LoaderGlowProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative">
        {/* Outer glow ring */}
        <div className="w-16 h-16 rounded-full border-4 border-transparent animate-glow-pulse" />
        
        {/* Spinning ring */}
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-loader" />
        
        {/* Inner dot */}
        <div className="absolute inset-0 w-16 h-16 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-foreground font-medium">{text}</p>
        <div className="flex items-center justify-center mt-2 space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
        </div>
      </div>
    </div>
  );
};