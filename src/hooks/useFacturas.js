import { useState, useCallback } from 'react';
import { getFacturas } from '../api/facturas.api';
import toast from 'react-hot-toast';

export const useFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 50,
    hasMore: true
  });

  const fetchFacturas = useCallback(async (statusFilter = null, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const skip = reset ? 0 : pagination.skip;
      const data = await getFacturas(skip, pagination.limit, statusFilter);

      if (reset) {
        setFacturas(data);
      } else {
        setFacturas(prev => [...prev, ...data]);
      }

      setPagination(prev => ({
        ...prev,
        skip: skip + data.length,
        hasMore: data.length === prev.limit
      }));

      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Error al cargar facturas';
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [pagination.skip, pagination.limit]);

  const refreshFacturas = useCallback((statusFilter = null) => {
    return fetchFacturas(statusFilter, true);
  }, [fetchFacturas]);

  const loadMore = useCallback((statusFilter = null) => {
    if (pagination.hasMore && !loading) {
      return fetchFacturas(statusFilter, false);
    }
  }, [pagination.hasMore, loading, fetchFacturas]);

  return {
    facturas,
    loading,
    error,
    pagination,
    fetchFacturas,
    refreshFacturas,
    loadMore
  };
};
