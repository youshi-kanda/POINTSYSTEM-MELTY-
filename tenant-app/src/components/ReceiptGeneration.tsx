import React, { useState } from 'react';
import { mockReceipts, type Receipt } from '../data/mockTenantData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Receipt as ReceiptIcon, Download, FileText, Printer } from 'lucide-react';

const ReceiptGeneration: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReceipts, setFilteredReceipts] = useState<Receipt[]>(mockReceipts);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredReceipts(mockReceipts);
    } else {
      const filtered = mockReceipts.filter(receipt =>
        receipt.customerName.toLowerCase().includes(term.toLowerCase()) ||
        receipt.receiptNumber.toLowerCase().includes(term.toLowerCase()) ||
        receipt.transactionId.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredReceipts(filtered);
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

  const handleGeneratePDF = (receiptId: string) => {
    alert(`領収書 ${receiptId} のPDFを生成しています...`);
  };

  const handlePrintReceipt = (receiptId: string) => {
    alert(`領収書 ${receiptId} を印刷しています...`);
  };

  const totalAmount = filteredReceipts.reduce((sum, receipt) => sum + receipt.total, 0);
  const totalPoints = filteredReceipts.reduce((sum, receipt) => sum + receipt.pointsIssued, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">領収書発行</h1>
          <p className="text-muted-foreground">領収書の生成・管理・PDF出力</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>一括PDF出力</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>領収書検索</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="顧客名、領収書番号、取引IDで検索..."
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
            <CardTitle className="text-sm">総領収書金額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">
              {formatCurrency(totalAmount)}
            </div>
            <p className="text-xs text-muted-foreground">検索結果の合計</p>
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
            <p className="text-xs text-muted-foreground">検索結果の合計</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">領収書件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {filteredReceipts.length} 件
            </div>
            <p className="text-xs text-muted-foreground">検索結果</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ReceiptIcon className="h-5 w-5" />
            <span>領収書一覧 ({filteredReceipts.length}件)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReceipts.map((receipt) => (
              <div key={receipt.id} className="border border-border rounded-lg p-4 hover:bg-accent/50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-foreground">{receipt.receiptNumber}</h3>
                      <Badge variant="outline" className="text-xs">
                        {receipt.transactionId}
                      </Badge>
                      {receipt.pdfGenerated && (
                        <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                          PDF生成済み
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">顧客名</p>
                        <p className="font-medium">{receipt.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">発行日時</p>
                        <p className="font-medium">{formatDate(receipt.issueDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">合計金額</p>
                        <p className="font-medium text-chart-2">{formatCurrency(receipt.total)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">発行ポイント</p>
                        <p className="font-medium text-chart-1">{formatNumber(receipt.pointsIssued)} pt</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-2">購入商品</p>
                      <div className="space-y-1">
                        {receipt.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>{formatCurrency(item.totalPrice)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleGeneratePDF(receipt.id)}
                      className="flex items-center space-x-1"
                    >
                      <FileText className="h-3 w-3" />
                      <span>PDF生成</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePrintReceipt(receipt.id)}
                      className="flex items-center space-x-1"
                    >
                      <Printer className="h-3 w-3" />
                      <span>印刷</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReceipts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              検索条件に一致する領収書が見つかりませんでした。
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground">
        ※ 領収書データはFirestoreから取得予定。現在はモックデータを表示しています。
        <br />
        ※ PDF生成機能は実装予定です。現在はデモ表示となっています。
      </div>
    </div>
  );
};

export default ReceiptGeneration;
