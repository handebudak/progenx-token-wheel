'use client';

import { useState, useRef, useEffect } from 'react';
import { useCooldown } from '@/hooks/useCooldown';
import { getWeightedRandomSlice, getWheelAngle, getTokenForSlice, TOKEN_CATEGORIES } from '@/lib/random';
import { saveLastSpinTime } from '@/lib/cooldown';

interface SpinResult {
  tokens: number;
  category: string;
  color: string;
}

export default function TokenWheel() {
  const [mounted, setMounted] = useState(false);
  const { isActive, formattedTime, canSpin } = useCooldown();
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show anything during server-side rendering
  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-8 p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[rgb(0,122,142)] to-[rgb(0,74,90)] bg-clip-text text-transparent">
            ProgenX Token Çarkı
          </h1>
          <p className="text-gray-600 mt-2">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Spin the wheel
  const spinWheel = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setRotation(0); // Reset rotation to 0

    // Get weighted random slice
    const { sliceIndex, category } = getWeightedRandomSlice();
    const targetAngle = getWheelAngle(sliceIndex);

    // Wheel animation (4 seconds)
    const spinDuration = 4000;
    const startRotation = 0; // Always start from 0
    const targetRotation = 360 * 3 + targetAngle; // 3 full turns + target angle

    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      // Cubic-bezier easing with overshoot effect
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + (targetRotation - startRotation) * easeOut;
      
      setRotation(currentRotation);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation finished, wait 0.5 seconds then show result
        setTimeout(() => {
          // Get token amount for the final slice position
          const { tokens } = getTokenForSlice(sliceIndex);
          
          setIsSpinning(false);
          setResult({
            tokens,
            category: `${category.min}-${category.max}`,
            color: category.color
          });
          
          // Start cooldown
          saveLastSpinTime();
          
          // Scroll to result section (short wait for DOM update)
          setTimeout(() => {
            if (resultRef.current) {
              resultRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
              });
            }
          }, 100);
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  };

  // Create wheel slices
  const renderWheelSlices = () => {
    const slices: React.ReactElement[] = [];
    const labels: React.ReactElement[] = [];
    const sliceCounts = [20, 15, 10, 4, 1]; // %40, %30, %20, %8, %2
    let currentIndex = 0;

    TOKEN_CATEGORIES.forEach((category, categoryIndex) => {
      const count = sliceCounts[categoryIndex];
      
      for (let i = 0; i < count; i++) {
        const angle = (currentIndex * 7.2) - 90; // Start from top with -90°
        const sliceAngle = 7.2;
        
        slices.push(
          <path
            key={`slice-${currentIndex}`}
            d={`M 0 0 L ${Math.cos((angle * Math.PI) / 180) * 100} ${Math.sin((angle * Math.PI) / 180) * 100} A 100 100 0 0 1 ${Math.cos(((angle + sliceAngle) * Math.PI) / 180) * 100} ${Math.sin(((angle + sliceAngle) * Math.PI) / 180) * 100} Z`}
            fill={category.color}
            stroke="none"
          />
        );

        // Add token count label - in the middle slice of each category
        const middleIndex = Math.floor(count / 2);
        if (i === middleIndex) {
          const labelAngle = angle + (sliceAngle / 2);
          const labelRadius = 70;
          const labelX = Math.cos((labelAngle * Math.PI) / 180) * labelRadius;
          const labelY = Math.sin((labelAngle * Math.PI) / 180) * labelRadius;
          
          labels.push(
            <text
              key={`label-${categoryIndex}`}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-bold fill-white"
              style={{
                fontSize: '10px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.9)'
              }}
            >
              {category.min === category.max ? category.min : `${category.min}-${category.max}`}
            </text>
          );
        }
        
        currentIndex++;
      }
    });

    return { slices, labels };
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[rgb(0,122,142)] to-[rgb(0,74,90)] bg-clip-text text-transparent">
          ProgenX Token Çarkı
        </h1>
      </div>

      {/* Wheel */}
      <div className="relative">
        {/* Fixed Cursor - Top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-[rgb(91,91,91)] drop-shadow-md"></div>
          <div className="w-6 h-2 bg-[rgb(91,91,91)] rounded-full mx-auto mt-1 shadow-md"></div>
        </div>
        
        <div 
          ref={wheelRef}
          className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
            transition: isSpinning ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          <svg width="320" height="320" viewBox="-100 -100 200 200" className="w-full h-full">
            {/* Wheel slices */}
            {renderWheelSlices().slices}
            
            {/* Token numbers */}
            {renderWheelSlices().labels}
            
            {/* Center circle */}
            <circle cx="0" cy="0" r="20" fill="#ffffff" stroke="#e5e7eb" strokeWidth="3" />
            <circle cx="0" cy="0" r="12" fill="url(#centerGradient)" />
            <defs>
              <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(0,122,142)" />
                <stop offset="100%" stopColor="rgb(0,74,90)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Spin Button */}
      <div className="text-center">
        {canSpin ? (
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`px-6 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 text-base sm:text-lg lg:text-xl font-semibold text-white rounded-lg transition-all duration-200 min-h-[48px] sm:min-h-[56px] lg:min-h-[64px] min-w-[160px] sm:min-w-[200px] lg:min-w-[240px] ${
              isSpinning 
                ? 'cursor-not-allowed' 
                : 'hover:opacity-90 transform hover:scale-105 active:scale-95'
            }`}
            style={{ 
              backgroundColor: isSpinning ? '#9CA3AF' : 'rgb(91, 91, 91)'
            }}
          >
            {isSpinning ? 'Çark Dönüyor...' : 'Çarkı Çevir!'}
          </button>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            <div className="text-sm sm:text-base text-gray-600">Bir sonraki şansın için geri sayım başladı ⏳</div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-[rgb(0,122,142)] bg-gray-100 px-4 py-2 sm:px-6 sm:py-3 rounded-lg">
              {formattedTime}
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {result && (
        <div 
          ref={resultRef}
          className="p-4 sm:p-6 lg:p-8 rounded-xl text-center text-white font-bold text-lg sm:text-xl lg:text-2xl shadow-2xl border-4 border-white/20"
          style={{ 
            background: 'linear-gradient(to right, rgb(0, 122, 142), rgb(0, 74, 90))',
            animation: 'pulse 2s ease-in-out'
          }}
        >
          <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">🎉 Tebrikler! 🎉</div>
          <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 drop-shadow-lg">{result.tokens} Token</div>
        </div>
      )}

      {/* Info */}
      <div className="text-center text-xs sm:text-sm text-gray-500 max-w-md px-4">
        <p>Token çarkını 24 saatte bir çevirebilirsiniz.</p>
      </div>
    </div>
  );
}
