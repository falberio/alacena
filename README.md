# 🧺 ALACENA - README Principal

## ⚡ EMPEZÁ AQUÍ

### 📌 Primero que nada
Abre esto en **CADA nueva sesión**:
```
docs/sesiones/INDEX.md  ← Qué se hizo antes
GETTING_STARTED.md      ← Cómo usar el sistema
QUICK_REFERENCE.md      ← Acceso rápido
```

### 🔗 URLs Importante (Copy-Paste)
```
Frontend:  https://alacena-frontend.vercel.app
Login:     https://alacena-frontend.vercel.app/login
Backend:   https://alacena-backend.fly.dev
```

### 🔑 Login de Prueba
```
Email:     admin@alacena.com
Password:  admin123
```

### ✅ Checklist para Nueva Sesión

- [ ] Abrí [GETTING_STARTED.md](./GETTING_STARTED.md)
- [ ] Verifiqué que backend responde: `curl https://alacena-backend.fly.dev/health`
- [ ] Testeé login en https://alacena-frontend.vercel.app/login
- [ ] Ahora estoy listo para trabajar

### 🚀 Hacer Deploy Rápido

```bash
cd c:\Users\Usuario\alacena

# Hice cambios, ahora debo guardar:
git add -A
git commit -m "feat: Descripción de qué cambié"
git push

# ¡Listo! Vercel + Fly.io se actualizan solos (2-5 min)
```

### 📊 Status Actual

| Componente | Status | Última actualización |
|------------|--------|---------------------|
| Frontend | ✅ Online | Hoy 22:00 |
| Backend | ✅ Online | Hoy 22:00 |
| Base de datos | ✅ Conectada | Hoy 22:00 |
| Autenticación | ✅ Funcional | Hoy 22:00 |

### 🆘 Algo no funciona?

1. **Revisar logs del backend:**
   - https://fly.io/dashboard → alacena-backend → Logs

2. **Frontend lento?**
   - Limpiar cache: Ctrl+Shift+Delete
   - Recargar: Ctrl+F5

3. **Error de login?**
   - Verificar email exacto: `admin@alacena.com`
   - Verificar password exacta: `admin123`

4. **API no responde?**
   - Verificar: `curl https://alacena-backend.fly.dev/health`
   - Si no responde, revisar logs de Fly.io

### 🗂️ Estructura Importante

```
alacena/
├── frontend/alacena-app/    ← Cambios aquí = Vercel redeploy
├── backend/                 ← Cambios aquí = Fly.io redeploy
├── docs/
│   ├── sesiones/            ← Historial de trabajo
│   └── MAPA_VISUAL.md       ← Todas las funciones disponibles
├── GETTING_STARTED.md       ← Lee esto primero
├── QUICK_REFERENCE.md       ← Comandos + URLs + Modelos
├── STATUS.md                ← Qué está hecho
└── README.md                ← Este archivo (¡que estás leyendo!)
```

### 💡 Recordar

- **Siempre commit antes de cambiar ramas**
- **Siempre push después de cambios**
- **Los deploys son automáticos con git push**
- **La documentación está en `/docs/sesiones/`**

### 🎯 Próximos Pasos Típicos

**Opción A: Crear nueva feature**
1. Lee MAPA_VISUAL.md para ver qué es posible
2. Crea rama: `git checkout -b feature/mi-feature`
3. Haz cambios
4. Commit + push
5. Verifica en producción

**Opción B: Arreglar bug**
1. Reproduce el error en producción
2. Revisa logs (Fly.io o Vercel)
3. Haz fix local
4. Commit + push
5. Verifica que funcionó

**Opción C: Revisar qué se hizo antes**
1. Abre `/docs/sesiones/INDEX.md`
2. Abre la última sesión completada
3. Lee qué se hizo, problemas, decisiones

---

**Última actualización:** 17-01-2026  
**Próxima acción:** Abre [GETTING_STARTED.md](./GETTING_STARTED.md)
