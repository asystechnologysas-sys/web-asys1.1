const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Base de Datos
const dbPath = path.join(__dirname, 'data', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error al abrir DB:', err);
    else {
        console.log('Conectado a SQLite');
        db.run(`CREATE TABLE IF NOT EXISTS contactos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            empresa TEXT,
            correo TEXT,
            telefono TEXT,
            mensaje TEXT,
            fecha DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para recibir el formulario
app.post('/api/contacto', (req, res) => {
    const { nombre, empresa, correo, telefono, mensaje } = req.body;
    const query = `INSERT INTO contactos (nombre, empresa, correo, telefono, mensaje) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(query, [nombre, empresa, correo, telefono, mensaje], function(err) {
        if (err) return res.status(500).json({ success: false, error: err.message });
        res.json({ success: true });
    });
});

// Ruta para ver los datos (admin)
app.get('/admin-registros', (req, res) => {
    db.all("SELECT * FROM contactos ORDER BY fecha DESC", [], (err, rows) => {
        if (err) return res.status(500).send("Error");
        
        let html = `<html><head><title>Admin ASYS</title><style>
            body { font-family: sans-serif; padding: 20px; background: #f4f7fc; }
            table { width: 100%; border-collapse: collapse; background: white; }
            th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
            th { background: #1554ff; color: white; }
        </style></head><body>
            <h1>Mensajes Recibidos</h1>
            <table><tr><th>ID</th><th>Nombre</th><th>Empresa</th><th>Email</th><th>Tel</th><th>Mensaje</th><th>Fecha</th></tr>`;
        
        rows.forEach(row => {
            html += `<tr><td>${row.id}</td><td>${row.nombre}</td><td>${row.empresa}</td><td>${row.correo}</td><td>${row.telefono}</td><td>${row.mensaje}</td><td>${row.fecha}</td></tr>`;
        });
        
        html += `</table></body></html>`;
        res.send(html);
    });
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));