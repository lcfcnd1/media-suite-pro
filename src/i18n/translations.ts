/**
 * MediaSuite Pro - Internationalization System
 * 
 * Centralized translations organized by namespace.
 * Supports: English (en), Spanish (es)
 */

export type Language = 'en' | 'es';

// Define the structure for type safety
export interface TranslationsType {
  common: {
    appName: string;
    loading: string;
    save: string;
    cancel: string;
    submit: string;
    delete: string;
    edit: string;
    back: string;
    next: string;
    close: string;
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  auth: {
    login: string;
    register: string;
    logout: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    rememberMe: string;
    forgotPassword: string;
    noAccount: string;
    hasAccount: string;
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    loginSuccess: string;
    registerSuccess: string;
    logoutSuccess: string;
    invalidCredentials: string;
    emailRequired: string;
    passwordRequired: string;
    passwordMismatch: string;
  };
  dashboard: {
    title: string;
    welcome: string;
    overview: string;
    recentActivity: string;
    systemStatus: string;
    totalDownloads: string;
    videosDownloaded: string;
    musicDownloaded: string;
    storageUsed: string;
    serverStatus: string;
    online: string;
    offline: string;
    processing: string;
    noActivity: string;
    activityDescription: string;
  };
  videoDownloader: {
    title: string;
    subtitle: string;
    urlPlaceholder: string;
    quality: string;
    download: string;
    downloading: string;
    processing: string;
    completed: string;
    error: string;
    invalidUrl: string;
    selectQuality: string;
    supportedPlatforms: string;
    videoInfo: string;
    duration: string;
    size: string;
    format: string;
    thumbnail: string;
  };
  musicDownloader: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    format: string;
    bitrate: string;
    download: string;
    downloading: string;
    processing: string;
    completed: string;
    error: string;
    selectFormat: string;
    trackInfo: string;
    artist: string;
    album: string;
    duration: string;
  };
  settings: {
    title: string;
    subtitle: string;
    language: string;
    languageDescription: string;
    theme: string;
    themeDescription: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    apiKeys: string;
    apiKeysDescription: string;
    apiKeysPlaceholder: string;
    account: string;
    accountDescription: string;
    notifications: string;
    notificationsDescription: string;
    saved: string;
  };
  profile: {
    title: string;
    subtitle: string;
    personalInfo: string;
    security: string;
    changePassword: string;
    twoFactor: string;
    twoFactorDescription: string;
    sessions: string;
    sessionsDescription: string;
    dangerZone: string;
    deleteAccount: string;
    deleteAccountDescription: string;
    memberSince: string;
  };
  nav: {
    dashboard: string;
    videoDownloader: string;
    musicDownloader: string;
    settings: string;
    profile: string;
    help: string;
  };
}

