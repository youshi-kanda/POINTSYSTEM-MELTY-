export interface Store {
  id: string;
  name: string;
  category: 'restaurant' | 'retail' | 'service' | 'entertainment' | 'health' | 'education';
  rating: number;
  reviews: number;
  priceRange: 'budget' | 'moderate' | 'expensive' | 'luxury';
  distance: number;
  status: 'open' | 'closed' | 'closing-soon';
  hours: string;
  phone: string;
  address: string;
  features: string[];
  specialties: string[];
  location: {
    lat: number;
    lng: number;
  };
  pointsEarned?: number;
  biidPartner: boolean;
  pointsRate: number;
}

export interface User {
  id: string;
  name: string;
  memberId: string;
  points: number;
  location: string;
  avatar?: string;
}

export const mockUser: User = {
  id: 'user001',
  name: '田中 太郎',
  memberId: 'M12345',
  points: 15420,
  location: '東京都新宿区',
  avatar: ''
};

export const mockStores: Store[] = [
  {
    id: 'store001',
    name: 'カフェ・ドルチェ',
    category: 'restaurant',
    rating: 4.6,
    reviews: 324,
    priceRange: 'moderate',
    distance: 0.8,
    status: 'open',
    hours: '07:00-22:00',
    phone: '03-1234-5678',
    address: '東京都新宿区西新宿1-2-3',
    features: ['wifi', 'parking'],
    specialties: ['コーヒー', 'パスタ', 'デザート'],
    location: { lat: 35.6762, lng: 139.6503 },
    pointsEarned: 150,
    biidPartner: true,
    pointsRate: 5
  },
  {
    id: 'store002',
    name: 'ファッション館NOVA',
    category: 'retail',
    rating: 4.3,
    reviews: 156,
    priceRange: 'moderate',
    distance: 1.2,
    status: 'open',
    hours: '10:00-21:00',
    phone: '03-2345-6789',
    address: '東京都新宿区西新宿2-4-5',
    features: ['wheelchair', 'parking'],
    specialties: ['レディース', 'メンズ', 'アクセサリー'],
    location: { lat: 35.6695, lng: 139.6731 },
    pointsEarned: 320,
    biidPartner: true,
    pointsRate: 3
  },
  {
    id: 'store003',
    name: 'ビューティーサロン麗',
    category: 'service',
    rating: 4.8,
    reviews: 89,
    priceRange: 'expensive',
    distance: 0.6,
    status: 'open',
    hours: '09:00-19:00',
    phone: '03-3456-7890',
    address: '東京都新宿区西新宿1-6-7',
    features: ['wifi'],
    specialties: ['ヘアカット', 'エステ', 'ネイル'],
    location: { lat: 35.6854, lng: 139.6565 },
    pointsEarned: 480,
    biidPartner: true,
    pointsRate: 8
  },
  {
    id: 'store004',
    name: 'シネマコンプレックス21',
    category: 'entertainment',
    rating: 4.5,
    reviews: 567,
    priceRange: 'moderate',
    distance: 2.1,
    status: 'open',
    hours: '09:00-24:00',
    phone: '03-4567-8901',
    address: '東京都新宿区西新宿3-8-9',
    features: ['wheelchair', 'parking', 'wifi'],
    specialties: ['映画', 'IMAX', 'ドルビーアトモス'],
    location: { lat: 35.6812, lng: 139.6598 },
    pointsEarned: 200,
    biidPartner: true,
    pointsRate: 4
  },
  {
    id: 'store005',
    name: '新宿総合クリニック',
    category: 'health',
    rating: 4.4,
    reviews: 98,
    priceRange: 'moderate',
    distance: 1.5,
    status: 'open',
    hours: '08:30-17:30',
    phone: '03-5678-9012',
    address: '東京都新宿区西新宿4-10-11',
    features: ['wheelchair', 'parking'],
    specialties: ['内科', '外科', '小児科'],
    location: { lat: 35.6721, lng: 139.6589 },
    pointsEarned: 0,
    biidPartner: false,
    pointsRate: 0
  },
  {
    id: 'store006',
    name: 'イタリアンレストラン ベラビスタ',
    category: 'restaurant',
    rating: 4.7,
    reviews: 234,
    priceRange: 'expensive',
    distance: 1.8,
    status: 'open',
    hours: '11:30-15:00, 17:30-23:00',
    phone: '03-6789-0123',
    address: '東京都新宿区西新宿5-12-13',
    features: ['wifi'],
    specialties: ['イタリアン', 'ワイン', 'パスタ'],
    location: { lat: 35.6833, lng: 139.6731 },
    pointsEarned: 680,
    biidPartner: true,
    pointsRate: 6
  },
  {
    id: 'store007',
    name: 'スポーツジムFITNESS+',
    category: 'service',
    rating: 4.2,
    reviews: 445,
    priceRange: 'moderate',
    distance: 2.3,
    status: 'open',
    hours: '06:00-24:00',
    phone: '03-7890-1234',
    address: '東京都新宿区西新宿6-14-15',
    features: ['wheelchair', 'parking', 'wifi'],
    specialties: ['ジム', 'プール', 'ヨガ'],
    location: { lat: 35.6798, lng: 139.6445 },
    pointsEarned: 250,
    biidPartner: true,
    pointsRate: 2
  },
  {
    id: 'store008',
    name: 'ブックストア&カフェ',
    category: 'retail',
    rating: 4.5,
    reviews: 167,
    priceRange: 'budget',
    distance: 0.9,
    status: 'open',
    hours: '08:00-22:00',
    phone: '03-8901-2345',
    address: '東京都新宿区西新宿7-16-17',
    features: ['wifi'],
    specialties: ['書籍', 'カフェ', '雑誌'],
    location: { lat: 35.6756, lng: 139.6712 },
    pointsEarned: 120,
    biidPartner: true,
    pointsRate: 3
  },
  {
    id: 'store009',
    name: 'カラオケBOX サウンドステージ',
    category: 'entertainment',
    rating: 4.1,
    reviews: 678,
    priceRange: 'budget',
    distance: 2.7,
    status: 'open',
    hours: '10:00-05:00+1',
    phone: '03-9012-3456',
    address: '東京都新宿区西新宿8-18-19',
    features: ['parking', 'wifi'],
    specialties: ['カラオケ', 'パーティールーム', 'ドリンクバー'],
    location: { lat: 35.6689, lng: 139.6534 },
    pointsEarned: 180,
    biidPartner: true,
    pointsRate: 4
  },
  {
    id: 'store010',
    name: '学習塾アカデミア',
    category: 'education',
    rating: 4.6,
    reviews: 123,
    priceRange: 'moderate',
    distance: 1.4,
    status: 'closed',
    hours: '14:00-22:00',
    phone: '03-0123-4567',
    address: '東京都新宿区西新宿9-20-21',
    features: ['wifi'],
    specialties: ['小学生', '中学生', '高校生'],
    location: { lat: 35.6634, lng: 139.6789 },
    pointsEarned: 0,
    biidPartner: false,
    pointsRate: 0
  },
  {
    id: 'store011',
    name: 'ラーメン横丁 麺屋',
    category: 'restaurant',
    rating: 4.4,
    reviews: 456,
    priceRange: 'budget',
    distance: 1.1,
    status: 'open',
    hours: '11:00-02:00+1',
    phone: '03-1234-0987',
    address: '東京都新宿区西新宿10-22-23',
    features: [],
    specialties: ['ラーメン', '餃子', 'チャーハン'],
    location: { lat: 35.6723, lng: 139.6656 },
    pointsEarned: 95,
    biidPartner: true,
    pointsRate: 5
  },
  {
    id: 'store012',
    name: 'ドラッグストア メディカル',
    category: 'health',
    rating: 4.0,
    reviews: 89,
    priceRange: 'budget',
    distance: 0.7,
    status: 'open',
    hours: '09:00-23:00',
    phone: '03-2345-1098',
    address: '東京都新宿区西新宿11-24-25',
    features: ['wheelchair'],
    specialties: ['薬品', '日用品', '化粧品'],
    location: { lat: 35.6790, lng: 139.6523 },
    pointsEarned: 0,
    biidPartner: false,
    pointsRate: 0
  }
];

export const categoryNames = {
  restaurant: 'レストラン・飲食店',
  retail: '小売・ショッピング',
  service: 'サービス・美容',
  entertainment: 'エンターテイメント',
  health: '医療・健康',
  education: '教育・学習'
};

export const categoryIcons = {
  restaurant: 'utensils',
  retail: 'shopping-bag',
  service: 'spa',
  entertainment: 'theater-masks',
  health: 'stethoscope',
  education: 'graduation-cap'
};

export const priceRangeNames = {
  budget: 'リーズナブル (￥)',
  moderate: '普通 (￥￥)',
  expensive: '高級 (￥￥￥)',
  luxury: '最高級 (￥￥￥￥)'
};
