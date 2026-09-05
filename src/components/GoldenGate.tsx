/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ============================================================================
 * CỔNG VÀNG LONG UYỂN (WROUGHT IRON GOLDEN GATE)
 * ============================================================================
 * Thiết kế cánh cổng đôi song sắt màu Vàng Kim hoàng gia (Pastel Gold/Metallic Gold).
 * Cổng có các khe hở thông thoáng để nhìn rõ mây núi và Bạch Long phía sau.
 * Hoa văn uốn lượn kết hợp giữa dây leo hoa lá và vảy/đuôi Rồng uốn lượn (Tường Vân).
 * Hiệu ứng tương tác 3D mở toang sang 2 bên (rotateY -90deg / 90deg, perspective 1000px).
 */

import React from 'react';
import { motion } from 'motion/react';
import { KeyRound, Facebook, Music } from 'lucide-react';
import { ToastMessage } from '../types';

interface GoldenGateProps {
  /** Trạng thái cổng đang mở hay đóng */
  isOpen: boolean;
  /** Hàm kích hoạt mở cổng */
  onOpenGate: () => void;
  /** Đang trong tiến trình chuyển cảnh vào Inner App */
  isEntering: boolean;
  /** Hàm hiển thị thông báo toast (tùy chọn) */
  onToast?: (text: string, type?: ToastMessage['type']) => void;
}

