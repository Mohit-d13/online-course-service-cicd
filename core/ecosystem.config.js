module.exports = {
  apps: [
    {
      name: "flask-app",
      script: "./flask-back/.venv/bin/gunicorn",
      args: "--bind 0.0.0.0:5000 app:app",
      cwd: "./flask-back",
      interpreter: "none",
      env: {}   // PM2 will inherit variables from shell
    },
    {
      name: "express-app",
      script: "npm",
      args: "start",
      cwd: "./express-front",
      env: {}   // PM2 will inherit variables from shell
    }
  ]
};
