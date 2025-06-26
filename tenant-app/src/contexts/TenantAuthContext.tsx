import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface TenantUser {
  id: string;
  name: string;
  email: string;
  storeId: string;
  storeName: string;
  role: 'store_owner' | 'store_manager';
}

interface TenantAuthContextType {
  user: TenantUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const TenantAuthContext = createContext<TenantAuthContextType | undefined>(undefined);

export const useTenantAuth = () => {
  const context = useContext(TenantAuthContext);
  if (context === undefined) {
    throw new Error('useTenantAuth must be used within a TenantAuthProvider');
  }
  return context;
};

interface TenantAuthProviderProps {
  children: ReactNode;
}

export const TenantAuthProvider: React.FC<TenantAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TenantUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'store@cafe-de-paris.jp' && password === 'storepass') {
      setUser({
        id: 'store_001',
        name: '田中 太郎',
        email: 'store@cafe-de-paris.jp',
        storeId: 'store_001',
        storeName: 'カフェ・ドゥ・パリ 新宿店',
        role: 'store_owner'
      });
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <TenantAuthContext.Provider value={value}>
      {children}
    </TenantAuthContext.Provider>
  );
};
