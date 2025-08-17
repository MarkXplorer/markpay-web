import React, { useState, useRef, useEffect } from 'react';
import { Download, MessageCircle, Copy } from 'lucide-react';
import { toPng } from 'html-to-image';
import { PaymentFormData } from '@/lib/validation/payment';
import { ReceiptTemplate } from './ReceiptTemplate';
import { LoaderGlow } from './LoaderGlow';
import { generateReceiptNumber } from '@/lib/numbering/receipt';
import { generateInvoiceNumber } from '@/lib/numbering/invoice';
import { generateSignature, generateReceiptId } from '@/lib/signature';
import { buildWhatsAppText, openWhatsApp } from '@/lib/wa/buildText';
import { ENV } from '@/lib/env';
import { useToast } from '@/hooks/use-toast';

interface ReceiptActionsProps {
  formData: PaymentFormData;
  onConfirmation?: () => void;
}

export const ReceiptActions = ({ formData, onConfirmation }: ReceiptActionsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [receiptInfo, setReceiptInfo] = useState<{
    receiptNumber: string;
    invoiceNumber: string;
    signature: string;
    receiptId: string;
  } | null>(null);
  
  const receiptRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-generate receipt when component mounts
  useEffect(() => {
    const autoGenerateReceipt = async () => {
      setIsGenerating(true);
      
      try {
        // Generate receipt info
        const receiptNumber = generateReceiptNumber();
        const invoiceNumber = generateInvoiceNumber();
        const signature = generateSignature(
          formData.paymentDate,
          formData.payerName,
          formData.amount
        );
        const receiptId = generateReceiptId();
        
        const newReceiptInfo = {
          receiptNumber,
          invoiceNumber,
          signature,
          receiptId
        };
        
        setReceiptInfo(newReceiptInfo);
        
        toast({
          title: "Struk berhasil dibuat!",
          description: "Silakan lanjut konfirmasi pembayaran.",
        });
        
      } catch (error) {
        console.error('Error generating receipt:', error);
        toast({
          title: "Gagal membuat struk",
          description: "Terjadi kesalahan saat membuat struk. Silakan coba lagi.",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    };

    autoGenerateReceipt();
  }, [formData, toast]);

  const downloadReceiptAgain = async () => {
    if (!receiptRef.current || !receiptInfo) return;
    
    try {
      const dataUrl = await toPng(receiptRef.current, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        width: 400,
        height: 600,
      });
      
      const link = document.createElement('a');
      link.download = `receipt-${receiptInfo.receiptNumber}.jpg`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Struk berhasil diunduh ulang!",
      });
    } catch (error) {
      console.error('Error downloading receipt:', error);
      toast({
        title: "Gagal mengunduh struk",
        variant: "destructive",
      });
    }
  };

  const confirmPayment = () => {
    if (!receiptInfo) return;
    
    // Download payment proof automatically for WhatsApp attachment
    if (formData.proofFile) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(formData.proofFile);
      link.download = `bukti-bayar-${receiptInfo.receiptNumber}.${formData.proofFile.type.split('/')[1]}`;
      link.click();
      URL.revokeObjectURL(link.href);
    }
    
    const whatsappText = buildWhatsAppText(formData, receiptInfo);
    openWhatsApp(whatsappText, ENV.OWNER_WHATSAPP);
    
    toast({
      title: "WhatsApp terbuka",
      description: formData.proofFile 
        ? "Bukti pembayaran telah diunduh. Lampirkan file tersebut ke pesan WhatsApp."
        : "Kirim pesan untuk menyelesaikan konfirmasi pembayaran.",
      duration: 6000,
    });
    
    onConfirmation?.();
  };

  const copySummary = () => {
    if (!receiptInfo) return;
    
    const summary = buildWhatsAppText(formData, receiptInfo);
    navigator.clipboard.writeText(summary);
    
    toast({
      title: "Ringkasan tersalin!",
      description: "Ringkasan pembayaran berhasil disalin ke clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Hidden Receipt Template */}
      <div className="absolute opacity-0 pointer-events-none -z-10">
        {receiptInfo && (
          <ReceiptTemplate
            ref={receiptRef}
            formData={formData}
            receiptNumber={receiptInfo.receiptNumber}
            invoiceNumber={receiptInfo.invoiceNumber}
            signature={receiptInfo.signature}
            receiptId={receiptInfo.receiptId}
          />
        )}
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="glass-card p-8">
          <LoaderGlow text="Membuat struk JPG..." />
        </div>
      )}

      {/* Action Buttons */}
      {!isGenerating && receiptInfo && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold neon-text-cyan mb-4">
            Konfirmasi Pembayaran
          </h3>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <button
                onClick={downloadReceiptAgain}
                className="btn-glass flex-1 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Struk
              </button>
              
              <button
                onClick={copySummary}
                className="btn-glass flex-1 flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Salin Ringkasan
              </button>
            </div>
            
            <button
              onClick={confirmPayment}
              className="btn-secondary w-full flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Konfirmasi Pembayaran (WhatsApp)
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Struk otomatis dibuat. Klik 'Konfirmasi Pembayaran' untuk mengirim ke WhatsApp
          </p>
        </div>
      )}
    </div>
  );
};