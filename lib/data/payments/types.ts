export interface PaymentRequest {
  userId: number;
  vendorId: number;
  activityId: number;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  method: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL';
}

export interface PaymentResponse {
  id: number;
  userId: number;
  vendorId: number;
  activityId: number;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  method: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL';
  createdAt: string;
  updatedAt: string;
}

export interface PaymentFormData {
  email: string;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
