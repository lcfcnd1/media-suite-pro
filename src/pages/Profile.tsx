/**
 * Profile Page
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Key, Monitor, AlertTriangle, LogOut, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { format } from 'date-fns';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
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
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <User className="h-6 w-6 text-primary" />
          </div>
          {t.profile.title}
        </h1>
        <p className="text-muted-foreground">{t.profile.subtitle}</p>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl border border-border bg-card shadow-card p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {user ? getInitials(user.fullName) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-card-foreground">{user?.fullName}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
              <Calendar className="h-4 w-4" />
              {t.profile.memberSince} {user?.createdAt ? format(user.createdAt, 'MMMM yyyy') : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <ProfileSection
        icon={User}
        title={t.profile.personalInfo}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t.auth.fullName}</Label>
            <Input id="fullName" defaultValue={user?.fullName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.auth.email}</Label>
            <Input id="email" type="email" defaultValue={user?.email} disabled />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => toast.success('Profile updated!')}>
            {t.common.save}
          </Button>
        </div>
      </ProfileSection>

      {/* Security */}
      <ProfileSection
        icon={Shield}
        title={t.profile.security}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-card-foreground">{t.profile.changePassword}</p>
                <p className="text-sm text-muted-foreground">Update your password</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-card-foreground">{t.profile.twoFactor}</p>
                <p className="text-sm text-muted-foreground">{t.profile.twoFactorDescription}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-card-foreground">{t.profile.sessions}</p>
                <p className="text-sm text-muted-foreground">{t.profile.sessionsDescription}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">View</Button>
          </div>
        </div>
      </ProfileSection>

      {/* Danger Zone */}
      <ProfileSection
        icon={AlertTriangle}
        title={t.profile.dangerZone}
        variant="destructive"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-destructive" />
              <div>
                <p className="font-medium text-card-foreground">{t.auth.logout}</p>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              {t.auth.logout}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="font-medium text-card-foreground">{t.profile.deleteAccount}</p>
                <p className="text-sm text-muted-foreground">{t.profile.deleteAccountDescription}</p>
              </div>
            </div>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </div>
      </ProfileSection>
    </div>
  );
};

interface ProfileSectionProps {
  icon: React.ElementType;
  title: string;
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ icon: Icon, title, variant = 'default', children }) => {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`rounded-lg p-2.5 ${variant === 'destructive' ? 'bg-destructive/10' : 'bg-primary/10'}`}>
          <Icon className={`h-5 w-5 ${variant === 'destructive' ? 'text-destructive' : 'text-primary'}`} />
        </div>
        <h3 className="font-semibold text-card-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default Profile;
