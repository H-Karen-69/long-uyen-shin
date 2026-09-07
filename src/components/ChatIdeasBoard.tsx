import React, { useState, useEffect, useMemo } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import {
  ChatIdea,
  getChatUserId,
  subscribeToChatIdeas,
  addChatIdea,
  toggleLikeChatIdea,
} from '../chatIdeasService';

interface ChatIdeasBoardProps {
  onToast?: (message: string, type?: 'info' | 'heart-on' | 'heart-off') => void;
}

/**
 * Định dạng thời gian thân thiện cho ý tưởng chat
 */
function formatIdeaTime(createdAt: any): string {
  if (!createdAt) return 'Mới đây';

  let date: Date;
  if (typeof createdAt.toDate === 'function') {
    date = createdAt.toDate();
  } else if (createdAt instanceof Date) {
    date = createdAt;
  } else if (typeof createdAt === 'number') {
    date = new Date(createdAt);
  } else {
    date = new Date(createdAt);
  }

  if (isNaN(date.getTime())) return 'Mới đây';

  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return 'Vừa xong';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} phút trước`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} giờ trước`;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

export const ChatIdeasBoard: React.FC<ChatIdeasBoardProps> = ({ onToast }) => {
  const [ideas, setIdeas] = useState<ChatIdea[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [optimisticLikedIds, setOptimisticLikedIds] = useState<Set<string>>(new Set());

  const currentUserId = useMemo(() => getChatUserId(), []);

  // Đăng ký lắng nghe thời gian thực (Real-time Firestore)
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToChatIdeas(
      (newIdeas) => {
        setIdeas(newIdeas);
        setIsLoading(false);
      },
      (err) => {
        console.warn('Lỗi kết nối bảng ý tưởng:', err);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Xử lý gửi ý tưởng mới
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = inputText.trim();
    if (!content) return;

    try {
      setIsSubmitting(true);
      await addChatIdea(content);
      setInputText('');
      onToast?.('Đã gửi ý tưởng chat của bạn lên góc gợi ý! ✨', 'info');
    } catch (err: any) {
      console.error('Lỗi khi đăng ý tưởng:', err);
      onToast?.('Chưa thể gửi ý tưởng lúc này, vui lòng thử lại nhé!', 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xử lý thả tim / bỏ tim với cập nhật lạc quan (Optimistic UI)
  const handleToggleLike = async (idea: ChatIdea) => {
    const isCurrentlyLiked =
      idea.likedBy?.includes(currentUserId) || optimisticLikedIds.has(idea.id);

    // Cập nhật giao diện ngay lập tức
    setOptimisticLikedIds((prev) => {
      const next = new Set(prev);
      if (isCurrentlyLiked) {
        next.delete(idea.id);
      } else {
        next.add(idea.id);
      }
      return next;
    });

    setIdeas((prev) =>
      prev
        .map((item) => {
          if (item.id === idea.id) {
            const hasLiked =
              item.likedBy?.includes(currentUserId) || optimisticLikedIds.has(item.id);
            const newLikes = hasLiked
              ? Math.max(0, (item.likes || 1) - 1)
              : (item.likes || 0) + 1;
            const newLikedBy = hasLiked
              ? (item.likedBy || []).filter((id) => id !== currentUserId)
              : [...(item.likedBy || []), currentUserId];
            return {
              ...item,
              likes: newLikes,
              likedBy: newLikedBy,
            };
          }
          return item;
        })
        .sort((a, b) => b.likes - a.likes)
    );

    try {
      const liked = await toggleLikeChatIdea(idea.id, currentUserId);
      if (liked) {
        onToast?.('Đã thả tim cho ý tưởng chat! 💖', 'heart-on');
      } else {
        onToast?.('Đã bỏ tim ý tưởng này.', 'heart-off');
      }
    } catch (err) {
      console.error('Lỗi khi thích ý tưởng:', err);
      onToast?.('Không thể cập nhật lượt tim, thử lại sau nhé!', 'info');
    }
  };

  return (
    <section
      id="chat-ideas-board"
      className="relative bg-[#F8F6F5] shadow-md border border-[#D8DEE8] rounded-[24px] p-4 sm:p-5 md:p-6 overflow-hidden mb-6 select-none"
    >
      {/* HEADER SECTION */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-3.5">
        {/* Badge: "💡 GỢI Ý CHO LỮ KHÁCH" (badge-breath-animate) */}
        <div className="inline-flex items-center gap-1.5 bg-[#D8DEE8]/60 px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold text-[#5A6B85] mb-1.5 badge-breath-animate">
          <span>💡 GỢI Ý CHO LỮ KHÁCH</span>
        </div>

        {/* Title: "Ý Tưởng Chat Với Character" (Playfair, text-2xl/3xl, #3A4258) */}
        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-[#3A4258] tracking-tight mb-1 flex items-center justify-center gap-2">
          <span>Ý Tưởng Chat Với</span>
          <span className="text-[#E88BA0]">Character</span>
        </h3>

        {/* Subtitle: "Khám phá ý tưởng từ cộng đồng hoặc chia sẻ bối cảnh roleplay của bạn." */}
        <p className="text-xs sm:text-sm text-[#7A8AA5] font-medium leading-normal max-w-xl">
          Khám phá ý tưởng từ cộng đồng hoặc chia sẻ bối cảnh roleplay của bạn.
        </p>
      </div>

      {/* FORM THÊM Ý TƯỞNG (LUÔN GHIM Ở TRÊN) */}
      <form onSubmit={handleSubmit} className="relative z-10 max-w-3xl mx-auto mb-3.5">
        <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/90 p-1.5 sm:p-1 sm:pl-3.5 rounded-2xl sm:rounded-full border border-[#D8DEE8] shadow-2xs focus-within:border-[#E88BA0] focus-within:shadow-[0_0_12px_rgba(232,139,160,0.2)] transition-all">
          <input
            id="chat-idea-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhập ý tưởng bối cảnh chat của bạn vào đây..."
            className="w-full bg-transparent text-xs sm:text-sm text-[#3A4258] placeholder-[#9AAAC5] focus:outline-none py-1 px-2 font-sans"
            maxLength={350}
          />
          <button
            id="chat-idea-submit-btn"
            type="submit"
            disabled={isSubmitting || !inputText.trim()}
            className="w-full sm:w-auto px-5 py-2 rounded-full font-bold text-xs sm:text-sm text-white bg-[#E88BA0] hover:bg-[#D66A85] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
          >
            {isSubmitting && (
              <Loader2 size={14} className="animate-spin" />
            )}
            <span>Gửi</span>
          </button>
        </div>
      </form>

      {/* DANH SÁCH Ý TƯỞNG (LAYOUT CUỘN DỌC - TRẢI NGANG FULL-WIDTH 1 CỘT) */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="w-full max-h-[170px] sm:max-h-[235px] overflow-y-auto custom-scrollbar pr-1.5 space-y-2">
          {isLoading && ideas.length === 0 ? (
            <div className="py-8 text-center text-[#9AAAC5] flex flex-col items-center justify-center gap-2">
              <Loader2 size={22} className="animate-spin text-[#E88BA0]" />
              <span className="text-xs">Đang tải những ý tưởng hay từ Long Uyển...</span>
            </div>
          ) : ideas.length === 0 ? (
            <div className="py-6 text-center text-[#7A8AA5] text-xs sm:text-sm font-medium glass-card rounded-xl p-4 border border-[#D8DEE8]">
              Chưa có ý tưởng nào. Hãy là người đầu tiên chia sẻ bối cảnh chat nhé!
            </div>
          ) : (
            ideas.map((idea, index) => {
              const isLiked =
                idea.likedBy?.includes(currentUserId) ||
                optimisticLikedIds.has(idea.id);

              return (
                <div
                  key={idea.id}
                  id={`chat-idea-item-${idea.id}`}
                  className="glass-card rounded-xl py-2 px-3 sm:py-2.5 sm:px-4 w-full relative border border-[#D8DEE8] hover:border-[#F5C8D0] transition-all duration-200 flex items-center justify-between gap-3 shadow-2xs group"
                >
                  {/* Huy hiệu xếp hạng Top 1, 2, 3 tự động gắn ở góc thẻ */}
                  {index === 0 && (
                    <div
                      title="Ý tưởng được yêu thích nhất (Hạng 1)"
                      className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#FFF5D6] border border-[#F2D184] text-[11px] flex items-center justify-center shadow-2xs z-10"
                    >
                      🏆
                    </div>
                  )}
                  {index === 1 && (
                    <div
                      title="Ý tưởng nổi bật (Hạng 2)"
                      className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#EEF2F7] border border-[#9AAAC5] text-[11px] flex items-center justify-center shadow-2xs z-10"
                    >
                      🥈
                    </div>
                  )}
                  {index === 2 && (
                    <div
                      title="Ý tưởng ấn tượng (Hạng 3)"
                      className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#FAF0E6] border border-[#D8A78F] text-[11px] flex items-center justify-center shadow-2xs z-10"
                    >
                      🥉
                    </div>
                  )}

                  {/* Nội dung text bên trái */}
                  <div className="flex-1 min-w-0 pr-2 pl-0.5">
                    <p className="font-sans text-xs sm:text-sm text-[#3A4258] leading-snug break-words font-medium">
                      {idea.content}
                    </p>
                  </div>

                  {/* Khối Nút Tim + Thời gian bên phải (gọn gàng, cùng 1 hàng) */}
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-[10px] font-sans text-[#9AAAC5] hidden sm:inline whitespace-nowrap">
                      {formatIdeaTime(idea.createdAt)}
                    </span>
                    <button
                      id={`like-idea-btn-${idea.id}`}
                      onClick={() => handleToggleLike(idea)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer active:scale-90 select-none ${
                        isLiked
                          ? 'bg-[#FDF0F3] border-[#E88BA0] text-[#E88BA0] shadow-2xs'
                          : 'bg-white/80 border-[#D8DEE8] text-[#7A8AA5] hover:text-[#E88BA0] hover:border-[#F5C8D0]'
                      }`}
                      title={isLiked ? 'Bỏ thích ý tưởng này' : 'Thả tim ý tưởng này'}
                    >
                      <Heart
                        size={13}
                        className={`transition-transform duration-200 ${
                          isLiked
                            ? 'fill-[#E88BA0] text-[#E88BA0] scale-110'
                            : 'text-[#7A8AA5] group-hover:text-[#E88BA0]'
                        }`}
                      />
                      <span className="font-comfortaa font-bold text-xs">
                        {idea.likes || 0}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
