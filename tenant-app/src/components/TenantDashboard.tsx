import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { mockAnalyticsData, mockStoreProfile } from '../data/mockTenantData';
import { 
  TrendingUp, 
  ShoppingCart, 
  Award, 
  DollarSign,
  Calendar,
  Users
} from 'lucide-react';

const TenantDashboard: React.FC = () => {
  const { dailySales, monthlySummary } = mockAnalyticsData;
  const todaySales = dailySales[dailySales.length - 1];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-gray-600">{mockStoreProfile.name} - 売上・運営状況</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">最終更新</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date().toLocaleDateString('ja-JP')} {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本日の売上</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(todaySales.sales)}
            </div>
            <p className="text-xs text-muted-foreground">
              前日比 +12.5%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本日の取引件数</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatNumber(todaySales.transactions)} 件
            </div>
            <p className="text-xs text-muted-foreground">
              平均単価: {formatCurrency(todaySales.sales / todaySales.transactions)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">発行ポイント数</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatNumber(todaySales.pointsIssued)} pt
            </div>
            <p className="text-xs text-muted-foreground">
              還元率: {mockStoreProfile.pointRate}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">店舗残高</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(mockStoreProfile.balance)}
            </div>
            <p className="text-xs text-muted-foreground">
              月額利用料: {formatCurrency(mockStoreProfile.monthlyFee)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>週間売上推移</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailySales.slice(-7).map((day) => (
                <div key={day.date} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(day.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {day.transactions}件
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    {formatCurrency(day.sales)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>月間サマリー</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">総売上</span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(monthlySummary.totalSales)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">総取引件数</span>
                <span className="text-lg font-bold text-blue-600">
                  {formatNumber(monthlySummary.totalTransactions)} 件
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">発行ポイント</span>
                <span className="text-lg font-bold text-purple-600">
                  {formatNumber(monthlySummary.totalPointsIssued)} pt
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">平均取引額</span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(monthlySummary.averageTransaction)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-xs text-gray-500">
        ※ データはFirestoreから取得予定。現在はモックデータを表示しています。
        <br />
        ※ GMO決済システムとの連携により、リアルタイムで売上データが更新されます。
      </div>
    </div>
  );
};

export default TenantDashboard;
