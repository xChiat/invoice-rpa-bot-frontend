import axiosInstance from './axios';

/**
 * Subir una factura en PDF
 */
export const uploadFactura = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post('/api/facturas/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Obtener lista de facturas con paginación y filtros
 */
export const getFacturas = async (skip = 0, limit = 50, statusFilter = null) => {
  const params = { skip, limit };
  if (statusFilter && statusFilter !== 'all') {
    params.status_filter = statusFilter;
  }

  const response = await axiosInstance.get('/api/facturas/', { params });
  return response.data;
};

/**
 * Obtener una factura por ID
 */
export const getFacturaById = async (id) => {
  const response = await axiosInstance.get(`/api/facturas/${id}`);
  return response.data;
};

/**
 * Obtener el estado de una factura (para polling)
 */
export const getFacturaStatus = async (id) => {
  const response = await axiosInstance.get(`/api/facturas/${id}/status`);
  return response.data;
};

/**
 * Actualizar una factura (futuro)
 */
export const updateFactura = async (id, data) => {
  const response = await axiosInstance.patch(`/api/facturas/${id}`, data);
  return response.data;
};

/**
 * Eliminar una factura (futuro)
 */
export const deleteFactura = async (id) => {
  const response = await axiosInstance.delete(`/api/facturas/${id}`);
  return response.data;
};
