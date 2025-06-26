import React, { useState } from 'react';
import { mockStoreProfile } from '../data/mockTenantData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Settings, 
  Store, 
  CreditCard, 
  Award, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  Save
} from 'lucide-react';

const StoreSettings: React.FC = () => {
  const [storeData, setStoreData] = useState(mockStoreProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert('店舗設定を保存しました。');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">稼働中</Badge>;
      case 'suspended':
        return <Badge variant="destructive">停止中</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">審査中</Badge>;
      default:
        return <Badge variant="secondary">不明</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">店舗設定</h1>
          <p className="text-gray-600">店舗情報・ポイント設定・決済情報の管理</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                キャンセル
              </Button>
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>保存</span>
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>編集</span>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="h-5 w-5" />
              <span>基本情報</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                店舗名
              </label>
              <Input
                value={storeData.name}
                onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                オーナー名
              </label>
              <Input
                value={storeData.ownerName}
                onChange={(e) => setStoreData({...storeData, ownerName: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={storeData.email}
                  onChange={(e) => setStoreData({...storeData, email: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                電話番号
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={storeData.phone}
                  onChange={(e) => setStoreData({...storeData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                住所
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  value={storeData.address}
                  onChange={(e) => setStoreData({...storeData, address: e.target.value})}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>ポイント設定</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ポイント還元率 (%)
              </label>
              <Input
                type="number"
                value={storeData.pointRate}
                onChange={(e) => setStoreData({...storeData, pointRate: parseInt(e.target.value)})}
                disabled={!isEditing}
                min="1"
                max="20"
              />
              <p className="text-xs text-gray-500 mt-1">
                1% ～ 20% の範囲で設定可能です
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  店舗ステータス
                </label>
                <div className="mt-2">
                  {getStatusBadge(storeData.status)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  登録日
                </label>
                <p className="text-sm text-gray-600 mt-2">
                  {formatDate(storeData.registrationDate)}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">ポイント発行について</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 購入金額の{storeData.pointRate}%がポイントとして発行されます</li>
                <li>• ポイントは即座に顧客アカウントに反映されます</li>
                <li>• 残高不足時は自動的にポイント発行が停止されます</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>決済・料金情報</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  現在残高
                </label>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(storeData.balance)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  月額利用料
                </label>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(storeData.monthlyFee)}
                </p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">決済手数料について</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• GMOクレジット決済: 2% + ¥600</li>
                <li>• 銀行振込: ¥600 (固定手数料)</li>
                <li>• 月額利用料: 毎月1日自動引き落とし</li>
              </ul>
            </div>

            <div>
              <Button variant="outline" className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                クレジットカード情報を更新
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>営業時間設定</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  開店時間
                </label>
                <Input
                  type="time"
                  defaultValue="09:00"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  閉店時間
                </label>
                <Input
                  type="time"
                  defaultValue="21:00"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                定休日
              </label>
              <div className="grid grid-cols-7 gap-2">
                {['月', '火', '水', '木', '金', '土', '日'].map((day) => (
                  <label key={day} className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      disabled={!isEditing}
                      className="mr-1"
                    />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-xs text-gray-500">
        ※ 店舗設定はFirestoreに保存予定。現在はモックデータを表示しています。
        <br />
        ※ クレジットカード情報の変更はGMO決済システムと連携して処理されます。
      </div>
    </div>
  );
};

export default StoreSettings;
