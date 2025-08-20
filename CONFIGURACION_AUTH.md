# Configuración de Autenticación - Casamiento

## Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# NextAuth (solo para invitados con Google)
NEXTAUTH_SECRET=tu_secret_muy_seguro_aqui
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (solo para invitados)
GOOGLE_CLIENT_ID=tu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui

# Admin credentials (variables públicas para el login simple)
NEXT_PUBLIC_ADM_ACCOUNT=admin
NEXT_PUBLIC_ADM_PASSWORD=tu_password_admin_aqui
```

## Cómo Obtener las Credenciales de Google

### 1. Google Cloud Console
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto nuevo o selecciona uno existente
3. Habilita la API de Google+ 

### 2. Crear Credenciales OAuth 2.0
1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "Create Credentials" > "OAuth 2.0 Client IDs"
3. Selecciona "Web application"
4. Agrega las URIs de redirección:
   - `http://localhost:3000/api/auth/callback/google` (desarrollo)
   - `https://tu-dominio.com/api/auth/callback/google` (producción)

### 3. Copiar Credenciales
- Copia el `Client ID` y `Client Secret` a tu archivo `.env.local`

## Generar NEXTAUTH_SECRET

Ejecuta este comando para generar un secret seguro:

```bash
openssl rand -base64 32
```

## Flujos de Autenticación

### Usuarios Invitados (Google)
- Se autentican con su cuenta de Google
- Acceden a `/casamiento` (página de invitación)
- Usan NextAuth para la autenticación

### Administradores (Credenciales)
- Se autentican con usuario/contraseña directamente
- Acceden a `/admin/dashboard`
- **NO usan NextAuth** - login simple y directo
- Solo pueden acceder por URL directa

## Estructura de Archivos

- `src/pages/api/auth/[...nextauth].ts` - Solo Google para invitados
- `src/app/admin/login/page.jsx` - Login administrativo simple
- `src/components/Modulos/Bienvenidos.jsx` - Login de invitados con Google

## Verificación

1. **Login de Invitados**: Debe redirigir a `/casamiento`
2. **Login de Admin**: Debe redirigir a `/admin/dashboard` (sin NextAuth)
3. **Protección**: Los invitados NO pueden acceder a `/admin/*`
4. **Simplicidad**: Admin login es 1+1, sin cookies ni tokens

## Notas Importantes

- **Admin login**: Es completamente independiente de NextAuth
- **Variables públicas**: `NEXT_PUBLIC_*` para que el cliente pueda acceder
- **Sin middleware**: No se necesita protección adicional
- **Música automática**: Mejorada para funcionar con políticas de navegadores
