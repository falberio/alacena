# 🚀 ALACENA - Getting Started para Próximas Sesiones

## ⚡ Quick Start (Primera cosa que revisar)

### 1. Estado Actual (17 de Enero 2026)
**Status:** ✅ Full-stack deployado a producción

- ✅ Backend (Express) en **Fly.io**: https://alacena-backend.fly.dev
- ✅ Frontend (Next.js) en **Vercel**: https://alacena-frontend.vercel.app
- ✅ DB (PostgreSQL) en **Supabase**: Conectada y sincronizada
- ✅ Autenticación (NextAuth v5 + JWT): Funcional
- ✅ Dashboard admin (4 CRUD): Items, Locations, Reserves, Menu

### 2. URLs Principales
```
Frontend:     https://alacena-frontend.vercel.app
Dashboard:    https://alacena-frontend.vercel.app/dashboard
Backend API:  https://alacena-backend.fly.dev
API Health:   https://alacena-backend.fly.dev/health
```

### 3. Credenciales de Prueba
```
Email:    admin@alacena.com
Password: admin123
```

## 📖 Documentación - Dónde Encontrar Qué

| Archivo | Propósito | Lee esto si... |
|---------|-----------|----------------|
| [STATUS.md](./STATUS.md) | Estado actual del sistema | Quieres ver rápido qué está hecho |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Cómo deployar cambios | Hiciste cambios y necesitas pushear |
| [docs/sesiones/INDEX.md](./docs/sesiones/INDEX.md) | Índice de todas las sesiones | Quieres revisar qué se hizo antes |
| [docs/sesiones/2026-01-17--dashboard-y-auth.md](./docs/sesiones/2026-01-17--dashboard-y-auth.md) | Sesión anterior (Dashboard + Auth) | Necesitas entender cómo funciona todo |
| [docs/arquitectura.md](./docs/arquitectura.md) | Diseño del sistema | Quieres entender cómo está estructurado |

## 🔧 Workflow Típico para Próximas Sesiones

### Sesión: Agregar nueva feature

1. **Leo la sesión anterior:**
   ```bash
   # Ve a docs/sesiones/INDEX.md
   # Abre la última sesión completada
   ```

2. **Verifico que esté deployado:**
   ```bash
   # Abre en navegador: https://alacena-backend.fly.dev/health
   # Debe responder con JSON {"status":"ok",...}
   ```

3. **Hago cambios locales:**
   ```bash
   # Edita archivos en VSCode
   # Testea localmente si es necesario
   ```

4. **Commiteo y pusheo:**
   ```bash
   cd c:\Users\Usuario\alacena
   git add -A
   git commit -m "feat: Descripción de cambio"
   git push
   ```

5. **Espero auto-deploy:**
   ```bash
   # Fly.io y Vercel hacen deploy automático
   # Tarda ~2-5 minutos
   ```

6. **Verifico en producción:**
   ```bash
   # Abre https://alacena-frontend.vercel.app/dashboard
   # Testea la nueva feature
   ```

## 🐛 Si Algo No Funciona

### Problema: Backend retorna error
```bash
# Ver logs de Fly.io
# https://fly.io/dashboard → alacena-backend → Logs

# O desde terminal:
# flyctl logs -a alacena-backend
```

### Problema: Frontend da 404
```bash
# Verificar que se deployó en Vercel
# https://vercel.com → alacena-frontend → Deployments
# Si no aparece, hacer git push de nuevo
```

### Problema: Base de datos con errores
```bash
# Verificar conexión a Supabase
# https://supabase.com → alacena-db → SQL Editor

# Ver migrations:
# cd backend
# npx prisma migrate status
```

### Problema: NextAuth no funciona
```bash
# Verificar secrets en Fly.io:
# https://fly.io/dashboard → alacena-backend → Secrets
# Debe tener: DATABASE_URL, JWT_SECRET

# Verificar .env.local en frontend:
# cat frontend/alacena-app/.env.local
```

## 📝 Estructura de Carpetas (Referencia Rápida)

