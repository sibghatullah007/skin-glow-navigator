
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, History, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-10 px-2 py-2 md:left-0 md:top-0 md:bottom-0 md:w-16 md:h-screen md:border-r md:border-t-0">
      <div className="flex justify-around md:flex-col md:gap-8 md:items-center md:justify-start md:mt-8">
        <Link 
          to="/" 
          className={`p-2 rounded-md hover:bg-accent ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
          <Home className="w-5 h-5 mx-auto" />
        </Link>
        
        <Link 
          to="/history" 
          className={`p-2 rounded-md hover:bg-accent ${location.pathname === '/history' ? 'text-primary' : 'text-muted-foreground'}`}>
          <History className="w-5 h-5 mx-auto" />
        </Link>
        
        <Link 
          to="/profile" 
          className={`p-2 rounded-md hover:bg-accent ${location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'}`}>
          <User className="w-5 h-5 mx-auto" />
        </Link>
        
        <Link 
          to="/settings" 
          className={`p-2 rounded-md hover:bg-accent ${location.pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'}`}>
          <Settings className="w-5 h-5 mx-auto" />
        </Link>
        
        <button 
          onClick={logout} 
          className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-destructive">
          <LogOut className="w-5 h-5 mx-auto" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
