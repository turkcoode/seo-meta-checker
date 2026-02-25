#!/usr/bin/env node
/**
 * SEO Meta Checker - Web sayfalarının SEO meta etiketlerini analiz eder
 * @author turkcoode
 * @see https://turkcode.net
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

class SEOChecker {
  constructor(url) {
    this.url = url;
    this.results = {
      url,
      title: null,
      description: null,
      canonical: null,
      og: {},
      twitter: {},
      headings: { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 },
      robots: null,
      sitemap: null,
      issues: [],
      score: 0
    };
  }

  async analyze() {
    const html = await this.fetchPage(this.url);
    this.parseHTML(html);
    this.calculateScore();
    return this.results;
  }

  fetchPage(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      client.get(url, { headers: { 'User-Agent': 'SEOMetaChecker/1.0' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(this.fetchPage(res.headers.location));
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });
  }

  parseHTML(html) {
    // Title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    this.results.title = titleMatch ? titleMatch[1].trim() : null;

    // Meta tags
    const metaRegex = /<meta\s+([^>]+)>/gi;
    let match;
    while ((match = metaRegex.exec(html)) !== null) {
      const attrs = match[1];
      const name = this.getAttr(attrs, 'name') || this.getAttr(attrs, 'property');
      const content = this.getAttr(attrs, 'content');

      if (name === 'description') this.results.description = content;
      if (name === 'robots') this.results.robots = content;
      if (name && name.startsWith('og:')) this.results.og[name.slice(3)] = content;
      if (name && name.startsWith('twitter:')) this.results.twitter[name.slice(8)] = content;
    }

    // Canonical
    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    this.results.canonical = canonicalMatch ? canonicalMatch[1] : null;

    // Headings
    for (let i = 1; i <= 6; i++) {
      const headingRegex = new RegExp('<h' + i + '[\\s>]', 'gi');
      const matches = html.match(headingRegex);
      this.results.headings['h' + i] = matches ? matches.length : 0;
    }
  }

  getAttr(str, name) {
    const regex = new RegExp(name + '=["\']([^"\']*)["\']', 'i');
    const match = str.match(regex);
    return match ? match[1] : null;
  }

  calculateScore() {
    let score = 0;
    const issues = [];

    // Title (2 points)
    if (this.results.title) {
      if (this.results.title.length >= 30 && this.results.title.length <= 60) {
        score += 2;
      } else {
        score += 1;
        issues.push({ type: 'warning', message: 'Title uzunlugu ideal degil (' + this.results.title.length + ' karakter, ideal: 30-60)' });
      }
    } else {
      issues.push({ type: 'error', message: 'Title etiketi eksik' });
    }

    // Description (2 points)
    if (this.results.description) {
      if (this.results.description.length >= 120 && this.results.description.length <= 160) {
        score += 2;
      } else {
        score += 1;
        issues.push({ type: 'warning', message: 'Description uzunlugu ideal degil (' + this.results.description.length + ' karakter, ideal: 120-160)' });
      }
    } else {
      issues.push({ type: 'error', message: 'Meta description eksik' });
    }

    // Canonical (1 point)
    if (this.results.canonical) score += 1;
    else issues.push({ type: 'warning', message: 'Canonical URL tanimlanmamis' });

    // OG tags (2 points)
    if (this.results.og.title) score += 0.5;
    else issues.push({ type: 'warning', message: 'OG:Title eksik' });
    if (this.results.og.description) score += 0.5;
    if (this.results.og.image) score += 0.5;
    else issues.push({ type: 'error', message: 'OG:Image eksik - sosyal medya paylasimlari etkilenir' });
    if (this.results.og.url) score += 0.5;

    // H1 (1 point)
    if (this.results.headings.h1 === 1) {
      score += 1;
    } else if (this.results.headings.h1 === 0) {
      issues.push({ type: 'error', message: 'H1 basligi eksik' });
    } else {
      score += 0.5;
      issues.push({ type: 'warning', message: 'Birden fazla H1 basligi var (' + this.results.headings.h1 + ')' });
    }

    // H2 (1 point)
    if (this.results.headings.h2 > 0) score += 1;
    else issues.push({ type: 'warning', message: 'H2 basligi yok - icerik yapilandirmasi zayif' });

    // Robots (1 point)
    if (this.results.robots !== 'noindex') score += 1;

    this.results.score = Math.round(score);
    this.results.issues = issues;
  }

  printReport() {
    const r = this.results;
    console.log('\nURL: ' + r.url);
    console.log('━'.repeat(50));

    const icon = (ok) => ok ? '✅' : '❌';
    const warn = (ok) => ok ? '✅' : '⚠️ ';

    console.log(icon(r.title) + ' Title: ' + (r.title ? '"' + r.title + '" (' + r.title.length + ' karakter)' : 'Eksik'));
    console.log(warn(r.description) + ' Description: ' + (r.description ? '"' + r.description.substring(0, 60) + '..." (' + r.description.length + ' karakter)' : 'Eksik'));
    console.log(warn(r.canonical) + ' Canonical: ' + (r.canonical || 'Tanimlanmamis'));
    console.log(warn(r.og.title) + ' OG:Title: ' + (r.og.title || 'Eksik'));
    console.log(icon(r.og.image) + ' OG:Image: ' + (r.og.image ? 'Mevcut' : 'Eksik'));
    console.log(icon(r.headings.h1 === 1) + ' H1: ' + r.headings.h1 + ' adet' + (r.headings.h1 === 1 ? ' (ideal)' : ''));
    console.log(warn(r.headings.h2 > 0) + ' H2: ' + r.headings.h2 + ' adet');

    console.log('\nSkor: ' + r.score + '/10');

    if (r.issues.length > 0) {
      console.log('\nSorunlar:');
      r.issues.forEach(i => {
        console.log('  ' + (i.type === 'error' ? '❌' : '⚠️ ') + ' ' + i.message);
      });
    }
  }
}

// CLI
if (require.main === module) {
  const url = process.argv[2];
  if (!url) {
    console.log('Kullanim: seo-meta-checker <url>');
    console.log('Ornek: seo-meta-checker https://turkcode.net');
    process.exit(1);
  }

  const checker = new SEOChecker(url);
  checker.analyze()
    .then(() => {
      if (process.argv.includes('--json')) {
        console.log(JSON.stringify(checker.results, null, 2));
      } else {
        checker.printReport();
      }
    })
    .catch(err => {
      console.error('Hata:', err.message);
      process.exit(1);
    });
}

module.exports = { SEOChecker, analyzePage: (url) => new SEOChecker(url).analyze() };
