import React, { useMemo } from 'react';

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
 * THẦN LONG Á ĐÔNG TĨNH TẠI UY NGHI (LIVING EASTERN DRAGON)
 * - Thân rồng liền mạch, to tròn đều đặn theo dáng rồng truyền thống Á Đông.
 * - Phần đuôi vuốt thon và khép lại hoàn toàn tại chóp đuôi.
 * - Chùm đuôi lửa hoàng kim xòe rộng bay bổng ở đằng sau chóp đuôi.
 */
export default function LivingEasternDragon({ className = '' }: LivingEasternDragonProps) {
  const geo = useMemo(() => {
    const N = 60;
    const baseX = 245;
    const baseY = 190;
    const L = 590;
    const waveFreq = 1.35 * Math.PI * 2;
    const BODY_RADIUS = 28; // Thân rồng to hơn, vạm vỡ uy nghi (đường kính 56px)

    const spine: { x: number; y: number; tx: number; ty: number; nx: number; ny: number; w: number; u: number }[] = [];

    // 1. Tọa độ sống lưng uốn lượn hình chữ S Á Đông uy nghi tĩnh tại
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1); // 0 ở gáy/đầu, 1 ở chót đuôi
      const phase = -u * waveFreq;

      const waveY = 44 * Math.sin(phase) + 9 * Math.sin(phase * 2 + 0.3);
      const waveX = 13 * Math.cos(phase);

      const x = baseX + u * L + waveX;
      const y = baseY + waveY;

      // Thân rồng bằng nhau hoàn toàn suốt chiều dài, sau đó vuốt thon và khép lại hoàn toàn ở chóp đuôi
      let w: number;
      if (u < 0.85) {
        w = BODY_RADIUS; // Thân bằng nhau đều đặn suốt toàn bộ thân
      } else {
        // Vuốt thon đều đặn và khép khít về 0 tại đúng chóp đuôi (u = 1.0)
        const t = Math.min(1.0, Math.max(0.0, (u - 0.85) / 0.15));
        w = BODY_RADIUS * Math.pow(1.0 - t, 1.25);
      }

      spine.push({ x, y, tx: 0, ty: 0, nx: 0, ny: 0, w, u });
    }

    // 2. Tiếp tuyến và pháp tuyến dọc theo sống lưng
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
      spine[i].nx = spine[i].ty;
      spine[i].ny = -spine[i].tx;
    }

    // 3. Tọa độ đường biên sống lưng (dorsal) và biên bụng (ventral)
    const dorsalPts: { x: number; y: number }[] = [];
    const ventralPts: { x: number; y: number }[] = [];
    const bellyInnerPts: { x: number; y: number }[] = [];

    for (let i = 0; i < N; i++) {
      const p = spine[i];
      dorsalPts.push({ x: p.x + p.nx * p.w, y: p.y + p.ny * p.w });
      ventralPts.push({ x: p.x - p.nx * p.w, y: p.y - p.ny * p.w });
      // Ranh giới mảng bụng (khoảng 32% bán kính thân)
      bellyInnerPts.push({ x: p.x - p.nx * (p.w * 0.32), y: p.y - p.ny * (p.w * 0.32) });
    }

    // Thân rồng khép kín liền mạch: Dorsal chạy từ đầu -> đuôi, rồi Ventral ngược từ đuôi -> đầu
    const dorsalPath = pointsToSmoothPath(dorsalPts);
    const revVentral = [...ventralPts].reverse();
    const ventralPathSub = pointsToSmoothPath(revVentral).replace(/^M\s*[\d.-]+\s*[\d.-]+/, '');

    const fullBodyD = `${dorsalPath} ${ventralPathSub} Z`;

    // Mảng bụng rồng ngà voi
    const bellyInnerSub = pointsToSmoothPath(bellyInnerPts);
    const bellyD = `${bellyInnerSub} ${ventralPathSub} Z`;

    // 4. Ngấn bụng rồng hoàng gia (đều đặn, thanh thoát dọc phần thân có bụng)
    let ribsD = '';
    for (let i = 2; i < N - 10; i += 2) {
      const p = spine[i];
      const vX = p.x - p.nx * p.w;
      const vY = p.y - p.ny * p.w;
      const inX = p.x - p.nx * (p.w * 0.3);
      const inY = p.y - p.ny * (p.w * 0.3);
      const ctrlX = (vX + inX) / 2 + p.tx * 4;
      const ctrlY = (vY + inY) / 2 + p.ty * 4;
      ribsD += `M ${vX.toFixed(1)} ${vY.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${inX.toFixed(1)} ${inY.toFixed(1)} `;
    }

    // 5. Hàng vây lưng hoàng kim (dọc theo sống lưng, vuốt thon mượt về phía đuôi)
    let finsD = '';
    for (let i = 1; i < N - 8; i += 2) {
      const pPrev = dorsalPts[i - 1];
      const pCurr = dorsalPts[i];
      const pNext = dorsalPts[i + 1];
      const spineP = spine[i];
      const finHeight = 13 + 12 * Math.sin(spineP.u * Math.PI * 0.95);
      const finTipX = pCurr.x + spineP.nx * finHeight + spineP.tx * 8;
      const finTipY = pCurr.y + spineP.ny * finHeight + spineP.ty * 8;
      finsD += `M ${pPrev.x.toFixed(1)} ${pPrev.y.toFixed(1)} Q ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)} ${finTipX.toFixed(1)} ${finTipY.toFixed(1)} Q ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)} ${pNext.x.toFixed(1)} ${pNext.y.toFixed(1)} Z `;
    }

    // 6. Đầu Thần Long (liền mạch vào cổ rồng)
    const neckDx = spine[1].x - spine[0].x;
    const neckDy = spine[1].y - spine[0].y;
    // Góc đầu rồng nhẹ nhàng, tĩnh tại, thong dong
    const rawHeadAngle = (Math.atan2(neckDy, neckDx) * 180) / Math.PI;
    const headAngle = rawHeadAngle * 0.35;
    const headTransform = `translate(${spine[0].x.toFixed(1)}, ${spine[0].y.toFixed(1)}) rotate(${headAngle.toFixed(1)}) translate(30, -15)`;

    // 7. Đuôi Thần Long (Chùm đuôi lửa hoàng kim ở đằng sau chót đuôi đã khép lại)
    const tail = spine[N - 1];
    const tailAngle = (Math.atan2(tail.ty, tail.tx) * 180) / Math.PI;
    const tailTransform = `translate(${tail.x.toFixed(1)}, ${tail.y.toFixed(1)}) rotate(${tailAngle.toFixed(1)})`;

    // 8. Tứ trảo rồng (4 móng vuốt uy nghi trên bụng)
    const clawIndices = [9, 14, 34, 40];
    const claws = clawIndices.map((idx, c) => {
      const vP = ventralPts[idx];
      const isBackClaw = c % 2 === 1;
      const scale = isBackClaw ? 1.0 : 1.15;
      const opacity = isBackClaw ? 0.82 : 1;
      return {
        transform: `translate(${vP.x.toFixed(1)}, ${vP.y.toFixed(1)}) scale(${scale})`,
        opacity,
        isFrontClaw: c === 0, // Móng vuốt trước chính vươn ra chộp ngọc
      };
    });

    // 9. Đôi râu rồng tiên khí (Whiskers bay bổng về sau)
    const wRad = (headAngle * Math.PI) / 180;
    const wCos = Math.cos(wRad);
    const wSin = Math.sin(wRad);
    const snoutX = spine[0].x + (-172 * wCos - 8 * wSin);
    const snoutY = spine[0].y + (-172 * wSin + 8 * wCos);

    const r1_c1x = snoutX + 50 * wCos - 15 * wSin;
    const r1_c1y = snoutY + 50 * wSin + 15 * wCos - 18;
    const r1_c2x = snoutX + 130 * wCos - 8 * wSin;
    const r1_c2y = snoutY + 130 * wSin + 8 * wCos - 24;
    const r1_endx = snoutX + 210 * wCos;
    const r1_endy = snoutY + 210 * wSin - 28;

    const r2_c1x = snoutX + 40 * wCos + 12 * wSin;
    const r2_c1y = snoutY + 40 * wSin - 12 * wCos + 14;
    const r2_c2x = snoutX + 115 * wCos + 8 * wSin;
    const r2_c2y = snoutY + 115 * wSin - 8 * wCos + 20;
    const r2_endx = snoutX + 185 * wCos;
    const r2_endy = snoutY + 185 * wSin + 24;

    const whiskersPath = `M ${snoutX.toFixed(1)} ${snoutY.toFixed(1)} C ${r1_c1x.toFixed(1)} ${r1_c1y.toFixed(1)}, ${r1_c2x.toFixed(1)} ${r1_c2y.toFixed(1)}, ${r1_endx.toFixed(1)} ${r1_endy.toFixed(1)} M ${snoutX.toFixed(1)} ${(snoutY + 6).toFixed(1)} C ${r2_c1x.toFixed(1)} ${r2_c1y.toFixed(1)}, ${r2_c2x.toFixed(1)} ${r2_c2y.toFixed(1)}, ${r2_endx.toFixed(1)} ${r2_endy.toFixed(1)}`;

    // 10. Tọa độ xuất phát của Dạ Minh Châu (Long Châu) trước miệng Thần Long
    const pearlBaseX = snoutX - 58 * wCos;
    const pearlBaseY = snoutY - 58 * wSin;
    const pearlTransform = `translate(${pearlBaseX.toFixed(1)}, ${pearlBaseY.toFixed(1)})`;

    return {
      fullBodyD,
      bellyD,
      ribsD,
      finsD,
      headTransform,
      tailTransform,
      claws,
      whiskersPath,
      pearlTransform,
    };
  }, []);

  return (
    <div className={`living-dragon-container select-none pointer-events-none ${className}`}>
      <svg
        className="living-dragon-svg"
        viewBox="-120 -50 1200 460"
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
            <stop offset="30%" stopColor="#FFFBE6" />
            <stop offset="65%" stopColor="#FFD54F" />
            <stop offset="90%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#E65100" />
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
          {/* =================================================================
              PHẦN THẦN LONG Á ĐÔNG (BẠCH LONG THẦN ĐUỔI THEO NGỌC)
              ================================================================= */}
          <g className="dragon-chase-body-surge">
            {/* 1. HÀNG VÂY LƯNG HOÀNG KIM (DỌC SỐNG LƯNG RỒNG) */}
            <path
              d={geo.finsD}
              fill="url(#livingDragonGold)"
              stroke="#C59B27"
              strokeWidth="1.2"
              opacity="0.95"
            />

            {/* 2. CHÂN RỒNG (TỨ TRẢO - MÓNG VUỐT TRƯỚC VƯƠN RA CHỘP NGỌC) */}
            <g className="dragon-claws">
              {geo.claws.map((claw, idx) => (
                <g key={idx} transform={claw.transform} opacity={claw.opacity}>
                  <g className={claw.isFrontClaw ? 'dragon-front-claw-reach' : ''}>
                    {/* Bắp đùi rồng */}
                    <path d="M 0 0 Q -10 18, -16 32 Q -12 40, -4 46 Q 4 30, 2 0 Z" fill="url(#livingDragonBody)" stroke="#DECFA9" strokeWidth="1.2" />
                    {/* Khớp cẳng chân */}
                    <path d="M -16 32 Q -22 48, -26 62 Q -18 64, -10 54 Q -8 42, -4 46 Z" fill="url(#livingDragonBody)" stroke="#DECFA9" strokeWidth="1.2" />
                    {/* Móng vuốt hoàng kim vươn sắc */}
                    <path d="M -26 62 L -38 72 M -24 64 L -32 78 M -20 64 L -22 80 M -16 62 L -12 74" stroke="#D4AF37" strokeWidth="2.4" strokeLinecap="round" />
                    {/* Khớp bàn chân */}
                    <circle cx="-22" cy="64" r="4.5" fill="url(#livingDragonGold)" />
                  </g>
                </g>
              ))}
            </g>

            {/* 3. THÂN BẠCH LONG THẦN (LIỀN MẠCH, TO ĐỀU ĐẶN, KHÉP LẠI Ở ĐUÔI) */}
            <path
              d={geo.fullBodyD}
              fill="url(#livingDragonBody)"
              stroke="#DFD4BE"
              strokeWidth="2.2"
            />

            {/* 4. MẢNG BỤNG VÀ ĐỐT NGẤN BỤNG RỒNG */}
            <path
              d={geo.bellyD}
              fill="url(#livingDragonBelly)"
              opacity="0.92"
            />
            <path
              d={geo.ribsD}
              fill="none"
              stroke="#D3C39E"
              strokeWidth="1.6"
              opacity="0.85"
            />

            {/* 5. ĐẦU THẦN LONG UY NGHI (BÁM ĐUỔI THEO HƯỚNG BAY CỦA NGỌC) */}
            <g transform={geo.headTransform} className="dragon-head-group">
              <g className="head-chase-track">
                {/* Bờm gáy hoàng kim vương giả phủ qua cổ và đầu thân rồng */}
                <path
                  d="M -15 -18 C 30 -42, 70 -35, 105 -18 C 80 -10, 60 2, 45 14 C 75 12, 100 24, 118 48 C 88 44, 60 40, 42 50 C 72 58, 92 74, 98 96 C 70 82, 46 68, 30 60 Z"
                  fill="url(#livingDragonGold)"
                  opacity="0.95"
                />

                {/* Cặp sừng gạc hươu hoàng kim rực rỡ phân nhánh */}
                <path
                  d="M -20 -15 C -10 -45, 12 -65, 42 -74 M 6 -48 C 4 -66, 12 -78, 20 -84 M 26 -62 C 36 -74, 48 -80, 58 -82"
                  fill="none"
                  stroke="#B38B1E"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                />
                <path
                  d="M -30 -16 C -18 -52, 6 -76, 38 -88 M -4 -54 C -6 -76, 2 -90, 10 -98 M 16 -70 C 28 -86, 42 -94, 55 -96 M 30 -78 C 44 -90, 60 -94, 72 -96"
                  fill="none"
                  stroke="url(#livingDragonGold)"
                  strokeWidth="5.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Hộp sọ & Hàm trên */}
                <path
                  d="M -35 24 C -42 -2, -60 -18, -80 -20 C -96 -22, -112 -16, -122 -8 C -136 -7, -156 -4, -175 0 C -186 2, -192 8, -190 14 C -188 18, -180 20, -168 22 C -148 24, -132 23, -116 26 C -100 28, -86 40, -68 46 C -50 50, -38 40, -35 24 Z"
                  fill="url(#livingDragonBody)"
                  stroke="#DECFA9"
                  strokeWidth="1.4"
                />

                {/* Chóp mũi & Lỗ mũi */}
                <path
                  d="M -188 10 C -190 4, -182 -1, -174 1 C -166 3, -168 11, -176 12 C -182 13, -186 12, -188 10 Z"
                  fill="url(#livingDragonGold)"
                />
                <circle cx="-178" cy="7" r="2.8" fill="#3D2612" />

                {/* Hàm dưới há nhẹ chực đớp ngọc */}
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

                {/* Yếm râu cằm hoàng kim */}
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

                {/* Gờ mày rồng */}
                <path
                  d="M -126 -11 C -110 -22, -90 -18, -72 -24 C -88 -13, -102 -5, -120 -4 Z"
                  fill="url(#livingDragonGold)"
                />

                {/* Mắt Thần Long uy nghi rực sáng dõi theo ngọc */}
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
            </g>

            {/* 6. CHÙM ĐUÔI LỬA HOÀNG KIM (Ở ĐẰNG SAU CHÓP ĐUÔI ĐÃ KHÉP LẠI) */}
            <g transform={geo.tailTransform} className="dragon-tail-group">
              {/* Chùm lửa đuôi chính: Xòe rộng, uốn lượn bay bổng ở đằng sau chóp đuôi */}
              <path
                d="M 0 0 
                   C 25 -10, 55 -24, 90 -38 
                   C 78 -18, 72 -6, 102 -12 
                   C 125 -16, 150 -26, 175 -36 
                   C 152 -12, 130 6, 168 12 
                   C 185 14, 204 10, 215 4 
                   C 188 24, 156 32, 122 26 
                   C 94 20, 72 28, 48 34 
                   C 26 22, 12 10, 0 0 Z"
                fill="url(#livingDragonGold)"
                stroke="#C59B27"
                strokeWidth="1.5"
                opacity="0.96"
              />
              {/* Vệt sáng hoàng kim bên trong chùm đuôi */}
              <path
                d="M 10 -2 
                   C 38 -16, 75 -28, 115 -35 
                   C 95 -18, 92 -4, 125 -2 
                   C 145 0, 168 -8, 185 -16 
                   C 160 8, 135 18, 108 16 
                   C 80 14, 52 18, 30 14 
                   C 18 8, 12 2, 10 -2 Z"
                fill="#FFF6CC"
                opacity="0.8"
              />
              {/* Tia đuôi tơ tiên khí bay bổng phía trên */}
              <path
                d="M 30 -12 C 65 -36, 110 -52, 150 -56 C 120 -38, 100 -26, 80 -18"
                fill="none"
                stroke="#F5D77F"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Tia đuôi tơ tiên khí bay bổng phía dưới */}
              <path
                d="M 25 10 C 60 32, 105 44, 145 42 C 115 28, 95 18, 75 12"
                fill="none"
                stroke="#F5D77F"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>

            {/* 7. ĐÔI RÂU RỒNG THOÁT TỤC BAY LƯỢN */}
            <g className="dragon-chase-whiskers">
              <path
                d={geo.whiskersPath}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeLinecap="round"
                filter="drop-shadow(0 0 4px rgba(245, 215, 127, 0.95))"
              />
            </g>
          </g>

          {/* =================================================================
              8. DẠ MINH CHÂU (LONG CHÂU THẦN KHÍ) - CHỦ ĐỘNG BAY LƯỢN DẪN ĐƯỜNG
              Viên ngọc tròn vẹn thuần khiết tỏa sáng, rồng lượn bám đuổi theo ngọc
              ================================================================= */}
          <g transform={geo.pearlTransform}>
            <g className="pearl-chase-lead">
              {/* Viên Dạ Minh Châu tròn trịa thuần khiết, tỏa sáng rực rỡ (không gắn thêm dị vật) */}
              <circle
                cx="0"
                cy="0"
                r="16"
                fill="url(#livingDragonPearlGrad)"
                filter="drop-shadow(0 0 18px rgba(255, 220, 90, 0.95)) drop-shadow(0 0 36px rgba(255, 160, 0, 0.8))"
              />
              {/* Ánh sáng lấp lánh ngọc trai tự nhiên trên bề mặt viên ngọc */}
              <circle cx="-5" cy="-5" r="5" fill="#FFFFFF" opacity="0.95" />
              <circle cx="-2" cy="-2" r="9" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.45" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
