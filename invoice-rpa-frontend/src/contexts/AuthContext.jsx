import { createContext, useState, useEffect } from 'react';
import { login as loginAPI, register as registerAPI, getCurrentUser } from '../api/auth.api';
import { saveTokens, clearTokens, getAccessToken } from '../utils/storage';
import toast from 'react-hot-toast';

// Create context (not exported to avoid Fast Refresh warning)
const AuthContext = createContext(null);

// Export only for use in useAuth hook
export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar autenticación al cargar la app
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error('Error al verificar autenticación:', err);
      clearTokens();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginAPI(credentials);
      
      // Guardar tokens
      saveTokens(response.access_token, response.refresh_token);
      
      // Obtener datos del usuario
      const userData = await getCurrentUser();
      setUser(userData);
      
      toast.success('¡Bienvenido!');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Error al iniciar sesión';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await registerAPI(data);
      
      // Guardar tokens
      saveTokens(response.access_token, response.refresh_token);
      
      // Obtener datos del usuario
      const userData = await getCurrentUser();
      setUser(userData);
      
      toast.success('¡Registro exitoso!');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Error al registrarse';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    toast.success('Sesión cerrada');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
