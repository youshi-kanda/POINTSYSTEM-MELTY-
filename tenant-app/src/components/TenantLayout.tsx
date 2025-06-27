import React from 'react';
import { useTenantAuth } from '../contexts/TenantAuthContext';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Receipt, 
  CreditCard, 
  Settings, 
  LogOut,
  Store,
  User
} from 'lucide-react';

interface TenantLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const TenantLayout: React.FC<TenantLayoutProps> = ({ children, currentPage, onNavigate }) => {
  const { user, logout } = useTenantAuth();

  const menuItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
    { id: 'sales', label: '売上管理', icon: ShoppingCart },
    { id: 'receipts', label: '領収書発行', icon: Receipt },
    { id: 'payments', label: '決済履歴', icon: CreditCard },
    { id: 'settings', label: '店舗設定', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 bg-card shadow-sm min-h-screen border-r border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <Store className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">biid Store</h1>
                <p className="text-sm text-muted-foreground">店舗管理システム</p>
              </div>
            </div>
          </div>

          <nav className="mt-6">
            <div className="px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="absolute bottom-0 w-64 p-4 border-t border-border bg-card">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.storeName}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              <LogOut className="mr-3 h-4 w-4" />
              ログアウト
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default TenantLayout;
