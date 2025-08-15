interface NeonGridBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const NeonGridBackground = ({ 
  children, 
  className = "" 
}: NeonGridBackgroundProps) => {
  return (
    <div className={`relative min-h-screen grid-hover transition-all duration-500 ${className}`}>
      {/* Semi-futuristic radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/5 to-background/15 pointer-events-none" />
      
      {/* Subtle light focus in center */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};