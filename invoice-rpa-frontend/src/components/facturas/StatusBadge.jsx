import { STATUS_LABELS, STATUS_COLORS, FACTURA_STATUS } from '../../utils/constants';
import { Spinner } from '../ui/Spinner';

export const StatusBadge = ({ status }) => {
  const color = STATUS_COLORS[status] || 'gray';
  const label = STATUS_LABELS[status] || status;

  const colorClasses = {
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {status === FACTURA_STATUS.PROCESSING && (
        <Spinner size="sm" />
      )}
      {label}
    </span>
  );
};
