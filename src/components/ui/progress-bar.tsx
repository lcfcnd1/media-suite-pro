/**
 * Enhanced Progress Bar Component
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  status?: 'idle' | 'processing' | 'downloading' | 'completed' | 'error';
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  status = 'idle',
  showLabel = true,
  className,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'processing':
      case 'downloading':
        return 'bg-primary';
      case 'completed':
        return 'bg-success';
      case 'error':
        return 'bg-destructive';
      default:
        return 'bg-muted-foreground';
    }
  };

  const isIndeterminate = status === 'processing' && value < 15;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        {isIndeterminate ? (
          <div className={cn(
            'h-full w-1/4 rounded-full animate-progress-indeterminate',
            getStatusColor()
          )} />
        ) : (
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-out',
              getStatusColor()
            )}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        )}
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="capitalize">{status}</span>
          <span>{value}%</span>
        </div>
      )}
    </div>
  );
};
