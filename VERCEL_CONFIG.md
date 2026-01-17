# Configuración Requerida en Vercel

## Variables de Entorno a Configurar

Para que el proyecto funcione en producción, debes agregar estas variables en Vercel:

### 1. Abre Vercel Dashboard
- Ve a https://vercel.com/dashboard
- Selecciona el proyecto `alacena-frontend`

### 2. Settings → Environment Variables

Agrega estas variables:

```
NEXTAUTH_URL = https://alacena-frontend.vercel.app
NEXTAUTH_SECRET = tu-secret-key-aqui-cambialo-en-produccion
NEXT_PUBLIC_API_URL = https://alacena-backend.fly.dev
```

### 3. Generar NEXTAUTH_SECRET

Si no tienes un secret, puedes generar uno:

```bash
# En tu terminal local:
openssl rand -base64 32
```

O usa una herramienta online:
- https://generate-secret.vercel.app/32

### 4. Redeploy

Una vez agregadas las variables:
- Ve a Deployments
- Haz click en el último deploy
- Haz click en "Redeploy"

## Variables Explicadas

- **NEXTAUTH_URL**: URL pública de tu app (IMPORTANTE para producción)
- **NEXTAUTH_SECRET**: Clave para firmar tokens (genera una nueva para producción)
- **NEXT_PUBLIC_API_URL**: URL del backend (públicamente accesible)

## Por qué no funciona sin esto

Sin `NEXTAUTH_URL` y `NEXTAUTH_SECRET`:
- ❌ NextAuth no puede crear sesiones
- ❌ El middleware no funciona
- ❌ `/login` retorna 404 o error
- ❌ Puedes entrar al dashboard sin login (sin protección)

## Verificar que funciona

Después de redeploy (2-3 min):
1. Ve a https://alacena-frontend.vercel.app
2. Deberías ser redirigido a `/login`
3. Intenta login con: admin@alacena.com / admin123
4. Deberías entrar al dashboard

Si sigue 404, abre DevTools (F12) Console y copia el error completo.
