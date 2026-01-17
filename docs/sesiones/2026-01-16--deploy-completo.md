# Sesión: Deploy Completo a Producción - Fly.io
**Fecha:** 2026-01-16  
**Hora inicio:** 10:15  
**Hora fin:** 17:45 (Pausado - Próximo: Instalar flyctl)

## 🎯 Objetivos de la sesión
- [x] Resolver problemas previos de deploy (Vercel, Railway fallaron)
- [x] Limpiar BD y migraciones de Prisma
- [x] Decidir plataforma de hosting
- [ ] Deployar backend en Fly.io (EN PROGRESO)
- [ ] Deployar frontend en Vercel
- [ ] Testear desde celular

## ✅ Acciones realizadas

### Base de datos y migraciones
- ✅ Renombró carpeta `prisma/migrations_sqlite_backup_renamed` (SQLite)
- ✅ Ejecutó `npx prisma migrate reset --force` en Supabase
- ✅ Creó migración nueva: `20260117002524_init` (PostgreSQL)
- ✅ Ejecutó seed: datos iniciales cargados en la BD
- ✅ Verificó que DB está lista: Locations, Items, MenuItems, etc.

### Configuración Git y repositorio
- ✅ Revisó que el repo GitHub ya estaba inicializado (`git status` OK)
- ✅ Hizo commit: `feat: Setup Prisma migrations y preparación para deploy en Render`
- ✅ Pusheó cambios a GitHub: `https://github.com/falberio/alacena.git`

### Decisión de plataforma
- ✅ Evaluó opciones: Vercel (intentado antes, falló), Railway (pago), Render (free tier limitado)
- ✅ Decidió: **Fly.io** (Gratis, sin tarjeta, no se duerme)
- ✅ Analizó riesgos: 65-70% probabilidad de éxito (30-35% chance de fallas en Prisma/Docker o conexión IPv6)

### Preparación Fly.io
- ✅ Creó `Dockerfile` en raíz del proyecto
  - Usa Alpine Node 20 (pequeño y rápido)
  - Multistage build (menor tamaño final)
  - Prisma Client generado en build
  - Health check configurado
- ✅ Creó `fly.toml` con configuración
  - App name: `alacena-backend`
  - Region: `eze` (Buenos Aires)
  - Puerto: 3001
  - Concurrencia: soft 20, hard 25

### Sistema de documentación
- ✅ Creó carpeta `docs/sesiones/`
- ✅ Creó `INDEX.md` con tabla de sesiones
- ✅ Creó este archivo de sesión

## 🔧 Cambios en archivos

| Archivo | Cambio | Motivo |
|---------|--------|--------|
| [backend/package.json](backend/package.json) | Actualizado scripts | Prisma v7 compatible |
| [backend/prisma/schema.prisma](backend/prisma/schema.prisma) | Datasource + generador | Configuración PostgreSQL |
| [backend/prisma/seed.js](backend/prisma/seed.js) | Datos iniciales | Seedear BD |
| [backend/Procfile](backend/Procfile) | Creado | Para Render (descartado) |
| [backend/.env.example](backend/.env.example) | Creado | Documentación de variables |
| [Dockerfile](Dockerfile) | **Creado** | Build para Fly.io |
| [fly.toml](fly.toml) | **Creado** | Configuración de Fly.io |
| [docs/sesiones/INDEX.md](docs/sesiones/INDEX.md) | **Creado** | Registro de sesiones |
| [docs/sesiones/2026-01-16--deploy-completo.md](docs/sesiones/2026-01-16--deploy-completo.md) | **Este archivo** | Sesión actual |

## ⚠️ Errores/Bloqueadores encontrados

### Problema: Conversación anterior perdida
- **Contexto:** Usuario mencionó conversación de ayer donde probaron Vercel, Railway y Render
- **Causa:** Conversación no fue guardada en `docs/conversaciones/`
- **Solución:** Implementar sistema de documentación de sesiones (YA HECHO)

