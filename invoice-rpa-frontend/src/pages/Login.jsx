import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/auth/LoginForm';
import { useEffect } from 'react';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/facturas');
    }
  }, [user, navigate]);

  const handleLogin = async (data) => {
    const result = await login(data);
    if (result.success) {
      navigate('/facturas');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Invoice RPA Bot
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Gestión automática de facturas
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm onSubmit={handleLogin} loading={loading} />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  ¿No tienes cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Crear cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
