import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import keycloak from '@/lib/keycloak';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | undefined;
  username: string | undefined;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
          checkLoginIframe: false,
        });

        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          setToken(keycloak.token);
          setUsername(keycloak.tokenParsed?.preferred_username);
        }

        // Token refresh
        setInterval(() => {
          keycloak.updateToken(70).catch(() => {
            console.log('Failed to refresh token');
          });
        }, 60000);

      } catch (error) {
        console.error('Keycloak initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initKeycloak();
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
