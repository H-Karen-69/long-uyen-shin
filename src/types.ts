/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Character {
  id: string;
  name: string;
  title: string;
  avatar: string;
  roleplayLink: string;
  storyText: string;
  worldTag: string;      // #ThếGiới (olive pastel)
  aftertasteTag: string; // #DưVị (đào sữa)
  statusTag: string;     // #PhânLoại (vàng hoàng kim)
  likes: number;
  genre: string;
  taste: string;
  statusType: string;
  birthday?: string; // DD/MM format
  birthdayImage?: string;
  age?: number;
  isHot?: boolean;
  isNew?: boolean;
  isComingSoon?: boolean;
  releaseDate?: string;
  creatorPick?: boolean;
  worldCategory: string[];
  moodCategory: string[];
  hashtags: string[];
}

export interface Feedback {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'info' | 'success' | 'heart-on' | 'heart-off';
}

export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

export interface CharacterLike {
  charId: string;
  totalLikes: number;
  likedBy: string[];
  lastUpdated?: any;
}

