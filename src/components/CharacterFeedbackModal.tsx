import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, serverTimestamp, arrayUnion, arrayRemove, where } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import CuteLemon from './CuteLemon';
import { Heart, X, Send, Edit2 } from 'lucide-react';

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
  const [showNamePrompt, setShowNamePrompt] = useState<boolean>(true);
  const [tempName, setTempName] = useState<string>('');
  
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userId] = useState(() => {
    let id = localStorage.getItem('vuonchanh_userid');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('vuonchanh_userid', id);
    }
    return id;
  });

  useEffect(() => {
    const savedName = localStorage.getItem('vuonchanh_username');
    if (savedName) {
      setUsername(savedName);
      setShowNamePrompt(false);
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
      // Create index might be required for this query, but in dev it should prompt in console or we can handle it
      console.warn("Index might be needed:", error);
      try {
        handleFirestoreError(error, OperationType.GET, 'char_feedbacks');
      } catch (err) {
        // Error is logged, prevent uncaught exception
      }
    });

    return () => unsubscribe();
  }, [charId]);

  const handleSaveName = () => {
    if (tempName.trim().length >= 2 && tempName.trim().length <= 20) {
      localStorage.setItem('vuonchanh_username', tempName.trim());
      setUsername(tempName.trim());
      setShowNamePrompt(false);
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

  const formatTime = (ts: any) => {
    if (!ts) return 'Vừa xong';
    try {
      const date = ts.toDate ? ts.toDate() : new Date(ts);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch {
      return 'Gần đây';
    }
  };

  if (showNamePrompt) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#FFFDF2] p-6 rounded-[32px] border-2 border-[#FFE873] shadow-xl max-w-sm w-full relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#5D4E3C]/50 hover:text-[#5D4E3C] transition-colors bg-black/5 rounded-full hover:bg-black/10">
            <X className="w-5 h-5" />
          </button>
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
              className="w-full bg-white border-2 border-[#FFE873]/50 rounded-2xl px-4 py-3 text-sm text-[#5D4E3C] placeholder:text-[#5D4E3C]/40 focus:outline-none focus:border-[#FFE873]"
              maxLength={20}
            />
            <button
              onClick={handleSaveName}
              className="w-full bg-gradient-to-r from-[#FFE873] to-[#FFD3B6] text-[#5D4E3C] font-bold py-3 rounded-2xl shadow-sm hover:shadow-md transition-all font-comfortaa"
            >
              Tiếp tục
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-[#FFFDF2] rounded-[32px] border-2 border-[#FFE873] shadow-xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden relative"
      >
        {/* Header */}
        <div className="flex-none p-5 pb-4 border-b-2 border-[#FFE873]/30 bg-white/50 flex justify-between items-start">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#5D4E3C]">Feedback cho {charName}</h2>
            <p className="text-[#5D4E3C]/70 text-xs font-comfortaa mt-1">Chia sẻ cảm nhận của bạn với Shin.</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#5D4E3C]/50 hover:text-[#5D4E3C] bg-black/5 rounded-full hover:bg-black/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-none p-5 bg-white/30 border-b border-[#FFE873]/20">
          <div className="flex items-center justify-between mb-3 text-xs text-[#5D4E3C]/70 font-comfortaa">
            <span>Đang gửi với: <strong className="text-[#E8A382]">{username}</strong></span>
            <button onClick={() => { setTempName(username); setShowNamePrompt(true); }} className="hover:text-[#E8A382] underline decoration-dashed">Đổi tên</button>
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
                className="bg-gradient-to-r from-[#FFE873] to-[#FFD3B6] text-[#5D4E3C] font-bold py-1 px-3 rounded-lg text-xs shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center space-x-1"
              >
                <span>Gửi</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white/20 custom-scrollbar">
          <h3 className="font-serif text-sm font-bold text-[#5D4E3C]/80 mb-2">Cảm nhận từ vườn ({feedbacks.length})</h3>
          
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
                        <div className="w-6 h-6 bg-[#C8E6C9] rounded-full flex items-center justify-center">
                          <CuteLemon size={14} />
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
                        onClick={() => handleLike(fb.id, isLiked)}
                        className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-md transition-all ${isLiked ? 'text-[#E8A382] bg-[#E8A382]/10' : 'text-[#5D4E3C]/50 hover:bg-black/5 hover:text-[#E8A382]'}`}
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
    </div>
  );
}
