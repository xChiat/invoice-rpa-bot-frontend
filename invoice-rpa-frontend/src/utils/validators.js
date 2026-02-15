import { z } from 'zod';

/**
 * Valida un RUT chileno usando el algoritmo módulo 11
 */
const validateRUT = (rut) => {
  // Remover puntos y guiones
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
  
  // Largo entre 8 y 9 caracteres
  if (cleanRut.length < 8 || cleanRut.length > 9) return false;
  
  // Separar cuerpo y dígito verificador
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1).toUpperCase();
  
  // Calcular dígito verificador
  let sum = 0;
  let multiplier = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const expectedDV = 11 - (sum % 11);
  let calculatedDV;
  
  if (expectedDV === 11) calculatedDV = '0';
  else if (expectedDV === 10) calculatedDV = 'K';
  else calculatedDV = expectedDV.toString();
  
  return dv === calculatedDV;
};

// Custom RUT validator para Zod
const rutSchema = z.string()
  .min(8, 'RUT debe tener al menos 8 caracteres')
  .max(12, 'RUT no puede exceder 12 caracteres')
  .refine(validateRUT, { message: 'RUT inválido' });

// Schema para login
export const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email es requerido'),
  password: z.string()
    .min(1, 'Contraseña es requerida')
});

// Schema para registro
export const registerSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email es requerido'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),
  confirm_password: z.string()
    .min(1, 'Confirmar contraseña es requerido'),
  full_name: z.string()
    .min(3, 'Nombre completo debe tener al menos 3 caracteres')
    .max(100, 'Nombre completo no puede exceder 100 caracteres'),
  empresa_nombre: z.string()
    .min(3, 'Nombre de empresa debe tener al menos 3 caracteres')
    .max(100, 'Nombre de empresa no puede exceder 100 caracteres'),
  empresa_rut: rutSchema
}).refine((data) => data.password === data.confirm_password, {
  message: 'Las contraseñas no coinciden',
  path: ['confirm_password']
});
