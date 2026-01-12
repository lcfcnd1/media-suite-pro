/**
 * Video Downloader Page
 */

import React, { useState, useCallback } from 'react';
import { Video, Download, Link as LinkIcon, Clock, HardDrive, Film } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProgressBar } from '@/components/ui/progress-bar';
import { toast } from 'sonner';
import { 
  fetchVideoInfo, 
  downloadVideo, 
  VideoInfo, 
  DownloadProgress 
} from '@/services/mockDownloadService';

const VideoDownloader: React.FC = () => {
  const { t } = useLanguage();
  
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('1080p');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [progress, setProgress] = useState<DownloadProgress>({ 
    status: 'idle', 
    progress: 0, 
    message: '' 
  });
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchInfo = useCallback(async () => {
    if (!url.trim()) {
      toast.error(t.videoDownloader.invalidUrl);
      return;
    }

    setIsFetching(true);
    const info = await fetchVideoInfo(url);
    setIsFetching(false);

    if (info) {
      setVideoInfo(info);
    } else {
      toast.error(t.videoDownloader.invalidUrl);
    }
  }, [url, t]);

  const handleDownload = useCallback(async () => {
    if (!url.trim()) {
      toast.error(t.videoDownloader.invalidUrl);
      return;
    }

    const success = await downloadVideo(url, quality, setProgress);

    if (success) {
      toast.success(t.videoDownloader.completed);
    } else {
      toast.error(t.videoDownloader.error);
    }
  }, [url, quality, t]);

  const isDownloading = progress.status === 'processing' || progress.status === 'downloading';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <Video className="h-6 w-6 text-blue-500" />
          </div>
          {t.videoDownloader.title}
        </h1>
        <p className="text-muted-foreground">{t.videoDownloader.subtitle}</p>
      </div>

      {/* Main form card */}
      <div className="rounded-xl border border-border bg-card shadow-card p-6 space-y-6">
        {/* URL Input */}
        <div className="space-y-2">
          <Label htmlFor="url" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Video URL
          </Label>
          <div className="flex gap-2">
            <Input
              id="url"
              type="url"
              placeholder={t.videoDownloader.urlPlaceholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isDownloading}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              onClick={handleFetchInfo}
              disabled={isFetching || isDownloading}
            >
              {isFetching ? 'Loading...' : 'Fetch'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {t.videoDownloader.supportedPlatforms}
          </p>
        </div>

        {/* Video preview (if fetched) */}
        {videoInfo && (
          <div className="rounded-lg border border-border bg-muted/50 p-4 animate-fade-in">
            <div className="flex gap-4">
              <img 
                src={videoInfo.thumbnail} 
                alt={videoInfo.title}
                className="w-40 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-card-foreground line-clamp-2">{videoInfo.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {videoInfo.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Film className="h-4 w-4" />
                    {videoInfo.platform}
                  </span>
                  <span>{videoInfo.author}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quality selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t.videoDownloader.quality}</Label>
            <Select value={quality} onValueChange={setQuality} disabled={isDownloading}>
              <SelectTrigger>
                <SelectValue placeholder={t.videoDownloader.selectQuality} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                <SelectItem value="720p">720p (HD)</SelectItem>
                <SelectItem value="480p">480p (SD)</SelectItem>
                <SelectItem value="360p">360p (Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t.videoDownloader.format}</Label>
            <Select defaultValue="mp4" disabled={isDownloading}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp4">MP4</SelectItem>
                <SelectItem value="webm">WebM</SelectItem>
                <SelectItem value="mkv">MKV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Progress bar */}
        {progress.status !== 'idle' && (
          <div className="space-y-2 animate-fade-in">
            <ProgressBar 
              value={progress.progress} 
              status={progress.status}
              showLabel
            />
            <p className="text-sm text-muted-foreground text-center">
              {progress.message}
            </p>
          </div>
        )}

        {/* Download button */}
        <Button 
          onClick={handleDownload} 
          disabled={!url.trim() || isDownloading}
          className="w-full"
          size="lg"
        >
          <Download className="h-5 w-5 mr-2" />
          {isDownloading ? t.videoDownloader.downloading : t.videoDownloader.download}
        </Button>
      </div>

      {/* Tips card */}
      <div className="rounded-xl border border-border bg-card shadow-card p-6">
        <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <HardDrive className="h-5 w-5 text-primary" />
          {t.videoDownloader.videoInfo}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">{t.videoDownloader.quality}</p>
            <p className="font-medium text-card-foreground">{quality}</p>
          </div>
          <div>
            <p className="text-muted-foreground">{t.videoDownloader.size}</p>
            <p className="font-medium text-card-foreground">~250 MB</p>
          </div>
          <div>
            <p className="text-muted-foreground">{t.videoDownloader.format}</p>
            <p className="font-medium text-card-foreground">MP4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDownloader;
