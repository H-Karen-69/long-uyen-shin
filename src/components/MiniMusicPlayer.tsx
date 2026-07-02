import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Music, 
  ChevronDown, 
  ChevronUp, 
  Disc 
} from 'lucide-react';
import { SHIN_GARDEN_PLAYLIST, DEFAULT_MUSIC_URL } from '../data';
import { Track } from '../types';

interface MiniMusicPlayerProps {
  addToast: (text: string, type: 'info' | 'success' | 'heart-on' | 'heart-off') => void;
}

export default function MiniMusicPlayer({ addToast }: MiniMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(() => {
    const savedIdx = localStorage.getItem('shin_lemon_garden_track_idx');
    return savedIdx ? Math.min(parseInt(savedIdx, 10), SHIN_GARDEN_PLAYLIST.length - 1) : 0;
  });
  const [volume, setVolume] = useState(() => {
    const savedVol = localStorage.getItem('shin_lemon_garden_music_volume');
    return savedVol ? parseFloat(savedVol) : 0.4;
  });
  const [isFallback, setIsFallback] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const consecutiveErrorsRef = useRef(0);

  const currentTrack: Track = isFallback 
    ? { id: 999, title: "Mơ Màng Trong Vườn (Fallback) 🎵", artist: "Mixkit Lofi Acoustic", src: DEFAULT_MUSIC_URL }
    : SHIN_GARDEN_PLAYLIST[currentTrackIdx];

  // Sync src, volume, and play state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.src;
      // If we were already playing, continue playing the new track
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log("Audio play error:", err);
        });
      }
    }
  }, [currentTrackIdx, isFallback]);

  // Handle gestural play to restore the user's preference after first user interaction
  useEffect(() => {
    const handleFirstGesture = () => {
      const savedPref = localStorage.getItem('shin_lemon_garden_music_playing') === 'true';
      if (savedPref && !isPlaying && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            addToast(`Tiếp tục phát nhạc: ${currentTrack.title} 🎶`, 'success');
          })
          .catch((err) => {
            console.log('Autoplay gesture restoration failed:', err);
          });
      }
      window.removeEventListener('click', handleFirstGesture);
    };
    window.addEventListener('click', handleFirstGesture);
    return () => {
      window.removeEventListener('click', handleFirstGesture);
    };
  }, [currentTrackIdx, isPlaying, currentTrack]);

  // Handle outside click to close dropdown panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('shin_lemon_garden_music_playing', 'false');
      addToast('Đã dừng nhạc nền thư thái 🎧', 'info');
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem('shin_lemon_garden_music_playing', 'true');
          consecutiveErrorsRef.current = 0;
          addToast(`Đang phát: ${currentTrack.title} 🎶`, 'success');
        })
        .catch((err) => {
          console.warn("Autoplay blocked or load error, trying next track...", err);
          handleAudioError();
        });
    }
  };

  const playTrack = (idx: number) => {
    setIsFallback(false);
    setCurrentTrackIdx(idx);
    localStorage.setItem('shin_lemon_garden_track_idx', idx.toString());
    
    // Auto start playing
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            localStorage.setItem('shin_lemon_garden_music_playing', 'true');
            consecutiveErrorsRef.current = 0; // Reset error counter on success
            addToast(`Đang phát: ${SHIN_GARDEN_PLAYLIST[idx].title} 🎶`, 'success');
          })
          .catch((err) => {
            console.log("Playback error, auto skipping...", err);
            handleAudioError();
          });
      }
    }, 50);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isFallback) {
      addToast('Đang phát nhạc dự phòng, không thể đổi bài 🎵', 'info');
      return;
    }
    const nextIdx = (currentTrackIdx + 1) % SHIN_GARDEN_PLAYLIST.length;
    playTrack(nextIdx);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isFallback) {
      addToast('Đang phát nhạc dự phòng, không thể đổi bài 🎵', 'info');
      return;
    }
    const prevIdx = (currentTrackIdx - 1 + SHIN_GARDEN_PLAYLIST.length) % SHIN_GARDEN_PLAYLIST.length;
    playTrack(prevIdx);
  };

  const handleTrackEnded = () => {
    if (isFallback) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log(e));
      }
    } else {
      // Loop entire playlist (last goes back to first)
      const nextIdx = (currentTrackIdx + 1) % SHIN_GARDEN_PLAYLIST.length;
      playTrack(nextIdx);
    }
  };

  const handleAudioError = () => {
    console.error(`Audio track failed to load: ${currentTrack.title}`);
    
    consecutiveErrorsRef.current += 1;
    if (consecutiveErrorsRef.current >= SHIN_GARDEN_PLAYLIST.length) {
      // All playlist tracks failed (offline or all links blocked), fallback to default
      setIsFallback(true);
      consecutiveErrorsRef.current = 0;
      addToast('Không thể tải các bài nhạc trong vườn, Shin đổi sang nhạc dự phòng nha! 🎵', 'info');
      return;
    }

    const nextIdx = (currentTrackIdx + 1) % SHIN_GARDEN_PLAYLIST.length;
    addToast(`Bài "${currentTrack.title}" gặp sự cố kết nối, Shin tự động chuyển sang bài kế tiếp nhé! ⏭️`, 'info');
    
    // Play the next track
    playTrack(nextIdx);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    localStorage.setItem('shin_lemon_garden_music_volume', val.toString());
  };

  return (
    <div ref={playerRef} className="relative z-40 select-none">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onEnded={handleTrackEnded}
        onError={handleAudioError}
        preload="auto"
      />

      {/* COLLAPSED BAR */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FAE9C5] bg-[#FFFDF2] hover:bg-[#FFFCE8] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer w-[180px] sm:w-[240px]"
      >
        {/* Animated Wave or static Music Icon */}
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FFE873]/30 text-[#5D4E3C]">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3 w-3">
              <span className="w-[2px] h-full bg-[#BCA136] rounded-full wave-bar-1" />
              <span className="w-[2px] h-4/5 bg-[#BCA136] rounded-full wave-bar-2" />
              <span className="w-[2px] h-3/5 bg-[#BCA136] rounded-full wave-bar-3" />
            </div>
          ) : (
            <VolumeX size={12} className="text-[#5D4E3C]/60" />
          )}
        </div>

        {/* MARQUEE TEXT */}
        <div className="flex-1 overflow-hidden relative h-4 flex items-center">
          {isPlaying ? (
            <motion.div
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                ease: 'linear',
                duration: 10,
                repeat: Infinity,
              }}
              className="absolute flex whitespace-nowrap text-[10px] sm:text-xs font-bold text-[#5D4E3C]"
            >
              <span className="mr-6">{currentTrack.title} - {currentTrack.artist} &nbsp; ✦ &nbsp;</span>
              <span className="mr-6">{currentTrack.title} - {currentTrack.artist} &nbsp; ✦ &nbsp;</span>
            </motion.div>
          ) : (
            <div className="text-[10px] sm:text-xs font-bold text-[#5D4E3C]/80 truncate w-full">
              {currentTrack.title} - {currentTrack.artist}
            </div>
          )}
        </div>

        {/* PLAY/PAUSE MINI TRIGGER */}
        <button
          onClick={togglePlay}
          className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FFE873] hover:bg-[#FFDF3E] text-[#5D4E3C] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {isPlaying ? <Pause size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" className="ml-[1px]" />}
        </button>

        {/* Dropdown toggle indicator */}
        <ChevronDown size={12} className={`text-[#5D4E3C]/40 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </div>

      {/* EXPANDED PANEL/DROPDOWN */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-[280px] sm:w-[320px] bg-[#FFFDF2] border-2 border-[#FAE9C5] rounded-2xl shadow-xl p-4 text-[#5D4E3C] z-50 glass-card"
          >
            {/* Header of Panel: Spinning vinyl disk & Info */}
            <div className="flex items-center gap-3 border-b border-[#F5EAD2] pb-3 mb-3">
              <div className={`w-10 h-10 rounded-full bg-[#FFE873]/30 flex items-center justify-center text-[#BCA136] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
                <Disc size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-extrabold text-[#5D4E3C] truncate font-sans tracking-wide">
                  {currentTrack.title}
                </p>
                <p className="text-[10px] text-[#A08B73] truncate uppercase tracking-widest font-comfortaa">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* CONTROLLERS SECTION */}
            <div className="space-y-3">
              {/* Audio Playback Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F5EAD2]/50 hover:bg-[#F5EAD2] text-[#5D4E3C] transition-all cursor-pointer active:scale-90"
                  title="Bài trước"
                >
                  <SkipBack size={14} fill="currentColor" />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FFE873] hover:bg-[#FFDF3E] text-[#5D4E3C] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title={isPlaying ? "Tạm dừng" : "Phát nhạc"}
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F5EAD2]/50 hover:bg-[#F5EAD2] text-[#5D4E3C] transition-all cursor-pointer active:scale-90"
                  title="Bài tiếp theo"
                >
                  <SkipForward size={14} fill="currentColor" />
                </button>
              </div>

              {/* Volume Slider Section */}
              <div className="flex items-center gap-2 bg-[#FFFDF2] border border-[#F5EAD2] px-3 py-2 rounded-xl">
                <button
                  onClick={() => {
                    const newVol = volume > 0 ? 0 : 0.4;
                    setVolume(newVol);
                    localStorage.setItem('shin_lemon_garden_music_volume', newVol.toString());
                  }}
                  className="text-[#5D4E3C]/70 hover:text-[#5D4E3C]"
                >
                  {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 accent-[#BCA136] h-1 bg-[#F5EAD2] rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] font-bold text-[#A08B73] min-w-[24px] text-right font-mono">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>

            {/* PLAYLIST SECTION */}
            <div className="mt-4 border-t border-[#F5EAD2] pt-3">
              <p className="text-[10px] font-extrabold text-[#A08B73] tracking-widest uppercase mb-2 font-comfortaa">
                🍋 Nhạc Trong Vườn Chanh
              </p>
              <div className="space-y-1 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
                {SHIN_GARDEN_PLAYLIST.map((track, idx) => {
                  const isCurrent = !isFallback && idx === currentTrackIdx;
                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(idx)}
                      className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all ${
                        isCurrent 
                          ? 'bg-[#FFE873]/30 border border-[#FFE873] font-bold text-[#5D4E3C]' 
                          : 'hover:bg-[#F5EAD2]/30 border border-transparent text-[#5D4E3C]/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] text-[#A08B73] w-4 text-center font-mono">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold">{track.title}</p>
                          <p className="truncate text-[9px] text-[#A08B73] font-comfortaa">{track.artist}</p>
                        </div>
                      </div>
                      
                      {/* Active wave status icon */}
                      {isCurrent && isPlaying && (
                        <div className="flex items-end gap-[1.5px] h-2.5">
                          <span className="w-[1.5px] h-full bg-[#BCA136] rounded-full wave-bar-1" />
                          <span className="w-[1.5px] h-3/4 bg-[#BCA136] rounded-full wave-bar-2" />
                          <span className="w-[1.5px] h-1/2 bg-[#BCA136] rounded-full wave-bar-3" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
