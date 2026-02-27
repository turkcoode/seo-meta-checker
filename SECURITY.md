# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously at **TURK CODE**. If you discover a security vulnerability in this project, we appreciate your help in disclosing it responsibly.

### How to Report

**Please DO NOT open a public GitHub issue for security vulnerabilities.**

Instead, report vulnerabilities through one of the following channels:

- **Email:** [dorlakersin@gmail.com](mailto:dorlakersin@gmail.com)
- **Subject Line:** `[SECURITY] seo-meta-checker - Brief Description`

### What to Include

To help us understand and resolve the issue quickly, please include:

1. **Description** of the vulnerability
2. **Steps to reproduce** the issue
3. **Affected versions** of the package
4. **Potential impact** assessment
5. **Suggested fix** (if any)
6. **Proof of concept** code or screenshots (if applicable)

### Response Timeline

| Action | Timeline |
|--------|----------|
| Acknowledgment of report | Within **24 hours** |
| Initial assessment | Within **48 hours** |
| Status update | Within **5 business days** |
| Patch release (critical) | Within **7 days** |
| Patch release (moderate) | Within **30 days** |

### What Qualifies as a Security Issue

- Remote Code Execution (RCE)
- Cross-Site Scripting (XSS)
- SQL Injection
- Authentication/Authorization bypass
- Information disclosure or data leakage
- Denial of Service (DoS) vulnerabilities
- Dependency vulnerabilities with known exploits
- Insecure default configurations

### What Does NOT Qualify

- Issues already reported and being addressed
- Theoretical vulnerabilities without proof of concept
- Issues in dependencies that don't affect this project
- Social engineering attacks
- Physical security issues
- Bugs that don't have security implications

## Responsible Disclosure Policy

We follow a **coordinated disclosure** approach:

1. **Reporter** submits the vulnerability privately
2. **We** acknowledge receipt and begin investigation
3. **We** develop and test a fix
4. **We** release the patched version
5. **We** publish a security advisory (if applicable)
6. **Reporter** may publicly disclose after the fix is released

We kindly ask that you:

- Give us reasonable time to address the issue before public disclosure
- Avoid exploiting the vulnerability beyond what is necessary to demonstrate it
- Do not access or modify other users' data
- Act in good faith to avoid privacy violations and disruptions

## Security Best Practices for Users

When using this package, we recommend:

```bash
# Always use the latest version
npm install seo-meta-checker@latest

# Regularly audit your dependencies
npm audit

# Use lock files to ensure reproducible builds
npm ci
```

## Recognition & Hall of Fame

We believe in recognizing the efforts of security researchers who help keep our project safe.

Responsible reporters will be:

- Credited in our security advisories (with permission)
- Listed in our Hall of Fame below
- Eligible for a mention in our release notes

### Hall of Fame

| Researcher | Vulnerability | Date |
|------------|--------------|------|
| *Be the first!* | - | - |

## Security Updates

Security patches are released as:

- **Patch versions** (e.g., 1.0.x) for backward-compatible fixes
- **GitHub Security Advisories** for critical vulnerabilities
- **npm audit** entries when applicable

Subscribe to our GitHub repository notifications to stay informed about security updates.

## Contact

- **Security Team:** [dorlakersin@gmail.com](mailto:dorlakersin@gmail.com)
- **GitHub:** [@turkcoode](https://github.com/turkcoode)
- **Website:** [turkcode.net](https://turkcode.net)

---

## Guvenlik Politikasi (Turkce Ozet)

Bu projede bir guvenlik acigi kesfederseniz, lutfen herkese acik bir GitHub issue **acmayin**. Bunun yerine [dorlakersin@gmail.com](mailto:dorlakersin@gmail.com) adresine e-posta gonderin. 24 saat icinde geri donus yapilacaktir. Sorumlu ifsa politikamiz geregince, guvenlik aciklari giderilene kadar gizli tutulmalidir. Katkilariniz icin tesekkur ederiz.

---

*This security policy is effective as of February 2026 and applies to all versions of `seo-meta-checker`.*
