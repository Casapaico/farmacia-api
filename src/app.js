const express = require('express');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

app.use(express.json());

// Rutas
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/medicamentos', require('./routes/medicamentos'));
app.use('/api/compras',      require('./routes/compras'));
app.use('/api/laboratorios', require('./routes/laboratorios'));
app.use('/api/ventas',       require('./routes/ventas'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404
app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de datos sincronizada');
    app.listen(PORT, () => console.log(`🚀 API corriendo en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Error al conectar DB:', err.message);
    process.exit(1);
  });
