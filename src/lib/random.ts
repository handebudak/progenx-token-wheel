// Token categories and weights
export interface TokenCategory {
  min: number;
  max: number;
  weight: number;
  color: string;
}

export const TOKEN_CATEGORIES: TokenCategory[] = [
  { min: 1, max: 3, weight: 40, color: 'rgb(0, 122, 142)' },      // %40 - ProgenX teal
  { min: 5, max: 10, weight: 30, color: '#EC4899' },     // %30 - Pink
  { min: 15, max: 25, weight: 20, color: '#8B5CF6' },    // %20 - Purple
  { min: 50, max: 50, weight: 8, color: '#F59E0B' },     // %8 - Orange
  { min: 100, max: 100, weight: 2, color: '#EF4444' }    // %2 - Red (rarest)
];

// Weighted random selection
export function getWeightedRandomToken(): { tokens: number; category: TokenCategory } {
  const totalWeight = TOKEN_CATEGORIES.reduce((sum, cat) => sum + cat.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const category of TOKEN_CATEGORIES) {
    random -= category.weight;
    if (random <= 0) {
      const tokens = Math.floor(Math.random() * (category.max - category.min + 1)) + category.min;
      return { tokens, category };
    }
  }
  
  // Fallback - first category
  const category = TOKEN_CATEGORIES[0];
  const tokens = Math.floor(Math.random() * (category.max - category.min + 1)) + category.min;
  return { tokens, category };
}

// Calculate wheel slice (50 slices)
export function getWheelSliceIndex(category: TokenCategory): number {
  const categoryIndex = TOKEN_CATEGORIES.findIndex(cat => cat === category);
  if (categoryIndex === -1) return 0;
  
  // Number of slices for each category
  const sliceCounts = [20, 15, 10, 4, 1]; // %40, %30, %20, %8, %2
  const startIndex = sliceCounts.slice(0, categoryIndex).reduce((sum, count) => sum + count, 0);
  
  // Randomly select slice within category
  const randomSlice = Math.floor(Math.random() * sliceCounts[categoryIndex]);
  return startIndex + randomSlice;
}

// Calculate wheel angle (360° / 50 slices = 7.2° per slice)
export function getWheelAngle(sliceIndex: number): number {
  return sliceIndex * 7.2; // 360° / 50 = 7.2°
}
