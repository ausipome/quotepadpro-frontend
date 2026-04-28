export type User = {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  businessName: string;
  phone: string;
  logoUrl: string;
  logoFilename?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type Contact = {
  id: number;
  userId: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  county: string;
  postcode: string;
  createdAt: string;
  updatedAt: string;
};

export type QuoteItem = {
  id?: number;
  quoteId?: number;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  sortOrder: number;
};

export type Quote = {
  id: number;
  userId: number;
  contactId: number | null;
  quoteNumber: string;
  title: string;
  status: string;
  quoteDate: string | null;
  expiryDate: string | null;
  notes: string;
  subtotal: number;
  discountType: string;
  discountValue: number;
  vatMode: string;
  vatRate: number;
  vatAmount: number;
  total: number;
  publicId: string;
  acceptedAt: string | null;
  createdAt: string;
  updatedAt: string;
  items?: QuoteItem[];
  contact?: Contact | null;
};

export type PublicQuoteResponse = {
  quote: Quote;
  owner: {
    name: string;
    businessName: string;
    phone: string;
    logoUrl: string;
    email: string;
  };
};