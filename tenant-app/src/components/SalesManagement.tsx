import React, { useState } from 'react';
import { mockSalesTransactions, type SalesTransaction } from '../data/mockTenantData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, ShoppingCart, Download, Eye } from 'lucide-react';

const SalesManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState<SalesTransaction[]>(mockSalesTransactions);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredTransactions(mockSalesTransactions);
    } else {
      const filtered = mockSalesTransactions.filter(transaction =>
        transaction.customerName.toLowerCase().includes(term.toLowerCase()) ||
        transaction.transactionId.toLowerCase().includes(term.toLowerCase()) ||
        transaction.customerEmail.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredTransactions(filtered);
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
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">完了</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">処理中</Badge>;
      case 'refunded':
        return <Badge variant="destructive">返金済み</Badge>;
      default:
        return <Badge variant="secondary">不明</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case 'credit':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">クレジット</Badge>;
      case 'cash':
        return <Badge variant="outline" className="bg-green-50 text-green-700">現金</Badge>;
      case 'digital':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700">デジタル</Badge>;
      default:
        return <Badge variant="outline">その他</Badge>;
    }
  };

  const totalSales = filteredTransactions
    .filter(transaction => transaction.status === 'completed')
    .reduce((sum, transaction) => sum + transaction.purchaseAmount, 0);

  const totalPoints = filteredTransactions
    .filter(transaction => transaction.status === 'completed')
    .reduce((sum, transaction) => sum + transaction.pointsIssued, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">売上管理</h1>
          <p className="text-gray-600">取引履歴とポイント発行状況</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>CSV出力</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>取引検索</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="顧客名、取引ID、メールアドレスで検索..."
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">総売上金額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalSales)}
            </div>
            <p className="text-xs text-gray-500">完了済み取引のみ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">発行ポイント数</CardTitle>
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
              {filteredTransactions.length} 件
            </div>
            <p className="text-xs text-gray-500">検索結果</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>取引履歴 ({filteredTransactions.length}件)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">取引ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">顧客名</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">購入金額</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">発行ポイント</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">決済方法</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">取引日時</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ステータス</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-gray-600">
                        {transaction.transactionId}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{transaction.customerName}</div>
                      <div className="text-sm text-gray-500">{transaction.customerEmail}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-green-600">
                        {formatCurrency(transaction.purchaseAmount)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-blue-600">
                        {formatNumber(transaction.pointsIssued)} pt
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {getPaymentMethodBadge(transaction.paymentMethod)}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {formatDate(transaction.transactionDate)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          詳細
                        </Button>
                        {transaction.receiptGenerated && (
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

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              検索条件に一致する取引履歴が見つかりませんでした。
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-gray-500">
        ※ 取引データはFirestoreから取得予定。現在はモックデータを表示しています。
        <br />
        ※ GMO決済システムとの連携により、リアルタイムで取引ステータスが更新されます。
      </div>
    </div>
  );
};

export default SalesManagement;
