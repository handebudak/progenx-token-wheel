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

// Weighted random selection - returns the slice index and category
export function getWeightedRandomSlice(): { sliceIndex: number; category: TokenCategory } {
  const totalWeight = TOKEN_CATEGORIES.reduce((sum, cat) => sum + cat.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let categoryIndex = 0; categoryIndex < TOKEN_CATEGORIES.length; categoryIndex++) {
    const category = TOKEN_CATEGORIES[categoryIndex];
    random -= category.weight;
    
    if (random <= 0) {
      // Calculate slice index for this category
      const sliceCounts = [20, 15, 10, 4, 1]; // %40, %30, %20, %8, %2
      const startIndex = sliceCounts.slice(0, categoryIndex).reduce((sum, count) => sum + count, 0);
      const randomSlice = Math.floor(Math.random() * sliceCounts[categoryIndex]);
      const sliceIndex = startIndex + randomSlice;
      
      return { sliceIndex, category };
    }
  }
  
  // Fallback - first category
  const category = TOKEN_CATEGORIES[0];
  const sliceCounts = [20, 15, 10, 4, 1];
  const randomSlice = Math.floor(Math.random() * sliceCounts[0]);
  return { sliceIndex: randomSlice, category };
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
  // The wheel slices are rendered starting from -90° (top)
  // Each slice is 7.2° wide, so we need to center it by adding half a slice (3.6°)
  // The cursor is at the top (-90°), so we need to rotate the wheel to align the slice center with the cursor
  const sliceStartAngle = (sliceIndex * 7.2) - 90; // Match the render logic
  const sliceCenterAngle = sliceStartAngle + 3.6; // Center of the slice
  
  // To align the slice center with the cursor at -90°, we need to rotate by:
  // The difference between the slice center and the cursor position
  const rotationAngle = -90 - sliceCenterAngle;
  
  return rotationAngle;
}

// Get token amount for a specific slice index
export function getTokenForSlice(sliceIndex: number): { tokens: number; category: TokenCategory } {
  const sliceCounts = [20, 15, 10, 4, 1]; // %40, %30, %20, %8, %2
  let currentIndex = 0;
  
  for (let categoryIndex = 0; categoryIndex < TOKEN_CATEGORIES.length; categoryIndex++) {
    const category = TOKEN_CATEGORIES[categoryIndex];
    const count = sliceCounts[categoryIndex];
    
    if (sliceIndex >= currentIndex && sliceIndex < currentIndex + count) {
      // Generate random token within this category's range
      const tokens = Math.floor(Math.random() * (category.max - category.min + 1)) + category.min;
      return { tokens, category };
    }
    
    currentIndex += count;
  }
  
  // Fallback - first category
  const category = TOKEN_CATEGORIES[0];
  const tokens = Math.floor(Math.random() * (category.max - category.min + 1)) + category.min;
  return { tokens, category };
}
