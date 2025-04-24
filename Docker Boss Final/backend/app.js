const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Fonction pour exécuter une commande SQLite
const executeSQL = (sql) => {
  return new Promise((resolve, reject) => {
    const command = `sqlite3 /data/database.sqlite -line '${sql}'`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      
      // Conversion du format ligne en JSON
      const lines = stdout.trim().split('\n');
      const messages = [];
      let currentMessage = {};
      
      lines.forEach(line => {
        if (line.trim() === '') {
          if (Object.keys(currentMessage).length > 0) {
            messages.push(currentMessage);
            currentMessage = {};
          }
        } else {
          const [key, value] = line.split(' = ');
          if (key && value) {
            currentMessage[key.trim()] = value.trim();
          }
        }
      });
      
      if (Object.keys(currentMessage).length > 0) {
        messages.push(currentMessage);
      }
      
      resolve(messages);
    });
  });
};

app.get('/messages', async (req, res) => {
  try {
    const messages = await executeSQL('SELECT * FROM messages');
    res.json(messages);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
