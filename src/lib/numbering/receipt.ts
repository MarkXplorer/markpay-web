// Receipt numbering system
const RECEIPT_PREFIX = "SR";

export const generateReceiptNumber = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  // Get daily counter from localStorage
  const dateKey = `${year}${month}${day}`;
  const storageKey = `receipt_counter_${dateKey}`;
  
  let counter = parseInt(localStorage.getItem(storageKey) || '0') + 1;
  localStorage.setItem(storageKey, counter.toString());
  
  const counterStr = String(counter).padStart(4, '0');
  
  return `${RECEIPT_PREFIX}-${year}${month}${day}-${counterStr}`;
};