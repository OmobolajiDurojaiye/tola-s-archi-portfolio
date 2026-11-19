import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  PictureInPicture2,
  Film,
} from 'lucide-react';
import type { ProjectVideo } from '../data/projects';

interface CinemaVideoPlayerProps {
  video: ProjectVideo;
  projectCode: string;
}

const SPEEDS = [0.5, 1, 1.5, 2];

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function CinemaVideoPlayer({ video, projectCode }: CinemaVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimerRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPercent, setHoverPercent] = useState(0);

  // Reset state cleanly when switching projects
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setBuffered(0);
    setShowControls(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [video.src]);

  const scheduleHideControls = useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    setShowControls(true);
    hideTimerRef.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 2800);
  }, []);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setIsPlaying(true);
      scheduleHideControls();
    } else {
      el.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const stepSeconds = (delta: number) => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + delta));
    setCurrentTime(el.currentTime);
    scheduleHideControls();
  };

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (videoRef.current) {
      videoRef.current.playbackRate = SPEEDS[next];
    }
    scheduleHideControls();
  };

  const toggleFullscreen = async () => {
    const box = containerRef.current;
    const vid = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!box) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (box.requestFullscreen) {
        await box.requestFullscreen();
      } else if (vid?.webkitEnterFullscreen) {
        vid.webkitEnterFullscreen();
      }
    } catch {
      // ignore
    }
  };

  const togglePiP = async () => {
    const vid = videoRef.current;
    if (!vid || !document.pictureInPictureEnabled) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await vid.requestPictureInPicture();
      }
    } catch {
      // ignore
    }
  };

  const seekByClientX = (clientX: number, bar: HTMLDivElement) => {
    const el = videoRef.current;
    if (!el || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    el.currentTime = ratio * duration;
    setCurrentTime(el.currentTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative">
      {/* Subtle architectural ambient glow synced to playback */}
      <div
        aria-hidden="true"
        className={`absolute -inset-2 sm:-inset-3 rounded-[32px] bg-gradient-to-r from-[#C6A88C]/35 via-[#EADFD1]/25 to-[#C6A88C]/35 blur-2xl transition-opacity duration-700 pointer-events-none ${
          isPlaying ? 'opacity-90' : 'opacity-40'
        }`}
      />

      <div
        ref={containerRef}
        onMouseMove={scheduleHideControls}
        onTouchStart={scheduleHideControls}
        className="relative rounded-[24px] sm:rounded-[30px] overflow-hidden bg-[#0E0D0C] border border-[#D8C3A8]/30 shadow-[0_32px_90px_-28px_rgba(14,13,12,0.55)] group"
      >
        {/* Top Architectural Cinema HUD */}
        <motion.div
          initial={false}
          animate={{ opacity: showControls || !isPlaying ? 1 : 0, y: showControls || !isPlaying ? 0 : -12 }}
          transition={{ duration: 0.25 }}
          className="absolute top-0 inset-x-0 z-20 p-3 sm:p-5 bg-gradient-to-b from-[#0E0D0C]/85 via-[#0E0D0C]/35 to-transparent flex items-center justify-between gap-2 pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F3EC]/12 border border-[#D8C3A8]/30 backdrop-blur-md font-mono-arch text-[10px] uppercase tracking-[0.16em] text-[#F7F3EC]">
              <Film className="w-3 h-3 text-[#D8C3A8]" />
              <span>{projectCode} · 3D Walkthrough</span>
            </span>
          </div>

          <span className="font-mono-arch text-[10px] sm:text-xs text-[#D8C3A8] bg-[#0E0D0C]/65 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </motion.div>

        {/* Native HTML5 Video (mobile-first playsInline + faststart H.264) */}
        <div
          onClick={togglePlay}
          className="relative w-full aspect-video bg-[#0E0D0C] cursor-pointer flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
            onProgress={(e) => {
              const v = e.currentTarget;
              if (v.buffered.length > 0 && v.duration > 0) {
                setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
              }
            }}
            onEnded={() => {
              setIsPlaying(false);
              setShowControls(true);
            }}
            className="w-full h-full object-contain"
          />

          {/* Center Glossy Glass Play Orb */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.button
                type="button"
                aria-label="Play 3D walkthrough"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.15, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F7F3EC]/90 text-[#0E0D0C] flex items-center justify-center shadow-[0_18px_50px_rgba(0,0,0,0.55)] border border-white backdrop-blur-md hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Custom Architectural Control Dock */}
        <motion.div
          initial={false}
          animate={{ opacity: showControls || !isPlaying ? 1 : 0, y: showControls || !isPlaying ? 0 : 14 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-0 inset-x-0 z-20 px-3 sm:px-5 pb-3 sm:pb-4 pt-8 bg-gradient-to-t from-[#0E0D0C]/92 via-[#0E0D0C]/55 to-transparent"
        >
          {/* Architectural Scrubber Track */}
          <div
            role="slider"
            aria-label="Video timeline"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(currentTime)}
            tabIndex={0}
            onClick={(e) => seekByClientX(e.clientX, e.currentTarget)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              setHoverPercent(ratio * 100);
              setHoverTime(ratio * duration);
            }}
            onMouseLeave={() => setHoverTime(null)}
            className="relative h-5 flex items-center cursor-pointer group/scrub mb-1.5"
          >
            {hoverTime !== null && duration > 0 && (
              <div
                style={{ left: `${hoverPercent}%` }}
                className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#F7F3EC] text-[#0E0D0C] font-mono-arch text-[10px] font-medium shadow pointer-events-none"
              >
                {formatTime(hoverTime)}
              </div>
            )}

            <div className="relative w-full h-1.5 group-hover/scrub:h-2 transition-all rounded-full bg-white/20 overflow-hidden">
              <div
                style={{ width: `${buffered}%` }}
                className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
              />
              <div
                style={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C6A88C] to-[#F7F3EC] rounded-full"
              />
            </div>

            <div
              style={{ left: `${progress}%` }}
              className="absolute w-3.5 h-3.5 -translate-x-1/2 rounded-full bg-[#F7F3EC] border-2 border-[#0E0D0C] shadow-md scale-90 group-hover/scrub:scale-110 transition-transform pointer-events-none"
            />
          </div>

          {/* Tactile Controls Row */}
          <div className="flex items-center justify-between gap-2 text-[#F7F3EC]">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-9 h-9 rounded-full bg-[#F7F3EC]/15 hover:bg-[#F7F3EC]/25 border border-white/15 flex items-center justify-center transition cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={() => stepSeconds(-5)}
                aria-label="Rewind 5 seconds"
                className="w-8 h-8 rounded-full hover:bg-white/12 flex items-center justify-center text-[#EADFD1] transition cursor-pointer"
                title="Back 5s"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => stepSeconds(5)}
                aria-label="Forward 5 seconds"
                className="w-8 h-8 rounded-full hover:bg-white/12 flex items-center justify-center text-[#EADFD1] transition cursor-pointer"
                title="Forward 5s"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="w-8 h-8 rounded-full hover:bg-white/12 flex items-center justify-center text-[#EADFD1] transition cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={cycleSpeed}
                className="px-2.5 py-1 rounded-full bg-[#F7F3EC]/12 hover:bg-[#F7F3EC]/22 border border-[#D8C3A8]/25 font-mono-arch text-[11px] text-[#D8C3A8] transition cursor-pointer"
                title="Playback speed"
              >
                {SPEEDS[speedIdx]}x
              </button>

              <button
                type="button"
                onClick={togglePiP}
                aria-label="Picture in picture"
                className="hidden sm:flex w-8 h-8 rounded-full hover:bg-white/12 items-center justify-center text-[#EADFD1] transition cursor-pointer"
                title="Picture in Picture"
              >
                <PictureInPicture2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                className="w-8 h-8 rounded-full hover:bg-white/12 flex items-center justify-center text-[#EADFD1] transition cursor-pointer"
                title="Fullscreen"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
