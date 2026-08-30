/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  Search,
  MessageSquare,
  Facebook,
  Music,
  ChevronDown,
  ChevronUp,
  X,
  Copy,
  BookOpen,
  SkipForward,
  Gift
} from 'lucide-react';

import { Character, ToastMessage } from './types';
import { INITIAL_CHARACTERS, BULLETINS, DEFAULT_MUSIC_URL } from './data';
import CharacterCard from './components/CharacterCard';
import StoryModal from './components/StoryModal';
import Leaderboard from './components/Leaderboard';
import ConfessionCorner from './components/ConfessionCorner';
import CharacterFeedbackModal from './components/CharacterFeedbackModal';
import FallingDragons from './components/FallingDragons';
import MoodQuiz from './components/MoodQuiz';
import MiniMusicPlayer from './components/MiniMusicPlayer';
import TrieuLongOverlay from './components/TrieuLongOverlay';


import BirthdaySeason from './components/BirthdaySeason';
import BirthdayModal from './components/BirthdayModal';
import { isBirthdayToday } from './lib/dateUtils';
import DragonCloseButton from './components/DragonCloseButton';
import { VisitorCounter } from './components/VisitorCounter';
import { subscribeAllCharacterLikes, toggleCharacterLike } from './lib/characterLikesService';

