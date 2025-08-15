# PayLite Self-Report (WA) — Ultimate

Ultra-modern payment confirmation web application with neon design, auto-resize image uploads, JPG receipt generation, and WhatsApp integration.

## 🎯 Features

- **Landing Page**: Introduction with neon-themed design and clear CTA
- **Payment Method Selection**: QRIS, Transfer Bank, E-Wallet, Cash with copy-to-clipboard functionality
- **Smart Form**: Auto-fill, mandatory proof upload with auto-resize, strict validation
- **Receipt Generation**: Auto-download JPG receipts with unique numbering
- **WhatsApp Integration**: Formatted message with payment details sent automatically
- **Progress Tracking**: 4-step indicator across the user journey

## 🎨 Design System

- **Theme**: Neon cyan (#00FFFF) and green (#39FF14) on dark background (#0B0B0B)
- **Effects**: Glassmorphism, glow effects, animated grid background
- **Typography**: Inter font family
- **Animations**: Smooth fade-ins, glow pulses, respectful of `prefers-reduced-motion`

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Forms**: React Hook Form + Zod validation
- **Image Processing**: Browser Image Compression
- **Receipt Generation**: HTML-to-Image
- **UI Components**: Shadcn/ui + Lucide React icons

## 🔧 Environment Configuration

Create a `.env.local` file with these variables (or update `src/lib/env.ts`):

```env
OWNER_WHATSAPP=6285883795285
MERCHANT_NAME="Mark Xplorer"
RECEIPT_SIGN_SECRET="paylite-secret-key-2024"
PAYMENT_ACCOUNT_BANK="BCA 123456789 a/n Mark Xplorer"
PAYMENT_ACCOUNT_EWALLET="@markxplorer"
QRIS_STATIC_IMAGE_URL="https://placeholder.co/300x300/00FFFF/000000?text=QRIS+CODE"
SAWERIA_URL="https://saweria.co/markxplorer"
SOCIAL_INSTAGRAM="https://instagram.com/markxplorer"
SOCIAL_TELEGRAM="https://t.me/markxplorer"
SOCIAL_GITHUB="https://github.com/markxplorer"
BASE_URL="https://paylite-report.vercel.app"
```

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📱 User Flow

1. **Landing** (`/`) - Introduction and CTA
2. **Payment Method** (`/payment`) - Choose QRIS/Transfer/E-Wallet/Cash with instructions
3. **Form** (`/form`) - Fill details, upload proof (auto-resize), generate receipt
4. **WhatsApp** - Auto-formatted message sent to merchant

## 🔐 Security Features

- **Input Validation**: Strict Zod schemas with custom validators
- **Image Processing**: Auto-resize to prevent large uploads
- **Signature Generation**: HMAC SHA-256 for receipt authenticity
- **Data Sanitization**: XSS protection and clean inputs
- **Rate Limiting**: Debounced form submissions

## 📋 Validation Rules

- **Payer Name**: Minimum 2 real letters
- **Amount**: Minimum Rp 1,000 with Rupiah formatting
- **Description**: Minimum 5 letters (not just symbols/numbers)
- **Proof Upload**: JPG/PNG, auto-resize to ≤1.5MB, min 300×300px resolution
- **Date**: Valid date format, defaults to today

## 🧾 Receipt System

- **Receipt Number**: `SR-YYYYMMDD-####` (daily increment)
- **Invoice Number**: `INV-YYYYMMDD-XXXX` (separate sequence)
- **Signature**: 16-char HMAC hash for verification
- **Auto-download**: JPG format with 2x scaling for clarity

## 📞 WhatsApp Template

```
Konfirmasi Pembayaran

Nama: [NAMA]
Tanggal: [DD MMM YYYY, HH:mm]
Metode: [QRIS|Transfer|E-Wallet|Cash]
Nominal: Rp [NOMINAL_FORMATTED]
Deskripsi: [DESKRIPSI]
Referensi/Catatan: [REFERENSI_OR_MINUS]

No. Struk: [SR-YYYYMMDD-####]
No. Invoice: [INV-YYYYMMDD-XXXX]
Signature: [HASH16]

Bukti Bayar: Terlampir di pesan berikut
Struk JPG: Sudah saya simpan

(Dikirim otomatis dari PayLite Self-Report)
```

## 🎨 Component Architecture

```
src/
├── components/
│   ├── Footer.tsx              # Social links & branding
│   ├── LoaderGlow.tsx          # Neon loading animation
│   ├── NeonGridBackground.tsx  # Animated grid background
│   ├── ProgressSteps.tsx       # 4-step progress indicator
│   ├── ReceiptActions.tsx      # Generate & WhatsApp actions
│   └── ReceiptTemplate.tsx     # JPG receipt template
├── lib/
│   ├── env.ts                  # Environment configuration
│   ├── image/autoResize.ts     # Image compression utilities
│   ├── numbering/              # Receipt & invoice numbering
│   ├── signature.ts            # HMAC signature generation
│   ├── validation/payment.ts   # Zod schemas & validators
│   └── wa/buildText.ts         # WhatsApp message builder
└── pages/
    ├── LandingPage.tsx         # Home page with features
    ├── PaymentMethodPage.tsx   # Method selection & instructions
    └── PaymentFormPage.tsx     # Form + receipt generation
```

## 🔍 SEO Optimization

- **Meta Tags**: Optimized title, description, keywords
- **Open Graph**: Social media previews
- **Twitter Cards**: Rich link previews
- **Semantic HTML**: Proper heading hierarchy
- **Performance**: Lazy loading, optimized images
- **Lighthouse Score Target**: 95+ (Performance, A11y, SEO)

## 🧪 Testing WhatsApp Integration

1. Fill out the payment form completely
2. Upload a valid image (JPG/PNG, >300x300px)
3. Click "Generate Struk JPG" - receipt auto-downloads
4. Click "Konfirmasi Pembayaran" - WhatsApp opens with formatted message
5. Send the message to complete the flow

## 🎯 Key Features Implemented

✅ **Auto-fill** date & payment method from selection  
✅ **Progress indicator** across all steps  
✅ **Copy to clipboard** for account numbers  
✅ **Image auto-resize** with preview & validation  
✅ **5-letter minimum** validation for descriptions  
✅ **Receipt auto-download** with smooth loader  
✅ **Unique numbering** for receipts & invoices  
✅ **WhatsApp integration** with formatted messages  
✅ **Footer with social links** and Saweria support  
✅ **SEO optimization** ready for production  

## 📞 Support

For support or feature requests, contact via:
- Instagram: [@markxplorer](https://instagram.com/markxplorer)
- Telegram: [@markxplorer](https://t.me/markxplorer)
- GitHub: [markxplorer](https://github.com/markxplorer)
- Support: [Saweria](https://saweria.co/markxplorer)

---

**PayLite Self-Report** - Simple Payment Confirmation with Neon Speed ⚡