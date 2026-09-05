/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ============================================================================
 * LANDING SCREEN - LONG UYÊN CỦA SHIN
 * Giao diện bên ngoài: Mộng Cảnh Tiên Giới (Bầu trời Mây Núi & Thần Long Á Đông)
 * ============================================================================
 */

import React, { useEffect, useState, useCallback } from 'react';
import { ToastMessage } from '../types';
import GoldenGate from './GoldenGate';
import { AnimeSakuraTree } from './AnimeSakuraTree';
import { AnimeHills, AnimeWildflowers } from './AnimeMeadow';
import { AnimeBirds } from './AnimeBirds';
import LivingEasternDragon from './LivingEasternDragon';

interface LandingScreenProps {
  /** Hàm kích hoạt khi người dùng nhấn "Tham quan Long Uyển" */
  onEnterGarden: () => void;
  /** Trạng thái đang chuyển cảnh vào Inner App */
  isEntering: boolean;
  /** Hàm hiển thị thông báo toast (tùy chọn) */
  onToast?: (text: string, type?: ToastMessage['type']) => void;
}

/**
 * Hiệu ứng âm thanh chuông đại hồng chung & chuông vàng mở cổng Tiên Giới (Web Audio API)
 */
function playGateOpeningSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // 1. Tiếng đại hồng chung trầm ấm ngân vang (Resonant bronze bell)
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(164.81, ctx.currentTime); // E3
    bellGain.gain.setValueAtTime(0.12, ctx.currentTime);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);
    bellOsc.connect(bellGain);
    bellGain.connect(ctx.destination);
    bellOsc.start();
    bellOsc.stop(ctx.currentTime + 2.9);

    // 2. Chuỗi hòa âm chuông vàng ngân tiên cảnh (Golden Chimes)
    const goldenChord = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    goldenChord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      const startTime = ctx.currentTime + 0.12 + idx * 0.08;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.06, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 2.3);
    });
  } catch {
    // Bỏ qua nếu trình duyệt chặn tự phát âm thanh
  }
}

