/**
 * Settings Page
 */

import React from 'react';
import { Settings as SettingsIcon, Globe, Palette, Key, Bell } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    toast.success(t.settings.saved);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <SettingsIcon className="h-6 w-6 text-primary" />
          </div>
          {t.settings.title}
        </h1>
        <p className="text-muted-foreground">{t.settings.subtitle}</p>
      </div>

      {/* Settings sections */}
      <div className="space-y-6">
        {/* Language */}
        <SettingsCard
          icon={Globe}
          title={t.settings.language}
          description={t.settings.languageDescription}
        >
          <Select value={language} onValueChange={(val) => setLanguage(val as 'en' | 'es')}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 English</SelectItem>
              <SelectItem value="es">🇪🇸 Español</SelectItem>
            </SelectContent>
          </Select>
        </SettingsCard>

        {/* Theme */}
        <SettingsCard
          icon={Palette}
          title={t.settings.theme}
          description={t.settings.themeDescription}
        >
          <Select value={theme} onValueChange={(val) => setTheme(val as 'light' | 'dark' | 'system')}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">☀️ {t.settings.themeLight}</SelectItem>
              <SelectItem value="dark">🌙 {t.settings.themeDark}</SelectItem>
              <SelectItem value="system">💻 {t.settings.themeSystem}</SelectItem>
            </SelectContent>
          </Select>
        </SettingsCard>

        {/* Notifications */}
        <SettingsCard
          icon={Bell}
          title={t.settings.notifications}
          description={t.settings.notificationsDescription}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="download-complete">Download completed</Label>
              <Switch id="download-complete" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="download-error">Download errors</Label>
              <Switch id="download-error" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="updates">App updates</Label>
              <Switch id="updates" defaultChecked />
            </div>
          </div>
        </SettingsCard>

        {/* API Keys */}
        <SettingsCard
          icon={Key}
          title={t.settings.apiKeys}
          description={t.settings.apiKeysDescription}
        >
          <div className="rounded-lg bg-muted/50 border border-border p-6 text-center">
            <Key className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">
              {t.settings.apiKeysPlaceholder}
            </p>
          </div>
        </SettingsCard>
      </div>

      {/* Save button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} size="lg">
          {t.common.save}
        </Button>
      </div>
    </div>
  );
};

interface SettingsCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-primary/10 p-2.5 flex-shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-semibold text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
