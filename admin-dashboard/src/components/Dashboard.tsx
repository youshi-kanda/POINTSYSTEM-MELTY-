import React from 'react';
import { dashboardSummary } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Users, Store, CreditCard, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-gray-600">biid ポイントシステムの概要</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総会員数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(dashboardSummary.totalMembers)}</div>
            <p className="text-xs text-muted-foreground">
              アクティブ: {dashboardSummary.activeMembers}名
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">加盟店数</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(dashboardSummary.totalStores)}</div>
            <p className="text-xs text-muted-foreground">
              アクティブ: {dashboardSummary.activeStores}店舗
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">発行ポイント総数</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(dashboardSummary.totalPointsIssued)}</div>
            <p className="text-xs text-muted-foreground">
              累計発行ポイント
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総売上</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(dashboardSummary.totalSales)}</div>
            <p className="text-xs text-muted-foreground">
              加盟店合計売上
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>最近のチャージ履歴</CardTitle>
            <CardDescription>直近5件のポイントチャージ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardSummary.recentCharges.map((charge) => (
                <div key={charge.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{charge.memberName}</p>
                    <p className="text-xs text-gray-500">{charge.chargeDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(charge.amount)}</p>
                    <p className="text-xs text-gray-500">{formatNumber(charge.points)}pt</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>システム概要</CardTitle>
            <CardDescription>biid ポイントシステムについて</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">手数料率:</span>
                <span className="font-medium">10% (チャージ時)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">決済手数料:</span>
                <span className="font-medium">2% + ¥600</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ポイント還元率:</span>
                <span className="font-medium">店舗設定による</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">決済方法:</span>
                <span className="font-medium">GMO決済</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                {/* TODO: Firebase Firestore integration */}
                ※ データはFirestoreから取得予定
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