export default function LandingScreen({
  onEnterGarden,
  isEntering,
  onToast
}: LandingScreenProps) {
  const [isGateOpen, setIsGateOpen] = useState(false);

  // Kích hoạt mở cổng 3D và chuyển cảnh
  const handleOpenGate = useCallback(() => {
    if (isEntering || isGateOpen) return;
    setIsGateOpen(true);
    playGateOpeningSound();

    // Cánh cổng xoay mở 3D trong 1.6s, sau 850ms kích hoạt chuyển sang Inner App
    setTimeout(() => {
      onEnterGarden();
    }, 850);
  }, [isEntering, isGateOpen, onEnterGarden]);

  useEffect(() => {
    // 1. Mưa cánh hoa sakura rơi từ cây cổ thụ (Khu Vườn Tiên Cảnh Ghibli)
    const sakuraContainer = document.getElementById('sakuraRain');
    if (sakuraContainer) {
      sakuraContainer.innerHTML = '';
      const sakuraColors = ['#FFB7C5', '#FFC8DD', '#FFE4EC', '#FFF0F5'];
      for (let i = 0; i < 35; i++) {
        const petal = document.createElement('div');
        petal.className = 'sakura-petal';
        const startLeft = Math.random() * 80;
        petal.style.left = startLeft + 'vw';
        petal.style.background = sakuraColors[Math.floor(Math.random() * sakuraColors.length)];
        petal.style.width = (8 + Math.random() * 10) + 'px';
        petal.style.height = (8 + Math.random() * 10) + 'px';
        petal.style.animationDuration = (8 + Math.random() * 10) + 's';
        petal.style.animationDelay = (Math.random() * 10) + 's';
        petal.style.setProperty('--drift', (Math.random() * 200 - 50) + 'px');
        sakuraContainer.appendChild(petal);
      }
    }

    // 2. Cánh hoa rơi phủ trước màn hình qua cả cánh cổng và bảng tiêu đề (petalRain)
    const box = document.getElementById("petalRain");
    if (!box) return;

    // Xóa các cánh hoa cũ tránh trùng lặp
    box.innerHTML = '';

    // Toàn bộ các tông màu hồng nhạt dịu dàng (Soft Pink shades)
    const softPinkColors = [
      "#FFB7C5", /* Hồng cánh đào phớt */
      "#FFC8DD", /* Hồng phấn pastel */
      "#FFD1DC", /* Hồng thạch anh nhạt */
      "#FFE4EC", /* Hồng tuyết mai */
      "#FFCCD5", /* Hồng ngọc bích nhạt */
      "#F8BBD0", /* Hồng anh đào dịu */
      "#FFDEE9"  /* Hồng sương sớm */
    ];

    // Phân bổ cánh hoa: Dàn nhiều dày đặc ở hai bên sườn màn hình, ở giữa điểm xuyết ít hơn
    const totalPetals = 48;
    for (let i = 0; i < totalPetals; i++) {
      const el = document.createElement("span");
      el.className = "petal";

      let leftPercent: number;
      let drift: number;

      const zoneRoll = Math.random();
      if (zoneRoll < 0.42) {
        // Cánh hoa bên trái (0vw đến 28vw) - Rơi nhiều hai bên sườn
        leftPercent = Math.random() * 28;
        drift = Math.random() * 70 - 15;
      } else if (zoneRoll < 0.84) {
        // Cánh hoa bên phải (72vw đến 100vw) - Rơi nhiều hai bên sườn
        leftPercent = 72 + Math.random() * 28;
        drift = Math.random() * 70 - 55;
      } else {
        // Khu vực trung tâm (28vw đến 72vw) - Thưa thớt, ít hơn hẳn hai bên
        leftPercent = 28 + Math.random() * 44;
        drift = Math.random() * 50 - 25;
      }

      el.style.left = `${leftPercent.toFixed(1)}vw`;
      el.style.background = softPinkColors[i % softPinkColors.length];
      el.style.animationDuration = 7 + Math.random() * 8 + "s";
      el.style.animationDelay = (Math.random() * 9.5).toFixed(1) + "s";
      el.style.setProperty("--drift", `${drift.toFixed(0)}px`);
      el.style.width = 10 + Math.random() * 9 + "px";
      el.style.height = 11 + Math.random() * 10 + "px";
      el.style.opacity = (0.75 + Math.random() * 0.22).toFixed(2);
      box.appendChild(el);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-40 overflow-hidden select-none flex flex-col justify-between items-center">
      {/* =====================================================================
          LỚP NỀN (BACKGROUND SCENIC WRAPPER - LAYERS 0 ĐẾN 7)
          Bầu trời pastel, dãy núi Ghibli, đàn chim bay, cây cổ thụ hoa đào
          và Thần Long Á Đông uyển chuyển bơi lượn quanh giữa màn hình.
          Khi mở cổng: Background zoom nhẹ lên (scale 1.12) tạo cảm giác người dùng
          đang tiến bước qua cánh cổng vào cõi tiên Long Uyển!
          ===================================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform will-change-transform"
        style={{
          transform: isGateOpen ? 'scale(1.12)' : 'scale(1)',
          transitionDuration: '1.8s',
          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
          transformOrigin: 'center center'
        }}
      >
        {/* ===================================================================
            🌸 KHU VƯỜN TIÊN CẢNH GHIBLI (DƯỚI CÙNG LỚP NỀN)
            Bầu trời pastel, vầng dương dịu nhẹ, đồi mờ xa, chim bay từng đàn,
            cây cổ thụ hoa đào khổng lồ rủ bóng và mưa cánh hoa lất phất
            =================================================================== */}
        <div className="enchanted-garden-bg" aria-hidden="true">
          {/* Bầu trời & Ánh mặt trời dịu */}
          <div className="sky-gradient"></div>
          <div className="glowing-sun"></div>

          {/* Dãy đồi xanh mướt phong cách Anime Ghibli (đa tầng, điểm hoa cỏ, đón vệt nắng) */}
          <AnimeHills />

          {/* Đàn chim phong cách Anime: Bay tới gần, chao cánh rồi bay xa khuất chân trời */}
          <AnimeBirds />

          {/* CÂY HOA ANH ĐÀO CỔ THỤ PHONG CÁCH ANIME (Gốc rễ cắm sâu, đung đưa theo gió) */}
          <AnimeSakuraTree />

          {/* Mưa cánh hoa rơi từ cây xuống */}
          <div id="sakuraRain" className="sakura-rain"></div>
        </div>

        {/* ===================================================================
            KHU VƯỜN LỚP NỀN & SƯƠNG MÙ TIÊN CẢNH
            =================================================================== */}
        <div className="garden-bg" aria-hidden="true">
          {/* Lớp sương mù tiên cảnh phủ toàn màn hình (gradient trắng trong suốt, chuyển động nhẹ nhàng) */}
          <div className="garden-mist"></div>

          {/* Mây bồng bềnh */}
          <div className="cloud c1"></div>
          <div className="cloud c2"></div>
          <div className="cloud c3"></div>

          {/* ===================================================================
              🐉 THẦN LONG Á ĐÔNG UỐN LƯỢN CHÂN THỰC (LIVING EASTERN DRAGON)
              Sống lưng 28 đốt uốn lượn hình sin lan truyền liên tục, bờm sừng hoàng kim,
              vảy ngấn bụng co giãn nhịp nhàng, tứ trảo & râu rồng bay lượn trong gió
              =================================================================== */}
          <div className="dragon-sky-layer" aria-hidden="true">
            <div 
              className="dragon-flight"
              style={isGateOpen ? { animationDuration: '6s' } : undefined}
            >
              <LivingEasternDragon isGateOpen={isGateOpen} />
            </div>
          </div>

          {/* KHÓM HOA CỎ TIỀN CẢNH ANIME (Từng ngọn cỏ xanh đung đưa theo gió, cúc dại, bồ công anh, hoa chuông và hoa cánh bướm) */}
          <AnimeWildflowers />
        </div>
      </div>

      {/* =====================================================================
          LỚP TIỀN CẢNH (CÁNH CỔNG SONG SẮT VÀNG KIM - 3D WROUGHT IRON GATE)
          Cổng đôi vàng kim có khe hở, hoa văn vảy rồng và dây leo,
          tấm biển kính mờ và hiệu ứng mở toang 3D sang 2 bên khi click!
          ===================================================================== */}
      <GoldenGate
        isOpen={isGateOpen}
        onOpenGate={handleOpenGate}
        isEntering={isEntering}
        onToast={onToast}
      />

      {/* =====================================================================
          🌸 CÁNH HOA HỒNG NHẠT RƠI PHỦ TRƯỚC MÀN HÌNH
          Nằm ở lớp ngoài cùng nhất (z-50), bay lượn lướt qua cả cánh cổng
          và bảng tiêu đề trung tâm, tạo không gian tiên cảnh lãng mạn đa chiều.
          ===================================================================== */}
      <div id="petalRain" className="petal-rain fixed inset-0 z-50 pointer-events-none" aria-hidden="true"></div>
    </div>
  );
}
