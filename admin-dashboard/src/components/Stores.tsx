import React, { useState } from 'react';
import { mockStores, Store } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Store as StoreIcon, Plus } from 'lucide-react';

const Stores: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStores, setFilteredStores] = useState<Store[]>(mockStores);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredStores(mockStores);
    } else {
      const filtered = mockStores.filter(store =>
        store.name.toLowerCase().includes(term.toLowerCase()) ||
        store.ownerName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredStores(filtered);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-green-100 text-green-800">営業中</Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">休業中</Badge>
    );
  };

  const getUsageBadge = (usage: string) => {
    switch (usage) {
      case 'high':
        return <Badge variant="default" className="bg-red-100 text-red-800">高</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">中</Badge>;
      case 'low':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">低</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">店舗管理</h1>
          <p className="text-gray-600">加盟店舗の管理と利用状況</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>新規店舗追加</span>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>店舗検索</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="店舗名または運営者名で検索..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              検索
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stores Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <StoreIcon className="h-5 w-5" />
            <span>店舗リスト ({filteredStores.length}件)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">店舗名</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">運営者</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">登録日</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">総売上</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">発行ポイント</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">利用状況</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ステータス</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredStores.map((store) => (
                  <tr key={store.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{store.name}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{store.ownerName}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {formatDate(store.registeredDate)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-green-600">
                        {formatCurrency(store.totalSales)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-blue-600">
                        {formatNumber(store.pointsIssued)} pt
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {getUsageBadge(store.usageStatus)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(store.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          詳細
                        </Button>
                        <Button variant="outline" size="sm">
                          編集
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              検索条件に一致する店舗が見つかりませんでした。
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">総売上</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(mockStores.reduce((sum, store) => sum + store.totalSales, 0))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">発行ポイント総数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatNumber(mockStores.reduce((sum, store) => sum + store.pointsIssued, 0))} pt
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">アクティブ店舗</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {mockStores.filter(store => store.status === 'active').length} / {mockStores.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-xs text-gray-500">
        {/* TODO: Firebase Firestore integration */}
        ※ 店舗データはFirestoreから取得予定。現在はモックデータを表示しています。
      </div>
    </div>
  );
};

export default Stores;
