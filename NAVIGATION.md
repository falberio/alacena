# 🗺️ MAPA VISUAL DE DOCUMENTACIÓN

```
┌─────────────────────────────────────────────────────────────────┐
│                  🏠 PUNTO DE ENTRADA                            │
│              (Comienza aquí en nueva sesión)                    │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
                ┌─────────────────────────┐
                │   1. Leer en 5 minutos: │
                │   📄 GETTING_STARTED.md │
                └─────────────────────────┘
                            │
                            ▼
                ┌─────────────────────────┐
                │  2. Ver estado actual:  │
                │   📊 STATUS.md          │
                └─────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │ Probar       │ │ Solucionar   │ │ Entender     │
    │ cambios      │ │ un error     │ │ arquitectura │
    └──────────────┘ └──────────────┘ └──────────────┘
    📄 TESTING.md    📄 TROUBLESHOOTING.md  📄 QUICK_REFERENCE.md
           │                 │                      │
           └─────────┬───────┴──────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  Necesitas más detalles?   │
        └────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  📄 MAPA_VISUAL.md         │
        │  (Arquitectura completa)   │
        │                            │
        │  📄 OPTIMIZATIONS.md       │
        │  (Cambios técnicos)        │
        │                            │
        │  📄 Historial.md           │
        │  (Qué pasó cada sesión)    │
        └────────────────────────────┘
```

---

## 📖 Índice Rápido por Necesidad

### 🚀 "Quiero empezar rápido"
```
1. README.md (2 min)
   └─ GETTING_STARTED.md (5 min)
      └─ Abre el navegador y listo
```

### 🔧 "Algo no funciona"
```
1. TROUBLESHOOTING.md (5 min)
   └─ ¿Problema del backend? → QUICK_REFERENCE.md (API status)
      ¿Problema del frontend? → TESTING.md (cómo verificar)
         ¿Sigue sin funcionar? → docs/sesiones/ (historial)
```

### 📚 "Quiero entender todo"
```
1. docs/MAPA_VISUAL.md (30 min - read)
   └─ Entiende cada componente
      └─ Revisa los commits en GitHub
         └─ Lee el código fuente en /frontend y /backend
```

### 🏗️ "Quiero agregar una feature"
```
1. docs/MAPA_VISUAL.md → Data Flow (15 min)
   └─ QUICK_REFERENCE.md → Endpoints (5 min)
      └─ Revisa ejemplo: /backend/src/controllers/items.controller.js
         └─ Copia estructura para tu nueva feature
```

### 🐛 "Hay un error en el código"
```
1. F12 DevTools → Console tab
   └─ Copia el error completo
      └─ Busca en QUICK_REFERENCE.md
         └─ Si no está, revisa TROUBLESHOOTING.md
            └─ Si sigue sin resolver, abre GitHub Issue
```

---

## 🎯 Archivos por Prioridad

### 🔴 CRÍTICO (Lee primero)
```
├─ README.md              ← Punto de entrada
├─ GETTING_STARTED.md     ← Guía rápida (5 min)
├─ STATUS.md              ← Estado actual
└─ INDEX.md               ← Este índice
```

### 🟠 IMPORTANTE (Lee segundo)
```
├─ TESTING.md             ← Cómo verificar cambios
├─ TROUBLESHOOTING.md     ← Solucionar problemas
├─ QUICK_REFERENCE.md     ← API reference
└─ RESUMEN_SESION.md      ← Qué cambió recientemente
```

### 🟡 REFERENCIA (Consúltalo según necesites)
```
├─ docs/MAPA_VISUAL.md    ← Arquitectura completa
├─ docs/COPILOT-INSTRUCCIONES.md ← Para el AI
├─ OPTIMIZATIONS.md       ← Cambios técnicos
└─ docs/sesiones/         ← Historial de sesiones
```

---

## 📱 Versión Móvil (Quick Access)

**¿Dónde buscar en 10 segundos?**

| Pregunta | Respuesta |
|----------|-----------|
| ¿Está vivo el sistema? | [STATUS.md](STATUS.md) |
| ¿Cómo inicio? | [GETTING_STARTED.md](GETTING_STARTED.md) |
| ¿Cómo pruebo? | [TESTING.md](TESTING.md) |
| ¿Qué es eso? | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| ¿Cómo arreglo? | [TROUBLESHOOTING.md](TROUBLESHOOTING.md) |
| ¿Cómo funciona? | [docs/MAPA_VISUAL.md](docs/MAPA_VISUAL.md) |
| ¿Qué cambió? | [RESUMEN_SESION.md](RESUMEN_SESION.md) |

