import React, { useEffect, useRef } from 'react';

interface LivingEasternDragonProps {
  isGateOpen?: boolean;
  className?: string;
}

/**
 * Catmull-Rom to Cubic Bezier conversion for butter-smooth C1 continuous curves.
 */
function pointsToSmoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  if (pts.length === 2) {
    return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} L ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)}`;
  }

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i + 2 < pts.length ? pts[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

/**
 * THẦN LONG Á ĐÔNG UỐN LƯỢN CHÂN THỰC (LIVING EASTERN DRAGON)
 * 
 * Mô phỏng chuyển động uốn lượn hình sin lan truyền dọc sống lưng (undulatory locomotion)
 * của rồng thần Á Đông thật sự:
 * - 28 đốt sống (vertebrae) truyền sóng cơ từ gáy đến tận chót đuôi
 * - Thân rồng có bề rộng co giãn tự nhiên theo cơ bắp
 * - Đốt bụng xếp lớp ngấn vảy (ventral plates) co giãn theo độ cong của thân
 * - Hàng vây hoàng kim (dorsal flame fins) nhấp nhô theo từng đỉnh sóng
 * - 4 móng vuốt rồng (tứ trảo) đung đưa tự nhiên theo quán tính bơi lượn
 * - Đầu rồng uy nghi với sừng gạc hươu, mắt phượng, râu rồng uốn lượn bay trong gió
 * - Dạ Minh Châu (Long Châu) bay phía trước dẫn lối
 * - Hiệu năng 60 FPS mượt mà nhờ cập nhật trực tiếp DOM SVG qua requestAnimationFrame
 */
export default function LivingEasternDragon({ isGateOpen = false, className = '' }: LivingEasternDragonProps) {
  const bodyPathRef = useRef<SVGPathElement | null>(null);
  const bellyPathRef = useRef<SVGPathElement | null>(null);
  const bellyRibsRef = useRef<SVGPathElement | null>(null);
  const dorsalFinsRef = useRef<SVGPathElement | null>(null);
  const headGroupRef = useRef<SVGGElement | null>(null);
  const tailGroupRef = useRef<SVGGElement | null>(null);
  const clawsGroupRef = useRef<SVGGElement | null>(null);
  const whiskersRef = useRef<SVGPathElement | null>(null);
  const pearlRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    const N = 28; // Số đốt sống dọc thân rồng

    const updateDragon = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      // Khi mở cổng, rồng tăng tốc uốn lượn phấn chấn
      const waveSpeed = isGateOpen ? 3.8 : 2.5; 
      const t = elapsed * waveSpeed;

      // 1. TÍNH TOÁN TỌA ĐỘ VÀ VÉC-TƠ CỦA TỪNG ĐỐT SỐNG (SPINE VERTEBRAE)
      const spine: { x: number; y: number; tx: number; ty: number; nx: number; ny: number; w: number; u: number }[] = [];

      for (let i = 0; i < N; i++) {
        const u = i / (N - 1); // 0 ở đầu (gáy), 1 ở chót đuôi

        // Tần số không gian sóng: ~1.3 chu kỳ hình chữ S uốn lượn dọc thân
        const waveFreq = 1.35 * Math.PI * 2;
        const phase = t - u * waveFreq;

        // Biên độ uốn lượn tăng dần từ đầu về đuôi (đuôi vung mạnh nhất như đuôi rồng thật)
        // Đầu dao động nhẹ nhàng (14px) giữ thần thái uy nghi; đuôi quẫy mạnh (68px)
        const ampY = 14 + 26 * Math.sin(u * Math.PI * 0.75) + 38 * (u * u);
        
        // Sóng chính hình sin kết hợp hài hòa bậc 2 tạo độ nảy cơ bắp sinh học tự nhiên
        const waveY = ampY * Math.sin(phase) + (ampY * 0.22) * Math.sin(phase * 2 + 0.5);

        // Chuyển động lượn ngang phụ (giúp thân uốn khúc 3D chứ không chỉ dẹt 1 chiều)
        const ampX = ampY * 0.25;
        const waveX = ampX * Math.cos(phase);

        // Nhấp nhô bồng bềnh tổng thể cả thân rồng
        const hoverY = 10 * Math.sin(elapsed * 0.9);

        // Tọa độ gốc phân bố từ x=180 (đầu) đến x=860 (đuôi)
        const baseX = 180 + u * 680;
        const baseY = 180;

        const x = baseX + waveX;
        const y = baseY + waveY + hoverY;

        // Bề rộng nửa thân (half-width) tại đốt này:
        // Đốt 0 (gáy): ~18px -> ngực/thân giữa nở rộng cơ bắp ~24px -> thon gọn dần về đuôi ~3.5px
        let w = 18;
        if (u < 0.15) {
          w = 18 + (u / 0.15) * 5; // 18 -> 23
        } else if (u < 0.65) {
          w = 23 + Math.sin(((u - 0.15) / 0.5) * Math.PI) * 2.5; // 23 -> 25.5 -> 23
        } else if (u < 0.9) {
          w = 23 - ((u - 0.65) / 0.25) * 11; // 23 -> 12
        } else {
          w = 12 - ((u - 0.9) / 0.1) * 8.5; // 12 -> 3.5
        }

        spine.push({ x, y, tx: 0, ty: 0, nx: 0, ny: 0, w, u });
      }

      // Tính véc-tơ tiếp tuyến (tangent) và pháp tuyến (normal) cho từng đốt
      for (let i = 0; i < N; i++) {
        let tx = 0;
        let ty = 0;
        if (i === 0) {
          tx = spine[1].x - spine[0].x;
          ty = spine[1].y - spine[0].y;
        } else if (i === N - 1) {
          tx = spine[N - 1].x - spine[N - 2].x;
          ty = spine[N - 1].y - spine[N - 2].y;
        } else {
          tx = spine[i + 1].x - spine[i - 1].x;
          ty = spine[i + 1].y - spine[i - 1].y;
        }

        const len = Math.hypot(tx, ty) || 1;
        spine[i].tx = tx / len;
        spine[i].ty = ty / len;

        // Pháp tuyến hướng lên lưng (dorsal normal)
        // Vì tx > 0 (hướng từ đầu về đuôi), véc-tơ hướng lên trên (-y) là (ty, -tx)
        spine[i].nx = spine[i].ty;
        spine[i].ny = -spine[i].tx;
      }

      // 2. TẠO ĐƯỜNG CONG THÂN RỒNG (DORSAL & VENTRAL CONTOUR)
      const dorsalPts: { x: number; y: number }[] = [];
      const ventralPts: { x: number; y: number }[] = [];
      const bellyInnerPts: { x: number; y: number }[] = [];

      for (let i = 0; i < N; i++) {
        const p = spine[i];
        dorsalPts.push({
          x: p.x + p.nx * p.w,
          y: p.y + p.ny * p.w,
        });
        ventralPts.push({
          x: p.x - p.nx * p.w,
          y: p.y - p.ny * p.w,
        });
        // Đường viền ngăn cách giữa da lưng trắng ngọc và bụng rồng
        bellyInnerPts.push({
          x: p.x - p.nx * (p.w * 0.15),
          y: p.y - p.ny * (p.w * 0.15),
        });
      }

      // Ghép đường bao kín thân rồng (Bạch Long Thần Á Đông)
      const dorsalPath = pointsToSmoothPath(dorsalPts);
      const revVentral = [...ventralPts].reverse();
      const ventralPathSub = pointsToSmoothPath(revVentral).replace(/^M\s*[\d.]+\s*[\d.]+/, 'L');

      const fullBodyD = `${dorsalPath} L ${spine[N - 1].x.toFixed(1)} ${spine[N - 1].y.toFixed(1)} ${ventralPathSub} Z`;
      if (bodyPathRef.current) {
        bodyPathRef.current.setAttribute('d', fullBodyD);
      }

      // Ghép mảng bụng rồng (Belly strip)
      const bellyInnerSub = pointsToSmoothPath(bellyInnerPts);
      const bellyD = `${bellyInnerSub} L ${spine[N - 1].x.toFixed(1)} ${spine[N - 1].y.toFixed(1)} ${ventralPathSub} Z`;
      if (bellyPathRef.current) {
        bellyPathRef.current.setAttribute('d', bellyD);
      }

      // 3. VẼ CÁC ĐỐT NGẤN BỤNG (BELLY SCALES / TRANSVERSE RIBS)
      let ribsD = '';
      for (let i = 1; i < N - 2; i += 1) {
        const p = spine[i];
        const vX = p.x - p.nx * p.w;
        const vY = p.y - p.ny * p.w;
        const midX = p.x - p.nx * (p.w * 0.1);
        const midY = p.y - p.ny * (p.w * 0.1);
        // Ngấn bụng uốn hơi cong theo hướng bơi
        const ctrlX = (vX + midX) / 2 + p.tx * 3;
        const ctrlY = (vY + midY) / 2 + p.ty * 3;
        ribsD += `M ${vX.toFixed(1)} ${vY.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)} `;
      }
      if (bellyRibsRef.current) {
        bellyRibsRef.current.setAttribute('d', ribsD);
      }

      // 4. VẼ HÀNG VÂY LƯNG HOÀNG KIM (DORSAL FLAME FINS)
      let finsD = '';
      for (let i = 2; i < N - 3; i += 2) {
        const pPrev = dorsalPts[i - 1];
        const pCurr = dorsalPts[i];
        const pNext = dorsalPts[i + 1];
        const spineP = spine[i];

        // Chiều cao vây: lớn ở giữa thân (~22px), thuôn dần về gáy và đuôi
        const finHeight = 12 + 15 * Math.sin(spineP.u * Math.PI);
        // Mũi vây vuốt ngược về phía sau theo làn gió
        const finTipX = pCurr.x + spineP.nx * finHeight + spineP.tx * 8;
        const finTipY = pCurr.y + spineP.ny * finHeight + spineP.ty * 8;

        finsD += `M ${pPrev.x.toFixed(1)} ${pPrev.y.toFixed(1)} Q ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)} ${finTipX.toFixed(1)} ${finTipY.toFixed(1)} Q ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)} ${pNext.x.toFixed(1)} ${pNext.y.toFixed(1)} Z `;
      }
      if (dorsalFinsRef.current) {
        dorsalFinsRef.current.setAttribute('d', finsD);
      }

      // 5. XOAY VÀ ĐẶT ĐẦU RỒNG (DRAGON HEAD AT VERTEBRA 0)
      // Đầu rồng được vẽ chuẩn hướng sang trái (-X), sừng vươn lên (-Y), cằm ở dưới (+Y)
      // Góc ngẩng/cúi đầu dựa theo độ dốc giữa gáy (đốt 0) và cổ (đốt 1)
      const neckDx = spine[1].x - spine[0].x; // > 0 (~25px)
      const neckDy = spine[1].y - spine[0].y; // Nếu cổ thấp hơn đầu (y lớn hơn) -> dương -> rotate(dương) -> mõm xoay lên trên
      const headAngle = (Math.atan2(neckDy, neckDx) * 180) / Math.PI;

      if (headGroupRef.current) {
        const h = spine[0];
        headGroupRef.current.setAttribute(
          'transform',
          `translate(${h.x.toFixed(1)}, ${h.y.toFixed(1)}) rotate(${headAngle.toFixed(1)}) translate(35, 0)`
        );
      }

      // 6. XOAY VÀ ĐẶT CHÙM ĐUÔI RỒNG (DRAGON TAIL PLUME AT LAST VERTEBRA)
      if (tailGroupRef.current) {
        const tail = spine[N - 1];
        // Hướng vuốt của đuôi rồng theo chiều sóng lượn
        const tailAngle = Math.atan2(tail.ty, tail.tx) * (180 / Math.PI);
        tailGroupRef.current.setAttribute('transform', `translate(${tail.x.toFixed(1)}, ${tail.y.toFixed(1)}) rotate(${tailAngle.toFixed(1)})`);
      }

      // 7. CẬP NHẬT TỨ TRẢO (BỐN CHÂN RỒNG) THEO ĐỐT VÀ QUÁN TÍNH
      if (clawsGroupRef.current) {
        // Chân trước trái (đốt 5), chân trước phải (đốt 7)
        // Chân sau trái (đốt 15), chân sau phải (đốt 17)
        const clawIndices = [5, 7, 15, 17];
        const clawElements = clawsGroupRef.current.children;
        for (let c = 0; c < clawIndices.length; c++) {
          const idx = clawIndices[c];
          const sp = spine[idx];
          const vP = ventralPts[idx];
          // Độ đung đưa của cẳng chân theo nhịp lượn
          const swing = Math.sin(t - idx * 0.28) * 14;
          const isBackClaw = c % 2 === 1;
          const scale = isBackClaw ? 0.85 : 1;
          const opacity = isBackClaw ? 0.75 : 1;
          
          if (clawElements[c]) {
            (clawElements[c] as SVGGElement).setAttribute(
              'transform',
              `translate(${vP.x.toFixed(1)}, ${vP.y.toFixed(1)}) rotate(${swing.toFixed(1)}) scale(${scale})`
            );
            (clawElements[c] as SVGGElement).setAttribute('opacity', opacity.toString());
          }
        }
      }

      // Tọa độ mũi rồng trong không gian thế giới (snout point originally at local (-180, 10), translated by +35 -> -145)
      const headAngleRad = (headAngle * Math.PI) / 180;
      const cosA = Math.cos(headAngleRad);
      const sinA = Math.sin(headAngleRad);
      const snoutWorldX = spine[0].x + (-145 * cosA - 10 * sinA);
      const snoutWorldY = spine[0].y + (-145 * sinA + 10 * cosA);

      // 8. RÂU RỒNG UỐN LƯỢN DÀI THOÁT TỤC (FLOWING WHISKERS)
      if (whiskersRef.current) {
        // Râu rồng bắt đầu từ mũi và uốn lượn bay lướt về phía sau lưng (+X)
        const w1_p1x = snoutWorldX + 60 * cosA + Math.sin(t * 3.2) * 10;
        const w1_p1y = snoutWorldY + 60 * sinA - 10 + Math.cos(t * 3.2) * 14;
        const w1_p2x = snoutWorldX + 140 * cosA + Math.sin(t * 3.2 - 1.2) * 18;
        const w1_p2y = snoutWorldY + 140 * sinA - 16 + Math.cos(t * 3.2 - 1.2) * 24;
        const w1_endx = snoutWorldX + 220 * cosA + Math.sin(t * 3.2 - 2.4) * 24;
        const w1_endy = snoutWorldY + 220 * sinA - 20 + Math.cos(t * 3.2 - 2.4) * 30;

        const w2_p1x = snoutWorldX + 50 * cosA + Math.sin(t * 3.2 + 0.5) * 8;
        const w2_p1y = snoutWorldY + 50 * sinA + 8 + Math.cos(t * 3.2 + 0.5) * 12;
        const w2_p2x = snoutWorldX + 120 * cosA + Math.sin(t * 3.2 - 0.8) * 14;
        const w2_p2y = snoutWorldY + 120 * sinA + 14 + Math.cos(t * 3.2 - 0.8) * 18;
        const w2_endx = snoutWorldX + 190 * cosA + Math.sin(t * 3.2 - 2.0) * 20;
        const w2_endy = snoutWorldY + 190 * sinA + 18 + Math.cos(t * 3.2 - 2.0) * 24;

        const whiskersPath = `M ${snoutWorldX.toFixed(1)} ${snoutWorldY.toFixed(1)} C ${w1_p1x.toFixed(1)} ${w1_p1y.toFixed(1)}, ${w1_p2x.toFixed(1)} ${w1_p2y.toFixed(1)}, ${w1_endx.toFixed(1)} ${w1_endy.toFixed(1)} M ${snoutWorldX.toFixed(1)} ${(snoutWorldY + 6).toFixed(1)} C ${w2_p1x.toFixed(1)} ${w2_p1y.toFixed(1)}, ${w2_p2x.toFixed(1)} ${w2_p2y.toFixed(1)}, ${w2_endx.toFixed(1)} ${w2_endy.toFixed(1)}`;
        whiskersRef.current.setAttribute('d', whiskersPath);
      }

      // 9. DẠ MINH CHÂU (LONG CHÂU BAY DẪN ĐƯỜNG PHÍA TRƯỚC ĐẦU RỒNG)
      if (pearlRef.current) {
        // Tính toán vị trí mũi rồng trong tương lai để Long Châu luôn "dẫn đường"
        const dt = 0.25; // Ngọc dẫn trước 250ms
        const futureElapsed = elapsed + dt;
        const futureT = futureElapsed * waveSpeed;
        
        // Tọa độ spine[0] tương lai (gáy rồng)
        const f_phase0 = futureT; 
        const f_ampY0 = 14;
        const f_waveY0 = f_ampY0 * Math.sin(f_phase0) + (f_ampY0 * 0.22) * Math.sin(f_phase0 * 2 + 0.5);
        const f_waveX0 = (f_ampY0 * 0.25) * Math.cos(f_phase0);
        const f_hoverY = 10 * Math.sin(futureElapsed * 0.9);
        const f_s0x = 180 + f_waveX0;
        const f_s0y = 180 + f_waveY0 + f_hoverY;

        // Tọa độ spine[1] tương lai (để tính góc ngẩng đầu)
        const u1 = 1 / (N - 1);
        const f_phase1 = futureT - u1 * (1.35 * Math.PI * 2);
        const f_ampY1 = 14 + 26 * Math.sin(u1 * Math.PI * 0.75) + 38 * (u1 * u1);
        const f_waveY1 = f_ampY1 * Math.sin(f_phase1) + (f_ampY1 * 0.22) * Math.sin(f_phase1 * 2 + 0.5);
        const f_waveX1 = (f_ampY1 * 0.25) * Math.cos(f_phase1);
        const f_s1x = 180 + u1 * 680 + f_waveX1;
        const f_s1y = 180 + f_waveY1 + f_hoverY;

        const f_neckDx = f_s1x - f_s0x;
        const f_neckDy = f_s1y - f_s0y;
        const f_headAngleRad = Math.atan2(f_neckDy, f_neckDx);
        
        const f_cosA = Math.cos(f_headAngleRad);
        const f_sinA = Math.sin(f_headAngleRad);
        
        // Vị trí mũi rồng trong tương lai
        const futureSnoutX = f_s0x + (-180 * f_cosA - 10 * f_sinA);
        const futureSnoutY = f_s0y + (-180 * f_sinA + 10 * f_cosA);

        const bob = Math.sin(t * 1.8) * 12;
        // Long Châu bay lơ lửng trước vị trí tương lai đó
        const pearlX = futureSnoutX - 55 * f_cosA + Math.sin(t * 1.2) * 6;
        const pearlY = futureSnoutY - 55 * f_sinA + bob;
        pearlRef.current.setAttribute('transform', `translate(${pearlX.toFixed(1)}, ${pearlY.toFixed(1)})`);
      }

      animId = requestAnimationFrame(updateDragon);
    };

    animId = requestAnimationFrame(updateDragon);
    return () => cancelAnimationFrame(animId);
  }, [isGateOpen]);

  return (
    <div className={`living-dragon-container select-none pointer-events-none ${className}`}>
      <svg
        className="living-dragon-svg"
        viewBox="0 0 1020 380"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Thân Bạch Long Thần: Bạch ngọc tinh khôi với ánh vàng kim vương giả */}
          <linearGradient id="livingDragonBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FFFDF7" />
            <stop offset="70%" stopColor="#F9F6EE" />
            <stop offset="100%" stopColor="#EDE6D6" />
          </linearGradient>

          {/* Bụng rồng: Sắc kem ấm ngà voi chuyển mượt */}
          <linearGradient id="livingDragonBelly" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9EB" />
            <stop offset="50%" stopColor="#F8EFD8" />
            <stop offset="100%" stopColor="#EFE3C3" />
          </linearGradient>

          {/* Bờm, sừng gạc hươu & vây lưng hoàng kim rực rỡ */}
          <linearGradient id="livingDragonGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="40%" stopColor="#F5D77F" />
            <stop offset="80%" stopColor="#E5B942" />
            <stop offset="100%" stopColor="#C99414" />
          </linearGradient>

          {/* Hào quang Dạ Minh Châu (Long Châu) */}
          <radialGradient id="livingDragonPearlGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FFFBE6" />
            <stop offset="70%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#FF9800" />
          </radialGradient>

          {/* Hào quang tiên khí bao bọc thân rồng */}
          <filter id="livingDragonAura" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
            <feFlood floodColor="rgba(255, 220, 120, 0.45)" result="goldGlow" />
            <feComposite in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#livingDragonAura)">
          {/* 1. HÀNG VÂY LƯNG HOÀNG KIM (NẰM DƯỚI THÂN VỀ PHÍA TRÊN) */}
          <path
            ref={dorsalFinsRef}
            fill="url(#livingDragonGold)"
            stroke="#C59B27"
            strokeWidth="1.2"
            opacity="0.95"
          />

          {/* 2. CHÂN RỒNG (TỨ TRẢO - 4 CHÂN VUỐT SẮC NHỌN) */}
          <g ref={clawsGroupRef} className="dragon-claws">
            {/* 4 chân sẽ được cập nhật tọa độ transform tự động */}
            {[0, 1, 2, 3].map((idx) => (
              <g key={idx}>
                {/* Bắp đùi rồng */}
                <path d="M 0 0 Q -10 18, -16 32 Q -12 40, -4 46 Q 4 30, 2 0 Z" fill="url(#livingDragonBody)" stroke="#DECFA9" strokeWidth="1.2" />
                {/* Khớp cẳng chân */}
                <path d="M -16 32 Q -22 48, -26 62 Q -18 64, -10 54 Q -8 42, -4 46 Z" fill="url(#livingDragonBody)" stroke="#DECFA9" strokeWidth="1.2" />
                {/* Móng vuốt hoàng kim (4 móng nhọn uy phong) */}
                <path d="M -26 62 L -38 72 M -24 64 L -32 78 M -20 64 L -22 80 M -16 62 L -12 74" stroke="#D4AF37" strokeWidth="2.4" strokeLinecap="round" />
                {/* Bàn chân vuốt */}
                <circle cx="-22" cy="64" r="4.5" fill="url(#livingDragonGold)" />
              </g>
            ))}
          </g>

          {/* 3. THÂN BẠCH LONG THẦN (ĐƯỜNG BAO NGUYÊN KHỐI UỐN LƯỢN SỐNG ĐỘNG) */}
          <path
            ref={bodyPathRef}
            fill="url(#livingDragonBody)"
            stroke="#DFD4BE"
            strokeWidth="1.8"
          />

          {/* 4. MẢNG BỤNG RỒNG MÀU KEM NGỌC VÀ CÁC ĐỐT NGẤN BỤNG CO GIÃN */}
          <path
            ref={bellyPathRef}
            fill="url(#livingDragonBelly)"
            opacity="0.92"
          />
          <path
            ref={bellyRibsRef}
            fill="none"
            stroke="#D3C39E"
            strokeWidth="1.4"
            opacity="0.85"
          />

          {/* 5. ĐẦU THẦN LONG UY NGHI (AN ANCHORED HEAD WITH ANTLERS, EYES, MANE, FANGS) */}
          <g ref={headGroupRef} className="dragon-head-group">
            {/* Bờm gáy hoàng kim vương giả bay phấp phới về sau */}
            <path
              d="M -15 -18 C 30 -42, 70 -35, 105 -18 C 80 -10, 60 2, 45 14 C 75 12, 100 24, 118 48 C 88 44, 60 40, 42 50 C 72 58, 92 74, 98 96 C 70 82, 46 68, 30 60 Z"
              fill="url(#livingDragonGold)"
              opacity="0.95"
            />

            {/* Cặp sừng gạc hươu hoàng kim rực rỡ phân nhánh */}
            {/* Sừng phụ phía xa */}
            <path
              d="M -20 -15 C -10 -45, 12 -65, 42 -74 M 6 -48 C 4 -66, 12 -78, 20 -84 M 26 -62 C 36 -74, 48 -80, 58 -82"
              fill="none"
              stroke="#B38B1E"
              strokeWidth="3.6"
              strokeLinecap="round"
            />
            {/* Sừng chính hoàng kim tỏa sáng */}
            <path
              d="M -30 -16 C -18 -52, 6 -76, 38 -88 M -4 -54 C -6 -76, 2 -90, 10 -98 M 16 -70 C 28 -86, 42 -94, 55 -96 M 30 -78 C 44 -90, 60 -94, 72 -96"
              fill="none"
              stroke="url(#livingDragonGold)"
              strokeWidth="5.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Hộp sọ & Hàm trên rồng Á Đông */}
            <path
              d="M -35 24 C -42 -2, -60 -18, -80 -20 C -96 -22, -112 -16, -122 -8 C -136 -7, -156 -4, -175 0 C -186 2, -192 8, -190 14 C -188 18, -180 20, -168 22 C -148 24, -132 23, -116 26 C -100 28, -86 40, -68 46 C -50 50, -38 40, -35 24 Z"
              fill="url(#livingDragonBody)"
              stroke="#DECFA9"
              strokeWidth="1.4"
            />

            {/* Chóp mũi hếch & Lỗ mũi rồng uy phong */}
            <path
              d="M -188 10 C -190 4, -182 -1, -174 1 C -166 3, -168 11, -176 12 C -182 13, -186 12, -188 10 Z"
              fill="url(#livingDragonGold)"
            />
            <circle cx="-178" cy="7" r="2.8" fill="#3D2612" />

            {/* Hàm dưới hé mở uy nghi */}
            <path
              d="M -168 26 C -178 28, -180 34, -175 38 C -164 44, -145 45, -122 43 C -102 41, -86 48, -70 52 C -80 44, -94 36, -108 34 C -126 32, -146 30, -168 26 Z"
              fill="url(#livingDragonBody)"
              stroke="#DECFA9"
              strokeWidth="1.4"
            />

            {/* Răng nanh sắc nhọn */}
            <polygon points="-170,22 -165,31 -160,22" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
            <polygon points="-150,23 -145,33 -140,23" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
            <polygon points="-130,24 -126,32 -122,24" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
            <polygon points="-160,37 -156,29 -152,37" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />
            <polygon points="-140,38 -136,30 -132,38" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="0.8" />

            {/* Yếm râu cằm hoàng kim uy nghi */}
            <path
              d="M -162 40 C -170 56, -156 74, -136 82 C -146 68, -148 54, -150 42 Z"
              fill="url(#livingDragonGold)"
              opacity="0.9"
            />
            <path
              d="M -142 42 C -148 58, -134 72, -118 80 C -126 66, -128 54, -130 43 Z"
              fill="url(#livingDragonGold)"
              opacity="0.75"
            />

            {/* Gờ mày uy nghi */}
            <path
              d="M -126 -11 C -110 -22, -90 -18, -72 -24 C -88 -13, -102 -5, -120 -4 Z"
              fill="url(#livingDragonGold)"
            />

            {/* Mắt Thần Long uy nghi (Mắt phượng hoàng kim tỏa sáng) */}
            <path
              d="M -118 -1 C -112 -6, -98 -6, -92 0 C -98 6, -112 6, -118 -1 Z"
              fill="#181109"
              stroke="#F5D77F"
              strokeWidth="1.2"
            />
            <ellipse cx="-105" cy="-0.5" rx="4" ry="3.2" fill="#FFC107" />
            <ellipse cx="-105" cy="-0.5" rx="1.6" ry="3" fill="#8B0000" />
            <circle cx="-104" cy="-1.5" r="1.4" fill="#FFFFFF" />
          </g>

          {/* 6. CHÙM ĐUÔI LỬA HOÀNG KIM (FLOWING FLAME TAIL PLUME) */}
          <g ref={tailGroupRef} className="dragon-tail-group">
            {/* Chùm đuôi xòe bung mềm mại từ chóp đuôi như dải lụa hoàng kim */}
            <path
              d="M 0 0 C 35 -14, 70 -30, 110 -46 C 96 -22, 90 -8, 125 -16 C 145 -20, 166 -32, 180 -42 C 158 -16, 136 2, 172 8 C 188 10, 204 8, 215 2 C 186 24, 152 34, 118 26 C 88 20, 68 28, 42 36 C 22 22, 10 10, 0 0 Z"
              fill="url(#livingDragonGold)"
              stroke="#C59B27"
              strokeWidth="1.4"
              opacity="0.95"
            />
            {/* Dải lửa đuôi phụ uốn lượn */}
            <path
              d="M 12 -4 C 45 -22, 85 -36, 130 -44 C 105 -26, 102 -10, 138 -6 C 160 -4, 185 -14, 198 -22 C 172 4, 144 16, 115 14 Z"
              fill="#FFF2B2"
              opacity="0.65"
            />
          </g>

          {/* 7. ĐÔI RÂU RỒNG DÀI UỐN LƯỢN (DYNAMIC FLOWING WHISKERS) */}
          <path
            ref={whiskersRef}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="drop-shadow(0 0 4px rgba(245, 215, 127, 0.95))"
          />

          {/* 8. DẠ MINH CHÂU (SACRED DRAGON PEARL) DẪN ĐƯỜNG */}
          <g ref={pearlRef} className="dragon-pearl-orb">
            <circle cx="0" cy="0" r="14" fill="url(#livingDragonPearlGrad)" filter="drop-shadow(0 0 14px rgba(255, 215, 0, 0.95))" />
            <circle cx="-4" cy="-4" r="4.5" fill="#FFFFFF" opacity="0.92" />
            {/* Vòng hào quang quay xung quanh châu báu */}
            <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" stroke="#FFE082" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.85" transform="rotate(-25)" />
            {/* Tia sáng tinh khôi */}
            <path d="M 0 -18 L 0 18 M -18 0 L 18 0" stroke="#FFF9C4" strokeWidth="1.2" opacity="0.75" />
          </g>
        </g>
      </svg>
    </div>
  );
}
