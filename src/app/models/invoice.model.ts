export interface InvoiceItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
}

export interface Invoice {
  id: number;
  number: string;
  status: number;
  creationDate: string;
  processingDate?: string;
  closingDate?: string;
  failureReason?: string;
  errorType?: number;
  items: InvoiceItem[];
  totalValue: number;
}

export interface CreateInvoiceRequest {
  items: AddItemRequest[];
}

export interface AddItemRequest {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export enum InvoiceStatus {
  Open = 1,
  Processing = 2,
  Closed = 3,
  Failed = 4
}
