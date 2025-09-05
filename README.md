# ProgenX Token Çarkı 🎡

ProgenX platformu için geliştirilmiş token çarkı uygulaması. Öğrenciler 24 saatte bir çarkı çevirerek token kazanabilirler.

## ✨ Özellikler

- **50 Dilimli Çark**: Ağırlıklı rastgele token dağıtımı
- **Akıcı Animasyon**: 5.2 saniyelik gerçekçi dönüş efekti
- **24 Saat Cooldown**: Her çevirmeden sonra 24 saat bekleme
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **ProgenX Tema**: Platform tasarım diline uygun renkler ve stiller

## 🎯 Token Dağıtım Oranları

| Kategori | Token Aralığı | Şans | Dilim Sayısı |
|----------|---------------|------|---------------|
| 🟢 Yeşil | 1-3 | %40 | 20 dilim |
| 🔵 Mavi | 5-10 | %30 | 15 dilim |
| 🟠 Turuncu | 15-25 | %20 | 10 dilim |
| 🟣 Mor | 50 | %8 | 4 dilim |
| 🔴 Kırmızı | 100 | %2 | 1 dilim |

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd progenx-token-wheel
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
# veya
yarn install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
# veya
yarn dev
```

4. **Tarayıcıda açın:**
```
http://localhost:3000
```

## 🏗️ Proje Yapısı

```
src/
├── app/
│   ├── globals.css          # Tema değişkenleri ve global stiller
│   ├── layout.tsx           # Ana layout
│   └── page.tsx             # Ana sayfa
├── components/
│   └── TokenWheel.tsx       # Ana çark bileşeni
├── hooks/
│   ├── useCooldown.ts       # Cooldown yönetimi
│   └── useInterval.ts       # Interval hook'u
└── lib/
    ├── random.ts             # Ağırlıklı rastgele seçim
    └── cooldown.ts          # Cooldown yardımcıları
```

## 🎨 Tema Sistemi

ProgenX platformunun tasarım diline uygun CSS değişkenleri:

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

## 🔧 Teknik Detaylar

### Çark Animasyonu
- **Süre**: 5.2 saniye
- **Easing**: Cubic-bezier ile overshoot efekti
- **Dönüş**: 3 tam tur + hedef dilim açısı

### Cooldown Sistemi
- **Süre**: 24 saat (86,400,000 ms)
- **Depolama**: localStorage (mock Firebase)
- **Güncelleme**: Her saniye geri sayım

### Ağırlıklı Rastgele
- **Algoritma**: Ağırlıklı kümülatif dağılım
- **Dilim Eşleşmesi**: Kategori bazında rastgele dilim seçimi
- **Açı Hesaplama**: 360° / 50 dilim = 7.2° per dilim

## 📱 Responsive Tasarım

- **Mobil**: 320px+ (dikey düzen)
- **Tablet**: 768px+ (orta düzen)
- **Masaüstü**: 1024px+ (yatay düzen)
- **Geniş Ekran**: 1440px+ (büyük düzen)

## ♿ Erişilebilirlik

- **Klavye Navigasyonu**: Enter/Space ile çevirme
- **ARIA Labels**: Ekran okuyucu desteği
- **Focus States**: Görünür focus ring'ler
- **Live Regions**: Sonuç duyuruları

## 🧪 Test

### Cooldown Testi
```javascript
// Console'da cooldown'u sıfırla
localStorage.removeItem('progenx:lastSpinAt')
```

### Rastgele Test
```javascript
// Console'da token dağıtımını test et
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

## 📝 Lisans

Bu proje ProgenX platformu için geliştirilmiştir.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

ProgenX Academy - [app.progenxacademy.com](https://app.progenxacademy.com)

---

**Not**: Bu uygulama ProgenX platformunun tasarım diline uygun olarak geliştirilmiştir. Renkler, fontlar ve spacing değerleri platform ile uyumludur.
