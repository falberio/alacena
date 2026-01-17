# Guía Rápida de Troubleshooting

## Error: "Error al guardar item de menú"

### Causas Comunes:

1. **Item no seleccionado**: El campo "Selecciona el item asociado" está vacío
   - ✅ Solución: Selecciona un item del dropdown

2. **Campo de nombre vacío**: El campo "Nombre visible en menú" está vacío
   - ✅ Solución: Escribe un nombre para mostrar en el menú

3. **Sin items creados**: No hay items en el sistema
   - ✅ Solución: Ve a `/dashboard/items` y crea al menos un item primero

4. **Errores de Backend**:
   - ✅ Comprueba que `https://alacena-backend.fly.dev` está activo
   - ✅ Revisa los logs en Fly.io: `flyctl logs -a alacena-backend`

5. **Base de datos desconectada**:
   - ✅ Verifica en Supabase que la base de datos está en línea
   - ✅ Comprueba la DATABASE_URL en Fly.io secrets

## Error: "Página cargando muy lentamente"

### Optimizaciones Aplicadas:
- ✅ Reducido limit de items de 100 a 50 en todas las páginas
- ✅ Items se cargan con Promise.all (paralelo, no secuencial)
- ✅ Agregado loading indicator durante operaciones

### Qué puedes hacer:
1. **Limpia cache del navegador**: Ctrl+Shift+Del → Clear browsing data
2. **Espera a que deploy termine**: Los cambios se están desplegando
3. **Abre DevTools (F12)**:
   - Network tab: Verifica que las llamadas API < 2 segundos
   - Console tab: Busca mensajes de error rojo

## URLs Importantes:

| Servicio | URL |
|----------|-----|
| Frontend | https://alacena-frontend.vercel.app |
| Backend | https://alacena-backend.fly.dev |
| Health Check | https://alacena-backend.fly.dev/health |
| API Docs | https://alacena-backend.fly.dev/api-docs |

## Test Login:

```
Email: admin@alacena.com
Password: admin123
```

## Comandos Útiles:

```bash
# Backend logs
flyctl logs -a alacena-backend

# Check database connection
curl https://alacena-backend.fly.dev/health

# Test API
curl https://alacena-backend.fly.dev/api/items

# See frontend deployment logs
vercel logs --project alacena-frontend
```

## Contacto:
Si el problema persiste, revisa:
1. `/docs/MAPA_VISUAL.md` - Arquitectura completa
2. `/QUICK_REFERENCE.md` - Endpoints API
3. GitHub commits para qué cambió últimamente