### Problema: Usuario preocupado por costos
- **Contexto:** Asistente recomendó Render sin verificar si era pago
- **Usuario tenía:** Suscripción activa en Railway (con tarjeta)
- **Lección aprendida:** Ser más cuidadoso con recomendaciones de hosting

### Problema: Confianza en solución
- **Contexto:** Múltiples intentos fallidos (Vercel, Railway, etc.)
- **Solución:** Análisis PROFUNDO de riesgos de Fly.io antes de proceder
- **Acuerdo:** Aceptar 30-35% de margen de error, ser honesto siempre

## 📌 PRÓXIMOS PASOS (En orden)

**PARADO AQUÍ:** El usuario va a instalar `flyctl`

1. **Usuario instala flyctl CLI:**
   ```powershell
   iwr https://fly.io/install.ps1 -useb | iex
   flyctl version  # Verificar instalación
   ```
   Luego reporta al asistente

2. **Asistente: Autenticar en Fly.io**
   ```powershell
   flyctl auth login
   ```

3. **Asistente: Iniciar app en Fly.io**
   ```powershell
   cd c:\Users\Usuario\alacena
   flyctl launch  # Esto crea el app name si no existe
   ```

4. **Asistente: Configurar variable de entorno DATABASE_URL**
   ```powershell
   flyctl secrets set DATABASE_URL="postgresql://postgres:<&kHkptQH?sb-z9C>@[2600:1f18:2e13:9d1c:faba:208:6f00:de21]:5432/postgres?schema=public"
   ```

5. **Asistente: Deployar**
   ```powershell
   flyctl deploy
   ```

6. **Testear endpoint:**
   ```powershell
   flyctl open /health
   ```

7. **Configurar frontend:**
   - Obtener URL de Fly.io
   - Configurar en Vercel como `NEXT_PUBLIC_API_URL`
   - Frontend apunta al backend

8. **Testear desde celular:**
   - Acceder a frontend Vercel desde celular
   - Ver menú/recetas (llamadas al backend Fly.io)

## 🔗 Referencias
- GitHub: https://github.com/falberio/alacena
- Supabase DB: PostgreSQL (conexión IPv6)
- Decisión: [Análisis de Fly.io](#análisis-de-flyio) (ver arriba)
- Sistema sesiones: [INDEX.md](INDEX.md)

---

## 📝 NOTAS IMPORTANTES

### Para la PRÓXIMA SESIÓN:
1. **Empezar aquí:** Instalar `flyctl` (punto de parada actual)
2. **Leer este archivo completo** para entender decisiones tomadas
3. **No cambiar a otra plataforma** sin consultar antes (ya probamos varias)
4. **Mantener honestidad:** Si algo falla, reportar y analizar juntos

### Sobre costos:
- ✅ Supabase: GRATIS (con límites razonables)
- ✅ Fly.io: GRATIS (sin tarjeta de crédito)
- ✅ Vercel: GRATIS (plan hobby)
- ❌ Railway: Probado, falló, cancelar si hay cargo pendiente

### Sobre Dockerfile/Fly.io:
- No modificar Dockerfile a menos que sea necesario
- Si falla deploy, los logs estarán en `flyctl logs`
- Si hay error en Prisma, debuggear localmente primero

---

## 📊 ARQUITECTURA FINAL PLANEADA

```
┌─────────────────┐
│   CELULAR/WEB   │
└────────┬────────┘
         │
    HTTPS/HTTP
         │
    ┌────▼─────────────────────┐
    │   Vercel (Frontend)       │
    │   Next.js                 │
    │   https://alacena...      │
    └────┬──────────────────────┘
         │ (API calls)
         │
    ┌────▼──────────────────┐
    │  Fly.io (Backend)      │
    │  Express + Prisma      │
    │  alacena-backend.fly.. │
    └────┬──────────────────┘
         │ (Queries)
         │
    ┌────▼──────────────────┐
    │  Supabase             │
    │  PostgreSQL           │
    │  IPv6                 │
    └───────────────────────┘
```

---

**Documentado por GitHub Copilot — 2026-01-16 17:45**
