import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, X, Eye } from 'lucide-react';
import { NeonGridBackground } from '@/components/NeonGridBackground';
import { ProgressSteps } from '@/components/ProgressSteps';
import { Footer } from '@/components/Footer';
import { ReceiptActions } from '@/components/ReceiptActions';
import { PaymentFormSchema, PaymentFormData, formatCurrency, parseCurrency } from '@/lib/validation/payment';
import { createImagePreview } from '@/lib/image/autoResize';
import { useToast } from '@/hooks/use-toast';

export default function PaymentFormPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const [amountDisplay, setAmountDisplay] = useState('');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchema),
    mode: 'onChange',
    defaultValues: {
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'QRIS',
    }
  });

  const watchedFile = watch('proofFile');

  // Auto-fill from localStorage
  useEffect(() => {
    const savedMethod = localStorage.getItem('selectedPaymentMethod');
    if (savedMethod && ['QRIS', 'Transfer', 'E-Wallet', 'Cash'].includes(savedMethod)) {
      setValue('paymentMethod', savedMethod as any);
    }
  }, [setValue]);

  // Handle file upload - no auto-resize, use original size
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImageProcessing(true);
    
    try {
      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        throw new Error('Format file harus JPG atau PNG');
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('Ukuran file maksimal 2MB');
      }
      
      // Create preview
      const preview = await createImagePreview(file);
      setImagePreview(preview);
      
      // Update form with original file (no resize)
      setValue('proofFile', file, { shouldValidate: true });
      
      toast({
        title: "Bukti berhasil diupload!",
        description: `File siap digunakan (${(file.size / 1024 / 1024).toFixed(1)}MB)`,
      });
      
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Gagal memproses file",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      });
      setImagePreview(null);
    } finally {
      setIsImageProcessing(false);
    }
  };

  // Remove file
  const removeFile = () => {
    setValue('proofFile', undefined as any, { shouldValidate: true });
    setImagePreview(null);
  };

  // Handle amount input
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = parseCurrency(value);
    const formatted = formatCurrency(numericValue);
    
    setAmountDisplay(formatted);
    setValue('amount', numericValue, { shouldValidate: true });
  };

  const onSubmit = (data: PaymentFormData) => {
    setIsSubmitted(true);
    toast({
      title: "Form berhasil divalidasi!",
      description: "Silakan generate struk JPG untuk melanjutkan.",
    });
  };

  return (
    <NeonGridBackground>
      <div className="container mx-auto px-4 py-8">
        <ProgressSteps currentStep={3} />
        
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <Link to="/payment" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Metode Pembayaran
            </Link>
            
            <h1 className="text-4xl font-bold mb-4">
              <span className="neon-text-blue">Form Pembayaran</span>
            </h1>
            <p className="text-muted-foreground">
              Isi detail pembayaran dan upload bukti transfer dengan lengkap
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Payment Info */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-lg font-semibold neon-text-cyan mb-4">
                  Informasi Pembayaran
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nama Pembayar *
                    </label>
                    <input
                      {...register('payerName')}
                      type="text"
                      className="input-neon w-full"
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.payerName && (
                      <p className="text-destructive text-sm mt-1">{errors.payerName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nominal Pembayaran *
                    </label>
                    <input
                      type="text"
                      value={amountDisplay}
                      onChange={handleAmountChange}
                      className="input-neon w-full"
                      placeholder="Rp 0"
                    />
                    {errors.amount && (
                      <p className="text-destructive text-sm mt-1">{errors.amount.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tanggal Pembayaran *
                    </label>
                    <input
                      {...register('paymentDate')}
                      type="date"
                      className="input-neon w-full"
                    />
                    {errors.paymentDate && (
                      <p className="text-destructive text-sm mt-1">{errors.paymentDate.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Metode Pembayaran *
                    </label>
                    <select
                      {...register('paymentMethod')}
                      className="input-neon w-full"
                    >
                      <option value="QRIS">QRIS</option>
                      <option value="Transfer">Transfer Bank</option>
                      <option value="E-Wallet">E-Wallet</option>
                      <option value="Cash">Cash</option>
                    </select>
                    {errors.paymentMethod && (
                      <p className="text-destructive text-sm mt-1">{errors.paymentMethod.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Deskripsi Pembayaran *
                  </label>
                  <textarea
                    {...register('description')}
                    className="input-neon w-full min-h-[80px] resize-none"
                    placeholder="Minimal 5 huruf - jelaskan untuk apa pembayaran ini"
                  />
                  {errors.description && (
                    <p className="text-destructive text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Referensi / Catatan
                  </label>
                  <input
                    {...register('reference')}
                    type="text"
                    className="input-neon w-full"
                    placeholder="Nomor order, kode booking, dll (opsional)"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold neon-text-cyan mb-4">
                  Upload Bukti Pembayaran *
                </h3>
                
                {!imagePreview ? (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isImageProcessing}
                    />
                    <div className={`
                      border-2 border-dashed border-border rounded-lg p-8 text-center
                      hover:border-primary transition-colors duration-300
                      ${isImageProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}>
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">
                        {isImageProcessing ? 'Memproses gambar...' : 'Upload Bukti Transfer'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        JPG/PNG maksimal 2MB • Ukuran asli file akan digunakan
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview bukti pembayaran"
                        className="max-w-full max-h-64 rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={removeFile}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="btn-glass flex items-center gap-2"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/jpeg,image/png';
                          input.onchange = (e) => handleFileUpload(e as any);
                          input.click();
                        }}
                      >
                        <Upload className="w-4 h-4" />
                        Ganti File
                      </button>
                      
                      {watchedFile && (
                        <span className="text-sm text-muted-foreground self-center">
                          {(watchedFile.size / 1024 / 1024).toFixed(1)}MB
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {errors.proofFile && (
                  <p className="text-destructive text-sm mt-2">
                    {typeof errors.proofFile.message === 'string' ? errors.proofFile.message : 'Error validasi file'}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!isValid || isImageProcessing}
                  className={`
                    btn-hero
                    ${!isValid || isImageProcessing ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  Validasi & Lanjutkan
                </button>
                <p className="text-sm text-muted-foreground mt-3">
                  Pastikan semua data sudah benar sebelum melanjutkan
                </p>
              </div>
            </form>
          ) : (
            // Receipt Actions - shown after form submission
            <div className="animate-fade-in">
              <ReceiptActions
                formData={watch()}
                onConfirmation={() => {
                  toast({
                    title: "Konfirmasi terkirim!",
                    description: "Pesan WhatsApp berhasil dibuka. Silakan kirim untuk menyelesaikan.",
                  });
                }}
              />
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </NeonGridBackground>
  );
}