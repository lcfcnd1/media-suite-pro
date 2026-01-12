-- ============================================================
-- MediaSuite Pro - Supabase Database Schema
-- ============================================================
-- Derived strictly from frontend UI analysis:
-- - Dashboard: stats cards, recent activity
-- - Video Downloader: url, quality, format, status
-- - Music Downloader: query, format, bitrate, status
-- - Profile: user info, fullName, email, createdAt
-- - Settings: language, theme, notifications
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

-- Download type (video or music)
CREATE TYPE public.download_type AS ENUM ('video', 'music');

-- Download status matching frontend states
CREATE TYPE public.download_status AS ENUM ('idle', 'processing', 'downloading', 'completed', 'error');

-- User roles for access control
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Theme preference
CREATE TYPE public.theme_preference AS ENUM ('light', 'dark', 'system');

-- Language preference
CREATE TYPE public.language_preference AS ENUM ('en', 'es');

-- ============================================================
-- TABLES
-- ============================================================

-- User profiles (extends auth.users)
-- Supports: Profile page (fullName, avatar, memberSince)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles (separate table for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- User settings/preferences
-- Supports: Settings page (language, theme, notifications)
CREATE TABLE public.user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    language public.language_preference NOT NULL DEFAULT 'en',
    theme public.theme_preference NOT NULL DEFAULT 'system',
    notify_download_complete BOOLEAN NOT NULL DEFAULT true,
    notify_download_error BOOLEAN NOT NULL DEFAULT true,
    notify_app_updates BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Downloads history
-- Supports: Dashboard activity, Video/Music Downloader pages
CREATE TABLE public.downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type public.download_type NOT NULL,
    status public.download_status NOT NULL DEFAULT 'idle',
    
    -- Common fields
    title TEXT NOT NULL,
    source_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration TEXT,
    file_size_bytes BIGINT,
    
    -- Video-specific fields
    video_quality TEXT, -- '1080p', '720p', '480p', '360p'
    video_format TEXT,  -- 'mp4', 'webm', 'mkv'
    video_author TEXT,
    video_platform TEXT,
    
    -- Music-specific fields
    music_format TEXT,  -- 'mp3', 'wav', 'flac', 'aac'
    music_bitrate TEXT, -- '320', '256', '192', '128'
    music_artist TEXT,
    music_album TEXT,
    
    -- Timestamps
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- Profiles
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at);

-- User roles
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);

-- User settings
CREATE INDEX idx_user_settings_user_id ON public.user_settings(user_id);

-- Downloads
CREATE INDEX idx_downloads_user_id ON public.downloads(user_id);
CREATE INDEX idx_downloads_type ON public.downloads(type);
CREATE INDEX idx_downloads_status ON public.downloads(status);
CREATE INDEX idx_downloads_created_at ON public.downloads(created_at DESC);
CREATE INDEX idx_downloads_user_type ON public.downloads(user_id, type);
CREATE INDEX idx_downloads_user_status ON public.downloads(user_id, status);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Create profile
    INSERT INTO public.profiles (id, full_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
    );
    
    -- Create default settings
    INSERT INTO public.user_settings (user_id)
    VALUES (NEW.id);
    
    -- Assign default role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    RETURN NEW;
END;
$$;

-- Check if user has a specific role (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Get user download statistics (for dashboard)
CREATE OR REPLACE FUNCTION public.get_user_stats(_user_id UUID)
RETURNS TABLE (
    total_downloads BIGINT,
    videos_downloaded BIGINT,
    music_downloaded BIGINT,
    storage_used_bytes BIGINT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT
        COUNT(*) FILTER (WHERE status = 'completed') AS total_downloads,
        COUNT(*) FILTER (WHERE status = 'completed' AND type = 'video') AS videos_downloaded,
        COUNT(*) FILTER (WHERE status = 'completed' AND type = 'music') AS music_downloaded,
        COALESCE(SUM(file_size_bytes) FILTER (WHERE status = 'completed'), 0) AS storage_used_bytes
    FROM public.downloads
    WHERE user_id = _user_id
$$;

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Updated_at triggers
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_user_settings_updated_at
    BEFORE UPDATE ON public.user_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_downloads_updated_at
    BEFORE UPDATE ON public.downloads
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- User settings policies
CREATE POLICY "Users can view own settings"
    ON public.user_settings
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
    ON public.user_settings
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
    ON public.user_settings
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Downloads policies
CREATE POLICY "Users can view own downloads"
    ON public.downloads
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own downloads"
    ON public.downloads
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own downloads"
    ON public.downloads
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own downloads"
    ON public.downloads
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all downloads"
    ON public.downloads
    FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- VIEWS (for dashboard metrics)
-- ============================================================

-- User activity view (recent downloads for dashboard)
CREATE OR REPLACE VIEW public.user_recent_activity AS
SELECT
    d.id,
    d.user_id,
    d.type,
    d.title,
    d.status,
    CASE 
        WHEN d.type = 'video' THEN d.video_quality
        ELSE d.music_format
    END AS format,
    d.thumbnail_url,
    d.created_at
FROM public.downloads d
WHERE d.status IN ('completed', 'error')
ORDER BY d.created_at DESC;

-- Dashboard stats view
CREATE OR REPLACE VIEW public.user_dashboard_stats AS
SELECT
    user_id,
    COUNT(*) FILTER (WHERE status = 'completed') AS total_downloads,
    COUNT(*) FILTER (WHERE status = 'completed' AND type = 'video') AS videos_downloaded,
    COUNT(*) FILTER (WHERE status = 'completed' AND type = 'music') AS music_downloaded,
    COALESCE(SUM(file_size_bytes) FILTER (WHERE status = 'completed'), 0) AS storage_used_bytes,
    COUNT(*) FILTER (WHERE status = 'completed' AND created_at > now() - INTERVAL '7 days') AS downloads_last_week,
    COUNT(*) FILTER (WHERE status = 'completed' AND created_at > now() - INTERVAL '30 days') AS downloads_last_month
FROM public.downloads
GROUP BY user_id;

-- ============================================================
-- GRANTS
-- ============================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- Grant access to tables
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_settings TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.downloads TO authenticated;

-- Grant access to views
GRANT SELECT ON public.user_recent_activity TO authenticated;
GRANT SELECT ON public.user_dashboard_stats TO authenticated;

-- Grant execute on functions
GRANT EXECUTE ON FUNCTION public.get_user_stats TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role TO authenticated;
