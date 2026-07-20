import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, serverTimestamp, arrayUnion, arrayRemove, where } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import CuteLemon from './CuteLemon';
import { Heart, Send, Edit2 } from 'lucide-react';
import LemonCloseButton from './LemonCloseButton';

interface CharacterFeedback {
  id: string;
  charId: string;
  username: string;
  rating: number;
  content: string;
  timestamp: any;
  likes: number;
  likedBy: string[];
}

interface CharacterFeedbackModalProps {
  charId: string;
  charName: string;
  onClose: () => void;
  addToast: (msg: string, type: 'info' | 'success') => void;
}

export default function CharacterFeedbackModal({ charId, charName, onClose, addToast }: CharacterFeedbackModalProps) {
  const [feedbacks, setFeedbacks] = useState<CharacterFeedback[]>([]);
  const [username, setUsername] = useState<string>('');
  const [showNamePrompt, setShowNamePrompt] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>('');
  
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Store action to replay after setting name
  const [pendingAction, setPendingAction] = useState<{
    type: 'like' | 'submit';
    data?: any;
  } | null>(null);

  const [userId] = useState(() => {
    let id = localStorage.getItem('vuonchanh_userid');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('vuonchanh_userid', id);
    }
    return id;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showNamePrompt) {
          setShowNamePrompt(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showNamePrompt]);

  useEffect(() => {
    const savedName = localStorage.getItem('vuonchanh_username');
    if (savedName) {
      setUsername(savedName);
    }

    const q = query(
      collection(db, 'char_feedbacks'), 
      where('charId', '==', charId)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as CharacterFeedback[];
      
      // Sort in memory by timestamp descending
      data.sort((a, b) => {
        const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : (a.timestamp ? new Date(a.timestamp).getTime() : 0);
        const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : (b.timestamp ? new Date(b.timestamp).getTime() : 0);
        return timeB - timeA;
      });
      
      setFeedbacks(data);
    }, (error) => {
      console.warn("Index might be needed:", error);
      try {
        handleFirestoreError(error, OperationType.GET, 'char_feedbacks');
      } catch (err) {
        // Log is handled
      }
    });

    return () => unsubscribe();
  }, [charId]);

  // Sync username changes from other components
  useEffect(() => {
    const handleUsernameChanged = () => {
      const savedName = localStorage.getItem('vuonchanh_username');
      if (savedName) {
        setUsername(savedName);
      }
    };
    window.addEventListener('vuonchanh_username_changed', handleUsernameChanged);
    return () => window.removeEventListener('vuonchanh_username_changed', handleUsernameChanged);
  }, []);

  const handleSaveName = () => {
    const trimmedName = tempName.trim();
    if (trimmedName.length >= 2 && trimmedName.length <= 20) {
      localStorage.setItem('vuonchanh_username', trimmedName);
      setUsername(trimmedName);
      setShowNamePrompt(false);

      // Dispatch event to sync with other components
      window.dispatchEvent(new Event('vuonchanh_username_changed'));

      addToast(`Chào mừng ${trimmedName} đến vườn chanh của Shin! 🍋`, 'success');

      // Replay actions
      if (pendingAction) {
        const action = pendingAction;
        setPendingAction(null);
        if (action.type === 'like') {
          handleLike(action.data.feedbackId, action.data.isLiked);
        }
      }
    } else {
      addToast('Tên cần từ 2 đến 20 ký tự nha!', 'info');
    }
  };

  const checkSpam = () => {
    const lastTime = localStorage.getItem('vuonchanh_last_submit');
    if (lastTime) {
      const diff = Date.now() - parseInt(lastTime, 10);
      if (diff < 30000) {
        addToast(`Gửi chậm lại xíu nha, đợi ${Math.ceil((30000 - diff) / 1000)}s nữa!`, 'info');
        return false;
      }
    }
    return true;
  };

  const handleSendFeedback = async () => {
    if (!newContent.trim()) return;
    if (!checkSpam()) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'char_feedbacks'), {
        charId,
        username,
        rating: 5,
        content: newContent.trim(),
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: []
      });
      setNewContent('');
      localStorage.setItem('vuonchanh_last_submit', Date.now().toString());
      addToast(`Đã gửi cảm nhận cho ${charName}!`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Có lỗi xảy ra, thử lại sau nhé!', 'info');
    }
    setIsSubmitting(false);
  };

  const handleLike = async (feedbackId: string, isLiked: boolean) => {
    try {
      const docRef = doc(db, 'char_feedbacks', feedbackId);
      const currentFb = feedbacks.find(f => f.id === feedbackId);
      await updateDoc(docRef, {
        likedBy: isLiked ? arrayRemove(userId) : arrayUnion(userId),
        likes: isLiked ? (currentFb?.likes || 1) - 1 : (currentFb?.likes || 0) + 1
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikeClick = (feedbackId: string, isLiked: boolean) => {
    if (!username) {
      addToast('Đặt tên trong vườn để tương tác nhé 🍋', 'info');
      setPendingAction({ type: 'like', data: { feedbackId, isLiked } });
      setTempName('');
      setShowNamePrompt(true);
      return;
    }
    handleLike(feedbackId, isLiked);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-[#FFFDF2] rounded-[32px] border-2 border-[#FFE873] shadow-xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden relative"
      >
        {/* Header */}
        <div className="relative flex-none p-5 pb-4 border-b-2 border-[#FFE873]/30 bg-white/50 pr-16">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#5D4E3C]">Feedback cho {charName}</h2>
            <p className="text-[#5D4E3C]/70 text-xs font-comfortaa mt-1">Chia sẻ cảm nhận của bạn với Shin.</p>
          </div>
          <LemonCloseButton onClick={onClose} className="absolute top-4 right-4 z-20" tooltip="Khép lại cảm nhận" />
        </div>

        {/* Form or Name Invitation Banner */}
        <div className="flex-none p-5 bg-white/30 border-b border-[#FFE873]/20">
          {username ? (
            <>
              <div className="flex items-center justify-between mb-3 text-xs text-[#5D4E3C]/70 font-comfortaa">
                <span>Đang gửi với: <strong className="text-[#E8A382]">{username}</strong></span>
                <button 
                  onClick={() => { setTempName(username); setShowNamePrompt(true); }} 
                  className="hover:text-[#E8A382] underline decoration-dashed cursor-pointer font-bold"
                >
                  Đổi tên
                </button>
              </div>
              
              <div className="relative">
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={`Cảm nhận của bạn về ${charName}...`}
                  className="w-full bg-white/80 border-2 border-[#FFE873]/50 rounded-2xl px-4 py-3 pb-10 text-sm text-[#5D4E3C] placeholder:text-[#5D4E3C]/40 focus:outline-none focus:border-[#FFE873] transition-all font-comfortaa resize-none h-24"
                  maxLength={500}
                />
                <div className="absolute bottom-2 left-3 text-[10px] text-[#5D4E3C]/40 font-comfortaa">
                  {newContent.length}/500
                </div>
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <button
                    onClick={handleSendFeedback}
                    disabled={isSubmitting || !newContent.trim()}
                    className="bg-gradient-to-r from-[#FFE873] to-[#FFD3B6] text-[#5D4E3C] font-bold py-1 px-3 rounded-lg text-xs shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Gửi</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* BANNER MỜI ĐẶT TÊN */
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FFFDF2] border border-[#FFE873]/40 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="shrink-0 w-8 h-8 bg-[#FFE873]/20 rounded-full flex items-center justify-center border border-[#FFE873]/30">
                  <CuteLemon size={16} />
                </div>
                <p className="text-[#5D4E3C] text-xs font-comfortaa leading-snug">
                  Đặt tên trong vườn để cùng gửi cảm nhận về nhân vật này nhé 🍋
                </p>
              </div>
              <button
                onClick={() => {
                  setTempName('');
                  setPendingAction({ type: 'submit' });
                  setShowNamePrompt(true);
                }}
                className="shrink-0 bg-gradient-to-r from-[#FFE873] to-[#FFD3B6] hover:from-[#FFD3B6] hover:to-[#FFE873] text-[#5D4E3C] font-extrabold text-xs py-2 px-3 rounded-xl shadow-sm hover:shadow active:scale-95 transition-all duration-300 font-comfortaa cursor-pointer border border-[#FFE873]/50"
              >
                Đặt tên ngay
              </button>
            </motion.div>
          )}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white/20 custom-scrollbar">
          <h3 className="font-serif text-sm font-bold text-[#5D4E3C]/80 mb-2 font-serif">Cảm nhận từ vườn ({feedbacks.length})</h3>
          
          <AnimatePresence>
            {feedbacks.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[#5D4E3C]/50 text-xs py-6 font-comfortaa">
                Chưa có cảm nhận nào. Hãy là người đầu tiên nhé!
              </motion.div>
            ) : (
              feedbacks.map((fb) => {
                const isLiked = fb.likedBy?.includes(userId);
                return (
                  <motion.div 
                    key={fb.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-[#FFE873]/30"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-[#FFE873]/20 rounded-full flex items-center justify-center">
                          <CuteLemon size={12} />
                        </div>
                        <div>
                          <span className="font-bold text-[#5D4E3C] text-xs block leading-tight">{fb.username}</span>
                          <span className="text-[9px] text-[#5D4E3C]/50">{formatTime(fb.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[#5D4E3C]/90 text-sm font-comfortaa mb-3 whitespace-pre-wrap pl-8">{fb.content}</p>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleLikeClick(fb.id, isLiked)}
                        className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-md transition-all cursor-pointer ${isLiked ? 'text-[#E8A382] bg-[#E8A382]/10' : 'text-[#5D4E3C]/50 hover:bg-black/5 hover:text-[#E8A382]'}`}
                      >
                        <Heart className="w-3 h-3" fill={isLiked ? "currentColor" : "none"} />
                        <span>{fb.likes || 0}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Name Prompt Popup Overlay */}
      <AnimatePresence>
        {showNamePrompt && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowNamePrompt(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFFDF2] p-6 md:p-8 rounded-[32px] border-2 border-[#FFE873] shadow-2xl max-w-sm w-full relative overflow-hidden"
            >
              <LemonCloseButton
                onClick={() => setShowNamePrompt(false)}
                className="absolute top-4 right-4 z-20"
                tooltip="Khép lại"
              />
              <div className="text-center mb-6">
                <CuteLemon size={50} className="mx-auto mb-3" />
                <h2 className="font-serif text-xl font-bold text-[#5D4E3C] mb-2">Tên của bạn</h2>
                <p className="text-[#5D4E3C]/70 text-xs font-comfortaa">Tên này sẽ hiện khi bạn gửi feedback cho {charName}.</p>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Nhập tên vào đây..."
                  className="w-full bg-white border-2 border-[#FFE873]/50 rounded-2xl px-4 py-3 text-sm text-[#5D4E3C] placeholder:text-[#5D4E3C]/40 focus:outline-none focus:border-[#FFE873] font-comfortaa"
                  maxLength={20}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                  }}
                />
                <button
                  onClick={handleSaveName}
                  className="w-full bg-gradient-to-r from-[#FFE873] to-[#FFD3B6] text-[#5D4E3C] font-bold py-3 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all font-comfortaa cursor-pointer"
                >
                  Tiếp tục
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
