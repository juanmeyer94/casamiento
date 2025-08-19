# Configuración del Dashboard Administrativo

## Descripción
Dashboard administrativo para gestionar las confirmaciones de asistencia y canciones sugeridas del casamiento.

## Características
- ✅ Autenticación simple con credenciales predeterminadas
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Visualización de confirmaciones de invitados
- ✅ Gestión de canciones sugeridas
- ✅ Interfaz responsive y moderna
- ✅ Integración con Google Sheets

## Credenciales de Acceso
- **Usuario:** `admin`
- **Contraseña:** `default`

## URLs del Sistema
- Página principal: `/`
- Panel admin: `/admin`
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`

## Variables de Entorno Necesarias
Asegúrate de tener estas variables en tu archivo `.env.local`:

```env
# Google Sheets Configuration
GOOGLE_TYPE=service_account
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your_client_email
GOOGLE_SHEETS_CLIENT_ID=your_client_id

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## Estructura de Datos

### Usuarios (Hoja "Test")
Columnas A-E:
- **A:** Marca temporal (fecha de confirmación)
- **B:** Nombre Completo
- **C:** Dirección de mail
- **D:** ¿Asistirás al casamiento? (Si/No)
- **E:** Comentarios

### Canciones (Hoja "Canciones")
Columnas A-E:
- **A:** Nombre
- **B:** Mail
- **C:** Fecha
- **D:** Canción Sugerida
- **E:** Link

## APIs Creadas
- `GET /api/admin/users` - Obtiene todas las confirmaciones
- `GET /api/admin/songs` - Obtiene todas las canciones sugeridas

## Funcionalidades del Dashboard
1. **Estadísticas en tiempo real:**
   - Total de invitados
   - Confirmados (que dijeron "Si")
   - No asisten (que dijeron "No")
   - Total de canciones sugeridas

2. **Pestañas de navegación:**
   - Confirmaciones: Lista completa de respuestas
   - Canciones: Lista de canciones sugeridas con enlaces

3. **Características adicionales:**
   - Botón de actualización manual
   - Formato de fechas en español
   - Enlaces clickeables para canciones
   - Indicadores visuales de estado
   - Diseño responsive

## Instalación y Uso
1. Las dependencias necesarias ya están instaladas
2. Configura las variables de entorno
3. Ejecuta `npm run dev`
4. Ve a `/admin` para acceder al panel
5. Usa las credenciales: admin/default

## Seguridad
- Las rutas administrativas están protegidas por middleware
- Autenticación requerida para acceder al dashboard
- Sesiones seguras con NextAuth.js
- Redirección automática si no está autenticado

## Personalización
Para cambiar las credenciales, edita el archivo:
`src/pages/api/auth/[...nextauth].ts`

En la línea 15, modifica el array `validUsers`:
```javascript
const validUsers = [
  { id: "1", username: "tu_usuario", password: "tu_contraseña", name: "Tu Nombre" }
];
```
