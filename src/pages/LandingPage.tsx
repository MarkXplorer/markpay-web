import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NeonGridBackground } from '@/components/NeonGridBackground';
import { ProgressSteps } from '@/components/ProgressSteps';
import { Footer } from '@/components/Footer';
import { ENV } from '@/lib/env';

export default function LandingPage() {
  return (
    <NeonGridBackground>
      <div className="container mx-auto px-4 py-8">
        <ProgressSteps currentStep={1} />
        
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="neon-text-cyan">PayLite</span>{" "}
                <span className="neon-text-green">Self-Report</span>
              </h1>
              <div className="text-xl md:text-2xl text-muted-foreground font-medium">
                Simple Payment Confirmation with{" "}
                <span className="neon-text-cyan">Neon Speed</span>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Platform konfirmasi pembayaran ultra-cepat dengan validasi ketat, 
              auto-resize bukti transfer, dan integrasi WhatsApp langsung. 
              Buat struk JPG otomatis dan kirim konfirmasi dalam hitungan detik.
            </p>
            
            <Link to="/payment">
              <button className="btn-hero text-lg">
                Mulai Konfirmasi Pembayaran
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-3 gap-8 mb-16">
            <div className="glass-card p-6 text-center group hover:neon-glow-cyan transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center neon-glow-cyan">
                <Zap className="w-8 h-8 neon-text-cyan" />
              </div>
              <h3 className="text-xl font-semibold mb-3 neon-text-cyan">Ultra Fast</h3>
              <p className="text-muted-foreground">
                Upload bukti, generate struk JPG, dan kirim ke WhatsApp dalam 30 detik
              </p>
            </div>

            <div className="glass-card p-6 text-center group hover:neon-glow-green transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center neon-glow-green">
                <Shield className="w-8 h-8 neon-text-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3 neon-text-green">Extra Secure</h3>
              <p className="text-muted-foreground">
                Validasi ketat, auto-resize gambar, dan signature HMAC untuk keamanan maksimal
              </p>
            </div>

            <div className="glass-card p-6 text-center group hover:neon-glow-cyan transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center neon-glow-cyan">
                <Clock className="w-8 h-8 neon-text-cyan" />
              </div>
              <h3 className="text-xl font-semibold mb-3 neon-text-cyan">Smart Features</h3>
              <p className="text-muted-foreground">
                Auto-fill tanggal, copy nomor rekening, preview bukti, dan nomor struk unik
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="glass-card p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 neon-text-green">
              Cara Kerja PayLite
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold mb-2">Pilih Metode</h4>
                <p className="text-sm text-muted-foreground">
                  QRIS, Transfer Bank, E-Wallet, atau Cash
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold mb-2">Isi Form</h4>
                <p className="text-sm text-muted-foreground">
                  Data pembayar + upload bukti (auto-resize)
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold mb-2">Generate Struk</h4>
                <p className="text-sm text-muted-foreground">
                  Buat struk JPG dengan nomor unik
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  4
                </div>
                <h4 className="font-semibold mb-2">Kirim WhatsApp</h4>
                <p className="text-sm text-muted-foreground">
                  Konfirmasi otomatis ke {ENV.MERCHANT_NAME}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center glass-card p-8">
            <h2 className="text-2xl font-bold mb-4 neon-text-cyan">
              Siap Konfirmasi Pembayaran Anda?
            </h2>
            <p className="text-muted-foreground mb-6">
              Proses cepat, aman, dan mudah. Mulai sekarang!
            </p>
            <Link to="/payment">
              <button className="btn-hero">
                Mulai Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    </NeonGridBackground>
  );
}