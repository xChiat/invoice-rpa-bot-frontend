import { Modal } from '../ui/Modal';
import { formatCurrency, formatDate, formatRUT } from '../../utils/formatters';
import { StatusBadge } from './StatusBadge';
import { Button } from '../ui/Button';

export const FacturaDetail = ({ factura, isOpen, onClose }) => {
  if (!factura) return null;

  const openPDF = () => {
    if (factura.pdf_url) {
      window.open(factura.pdf_url, '_blank');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalle de Factura" size="lg">
      <div className="space-y-6">
        {/* Status */}
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-500">Estado</h4>
          <StatusBadge status={factura.status} />
        </div>

        {/* Metadata */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Información General</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Número de Factura</p>
              <p className="text-sm font-medium text-gray-900">{factura.numero_factura || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de Emisión</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(factura.fecha_emision)}</p>
            </div>
          </div>
        </div>

        {/* Emisor */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Emisor</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="text-sm font-medium text-gray-900">{factura.emisor_nombre || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">RUT</p>
              <p className="text-sm font-medium text-gray-900">{formatRUT(factura.emisor_rut)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="text-sm font-medium text-gray-900">{factura.emisor_direccion || '-'}</p>
            </div>
          </div>
        </div>

        {/* Receptor */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Receptor</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="text-sm font-medium text-gray-900">{factura.receptor_nombre || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">RUT</p>
              <p className="text-sm font-medium text-gray-900">{formatRUT(factura.receptor_rut)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="text-sm font-medium text-gray-900">{factura.receptor_direccion || '-'}</p>
            </div>
          </div>
        </div>

        {/* Montos */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Montos</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Monto Neto</p>
              <p className="text-sm font-medium text-gray-900">{formatCurrency(factura.monto_neto)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">IVA</p>
              <p className="text-sm font-medium text-gray-900">{formatCurrency(factura.monto_iva)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(factura.monto_total)}</p>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Registro</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Fecha de Carga</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(factura.created_at)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Última Actualización</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(factura.updated_at)}</p>
            </div>
          </div>
        </div>

        {/* PDF Download */}
        {factura.pdf_url && (
          <div className="pt-4 border-t">
            <Button onClick={openPDF} className="w-full">
              Descargar PDF
            </Button>
          </div>
        )}

        {/* Errores de validación */}
        {factura.validation_errors && factura.validation_errors.length > 0 && (
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-red-900 mb-2">Errores de Validación</h4>
            <ul className="list-disc list-inside text-sm text-red-700">
              {factura.validation_errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};
