/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getUserId,
  subscribeCharacterLike,
  subscribeAllCharacterLikes,
  toggleCharacterLike
} from '../lib/characterLikesService';
import { Character } from '../types';

/**
 * Hook cho 1 nhân vật đơn lẻ
 */
export function useCharacterLikes(charId: string, initialLikes: number = 0) {
  const [totalLikes, setTotalLikes] = useState<number>(initialLikes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (!charId) return;

    setIsLoading(true);
    const unsubscribe = subscribeCharacterLike(charId, initialLikes, (data) => {
      setTotalLikes(data.totalLikes);
      setIsLiked(data.isLiked);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [charId, initialLikes]);

  const toggle = useCallback(async () => {
    if (isPending || !charId) return;

    // Optimistic UI update
    const prevLikes = totalLikes;
    const prevIsLiked = isLiked;
    const nextIsLiked = !prevIsLiked;
    const nextLikes = Math.max(0, prevLikes + (nextIsLiked ? 1 : -1));

    setIsLiked(nextIsLiked);
    setTotalLikes(nextLikes);
    setIsPending(true);

    try {
      const res = await toggleCharacterLike(charId, prevLikes, prevIsLiked);
      if (!res.success) {
        // Rollback nếu Firebase báo lỗi
        setIsLiked(prevIsLiked);
        setTotalLikes(prevLikes);
      }
    } catch (err) {
      console.warn(`[useCharacterLikes] Toggle failed for ${charId}, rolling back:`, err);
      setIsLiked(prevIsLiked);
      setTotalLikes(prevLikes);
    } finally {
      setIsPending(false);
    }
  }, [charId, totalLikes, isLiked, isPending]);

  return {
    totalLikes,
    isLiked,
    isLoading,
    isPending,
    toggleLike: toggle,
    userId: getUserId(),
  };
}

/**
 * Hook cho toàn bộ danh sách nhân vật (tối ưu subscription collection)
 */
export function useAllCharacterLikes(characters: Character[]) {
  const [likesMap, setLikesMap] = useState<Record<string, { totalLikes: number; isLiked: boolean }>>(() => {
    const initial: Record<string, { totalLikes: number; isLiked: boolean }> = {};
    characters.forEach((c) => {
      initial[c.id] = { totalLikes: c.likes || 0, isLiked: false };
    });
    return initial;
  });

  useEffect(() => {
    const initialMap: Record<string, number> = {};
    characters.forEach((c) => {
      initialMap[c.id] = c.likes || 0;
    });

    const unsubscribe = subscribeAllCharacterLikes(initialMap, (dataMap) => {
      setLikesMap((prev) => ({
        ...prev,
        ...dataMap,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, [characters]);

  const toggleLike = useCallback(async (charId: string) => {
    const current = likesMap[charId] || { totalLikes: 0, isLiked: false };
    const prevLikes = current.totalLikes;
    const prevIsLiked = current.isLiked;
    const nextIsLiked = !prevIsLiked;
    const nextLikes = Math.max(0, prevLikes + (nextIsLiked ? 1 : -1));

    // Optimistic UI
    setLikesMap((prev) => ({
      ...prev,
      [charId]: { totalLikes: nextLikes, isLiked: nextIsLiked },
    }));

    try {
      const res = await toggleCharacterLike(charId, prevLikes, prevIsLiked);
      if (!res.success) {
        // Rollback
        setLikesMap((prev) => ({
          ...prev,
          [charId]: { totalLikes: prevLikes, isLiked: prevIsLiked },
        }));
      }
      return res;
    } catch (err) {
      console.warn(`[useAllCharacterLikes] Error toggling ${charId}:`, err);
      setLikesMap((prev) => ({
        ...prev,
        [charId]: { totalLikes: prevLikes, isLiked: prevIsLiked },
      }));
      return { success: false, newTotalLikes: prevLikes, isLiked: prevIsLiked };
    }
  }, [likesMap]);

  const getCharLikeState = useCallback((charId: string, fallbackLikes: number = 0) => {
    return likesMap[charId] || { totalLikes: fallbackLikes, isLiked: false };
  }, [likesMap]);

  return {
    likesMap,
    toggleLike,
    getCharLikeState,
    userId: getUserId(),
  };
}
