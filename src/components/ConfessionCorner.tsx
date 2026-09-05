import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, serverTimestamp, arrayUnion, arrayRemove } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Heart, MessageCircle, Send, X, Edit2, Sparkles, User } from 'lucide-react';
import DragonCloseButton from './DragonCloseButton';

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
  const [showNamePrompt, setShowNamePrompt] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>('');
  
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // Store action to replay after setting name
  const [pendingAction, setPendingAction] = useState<{
    type: 'like_confession' | 'reply_confession' | 'send_confession';
    data?: any;
  } | null>(null);

  // My random generated UUID for likes to simulate user session
  const [userId] = useState(() => {
    let id = localStorage.getItem('longuyen_userid');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('longuyen_userid', id);
    }
    return id;
  });

  useEffect(() => {
    const savedName = localStorage.getItem('longuyen_username');
    if (savedName) {
      setUsername(savedName);
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
      addToast('Mất kết nối với Long Uyển. Vui lòng thử lại sau.', 'info');
    });

    return () => unsubscribe();
  }, [addToast]);

  // Sync username changes from other components (like CharacterFeedbackModal)
  useEffect(() => {
    const handleUsernameChanged = () => {
      const savedName = localStorage.getItem('longuyen_username');
      if (savedName) {
        setUsername(savedName);
      }
    };
    window.addEventListener('longuyen_username_changed', handleUsernameChanged);
    return () => window.removeEventListener('longuyen_username_changed', handleUsernameChanged);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showNamePrompt) {
        setShowNamePrompt(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showNamePrompt]);

  const handleSaveName = () => {
    const trimmedName = tempName.trim();
    if (trimmedName.length >= 2 && trimmedName.length <= 20) {
      localStorage.setItem('longuyen_username', trimmedName);
      setUsername(trimmedName);
      setShowNamePrompt(false);

      // Dispatch event to sync with other components
      window.dispatchEvent(new Event('longuyen_username_changed'));

      addToast(`Chào mừng ${trimmedName} đến Long Uyển của Shin`, 'success');

      // Execute pending action
      if (pendingAction) {
        const action = pendingAction;
        setPendingAction(null); // Clear to prevent recursion

        if (action.type === 'like_confession') {
          handleLikeConfession(action.data.confessionId, action.data.isLiked);
        } else if (action.type === 'reply_confession') {
          setReplyingTo(action.data.confessionId);
        }
      }
    } else {
      addToast('Tên cần từ 2 đến 20 ký tự nha!', 'info');
    }
  };

  const checkSpam = () => {
    const lastTime = localStorage.getItem('longuyen_last_submit');
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
      localStorage.setItem('longuyen_last_submit', Date.now().toString());
      addToast('Đã thả confession vào Long Uyển!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Có lỗi xảy ra, thử lại sau xíu nhé!', 'info');
    }
    setIsSubmitting(false);
  };

  const handleSendReply = async (confessionId: string) => {
    if (!replyContent.trim()) return;
    if (replyContent.length > 500) {
      addToast('Tâm thư dài quá, tối đa 500 ký tự thôi nha!', 'info');
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
      localStorage.setItem('longuyen_last_submit', Date.now().toString());
      addToast('Đã gửi tâm thư!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Không thể gửi tâm thư lúc này!', 'info');
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

  const handleLikeConfessionClick = (confessionId: string, isLiked: boolean) => {
    if (!username) {
      addToast('Đặt danh tính tại Long Uyển để tương tác nhé 😚', 'info');
      setPendingAction({ type: 'like_confession', data: { confessionId, isLiked } });
      setTempName('');
      setShowNamePrompt(true);
      return;
    }
    handleLikeConfession(confessionId, isLiked);
  };

  const handleReplyClick = (confessionId: string) => {
    if (!username) {
      addToast('Đặt danh tính tại Long Uyển để tương tác nhé 😚', 'info');
      setPendingAction({ type: 'reply_confession', data: { confessionId } });
      setTempName('');
      setShowNamePrompt(true);
      return;
    }
    setReplyingTo(replyingTo === confessionId ? null : confessionId);
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
    <div className="w-full max-w-3xl mx-auto flex flex-col max-h-[85vh] bg-[#F8F6F5] shadow-md border border-[#D8DEE8] rounded-[32px] overflow-hidden">
      <div className="flex-none p-4 relative z-10 flex flex-col items-center justify-center text-center border-b border-[#D8DEE8]/30">
        <h2 className="font-serif text-2xl font-bold text-[#3A4258] flex items-center space-x-2">
          <span>GÓC CONFESSION</span>
          <MessageCircle className="w-5 h-5 text-[#F2DB88]" fill="currentColor" />
        </h2>
        <p className="text-[#6B7590] text-sm font-comfortaa mt-1">Thả một confession, nhận vài tâm thư 😚</p>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Confession Input */}
        <div className="flex-none p-4 md:p-6 bg-white/40 border-b-2 border-[#D8DEE8]/30">
          {username ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-sm text-[#6B7590] font-comfortaa">
                  <span>Đang gửi với danh tính: <strong className="text-[#7A8AA5]">{username}</strong></span>
                  <button 
                    onClick={() => { setTempName(username); setShowNamePrompt(true); }}
                    className="text-xs flex items-center space-x-1 hover:text-[#7A8AA5] transition-colors bg-black/5 px-2 py-0.5 rounded-full cursor-pointer"
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
                  placeholder="Hôm nay có gì muốn kể với Long Uyển không?"
                  className="w-full bg-white/60 border-2 border-[#D8DEE8]/50 rounded-2xl px-4 py-3 pb-10 text-[#3A4258] placeholder:text-[#9AAAC5] focus:outline-none focus:border-[#7A8AA5] focus:bg-white transition-all font-comfortaa resize-none h-28"
                  maxLength={500}
                />
                <div className="absolute bottom-3 left-4 text-xs text-[#6B7590] font-comfortaa font-medium">
                  {newContent.length}/500
                </div>
                <button
                  onClick={handleSendConfession}
                  disabled={isSubmitting || !newContent.trim()}
                  className="absolute bottom-2 right-2 bg-gradient-to-r from-[#7A8AA5] to-[#F2DB88] hover:from-[#5A6B85] hover:to-[#E5C973] text-[#F8F6F5] font-bold py-1.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all font-comfortaa disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 cursor-pointer"
                >
                  <span>Thả vào Long Uyển</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </>
          ) : (
            /* BANNER MỜI ĐẶT TÊN */
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-[#D8DEE8]/40 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="shrink-0 w-8 h-8 bg-[#7A8AA5]/20 rounded-full flex items-center justify-center border border-[#D8DEE8]/30">
                  <Sparkles className="w-4 h-4 text-[#7A8AA5]" />
                </div>
                <p className="text-[#3A4258] text-xs font-comfortaa leading-snug">
                  Đặt danh tính tại Long Uyển để cùng thả confession và trò chuyện nhé 💋
                </p>
              </div>
              <button
                onClick={() => {
                  setTempName('');
                  setPendingAction({ type: 'send_confession' });
                  setShowNamePrompt(true);
                }}
                className="shrink-0 bg-gradient-to-r from-[#7A8AA5] to-[#F2DB88] hover:from-[#F2DB88] hover:to-[#7A8AA5] text-[#F8F6F5] font-extrabold text-xs py-2 px-4 rounded-xl shadow-sm hover:shadow active:scale-95 transition-all duration-300 font-comfortaa cursor-pointer border border-[#D8DEE8]/50"
              >
                Đặt tên ngay
              </button>
            </motion.div>
          )}
        </div>

        {/* Confession List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
          <AnimatePresence>
            {confessions.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-[#6B7590] font-comfortaa py-10">
                <Sparkles className="w-10 h-10 mx-auto mb-3 text-[#B8C4D8]" />
                Long Uyển đang vắng lặng. Hãy là người gửi confession đầu tiên nhé!
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
                    className="bg-white rounded-[24px] p-5 shadow-sm border border-[#D8DEE8]"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#7A8AA5] to-[#B8C4D8] rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-[#3A4258]/10 text-white">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#3A4258] text-sm">{confession.username}</h4>
                        <span className="text-[11px] text-[#6B7590] font-comfortaa">{formatTime(confession.timestamp)}</span>
                      </div>
                    </div>
                    
                    <p className="text-[#3A4258] text-sm md:text-base leading-relaxed font-comfortaa mb-4 whitespace-pre-wrap">
                      {confession.content}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-[#D8DEE8]/50">
                      <button 
                        onClick={() => handleReplyClick(confession.id)}
                        className={`flex items-center space-x-1.5 text-xs font-bold transition-colors px-3 py-1.5 rounded-lg cursor-pointer ${replyingTo === confession.id ? 'bg-[#7A8AA5]/20 text-[#5A6B85]' : 'text-[#6B7590] hover:text-[#3A4258] hover:bg-black/5'}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Trả lời {confession.replies?.length > 0 ? `(${confession.replies.length})` : ''}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleLikeConfessionClick(confession.id, isLiked)}
                        className={`flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${isLiked ? 'text-[#E88BA0] bg-[#E88BA0]/10' : 'text-[#6B7590] hover:bg-black/5 hover:text-[#E88BA0]'}`}
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
                          className="mt-4 pl-4 md:pl-8 border-l-2 border-[#D8DEE8] space-y-4 overflow-hidden"
                        >
                          <div className="relative">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder={`Gửi vài lời cho ${confession.username}...`}
                              className="w-full bg-[#F8F6F5]/70 border-2 border-[#D8DEE8]/50 rounded-xl px-3 py-2 pb-8 text-sm text-[#3A4258] placeholder:text-[#9AAAC5] focus:outline-none focus:border-[#7A8AA5] focus:bg-white transition-all font-comfortaa resize-none h-20"
                              maxLength={500}
                            />
                            <div className="absolute bottom-2 right-2 flex space-x-2">
                              <button
                                onClick={() => setReplyingTo(null)}
                                className="px-3 py-1 text-xs font-bold text-[#6B7590] hover:text-[#3A4258] transition-colors cursor-pointer"
                              >
                                Hủy
                              </button>
                              <button
                                onClick={() => handleSendReply(confession.id)}
                                disabled={isReplying || !replyContent.trim()}
                                className="bg-gradient-to-r from-[#7A8AA5] to-[#F2DB88] hover:from-[#5A6B85] hover:to-[#E5C973] text-[#F8F6F5] font-bold py-1 px-3 rounded-lg text-xs shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center space-x-1 cursor-pointer"
                              >
                                <span>Gửi</span>
                                <Send className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {confession.replies?.slice().reverse().map((reply: ConfessionReply) => (
                            <div key={reply.id} className="bg-[#F8F6F5] rounded-xl p-3 text-sm">
                              <div className="flex items-center space-x-2 mb-1.5">
                                <div className="w-6 h-6 bg-[#B8C4D8] rounded-full flex items-center justify-center text-white">
                                  <User className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="font-bold text-[#3A4258] text-xs">{reply.username}</span>
                                <span className="text-[10px] text-[#6B7590]">{formatTime(reply.timestamp)}</span>
                              </div>
                              <p className="text-[#3A4258]/90 font-comfortaa pl-8 whitespace-pre-wrap">{reply.content}</p>
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
              className="bg-[#F8F6F5] p-6 md:p-8 rounded-[32px] border-2 border-[#D8DEE8] shadow-2xl max-w-md w-full relative overflow-hidden"
            >
              <DragonCloseButton
                onClick={() => setShowNamePrompt(false)}
                className="absolute top-4 right-4 z-20"
                tooltip="Đóng lại"
              />
              <div className="text-center mb-6">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-[#F2DB88]" />
                <h2 className="font-serif text-2xl font-bold text-[#3A4258] mb-2">Bước vào Long Uyển</h2>
                <p className="text-[#6B7590] text-sm font-comfortaa">Tên này sẽ hiển thị khi bạn gửi confession hoặc trả lời.</p>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Danh tính của bạn..."
                  className="w-full bg-white/80 border-2 border-[#D8DEE8] rounded-2xl px-4 py-3 text-[#3A4258] placeholder:text-[#9AAAC5] focus:outline-none focus:border-[#7A8AA5] focus:bg-white transition-all font-comfortaa"
                  maxLength={20}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                  }}
                />
                <button
                  onClick={handleSaveName}
                  className="w-full bg-gradient-to-r from-[#7A8AA5] to-[#F2DB88] hover:from-[#5A6B85] hover:to-[#E5C973] text-[#F8F6F5] font-bold py-3 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all font-comfortaa flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Bước vào Long Uyển</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
