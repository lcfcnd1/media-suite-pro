/**
 * Dashboard Home Page
 */

import React from 'react';
import { Download, Video, Music, HardDrive, Activity, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatCard } from '@/components/ui/stat-card';
import { getMockStats, getMockActivity, ActivityItem } from '@/services/mockDownloadService';
import { formatDistanceToNow } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const stats = getMockStats();
  const activity = getMockActivity();

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">
          {t.dashboard.welcome}, {user?.fullName?.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground">{t.dashboard.overview}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t.dashboard.totalDownloads}
          value={stats.totalDownloads}
          icon={Download}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title={t.dashboard.videosDownloaded}
          value={stats.videosDownloaded}
          icon={Video}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title={t.dashboard.musicDownloaded}
          value={stats.musicDownloaded}
          icon={Music}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title={t.dashboard.storageUsed}
          value={stats.storageUsed}
          icon={HardDrive}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-card">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">{t.dashboard.recentActivity}</h2>
          </div>
          <div className="divide-y divide-border">
            {activity.length > 0 ? (
              activity.map((item: ActivityItem) => (
                <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                  <div className={`rounded-lg p-2 ${item.type === 'video' ? 'bg-blue-500/10' : 'bg-pink-500/10'}`}>
                    {item.type === 'video' ? (
                      <Video className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Music className="h-5 w-5 text-pink-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.format} • {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  <div>
                    {item.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <Activity className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">{t.dashboard.noActivity}</p>
                <p className="text-sm text-muted-foreground/70">{t.dashboard.activityDescription}</p>
              </div>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">{t.dashboard.systemStatus}</h2>
          </div>
          <div className="p-6 space-y-4">
            <StatusItem 
              label={t.dashboard.serverStatus} 
              status="online" 
              statusText={t.dashboard.online} 
            />
            <StatusItem 
              label="API" 
              status="online" 
              statusText={t.dashboard.online} 
            />
            <StatusItem 
              label="Download Queue" 
              status="online" 
              statusText="Ready" 
            />
            <StatusItem 
              label="Processing Engine" 
              status="online" 
              statusText="Active" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatusItemProps {
  label: string;
  status: 'online' | 'offline' | 'processing';
  statusText: string;
}

const StatusItem: React.FC<StatusItemProps> = ({ label, status, statusText }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'offline': return 'bg-destructive';
      case 'processing': return 'bg-warning';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`} />
        <span className="text-sm font-medium text-card-foreground">{statusText}</span>
      </div>
    </div>
  );
};

export default Dashboard;
