import React, { useState } from 'react';
import { mockPaymentRecords, type PaymentRecord } from '../data/mockTenantData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, CreditCard, Download, AlertCircle } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const PaymentHistory: React.FC = () => {
  const isMobile = useIsMobile();
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
        return <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">完了</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">処理中</Badge>;
      case 'failed':
        return <Badge variant="destructive">失敗</Badge>;
      default:
        return <Badge variant="secondary">不明</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case 'gmo_credit':
        return <Badge variant="outline" className="bg-chart-1/10 text-chart-1">GMOクレジット</Badge>;
      case 'bank_transfer':
        return <Badge variant="outline" className="bg-chart-2/10 text-chart-2">銀行振込</Badge>;
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
          <h1 className="text-2xl font-bold text-foreground">決済履歴</h1>
          <p className="text-muted-foreground">GMO決済システム連携・手数料管理</p>
        </div>
        <Button className="flex items-center space-x-2 min-h-[44px]">
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
            <Button variant="outline" className="min-h-[44px]">
              検索
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">総決済金額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">
              {formatCurrency(totalAmount)}
            </div>
            <p className="text-xs text-muted-foreground">完了済み決済のみ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">総手数料</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">
              {formatCurrency(totalFees)}
            </div>
            <p className="text-xs text-muted-foreground">2% + ¥600</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">純受取金額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">
              {formatCurrency(totalNet)}
            </div>
            <p className="text-xs text-muted-foreground">手数料差引後</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">決済件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {filteredPayments.length} 件
            </div>
            <p className="text-xs text-muted-foreground">検索結果</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-chart-4/20 bg-chart-4/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-chart-4">
            <AlertCircle className="h-5 w-5" />
            <span>手数料について</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-chart-4">
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
          {isMobile ? (
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <Card key={payment.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-foreground">{payment.description}</h3>
                        <p className="text-sm text-muted-foreground font-mono">{payment.paymentId}</p>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">決済金額</span>
                        <p className="font-medium text-chart-2">{formatCurrency(payment.amount)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">手数料</span>
                        <p className="font-medium text-chart-3">-{formatCurrency(payment.fee)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">純受取額</span>
                        <p className="font-medium text-chart-1">{formatCurrency(payment.netAmount)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">決済日</span>
                        <p className="font-medium">{formatDate(payment.paymentDate)}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3 text-sm">
                      <span className="text-muted-foreground">決済方法</span>
                      <div className="mt-1">{getPaymentMethodBadge(payment.paymentMethod)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">決済ID</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">決済金額</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">手数料</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">純受取額</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">決済方法</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">決済日</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">ステータス</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">説明</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-border hover:bg-accent/50">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-muted-foreground">
                          {payment.paymentId}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-chart-2">
                          {formatCurrency(payment.amount)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-chart-3">
                          -{formatCurrency(payment.fee)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-chart-1">
                          {formatCurrency(payment.netAmount)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {getPaymentMethodBadge(payment.paymentMethod)}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {formatDate(payment.paymentDate)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {payment.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredPayments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              検索条件に一致する決済履歴が見つかりませんでした。
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground">
        ※ 決済データはGMOシステムから取得予定。現在はモックデータを表示しています。
        <br />
        ※ 手数料は決済完了時に自動計算され、リアルタイムで反映されます。
      </div>
    </div>
  );
};

export default PaymentHistory;