export default function App() {
  // THÔNG TIN TÀI KHOẢN DONATE (Bạn hãy thay thế thông tin thật của mình ở đây nhé 🔮)
  const DONATE_ACCOUNT_HOLDER = "LE THU HUONG";
  const DONATE_BANK_NAME = "MB Bank";
  const DONATE_ACCOUNT_NUMBER = "0984307708";

  // State variables
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [feedbackChar, setFeedbackChar] = useState<Character | null>(null);
  const [birthdayChar, setBirthdayChar] = useState<Character | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMainTab, setActiveMainTab] = useState<'long-duong' | 'long-dan'>('long-duong');
  const [showBirthdayPopup, setShowBirthdayPopup] = useState(false);
  const [todayBirthdayChar, setTodayBirthdayChar] = useState<Character | null>(null);
  const [activeHashtag, setActiveHashtag] = useState<string | null>(null);
  
  // Filters (Multi-select)
  const [activeGenres, setActiveGenres] = useState<string[]>(['Tất cả']);
  const [activeTastes, setActiveTastes] = useState<string[]>(['Tất cả']);
  const [activeStatuses, setActiveStatuses] = useState<string[]>(['Tất cả']);

  // Interactive states
  const [isTickerExpanded, setIsTickerExpanded] = useState(true);
  const [selectedBulletin, setSelectedBulletin] = useState<{id: number, title: string, text: string, detail: string} | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showDonatePopup, setShowDonatePopup] = useState(false);


  // Initialize data on mount
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedChar(null);
        setFeedbackChar(null);
        setBirthdayChar(null);
        setSelectedBulletin(null);
        setShowBirthdayPopup(false);
        setShowDonatePopup(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Load characters with locally saved likes
    const savedLikes = localStorage.getItem('longuyen_likes_count');
    const savedLikedIds = localStorage.getItem('longuyen_liked_ids');

    if (savedLikedIds) {
      try {
        setLikedIds(JSON.parse(savedLikedIds));
      } catch (e) {
        console.error(e);
      }
    }

    if (savedLikes) {
      try {
        const parsedLikes = JSON.parse(savedLikes) as Record<string, number>;
        // If the stored likes indicate the old baseline (e.g. Trình Dĩ Phàm > 1 or Yến Bắc Thần > 0),
        // reset local storage so the new clean baseline takes effect.
        if (parsedLikes['char_001'] > 1 || parsedLikes['char_002'] > 0) {
          localStorage.removeItem('longuyen_likes_count');
          localStorage.removeItem('longuyen_liked_ids');
          setLikedIds([]);
          setCharacters(INITIAL_CHARACTERS);
        } else {
          const merged = INITIAL_CHARACTERS.map((char) => ({
            ...char,
            likes: parsedLikes[char.id] !== undefined ? parsedLikes[char.id] : char.likes
          }));
          setCharacters(merged);
        }
      } catch (e) {
        setCharacters(INITIAL_CHARACTERS);
      }
    } else {
      setCharacters(INITIAL_CHARACTERS);
    }

    // Real-time Firestore sync for character likes
    const initialLikesMap: Record<string, number> = {};
    INITIAL_CHARACTERS.forEach((c) => {
      initialLikesMap[c.id] = c.likes;
    });

    const unsubscribeLikes = subscribeAllCharacterLikes(initialLikesMap, (dataMap) => {
      const activeLikedIds: string[] = [];
      setCharacters((prevChars) =>
        prevChars.map((char) => {
          const liveData = dataMap[char.id];
          if (liveData) {
            if (liveData.isLiked) {
              activeLikedIds.push(char.id);
            }
            return { ...char, likes: liveData.totalLikes };
          }
          return char;
        })
      );
      setLikedIds(activeLikedIds);
    });

    // Check for today's birthday
    const todayChar = INITIAL_CHARACTERS.find(c => c.birthday && isBirthdayToday(c.birthday));
    if (todayChar) {
      setTodayBirthdayChar(todayChar);
      // Wait a bit after entering to show popup
      setTimeout(() => {
        setShowBirthdayPopup(true);
      }, 1500);
    }

    return () => {
      unsubscribeLikes();
    };
  }, []);



  // Handle toast notifications
  const addToast = (text: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}`;
    const newToast: ToastMessage = { id, text, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Chuyển cảnh Tham Quan Long Uyển (Triệu Long Nghi Thức Overlay)
  const handleEnterGarden = () => {
    setIsEntering(true);
    // Double-safety fallback timer: Guarantee screen switch to Inner App after 2.0s
    setTimeout(() => {
      setHasEntered(true);
      setIsEntering(false);
    }, 2000);
  };

  // Roleplay link Action ("Triệu Long")
  const handleThuongVi = (char: Character) => {
    addToast('Đang triệu hồi rồng, chờ xíu nhé...', 'success');
    setTimeout(() => {
      window.open(char.roleplayLink, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  // Open Story Backstory popup
  const handleBackground = (char: Character) => {
    addToast('Đang mở long ký...', 'info');
    setSelectedChar(char);
  };

  // Copy or store link of character
  const handleCopyLink = (char: Character) => {
    const link = `${window.location.origin}/character/${char.id}`;
    navigator.clipboard.writeText(char.roleplayLink).then(() => {
      addToast('Đã nhận ngọc rồi nhé! 🔮', 'success');
    }).catch(() => {
      // Fallback
      addToast('Đã nhận ngọc rồi nhé! 🔮', 'success');
    });
  };

  // Toggle Heart likes
  const handleLikeToggle = async (char: Character) => {
    const isLikedNow = likedIds.includes(char.id);
    let updatedLikedIds: string[];
    let diff = 0;

    if (isLikedNow) {
      updatedLikedIds = likedIds.filter((id) => id !== char.id);
      diff = -1;
      addToast('Đã bỏ ngọc khỏi tay!', 'heart-off');
    } else {
      updatedLikedIds = [...likedIds, char.id];
      diff = 1;
      addToast('Ngọc này đã thuộc về bạn!', 'heart-on');
    }

    // Optimistic state updates
    setLikedIds(updatedLikedIds);
    localStorage.setItem('longuyen_liked_ids', JSON.stringify(updatedLikedIds));

    // Update characters state
    const updatedChars = characters.map((c) => {
      if (c.id === char.id) {
        return { ...c, likes: Math.max(0, c.likes + diff) };
      }
      return c;
    });
    setCharacters(updatedChars);

    // Save likes count to local storage as fallback
    const likesMap: Record<string, number> = {};
    updatedChars.forEach((c) => {
      likesMap[c.id] = c.likes;
    });
    localStorage.setItem('longuyen_likes_count', JSON.stringify(likesMap));

    // Async toggle to Firebase Firestore
    try {
      await toggleCharacterLike(char.id, char.likes, isLikedNow);
    } catch (e) {
      console.warn('[App] Error in toggleCharacterLike:', e);
    }
  };

  const handleToggleGenre = (genre: string) => {
    if (genre === 'Tất cả') {
      setActiveGenres(['Tất cả']);
    } else {
      setActiveGenres((prev) => {
        const filtered = prev.filter((g) => g !== 'Tất cả');
        const next = filtered.includes(genre)
          ? filtered.filter((g) => g !== genre)
          : [...filtered, genre];
        return next.length === 0 ? ['Tất cả'] : next;
      });
    }
  };

  const handleToggleTaste = (taste: string) => {
    if (taste === 'Tất cả') {
      setActiveTastes(['Tất cả']);
    } else {
      setActiveTastes((prev) => {
        const filtered = prev.filter((t) => t !== 'Tất cả');
        const next = filtered.includes(taste)
          ? filtered.filter((t) => t !== taste)
          : [...filtered, taste];
        return next.length === 0 ? ['Tất cả'] : next;
      });
    }
  };

  const handleToggleStatus = (status: string) => {
    if (status === 'Tất cả') {
      setActiveStatuses(['Tất cả']);
    } else {
      setActiveStatuses((prev) => {
        const filtered = prev.filter((s) => s !== 'Tất cả');
        const next = filtered.includes(status)
          ? filtered.filter((s) => s !== status)
          : [...filtered, status];
        return next.length === 0 ? ['Tất cả'] : next;
      });
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveGenres(['Tất cả']);
    setActiveTastes(['Tất cả']);
    setActiveStatuses(['Tất cả']);
    addToast('Đã đặt lại bộ lọc hương vị! 🔄', 'info');
  };

  // Helper: Retrieve all tags for a character, normalized
  const getNormalizedCharTags = (char: Character): string[] => {
    const rawTags: string[] = [];
    if (char.genre) rawTags.push(char.genre);
    if (char.taste) rawTags.push(char.taste);
    if (Array.isArray(char.worldCategory)) rawTags.push(...char.worldCategory);
    if (Array.isArray(char.moodCategory)) rawTags.push(...char.moodCategory);
    if (Array.isArray(char.hashtags)) rawTags.push(...char.hashtags);

    return Array.from(
      new Set(
        rawTags
          .filter(Boolean)
          .map((t) => t.toString().toLowerCase().trim().replace(/^#/, ''))
      )
    );
  };

  // Filter Logic (AND logic across selected filters, matching against worldCategory, moodCategory & hashtags)
  const filteredCharacters = characters.filter((char) => {
    // 1. Search filter
    const matchesSearch =
      !searchTerm.trim() ||
      char.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      char.title.toLowerCase().includes(searchTerm.toLowerCase().trim());

    if (!matchesSearch) return false;

    // 2. Extract character tags
    const charTags = getNormalizedCharTags(char);

    // 3. Selected genre & taste tag filters
    const selectedGenres = activeGenres.filter((g) => g !== 'Tất cả');
    const selectedTastes = activeTastes.filter((t) => t !== 'Tất cả');
    const activeFilterTags = [...selectedGenres, ...selectedTastes];

    // AND logic: Char MUST contain ALL selected filter tags in any of its tag fields
    const matchesTagFilters =
      activeFilterTags.length === 0 ||
      activeFilterTags.every((filterTag) => {
        const normFilter = filterTag.toLowerCase().trim().replace(/^#/, '');
        return charTags.includes(normFilter);
      });

    if (!matchesTagFilters) return false;

    // 4. Status filter (AND logic if multiple statuses selected)
    const selectedStatuses = activeStatuses.filter((s) => s !== 'Tất cả');
    const matchesStatusFilter =
      selectedStatuses.length === 0 ||
      selectedStatuses.every((status) => {
        if (status === 'Hot') {
          return char.isHot || char.statusType === 'Hot' || char.statusTag === 'HOT 🔥';
        }
        if (status === 'Mới' || status === 'Tân Long') {
          return char.isNew || char.statusType === 'Mới' || char.statusTag === 'Mẻ Mới' || char.statusTag?.includes('Tân Long');
        }
        if (status === 'Kỳ Cựu') {
          return char.statusType === 'Kỳ Cựu' || char.statusTag === 'Kỳ Cựu';
        }
        if (status === 'Sắp Ra Mắt') {
          return char.isComingSoon || char.statusType === 'Sắp Ra Mắt' || char.statusTag?.includes('Sắp Ra Mắt');
        }
        return char.statusType === status;
      });

    return matchesStatusFilter;
  });

  const hashtagFilteredCharacters = characters.filter((char) => {
    if (!activeHashtag) return [];
    const normActive = activeHashtag.toLowerCase().trim().replace(/^#/, '');
    const charTags = getNormalizedCharTags(char);
    return charTags.includes(normActive);
  });

  const handleHashtagClick = (hashtag: string) => {
    addToast(`Đang tìm các vị rồng mang thuộc tính ${hashtag}...`, 'info');
    setActiveHashtag(hashtag);
  };

  const handleBackToGarden = () => {
    addToast('Quay lại Long Đường thôi! 🐉', 'success');
    setActiveHashtag(null);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#5D4E3C] relative font-sans selection:bg-[#F5C8D0] selection:text-[#3A4258] overflow-x-hidden">
      {/* Falling animation of sparkles & leaves */}
      <FallingDragons />

      {/* Floating Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className={`p-4 pr-12 rounded-[16px] shadow-lg flex items-center gap-3 backdrop-blur-md pointer-events-auto border transition-all relative ${
                toast.type === 'success'
                  ? 'bg-[#F5C8D0] border-[#E88BA0] text-[#3A4258]'
                  : toast.type === 'heart-on'
                  ? 'bg-[#FFD3B6] border-[#FFB088] text-[#991B1B]'
                  : toast.type === 'heart-off'
                  ? 'bg-[#FFF9E5] border-[#5D4E3C]/20 text-[#5D4E3C]/80'
                  : 'bg-[#FFFDF2] border-[#FFE0CE] text-[#5D4E3C]'
              }`}
            >
              <span className="text-sm font-semibold">{toast.text}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeToast(toast.id);
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full active:scale-90 transition-all duration-300 cursor-pointer group"
                title="Đóng"
                style={{ minWidth: '40px', minHeight: '40px' }}
              >
                <div className="w-7 h-7 flex items-center justify-center rounded-full group-hover:bg-[#5D4E3C]/10 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#5D4E3C] transition-transform duration-300 group-hover:rotate-90">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          /* MÀN CHÀO (LANDING) */
          <motion.div
            key="landing-screen"
            animate={{ opacity: isEntering ? 0 : 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gradient-to-b from-[#E8EAEF] to-[#F0EEED] flex flex-col justify-between items-center p-6 md:p-12 overflow-hidden"
          >
            {/* Dynamic aesthetic floating elements (Mây, ngọc, sao lấp lánh) */}
            <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden select-none">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 8, -8, 0],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 left-[8%] z-0 text-[#B8C4D8]"
              >
                <span className="text-6xl filter drop-shadow opacity-80">✦</span>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, -12, 12, 0],
                  opacity: [0.7, 0.95, 0.7]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-[25%] right-[12%] z-0 text-[#F5C8D0]"
              >
                <span className="text-5xl filter drop-shadow">✨</span>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                  opacity: [0.5, 0.85, 0.5]
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-20 left-[15%] z-0 text-[#B8C4D8]"
              >
                <span className="text-5xl filter drop-shadow opacity-70">✧</span>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, -15, 15, 0],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-[35%] right-[22%] z-0 text-[#E88BA0]"
              >
                <span className="text-5xl filter drop-shadow">🔮</span>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -18, 0],
                  rotate: [0, -7, 7, 0],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-[50%] left-[80%] z-0 text-[#B8C4D8]"
              >
                <span className="text-4xl filter drop-shadow opacity-80">⋆</span>
              </motion.div>
            </div>

            <div /> {/* Spacer */}

            {/* Central Header with CTA and Long Uyển Avatar */}
            <div className="text-center max-w-lg z-10 flex flex-col items-center">
              {/* AVATAR LONG UYỂN */}
              <motion.div
                animate={
                  isEntering
                    ? {
                        scaleY: [1, 0.4, 1.25, 0.9, 1],
                        scaleX: [1, 1.5, 0.75, 1.1, 1],
                        rotate: [0, -15, 15, -10, 0],
                        transition: { duration: 1.2, ease: 'easeInOut' }
                      }
                    : {
                        y: [0, -10, 0],
                        transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                      }
                }
                className="w-28 h-28 p-1.5 border border-[#7A8AA5]/50 rounded-[28px] shadow-lg mb-6 cursor-pointer select-none relative group bg-[#F8F6F5]/80 backdrop-blur-sm"
                onClick={handleEnterGarden}
                title="Long Uyển Avatar"
              >
                <div className="w-full h-full rounded-[20px] overflow-hidden">
                  <img
                    src="https://i.ibb.co/93qnWNTK/avt.png"
                    alt="Long Uyển Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              {/* Title and Subtitle */}
              <h1 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#5A6B85] to-[#D66A85] bg-clip-text text-transparent mb-3 leading-none">
                Long Uyển Của Shin
              </h1>
              <p className="font-comfortaa text-sm md:text-base text-[#6B7590] font-semibold tracking-wider mb-8">
                Created by Kamishiro Shinju
              </p>

              {/* CTA button (Gradient 3 màu: xanh xám -> hồng phấn -> hồng phấn đậm) */}
              <motion.button
                id="enter-garden-cta"
                disabled={isEntering}
                onClick={handleEnterGarden}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-10 py-4 rounded-full font-serif font-bold text-sm text-[#3A4258] bg-gradient-to-r from-[#B8C4D8] via-[#F5C8D0] to-[#E88BA0] hover:from-[#7A8AA5] hover:via-[#E88BA0] hover:to-[#D66A85] hover:text-[#F8F6F5] shadow-[0_8px_24px_rgba(214,106,133,0.25)] hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-2 group border border-[#B8C4D8]/50"
              >
                <span className="tracking-widest">THAM QUAN LONG UYỂN</span>
                <span className="text-lg group-hover:translate-x-1.5 transition-transform duration-300">✨</span>
              </motion.button>
            </div>

            {/* Social links below CTA */}
            <div className="z-10 flex items-center gap-6 text-[#6B7590] font-sans text-xs tracking-wide font-medium mt-8 border-t border-[#D8DEE8] pt-6 w-full max-w-sm justify-center">
              <a
                href="https://facebook.com/kamishiro.shin"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#3A4258] flex items-center gap-1 transition-colors group cursor-pointer"
              >
                <Facebook size={13} className="group-hover:-translate-y-0.5 transition-transform" />
                Facebook
              </a>
              <span className="text-[#D8DEE8]">•</span>
              <button
                onClick={() => addToast('Kênh TikTok của Shin đang được ươm mầm, sớm ra mắt nha! 🐉', 'info')}
                className="hover:text-[#3A4258] flex items-center gap-1 transition-colors group cursor-pointer bg-transparent border-none p-0"
              >
                <Music size={13} className="group-hover:animate-spin" />
                TikTok
              </button>
            </div>
          </motion.div>
        ) : (
          /* GIAO DIỆN BÊN TRONG (INNER APP) */
          <motion.div
            key="inner-garden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full min-h-screen flex flex-col inner-app-bg"
          >
            {/* Header section with sound controls and donate button */}
            <header className="sticky top-0 z-30 bg-[#F0EEED] border-b border-[#D8DEE8] shadow-sm py-2.5 px-4 md:px-12">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 w-full">
                {/* Music Player (Co giãn phần lớn không gian) */}
                <div className="flex-1 min-w-0">
                  <MiniMusicPlayer addToast={addToast} hasEntered={hasEntered} />
                </div>

                {/* Nút Donate (Gradient hồng phấn) */}
                <button
                  onClick={() => setShowDonatePopup(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#E88BA0] to-[#D66A85] hover:from-[#D66A85] hover:to-[#E88BA0] text-[#F8F6F5] font-extrabold text-xs md:text-sm shadow-sm hover:shadow active:scale-95 transition-all duration-300 cursor-pointer border border-[#E88BA0]/50 shrink-0 font-comfortaa h-10 md:h-9"
                  title="Ủng hộ Shin"
                >
                  <span className="text-sm md:text-base">🔮</span>
                  <span>Donate</span>
                </button>
              </div>
            </header>

            {/* BẢNG TIN LONG TRẠM (BULLETIN TICKER - FULL SCREEN WIDTH SCROLLING) */}
            <div className="relative bg-[#F0EEED] border-y border-[#D8DEE8] shadow-sm z-10 overflow-hidden w-full py-2 px-0 select-none">
              <div className="relative w-full overflow-hidden h-6 flex items-center">
                <div className="animate-marquee absolute flex text-xs text-[#3A4258] font-extrabold font-sans tracking-wider">
                  <div className="flex shrink-0">
                    {BULLETINS.map(b => (
                      <div key={`b1-${b.id}`} className="flex items-center">
                        <button 
                          onClick={() => setSelectedBulletin(b)}
                          className="cursor-pointer hover:text-[#7A8AA5] transition-colors focus:outline-none animate-text-blink"
                        >
                          {b.text}
                        </button>
                        <span className="mx-8 text-[#7A8AA5]">✦</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex shrink-0">
                    {BULLETINS.map(b => (
                      <div key={`b2-${b.id}`} className="flex items-center">
                        <button 
                          onClick={() => setSelectedBulletin(b)}
                          className="cursor-pointer hover:text-[#7A8AA5] transition-colors focus:outline-none animate-text-blink"
                        >
                          {b.text}
                        </button>
                        <span className="mx-8 text-[#7A8AA5]">✦</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN TAB SWITCHER */}
            <div className="w-full flex justify-center mt-6 mb-2">
              <div className="bg-white/60 backdrop-blur-sm p-1.5 rounded-full border border-[#D8DEE8] shadow-sm inline-flex">
                <button
                  onClick={() => setActiveMainTab('long-duong')}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center space-x-2 transition-all cursor-pointer ${
                    activeMainTab === 'long-duong'
                      ? 'bg-gradient-to-r from-[#7A8AA5] to-[#E88BA0] text-[#F8F6F5] shadow-sm'
                      : 'text-[#6B7590] hover:text-[#3A4258]'
                  }`}
                >
                  <Sparkles size={16} />
                  <span>Long Đường</span>
                </button>
                <button
                  onClick={() => setActiveMainTab('long-dan')}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center space-x-2 transition-all cursor-pointer relative ${
                    activeMainTab === 'long-dan'
                      ? 'bg-gradient-to-r from-[#7A8AA5] to-[#E88BA0] text-[#F8F6F5] shadow-sm'
                      : 'text-[#6B7590] hover:text-[#3A4258]'
                  }`}
                >
                  <Gift size={16} className={activeMainTab === 'long-dan' ? '' : 'text-[#E88BA0]'} />
                  <span>Long Đản</span>
                  {todayBirthdayChar && <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#E88BA0] rounded-full animate-ping"></span>}
                  {todayBirthdayChar && <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#E88BA0] rounded-full border border-white"></span>}
                </button>
              </div>
            </div>

            {/* MAIN APP CONTAINER */}
            <main className="max-w-7xl mx-auto p-6 md:p-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-8 items-start relative">
              {activeMainTab === 'long-duong' ? (
                <>
                  {/* MOOD QUIZ CORNER (FULL WIDTH AT TOP) */}
              <div className="lg:col-span-4 w-full">
                <MoodQuiz
                  characters={characters}
                  onThuongVi={handleThuongVi}
                  onShowBackstory={handleBackground}
                />
              </div>
              
              {/* SIDEBAR COLUMNS (Top Chanh Board & Filters) */}
              <div className="space-y-6 lg:col-span-1">
                
                {/* 1. TOP CHANH NHÀ SHIN (DYNAMIC LEADERBOARD) */}
                <Leaderboard
                  characters={characters}
                  onShowBackstory={handleBackground}
                />

                {/* 2. COMPREHENSIVE FILTER SYSTEM */}
                <div className="glass-card rounded-[24px] p-6">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#FFE0CE]/80">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🧭</span>
                      <h3 className="font-serif text-base font-extrabold text-[#3A4258]">
                        Bộ Lọc Long Vị
                      </h3>
                    </div>
                    {/* Reset Button */}
                    <button
                      onClick={handleResetFilters}
                      className="text-[11px] font-bold text-[#7A8AA5] hover:text-[#3A4258] transition-colors flex items-center gap-1 cursor-pointer bg-[#E8EAEF] hover:bg-[#D8DEE8] px-2.5 py-1 rounded-lg border border-[#D8DEE8]"
                    >
                      Đặt lại
                    </button>
                  </div>

                  {/* Search bar inside filter */}
                  <div className="relative mb-5">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7590]" size={14} />
                    <input
                      type="text"
                      placeholder="Tầm Long (Tìm tên rồng)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full text-xs bg-white border border-[#D8DEE8] rounded-[12px] py-2.5 pl-10 pr-4 text-[#3A4258] placeholder-[#9AAAC5] outline-none focus:border-[#7A8AA5] focus:ring-1 focus:ring-[#7A8AA5]/30 transition-all font-medium font-sans"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-[#D8DEE8] rounded-full text-[#6B7590]"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </div>

                  {/* Thể Loại Filter */}
                  <div className="mb-4">
                    <span className="block text-[10px] font-bold text-[#6B7590] uppercase tracking-widest mb-2 font-sans">
                      🐉 Long Tộc (Thể Loại)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Tất cả', 'TXVT', 'Hắc Bang', 'Thần Thoại', 'Cổ Điển', 'Hiện Đại'].map((genre) => {
                        const isSelected = activeGenres.includes(genre);
                        return (
                          <button
                            key={genre}
                            onClick={() => handleToggleGenre(genre)}
                            className={`text-xs px-2.5 py-1.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'bg-[#7A8AA5] text-[#F8F6F5] shadow-sm'
                                : 'bg-[#E8EAEF] hover:bg-[#D8DEE8] text-[#3A4258]'
                            }`}
                          >
                            {genre}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Long Vị Filter */}
                  <div className="mb-4">
                    <span className="block text-[10px] font-bold text-[#6B7590] uppercase tracking-widest mb-2 font-sans">
                      🔮 Long Vị (Trải nghiệm)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Tất cả', 'Ngọt', 'Ngược', 'Sủng', 'Ngọt xen đau', 'Yêu Thầm', 'Slow Burn', 'NSFW', 'Open World'].map((taste) => {
                        const isSelected = activeTastes.includes(taste);
                        return (
                          <button
                            key={taste}
                            onClick={() => handleToggleTaste(taste)}
                            className={`text-xs px-2.5 py-1.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'bg-[#E88BA0] text-[#F8F6F5] shadow-sm'
                                : 'bg-[#E8EAEF] hover:bg-[#D8DEE8] text-[#3A4258]'
                            }`}
                          >
                            {taste}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <span className="block text-[10px] font-bold text-[#6B7590] uppercase tracking-widest mb-2 font-sans">
                      🌱 Phân Loại Rồng
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Tất cả', 'Mới', 'Hot', 'Kỳ Cựu', 'Sắp Ra Mắt'].map((status) => {
                        const isSelected = activeStatuses.includes(status);
                        return (
                          <button
                            key={status}
                            onClick={() => handleToggleStatus(status)}
                            className={`text-xs px-2.5 py-1.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'bg-[#B8C4D8] text-[#3A4258] font-bold shadow-sm'
                                : 'bg-[#E8EAEF] hover:bg-[#D8DEE8] text-[#3A4258]'
                            }`}
                          >
                            {status === 'Mới' ? 'Tân Long' : status}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT AREA: CARDS GRID & FEEDBACK BOARD */}
              <div className="lg:col-span-3 space-y-8">
                
                {activeHashtag ? (
                  /* VIEW BY HASHTAG MODE */
                  <motion.div
                    key="hashtag-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* BREADCRUMB & HEADER */}
                    <div className="space-y-3">
                      {/* Breadcrumb */}
                      <div className="text-xs text-[#5D4E3C]/60 font-semibold flex items-center gap-1 font-comfortaa">
                        <span>Long Đường</span>
                        <span>&gt;</span>
                        <span className="text-[#FFB088] font-bold">{activeHashtag}</span>
                      </div>
                      
                      {/* Title & Stats */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#FFE0CE] pb-6">
                        <div>
                          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#5D4E3C] flex items-center gap-2">
                            <span>🏷️</span> Rồng có thuộc tính <span className="text-[#FFB088] font-extrabold">{activeHashtag}</span>
                          </h1>
                          <p className="text-xs text-[#5D4E3C]/60 font-medium mt-1 font-comfortaa">
                            {hashtagFilteredCharacters.length > 0 
                              ? `Tìm thấy ${hashtagFilteredCharacters.length} vị rồng mang thuộc tính này`
                              : "Long Uyển chưa có rồng nào hợp mệnh này. Tầm long khác nhé 🐉"}
                          </p>
                        </div>
                        
                        {/* Back Button */}
                        <button
                          onClick={handleBackToGarden}
                          className="self-start md:self-center px-5 py-2.5 rounded-full font-bold text-xs text-[#3A4258] bg-[#FFF9E5] hover:bg-[#F5C8D0]/40 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow active:scale-95 border border-[#B8C4D8]/30"
                        >
                          <span>← Quay lại Long Đường</span>
                        </button>
                      </div>
                    </div>

                    {/* MATCHING CHARACTERS GRID */}
                    {hashtagFilteredCharacters.length > 0 ? (
                      <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      >
                        <AnimatePresence mode="popLayout">
                          {hashtagFilteredCharacters.map((char) => (
                            <CharacterCard
                              key={char.id}
                              character={char}
                              isLiked={likedIds.includes(char.id)}
                              onThuongVi={handleThuongVi}
                              onBackground={handleBackground}
                              onCopyLink={handleCopyLink}
                              onLikeToggle={handleLikeToggle}
                              onFeedback={(char) => setFeedbackChar(char)}
                              onBirthdayClick={(char) => setBirthdayChar(char)}
                              onHashtagClick={handleHashtagClick}
                              onToast={addToast}
                            />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <div className="glass-card rounded-[24px] p-12 text-center flex flex-col items-center justify-center">
                        <span className="text-5xl mb-4 animate-bounce">✨</span>
                        <h3 className="font-serif text-lg font-bold text-[#5D4E3C]">
                          Chưa có vị rồng nào!
                        </h3>
                        <p className="text-xs text-[#5D4E3C]/60 max-w-sm mt-1">
                          Chưa có vị rồng nào mang thuộc tính này cả. Quay lại Long Đường thôi!
                        </p>
                        <button
                          onClick={handleBackToGarden}
                          className="mt-4 text-xs font-bold text-[#3A4258] bg-[#F5C8D0]/50 hover:bg-[#F5C8D0]/90 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                          Quay lại Long Đường
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  /* STANDARD CHARACTER LIST MODE */
                  <div className="space-y-8">
                    {/* CARDS GRID HEADER */}
                    <div className="flex items-center justify-between border-b border-[#FFE0CE] pb-4">
                      <div>
                        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#5D4E3C] flex items-center gap-2">
                          <span>✨</span> Danh Sách Triệu Hồi
                        </h1>
                        <div className="text-xs text-[#5D4E3C]/80 font-medium mt-1 font-sans">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`${filteredCharacters.length}-${characters.length}`}
                              initial={{ opacity: 0, y: -2, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 2, scale: 0.98 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="flex items-center gap-1.5 flex-wrap"
                            >
                              {filteredCharacters.length === characters.length ? (
                                <span className="flex items-center gap-1.5">
                                  Long Uyển hiện có{' '}
                                  <strong className="text-sm font-extrabold text-[#E88BA0] bg-[#F5C8D0]/30 px-2 py-0.5 rounded-md inline-block">
                                    {characters.length}
                                  </strong>{' '}
                                  rồng, cùng dạo một vòng nhé ✨
                                </span>
                              ) : filteredCharacters.length === 0 ? (
                                <span className="flex items-center gap-1.5">
                                  Long Uyển có{' '}
                                  <strong className="text-sm font-extrabold text-[#8A7A62] bg-[#FFF3D6] px-2 py-0.5 rounded-md inline-block">
                                    {characters.length}
                                  </strong>{' '}
                                  rồng, nhưng chưa có vị nào hợp mệnh này. Tầm long khác nhé ✨
                                </span>
                              ) : (
                                <span className="flex items-center gap-1.5 flex-wrap">
                                  <span>✨ Long Uyển có</span>
                                  <strong className="text-sm font-extrabold text-[#E88BA0] bg-[#F5C8D0]/30 px-2 py-0.5 rounded-md inline-block">
                                    {characters.length}
                                  </strong>
                                  <span>rồng</span>
                                  <span className="text-[#8A7A62]/60 font-bold">·</span>
                                  <span>Bạn đã triệu được</span>
                                  <strong className="text-sm font-extrabold text-[#7A8AA5] bg-[#B8C4D8]/30 px-2 py-0.5 rounded-md inline-block">
                                    {filteredCharacters.length}
                                  </strong>
                                  <span>rồng hợp mệnh</span>
                                </span>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* CARDS GRID */}
                    {filteredCharacters.length > 0 ? (
                      <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      >
                        <AnimatePresence mode="popLayout">
                          {filteredCharacters.map((char) => (
                            <CharacterCard
                              key={char.id}
                              character={char}
                              isLiked={likedIds.includes(char.id)}
                              onThuongVi={handleThuongVi}
                              onBackground={handleBackground}
                              onCopyLink={handleCopyLink}
                              onLikeToggle={handleLikeToggle}
                              onFeedback={(char) => setFeedbackChar(char)}
                              onBirthdayClick={(char) => setBirthdayChar(char)}
                              onHashtagClick={handleHashtagClick}
                              onToast={addToast}
                            />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <div className="glass-card rounded-[24px] p-12 text-center flex flex-col items-center justify-center">
                        <span className="text-5xl mb-4 animate-bounce">✨</span>
                        <h3 className="font-serif text-lg font-bold text-[#5D4E3C]">
                          Vị rồng này chưa được triệu hồi!
                        </h3>
                        <p className="text-xs text-[#5D4E3C]/60 max-w-sm mt-1">
                          Hãy điều chỉnh bộ lọc hoặc gửi confession cho Shin nhé!
                        </p>
                        <button
                          onClick={() => {
                            handleResetFilters();
                          }}
                          className="mt-4 text-xs font-bold text-[#3A4258] bg-[#F5C8D0]/50 hover:bg-[#F5C8D0]/90 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                          Xóa Bộ Lọc
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. GÓC CONFESSION (CONFESSION CORNER) */}
                <ConfessionCorner addToast={addToast} />
              </div>
                </>
              ) : (
                <div className="lg:col-span-4 w-full">
                  <BirthdaySeason 
                    characters={characters} 
                    onOpenBirthdayModal={(char) => setBirthdayChar(char)} 
                  />
                </div>
              )}
            </main>

            {/* REVISED APP FOOTER */}
            <footer className="mt-16 bg-[#F0EEED] border-t border-[#D8DEE8] rounded-t-[32px] py-10 px-6 text-center">
              <div className="max-w-2xl mx-auto flex flex-col items-center gap-4 text-[#6B7590]">
                {/* Social icons with pastel line style */}
                <div className="flex items-center gap-5 mb-2">
                  <a
                    href="https://facebook.com/kamishiro.shin"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-[#F8F6F5] hover:bg-[#D8DEE8] text-[#6B7590] hover:text-[#3A4258] transition-all duration-300 border border-[#D8DEE8] hover:scale-110 cursor-pointer"
                    title="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                  <button
                    onClick={() => addToast('Kênh TikTok của Shin đang được ươm mầm, sớm ra mắt nha! 🔮', 'info')}
                    className="p-2 rounded-full bg-[#F8F6F5] hover:bg-[#D8DEE8] text-[#6B7590] hover:text-[#3A4258] transition-all duration-300 border border-[#D8DEE8] hover:scale-110 cursor-pointer"
                    title="TikTok"
                  >
                    <Music size={16} />
                  </button>
                </div>

                {/* Line 1: Main copyright & Cultivation */}
                <div className="flex items-center justify-center gap-2.5">
                  <div className="p-0.5 border border-[#7A8AA5]/50 rounded-full flex items-center justify-center shrink-0 bg-[#F8F6F5]">
                    <img
                      src="https://i.ibb.co/93qnWNTK/avt.png"
                      alt="Long Uyển Avatar"
                      className="w-7 h-7 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-sm md:text-base font-bold font-serif tracking-wide text-[#3A4258]">
                    2026 Long Uyển Của Shin — Created by Kamishiro Shinju
                  </p>
                </div>
                
                {/* Line 2: Cute sub-text */}
                <p className="text-xs font-comfortaa text-[#6B7590]">
                  Một góc nhỏ dành cho những ai yêu mến rồng của Shin 🐉
                </p>

                {/* Visitor Counter Pill Badge */}
                <VisitorCounter />

                {/* Separator */}
                <div className="w-16 h-0.5 bg-[#D8DEE8] my-1 rounded-full opacity-80" />

                {/* Bottom thank you text */}
                <p className="text-[10px] font-comfortaa tracking-widest text-[#6B7590]/80 italic font-light mt-1">
                  Cảm ơn bạn đã ghé thăm Long Uyển hôm nay ✨
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRIỆU LONG OVERLAY TRANSITION (RITUAL ANIMATION OVERLAY) */}
      <TrieuLongOverlay
        isActive={isEntering}
        onComplete={() => {
          setHasEntered(true);
          setIsEntering(false);
        }}
      />

      {/* CHARACTER BACKSTORY MODAL POPUP */}
      <StoryModal
        character={selectedChar}
        onClose={() => setSelectedChar(null)}
        onLike={handleLikeToggle}
        isLiked={selectedChar ? likedIds.includes(selectedChar.id) : false}
        onToast={addToast}
      />

      {/* CHARACTER FEEDBACK MODAL */}
      <AnimatePresence>
        {feedbackChar && (
          <CharacterFeedbackModal
            charId={feedbackChar.id}
            charName={feedbackChar.name}
            onClose={() => setFeedbackChar(null)}
            addToast={addToast}
          />
        )}
      </AnimatePresence>

      {/* BIRTHDAY MODAL */}
      <AnimatePresence>
        {birthdayChar && (
          <BirthdayModal
            character={birthdayChar}
            onClose={() => setBirthdayChar(null)}
            addToast={addToast}
          />
        )}
      </AnimatePresence>

      {/* BULLETIN DETAIL MODAL */}
      <AnimatePresence>
        {selectedBulletin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedBulletin(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F8F6F5] border border-[#D8DEE8] p-8 rounded-[32px] shadow-2xl max-w-md w-full relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 opacity-15 text-[#7A8AA5]"><Sparkles className="w-28 h-28" /></div>
              <DragonCloseButton 
                onClick={() => setSelectedBulletin(null)}
                className="absolute top-4 right-4 z-20"
                tooltip="Đóng bảng tin"
              />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7A8AA5] to-[#E88BA0] rounded-2xl flex items-center justify-center mb-4 shadow-inner text-[#F8F6F5]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#3A4258] mb-4">{selectedBulletin.title}</h2>
                <p className="text-[#6B7590] font-comfortaa leading-relaxed text-sm">
                  {selectedBulletin.detail}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BIRTHDAY APP ENTRY POPUP */}
      <AnimatePresence>
        {showBirthdayPopup && todayBirthdayChar && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowBirthdayPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F8F6F5] p-8 rounded-[32px] border-2 border-[#D8DEE8] shadow-2xl max-w-sm w-full text-center relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 opacity-15 text-[#7A8AA5]"><Sparkles className="w-28 h-28" /></div>
              <div className="absolute -bottom-10 -left-10 opacity-15 text-[#7A8AA5]"><Sparkles className="w-28 h-28" /></div>
              
              <DragonCloseButton 
                onClick={() => setShowBirthdayPopup(false)}
                className="absolute top-4 right-4 z-20"
                tooltip="Để sau"
              />
              
              <div className="relative z-10">
                <Gift className="w-16 h-16 text-[#E88BA0] mx-auto mb-4 animate-bounce" />
                <h2 className="font-serif text-2xl font-bold text-[#3A4258] mb-2">Ting Ting! 🎂</h2>
                <p className="text-[#6B7590] font-comfortaa mb-6">
                  Hôm nay <strong>{todayBirthdayChar.name}</strong> đang chờ lời chúc của bạn đấy! 🐉
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowBirthdayPopup(false);
                      setBirthdayChar(todayBirthdayChar);
                    }}
                    className="w-full bg-gradient-to-r from-[#7A8AA5] to-[#E88BA0] text-[#F8F6F5] font-bold py-3 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all font-comfortaa cursor-pointer"
                  >
                    Đến chúc mừng ngay
                  </button>
                  <button
                    onClick={() => setShowBirthdayPopup(false)}
                    className="w-full bg-white/50 border border-[#D8DEE8] text-[#6B7590] font-bold py-3 rounded-2xl hover:bg-white hover:text-[#3A4258] transition-all font-comfortaa cursor-pointer"
                  >
                    Để sau
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DONATE MODAL */}
      <AnimatePresence>
        {showDonatePopup && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDonatePopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F8F6F5] border border-[#D8DEE8] p-8 rounded-[32px] shadow-2xl max-w-sm w-full text-center relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 opacity-15 text-[#7A8AA5]"><Sparkles className="w-28 h-28" /></div>
              
              <DragonCloseButton 
                onClick={() => setShowDonatePopup(false)}
                className="absolute top-4 right-4 z-20"
                tooltip="Đóng lại"
              />
              
              <div className="relative z-10">
                <div className="w-16 h-16 p-1 border border-[#7A8AA5]/50 rounded-full shadow-md mx-auto mb-4 flex items-center justify-center bg-[#F8F6F5]">
                  <img
                    src="https://i.ibb.co/93qnWNTK/avt.png"
                    alt="Long Uyển Avatar"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#3A4258] mb-2">Mời Shin một tách trà Long Tĩnh 🐉</h2>
                <p className="text-[#6B7590] font-comfortaa text-xs mb-6 leading-relaxed">
                  Nếu bạn yêu mến Long Uyển này, có thể gửi Shin chút yêu thương nhé 🌸
                </p>
                
                {/* QR Code Placeholder with pretty border */}
                <div className="w-48 h-48 bg-white border-2 border-[#D8DEE8] rounded-[24px] p-3 mx-auto mb-6 flex items-center justify-center shadow-inner relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#7A8AA5]/10 to-[#E88BA0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <img
                    src="https://i.ibb.co/2YKqsK0X/QR-MB.jpg"
                    alt="QR Code Donate Placeholder"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-lg filter contrast-[1.05]"
                  />
                </div>

                {/* Account Details */}
                <div className="bg-[#F0EEED] border border-[#D8DEE8] rounded-[20px] p-4 text-center max-w-[280px] mx-auto mb-6 text-[#3A4258] font-comfortaa space-y-2.5 shadow-inner">
                  <div className="text-xs">
                    <span className="font-semibold text-[#6B7590]">Chủ tài khoản: </span>
                    <span className="font-extrabold text-[#3A4258]">{DONATE_ACCOUNT_HOLDER}</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-[#6B7590]">Ngân hàng: </span>
                    <span className="font-extrabold text-[#3A4258]">{DONATE_BANK_NAME}</span>
                  </div>
                  <div className="text-xs flex items-center justify-center gap-1.5 bg-white py-1.5 px-3 rounded-xl border border-[#D8DEE8]">
                    <div className="truncate min-w-0">
                      <span className="font-semibold text-[#6B7590]">Số tài khoản: </span>
                      <span className="font-mono font-extrabold text-[#3A4258] select-all">{DONATE_ACCOUNT_NUMBER}</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(DONATE_ACCOUNT_NUMBER)
                          .then(() => {
                            addToast('Đã copy số tài khoản rồi nhé 🐉', 'success');
                          })
                          .catch((err) => {
                            console.error('Failed to copy STK: ', err);
                          });
                      }}
                      className="shrink-0 p-1 rounded-lg bg-[#7A8AA5]/20 hover:bg-[#7A8AA5] active:scale-90 text-[#3A4258] hover:text-white transition-all cursor-pointer flex items-center justify-center"
                      title="Copy số tài khoản"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p className="text-[11px] font-comfortaa tracking-wide text-[#6B7590] bg-[#F0EEED] py-2 px-4 rounded-xl inline-block border border-[#D8DEE8]">
                  Chân thành cảm ơn bạn 🌸
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
