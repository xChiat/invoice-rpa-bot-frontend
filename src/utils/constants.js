export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const FACTURA_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const STATUS_LABELS = {
  [FACTURA_STATUS.PENDING]: 'Pendiente',
  [FACTURA_STATUS.PROCESSING]: 'Procesando',
  [FACTURA_STATUS.COMPLETED]: 'Completado',
  [FACTURA_STATUS.FAILED]: 'Fallido'
};

export const STATUS_COLORS = {
  [FACTURA_STATUS.PENDING]: 'yellow',
  [FACTURA_STATUS.PROCESSING]: 'blue',
  [FACTURA_STATUS.COMPLETED]: 'green',
  [FACTURA_STATUS.FAILED]: 'red'
};

export const POLLING_INTERVAL = 3000; // 3 seconds
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPE = '.pdf';