---

## 🔗 Enlaces Útiles

```
Frontend:
├─ Live: https://alacena-frontend.vercel.app
├─ Login: https://alacena-frontend.vercel.app/login
└─ Dashboard: https://alacena-frontend.vercel.app/dashboard

Backend:
├─ Live: https://alacena-backend.fly.dev
├─ Health: https://alacena-backend.fly.dev/health
├─ Items: https://alacena-backend.fly.dev/api/items?limit=50
└─ Logs: https://fly.io/apps/alacena-backend

Database:
├─ Supabase: https://app.supabase.com
└─ Region: Buenos Aires, South America

Version Control:
├─ GitHub: https://github.com/falberio/alacena
└─ Commits: git log --oneline
```

---

## 💡 Tips de Navegación

### En VSCode
```
Ctrl+P     → Abre archivo por nombre
Ctrl+Shift+F → Busca en todos los archivos
Ctrl+/     → Comentar/descomentar línea
F5         → Ir a definición
Shift+F12  → Buscar referencias
```

### En GitHub
```
- Commits recientes: rama 'main'
- Ver cambios: Compare branch/main
- Issues: Reportar bugs
- Pull Requests: Cambios pendientes
```

### En Vercel
```
Dashboard → alacena-frontend
  ├─ Deployments → Ver historial
  ├─ Logs → Errores en tiempo real
  └─ Settings → Variables de entorno
```

### En Fly.io
```
Dashboard → alacena-backend
  ├─ Logs → Errores en tiempo real
  ├─ Secrets → API keys y credenciales
  └─ Monitoring → CPU, memoria, etc
```

---

## 🎓 Rutas de Aprendizaje

### Principiante (2 horas)
```
1. README.md (5 min)
2. GETTING_STARTED.md (10 min)
3. STATUS.md (10 min)
4. TESTING.md (30 min)
5. QUICK_REFERENCE.md (60 min)
Total: 115 minutos
```

### Intermedio (4 horas)
```
1. Beginner path (2 horas)
2. TROUBLESHOOTING.md (30 min)
3. OPTIMIZATIONS.md (30 min)
4. docs/MAPA_VISUAL.md (60 min)
Total: 4 horas
```

### Avanzado (1 día)
```
1. Intermedio path (4 horas)
2. Revisa todo el código del backend
3. Revisa todo el código del frontend
4. Lee todos los commits en GitHub
Total: 8 horas
```

---

## ✅ Checklist Inicial

Al abrir en nueva sesión:

```
□ Abrí README.md
□ Abrí GETTING_STARTED.md
□ Verifiqué STATUS.md
□ Probé login en https://alacena-frontend.vercel.app
□ Verifiqué que backend responde: /health
□ Revisé cambios recientes en RESUMEN_SESION.md
□ Sé dónde buscar si tengo dudas (este archivo)
```

---

## 🚨 Emergencias

**Si algo está roto:**

1. Abre [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Sigue los pasos de verificación
3. Si persiste, revisa:
   - Vercel logs: https://vercel.com/dashboard
   - Fly.io logs: https://fly.io/dashboard
   - Backend health: https://alacena-backend.fly.dev/health
4. Si aún no se resuelve, abre issue en GitHub

---

## 📞 Preguntas Frecuentes Rápidas

**P: ¿Dónde está el código?**  
R: `/backend` y `/frontend/alacena-app`

**P: ¿Cómo hago un deploy?**  
R: `git push` - Auto-deploy a Vercel + Fly.io

**P: ¿Cómo agrego una entidad nueva?**  
R: Copia estructura de `/backend/src/controllers/items.controller.js`

**P: ¿Dónde están los secretos?**  
R: Vercel y Fly.io dashboards (no en código)

**P: ¿Cómo hago un reset de base de datos?**  
R: Supabase dashboard → SQL Editor → DROP & recreate

**P: ¿Performance sigue lento?**  
R: [TROUBLESHOOTING.md](TROUBLESHOOTING.md) → Performance section

---

**Última actualización:** 17 Enero 2026  
**Versión:** 1.0  
**Para:** Navegación rápida en futuras sesiones
