import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../utils/validators';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { cleanRUT } from '../../utils/formatters';

export const RegisterForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleFormSubmit = (data) => {
    // Limpiar RUT antes de enviar
    const cleanedData = {
      ...data,
      empresa_rut: cleanRUT(data.empresa_rut)
    };
    onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Datos Personales</h3>
        
        <Input
          label="Nombre Completo"
          type="text"
          register={register('full_name')}
          error={errors.full_name?.message}
          placeholder="Juan Pérez"
        />

        <Input
          label="Email"
          type="email"
          register={register('email')}
          error={errors.email?.message}
          placeholder="tu@email.com"
        />

        <Input
          label="Contraseña"
          type="password"
          register={register('password')}
          error={errors.password?.message}
          placeholder="••••••••"
        />

        <Input
          label="Confirmar Contraseña"
          type="password"
          register={register('confirm_password')}
          error={errors.confirm_password?.message}
          placeholder="••••••••"
        />
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium text-gray-900">Datos de la Empresa</h3>
        
        <Input
          label="Nombre de la Empresa"
          type="text"
          register={register('empresa_nombre')}
          error={errors.empresa_nombre?.message}
          placeholder="Mi Empresa S.A."
        />

        <Input
          label="RUT de la Empresa"
          type="text"
          register={register('empresa_rut')}
          error={errors.empresa_rut?.message}
          placeholder="12.345.678-9"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>
    </form>
  );
};
