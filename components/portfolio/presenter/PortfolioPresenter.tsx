"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
} from "lucide-react";

type SizePreset = "sm" | "md" | "lg";

const INTRO_VIDEO = "/assets/presenter/portfolio-intro.mp4";
const IDLE_VIDEO = "/assets/presenter/portfolio-idle.mp4";

const bubbleSizes: Record<SizePreset, string> = {
  sm: "h-14 w-14",
  md: "h-18 w-18",
  lg: "h-22 w-22",
};

const cardWidths: Record<SizePreset, string> = {
  sm: "w-[min(78vw,15rem)]",
  md: "w-[min(84vw,18rem)]",
  lg: "w-[min(90vw,21rem)]",
};

export function PortfolioPresenter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isIntro, setIsIntro] = useState(true);
  const [muted, setMuted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [size, setSize] = useState<SizePreset>("md");
  const [isDesktop, setIsDesktop] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  /*
   * Detect desktop/mobile.
   */
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const syncLayout = () => {
      setIsDesktop(media.matches);

      // Mobile starts minimized.
      if (!media.matches) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    syncLayout();

    media.addEventListener("change", syncLayout);

    return () => {
      media.removeEventListener("change", syncLayout);
    };
  }, []);

  /*
   * Start the intro video when the component mounts.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {
      // Browser may block autoplay. The presenter remains visible.
    });
  }, [isDesktop]);

  /*
   * When intro finishes, switch to the idle loop.
   */
  function handleIntroEnded() {
    setIsIntro(false);
  }

  /*
   * Switch the video back to the beginning.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;

    video.play().catch(() => {});
  }, [isIntro]);

  /*
   * Toggle sound.
   */
  function toggleMute() {
    setMuted((previous) => {
      const next = !previous;

      if (videoRef.current) {
        videoRef.current.muted = next;

        if (!next) {
          videoRef.current.play().catch(() => {});
        }
      }

      return next;
    });
  }

  /*
   * Change mobile presenter size.
   */
  function cycleSize() {
    setSize((previous) => {
      if (previous === "sm") return "md";
      if (previous === "md") return "lg";
      return "sm";
    });
  }

  /*
   * ------------------------------------------------------------
   * DESKTOP / TABLET
   * ------------------------------------------------------------
   *
   * Character sits on the right side of the hero.
   * It does NOT cover the entire portfolio.
   */
  if (isDesktop) {
    return (
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[43%] overflow-hidden"
        aria-label="Saad's AI presenter"
      >
        {/* Soft sea-green / gold atmosphere */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_55%_48%,rgba(15,118,110,0.13),transparent_48%),radial-gradient(ellipse_at_70%_55%,rgba(184,148,69,0.12),transparent_42%)]" />

        {/* Character video */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.video
            key={isIntro ? "portfolio-intro" : "portfolio-idle"}
            ref={videoRef}
            muted={muted}
            autoPlay
            loop={!isIntro}
            playsInline
            preload="auto"
            onEnded={handleIntroEnded}
            onWaiting={() => setIsBuffering(true)}
            onCanPlay={() => setIsBuffering(false)}
            onPlaying={() => setIsBuffering(false)}
            onError={() => {
              /*
               * If the intro video cannot load, immediately switch
               * to the idle character instead of breaking the page.
               */
              if (isIntro) {
                setIsIntro(false);
              }
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 h-full w-full translate-y-[-60px] object-contain object-right"
          >
            <source
              src={isIntro ? INTRO_VIDEO : IDLE_VIDEO}
              type="video/mp4"
            />
          </motion.video>
        </AnimatePresence>

        {/* Soft fade toward the portfolio content */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r from-[#e8e6df] via-[#e8e6df]/60 to-transparent" />

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#e8e6df] to-transparent" />

        {/* Presenter controls */}
        <div className="pointer-events-auto absolute right-6 top-24 flex items-center gap-2">
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute presenter" : "Mute presenter"}
            aria-pressed={!muted}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#17201d]/10 bg-[#f4f2ec]/80 text-[#17201d] shadow-lg backdrop-blur-xl transition-all hover:border-[#0f766e]/30 hover:bg-white hover:text-[#0f766e]"
          >
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Loading indicator */}
        {isBuffering && (
          <div className="pointer-events-none absolute bottom-20 right-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#17201d]/10 border-t-[#b89445]" />
          </div>
        )}
      </div>
    );
  }

  /*
   * ------------------------------------------------------------
   * MOBILE
   * ------------------------------------------------------------
   *
   * Small floating character.
   * Tap it to open the presenter.
   */
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[1000] md:hidden">
      <AnimatePresence mode="wait" initial={false}>
        {collapsed ? (
          <motion.button
            key="bubble"
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.65, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            onClick={() => setCollapsed(false)}
            aria-label="Open Saad's AI presenter"
            className={`glass-strong pointer-events-auto relative flex items-center justify-center overflow-hidden rounded-full ${bubbleSizes[size]}`}
          >
            <video
              key={`mobile-bubble-${isIntro ? "intro" : "idle"}`}
              muted
              autoPlay
              loop={!isIntro}
              playsInline
              preload="metadata"
              onEnded={handleIntroEnded}
              onError={() => {
                if (isIntro) {
                  setIsIntro(false);
                }
              }}
              className="h-full w-full object-cover"
            >
              <source
                src={isIntro ? INTRO_VIDEO : IDLE_VIDEO}
                type="video/mp4"
              />
            </video>

            {/* Gold / sea-green ring */}
            <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#b89445]/70 shadow-[0_0_28px_rgba(184,148,69,0.28)]" />
          </motion.button>
        ) : (
          <motion.div
            key="card"
            initial={{
              y: 30,
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              y: 30,
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 24,
            }}
            className={`glass-strong pointer-events-auto overflow-hidden rounded-[26px] ${cardWidths[size]}`}
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-[#17201d]/10 px-3.5 py-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-xs font-black text-white">
                S
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b89445]">
                  {isIntro ? "Introducing..." : "Saad's Presenter"}
                </p>

                <p className="truncate text-sm font-semibold text-[#17201d]">
                  Saad Ullah Khan
                </p>
              </div>

              {/* Sound */}
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute presenter" : "Mute presenter"}
                aria-pressed={!muted}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#17201d]/60 transition-colors hover:bg-[#0f766e]/10 hover:text-[#0f766e]"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              {/* Resize */}
              <button
                onClick={cycleSize}
                aria-label="Resize presenter"
                title={`Size: ${size}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#17201d]/60 transition-colors hover:bg-[#0f766e]/10 hover:text-[#0f766e]"
              >
                {size === "lg" ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>

              {/* Minimize */}
              <button
                onClick={() => setCollapsed(true)}
                aria-label="Minimize presenter"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#17201d]/60 transition-colors hover:bg-[#0f766e]/10 hover:text-[#0f766e]"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Video */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#17201d]">
              <video
                key={`mobile-card-${isIntro ? "intro" : "idle"}`}
                ref={videoRef}
                muted={muted}
                autoPlay
                loop={!isIntro}
                playsInline
                preload="metadata"
                onEnded={handleIntroEnded}
                onWaiting={() => setIsBuffering(true)}
                onCanPlay={() => setIsBuffering(false)}
                onPlaying={() => setIsBuffering(false)}
                onError={() => {
                  if (isIntro) {
                    setIsIntro(false);
                  }
                }}
                className="relative z-10 h-full w-full object-cover"
              >
                <source
                  src={isIntro ? INTRO_VIDEO : IDLE_VIDEO}
                  type="video/mp4"
                />
              </video>

              {isBuffering && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#17201d]/40">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#b89445]" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}