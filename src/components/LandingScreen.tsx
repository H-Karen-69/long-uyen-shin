import React, { useState, useCallback, useEffect } from 'react';
import GoldenGate from './GoldenGate';
import LivingEasternDragon from './LivingEasternDragon';
import { AnimeHills, AnimeWildflowers } from './AnimeMeadow';
import { AnimeBirds } from './AnimeBirds';
import { AnimeSakuraTree } from './AnimeSakuraTree';

interface LandingScreenProps {
  onEnterGarden: () => void;
  isEntering: boolean;
  onToast: (text: string, type: 'info' | 'success' | 'heart-on' | 'heart-off') => void;
}

// Âm thanh chuông gió tiên cảnh du dương khi mở cổng
const playGateOpeningSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const bellPitches = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    bellPitches.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 1.85);
    });
  } catch {
    // Ignore audio error if user hasn't interacted
  }
};

export default function LandingScreen({
  onEnterGarden,
  isEntering,
  onToast
}: LandingScreenProps) {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  // Kích hoạt mở cổng, camera lướt tới từ từ êm ái, thời gian chuyển vào giao diện chính giữ nguyên như cũ (~1.4s)
  const handleOpenGate = useCallback(() => {
    if (isEntering || isGateOpen) return;
    setIsGateOpen(true);
    setIsZooming(true);
    playGateOpeningSound();

    // Giữ nguyên thời gian chuyển cảnh vào giao diện chính (~1.4s), không phải chờ đợi lâu
    setTimeout(() => {
      onEnterGarden();
    }, 1400);
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
    <div className="fixed inset-0 z-40 overflow-hidden select-none flex flex-col justify-between items-center bg-[#F5F3EC]">
      {/* =====================================================================
          KHUNG HÌNH CAMERA 3D (ZOOM VÀO TỪ TỪ, ÊM DỊU KHI MỞ CỔNG)
          Khi bấm mở cổng: Cổng mở ra khoan thai, camera lướt tới từ từ, êm dịu (scale 2.0).
          Các cánh cổng dạt ra 2 bên, người dùng nhẹ nhàng tiến qua cổng vào khu vườn.
          ===================================================================== */}
      <div 
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transform: isZooming ? 'scale(1.26)' : 'scale(1)',
          transformOrigin: '50% 50%',
          transition: 'transform 3.0s cubic-bezier(0.2, 0.9, 0.3, 1)',
        }}
      >
        {/* =====================================================================
            LỚP NỀN (BACKGROUND SCENIC WRAPPER)
            Bầu trời pastel, dãy núi Ghibli, đàn chim bay, cây cổ thụ hoa đào
            và Thần Long Á Đông uy nghi tĩnh tại trên bầu trời.
            ===================================================================== */}
        <div className="absolute inset-0 pointer-events-none">
          {/* KHU VƯỜN TIÊN CẢNH GHIBLI */}
          <div className="enchanted-garden-bg" aria-hidden="true">
            <div className="sky-gradient"></div>
            <div className="glowing-sun"></div>
            <AnimeHills />
            <AnimeBirds />
            <AnimeSakuraTree />
            <div id="sakuraRain" className="sakura-rain"></div>
          </div>

          {/* SƯƠNG MÙ & MÂY TIÊN CẢNH */}
          <div className="garden-bg" aria-hidden="true">
            <div className="garden-mist"></div>
            <div className="cloud c1"></div>
            <div className="cloud c2"></div>
            <div className="cloud c3"></div>

            {/* THẦN LONG Á ĐÔNG UY NGHI TĨNH TẠI (LIVING EASTERN DRAGON) */}
            <div className="dragon-sky-layer" aria-hidden="true">
              <div className="dragon-flight">
                <LivingEasternDragon isGateOpen={isGateOpen} />
              </div>
            </div>

            {/* KHÓM HOA CỎ TIỀN CẢNH */}
            <AnimeWildflowers />
          </div>
        </div>

        {/* =====================================================================
            LỚP TIỀN CẢNH (CÁNH CỔNG SONG SẮT VÀNG KIM - 3D WROUGHT IRON GATE)
            ===================================================================== */}
        <GoldenGate
          isOpen={isGateOpen}
          onOpenGate={handleOpenGate}
          isEntering={isEntering}
          onToast={onToast}
        />
      </div>

      {/* =====================================================================
          🌸 CÁNH HOA HỒNG NHẠT RƠI PHỦ TRƯỚC MÀN HÌNH
          ===================================================================== */}
      <div 
        id="petalRain" 
        className="petal-rain fixed inset-0 z-50 pointer-events-none transition-opacity duration-700" 
        style={{ opacity: isEntering ? 0 : 1 }}
        aria-hidden="true"
      />
    </div>
  );
}
