import { useState, useRef } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { uploadFactura } from '../../api/facturas.api';
import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPE, POLLING_INTERVAL, FACTURA_STATUS } from '../../utils/constants';
import { getFacturaStatus } from '../../api/facturas.api';
import { usePolling } from '../../hooks/usePolling';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export const FacturaUpload = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [currentFacturaId, setCurrentFacturaId] = useState(null);
  const fileInputRef = useRef(null);

  const { data: pollingData, isPolling, startPolling } = usePolling(
    () => getFacturaStatus(currentFacturaId),
    POLLING_INTERVAL,
    (data) => {
      const shouldStop = data?.status === FACTURA_STATUS.COMPLETED || data?.status === FACTURA_STATUS.FAILED;
      if (shouldStop) {
        if (data.status === FACTURA_STATUS.COMPLETED) {
          toast.success('¡Factura procesada exitosamente!');
          onUploadComplete?.();
        } else {
          toast.error('Error al procesar la factura');
        }
        setCurrentFacturaId(null);
        setSelectedFile(null);
      }
      return shouldStop;
    }
  );

  const validateFile = (file) => {
    if (!file) return 'No se seleccionó ningún archivo';
    
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return 'Solo se permiten archivos PDF';
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return `El archivo debe ser menor a ${MAX_FILE_SIZE / 1024 / 1024}MB`;
    }
    
    return null;
  };

  const handleFileChange = (file) => {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }
    setSelectedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Selecciona un archivo primero');
      return;
    }

    try {
      setUploading(true);
      const response = await uploadFactura(selectedFile);
      
      toast.success('Archivo subido, procesando...');
      setCurrentFacturaId(response.factura_id);
      startPolling();
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Error al subir el archivo';
      toast.error(errorMessage);
      setSelectedFile(null);
    } finally {
      setUploading(false);
    }
  };

  const getProgress = () => {
    if (!pollingData) return 0;
    const statusProgress = {
      [FACTURA_STATUS.PENDING]: 10,
      [FACTURA_STATUS.PROCESSING]: 50,
      [FACTURA_STATUS.COMPLETED]: 100,
      [FACTURA_STATUS.FAILED]: 100,
    };
    return statusProgress[pollingData.status] || 0;
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Subir Factura</h3>
      
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center
          ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
          ${isPolling ? 'opacity-50 pointer-events-none' : 'cursor-pointer hover:border-primary-400'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPE}
          onChange={(e) => handleFileChange(e.target.files[0])}
          className="hidden"
          disabled={isPolling}
        />
        
        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Arrastra un archivo PDF aquí o haz clic para seleccionar
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Máximo {MAX_FILE_SIZE / 1024 / 1024}MB
        </p>
      </div>

      {selectedFile && !isPolling && (
        <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700 truncate">{selectedFile.name}</span>
          <Button
            onClick={handleUpload}
            disabled={uploading}
            size="sm"
          >
            {uploading ? 'Subiendo...' : 'Subir'}
          </Button>
        </div>
      )}

      {isPolling && pollingData && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Procesando factura...</span>
            <span>{getProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
