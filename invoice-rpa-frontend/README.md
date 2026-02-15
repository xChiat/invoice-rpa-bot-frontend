# Invoice RPA Bot - Frontend

Frontend SPA para gestión automática de facturas con OCR. Construido con React 18, Tailwind CSS 3, y deployado en Vercel.

## 🚀 Características

- **Autenticación JWT** con refresh tokens automático
- **Carga de PDFs** con procesamiento en background
- **Polling automático** de estado de procesamiento
- **Listado filtrable** con paginación
- **Validación de RUT chileno** con algoritmo módulo 11
- **Diseño responsive** (mobile-first)
- **Notificaciones toast** para feedback al usuario

## 📋 Requisitos Previos

- Node.js 18+ y npm
- Backend FastAPI corriendo en http://localhost:8000 (o configurar VITE_API_URL)

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd invoice-rpa-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

Editar `.env.local` y configurar:
```env
VITE_API_URL=http://localhost:8000
```

4. Iniciar servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173

## 📁 Estructura del Proyecto

```
src/
├── api/              # Configuración de Axios y servicios API
├── components/       # Componentes React reutilizables
│   ├── auth/        # Componentes de autenticación
│   ├── common/      # Componentes compartidos
│   ├── facturas/    # Componentes de facturas
│   ├── layout/      # Layout y navegación
│   └── ui/          # Componentes UI base
├── contexts/        # Context API (AuthContext)
├── hooks/           # Custom hooks
├── pages/           # Páginas/vistas principales
├── utils/           # Utilidades (validators, formatters, etc)
├── App.jsx          # Configuración de rutas
├── main.jsx         # Entry point
└── index.css        # Estilos globales (Tailwind)
```

## 🔐 Flujo de Autenticación

1. **Registro**: Usuario crea cuenta con datos personales + empresa
2. **Login**: Email y contraseña
3. **Tokens**: Access token (30 min) + Refresh token (7 días)
4. **Auto-refresh**: Interceptor de Axios renueva tokens automáticamente
5. **Logout**: Limpia tokens y redirige a /login

## 📤 Flujo de Carga de Facturas

1. Usuario arrastra o selecciona PDF
2. Validación client-side (tipo, tamaño)
3. Upload a backend → recibe `factura_id`
4. Polling automático cada 3seg
5. Actualización de UI según estado:
   - PENDING → 10%
   - PROCESSING → 50%
   - COMPLETED → 100% + notificación
   - FAILED → Mostrar errores

## 🎨 Personalización

### Colores Primarios

Editar `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: {
        // Tus colores aquí
      }
    }
  }
}
```

## 🚀 Deployment en Vercel

1. Push a GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Conectar con Vercel:
   - Ir a [vercel.com](https://vercel.com)
   - Importar proyecto desde GitHub
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. Configurar variables de entorno en Vercel:
   - `VITE_API_URL`: URL de tu backend en producción

4. Deploy automático en cada push a main

## 🧪 Pruebas Locales

**Flujo completo:**
1. Registrar una empresa nueva
2. Login con las credenciales
3. Subir un PDF de factura
4. Verificar polling y cambio de estado
5. Ver detalle de factura procesada
6. Probar filtros por estado
7. Logout y verificar redirección

## 📝 Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Preview de build de producción
- `npm run lint` - Ejecutar ESLint

## 🔧 Troubleshooting

**CORS errors:**
- Verificar que backend tenga configurado CORS para origen del frontend
- En desarrollo: agregar proxy en `vite.config.js`

**Tokens expirados:**
- Borrar localStorage y volver a logear
- Verificar que backend esté devolviendo tokens válidos

**Upload falla:**
- Verificar tamaño de archivo < 10MB
- Verificar que backend acepte multipart/form-data
- Check logs del backend para más info

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

[MIT](LICENSE)
