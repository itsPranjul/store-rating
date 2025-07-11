export default function Card({ children, className = '' }) {
    return (
      <div className={`
        group relative overflow-hidden
        p-8 
        bg-gradient-to-br from-white/80 via-white/70 to-white/50
        backdrop-blur-xl 
        rounded-3xl 
        border border-white/20
        shadow-[0_8px_40px_rgba(0,0,0,0.12)] 
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        hover:scale-[1.02]
        transition-all duration-500 ease-out
        before:absolute before:inset-0 
        before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
        before:translate-x-[-100%] before:skew-x-12
        hover:before:translate-x-[100%] hover:before:duration-700
        ${className}
      `}>
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Top highlight */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    );
  }