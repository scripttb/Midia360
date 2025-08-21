export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'tenant_owner' | 'manager' | 'sales';
  tenantId?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  nif: string;
  province: string;
  companyType: string;
  employeeCount: number;
  bankAccount: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionStatus: 'active' | 'expired' | 'trial' | 'suspended';
  subscriptionEnd: Date;
  createdAt: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: 'trial' | 'basic' | 'advanced' | 'premium';
  displayName: string;
  price: number;
  currency: string;
  duration: number; // days
  features: string[];
  limits: {
    users: number;
    invoices: number;
    storage: number; // GB
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  source: 'website' | 'whatsapp' | 'referral' | 'cold_call' | 'social_media';
  value?: number;
  notes: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  clientNIF: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: Date;
  createdAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  userId: string;
  tenantId?: string;
}
