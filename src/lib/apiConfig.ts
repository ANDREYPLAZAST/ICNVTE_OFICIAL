/**
 * Configuración centralizada para URLs de API
 * Maneja automáticamente localhost vs producción
 */

export const getBackendUrl = (): string => {
  // Si hay variable de entorno, usarla
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  
  // Si estamos en el cliente (browser)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Si es localhost, usar puerto 3001
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
    
    // Si es un dominio de producción, usar HTTPS
    if (hostname.includes('vercel.app') || hostname.includes('netlify.app') || hostname.includes('github.io')) {
      // 🔧 REEMPLAZA CON LA URL REAL DE TU BACKEND DESPLEGADO
      // Ejemplo: return 'https://mili-backend.onrender.com';
      return 'https://tu-backend-url-real.onrender.com'; // ⚠️ ACTUALIZA ESTA URL
    }
    
    // Para otros dominios, asumir que el backend está en el mismo dominio
    return `${window.location.protocol}//${hostname}:3001`;
  }
  
  // Fallback por defecto (servidor)
  return 'http://localhost:3001';
};

export const getSocketUrl = (): string => {
  // Si hay variable de entorno específica para socket, usarla
  if (process.env.NEXT_PUBLIC_SOCKET_URL) {
    return process.env.NEXT_PUBLIC_SOCKET_URL;
  }
  
  // Si hay variable de entorno general, usarla
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  
  // Usar la misma lógica que getBackendUrl
  return getBackendUrl();
};

// URLs exportadas para uso fácil
export const BACKEND_URL = getBackendUrl();
export const SOCKET_URL = getSocketUrl();

// Función para debug - muestra qué URL se está usando
export const debugApiConfig = () => {
  if (typeof window !== 'undefined') {
    console.log('🔧 API Config Debug:');
    console.log('📍 Hostname:', window.location.hostname);
    console.log('🌐 Backend URL:', BACKEND_URL);
    console.log('🔌 Socket URL:', SOCKET_URL);
    console.log('🔧 Environment:', process.env.NODE_ENV);
  }
};
