import React, { useState } from 'react';
import { useTenantAuth } from '../contexts/TenantAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Store, Lock, Mail } from 'lucide-react';

const TenantLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useTenantAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('メールアドレスまたはパスワードが正しくありません。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Store className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            店舗管理システム
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            biid ポイントシステム - テナント管理画面
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">ログイン</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="store@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  パスワード
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワードを入力"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'ログイン中...' : 'ログイン'}
              </Button>
            </form>

            <div className="mt-6 text-xs text-gray-500 text-center">
              <p>デモ用ログイン情報:</p>
              <p>メール: store@cafe-de-paris.jp</p>
              <p>パスワード: storepass</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantLogin;
