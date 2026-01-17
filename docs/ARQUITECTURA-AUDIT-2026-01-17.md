# 🔍 AUDITORÍA COMPLETA - ARQUITECTURA ALACENA
**Fecha:** 2026-01-17  
**Objetivo:** Verificar alineación de herramientas, configuraciones y eliminar restos de servicios anteriores

---

## ✅ ESTADO ACTUAL DEL SISTEMA

### 🏗️ ARQUITECTURA FINAL (CONFIRMADA)
```
┌─────────────────────────┐
│   Frontend              │
│   Vercel (Next.js 15)   │
│   https://alacena-app   │
└────────────┬────────────┘
             │ (API calls)
             ▼
┌─────────────────────────┐
│   Backend               │
│   Fly.io (Express)      │
│   https://alacena-...   │
└────────────┬────────────┘
             │ (Queries)
             ▼
┌─────────────────────────┐
│   Database              │
│   Supabase PostgreSQL   │
│   IPv6 (Buenos Aires)   │
└─────────────────────────┘
```

---

## 📦 DEPENDENCIAS - BACKEND

**File:** `backend/package.json`

| Dependencia | Versión | Estado | Nota |
|------------|---------|--------|------|
| `@prisma/client` | ^6.19.2 | ✅ OK | Prisma v7 (moderno) |
| `@prisma/adapter-pg` | ^7.2.0 | ⚠️ VERIFICAR | Para PostgreSQL |
| `prisma` | ^6.19.2 | ⚠️ DESALINEADA | Versión CLI |
| `express` | ^5.2.1 | ✅ OK | Moderno |
| `cors` | ^2.8.5 | ✅ OK | CORS habilitado |
| `pg` | ^8.17.0 | ✅ OK | Driver PostgreSQL |
| `dotenv` | ^17.2.3 | ✅ OK | Env vars |

**⚠️ PROBLEMA DETECTADO:**
- `@prisma/client` es v6 pero `prisma` CLI es v6 - esto debería estar alineado
- `@prisma/adapter-pg` es v7 pero client es v6 - INCONSISTENCIA

**Recomendación:** Actualizar todo a Prisma v7

---

## 📦 DEPENDENCIAS - FRONTEND

**File:** `frontend/alacena-app/package.json`

| Dependencia | Versión | Estado | Nota |
|------------|---------|--------|------|
| `next` | ^15.1.0 | ✅ OK | Última versión |
| `react` | ^18.2.0 | ✅ OK | Compatible |
| `typescript` | ^5.3.3 | ✅ OK | Moderno |
| `tailwindcss` | ^3.4.1 | ✅ OK | OK |

**Estado:** ✅ OK - Todo alineado

---

## 🗄️ PRISMA - SCHEMA & MIGRATIONS

**File:** `backend/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Estado:** ✅ OK
- Provider: PostgreSQL ✅
- Datasource: Correctamente configurado ✅
- URL: env("DATABASE_URL") - Obtenido de Fly.io secrets ✅

**Migrations:**
```
✅ backend/prisma/migrations/20260117002524_init/
⚠️ backend/prisma/migrations_sqlite_backup/        (ANTIGUO - SQLite)
⚠️ backend/prisma/migrations_sqlite_backup_renamed/ (ANTIGUO - SQLite)
```

**⚠️ LIMPIEZA NECESARIA:**
- Las carpetas `migrations_sqlite_backup*` deberían ser removidas
- Son restos de cuando probaban SQLite localmente

---

## 🐳 DOCKER - DOCKERFILE

**File:** `Dockerfile` (raíz del proyecto)

```dockerfile
FROM node:20-alpine AS builder      ✅ OK - Alpine es pequeño
RUN npm ci                          ✅ OK - Determinístico
RUN npm run prisma:generate         ✅ OK - Genera client
EXPOSE 3001                         ✅ OK
HEALTHCHECK                         ✅ OK - Health checks
```

**Estado:** ✅ OK
- Multistage build: ✅
- Prisma Client generado: ✅
- Health checks: ✅

---

## 🚀 FLY.IO - fly.toml

**File:** `fly.toml`

```toml
app = "alacena-backend"
primary_region = "gru"              ✅ São Paulo (cercano a Argentina)
internal_port = 3001                ✅ OK
NODE_ENV = "production"             ✅ OK
PORT = "3001"                       ✅ OK
```

**Estado:** ✅ OK
- App name: correcto
- Region: optimizado
- Puertos: correctos

---

## 🔐 VARIABLES DE ENTORNO

### Backend (Fly.io secrets)
```
✅ DATABASE_URL = postgresql://postgres:DjDK6YNUopieqRGW@[IPv6]:5432/postgres?schema=public
```

### Frontend (Vercel Environment Variables)
```
✅ NEXT_PUBLIC_API_URL = https://alacena-backend.fly.dev
✅ NEXT_PUBLIC_SUPABASE_URL = https://<tu-proyecto>.supabase.co
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY = <anon-key>
```

**Estado:** ✅ OK
- DATABASE_URL: Actualizada con nueva contraseña
- API_URL: Apunta correctamente a Fly.io
- CORS: Habilitado en backend

---

## 🛣️ RUTAS DEL BACKEND

**File:** `backend/src/app.js`

```
✅ GET  /health                      (Health check)
✅ GET  /api/reserves               (Lista)
✅ GET  /api/items                  (Lista)
✅ GET  /api/locations              (Lista)
✅ GET  /api/menu-items             (Lista)
✅ GET  /api/containers             (Lista)
✅ GET  /api/batches                (Lista)
```

**Estado:** ✅ OK
- Todas las rutas implementadas
- CORS habilitado en todas
- Health check funcional

---

## 🎨 RUTAS DEL FRONTEND

**File:** `frontend/alacena-app/app/`

```
✅ /                         (Home - OK)
✅ /guest/menu              (Menú público - OK)
⚠️ /dashboard               (En construcción - 404)
   ⚠️ /dashboard/items      (No existe)
   ⚠️ /dashboard/locations  (No existe)
   ⚠️ /dashboard/reserves   (No existe)
   ⚠️ /dashboard/menu       (No existe)
