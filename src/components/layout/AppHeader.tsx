/**
 * App Header - Top navigation bar for the dashboard
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, Monitor, Globe, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface AppHeaderProps {
  onMenuClick: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success(t.auth.logoutSuccess);
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{language.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                🇺🇸 English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')} className={language === 'es' ? 'bg-accent' : ''}>
                🇪🇸 Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === 'light' && <Sun className="h-4 w-4" />}
                {theme === 'dark' && <Moon className="h-4 w-4" />}
                {theme === 'system' && <Monitor className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')} className={theme === 'light' ? 'bg-accent' : ''}>
                <Sun className="h-4 w-4 mr-2" />
                {t.settings.themeLight}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className={theme === 'dark' ? 'bg-accent' : ''}>
                <Moon className="h-4 w-4 mr-2" />
                {t.settings.themeDark}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className={theme === 'system' ? 'bg-accent' : ''}>
                <Monitor className="h-4 w-4 mr-2" />
                {t.settings.themeSystem}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2 pr-3">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user ? getInitials(user.fullName) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline font-medium">{user?.fullName}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                <User className="h-4 w-4 mr-2" />
                {t.nav.profile}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                <Menu className="h-4 w-4 mr-2" />
                {t.nav.settings}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                {t.auth.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
