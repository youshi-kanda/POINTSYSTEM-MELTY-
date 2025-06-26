
export interface Member {
  id: string;
  name: string;
  email: string;
  points: number;
  registeredDate: string;
  lastLoginDate: string;
  status: 'active' | 'inactive';
}

export interface Store {
  id: string;
  name: string;
  ownerName: string;
  registeredDate: string;
  status: 'active' | 'inactive';
  totalSales: number;
  pointsIssued: number;
  usageStatus: 'high' | 'medium' | 'low';
}

export interface ChargeHistory {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  points: number;
  chargeDate: string;
  paymentMethod: 'credit' | 'bank';
  status: 'completed' | 'pending' | 'failed';
  transactionId: string;
}


export const mockMembers: Member[] = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    points: 15000,
    registeredDate: '2024-01-15',
    lastLoginDate: '2024-06-25',
    status: 'active'
  },
  {
    id: '2',
    name: '佐藤花子',
    email: 'sato@example.com',
    points: 8500,
    registeredDate: '2024-02-20',
    lastLoginDate: '2024-06-24',
    status: 'active'
  },
  {
    id: '3',
    name: '鈴木一郎',
    email: 'suzuki@example.com',
    points: 3200,
    registeredDate: '2024-03-10',
    lastLoginDate: '2024-06-20',
    status: 'active'
  },
  {
    id: '4',
    name: '高橋美咲',
    email: 'takahashi@example.com',
    points: 0,
    registeredDate: '2024-04-05',
    lastLoginDate: '2024-05-15',
    status: 'inactive'
  },
  {
    id: '5',
    name: '渡辺健太',
    email: 'watanabe@example.com',
    points: 22000,
    registeredDate: '2024-01-08',
    lastLoginDate: '2024-06-26',
    status: 'active'
  }
];

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'カフェ・ドゥ・パリ',
    ownerName: '山田商店',
    registeredDate: '2024-01-10',
    status: 'active',
    totalSales: 450000,
    pointsIssued: 45000,
    usageStatus: 'high'
  },
  {
    id: '2',
    name: 'ファミリーマート新宿店',
    ownerName: '株式会社コンビニ',
    registeredDate: '2024-02-01',
    status: 'active',
    totalSales: 1200000,
    pointsIssued: 120000,
    usageStatus: 'high'
  },
  {
    id: '3',
    name: 'レストラン花月',
    ownerName: '花月グループ',
    registeredDate: '2024-03-15',
    status: 'active',
    totalSales: 280000,
    pointsIssued: 28000,
    usageStatus: 'medium'
  },
  {
    id: '4',
    name: 'ブックストア青山',
    ownerName: '青山書店',
    registeredDate: '2024-04-20',
    status: 'active',
    totalSales: 85000,
    pointsIssued: 8500,
    usageStatus: 'low'
  },
  {
    id: '5',
    name: 'スポーツジムFIT',
    ownerName: 'フィットネス株式会社',
    registeredDate: '2024-05-01',
    status: 'inactive',
    totalSales: 0,
    pointsIssued: 0,
    usageStatus: 'low'
  }
];

export const mockChargeHistory: ChargeHistory[] = [
  {
    id: '1',
    memberId: '1',
    memberName: '田中太郎',
    amount: 3300,
    points: 3000,
    chargeDate: '2024-06-25',
    paymentMethod: 'credit',
    status: 'completed',
    transactionId: 'TXN001'
  },
  {
    id: '2',
    memberId: '2',
    memberName: '佐藤花子',
    amount: 5500,
    points: 5000,
    chargeDate: '2024-06-24',
    paymentMethod: 'credit',
    status: 'completed',
    transactionId: 'TXN002'
  },
  {
    id: '3',
    memberId: '5',
    memberName: '渡辺健太',
    amount: 11000,
    points: 10000,
    chargeDate: '2024-06-23',
    paymentMethod: 'bank',
    status: 'completed',
    transactionId: 'TXN003'
  },
  {
    id: '4',
    memberId: '3',
    memberName: '鈴木一郎',
    amount: 2200,
    points: 2000,
    chargeDate: '2024-06-22',
    paymentMethod: 'credit',
    status: 'pending',
    transactionId: 'TXN004'
  },
  {
    id: '5',
    memberId: '1',
    memberName: '田中太郎',
    amount: 16500,
    points: 15000,
    chargeDate: '2024-06-20',
    paymentMethod: 'credit',
    status: 'completed',
    transactionId: 'TXN005'
  }
];

export const dashboardSummary = {
  totalMembers: mockMembers.length,
  activeMembers: mockMembers.filter(m => m.status === 'active').length,
  totalStores: mockStores.length,
  activeStores: mockStores.filter(s => s.status === 'active').length,
  totalPointsIssued: mockStores.reduce((sum, store) => sum + store.pointsIssued, 0),
  totalSales: mockStores.reduce((sum, store) => sum + store.totalSales, 0),
  recentCharges: mockChargeHistory.slice(0, 5)
};