```

**Estado:** ⚠️ PARCIAL
- Home: ✅ Funciona
- Menú: ✅ Funciona (conecta a backend)
- Dashboard: ❌ Devuelve 404

**Causa del 404:**
- Layout Server Component + Page Client Component = conflicto
- Simplificamos page.tsx pero layout.tsx aún puede causar problemas

---

## 🔧 CONFIGURACIÓN DE HERRAMIENTAS

### Next.js Config
**File:** `frontend/alacena-app/next.config.js`

```javascript
const nextConfig = {
  reactStrictMode: true,
}
```

**Estado:** ✅ OK
- Removidas las env vars procesadas en config
- Las variables se cargan desde Vercel Environment

### Vercel Config
**File:** `frontend/alacena-app/vercel.json`

```json
{
    "version": 2,
    "buildCommand": "npm run build",
    "devCommand": "npm run dev"
}
```

**Estado:** ✅ OK
- Root Directory: `frontend/alacena-app` (confirmado en Settings)

---

## 📋 PROBLEMAS IDENTIFICADOS

| # | Problema | Severidad | Ubicación | Solución |
|---|----------|-----------|-----------|----------|
| 1 | Prisma client v6 + adapter v7 | ⚠️ ALTA | backend/package.json | Actualizar todo a v7 |
| 2 | Migraciones SQLite antiguas | 🟡 BAJA | backend/prisma/migrations_* | Eliminar carpetas backup |
| 3 | Dashboard devuelve 404 | 🔴 CRÍTICA | frontend/alacena-app/app/dashboard | Revisar layout+page interaction |
| 4 | Subrutas dashboard no existen | 🟡 MEDIA | frontend/alacena-app/app/dashboard/* | Crear pages para items, locations, etc |

---

## ✅ LISTA DE VERIFICACIÓN FINAL

- [x] Backend compilable y deployado
- [x] Frontend compilable y deployado
- [x] Base de datos conectada correctamente
- [x] Health check funcionando
- [x] API /menu-items respondiendo datos
- [ ] Dashboard /dashboard accesible
- [ ] Todas las rutas del dashboard funcionando
- [ ] Prisma versiones alineadas
- [ ] Migraciones SQLite removidas
- [ ] Variables de entorno correctas

---

## 🎯 PRÓXIMOS PASOS

1. **CRÍTICO:** Arreglar dashboard 404
   - Revisar layout.tsx + page.tsx interaction
   - Possible: Remover layout.tsx y hacerlo diferente

2. **IMPORTANTE:** Alinear Prisma v7
   - `npm install @prisma/client@latest prisma@latest @prisma/adapter-pg@latest`

3. **LIMPIEZA:** Remover carpetas de migrations viejas
   - Eliminar `migrations_sqlite_backup*`

4. **CONSTRUCCIÓN:** Crear pages del dashboard
   - `/dashboard/items`
   - `/dashboard/locations`
   - `/dashboard/reserves`
   - `/dashboard/menu`

---

**Documentado:** 2026-01-17 01:30 UTC
**Estado:** AUDITORÍA EN PROGRESO
