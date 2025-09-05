const COOLDOWN_KEY = 'progenx:lastSpinAt';
const COOLDOWN_DURATION = 24 * 60 * 60 * 1000; // 24 hours (milliseconds)

// Test mode - only active in development (currently disabled)
const isTestMode = true // process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_TEST_MODE === 'true';
const TEST_COOLDOWN_DURATION = 10 * 1000; // 10 seconds (for testing)

// Get active cooldown duration
const getActiveCooldownDuration = () => {
  return isTestMode ? TEST_COOLDOWN_DURATION : COOLDOWN_DURATION;
};

// Save last spin time
export function saveLastSpinTime(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
  }
}

// Get last spin time
export function getLastSpinTime(): number | null {
  if (typeof window !== 'undefined') {
    const lastSpin = localStorage.getItem(COOLDOWN_KEY);
    return lastSpin ? parseInt(lastSpin, 10) : null;
  }
  return null;
}

// Check if cooldown is active
export function isCooldownActive(): boolean {
  const lastSpin = getLastSpinTime();
  if (!lastSpin) return false;
  
  const timeSinceLastSpin = Date.now() - lastSpin;
  return timeSinceLastSpin < getActiveCooldownDuration();
}

// Calculate remaining cooldown time (milliseconds)
export function getRemainingCooldownTime(): number {
  const lastSpin = getLastSpinTime();
  if (!lastSpin) return 0;
  
  const timeSinceLastSpin = Date.now() - lastSpin;
  const remaining = getActiveCooldownDuration() - timeSinceLastSpin;
  
  return Math.max(0, remaining);
}

// Format remaining time (hours:minutes:seconds)
export function formatRemainingTime(remainingMs: number): string {
  const totalSeconds = Math.ceil(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

