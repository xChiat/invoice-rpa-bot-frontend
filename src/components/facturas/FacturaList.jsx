import { formatCurrency, formatDate, formatRUT } from '../../utils/formatters';
import { StatusBadge } from './StatusBadge';
import { Spinner } from '../ui/Spinner';

export const FacturaList = ({ facturas, loading, onFacturaClick }) => {
  if (loading && facturas.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (facturas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay facturas para mostrar</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {/* Vista desktop - tabla */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Número
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Emisión
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Emisor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RUT Emisor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {facturas.map((factura) => (
              <tr
                key={factura.id}
                onClick={() => onFacturaClick(factura)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {factura.numero_factura || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(factura.fecha_emision)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {factura.emisor_nombre || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatRUT(factura.emisor_rut)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(factura.monto_total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={factura.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista móvil - cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {facturas.map((factura) => (
          <div
            key={factura.id}
            onClick={() => onFacturaClick(factura)}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {factura.numero_factura || 'N/A'}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(factura.fecha_emision)}
                </p>
              </div>
              <StatusBadge status={factura.status} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-900">{factura.emisor_nombre || '-'}</p>
              <p className="text-sm text-gray-500">{formatRUT(factura.emisor_rut)}</p>
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(factura.monto_total)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
