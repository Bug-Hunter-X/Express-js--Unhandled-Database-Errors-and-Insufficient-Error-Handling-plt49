const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
  const user = req.body;
  // Input validation
  if (!user || !user.name || !user.email) {
    return res.status(400).send('Missing required user data');
  }

  db.createUser(user, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      // More specific error handling based on error type
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('User already exists');
      }
      return res.status(500).send('Error creating user');
    } else {
      res.status(201).send('User created');
    }
  });
});

// ... rest of the Express app ...