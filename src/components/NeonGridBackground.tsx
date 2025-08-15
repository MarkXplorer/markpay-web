interface NeonGridBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const NeonGridBackground = ({ 
  children, 
  className = "" 
}: NeonGridBackgroundProps) => {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Background is already set in body via CSS */}
      
      {/* Optional overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/10 to-background/20 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};