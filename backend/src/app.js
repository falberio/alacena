import express from 'express'
import cors from 'cors'
import reservesRoutes from './routes/reserves.routes.js'
import itemsRoutes from './routes/items.routes.js'
import locationsRoutes from './routes/locations.routes.js'
import menuItemsRoutes from './routes/menuItems.routes.js'
import containersRoutes from './routes/containers.routes.js'
import batchesRoutes from './routes/batches.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', app: 'alacena', timestamp: new Date().toISOString() });
});

// Rutas de API
app.use('/api/reserves', reservesRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/menu-items', menuItemsRoutes);
app.use('/api/containers', containersRoutes);
app.use('/api/batches', batchesRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

export default app;