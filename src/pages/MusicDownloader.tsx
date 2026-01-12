/**
 * Music Downloader Page
 */

import React, { useState, useCallback } from 'react';
import { Music, Download, Search, Disc, User, Clock } from 'lucide-react';
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
  fetchTrackInfo, 
  downloadMusic, 
  TrackInfo, 
  DownloadProgress 
} from '@/services/mockDownloadService';

const MusicDownloader: React.FC = () => {
  const { t } = useLanguage();
  
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState('mp3');
  const [bitrate, setBitrate] = useState('320');
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);
  const [progress, setProgress] = useState<DownloadProgress>({ 
    status: 'idle', 
    progress: 0, 
    message: '' 
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      return;
    }

    setIsSearching(true);
    const info = await fetchTrackInfo(query);
    setIsSearching(false);

    if (info) {
      setTrackInfo(info);
    } else {
      toast.error('Track not found');
    }
  }, [query]);

  const handleDownload = useCallback(async () => {
    if (!query.trim() && !trackInfo) {
      return;
    }

    const success = await downloadMusic(query, format.toUpperCase(), setProgress);

    if (success) {
      toast.success(t.musicDownloader.completed);
    } else {
      toast.error(t.musicDownloader.error);
    }
  }, [query, format, trackInfo, t]);

  const isDownloading = progress.status === 'processing' || progress.status === 'downloading';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="rounded-lg bg-pink-500/10 p-2">
            <Music className="h-6 w-6 text-pink-500" />
          </div>
          {t.musicDownloader.title}
        </h1>
        <p className="text-muted-foreground">{t.musicDownloader.subtitle}</p>
      </div>

      {/* Main form card */}
      <div className="rounded-xl border border-border bg-card shadow-card p-6 space-y-6">
        {/* Search Input */}
        <div className="space-y-2">
          <Label htmlFor="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search or URL
          </Label>
          <div className="flex gap-2">
            <Input
              id="search"
              type="text"
              placeholder={t.musicDownloader.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isDownloading}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              onClick={handleSearch}
              disabled={isSearching || isDownloading}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </div>

        {/* Track preview (if found) */}
        {trackInfo && (
          <div className="rounded-lg border border-border bg-muted/50 p-4 animate-fade-in">
            <div className="flex gap-4">
              <img 
                src={trackInfo.coverArt} 
                alt={trackInfo.title}
                className="w-24 h-24 rounded-lg object-cover shadow-md"
              />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-card-foreground">{trackInfo.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {trackInfo.artist}
                  </span>
                  <span className="flex items-center gap-1">
                    <Disc className="h-4 w-4" />
                    {trackInfo.album}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {trackInfo.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Format selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t.musicDownloader.format}</Label>
            <Select value={format} onValueChange={setFormat} disabled={isDownloading}>
              <SelectTrigger>
                <SelectValue placeholder={t.musicDownloader.selectFormat} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp3">MP3</SelectItem>
                <SelectItem value="wav">WAV</SelectItem>
                <SelectItem value="flac">FLAC</SelectItem>
                <SelectItem value="aac">AAC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t.musicDownloader.bitrate}</Label>
            <Select value={bitrate} onValueChange={setBitrate} disabled={isDownloading || format !== 'mp3'}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="320">320 kbps</SelectItem>
                <SelectItem value="256">256 kbps</SelectItem>
                <SelectItem value="192">192 kbps</SelectItem>
                <SelectItem value="128">128 kbps</SelectItem>
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
          disabled={!query.trim() || isDownloading}
          className="w-full"
          size="lg"
        >
          <Download className="h-5 w-5 mr-2" />
          {isDownloading ? t.musicDownloader.downloading : t.musicDownloader.download}
        </Button>
      </div>

      {/* Info card */}
      <div className="rounded-xl border border-border bg-card shadow-card p-6">
        <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          {t.musicDownloader.trackInfo}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">{t.musicDownloader.format}</p>
            <p className="font-medium text-card-foreground">{format.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">{t.musicDownloader.bitrate}</p>
            <p className="font-medium text-card-foreground">{format === 'mp3' ? `${bitrate} kbps` : 'Lossless'}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Estimated Size</p>
            <p className="font-medium text-card-foreground">
              {format === 'flac' ? '~30 MB' : format === 'wav' ? '~50 MB' : '~8 MB'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicDownloader;
