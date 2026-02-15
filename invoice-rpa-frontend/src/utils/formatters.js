/**
 * Formatea un monto en CLP con separador de miles
 * @param {number} amount - Monto en pesos chilenos (entero)
 * @returns {string} Monto formateado (ej: "$1.234.567")
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '$0';
  return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

/**
 * Formatea una fecha ISO a formato dd/MM/yyyy
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} Fecha formateada
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formatea un RUT chileno
 * @param {string} rut - RUT sin formato
 * @returns {string} RUT formateado (ej: "12.345.678-9")
 */
export const formatRUT = (rut) => {
  if (!rut) return '-';
  
  // Remover puntos y guiones existentes
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
  
  // Separar cuerpo y dígito verificador
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);
  
  // Formatear cuerpo con puntos
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `${formattedBody}-${dv}`;
};

/**
 * Limpia un RUT de puntos y guiones
 * @param {string} rut - RUT formateado
 * @returns {string} RUT sin formato
 */
export const cleanRUT = (rut) => {
  return rut.replace(/\./g, '').replace(/-/g, '');
};
