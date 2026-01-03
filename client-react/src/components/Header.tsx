import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, LogIn, LogOut, User } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, username, login, logout, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-elegant">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-semibold text-foreground">
              E-Learning
            </h1>
            <p className="text-xs text-muted-foreground">Gestion des cours</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
          ) : isAuthenticated ? (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">{username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </>
          ) : (
            <Button onClick={login} className="gap-2 shadow-elegant">
              <LogIn className="h-4 w-4" />
              Connexion
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
