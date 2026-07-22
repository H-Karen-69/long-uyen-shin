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
  Disc,
  Shuffle,
  X
} from 'lucide-react';
import { SHIN_GARDEN_PLAYLIST, DEFAULT_MUSIC_URL } from '../data';
import { Track } from '../types';

interface MiniMusicPlayerProps {
  addToast: (text: string, type: 'info' | 'success' | 'heart-on' | 'heart-off') => void;
  hasEntered: boolean;
}

export default function MiniMusicPlayer({ addToast, hasEntered }: MiniMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(() => {
    const savedIdx = localStorage.getItem('longuyen_music_track_idx');
    return savedIdx ? Math.min(parseInt(savedIdx, 10), SHIN_GARDEN_PLAYLIST.length - 1) : 0;
  });
  const [volume, setVolume] = useState(() => {
    const savedVol = localStorage.getItem('longuyen_music_volume');
    return savedVol ? parseFloat(savedVol) : 0.4;
  });
  const [isFallback, setIsFallback] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shuffle, setShuffle] = useState(() => {
    return localStorage.getItem('longuyen_music_shuffle') === 'true';
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const consecutiveErrorsRef = useRef(0);
  const hasPlayedThisSession = useRef(false);

  const currentTrack: Track = isFallback 
    ? { id: 999, title: "Mơ Màng Trong Long Uyển (Fallback) 🎵", artist: "Mixkit Lofi Acoustic", src: DEFAULT_MUSIC_URL }
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

  // Autoplay music when user enters the garden
  useEffect(() => {
    if (hasEntered && !hasPlayedThisSession.current) {
      const musicEnabledVal = localStorage.getItem('longuyen_music_enabled');
      // If explicitly turned off, do not autoplay
      if (musicEnabledVal === 'false') {
        return;
      }

      // Default autoplay volume is 40%
      const defaultVol = 0.4;
      setVolume(defaultVol);
      localStorage.setItem('longuyen_music_volume', defaultVol.toString());

      // Select random track
      const randomIdx = Math.floor(Math.random() * SHIN_GARDEN_PLAYLIST.length);
      setCurrentTrackIdx(randomIdx);
      localStorage.setItem('longuyen_music_track_idx', randomIdx.toString());

      hasPlayedThisSession.current = true;

      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = SHIN_GARDEN_PLAYLIST[randomIdx].src;
          audioRef.current.volume = defaultVol;
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              localStorage.setItem('longuyen_music_enabled', 'true');
              localStorage.setItem('longuyen_music_playing', 'true');
              addToast(`[Random 🎲] Tự động phát nhạc: ${SHIN_GARDEN_PLAYLIST[randomIdx].title} 🎶`, 'success');
            })
            .catch((err) => {
              console.warn("Autoplay blocked by browser policy:", err);
              addToast('Bấm nút nhạc để bắt đầu phát 🎵', 'info');
            });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [hasEntered, addToast]);

  // Handle gestural play to restore user's preference after interaction
  useEffect(() => {
    const handleFirstGesture = () => {
      const savedPref = localStorage.getItem('longuyen_music_enabled') !== 'false';
      if (savedPref && !isPlaying && audioRef.current && hasEntered) {
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
  }, [currentTrackIdx, isPlaying, currentTrack, hasEntered, addToast]);

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
      localStorage.setItem('longuyen_music_playing', 'false');
      localStorage.setItem('longuyen_music_enabled', 'false');
      addToast('Đã dừng nhạc nền thư thái 🎧', 'info');
    } else {
      localStorage.setItem('longuyen_music_enabled', 'true');
      if (!hasPlayedThisSession.current) {
        hasPlayedThisSession.current = true;
        const randomIdx = Math.floor(Math.random() * SHIN_GARDEN_PLAYLIST.length);
        setCurrentTrackIdx(randomIdx);
        localStorage.setItem('longuyen_music_track_idx', randomIdx.toString());
        
        setIsPlaying(true);
        localStorage.setItem('longuyen_music_playing', 'true');
        consecutiveErrorsRef.current = 0;
        
        const track = SHIN_GARDEN_PLAYLIST[randomIdx];
        audioRef.current.src = track.src;
        audioRef.current.play()
          .then(() => {
            addToast(`[Random 🎲] Đang phát: ${track.title} 🎶`, 'success');
          })
          .catch((err) => {
            console.warn("Playback error on random first track:", err);
            handleAudioError();
          });
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            localStorage.setItem('longuyen_music_playing', 'true');
            consecutiveErrorsRef.current = 0;
            addToast(`Đang phát: ${currentTrack.title} 🎶`, 'success');
          })
          .catch((err) => {
            console.warn("Autoplay blocked or load error, trying next track...", err);
            handleAudioError();
          });
      }
    }
  };

  const playTrack = (idx: number) => {
    setIsFallback(false);
    setCurrentTrackIdx(idx);
    localStorage.setItem('longuyen_music_track_idx', idx.toString());
    localStorage.setItem('longuyen_music_enabled', 'true');
    hasPlayedThisSession.current = true;
    
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            localStorage.setItem('longuyen_music_playing', 'true');
            consecutiveErrorsRef.current = 0;
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
      if (shuffle) {
        const randomIdx = Math.floor(Math.random() * SHIN_GARDEN_PLAYLIST.length);
        playTrack(randomIdx);
      } else {
        const nextIdx = (currentTrackIdx + 1) % SHIN_GARDEN_PLAYLIST.length;
        playTrack(nextIdx);
      }
    }
  };

  const handleAudioError = () => {
    console.warn(`Audio track failed to load: ${currentTrack.title}`);
    
    consecutiveErrorsRef.current += 1;
    if (consecutiveErrorsRef.current >= SHIN_GARDEN_PLAYLIST.length) {
      setIsFallback(true);
      consecutiveErrorsRef.current = 0;
      addToast('Không thể tải các bài nhạc của Long Ngâm, Shin đổi sang nhạc dự phòng nha! 🎵', 'info');
      return;
    }

    const nextIdx = (currentTrackIdx + 1) % SHIN_GARDEN_PLAYLIST.length;
    addToast(`Bài "${currentTrack.title}" gặp sự cố kết nối, Shin tự động chuyển sang bài kế tiếp nhé! ⏭️`, 'info');
    playTrack(nextIdx);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    localStorage.setItem('longuyen_music_volume', val.toString());
  };

  return (
    <div ref={playerRef} className="relative select-none">
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
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D8DEE8] bg-[#F8F6F5] hover:bg-[#E8EAEF] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer w-[180px] sm:w-[240px] relative z-40"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D8DEE8] text-[#5A6B85]">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3 w-3">
              <span className="w-[2px] h-full bg-[#5A6B85] rounded-full wave-bar-1" />
              <span className="w-[2px] h-4/5 bg-[#5A6B85] rounded-full wave-bar-2" />
              <span className="w-[2px] h-3/5 bg-[#5A6B85] rounded-full wave-bar-3" />
            </div>
          ) : (
            <VolumeX size={12} className="text-[#6B7590]" />
          )}
        </div>

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
              className="absolute flex whitespace-nowrap text-[10px] sm:text-xs font-bold text-[#3A4258]"
            >
              <span className="mr-6">{currentTrack.title} - {currentTrack.artist} &nbsp; ✦ &nbsp;</span>
              <span className="mr-6">{currentTrack.title} - {currentTrack.artist} &nbsp; ✦ &nbsp;</span>
            </motion.div>
          ) : (
            <div className="text-[10px] sm:text-xs font-bold text-[#3A4258]/80 truncate w-full">
              {currentTrack.title} - {currentTrack.artist}
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="w-5 h-5 rounded-full flex items-center justify-center bg-[#7A8AA5] hover:bg-[#5A6B85] text-[#F8F6F5] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {isPlaying ? <Pause size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" className="ml-[1px]" />}
        </button>

        <ChevronDown size={12} className={`text-[#6B7590] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </div>

      {/* Backdrop overlay for closing */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="fixed inset-0 bg-black/15 backdrop-blur-[1px] z-30 cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* EXPANDED PANEL/DROPDOWN */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-[calc(100vw-32px)] sm:w-[340px] bg-[#F8F6F5] border border-[#D8DEE8] shadow-xl rounded-[20px] p-5 text-[#3A4258] z-50 overflow-hidden"
          >
            {/* Part 1 (top): Track name & Artist + Close Button */}
            <div className="flex items-center gap-3 border-b border-[#D8DEE8] pb-3 mb-4 pr-8 relative">
              <div className={`w-11 h-11 rounded-full bg-[#D8DEE8] flex items-center justify-center text-[#5A6B85] shrink-0 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
                <Disc size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-extrabold text-[#3A4258] truncate font-sans tracking-wide">
                  {currentTrack.title}
                </p>
                <p className="text-[10px] text-[#6B7590] truncate uppercase tracking-widest font-comfortaa mt-0.5">
                  {currentTrack.artist}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="absolute top-0 right-0 p-1 rounded-full hover:bg-[#D8DEE8] text-[#6B7590] hover:text-[#3A4258] transition-all cursor-pointer"
                title="Đóng panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Part 2: Volume slider & % */}
            <div className="flex items-center gap-2.5 bg-white border border-[#D8DEE8] px-3.5 py-2.5 rounded-2xl mb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newVol = volume > 0 ? 0 : 0.4;
                  setVolume(newVol);
                  localStorage.setItem('longuyen_music_volume', newVol.toString());
                }}
                className="text-[#6B7590] hover:text-[#3A4258] shrink-0"
              >
                {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 accent-[#7A8AA5] h-1 bg-[#D8DEE8] rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs font-bold text-[#6B7590] min-w-[32px] text-right font-mono shrink-0">
                {Math.round(volume * 100)}%
              </span>
            </div>

            {/* Part 3: Controllers (Previous / Play-Pause / Next / Shuffle) */}
            <div className="flex items-center justify-center gap-5 pb-3 border-b border-[#D8DEE8] mb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newShuffle = !shuffle;
                  setShuffle(newShuffle);
                  localStorage.setItem('longuyen_music_shuffle', newShuffle ? 'true' : 'false');
                  addToast(newShuffle ? 'Đã bật chế độ phát ngẫu nhiên 🎲' : 'Đã tắt chế độ phát ngẫu nhiên (phát theo thứ tự) 🔁', 'info');
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 border ${
                  shuffle 
                    ? 'bg-[#D8DEE8] border-[#7A8AA5] text-[#3A4258] font-bold shadow-inner' 
                    : 'bg-[#E8EAEF] border-transparent text-[#6B7590] hover:bg-[#D8DEE8]'
                }`}
                title={shuffle ? "Đang phát ngẫu nhiên" : "Phát tuần tự"}
              >
                <Shuffle size={14} />
              </button>

              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#D8DEE8]/60 hover:bg-[#D8DEE8] text-[#3A4258] transition-all cursor-pointer active:scale-90"
                title="Bài trước"
              >
                <SkipBack size={16} fill="currentColor" />
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#7A8AA5] to-[#E88BA0] hover:from-[#5A6B85] hover:to-[#D66A85] text-[#F8F6F5] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? "Tạm dừng" : "Phát nhạc"}
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>

              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#D8DEE8]/60 hover:bg-[#D8DEE8] text-[#3A4258] transition-all cursor-pointer active:scale-90"
                title="Bài tiếp theo"
              >
                <SkipForward size={16} fill="currentColor" />
              </button>
            </div>

            {/* Part 4: Playlist */}
            <div className="flex flex-col">
              <p className="text-[10px] font-extrabold text-[#6B7590] tracking-widest uppercase mb-2.5 font-comfortaa">
                🐉 Danh sách phát Long Ngâm ({SHIN_GARDEN_PLAYLIST.length})
              </p>
              <div className="space-y-1.5 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
                {SHIN_GARDEN_PLAYLIST.map((track, idx) => {
                  const isCurrent = !isFallback && idx === currentTrackIdx;
                  return (
                    <div
                      key={track.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        playTrack(idx);
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                        isCurrent 
                          ? 'bg-[#D8DEE8] border border-[#7A8AA5] font-bold text-[#3A4258]' 
                          : 'hover:bg-[#E8EAEF] border border-transparent text-[#6B7590]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-[10px] text-[#6B7590] w-4 text-center font-mono shrink-0">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold">{track.title}</p>
                          <p className="truncate text-[9px] text-[#6B7590] font-comfortaa mt-0.5">{track.artist}</p>
                        </div>
                      </div>
                      
                      {isCurrent && isPlaying && (
                        <div className="flex items-end gap-[1.5px] h-2.5 shrink-0">
                          <span className="w-[1.5px] h-full bg-[#5A6B85] rounded-full wave-bar-1" />
                          <span className="w-[1.5px] h-3/4 bg-[#5A6B85] rounded-full wave-bar-2" />
                          <span className="w-[1.5px] h-1/2 bg-[#5A6B85] rounded-full wave-bar-3" />
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
