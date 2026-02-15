import { useState, useEffect } from 'react';
import { FacturaUpload } from '../components/facturas/FacturaUpload';
import { FacturaList } from '../components/facturas/FacturaList';
import { FacturaDetail } from '../components/facturas/FacturaDetail';
import { Select } from '../components/ui/Select';
import { Pagination } from '../components/common/Pagination';
import { useFacturas } from '../hooks/useFacturas';
import { FACTURA_STATUS, STATUS_LABELS } from '../utils/constants';

export const Facturas = () => {
  const { facturas, loading, pagination, fetchFacturas, refreshFacturas } = useFacturas();
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    refreshFacturas(statusFilter === 'all' ? null : statusFilter);
  }, [statusFilter, refreshFacturas]);

  const handleUploadComplete = () => {
    setCurrentPage(1);
    refreshFacturas(statusFilter === 'all' ? null : statusFilter);
  };

  const handleFacturaClick = (factura) => {
    setSelectedFactura(factura);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
    fetchFacturas(statusFilter === 'all' ? null : statusFilter, false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      // Note: Going back would require keeping track of previous data
      // For simplicity, we'll just refresh
      refreshFacturas(statusFilter === 'all' ? null : statusFilter);
    }
  };

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: FACTURA_STATUS.PENDING, label: STATUS_LABELS[FACTURA_STATUS.PENDING] },
    { value: FACTURA_STATUS.PROCESSING, label: STATUS_LABELS[FACTURA_STATUS.PROCESSING] },
    { value: FACTURA_STATUS.COMPLETED, label: STATUS_LABELS[FACTURA_STATUS.COMPLETED] },
    { value: FACTURA_STATUS.FAILED, label: STATUS_LABELS[FACTURA_STATUS.FAILED] },
  ];

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <FacturaUpload onUploadComplete={handleUploadComplete} />

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Facturas</h2>
          <div className="w-full sm:w-48">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* List */}
      <FacturaList
        facturas={facturas}
        loading={loading}
        onFacturaClick={handleFacturaClick}
      />

      {/* Pagination */}
      {facturas.length > 0 && (
        <Pagination
          currentPage={currentPage}
          hasMore={pagination.hasMore}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
          loading={loading}
        />
      )}

      {/* Detail Modal */}
      <FacturaDetail
        factura={selectedFactura}
        isOpen={!!selectedFactura}
        onClose={() => setSelectedFactura(null)}
      />
    </div>
  );
};
