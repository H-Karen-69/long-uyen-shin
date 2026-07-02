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
  statusTag: string;     // #MẻMới (vàng chanh đậm)
  likes: number;
  genre: 'TXVT' | 'Hắc Bang' | 'Thần Thoại' | 'Cổ Điển';
  taste: 'Ngọt' | 'Ngược' | 'Sủng' | 'Ngọt xen đau';
  statusType: 'Mới' | 'Hot' | 'Kỳ Cựu';
  birthday?: string; // DD/MM format
  birthdayImage?: string;
  age?: number;
  isHot?: boolean;
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

