import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-xl text-gray-600">Página no encontrada</p>
        <div className="mt-6">
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
