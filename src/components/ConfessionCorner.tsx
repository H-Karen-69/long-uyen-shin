import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, serverTimestamp, arrayUnion, arrayRemove } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import CuteLemon from './CuteLemon';
import { Heart, MessageCircle, Send, X, Edit2 } from 'lucide-react';

interface ConfessionReply {
  id: string;
  username: string;
  content: string;
  timestamp: any;
  likes: number;
  likedBy: string[];
}

interface Confession {
  id: string;
  username: string;
  content: string;
  timestamp: any;
  likes: number;
  likedBy: string[];
  replies: ConfessionReply[];
}

interface ConfessionCornerProps {
  addToast: (msg: string, type: 'info' | 'success') => void;
}

export default function ConfessionCorner({ addToast }: ConfessionCornerProps) {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [username, setUsername] = useState<string>('');
  const [showNamePrompt, setShowNamePrompt] = useState<boolean>(true);
  const [tempName, setTempName] = useState<string>('');
  
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // My random generated UUID for likes to simulate user session
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

    const q = query(collection(db, 'confessions'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
        } as Confession;
      });
      setConfessions(data);
    }, (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, 'confessions');
      } catch (err) {
        // Error is logged, prevent uncaught exception
      }
      addToast('Mất kết nối với vườn chanh. Vui lòng thử lại sau.', 'info');
    });

    return () => unsubscribe();
  }, [addToast]);

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

  const handleSendConfession = async () => {
    if (!newContent.trim()) return;
    if (newContent.length > 500) {
      addToast('Confession hơi dài rồi, gói gọn trong 500 chữ nha!', 'info');
      return;
    }
    if (!checkSpam()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'confessions'), {
        username,
        content: newContent.trim(),
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: [],
        replies: []
      });
      setNewContent('');
      localStorage.setItem('vuonchanh_last_submit', Date.now().toString());
      addToast('Đã thả confession vào vườn!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Có lỗi xảy ra, thử lại sau xíu nhé!', 'info');
    }
    setIsSubmitting(false);
  };

  const handleSendReply = async (confessionId: string) => {
    if (!replyContent.trim()) return;
    if (replyContent.length > 500) {
      addToast('Lời an ủi dài quá, tối đa 500 ký tự thôi nha!', 'info');
      return;
    }
    if (!checkSpam()) return;

    setIsReplying(true);
    try {
      const replyData = {
        id: 'reply_' + Math.random().toString(36).substr(2, 9),
        username,
        content: replyContent.trim(),
        timestamp: new Date().toISOString(),
        likes: 0,
        likedBy: []
      };

      const docRef = doc(db, 'confessions', confessionId);
      await updateDoc(docRef, {
        replies: arrayUnion(replyData)
      });

      setReplyingTo(null);
      setReplyContent('');
      localStorage.setItem('vuonchanh_last_submit', Date.now().toString());
      addToast('Đã gửi lời an ủi!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Không thể gửi lời an ủi lúc này!', 'info');
    }
    setIsReplying(false);
  };

  const handleLikeConfession = async (confessionId: string, isLiked: boolean) => {
    try {
      const docRef = doc(db, 'confessions', confessionId);
      await updateDoc(docRef, {
        likedBy: isLiked ? arrayRemove(userId) : arrayUnion(userId),
        likes: isLiked ? (confessions.find(c => c.id === confessionId)?.likes || 1) - 1 : (confessions.find(c => c.id === confessionId)?.likes || 0) + 1
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
      <div className="bg-[#FFFDF2]/90 p-6 md:p-8 rounded-[32px] border-2 border-[#FFE873] shadow-lg max-w-lg mx-auto w-full backdrop-blur-sm relative">
        <div className="text-center mb-6">
          <CuteLemon size={60} className="mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#5D4E3C] mb-2">Bước vào vườn chanh</h2>
          <p className="text-[#5D4E3C]/70 text-sm font-comfortaa">Tên này sẽ hiển thị khi bạn gửi confession hoặc trả lời.</p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Tên trong vườn của bạn..."
            className="w-full bg-white/60 border-2 border-[#FFE873]/50 rounded-2xl px-4 py-3 text-[#5D4E3C] placeholder:text-[#5D4E3C]/40 focus:outline-none focus:border-[#FFE873] focus:bg-white transition-all font-comfortaa"
            maxLength={20}
          />
          <button
            onClick={handleSaveName}
            className="w-full bg-gradient-to-r from-[#FFE873] to-[#FFD3B6] text-[#5D4E3C] font-bold py-3 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all font-comfortaa flex items-center justify-center space-x-2"
          >
            <span>Bước vào vườn</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col max-h-[85vh]">
      <div className="flex-none bg-[#FFFDF2]/90 p-4 rounded-t-[32px] border-x-2 border-t-2 border-[#FFE873] shadow-sm backdrop-blur-sm relative z-10 flex flex-col items-center justify-center text-center">
        <h2 className="font-serif text-2xl font-bold text-[#5D4E3C] flex items-center space-x-2">
          <span>GÓC CONFESSION</span>
          <MessageCircle className="w-5 h-5 text-[#E8A382]" fill="currentColor" />
        </h2>
        <p className="text-[#5D4E3C]/70 text-sm font-comfortaa mt-1">Thả một confession, hái vài lời an ủi 🍋</p>
      </div>

      <div className="flex-1 bg-[#FFFDF2]/80 border-x-2 border-b-2 border-[#FFE873] rounded-b-[32px] overflow-hidden flex flex-col backdrop-blur-sm">
        {/* Confession Input */}
        <div className="flex-none p-4 md:p-6 bg-white/40 border-b-2 border-[#FFE873]/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-sm text-[#5D4E3C]/70 font-comfortaa">
              <span>Đang gửi với danh tính: <strong className="text-[#E8A382]">{username}</strong></span>
              <button 
                onClick={() => { setTempName(username); setShowNamePrompt(true); }}
                className="text-xs flex items-center space-x-1 hover:text-[#E8A382] transition-colors bg-black/5 px-2 py-0.5 rounded-full"
              >
                <Edit2 className="w-3 h-3" />
                <span>Đổi</span>
              </button>
            </div>
          </div>
          <div className="relative">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Hôm nay có gì muốn kể với vườn không?"
              className="w-full bg-white/60 border-2 border-[#FFE873]/50 rounded-2xl px-4 py-3 pb-10 text-[#5D4E3C] placeholder:text-[#5D4E3C]/40 focus:outline-none focus:border-[#FFE873] focus:bg-white transition-all font-comfortaa resize-none h-28"
              maxLength={500}
            />
            <div className="absolute bottom-3 left-4 text-xs text-[#5D4E3C]/40 font-comfortaa font-medium">
              {newContent.length}/500
            </div>
            <button
              onClick={handleSendConfession}
              disabled={isSubmitting || !newContent.trim()}
              className="absolute bottom-2 right-2 bg-gradient-to-r from-[#FFE873] to-[#FFD3B6] text-[#5D4E3C] font-bold py-1.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all font-comfortaa disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <span>Thả vào vườn</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Confession List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
          <AnimatePresence>
            {confessions.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[#5D4E3C]/50 font-comfortaa py-10">
                <CuteLemon size={50} className="mx-auto mb-3 opacity-50 grayscale" />
                Vườn đang vắng lặng. Hãy là người gửi confession đầu tiên nhé!
              </motion.div>
            ) : (
              confessions.map((confession) => {
                const isLiked = confession.likedBy?.includes(userId);
                
                return (
                  <motion.div 
                    key={confession.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[24px] p-5 shadow-sm border border-[#FFE873]/30"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FFE873] to-[#C8E6C9] rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-[#5D4E3C]/10">
                        <CuteLemon size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#5D4E3C] text-sm">{confession.username}</h4>
                        <span className="text-[11px] text-[#5D4E3C]/50 font-comfortaa">{formatTime(confession.timestamp)}</span>
                      </div>
                    </div>
                    
                    <p className="text-[#5D4E3C] text-sm md:text-base leading-relaxed font-comfortaa mb-4 whitespace-pre-wrap">
                      {confession.content}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-[#FFE873]/20">
                      <button 
                        onClick={() => setReplyingTo(replyingTo === confession.id ? null : confession.id)}
                        className={`flex items-center space-x-1.5 text-xs font-bold transition-colors px-3 py-1.5 rounded-lg ${replyingTo === confession.id ? 'bg-[#FFE873]/30 text-[#E8A382]' : 'text-[#5D4E3C]/60 hover:text-[#5D4E3C] hover:bg-black/5'}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Trả lời {confession.replies?.length > 0 ? `(${confession.replies.length})` : ''}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleLikeConfession(confession.id, isLiked)}
                        className={`flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${isLiked ? 'text-[#E8A382] bg-[#E8A382]/10' : 'text-[#5D4E3C]/50 hover:bg-black/5 hover:text-[#E8A382]'}`}
                      >
                        <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
                        <span>{confession.likes || 0}</span>
                      </button>
                    </div>

                    {/* Replies Section */}
                    <AnimatePresence>
                      {replyingTo === confession.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pl-4 md:pl-8 border-l-2 border-[#FFE873]/40 space-y-4 overflow-hidden"
                        >
                          <div className="relative">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder={`Gửi vài lời cho ${confession.username}...`}
                              className="w-full bg-[#FFFDF2]/50 border-2 border-[#FFE873]/30 rounded-xl px-3 py-2 pb-8 text-sm text-[#5D4E3C] placeholder:text-[#5D4E3C]/40 focus:outline-none focus:border-[#FFE873] focus:bg-white transition-all font-comfortaa resize-none h-20"
                              maxLength={500}
                            />
                            <div className="absolute bottom-2 right-2 flex space-x-2">
                              <button
                                onClick={() => setReplyingTo(null)}
                                className="px-3 py-1 text-xs font-bold text-[#5D4E3C]/60 hover:text-[#5D4E3C] transition-colors"
                              >
                                Hủy
                              </button>
                              <button
                                onClick={() => handleSendReply(confession.id)}
                                disabled={isReplying || !replyContent.trim()}
                                className="bg-gradient-to-r from-[#FFE873] to-[#FFD3B6] text-[#5D4E3C] font-bold py-1 px-3 rounded-lg text-xs shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center space-x-1"
                              >
                                <span>Gửi</span>
                                <Send className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {confession.replies?.slice().reverse().map((reply: ConfessionReply) => (
                            <div key={reply.id} className="bg-[#FFFDF2]/70 rounded-xl p-3 text-sm">
                              <div className="flex items-center space-x-2 mb-1.5">
                                <div className="w-6 h-6 bg-[#C8E6C9] rounded-full flex items-center justify-center">
                                  <CuteLemon size={14} />
                                </div>
                                <span className="font-bold text-[#5D4E3C] text-xs">{reply.username}</span>
                                <span className="text-[10px] text-[#5D4E3C]/50">{formatTime(reply.timestamp)}</span>
                              </div>
                              <p className="text-[#5D4E3C]/90 font-comfortaa pl-8 whitespace-pre-wrap">{reply.content}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
