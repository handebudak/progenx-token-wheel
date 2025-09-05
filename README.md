# ProgenX Token Wheel 🎡

Token wheel application developed for the ProgenX platform. Students can spin the wheel every 24 hours to earn tokens.

## ✨ Features

- **50-Slice Wheel**: Weighted random token distribution
- **Smooth Animation**: 4-second realistic spin effect
- **24-Hour Cooldown**: 24-hour wait time after each spin
- **Responsive Design**: Mobile and desktop compatible
- **ProgenX Theme**: Colors and styles matching the platform design language

## 🎯 Token Distribution Rates

| Category | Token Range | Chance | Slice Count |
|----------|-------------|--------|-------------|
| 🟢 Green | 1-3 | 40% | 20 slices |
| 🔵 Blue | 5-10 | 30% | 15 slices |
| 🟠 Orange | 15-25 | 20% | 10 slices |
| 🟣 Purple | 50 | 8% | 4 slices |
| 🔴 Red | 100 | 2% | 1 slice |

## 🚀 Installation

### Requirements
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the project:**
```bash
git clone https://github.com/handebudak/progenx-token-wheel.git
cd progenx-token-wheel
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser:**
```
http://localhost:3000
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Theme variables and global styles
│   ├── layout.tsx           # Main layout
│   └── page.tsx             # Home page
├── components/
│   └── TokenWheel.tsx       # Main wheel component
├── hooks/
│   ├── useCooldown.ts       # Cooldown management
│   └── useInterval.ts       # Interval hook
└── lib/
    ├── random.ts             # Weighted random selection
    └── cooldown.ts          # Cooldown utilities
```

## 🎨 Theme System

CSS variables matching ProgenX platform's design language:

```css
:root {
  --color-primary: rgb(0, 122, 142);
  --color-primary-dark: rgb(0, 74, 90);
  --color-primary-gradient: linear-gradient(to right, rgb(0, 122, 142), rgb(0, 74, 90));
  --color-header-bg: #e5e7eb;
  --color-background: #ffffff;
  --color-card-bg: #f8f8f8;
}
```

## 🔧 Technical Details

### Wheel Animation
- **Duration**: 4 seconds
- **Easing**: Cubic-bezier with overshoot effect
- **Rotation**: 3 full turns + target slice angle

### Cooldown System
- **Duration**: 24 hours (86,400,000 ms)
- **Storage**: localStorage (mock Firebase)
- **Update**: Countdown every second

### Weighted Random
- **Algorithm**: Weighted cumulative distribution
- **Slice Matching**: Random slice selection per category
- **Angle Calculation**: 360° / 50 slices = 7.2° per slice

## 📱 Responsive Design

- **Mobile**: 320px+ (vertical layout)
- **Tablet**: 768px+ (medium layout)
- **Desktop**: 1024px+ (horizontal layout)
- **Wide Screen**: 1440px+ (large layout)

## ♿ Accessibility

- **Keyboard Navigation**: Spin with Enter/Space
- **ARIA Labels**: Screen reader support
- **Focus States**: Visible focus rings
- **Live Regions**: Result announcements

## 🧪 Testing

### Cooldown Test
```javascript
// Reset cooldown in console
localStorage.removeItem('progenx:lastSpinAt')
```

### Random Test
```javascript
// Test token distribution in console
import { getWeightedRandomToken } from '@/lib/random'
getWeightedRandomToken()
```

## 🚀 Production

```bash
# Build
npm run build

# Start
npm run start

# Lint
npm run lint
```

## 🧪 Test Mode

For development and testing purposes, you can enable test mode by setting `isTestMode = true` in `src/lib/cooldown.ts`. This will reduce the cooldown period from 24 hours to 10 seconds, making it easier to test the wheel functionality.

```typescript
// In src/lib/cooldown.ts
const isTestMode = true; // Enable test mode
```

**Note**: This application is developed to match ProgenX platform's design language. Colors, fonts, and spacing values are consistent with the platform.