import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { QrCode, CreditCard, Wallet, Banknote, Copy, Download, ArrowLeft } from 'lucide-react';
import { NeonGridBackground } from '@/components/NeonGridBackground';
import { ProgressSteps } from '@/components/ProgressSteps';
import { Footer } from '@/components/Footer';
import { ENV } from '@/lib/env';
import { useToast } from '@/hooks/use-toast';

type PaymentMethod = 'QRIS' | 'Transfer' | 'E-Wallet' | 'Cash';

export default function PaymentMethodPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const paymentMethods = [
    {
      id: 'QRIS' as PaymentMethod,
      title: 'QRIS',
      description: 'Scan QR Code untuk pembayaran',
      icon: QrCode,
      color: 'neon-text-cyan'
    },
    {
      id: 'Transfer' as PaymentMethod,
      title: 'Transfer Bank',
      description: 'Transfer melalui rekening bank',
      icon: CreditCard,
      color: 'neon-text-green'
    },
    {
      id: 'E-Wallet' as PaymentMethod,
      title: 'E-Wallet',
      description: 'OVO, GoPay, DANA, ShopeePay',
      icon: Wallet,
      color: 'neon-text-cyan'
    },
    {
      id: 'Cash' as PaymentMethod,
      title: 'Cash',
      description: 'Pembayaran tunai langsung',
      icon: Banknote,
      color: 'neon-text-green'
    }
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Tersalin!",
      description: `${label} berhasil disalin ke clipboard`,
    });
  };

  const downloadQRIS = () => {
    if (ENV.QRIS_STATIC_IMAGE_URL) {
      const link = document.createElement('a');
      link.href = ENV.QRIS_STATIC_IMAGE_URL;
      link.download = 'qris-code.png';
      link.target = '_blank';
      link.click();
      
      toast({
        title: "Download QRIS",
        description: "QRIS code berhasil didownload",
      });
    }
  };

  const proceedToForm = () => {
    if (selectedMethod) {
      // Store selected method in localStorage for auto-fill
      localStorage.setItem('selectedPaymentMethod', selectedMethod);
      navigate('/form');
    }
  };

  return (
    <NeonGridBackground>
      <div className="container mx-auto px-4 py-8">
        <ProgressSteps currentStep={2} />
        
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
            
            <h1 className="text-4xl font-bold mb-4">
              Pilih <span className="neon-text-cyan">Metode Pembayaran</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pilih metode pembayaran yang Anda gunakan, lalu ikuti instruksi yang tersedia
            </p>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`
                    glass-card p-6 cursor-pointer transition-all duration-300
                    ${isSelected ? 'neon-glow-cyan border-primary' : 'hover:neon-glow-cyan'}
                  `}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center ${isSelected ? 'neon-glow-cyan' : ''}`}>
                      <Icon className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${isSelected ? method.color : ''}`}>
                        {method.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="animate-fade-in">
                      {method.id === 'QRIS' && (
                        <div className="space-y-4">
                          <p className="text-sm font-medium">Merchant: {ENV.MERCHANT_NAME}</p>
                          {ENV.QRIS_STATIC_IMAGE_URL && (
                            <div className="flex flex-col sm:flex-row gap-3">
                              <img 
                                src={ENV.QRIS_STATIC_IMAGE_URL} 
                                alt="QRIS Code" 
                                className="w-32 h-32 rounded-lg border border-border/30"
                              />
                              <div className="flex-1">
                                <p className="text-sm text-muted-foreground mb-3">
                                  Scan QR Code di atas atau download untuk pembayaran
                                </p>
                                <button
                                  onClick={downloadQRIS}
                                  className="btn-glass flex items-center gap-2"
                                >
                                  <Download className="w-4 h-4" />
                                  Download QRIS
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {method.id === 'Transfer' && (
                        <div className="space-y-3">
                          <div className="glass-card p-4 rounded-lg bg-muted/20">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{ENV.PAYMENT_ACCOUNT_BANK}</p>
                                <p className="text-sm text-muted-foreground">Transfer ke rekening di atas</p>
                              </div>
                              <button
                                onClick={() => copyToClipboard(ENV.PAYMENT_ACCOUNT_BANK, 'Nomor rekening')}
                                className="btn-glass p-2"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {method.id === 'E-Wallet' && (
                        <div className="space-y-3">
                          <div className="glass-card p-4 rounded-lg bg-muted/20">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{ENV.PAYMENT_ACCOUNT_EWALLET}</p>
                                <p className="text-sm text-muted-foreground">ID E-Wallet / Username</p>
                              </div>
                              <button
                                onClick={() => copyToClipboard(ENV.PAYMENT_ACCOUNT_EWALLET, 'ID E-Wallet')}
                                className="btn-glass p-2"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Kirim ke OVO, GoPay, DANA, atau ShopeePay menggunakan ID di atas
                          </p>
                        </div>
                      )}
                      
                      {method.id === 'Cash' && (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Pembayaran tunai langsung kepada {ENV.MERCHANT_NAME}. 
                            Pastikan Anda sudah melakukan pembayaran sebelum mengisi form konfirmasi.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          {selectedMethod && (
            <div className="text-center animate-fade-in">
              <button
                onClick={proceedToForm}
                className="btn-hero"
              >
                Lanjut Isi Form Pembayaran
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
              </button>
              <p className="text-sm text-muted-foreground mt-3">
                Metode terpilih: <span className="font-medium">{selectedMethod}</span>
              </p>
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </NeonGridBackground>
  );
}