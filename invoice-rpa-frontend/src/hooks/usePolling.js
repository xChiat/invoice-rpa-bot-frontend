import { useState, useEffect, useRef } from 'react';

/**
 * Hook genérico para polling
 * @param {Function} fetchFn - Función que retorna una promesa con los datos
 * @param {number} interval - Intervalo de polling en ms
 * @param {Function} shouldStop - Función que determina si debe detener el polling
 * @returns {Object} - { data, loading, error, startPolling, stopPolling }
 */
export const usePolling = (fetchFn, interval = 3000, shouldStop = () => false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const intervalRef = useRef(null);

  const poll = async () => {
    try {
      setLoading(true);
      const result = await fetchFn();
      setData(result);
      setError(null);

      // Verificar si debe detenerse
      if (shouldStop(result)) {
        stopPolling();
      }
    } catch (err) {
      setError(err.message);
      stopPolling();
    } finally {
      setLoading(false);
    }
  };

  const startPolling = () => {
    if (!isPolling) {
      setIsPolling(true);
      poll(); // Primera ejecución inmediata
      intervalRef.current = setInterval(poll, interval);
    }
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
  };

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    isPolling,
    startPolling,
    stopPolling
  };
};
