// Invoice numbering system
const INVOICE_PREFIX = "INV";

export const generateInvoiceNumber = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  // Get daily counter from localStorage (separate from receipt)
  const dateKey = `${year}${month}${day}`;
  const storageKey = `invoice_counter_${dateKey}`;
  
  let counter = parseInt(localStorage.getItem(storageKey) || '0') + 1;
  localStorage.setItem(storageKey, counter.toString());
  
  const counterStr = String(counter).padStart(4, '0');
  
  return `${INVOICE_PREFIX}-${year}${month}${day}-${counterStr}`;
};