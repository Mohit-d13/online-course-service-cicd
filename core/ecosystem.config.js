// ecosystem.config.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'flask-back/.env.backend') });
require('dotenv').config({ path: path.join(__dirname, 'express-front/.env.frontend') });

module.exports = {
  apps: [
    {
      name: "flask-app",
      script: "./flask-back/.venv/bin/gunicorn",
      args: "--bind 0.0.0.0:5000 app:app",
      cwd: "./flask-back",
      interpreter: "none",
      env: {
        ...process.env
      }
    },
    {
      name: "express-app",
      script: "npm",
      args: "start",
      cwd: "./express-front",
      env: {
        ...process.env
      }
    }
  ]
};
