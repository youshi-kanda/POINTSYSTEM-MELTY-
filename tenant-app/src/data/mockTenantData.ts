export interface StoreProfile {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  pointRate: number;
  status: 'active' | 'suspended' | 'pending';
  balance: number;
  monthlyFee: number;
}

export interface SalesTransaction {
  id: string;
  transactionId: string;
  customerName: string;
  customerEmail: string;
  purchaseAmount: number;
  pointsIssued: number;
  paymentMethod: 'cash' | 'credit' | 'digital';
  transactionDate: string;
  status: 'completed' | 'pending' | 'refunded';
  receiptGenerated: boolean;
}

export interface Receipt {
  id: string;
  transactionId: string;
  receiptNumber: string;
  customerName: string;
  storeInfo: {
    name: string;
    address: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  pointsIssued: number;
  issueDate: string;
  pdfGenerated: boolean;
}

export interface PaymentRecord {
  id: string;
  paymentId: string;
  amount: number;
  fee: number;
  netAmount: number;
  paymentDate: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: 'gmo_credit' | 'bank_transfer';
  description: string;
}

export interface AnalyticsData {
  dailySales: {
    date: string;
    sales: number;
    transactions: number;
    pointsIssued: number;
  }[];
  monthlySummary: {
    totalSales: number;
    totalTransactions: number;
    totalPointsIssued: number;
    averageTransaction: number;
  };
}

export const mockStoreProfile: StoreProfile = {
  id: 'store_001',
  name: 'カフェ・ドゥ・パリ 新宿店',
  ownerName: '田中 太郎',
  email: 'store@cafe-de-paris.jp',
  phone: '03-1234-5678',
  address: '東京都新宿区新宿3-1-1 新宿ビル1F',
  registrationDate: '2024-01-15',
  pointRate: 10,
  status: 'active',
  balance: 125000,
  monthlyFee: 3300
};

export const mockSalesTransactions: SalesTransaction[] = [
  {
    id: 'txn_001',
    transactionId: 'TXN20241226001',
    customerName: '佐藤 花子',
    customerEmail: 'hanako.sato@example.com',
    purchaseAmount: 1500,
    pointsIssued: 150,
    paymentMethod: 'credit',
    transactionDate: '2024-12-26T10:30:00Z',
    status: 'completed',
    receiptGenerated: true
  },
  {
    id: 'txn_002',
    transactionId: 'TXN20241226002',
    customerName: '鈴木 一郎',
    customerEmail: 'ichiro.suzuki@example.com',
    purchaseAmount: 2800,
    pointsIssued: 280,
    paymentMethod: 'cash',
    transactionDate: '2024-12-26T11:15:00Z',
    status: 'completed',
    receiptGenerated: true
  },
  {
    id: 'txn_003',
    transactionId: 'TXN20241226003',
    customerName: '高橋 美咲',
    customerEmail: 'misaki.takahashi@example.com',
    purchaseAmount: 950,
    pointsIssued: 95,
    paymentMethod: 'digital',
    transactionDate: '2024-12-26T12:45:00Z',
    status: 'pending',
    receiptGenerated: false
  },
  {
    id: 'txn_004',
    transactionId: 'TXN20241225001',
    customerName: '山田 次郎',
    customerEmail: 'jiro.yamada@example.com',
    purchaseAmount: 3200,
    pointsIssued: 320,
    paymentMethod: 'credit',
    transactionDate: '2024-12-25T14:20:00Z',
    status: 'completed',
    receiptGenerated: true
  },
  {
    id: 'txn_005',
    transactionId: 'TXN20241225002',
    customerName: '中村 恵子',
    customerEmail: 'keiko.nakamura@example.com',
    purchaseAmount: 1750,
    pointsIssued: 175,
    paymentMethod: 'cash',
    transactionDate: '2024-12-25T16:10:00Z',
    status: 'completed',
    receiptGenerated: true
  }
];

export const mockReceipts: Receipt[] = [
  {
    id: 'receipt_001',
    transactionId: 'TXN20241226001',
    receiptNumber: 'R-2024-001',
    customerName: '佐藤 花子',
    storeInfo: {
      name: 'カフェ・ドゥ・パリ 新宿店',
      address: '東京都新宿区新宿3-1-1 新宿ビル1F',
      phone: '03-1234-5678'
    },
    items: [
      { name: 'ブレンドコーヒー', quantity: 1, unitPrice: 500, totalPrice: 500 },
      { name: 'クロワッサン', quantity: 2, unitPrice: 400, totalPrice: 800 },
      { name: 'サラダセット', quantity: 1, unitPrice: 200, totalPrice: 200 }
    ],
    subtotal: 1500,
    tax: 0,
    total: 1500,
    pointsIssued: 150,
    issueDate: '2024-12-26T10:30:00Z',
    pdfGenerated: true
  },
  {
    id: 'receipt_002',
    transactionId: 'TXN20241226002',
    receiptNumber: 'R-2024-002',
    customerName: '鈴木 一郎',
    storeInfo: {
      name: 'カフェ・ドゥ・パリ 新宿店',
      address: '東京都新宿区新宿3-1-1 新宿ビル1F',
      phone: '03-1234-5678'
    },
    items: [
      { name: 'エスプレッソ', quantity: 2, unitPrice: 400, totalPrice: 800 },
      { name: 'パンケーキセット', quantity: 1, unitPrice: 1200, totalPrice: 1200 },
      { name: 'フルーツジュース', quantity: 2, unitPrice: 400, totalPrice: 800 }
    ],
    subtotal: 2800,
    tax: 0,
    total: 2800,
    pointsIssued: 280,
    issueDate: '2024-12-26T11:15:00Z',
    pdfGenerated: true
  }
];

export const mockPaymentRecords: PaymentRecord[] = [
  {
    id: 'pay_001',
    paymentId: 'GMO20241220001',
    amount: 45000,
    fee: 1500,
    netAmount: 43500,
    paymentDate: '2024-12-20',
    status: 'completed',
    paymentMethod: 'gmo_credit',
    description: '12月前半売上決済'
  },
  {
    id: 'pay_002',
    paymentId: 'GMO20241205001',
    amount: 38000,
    fee: 1360,
    netAmount: 36640,
    paymentDate: '2024-12-05',
    status: 'completed',
    paymentMethod: 'gmo_credit',
    description: '11月後半売上決済'
  },
  {
    id: 'pay_003',
    paymentId: 'GMO20241125001',
    amount: 52000,
    fee: 1640,
    netAmount: 50360,
    paymentDate: '2024-11-25',
    status: 'completed',
    paymentMethod: 'gmo_credit',
    description: '11月前半売上決済'
  },
  {
    id: 'pay_004',
    paymentId: 'BANK20241201001',
    amount: 3300,
    fee: 600,
    netAmount: 2700,
    paymentDate: '2024-12-01',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    description: '月額利用料'
  }
];

export const mockAnalyticsData: AnalyticsData = {
  dailySales: [
    { date: '2024-12-20', sales: 15000, transactions: 12, pointsIssued: 1500 },
    { date: '2024-12-21', sales: 18500, transactions: 15, pointsIssued: 1850 },
    { date: '2024-12-22', sales: 12000, transactions: 8, pointsIssued: 1200 },
    { date: '2024-12-23', sales: 22000, transactions: 18, pointsIssued: 2200 },
    { date: '2024-12-24', sales: 25000, transactions: 20, pointsIssued: 2500 },
    { date: '2024-12-25', sales: 19500, transactions: 16, pointsIssued: 1950 },
    { date: '2024-12-26', sales: 8200, transactions: 5, pointsIssued: 820 }
  ],
  monthlySummary: {
    totalSales: 485000,
    totalTransactions: 385,
    totalPointsIssued: 48500,
    averageTransaction: 1260
  }
};
