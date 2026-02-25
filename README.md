# SEO Meta Checker 🔍

Web sayfalarının SEO meta etiketlerini analiz eden hafif Node.js CLI aracı.

## Özellikler

- Title, description, keywords meta etiketlerini kontrol eder
- Open Graph (og:) etiketlerini analiz eder
- Twitter Card etiketlerini kontrol eder
- Canonical URL doğrulaması yapar
- H1-H6 başlık hiyerarşisini kontrol eder
- robots.txt ve sitemap.xml varlığını doğrular
- JSON çıktı formatı desteği

## Kurulum

```bash
npm install -g seo-meta-checker
# veya
npx seo-meta-checker https://example.com
```

## Kullanım

```bash
# Tek sayfa analiz
seo-meta-checker https://example.com

# JSON çıktı
seo-meta-checker https://example.com --json

# Birden fazla URL
seo-meta-checker urls.txt
```

## Örnek Çıktı

```
URL: https://example.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Title: "Example Domain" (14 karakter)
⚠️  Description: Eksik
✅ Canonical: https://example.com
✅ OG:Title: "Example Domain"
❌ OG:Image: Eksik
✅ H1: 1 adet (ideal)
⚠️  H2: 0 adet
✅ robots.txt: Mevcut
✅ sitemap.xml: Mevcut

Skor: 7/10
```

## API Kullanımı

```javascript
const { analyzePage } = require('seo-meta-checker');

const result = await analyzePage('https://example.com');
console.log(result.score); // 7
console.log(result.issues); // [{type: 'warning', message: '...'}]
```

## Yapılacaklar

- [ ] Lighthouse entegrasyonu
- [ ] Core Web Vitals kontrolü
- [ ] Toplu URL tarama
- [ ] HTML rapor çıktısı

## Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için lütfen önce bir issue açın.

## İlgili Kaynaklar

- [SEO Rehberi: Meta Etiketleri Optimizasyonu](https://turkcode.net/blog) - Kapsamlı Türkçe SEO rehberi
- [Google Search Console Kullanım Kılavuzu](https://developers.google.com/search/docs)

## Lisans

MIT
