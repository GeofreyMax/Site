import { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin_session');
    if (stored) {
      const { user } = JSON.parse(stored);
      setUsername(user);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (user: string, pass: string): Promise<boolean> => {
    // Simple hardcoded credentials for demo
    // Username: admin, Password: 1122
    if (user === 'admin' && pass === '1122') {
      localStorage.setItem('admin_session', JSON.stringify({ user, timestamp: Date.now() }));
      setUsername(user);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_session');
    setUsername(null);
    setIsLoggedIn(false);
  };

  return (
    <AdminContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
