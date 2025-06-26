const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

const db = new sqlite3.Database('./ideas.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the ideas database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ideas (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    fecha TEXT,
    descripcion TEXT,
    alias TEXT
  )`);
});

app.post('/api/ideas', (req, res) => {
  const { nombre, descripcion, alias } = req.body;


  if (!nombre) {
    return res.status(400).json({ error: 'El campo "nombre" es requerido.' });
  }
  const newIdea = {
    id: uuidv4(),
    nombre,
    fecha: new Date().toISOString(),
    descripcion: descripcion || '',
    alias: alias || ''
  };
  db.run(
    `INSERT INTO ideas (id, nombre, fecha, descripcion, alias) VALUES (?, ?, ?, ?, ?)`,
    [newIdea.id, newIdea.nombre, newIdea.fecha, newIdea.descripcion, newIdea.alias],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(newIdea);
    }
  );
});

app.get('/api/ideas', (req, res) => {
  db.all(`SELECT * FROM ideas ORDER BY fecha DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.delete('/api/ideas', (req, res) => {
  const id = req.query.id;
  const todas = req.query.todas;
  const password = req.query.password;

  if (password !== 'funhack') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere una contraseña válida.' });
  }

  if (id) {
    if (todas) {
      return res.status(400).json({ error: 'Debe especificar "id".' });
    }
    db.get(`SELECT * FROM ideas WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'Idea no encontrada.' });
      }
      db.run(`DELETE FROM ideas WHERE id = ?`, id, function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(row);
      });
    });
  } else if (todas === 'true') {
    db.run(`DELETE FROM ideas`, [], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Todas las ideas han sido eliminadas.' });
    });
  } else {
    res.status(400).json({ error: 'Debe proporcionar un "id" para borrar una idea específica, o "todas=true" para borrar todas las ideas.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