export const translations = {
  en: {
    // Common/Shared
    common: {
      appName: 'MediaSuite Pro',
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      submit: 'Submit',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      close: 'Close',
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
    },

    // Authentication
    auth: {
      login: 'Sign In',
      register: 'Create Account',
      logout: 'Sign Out',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fullName: 'Full Name',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      loginTitle: 'Welcome back',
      loginSubtitle: 'Sign in to your account to continue',
      registerTitle: 'Create your account',
      registerSubtitle: 'Start downloading media in seconds',
      loginSuccess: 'Successfully signed in!',
      registerSuccess: 'Account created successfully!',
      logoutSuccess: 'Successfully signed out',
      invalidCredentials: 'Invalid email or password',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordMismatch: 'Passwords do not match',
    },

    // Dashboard
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome back',
      overview: 'Overview',
      recentActivity: 'Recent Activity',
      systemStatus: 'System Status',
      totalDownloads: 'Total Downloads',
      videosDownloaded: 'Videos Downloaded',
      musicDownloaded: 'Music Downloaded',
      storageUsed: 'Storage Used',
      serverStatus: 'Server Status',
      online: 'Online',
      offline: 'Offline',
      processing: 'Processing',
      noActivity: 'No recent activity',
      activityDescription: 'Your download history will appear here',
    },

    // Video Downloader
    videoDownloader: {
      title: 'Video Downloader',
      subtitle: 'Download videos from popular platforms',
      urlPlaceholder: 'Paste video URL here...',
      quality: 'Quality',
      download: 'Download',
      downloading: 'Downloading...',
      processing: 'Processing...',
      completed: 'Download Complete',
      error: 'Download Failed',
      invalidUrl: 'Please enter a valid URL',
      selectQuality: 'Select quality',
      supportedPlatforms: 'Supported platforms: YouTube, Vimeo, Twitter, and more',
      videoInfo: 'Video Information',
      duration: 'Duration',
      size: 'Estimated Size',
      format: 'Format',
      thumbnail: 'Thumbnail',
    },

    // Music Downloader
    musicDownloader: {
      title: 'Music Downloader',
      subtitle: 'Download music and audio files',
      searchPlaceholder: 'Search or paste URL...',
      format: 'Format',
      bitrate: 'Bitrate',
      download: 'Download',
      downloading: 'Downloading...',
      processing: 'Processing...',
      completed: 'Download Complete',
      error: 'Download Failed',
      selectFormat: 'Select format',
      trackInfo: 'Track Information',
      artist: 'Artist',
      album: 'Album',
      duration: 'Duration',
    },

    // Settings
    settings: {
      title: 'Settings',
      subtitle: 'Manage your preferences',
      language: 'Language',
      languageDescription: 'Select your preferred language',
      theme: 'Theme',
      themeDescription: 'Choose your preferred theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeSystem: 'System',
      apiKeys: 'API Keys',
      apiKeysDescription: 'Manage your API integrations',
      apiKeysPlaceholder: 'API key configuration coming soon',
      account: 'Account',
      accountDescription: 'Manage your account settings',
      notifications: 'Notifications',
      notificationsDescription: 'Configure notification preferences',
      saved: 'Settings saved successfully',
    },

    // Profile
    profile: {
      title: 'Profile',
      subtitle: 'Manage your account',
      personalInfo: 'Personal Information',
      security: 'Security',
      changePassword: 'Change Password',
      twoFactor: 'Two-Factor Authentication',
      twoFactorDescription: 'Add an extra layer of security',
      sessions: 'Active Sessions',
      sessionsDescription: 'Manage your active sessions',
      dangerZone: 'Danger Zone',
      deleteAccount: 'Delete Account',
      deleteAccountDescription: 'Permanently delete your account and all data',
      memberSince: 'Member since',
    },

    // Navigation
    nav: {
      dashboard: 'Dashboard',
      videoDownloader: 'Video Downloader',
      musicDownloader: 'Music Downloader',
      settings: 'Settings',
      profile: 'Profile',
      help: 'Help & Support',
    },
  },

  es: {
    // Common/Shared
    common: {
      appName: 'MediaSuite Pro',
      loading: 'Cargando...',
      save: 'Guardar',
      cancel: 'Cancelar',
      submit: 'Enviar',
      delete: 'Eliminar',
      edit: 'Editar',
      back: 'Volver',
      next: 'Siguiente',
      close: 'Cerrar',
      success: 'Éxito',
      error: 'Error',
      warning: 'Advertencia',
      info: 'Información',
    },

    // Authentication
    auth: {
      login: 'Iniciar Sesión',
      register: 'Crear Cuenta',
      logout: 'Cerrar Sesión',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      fullName: 'Nombre Completo',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes una cuenta?',
      hasAccount: '¿Ya tienes una cuenta?',
      loginTitle: 'Bienvenido de nuevo',
      loginSubtitle: 'Inicia sesión en tu cuenta para continuar',
      registerTitle: 'Crea tu cuenta',
      registerSubtitle: 'Comienza a descargar medios en segundos',
      loginSuccess: '¡Sesión iniciada correctamente!',
      registerSuccess: '¡Cuenta creada correctamente!',
      logoutSuccess: 'Sesión cerrada correctamente',
      invalidCredentials: 'Correo o contraseña inválidos',
      emailRequired: 'El correo es requerido',
      passwordRequired: 'La contraseña es requerida',
      passwordMismatch: 'Las contraseñas no coinciden',
    },

    // Dashboard
    dashboard: {
      title: 'Panel',
      welcome: 'Bienvenido de nuevo',
      overview: 'Resumen',
      recentActivity: 'Actividad Reciente',
      systemStatus: 'Estado del Sistema',
      totalDownloads: 'Descargas Totales',
      videosDownloaded: 'Videos Descargados',
      musicDownloaded: 'Música Descargada',
      storageUsed: 'Almacenamiento Usado',
      serverStatus: 'Estado del Servidor',
      online: 'En línea',
      offline: 'Desconectado',
      processing: 'Procesando',
      noActivity: 'Sin actividad reciente',
      activityDescription: 'Tu historial de descargas aparecerá aquí',
    },

    // Video Downloader
    videoDownloader: {
      title: 'Descargador de Videos',
      subtitle: 'Descarga videos de plataformas populares',
      urlPlaceholder: 'Pega la URL del video aquí...',
      quality: 'Calidad',
      download: 'Descargar',
      downloading: 'Descargando...',
      processing: 'Procesando...',
      completed: 'Descarga Completa',
      error: 'Descarga Fallida',
      invalidUrl: 'Por favor ingresa una URL válida',
      selectQuality: 'Seleccionar calidad',
      supportedPlatforms: 'Plataformas soportadas: YouTube, Vimeo, Twitter y más',
      videoInfo: 'Información del Video',
      duration: 'Duración',
      size: 'Tamaño Estimado',
      format: 'Formato',
      thumbnail: 'Miniatura',
    },

    // Music Downloader
    musicDownloader: {
      title: 'Descargador de Música',
      subtitle: 'Descarga música y archivos de audio',
      searchPlaceholder: 'Busca o pega URL...',
      format: 'Formato',
      bitrate: 'Tasa de bits',
      download: 'Descargar',
      downloading: 'Descargando...',
      processing: 'Procesando...',
      completed: 'Descarga Completa',
      error: 'Descarga Fallida',
      selectFormat: 'Seleccionar formato',
      trackInfo: 'Información de la Pista',
      artist: 'Artista',
      album: 'Álbum',
      duration: 'Duración',
    },

    // Settings
    settings: {
      title: 'Configuración',
      subtitle: 'Administra tus preferencias',
      language: 'Idioma',
      languageDescription: 'Selecciona tu idioma preferido',
      theme: 'Tema',
      themeDescription: 'Elige tu tema preferido',
      themeLight: 'Claro',
      themeDark: 'Oscuro',
      themeSystem: 'Sistema',
      apiKeys: 'Claves API',
      apiKeysDescription: 'Administra tus integraciones API',
      apiKeysPlaceholder: 'Configuración de claves API próximamente',
      account: 'Cuenta',
      accountDescription: 'Administra la configuración de tu cuenta',
      notifications: 'Notificaciones',
      notificationsDescription: 'Configura las preferencias de notificación',
      saved: 'Configuración guardada correctamente',
    },

    // Profile
    profile: {
      title: 'Perfil',
      subtitle: 'Administra tu cuenta',
      personalInfo: 'Información Personal',
      security: 'Seguridad',
      changePassword: 'Cambiar Contraseña',
      twoFactor: 'Autenticación de Dos Factores',
      twoFactorDescription: 'Añade una capa extra de seguridad',
      sessions: 'Sesiones Activas',
      sessionsDescription: 'Administra tus sesiones activas',
      dangerZone: 'Zona de Peligro',
      deleteAccount: 'Eliminar Cuenta',
      deleteAccountDescription: 'Eliminar permanentemente tu cuenta y todos los datos',
      memberSince: 'Miembro desde',
    },

    // Navigation
    nav: {
      dashboard: 'Panel',
      videoDownloader: 'Descargador de Videos',
      musicDownloader: 'Descargador de Música',
      settings: 'Configuración',
      profile: 'Perfil',
      help: 'Ayuda y Soporte',
    },
  },
};

export type TranslationKeys = TranslationsType;
