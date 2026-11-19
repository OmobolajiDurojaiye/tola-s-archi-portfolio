import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from '@phosphor-icons/react/dist/csr/Play';
import { Pause } from '@phosphor-icons/react/dist/csr/Pause';
import { SpeakerHigh } from '@phosphor-icons/react/dist/csr/SpeakerHigh';
import { SpeakerSlash } from '@phosphor-icons/react/dist/csr/SpeakerSlash';
import { CornersOut } from '@phosphor-icons/react/dist/csr/CornersOut';
import { CornersIn } from '@phosphor-icons/react/dist/csr/CornersIn';
import { ArrowCounterClockwise } from '@phosphor-icons/react/dist/csr/ArrowCounterClockwise';
import { ArrowClockwise } from '@phosphor-icons/react/dist/csr/ArrowClockwise';
import type { ProjectVideo } from '../data/projects';
import { hapticTap } from '../lib/perf';

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
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    hapticTap(8);
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
    hapticTap(6);
    el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + delta));
    setCurrentTime(el.currentTime);
    scheduleHideControls();
  };

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (videoRef.current) videoRef.current.playbackRate = SPEEDS[next];
    hapticTap(6);
    scheduleHideControls();
  };

  const toggleFullscreen = async () => {
    const box = containerRef.current;
    const vid = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!box) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (box.requestFullscreen) await box.requestFullscreen();
      else if (vid?.webkitEnterFullscreen) vid.webkitEnterFullscreen();
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
      {/* Cobalt ambient playback aura */}
      <div
        aria-hidden="true"
        className={`absolute -inset-3 rounded-[36px] blur-2xl transition-opacity duration-700 pointer-events-none ${
          isPlaying ? 'opacity-55' : 'opacity-20'
        }`}
        style={{
          background: 'radial-gradient(circle at center, var(--tone-600), transparent 72%)',
        }}
      />

      <div
        ref={containerRef}
        onMouseMove={scheduleHideControls}
        onTouchStart={scheduleHideControls}
        className="relative rounded-[28px] overflow-hidden bg-[var(--dark-surface)] shadow-[0_36px_90px_-28px_rgba(4,27,82,0.52)]"
      >
        {/* Top HUD — plain text, zero borders/pills */}
        <motion.div
          initial={false}
          animate={{ opacity: showControls || !isPlaying ? 1 : 0, y: showControls || !isPlaying ? 0 : -10 }}
          transition={{ duration: 0.25 }}
          className="absolute top-0 inset-x-0 z-20 px-5 py-4 bg-gradient-to-b from-[#0A0A0C]/85 to-transparent flex items-center justify-between text-xs text-[var(--light-ink)] pointer-events-none"
        >
          <span className="font-medium tracking-tight opacity-85">
            {projectCode} · 3D Walkthrough
          </span>
          <span className="opacity-80 tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </motion.div>

        {/* Video Element — preload="none" so zero video bytes load until interaction */}
        <div
          onClick={togglePlay}
          className="relative w-full aspect-video bg-[var(--dark-surface)] cursor-pointer flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            playsInline
            preload="none"
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

          <AnimatePresence>
            {!isPlaying && (
              <motion.button
                type="button"
                aria-label="Play walkthrough film"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.12, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="gel-cobalt absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <Play weight="light" className="w-7 h-7 sm:w-8 sm:h-8 ml-1" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Dock */}
        <motion.div
          initial={false}
          animate={{ opacity: showControls || !isPlaying ? 1 : 0, y: showControls || !isPlaying ? 0 : 14 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-0 inset-x-0 z-20 px-4 sm:px-6 pb-4 pt-8 bg-gradient-to-t from-[#0A0A0C]/92 via-[#0A0A0C]/55 to-transparent"
        >
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
            className="relative h-5 flex items-center cursor-pointer group/scrub mb-2"
          >
            {hoverTime !== null && duration > 0 && (
              <div
                style={{ left: `${hoverPercent}%` }}
                className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[var(--light-ink)] text-[var(--ink)] text-[11px] font-medium tabular-nums pointer-events-none"
              >
                {formatTime(hoverTime)}
              </div>
            )}

            <div className="relative w-full h-1.5 group-hover/scrub:h-2 transition-all rounded-full bg-white/20 overflow-hidden">
              <div style={{ width: `${buffered}%` }} className="absolute inset-y-0 left-0 bg-white/30 rounded-full" />
              <div
                style={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-[var(--tone-500)] rounded-full"
              />
            </div>

            <div
              style={{ left: `${progress}%` }}
              className="absolute w-3.5 h-3.5 -translate-x-1/2 rounded-full bg-[var(--light-ink)] shadow-md pointer-events-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2 text-[var(--light-ink)]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-9 h-9 rounded-full bg-white/12 hover:bg-[var(--tone-600)] flex items-center justify-center transition cursor-pointer"
              >
                {isPlaying ? <Pause weight="light" className="w-4 h-4" /> : <Play weight="light" className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={() => stepSeconds(-5)}
                aria-label="Rewind 5 seconds"
                className="w-8 h-8 rounded-full hover:bg-white/12 flex items-center justify-center transition cursor-pointer"
              >
                <ArrowCounterClockwise weight="light" className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => stepSeconds(5)}
                aria-label="Forward 5 seconds"
                className="w-8 h-8 rounded-full hover:bg-white/12 flex items-center justify-center transition cursor-pointer"
              >
                <ArrowClockwise weight="light" className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="w-8 h-8 rounded-full hover:bg-white/12 flex items-center justify-center transition cursor-pointer"
              >
                {isMuted ? <SpeakerSlash weight="light" className="w-4 h-4" /> : <SpeakerHigh weight="light" className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={cycleSpeed}
                className="text-xs font-medium text-[var(--light-ink)]/85 hover:text-[var(--tone-300)] transition cursor-pointer tabular-nums"
              >
                {SPEEDS[speedIdx]}x
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                className="w-8 h-8 rounded-full hover:bg-white/12 flex items-center justify-center transition cursor-pointer"
              >
                {isFullscreen ? <CornersIn weight="light" className="w-4 h-4" /> : <CornersOut weight="light" className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
