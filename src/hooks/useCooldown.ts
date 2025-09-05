import { useState, useEffect } from 'react';
import { useInterval } from './useInterval';
import { 
  isCooldownActive, 
  getRemainingCooldownTime, 
  formatRemainingTime 
} from '@/lib/cooldown';

export function useCooldown() {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState('');

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check cooldown status
  useEffect(() => {
    const checkCooldown = () => {
      const active = isCooldownActive();
      setIsActive(active);
      
      if (active) {
        const remaining = getRemainingCooldownTime();
        setRemainingTime(remaining);
        setFormattedTime(formatRemainingTime(remaining));
      } else {
        setRemainingTime(0);
        setFormattedTime('');
      }
    };

    // Initial check
    checkCooldown();

    // Update every second
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Countdown
  useInterval(() => {
    if (remainingTime > 0) {
      const newRemaining = Math.max(0, remainingTime - 1000);
      setRemainingTime(newRemaining);
      setFormattedTime(formatRemainingTime(newRemaining));
      
      if (newRemaining === 0) {
        setIsActive(false);
      }
    }
  }, remainingTime > 0 ? 1000 : null);

  return {
    isActive: mounted ? isActive : false,
    remainingTime: mounted ? remainingTime : 0,
    formattedTime: mounted ? formattedTime : '',
    canSpin: mounted ? !isActive : true
  };
}
