import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validators';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
};
