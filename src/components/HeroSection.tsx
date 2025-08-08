'use client';

import { useEffect, useState, useCallback } from 'react';

export default function HeroSection() {
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [showInteractionHint, setShowInteractionHint] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showHints = useCallback(() => {
    const timer1 = setTimeout(() => setShowInteractionHint(true), 1500);
    const timer2 = setTimeout(() => setShowScrollHint(true), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    return showHints();
  }, [showHints]);

  const handleIframeLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-30">
          <div className="text-center">
            <div className="font-['Pacifico'] text-pink-200 text-4xl mb-8">Loading Magic...</div>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce delay-150"></div>
              <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/3 to-black/10 z-10 pointer-events-none"></div>
      
      <iframe 
        src="https://my.spline.design/plasticlove-5wFOWLLs3rLvPVSfK8QrJq5X/" 
        frameBorder="0" 
        width="100%" 
        height="100%"
        className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        title="Interactive 3D Scene"
        allow="fullscreen"
        loading="lazy"
        onLoad={handleIframeLoad}
        style={{
          touchAction: 'manipulation',
          cursor: 'grab',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        onMouseDown={(e) => {
          (e.target as HTMLIFrameElement).style.cursor = 'grabbing';
        }}
        onMouseUp={(e) => {
          (e.target as HTMLIFrameElement).style.cursor = 'grab';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLIFrameElement).style.cursor = 'grab';
        }}
      />
      
      <div className="absolute top-6 left-0 right-0 z-20 pointer-events-none">
        <div className="bg-white/90 border border-pink-300/50 rounded-full mx-auto w-fit px-6 py-3 shadow-lg backdrop-blur-sm">
          <div className="font-['Pacifico'] text-pink-600 text-lg">
            For Radha ✨
          </div>
        </div>
      </div>
      
      {showInteractionHint && (
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20 animate-bounce pointer-events-none">
          <div className="bg-yellow-400 rounded-lg px-5 py-3 border-2 border-yellow-500 shadow-xl">
            <span className="text-yellow-900 text-sm font-semibold">🖱️ Drag to Explore</span>
          </div>
        </div>
      )}
      
      {showScrollHint && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce pointer-events-none">
          <div className="bg-pink-400 rounded-full px-6 py-3 border-2 border-pink-500 shadow-xl">
            <span className="text-pink-900 text-sm font-semibold">🌸 Scroll for More Magic</span>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="w-1 h-8 bg-gradient-to-b from-pink-400 to-transparent rounded-full animate-pulse shadow-md"></div>
      </div>
    </section>
  );
}