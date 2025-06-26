import React, { useState } from 'react';
import { mockPaymentRecords, type PaymentRecord } from '../data/mockTenantData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, CreditCard, Download, AlertCircle } from 'lucide-react';

const PaymentHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPayments, setFilteredPayments] = useState<PaymentRecord[]>(mockPaymentRecords);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredPayments(mockPaymentRecords);
    } else {
      const filtered = mockPaymentRecords.filter(payment =>
        payment.paymentId.toLowerCase().includes(term.toLowerCase()) ||
        payment.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPayments(filtered);
    }
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
    switch (method) {
      case 'gmo_credit':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">GMOクレジット</Badge>;
      case 'bank_transfer':
        return <Badge variant="outline" className="bg-green-50 text-green-700">銀行振込</Badge>;
      default:
        return <Badge variant="outline">その他</Badge>;
    }
  };

  const totalAmount = filteredPayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const totalFees = filteredPayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.fee, 0);

  const totalNet = filteredPayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.netAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">決済履歴</h1>
          <p className="text-gray-600">GMO決済システム連携・手数料管理</p>
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
            <span>決済検索</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="決済ID、説明で検索..."
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">総決済金額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalAmount)}
            </div>
            <p className="text-xs text-gray-500">完了済み決済のみ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">総手数料</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalFees)}
            </div>
            <p className="text-xs text-gray-500">2% + ¥600</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">純受取金額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalNet)}
            </div>
            <p className="text-xs text-gray-500">手数料差引後</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">決済件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {filteredPayments.length} 件
            </div>
            <p className="text-xs text-gray-500">検索結果</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <AlertCircle className="h-5 w-5" />
            <span>手数料について</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-orange-700">
            <p>• GMOクレジット決済: 2% + ¥600 (固定手数料)</p>
            <p>• 銀行振込: ¥600 (固定手数料)</p>
            <p>• 月額利用料: ¥3,300 (毎月1日自動引き落とし)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>決済履歴 ({filteredPayments.length}件)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">決済ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">決済金額</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">手数料</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">純受取額</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">決済方法</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">決済日</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ステータス</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">説明</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-gray-600">
                        {payment.paymentId}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-green-600">
                        {formatCurrency(payment.amount)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-red-600">
                        -{formatCurrency(payment.fee)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-blue-600">
                        {formatCurrency(payment.netAmount)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {getPaymentMethodBadge(payment.paymentMethod)}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {payment.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              検索条件に一致する決済履歴が見つかりませんでした。
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-gray-500">
        ※ 決済データはGMOシステムから取得予定。現在はモックデータを表示しています。
        <br />
        ※ 手数料は決済完了時に自動計算され、リアルタイムで反映されます。
      </div>
    </div>
  );
};

export default PaymentHistory;
