import React from 'react';
import { PaymentFormData, formatCurrency } from '@/lib/validation/payment';
import { ENV } from '@/lib/env';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface ReceiptTemplateProps {
  formData: PaymentFormData;
  receiptNumber: string;
  invoiceNumber: string;
  signature: string;
  receiptId: string;
}

export const ReceiptTemplate = React.forwardRef<HTMLDivElement, ReceiptTemplateProps>(
  ({ formData, receiptNumber, invoiceNumber, signature, receiptId }, ref) => {
    const now = new Date();
    const paymentDate = new Date(formData.paymentDate);
    
    return (
      <div ref={ref} className="receipt-container" style={{ width: '400px', minHeight: '600px' }}>
        {/* Header */}
        <div className="text-center mb-6 border-b-2 border-black pb-4">
          <div className="text-xl font-bold mb-2">{ENV.MERCHANT_NAME}</div>
          <div className="text-sm text-gray-600">PAYMENT CONFIRMATION RECEIPT</div>
          <div className="text-xs text-gray-500 mt-1">
            Generated: {format(now, 'dd/MM/yyyy HH:mm:ss', { locale: id })}
          </div>
        </div>

        {/* Receipt Numbers */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">No. Struk:</span>
            <span className="font-mono">{receiptNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold">No. Invoice:</span>
            <span className="font-mono">{invoiceNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold">Receipt ID:</span>
            <span className="font-mono">{receiptId}</span>
          </div>
        </div>

        {/* Payer Information */}
        <div className="mb-6">
          <div className="text-sm font-semibold mb-2 border-b border-gray-300 pb-1">
            INFORMASI PEMBAYAR
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Nama:</span>
              <span className="font-medium">{formData.payerName}</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <div className="text-sm font-semibold mb-2 border-b border-gray-300 pb-1">
            DETAIL PEMBAYARAN
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Deskripsi:</span>
              <span className="text-right max-w-[200px] break-words">{formData.description}</span>
            </div>
            <div className="flex justify-between">
              <span>Nominal:</span>
              <span className="font-bold">{formatCurrency(formData.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Metode:</span>
              <span>{formData.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal:</span>
              <span>{format(paymentDate, 'dd MMM yyyy', { locale: id })}</span>
            </div>
            {formData.reference && (
              <div className="flex justify-between">
                <span>Referensi:</span>
                <span className="text-right max-w-[200px] break-words">{formData.reference}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t-2 border-black text-center">
          <div className="text-lg font-bold mb-2">© {ENV.MERCHANT_NAME}</div>
          <div className="text-xs text-gray-600 mb-2">
            Terima kasih atas pembayaran Anda
          </div>
          <div className="text-xs text-gray-500">
            Signature: {signature}
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <div className="text-6xl font-bold transform rotate-45 text-gray-400">
            PAYLITE
          </div>
        </div>
      </div>
    );
  }
);

ReceiptTemplate.displayName = 'ReceiptTemplate';