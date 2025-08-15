import { z } from "zod";

// Helper function to check minimum letters (not just symbols/numbers)
const hasMinimumLetters = (text: string, minCount: number = 5): boolean => {
  const letterMatches = text.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g);
  return letterMatches ? letterMatches.length >= minCount : false;
};

// Payment method enum
export const PaymentMethod = z.enum(["QRIS", "Transfer", "E-Wallet", "Cash"]);

// Payment form validation schema
export const PaymentFormSchema = z.object({
  payerName: z
    .string()
    .min(2, "Nama harus minimal 2 karakter")
    .regex(/[A-Za-zÀ-ÖØ-öø-ÿ]{2,}/, "Nama harus mengandung minimal 2 huruf"),
  
  amount: z
    .number()
    .int("Nominal harus berupa angka bulat")
    .min(1000, "Nominal minimal Rp 1.000"),
  
  paymentDate: z
    .string()
    .min(1, "Tanggal pembayaran wajib diisi"),
  
  paymentMethod: PaymentMethod,
  
  description: z
    .string()
    .min(5, "Deskripsi minimal 5 karakter")
    .refine(
      (text) => hasMinimumLetters(text.trim(), 5),
      "Deskripsi harus mengandung minimal 5 huruf (bukan hanya angka/simbol)"
    ),
  
  proofFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Bukti pembayaran wajib diupload")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "File harus berformat JPG atau PNG"
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB before compression
      "File maksimal 5MB"
    ),
  
  reference: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof PaymentFormSchema>;

// Format currency to Rupiah
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Parse currency input (remove formatting)
export const parseCurrency = (value: string): number => {
  const numericValue = value.replace(/[^\d]/g, '');
  return parseInt(numericValue) || 0;
};