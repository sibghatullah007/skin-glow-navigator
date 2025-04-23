import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, History, User, Settings, LogOut, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const menuItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
    },
    {
      icon: History,
      label: "History",
      href: "/history",
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
    },
    {
      icon: FileText,
      label: "Blogs",
      href: "/blogs",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-10 px-2 py-2 md:left-0 md:top-0 md:bottom-0 md:w-16 md:h-screen md:border-r md:border-t-0">
      <div className="flex justify-around md:flex-col md:gap-8 md:items-center md:justify-start md:mt-8">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.href} 
            className={`p-2 rounded-md hover:bg-accent ${location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'}`}>
            {item.icon}
          </Link>
        ))}
        
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
