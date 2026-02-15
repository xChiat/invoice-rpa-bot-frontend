import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

export const Pagination = ({ 
  currentPage, 
  hasMore, 
  onPrevious, 
  onNext,
  loading = false 
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentPage === 1 || loading}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          onClick={onNext}
          disabled={!hasMore || loading}
        >
          Siguiente
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Página <span className="font-medium">{currentPage}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentPage === 1 || loading}
            className="flex items-center gap-1"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={onNext}
            disabled={!hasMore || loading}
            className="flex items-center gap-1"
          >
            Siguiente
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
