import React, { useState } from 'react';
import { mockSalesTransactions, type SalesTransaction } from '../data/mockTenantData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, ShoppingCart, Download, Eye } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const SalesManagement: React.FC = () => {
  const isMobile = useIsMobile();
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
        return <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">完了</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">処理中</Badge>;
      case 'refunded':
        return <Badge variant="destructive">返金済み</Badge>;
      default:
        return <Badge variant="secondary">不明</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case 'credit':
        return <Badge variant="outline" className="bg-chart-1/10 text-chart-1">クレジット</Badge>;
      case 'cash':
        return <Badge variant="outline" className="bg-chart-2/10 text-chart-2">現金</Badge>;
      case 'digital':
        return <Badge variant="outline" className="bg-chart-5/10 text-chart-5">デジタル</Badge>;
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
          <h1 className="text-2xl font-bold text-foreground">売上管理</h1>
          <p className="text-muted-foreground">取引履歴とポイント発行状況</p>
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
            <Button variant="outline" className="min-h-[44px]">
              検索
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">総売上金額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">
              {formatCurrency(totalSales)}
            </div>
            <p className="text-xs text-muted-foreground">完了済み取引のみ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">発行ポイント数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">
              {formatNumber(totalPoints)} pt
            </div>
            <p className="text-xs text-muted-foreground">完了済み取引のみ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">取引件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {filteredTransactions.length} 件
            </div>
            <p className="text-xs text-muted-foreground">検索結果</p>
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
          {isMobile ? (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <Card key={transaction.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-foreground">{transaction.customerName}</h3>
                        <p className="text-sm text-muted-foreground">{transaction.customerEmail}</p>
                        <p className="text-sm text-muted-foreground font-mono">{transaction.transactionId}</p>
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">購入金額</span>
                        <p className="font-medium text-chart-2">{formatCurrency(transaction.purchaseAmount)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">発行ポイント</span>
                        <p className="font-medium text-chart-1">{formatNumber(transaction.pointsIssued)} pt</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">決済方法</span>
                        <div className="mt-1">{getPaymentMethodBadge(transaction.paymentMethod)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">取引日時</span>
                        <p className="font-medium">{formatDate(transaction.transactionDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 min-h-[44px]">
                        <Eye className="h-3 w-3 mr-1" />
                        詳細
                      </Button>
                      {transaction.receiptGenerated && (
                        <Button variant="outline" size="sm" className="flex-1 min-h-[44px]">
                          領収書
                        </Button>
                      )}
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
                    <th className="text-left py-3 px-4 font-medium text-foreground">取引ID</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">顧客名</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">購入金額</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">発行ポイント</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">決済方法</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">取引日時</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">ステータス</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-border hover:bg-accent/50">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-muted-foreground">
                          {transaction.transactionId}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-foreground">{transaction.customerName}</div>
                        <div className="text-sm text-muted-foreground">{transaction.customerEmail}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-chart-2">
                          {formatCurrency(transaction.purchaseAmount)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-chart-1">
                          {formatNumber(transaction.pointsIssued)} pt
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {getPaymentMethodBadge(transaction.paymentMethod)}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
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
          )}

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              検索条件に一致する取引履歴が見つかりませんでした。
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground">
        ※ 取引データはFirestoreから取得予定。現在はモックデータを表示しています。
        <br />
        ※ GMO決済システムとの連携により、リアルタイムで取引ステータスが更新されます。
      </div>
    </div>
  );
};

export default SalesManagement;
