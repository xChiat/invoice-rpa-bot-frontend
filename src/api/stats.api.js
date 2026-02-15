import axiosInstance from './axios';

/**
 * Obtener estadísticas del dashboard (futuro)
 */
export const getStats = async () => {
  const response = await axiosInstance.get('/api/stats/');
  return response.data;
};
