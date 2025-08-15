import { PaymentFormData } from '../validation/payment';
import { formatCurrency } from '../validation/payment';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export interface ReceiptInfo {
  receiptNumber: string;
  invoiceNumber: string;
  signature: string;
  receiptId: string;
}

export const buildWhatsAppText = (
  formData: PaymentFormData,
  receiptInfo: ReceiptInfo
): string => {
  const paymentDate = new Date(formData.paymentDate);
  const formattedDate = format(paymentDate, 'dd MMM yyyy, HH:mm', { locale: id });
  const formattedAmount = formatCurrency(formData.amount);

  const message = `Konfirmasi Pembayaran

Nama: ${formData.payerName}
Tanggal: ${formattedDate}
Metode: ${formData.paymentMethod}
Nominal: ${formattedAmount}
Deskripsi: ${formData.description}
Referensi/Catatan: ${formData.reference || '-'}

No. Struk: ${receiptInfo.receiptNumber}
No. Invoice: ${receiptInfo.invoiceNumber}
Signature: ${receiptInfo.signature}

Bukti Bayar: Terlampir di pesan berikut
Struk JPG: Sudah saya simpan

(Dikirim otomatis dari PayLite Self-Report)`;

  return message;
};

export const openWhatsApp = (text: string, phoneNumber: string): void => {
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};