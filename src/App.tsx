import { useRef, useState, type PropsWithChildren } from "react";
import {
  m,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import HeroSection from "./components/HeroSection";

const DURATION_SECONDS = 0.6;
const MAX_DISPLACEMENT = 300;
const OPACITY_CHANGE_START = 0.5;
const transition = {
  duration: DURATION_SECONDS,
  ease: (time: number) => 1 - Math.pow(1 - time, 3),
};

export function ThanosSnapEffect({
  children,
  onSnapComplete,
}: PropsWithChildren<{ onSnapComplete: () => void }>) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const dissolveTargetRef = useRef<HTMLDivElement>(null);
  const displacement = useMotionValue(0);

  useMotionValueEvent(displacement, "change", (latest) => {
    displacementMapRef.current?.setAttribute("scale", latest.toString());
  });

  const handleClick = async () => {
    if (scope.current.dataset.isAnimating === "true") return;
    scope.current.dataset.isAnimating = "true";

    await Promise.all([
      animate(
        dissolveTargetRef.current!,
        { scale: 1.2, opacity: [1, 1, 0] },
        { ...transition, times: [0, OPACITY_CHANGE_START, 1] }
      ),
      animate(displacement, MAX_DISPLACEMENT, transition),
    ]);

    setTimeout(() => {
      animate(
        dissolveTargetRef.current!,
        { scale: 1, opacity: 1 },
        { duration: 0 }
      );
      displacement.set(0);
      scope.current.dataset.isAnimating = "false";
      if (onSnapComplete) onSnapComplete();
    }, 500);
  };

  return (
    <div ref={scope}>
      <m.div
        ref={dissolveTargetRef}
        onClick={handleClick}
        style={{ filter: "url(#dissolve-filter)" }}
        className="cursor-pointer"
      >
        {children}
      </m.div>
      <svg width="0" height="0" className="absolute -z-1">
        <defs>
          <filter
            id="dissolve-filter"
            x="-300%"
            y="-300%"
            width="600%"
            height="600%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="1"
              result="bigNoise"
            />
            <feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
              <feFuncR type="linear" slope="0.5" intercept="-0.2" />
              <feFuncG type="linear" slope="3" intercept="-0.6" />
            </feComponentTransfer>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1"
              numOctaves="2"
              result="fineNoise"
            />
            <feMerge result="combinedNoise">
              <feMergeNode in="bigNoiseAdjusted" />
              <feMergeNode in="fineNoise" />
            </feMerge>
            <feDisplacementMap
              ref={displacementMapRef}
              in="SourceGraphic"
              in2="combinedNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

const DashboardSection = () => (
  <section className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
    {/* Floating hearts */}
    <div className="absolute top-10 left-10 animate-floatHeart text-pink-400 opacity-60 text-3xl">
      ❤️
    </div>
    <div className="absolute bottom-20 right-20 animate-floatHeart2 text-pink-500 opacity-50 text-4xl">
      💖
    </div>
    <div className="absolute top-1/2 left-1/3 animate-floatHeart3 text-pink-300 opacity-40 text-2xl">
      💕
    </div>

    <div className="max-w-5xl w-full rounded-xl bg-gradient-to-tr from-pink-800/40 via-purple-900/40 to-indigo-900/40 backdrop-blur-lg p-10 shadow-[0_0_30px_5px_rgba(219,39,119,0.5)] border border-pink-700 flex flex-col items-center justify-center gap-6">
      <h2 className="text-4xl font-cursive font-bold text-pink-300 mb-6 tracking-wider drop-shadow-md">
        For My Radha, With All My Heart ❤️
      </h2>

      <a
        href="https://formyyradha.vercel.app/dashboard"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-3xl shadow-glow hover:scale-110 hover:brightness-110 transition-transform duration-400 flex items-center gap-3 font-semibold tracking-wide"
      >
        <span>Open your Special Page</span>
        <span className="animate-pulse">💖</span>
      </a>
    </div>

    <style jsx>{`
      @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");
      .font-cursive {
        font-family: "Great Vibes", cursive;
      }
      @keyframes glow {
        0%,
        100% {
          box-shadow: 0 0 10px rgba(219, 39, 119, 0.7),
            0 0 20px rgba(147, 51, 234, 0.7), 0 0 30px rgba(79, 70, 229, 0.7);
        }
        50% {
          box-shadow: 0 0 20px rgba(219, 39, 119, 1),
            0 0 40px rgba(147, 51, 234, 1), 0 0 60px rgba(79, 70, 229, 1);
        }
      }
      .shadow-glow {
        animation: glow 3s ease-in-out infinite;
      }
      @keyframes floatHeart {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-20px) translateX(5px) rotate(10deg);
          opacity: 1;
        }
        100% {
          transform: translateY(0) translateX(0) rotate(0deg);
          opacity: 0.6;
        }
      }
      @keyframes floatHeart2 {
        0%,
        100% {
          transform: translateY(0) translateX(0);
          opacity: 0.5;
        }
        50% {
          transform: translateY(-30px) translateX(-10px);
          opacity: 0.8;
        }
      }
      @keyframes floatHeart3 {
        0%,
        100% {
          transform: translateY(0) translateX(0);
          opacity: 0.4;
        }
        50% {
          transform: translateY(-10px) translateX(10px);
          opacity: 0.7;
        }
      }
      .animate-floatHeart {
        animation: floatHeart 5s ease-in-out infinite;
      }
      .animate-floatHeart2 {
        animation: floatHeart2 6s ease-in-out infinite;
      }
      .animate-floatHeart3 {
        animation: floatHeart3 4.5s ease-in-out infinite;
      }
    `}</style>
  </section>
);

const DemoOne = () => {
  const [showHero, setShowHero] = useState(false);
  return (
    <div className="w-full min-h-screen bg-black text-white">
      {showHero ? (
        <>
          <HeroSection />
          <DashboardSection />
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <AnimatePresence mode="wait">
            <ThanosSnapEffect onSnapComplete={() => setShowHero(true)}>
              <div className="cursor-pointer text-center text-sm font-light px-4 py-2 rounded-md bg-gradient-to-r from-pink-500/80 to-purple-600/80 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                Built this... for your smile
              </div>
            </ThanosSnapEffect>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default DemoOne;
