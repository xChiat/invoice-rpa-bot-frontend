import axiosInstance from './axios';

/**
 * Registrar un nuevo usuario con su empresa
 */
export const register = async (data) => {
  const response = await axiosInstance.post('/api/auth/register', {
    email: data.email,
    password: data.password,
    full_name: data.full_name,
    empresa_nombre: data.empresa_nombre,
    empresa_rut: data.empresa_rut
  });
  return response.data;
};

/**
 * Iniciar sesión
 */
export const login = async (credentials) => {
  const response = await axiosInstance.post('/api/auth/login', credentials);
  return response.data;
};

/**
 * Refrescar el token de acceso
 */
export const refreshToken = async (token) => {
  const response = await axiosInstance.post('/api/auth/refresh', {
    refresh_token: token
  });
  return response.data;
};

/**
 * Obtener información del usuario actual
 */
export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/api/auth/me');
  return response.data;
};