```
alacena/
├── frontend/alacena-app/    ← Cambios aquí = Vercel redeploy
├── backend/                 ← Cambios aquí = Fly.io redeploy
├── docs/
│   ├── sesiones/           ← Historial de todas las sesiones
│   └── arquitectura.md      ← Diseño del sistema
├── STATUS.md               ← Qué está hecho
├── DEPLOYMENT.md           ← Cómo deployar
└── README.md               ← Este archivo
```

## 🎯 Tareas Completadas (Para Referencia)

### ✅ Backend
- [x] 6 rutas CRUD (items, locations, reserves, menu-items, containers, batches)
- [x] Autenticación JWT (register, login, profile)
- [x] Validaciones en controladores
- [x] Prisma con User model
- [x] Seed de usuario de prueba
- [x] Deployado a Fly.io con auto-migrations

### ✅ Frontend
- [x] Dashboard con 4 secciones CRUD
- [x] Página de login integrada con backend
- [x] Middleware de protección de rutas
- [x] Validaciones Zod en formularios
- [x] Manejo de errores en UI
- [x] Deployado a Vercel

### ✅ DevOps
- [x] Fly.io app creada y configurada
- [x] Vercel project creada y configurada
- [x] Dockerfile actualizado con migrations + seed
- [x] GitHub Actions auto-deploy configurado
- [x] HTTPS en ambos (automático)

## 🚀 Ideas para Próximas Sesiones

### Fáciles (1-2 horas)
- [ ] Cambiar contraseña endpoint
- [ ] Logout endpoint
- [ ] Editar perfil
- [ ] Agregar más validaciones
- [ ] Mejorar estilos del dashboard

### Medianas (2-4 horas)
- [ ] Autenticación OAuth (Google, GitHub)
- [ ] Upload de imágenes/archivos
- [ ] Búsqueda con full-text search
- [ ] Paginación en tablas
- [ ] Exportar datos a CSV

### Complejas (4+ horas)
- [ ] WebSockets para real-time updates
- [ ] Reportes y dashboards analíticos
- [ ] App móvil con React Native
- [ ] QR scanning para inventario
- [ ] Notificaciones por email/SMS

## 📞 Notas Importantes

⚠️ **ANTES DE PRODUCCIÓN:**
1. Cambiar JWT_SECRET a algo seguro
2. Cambiar credenciales de prueba
3. Configurar CORS restrictivo
4. Habilitar rate limiting
5. Agregar logging

✅ **YA HECHO:**
- HTTPS en ambos servicios
- Database con backup automático (Supabase)
- Auto-deploy con git push
- Migrations automáticas

## 🔐 Credenciales Importantes (Guardadas Seguras)

| Servicio | Usuario/Email | Contraseña | Dónde |
|----------|---------------|-----------|-------|
| Supabase DB | postgres | DjDK6YNUopieqRGW | En Fly.io secrets (DATABASE_URL) |
| Fly.io | Tu email | (GitHub auth) | https://fly.io |
| Vercel | Tu email | (GitHub auth) | https://vercel.com |
| NextAuth | - | (JWT_SECRET) | En Fly.io secrets |
| Test User | admin@alacena.com | admin123 | En seed-users.js |

## 💡 Tips

1. **Usar Git para todo:** Commit pequeños con mensajes claros
   ```bash
   git commit -m "feat: Descripción clara de qué hiciste"
   ```

2. **Testing antes de push:**
   ```bash
   # Frontend
   npm run build  # en frontend/alacena-app
   
   # Backend
   node -c src/app.js  # chequea sintaxis
   ```

3. **Revisar logs después de deploy:**
   - Fly.io: https://fly.io/dashboard → Logs
   - Vercel: https://vercel.com → Deployments → View Logs

4. **Comunicación clara:** Cuando abras nueva sesión, di exactamente:
   - Qué quieres hacer
   - Qué esperas que pase
   - Qué error ves (si hay)

## 📞 Contacto / Ayuda

Si algo no funciona en la próxima sesión:

1. **Revisa esta guía** (probablemente responda aquí)
2. **Revisa la sesión anterior:** docs/sesiones/2026-01-17--dashboard-y-auth.md
3. **Describe el problema claramente:**
   - Qué intentaste hacer
   - Qué error ves
   - URL donde pasó
   - Si es backend o frontend

---

**Última actualización:** 17-01-2026
**Próxima sesión:** [Abre este archivo primero]
