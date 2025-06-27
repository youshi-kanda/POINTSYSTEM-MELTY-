import React, { useState } from 'react';
import { mockMembers, Member } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, UserPlus } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const Members: React.FC = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(mockMembers);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredMembers(mockMembers);
    } else {
      const filtered = mockMembers.filter(member =>
        member.name.toLowerCase().includes(term.toLowerCase()) ||
        member.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-green-100 text-green-800">アクティブ</Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">非アクティブ</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">会員一覧</h1>
          <p className="text-gray-600">biid 会員の管理</p>
        </div>
        <Button className="flex items-center space-x-2 min-h-[44px]">
          <UserPlus className="h-4 w-4" />
          <span>新規会員追加</span>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>会員検索</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="会員名またはメールアドレスで検索..."
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

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>会員リスト ({filteredMembers.length}件)</CardTitle>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                      {getStatusBadge(member.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-gray-500">保有ポイント</span>
                        <p className="font-medium text-blue-600">{formatNumber(member.points)} pt</p>
                      </div>
                      <div>
                        <span className="text-gray-500">登録日</span>
                        <p className="font-medium">{formatDate(member.registeredDate)}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3 text-sm">
                      <span className="text-gray-500">最終ログイン</span>
                      <p className="font-medium">{formatDate(member.lastLoginDate)}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 min-h-[44px]">
                        詳細
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 min-h-[44px]">
                        編集
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">会員名</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">メールアドレス</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">保有ポイント</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">登録日</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">最終ログイン</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">ステータス</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{member.name}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{member.email}</td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-blue-600">
                          {formatNumber(member.points)} pt
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {formatDate(member.registeredDate)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {formatDate(member.lastLoginDate)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(member.status)}
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
          )}

          {filteredMembers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              検索条件に一致する会員が見つかりませんでした。
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-gray-500">
        {/* TODO: Firebase Firestore integration */}
        ※ 会員データはFirestoreから取得予定。現在はモックデータを表示しています。
      </div>
    </div>
  );
};

export default Members;
