/**
 * Mock Download Service
 * 
 * Simulates video and music download operations.
 * Replace with real API calls when connecting to backend.
 */

export type DownloadStatus = 'idle' | 'processing' | 'downloading' | 'completed' | 'error';

export interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  platform: string;
}

export interface TrackInfo {
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverArt: string;
}

export interface DownloadProgress {
  status: DownloadStatus;
  progress: number;
  message: string;
}

// Simulated video metadata
const mockVideoData: VideoInfo[] = [
  {
    title: 'Amazing Nature Documentary - 4K',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
    duration: '12:34',
    author: 'Nature Channel',
    platform: 'YouTube',
  },
  {
    title: 'Tech Review: Latest Gadgets 2024',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop',
    duration: '8:45',
    author: 'TechReviewer',
    platform: 'YouTube',
  },
  {
    title: 'Cooking Masterclass - Italian Cuisine',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=225&fit=crop',
    duration: '15:22',
    author: 'Chef Studio',
    platform: 'Vimeo',
  },
];

// Simulated track metadata
const mockTrackData: TrackInfo[] = [
  {
    title: 'Midnight Dreams',
    artist: 'Synthwave Artist',
    album: 'Neon Nights',
    duration: '4:32',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
  },
  {
    title: 'Electric Sunrise',
    artist: 'Electro Producer',
    album: 'Digital Dawn',
    duration: '3:45',
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
  },
  {
    title: 'Acoustic Memories',
    artist: 'Folk Singer',
    album: 'Simple Stories',
    duration: '5:12',
    coverArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
  },
];

/**
 * Fetch mock video information
 */
export const fetchVideoInfo = async (url: string): Promise<VideoInfo | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Basic URL validation
  if (!url || !url.includes('.')) {
    return null;
  }

  // Return random mock data
  return mockVideoData[Math.floor(Math.random() * mockVideoData.length)];
};

/**
 * Fetch mock track information
 */
export const fetchTrackInfo = async (query: string): Promise<TrackInfo | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!query || query.length < 2) {
    return null;
  }

  // Return random mock data
  return mockTrackData[Math.floor(Math.random() * mockTrackData.length)];
};

/**
 * Simulate video download with progress updates
 */
export const downloadVideo = async (
  url: string,
  quality: string,
  onProgress: (progress: DownloadProgress) => void
): Promise<boolean> => {
  onProgress({ status: 'processing', progress: 0, message: 'Analyzing video...' });
  await new Promise(resolve => setTimeout(resolve, 1500));

  onProgress({ status: 'processing', progress: 10, message: 'Preparing download...' });
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate download progress
  for (let i = 20; i <= 100; i += 10) {
    onProgress({ 
      status: 'downloading', 
      progress: i, 
      message: `Downloading ${quality}... ${i}%` 
    });
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
  }

  // Simulate random success/failure (90% success rate)
  if (Math.random() > 0.1) {
    onProgress({ status: 'completed', progress: 100, message: 'Download complete!' });
    return true;
  } else {
    onProgress({ status: 'error', progress: 0, message: 'Download failed. Please try again.' });
    return false;
  }
};

/**
 * Simulate music download with progress updates
 */
export const downloadMusic = async (
  query: string,
  format: string,
  onProgress: (progress: DownloadProgress) => void
): Promise<boolean> => {
  onProgress({ status: 'processing', progress: 0, message: 'Finding track...' });
  await new Promise(resolve => setTimeout(resolve, 1200));

  onProgress({ status: 'processing', progress: 15, message: `Converting to ${format}...` });
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate download progress
  for (let i = 25; i <= 100; i += 15) {
    onProgress({ 
      status: 'downloading', 
      progress: i, 
      message: `Downloading ${format}... ${i}%` 
    });
    await new Promise(resolve => setTimeout(resolve, 250 + Math.random() * 400));
  }

  // Simulate random success/failure (90% success rate)
  if (Math.random() > 0.1) {
    onProgress({ status: 'completed', progress: 100, message: 'Download complete!' });
    return true;
  } else {
    onProgress({ status: 'error', progress: 0, message: 'Download failed. Please try again.' });
    return false;
  }
};

// Mock activity data for dashboard
export interface ActivityItem {
  id: string;
  type: 'video' | 'music';
  title: string;
  timestamp: Date;
  status: 'completed' | 'failed';
  format: string;
}

export const getMockActivity = (): ActivityItem[] => {
  const now = new Date();
  return [
    {
      id: '1',
      type: 'video',
      title: 'Amazing Nature Documentary - 4K',
      timestamp: new Date(now.getTime() - 1000 * 60 * 30),
      status: 'completed',
      format: '1080p',
    },
    {
      id: '2',
      type: 'music',
      title: 'Midnight Dreams - Synthwave Artist',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2),
      status: 'completed',
      format: 'MP3',
    },
    {
      id: '3',
      type: 'video',
      title: 'Tech Review: Latest Gadgets',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 5),
      status: 'completed',
      format: '720p',
    },
    {
      id: '4',
      type: 'music',
      title: 'Electric Sunrise - Electro Producer',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24),
      status: 'failed',
      format: 'FLAC',
    },
  ];
};

// Mock stats for dashboard
export interface DashboardStats {
  totalDownloads: number;
  videosDownloaded: number;
  musicDownloaded: number;
  storageUsed: string;
}

export const getMockStats = (): DashboardStats => ({
  totalDownloads: 247,
  videosDownloaded: 156,
  musicDownloaded: 91,
  storageUsed: '12.4 GB',
});
