import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../types';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, where, serverTimestamp, arrayUnion, arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import confetti from 'canvas-confetti';
import { Heart, Send, Gift, Sparkles } from 'lucide-react';
import DragonCloseButton from './DragonCloseButton';

interface BirthdayWish {
  id: string;
  charId: string;
  username: string;
  content: string;
  timestamp: any;
  likes: number;
  likedBy: string[];
}

interface BirthdayModalProps {
  character: Character;
  onClose: () => void;
  addToast: (msg: string, type: 'info' | 'success') => void;
}

export default function BirthdayModal({ character, onClose, addToast }: BirthdayModalProps) {
  const [wishes, setWishes] = useState<BirthdayWish[]>([]);
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState<string>('');
  
  const [userId] = useState(() => {
    let id = localStorage.getItem('longuyen_userid');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('longuyen_userid', id);
    }
    return id;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#7A8AA5', '#E88BA0', '#B8C4D8', '#F5C8D0']
      }));
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#7A8AA5', '#E88BA0', '#B8C4D8', '#F5C8D0']
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem('longuyen_username') || 'Khách Ẩn Danh';
    setUsername(savedName);

    const q = query(
      collection(db, 'birthday_wishes'),
      where('charId', '==', character.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BirthdayWish[];
      
      data.sort((a, b) => {
        const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : (a.timestamp ? new Date(a.timestamp).getTime() : 0);
        const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : (b.timestamp ? new Date(b.timestamp).getTime() : 0);
        return timeB - timeA;
      });
      
      setWishes(data);
    }, (error) => {
      console.warn("Index might be needed:", error);
      try { handleFirestoreError(error, OperationType.GET, 'birthday_wishes'); } catch(e){}
    });

    return () => unsubscribe();
  }, [character.id]);

  const handleSendWish = async () => {
    if (!newContent.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'birthday_wishes'), {
        charId: character.id,
        username,
        content: newContent.trim(),
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: []
      });
      setNewContent('');
      addToast(`Đã gửi lời chúc cho ${character.name}!`, 'success');
      
      // Mini confetti burst on send
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFE873', '#FFD3B6']
      });
    } catch (err) {
      console.error(err);
      addToast('Có lỗi xảy ra, thử lại sau nhé!', 'info');
    }
    setIsSubmitting(false);
  };

  const handleLike = async (wishId: string, isLiked: boolean) => {
    try {
      const docRef = doc(db, 'birthday_wishes', wishId);
      const currentWish = wishes.find(w => w.id === wishId);
      await updateDoc(docRef, {
        likedBy: isLiked ? arrayRemove(userId) : arrayUnion(userId),
        likes: isLiked ? (currentWish?.likes || 1) - 1 : (currentWish?.likes || 0) + 1
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (ts: any) => {
    if (!ts) return 'Vừa xong';
    try {
      const date = ts.toDate ? ts.toDate() : new Date(ts);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch {
      return 'Gần đây';
    }
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
      >
        <DragonCloseButton onClick={onClose} className="absolute top-4 right-4 z-20" tooltip="Khép lại buổi tiệc" />

        {/* Left Side: Image & Hero */}
        <div className="w-full md:w-1/2 relative h-48 md:h-auto flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <img 
            src={character.birthdayImage || character.avatar} 
            alt={character.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold mb-3 border border-white/30">
              <Gift className="w-4 h-4 text-[#FFE873]" />
              <span>Long Đản</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-1 leading-tight text-[#FFE873]">
              Chúc mừng sinh nhật,
              <br />
              {character.name}! 🎉
            </h2>
            {character.age && (
              <p className="text-white/80 font-comfortaa">Lần thứ {character.age} đón sinh nhật</p>
            )}
          </div>
        </div>

        {/* Right Side: Wishes Content */}
        <div className="w-full md:w-1/2 flex flex-col h-[50vh] md:h-[80vh] bg-[#F8F6F5]">
          <div className="flex-none p-6 border-b-2 border-[#D8DEE8] bg-white/50 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-10">
              <Sparkles className="w-32 h-32 text-[#E88BA0]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3A4258] mb-2 relative z-10">Gửi lời chúc</h3>
            <p className="text-[#6B7590] text-xs font-comfortaa mb-4 relative z-10">
              Bạn đang gửi với tên: <strong className="text-[#E88BA0]">{username}</strong>
            </p>
            
            <div className="relative z-10">
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder={`Gửi lời yêu thương đến ${character.name} nhân ngày đặc biệt...`}
                className="w-full bg-white/80 border-2 border-[#D8DEE8] rounded-2xl px-4 py-3 pb-10 text-sm text-[#3A4258] placeholder:text-[#9AAAC5] focus:outline-none focus:border-[#7A8AA5] transition-all font-comfortaa resize-none h-28"
                maxLength={500}
              />
              <div className="absolute bottom-2 left-3 text-[10px] text-[#6B7590] font-comfortaa">
                {newContent.length}/500
              </div>
              <button
                onClick={handleSendWish}
                disabled={isSubmitting || !newContent.trim()}
                className="absolute bottom-2 right-2 bg-gradient-to-r from-[#7A8AA5] to-[#E88BA0] text-[#F8F6F5] font-bold py-1.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center space-x-1.5"
              >
                <span>Thả vào tiệc</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <h3 className="font-serif text-sm font-bold text-[#3A4258]/80 mb-2">Lời chúc từ Long Uyển ({wishes.length})</h3>
            
            <AnimatePresence>
              {wishes.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[#6B7590] text-sm py-10 font-comfortaa">
                  <Gift className="w-12 h-12 mx-auto mb-3 text-[#7A8AA5]/50" />
                  Chưa có lời chúc nào. Hãy là người đầu tiên nhé!
                </motion.div>
              ) : (
                wishes.map((wish) => {
                  const isLiked = wish.likedBy?.includes(userId);
                  return (
                    <motion.div 
                      key={wish.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-[20px] p-4 shadow-sm border border-[#D8DEE8]"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#7A8AA5] to-[#E88BA0] rounded-full flex items-center justify-center text-white">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-[#3A4258] text-sm block leading-tight">{wish.username}</span>
                          <span className="text-[10px] text-[#6B7590] font-comfortaa">{formatTime(wish.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-[#3A4258]/90 text-sm font-comfortaa mb-3 whitespace-pre-wrap pl-11">{wish.content}</p>
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleLike(wish.id, isLiked)}
                          className={`flex items-center space-x-1 text-xs font-bold px-2 py-1.5 rounded-lg transition-all ${isLiked ? 'text-[#E88BA0] bg-[#E88BA0]/10' : 'text-[#6B7590] hover:bg-black/5 hover:text-[#E88BA0]'}`}
                        >
                          <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
                          <span>{wish.likes || 0}</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
