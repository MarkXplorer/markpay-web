import { Instagram, Send, Github, Heart } from 'lucide-react';
import { ENV } from '@/lib/env';

export const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © 2024 {ENV.MERCHANT_NAME}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Powered by PayLite Self-Report
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href={ENV.SOCIAL_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link flex items-center gap-2 text-sm"
            >
              <Instagram className="w-4 h-4" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            
            <a
              href={ENV.SOCIAL_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link flex items-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Telegram</span>
            </a>
            
            <a
              href={ENV.SOCIAL_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link flex items-center gap-2 text-sm"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            
            <a
              href={ENV.SAWERIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 text-sm px-4 py-2"
            >
              <Heart className="w-4 h-4" />
              <span>Support Me</span>
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 pt-6 border-t border-border/20">
          <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto">
            PayLite Self-Report menggunakan enkripsi untuk mengamankan data transaksi. 
            Semua link eksternal dibuka dengan proteksi keamanan tambahan.
          </p>
        </div>
      </div>
    </footer>
  );
};