export default function GoldenGate({ isOpen, onOpenGate, isEntering, onToast }: GoldenGateProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden select-none">
      
      {/* 
        CONTAINER 3D PERSPECTIVE CHO CÁNH CỔNG
        Perspective 1000px tạo chiều sâu 3D chân thực khi cánh cổng xoay sang 2 bên
      */}
      <div 
        className="relative w-full max-w-5xl h-[88vh] md:h-[92vh] mx-auto flex items-center justify-center"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center center',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ===================================================================
            SVG DEFINITIONS: GRADIENT VÀNG KIM & BỘ LỌC CHIỀU SÂU KIM LOẠI
            =================================================================== */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            {/* Gradient Vàng Kim sáng bóng Hoàng Gia (#D4AF37 -> #F4D06F) */}
            <linearGradient id="gateGoldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8E7" />
              <stop offset="20%" stopColor="#F4D06F" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#FFF5C0" />
              <stop offset="85%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#8A6618" />
            </linearGradient>

            {/* Gradient Vàng Kim viền sâu (Dark Gold for 3D Bevel) */}
            <linearGradient id="gateGoldBorder" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF8E7" />
              <stop offset="35%" stopColor="#F4D06F" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#6A4E0E" />
            </linearGradient>

            {/* Gradient Vàng Kim góc nghiêng cho song sắt */}
            <linearGradient id="gateBarGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#AA8015" />
              <stop offset="25%" stopColor="#FFF5C0" />
              <stop offset="50%" stopColor="#F4D06F" />
              <stop offset="80%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#7A5813" />
            </linearGradient>

            {/* Gradient Biển hiệu viền vàng */}
            <linearGradient id="plaqueGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8E7" />
              <stop offset="50%" stopColor="#F4D06F" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>

            {/* Bộ lọc đổ bóng cho khung sắt trên nền trời đêm Navy */}
            <filter id="gateShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="2" dy="5" stdDeviation="5" floodColor="#0A1128" floodOpacity="0.75" />
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#F4D06F" floodOpacity="0.38" />
            </filter>
          </defs>
        </svg>

        {/* ===================================================================
            KHUNG CỔNG CỐ ĐỊNH PHÍA NGOÀI (OUTER POSTS & ARCH FRAME)
            Hai cột trụ hai bên đóng vai trò bản lề gắn cánh cổng
            =================================================================== */}
        <div className="absolute inset-0 pointer-events-none flex justify-between z-10">
          {/* Cột trụ trái */}
          <div className="w-8 sm:w-12 h-full flex flex-col items-center justify-between py-4 opacity-90">
            {/* Đỉnh cột trụ trái: Đầu ngọc vương giả */}
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#B38728] via-[#FFF4D4] to-[#DFB76C] shadow-[0_0_12px_rgba(245,215,127,0.6)] border border-white/60" />
            {/* Thân trụ sắt mạ vàng */}
            <div className="w-3 sm:w-4 flex-1 my-2 rounded-full bg-gradient-to-r from-[#967117] via-[#FFF4D4] to-[#C5A059] shadow-md border-x border-[#7A5813]/40" />
            {/* Chân đế trụ */}
            <div className="w-8 sm:w-12 h-6 rounded-t-lg bg-gradient-to-t from-[#7A5813] via-[#DFB76C] to-[#FFF4D4] shadow-lg border border-[#B38728]" />
          </div>

          {/* Vòm cổng cong trên đỉnh nối hai trụ (Arch Transom) */}
          <div className="absolute top-2 sm:top-4 left-6 right-6 h-20 sm:h-28 pointer-events-none flex justify-center">
            <svg viewBox="0 0 1000 120" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M 20,110 Q 500,-20 980,110"
                fill="none"
                stroke="url(#gateGoldMetallic)"
                strokeWidth="7"
                filter="url(#gateShadow)"
              />
              <path
                d="M 30,120 Q 500,0 970,120"
                fill="none"
                stroke="url(#gateGoldBorder)"
                strokeWidth="3"
              />
              {/* Hoa văn đỉnh vòm: Họa tiết Tường Vân & Đuôi Rồng */}
              <path
                d="M 450,45 C 470,25 485,15 500,10 C 515,15 530,25 550,45 C 530,40 515,45 500,60 C 485,45 470,40 450,45 Z"
                fill="url(#gateGoldMetallic)"
                filter="url(#gateShadow)"
              />
              <circle cx="500" cy="8" r="6" fill="#FFF4D4" stroke="#B38728" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Cột trụ phải */}
          <div className="w-8 sm:w-12 h-full flex flex-col items-center justify-between py-4 opacity-90">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#B38728] via-[#FFF4D4] to-[#DFB76C] shadow-[0_0_12px_rgba(245,215,127,0.6)] border border-white/60" />
            <div className="w-3 sm:w-4 flex-1 my-2 rounded-full bg-gradient-to-r from-[#967117] via-[#FFF4D4] to-[#C5A059] shadow-md border-x border-[#7A5813]/40" />
            <div className="w-8 sm:w-12 h-6 rounded-t-lg bg-gradient-to-t from-[#7A5813] via-[#DFB76C] to-[#FFF4D4] shadow-lg border border-[#B38728]" />
          </div>
        </div>

        {/* ===================================================================
            CÁNH CỔNG ĐÔI 3D (LEFT GATE & RIGHT GATE)
            =================================================================== */}
        <div className="relative w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] h-full flex items-center justify-center">
          
          {/* -----------------------------------------------------------------
              1. CÁNH CỔNG TRÁI (LEFT GATE LEAF)
              Xoay rotateY(-90deg / -105deg) quanh mép trái khi mở
              ----------------------------------------------------------------- */}
          <div
            className="w-1/2 h-[90%] sm:h-[94%] flex items-center justify-end relative"
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              transition: 'transform 1.6s cubic-bezier(0.25, 1, 0.5, 1), filter 1.6s ease',
              transform: isOpen ? 'rotateY(-100deg)' : 'rotateY(0deg)',
              filter: isOpen ? 'brightness(1.15) drop-shadow(-8px 12px 24px rgba(0,0,0,0.3))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.18))',
            }}
          >
            <svg
              viewBox="0 0 500 800"
              className="w-full h-full"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              {/* Khung viền cánh cổng trái (Outer Frame) */}
              <path
                d="M 10,800 L 10,130 Q 250,50 495,100 L 495,800 Z"
                fill="none"
                stroke="url(#gateGoldMetallic)"
                strokeWidth="10"
                strokeLinejoin="round"
                filter="url(#gateShadow)"
              />
              <path
                d="M 22,788 L 22,142 Q 250,66 483,112 L 483,788 Z"
                fill="none"
                stroke="url(#gateGoldBorder)"
                strokeWidth="4"
              />

              {/* Thanh chặn đáy cổng (Bottom Kick Rail) */}
              <rect x="10" y="700" width="485" height="12" fill="url(#gateGoldMetallic)" filter="url(#gateShadow)" />
              <rect x="10" y="770" width="485" height="18" fill="url(#gateGoldMetallic)" filter="url(#gateShadow)" />

              {/* Thanh ngang giữa (Middle Rail) */}
              <rect x="10" y="440" width="485" height="14" fill="url(#gateGoldMetallic)" filter="url(#gateShadow)" />

              {/* CÁC THANH SONG SẮT DỌC (VERTICAL WROUGHT IRON BARS) - Có khoảng cách để nhìn thấu mây & rồng */}
              {Array.from({ length: 9 }).map((_, i) => {
                const x = 55 + i * 48;
                // Tính độ cao vòm trên theo đường cong
                const t = x / 500;
                const topY = 130 - Math.sin(t * Math.PI) * 70 + (t * 20);
                return (
                  <g key={`lbar-${i}`}>
                    {/* Thân song sắt */}
                    <rect
                      x={x - 3}
                      y={topY}
                      width="6"
                      height={700 - topY}
                      fill="url(#gateBarGold)"
                      filter="url(#gateShadow)"
                    />
                    
                    {/* Đầu ngọn giáo / móng rồng nhọn trên đỉnh mỗi song sắt (Spearhead Finials) */}
                    <path
                      d={`M ${x},${topY - 26} L ${x + 8},${topY - 10} L ${x + 3},${topY} L ${x - 3},${topY} L ${x - 8},${topY - 10} Z`}
                      fill="url(#gateGoldMetallic)"
                      stroke="#7A5813"
                      strokeWidth="1"
                    />
                    <circle cx={x} cy={topY - 8} r="2.5" fill="#FFF4D4" />

                    {/* Họa tiết vảy rồng / khuyên tròn trang trí giữa thanh */}
                    <circle cx={x} cy={447} r="7" fill="none" stroke="url(#gateGoldMetallic)" strokeWidth="2.5" />
                    <circle cx={x} cy={447} r="2.5" fill="#FFF4D4" />
                  </g>
                );
              })}

              {/* HOA VĂN DÂY LEO & MÂY UỐN LƯỢN (DRAGON SCROLLWORK & VINES) */}
              {/* Phần vòm trên: Họa tiết Tường Vân lượn sóng */}
              <path
                d="M 30,170 Q 130,110 220,160 T 380,140 Q 450,110 490,130"
                fill="none"
                stroke="url(#gateGoldMetallic)"
                strokeWidth="5"
                filter="url(#gateShadow)"
              />
              <path
                d="M 30,220 C 120,160 170,250 260,200 C 350,150 420,220 490,190"
                fill="none"
                stroke="url(#gateGoldBorder)"
                strokeWidth="3.5"
              />

              {/* Dây xoắn ốc hoa lá đuôi rồng đối xứng bên góc trên */}
              <path
                d="M 50,160 C 90,140 100,200 60,210 C 30,220 20,180 50,160"
                fill="none"
                stroke="url(#gateGoldMetallic)"
                strokeWidth="3"
              />
              <path
                d="M 460,130 C 420,150 410,210 450,220 C 480,230 490,190 460,130"
                fill="none"
                stroke="url(#gateGoldMetallic)"
                strokeWidth="3"
              />

              {/* NỬA HUY HIỆU RỒNG TRUNG TÂM (CENTRAL MEDALLION - NỬA TRÁI) */}
              <g transform="translate(495, 447)">
                {/* Vòng ngoài bán nguyệt */}
                <path
                  d="M 0,-85 A 85 85 0 0 0 0,85 Z"
                  fill="none"
                  stroke="url(#gateGoldMetallic)"
                  strokeWidth="8"
                  filter="url(#gateShadow)"
                />
                <path
                  d="M 0,-70 A 70 70 0 0 0 0,70 Z"
                  fill="none"
                  stroke="url(#gateGoldBorder)"
                  strokeWidth="3"
                />
                {/* Họa tiết mây rồng lượn nửa trái */}
                <path
                  d="M 0,-50 C -40,-30 -50,0 -25,25 C -5,45 0,30 0,50"
                  fill="none"
                  stroke="url(#gateGoldMetallic)"
                  strokeWidth="4"
                />
                {/* Tay nắm cổng rồng (Dragon Knocker Ring nửa trái) */}
                <circle cx="-12" cy="0" r="18" fill="none" stroke="url(#gateGoldMetallic)" strokeWidth="4" filter="url(#gateShadow)" />
                <rect x="-6" y="-8" width="6" height="16" fill="#FFF4D4" rx="2" />
              </g>

              {/* Hoa văn chân cổng (Bottom Filigree) */}
              <path
                d="M 40,680 C 140,640 180,680 250,650 C 320,620 400,670 470,640"
                fill="none"
                stroke="url(#gateGoldBorder)"
                strokeWidth="4"
              />
              {/* Vảy rồng nhỏ xếp tầng ở chân cổng */}
              {Array.from({ length: 8 }).map((_, idx) => (
                <path
                  key={`lscale-${idx}`}
                  d={`M ${40 + idx * 55},750 Q ${67 + idx * 55},715 ${95 + idx * 55},750`}
                  fill="none"
                  stroke="url(#gateGoldMetallic)"
                  strokeWidth="3"
                />
              ))}
            </svg>
          </div>

          {/* -----------------------------------------------------------------
              2. CÁNH CỔNG PHẢI (RIGHT GATE LEAF)
              Xoay rotateY(90deg / 105deg) quanh mép phải khi mở
              ----------------------------------------------------------------- */}
          <div
            className="w-1/2 h-[90%] sm:h-[94%] flex items-center justify-start relative"
            style={{
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
              transition: 'transform 1.6s cubic-bezier(0.25, 1, 0.5, 1), filter 1.6s ease',
              transform: isOpen ? 'rotateY(100deg)' : 'rotateY(0deg)',
              filter: isOpen ? 'brightness(1.15) drop-shadow(8px 12px 24px rgba(0,0,0,0.3))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.18))',
            }}
          >
            <svg
              viewBox="0 0 500 800"
              className="w-full h-full"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              {/* Khung viền cánh cổng phải (Outer Frame) - Đối xứng hoàn hảo */}
              <path
                d="M 490,800 L 490,130 Q 250,50 5,100 L 5,800 Z"
                fill="none"
                stroke="url(#gateGoldMetallic)"
                strokeWidth="10"
                strokeLinejoin="round"
                filter="url(#gateShadow)"
              />
              <path
                d="M 478,788 L 478,142 Q 250,66 17,112 L 17,788 Z"
                fill="none"
                stroke="url(#gateGoldBorder)"
                strokeWidth="4"
              />

              {/* Thanh chặn đáy cổng (Bottom Kick Rail) */}
              <rect x="5" y="700" width="485" height="12" fill="url(#gateGoldMetallic)" filter="url(#gateShadow)" />
              <rect x="5" y="770" width="485" height="18" fill="url(#gateGoldMetallic)" filter="url(#gateShadow)" />

              {/* Thanh ngang giữa (Middle Rail) */}
              <rect x="5" y="440" width="485" height="14" fill="url(#gateGoldMetallic)" filter="url(#gateShadow)" />

              {/* CÁC THANH SONG SẮT DỌC CỦA CÁNH PHẢI */}
              {Array.from({ length: 9 }).map((_, i) => {
                const x = 500 - (55 + i * 48);
                const t = (500 - x) / 500;
                const topY = 130 - Math.sin(t * Math.PI) * 70 + (t * 20);
                return (
                  <g key={`rbar-${i}`}>
                    <rect
                      x={x - 3}
                      y={topY}
                      width="6"
                      height={700 - topY}
                      fill="url(#gateBarGold)"
                      filter="url(#gateShadow)"
                    />
                    <path
                      d={`M ${x},${topY - 26} L ${x + 8},${topY - 10} L ${x + 3},${topY} L ${x - 3},${topY} L ${x - 8},${topY - 10} Z`}
                      fill="url(#gateGoldMetallic)"
                      stroke="#7A5813"
                      strokeWidth="1"
                    />
                    <circle cx={x} cy={topY - 8} r="2.5" fill="#FFF4D4" />
                    <circle cx={x} cy={447} r="7" fill="none" stroke="url(#gateGoldMetallic)" strokeWidth="2.5" />
                    <circle cx={x} cy={447} r="2.5" fill="#FFF4D4" />
                  </g>
                );
              })}

              {/* HOA VĂN DÂY LEO & MÂY VÒM TRÊN (RIGHT) */}
              <path
                d="M 470,170 Q 370,110 280,160 T 120,140 Q 50,110 10,130"
                fill="none"
                stroke="url(#gateGoldMetallic)"
                strokeWidth="5"
                filter="url(#gateShadow)"
              />
              <path
                d="M 470,220 C 380,160 330,250 240,200 C 150,150 80,220 10,190"
                fill="none"
                stroke="url(#gateGoldBorder)"
                strokeWidth="3.5"
              />

              <path
                d="M 450,160 C 410,140 400,200 440,210 C 470,220 480,180 450,160"
                fill="none"
                stroke="url(#gateGoldMetallic)"
                strokeWidth="3"
              />
              <path
                d="M 40,130 C 80,150 90,210 50,220 C 20,230 10,190 40,130"
                fill="none"
                stroke="url(#gateGoldMetallic)"
                strokeWidth="3"
              />

              {/* NỬA HUY HIỆU RỒNG TRUNG TÂM (CENTRAL MEDALLION - NỬA PHẢI) */}
              <g transform="translate(5, 447)">
                <path
                  d="M 0,-85 A 85 85 0 0 1 0,85 Z"
                  fill="none"
                  stroke="url(#gateGoldMetallic)"
                  strokeWidth="8"
                  filter="url(#gateShadow)"
                />
                <path
                  d="M 0,-70 A 70 70 0 0 1 0,70 Z"
                  fill="none"
                  stroke="url(#gateGoldBorder)"
                  strokeWidth="3"
                />
                <path
                  d="M 0,-50 C 40,-30 50,0 25,25 C 5,45 0,30 0,50"
                  fill="none"
                  stroke="url(#gateGoldMetallic)"
                  strokeWidth="4"
                />
                {/* Tay nắm cổng rồng (Dragon Knocker Ring nửa phải) */}
                <circle cx="12" cy="0" r="18" fill="none" stroke="url(#gateGoldMetallic)" strokeWidth="4" filter="url(#gateShadow)" />
                <rect x="0" y="-8" width="6" height="16" fill="#FFF4D4" rx="2" />
              </g>

              {/* Hoa văn chân cổng (Bottom Filigree) */}
              <path
                d="M 460,680 C 360,640 320,680 250,650 C 180,620 100,670 30,640"
                fill="none"
                stroke="url(#gateGoldBorder)"
                strokeWidth="4"
              />
              {Array.from({ length: 8 }).map((_, idx) => (
                <path
                  key={`rscale-${idx}`}
                  d={`M ${460 - idx * 55},750 Q ${433 - idx * 55},715 ${405 - idx * 55},750`}
                  fill="none"
                  stroke="url(#gateGoldMetallic)"
                  strokeWidth="3"
                />
              ))}
            </svg>
          </div>

        </div>

        {/* ===================================================================
            3. KHU VỰC BIỂN HIỆU DARK GLASSMORPHISM & NÚT BẤM (TRUNG TÂM CỔNG)
            Treo giữa cổng: Kính mờ tối (Dark Glass) viền vàng kim hoàng gia.
            Khi bấm Mở Cổng -> fade out và thu nhỏ nhẹ nhàng (0.4s)
            =================================================================== */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center z-40 px-4 transition-all duration-500 ${
            isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
          }`}
        >
          {/* TẤM BIỂN KÍNH MỜ (GLASS CARD CENTER) */}
          <div className="relative max-w-md w-full p-6 sm:p-8 rounded-[28px] glass-card-center flex flex-col items-center text-center">
            
            {/* Dây xích hòa sắc xanh lá - hồng treo biển hiệu (Muted thanh nhã, nhạt dịu) */}
            <div className="absolute -top-12 left-12 w-1.5 h-12 bg-gradient-to-b from-[#689E86] via-[#FAF6F8] to-[#BA7192] rounded-full shadow-sm" />
            <div className="absolute -top-12 right-12 w-1.5 h-12 bg-gradient-to-b from-[#689E86] via-[#FAF6F8] to-[#BA7192] rounded-full shadow-sm" />
            
            {/* Họa tiết hoa văn góc kim loại phối xanh ngọc & hồng đào thanh tao */}
            <div className="absolute top-2.5 left-2.5 text-[#578E76] text-xs opacity-75">✦</div>
            <div className="absolute top-2.5 right-2.5 text-[#B2678A] text-xs opacity-75">✦</div>
            <div className="absolute bottom-2.5 left-2.5 text-[#578E76] text-xs opacity-75">✦</div>
            <div className="absolute bottom-2.5 right-2.5 text-[#B2678A] text-xs opacity-75">✦</div>

            {/* AVATAR LONG UYỂN VỚI VIỀN XANH LÁ & HỒNG HÀI HÒA */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.2,
                ease: 'easeInOut'
              }}
              className="w-20 h-20 sm:w-24 sm:h-24 p-1 rounded-[22px] bg-gradient-to-tr from-[#578E76] via-[#FAF6F8] to-[#B2678A] shadow-[0_4px_16px_rgba(76,133,109,0.18),0_0_15px_rgba(170,102,132,0.16)] mb-4 cursor-pointer select-none group"
              onClick={onOpenGate}
              title="Mở Cổng Long Uyển"
            >
              <div className="w-full h-full rounded-[18px] overflow-hidden bg-white/70">
                <img
                  src="https://i.ibb.co/93qnWNTK/avt.png"
                  alt="Kamishiro Shinju"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            {/* TIÊU ĐỀ CHÍNH: LONG UYỂN CỦA SHIN (TĂNG CỠ CHỮ LỚN HƠN NỮA CHO ĐIỆN THOẠI, GIỮ NGUYÊN BẢN CŨ TRÊN MÀN HÌNH LỚN) */}
            <h1 className="gacha-title font-serif text-[2.65rem] xs:text-[2.9rem] sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6 leading-tight flex flex-col items-center select-none">
              <span className="title-longuyen">Long Uyển</span>
              <span className="title-cuashin mt-0.5 sm:mt-1">Của Shin</span>
            </h1>

            {/* NÚT BẤM: 🔑 MỞ CỔNG LONG UYỂN (PHỐI SẮC MUTED THANH NHÃ, DỊU NHẸ VỪA VẶN, 1 DÒNG TRÊN MỌI THIẾT BỊ) */}
            <motion.button
              id="open-gate-cta"
              disabled={isOpen || isEntering}
              onClick={onOpenGate}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-6 sm:px-10 py-3 sm:py-3.5 rounded-full font-serif font-extrabold bg-gradient-to-r from-[#CBE5DA] via-[#FCF8FA] to-[#E9D3DE] hover:from-[#BBD9CC] hover:via-[#F9F1F5] hover:to-[#DFC1D0] shadow-[0_5px_18px_rgba(56,107,86,0.16),0_0_15px_rgba(138,70,102,0.14)] hover:shadow-[0_7px_22px_rgba(56,107,86,0.22),0_0_18px_rgba(138,70,102,0.18)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 sm:gap-2.5 group border-2 border-white/90 whitespace-nowrap"
            >
              <KeyRound className="w-4 h-4 sm:w-5 sm:h-5 text-[#386B56] group-hover:rotate-45 group-hover:text-[#8F486B] transition-all duration-300 shrink-0" />
              <div className="flex flex-row items-center justify-center leading-normal tracking-wider sm:tracking-widest uppercase font-serif font-black text-xs sm:text-base whitespace-nowrap">
                <span className="text-[#386B56] drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">Mở Cổng</span>
                <span className="ml-1 sm:ml-1.5 text-[#8F486B] drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">Long Uyển</span>
              </div>
            </motion.button>

            {/* NÚT FACEBOOK VÀ TIKTOK DƯỚI CHỖ MỞ CỔNG */}
            <div className="mt-4 flex items-center justify-center gap-2.5 sm:gap-3 text-xs tracking-wide">
              <a
                href="https://facebook.com/kamishiro.shin"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/55 hover:bg-white/85 border border-white/80 text-[#386B56] hover:text-[#234A38] shadow-[0_2px_8px_rgba(56,107,86,0.1)] transition-all duration-200 cursor-pointer group pointer-events-auto"
                title="Facebook Kamishiro Shinju"
              >
                <Facebook size={13} className="text-[#4C856D] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-xs tracking-wider">Facebook</span>
              </a>

              <span className="text-[#A45C7C]/40 text-xs select-none">•</span>

              <button
                type="button"
                onClick={() => onToast?.('Kênh TikTok của Shin đang được ươm mầm, sớm ra mắt nha! 🐉', 'info')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/55 hover:bg-white/85 border border-white/80 text-[#8F486B] hover:text-[#6D2E4D] shadow-[0_2px_8px_rgba(143,72,107,0.1)] transition-all duration-200 cursor-pointer group pointer-events-auto"
                title="TikTok Kamishiro Shinju"
              >
                <Music size={13} className="text-[#A45C7C] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-xs tracking-wider">TikTok</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
