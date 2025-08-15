import CryptoJS from 'crypto-js';
import { ENV } from './env';

export const generateSignature = (
  date: string,
  name: string,
  amount: number
): string => {
  const data = `${date}${name}${amount}`;
  const hash = CryptoJS.HmacSHA256(data, ENV.RECEIPT_SIGN_SECRET);
  return hash.toString(CryptoJS.enc.Hex).substring(0, 16);
};

export const generateReceiptId = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`.substring(0, 12);
};