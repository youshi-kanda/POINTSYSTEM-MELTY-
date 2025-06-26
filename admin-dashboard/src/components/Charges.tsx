import React, { useState } from 'react';
import { mockChargeHistory, ChargeHistory } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, CreditCard, Download } from 'lucide-react';

const Charges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharges, setFilteredCharges] = useState<ChargeHistory[]>(mockChargeHistory);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredCharges(mockChargeHistory);
    } else {
      const filtered = mockChargeHistory.filter(charge =>
        charge.memberName.toLowerCase().includes(term.toLowerCase()) ||
        charge.transactionId.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCharges(filtered);
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
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">完了</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">処理中</Badge>;
      case 'failed':
        return <Badge variant="destructive">失敗</Badge>;
      default:
        return <Badge variant="secondary">不明</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    return method === 'credit' ? (
      <Badge variant="outline" className="bg-blue-50 text-blue-700">クレジット</Badge>
    ) : (
      <Badge variant="outline" className="bg-purple-50 text-purple-700">銀行振込</Badge>
    );
  };

  const totalAmount = filteredCharges
    .filter(charge => charge.status === 'completed')
    .reduce((sum, charge) => sum + charge.amount, 0);

  const totalPoints = filteredCharges
    .filter(charge => charge.status === 'completed')
    .reduce((sum, charge) => sum + charge.points, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">チャージ履歴</h1>
          <p className="text-gray-600">ポイントチャージの履歴管理</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>CSV出力</span>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>履歴検索</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="会員名または取引IDで検索..."
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">総チャージ金額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalAmount)}
            </div>
            <p className="text-xs text-gray-500">完了済み取引のみ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">総チャージポイント</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatNumber(totalPoints)} pt
            </div>
            <p className="text-xs text-gray-500">完了済み取引のみ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">取引件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {filteredCharges.length} 件
            </div>
            <p className="text-xs text-gray-500">検索結果</p>
          </CardContent>
        </Card>
      </div>

      {/* Charges Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>チャージ履歴 ({filteredCharges.length}件)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">取引ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">会員名</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">チャージ金額</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">獲得ポイント</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">決済方法</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">チャージ日</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ステータス</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredCharges.map((charge) => (
                  <tr key={charge.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-gray-600">
                        {charge.transactionId}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{charge.memberName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-green-600">
                        {formatCurrency(charge.amount)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-blue-600">
                        {formatNumber(charge.points)} pt
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {getPaymentMethodBadge(charge.paymentMethod)}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {formatDate(charge.chargeDate)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(charge.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          詳細
                        </Button>
                        {charge.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            領収書
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCharges.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              検索条件に一致するチャージ履歴が見つかりませんでした。
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-gray-500">
        {/* TODO: Firebase Firestore integration */}
        ※ チャージ履歴はFirestoreから取得予定。現在はモックデータを表示しています。
        <br />
        ※ GMO決済システムとの連携により、リアルタイムでステータスが更新されます。
      </div>
    </div>
  );
};

export default Charges;
