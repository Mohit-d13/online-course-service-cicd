module.exports = {
  apps: [
    {
      name: "flask-backend",
      cwd: "./flask-back",
      script: ".venv/bin/gunicorn",
      args: "app:app -b 0.0.0.0:5000",
      env_file: "./flask-back/.env.backend"
    },
    {
      name: "express-front",
      cwd: "./express-front",
      script: "index.js",
      interpreter: "/usr/bin/node",
      env_file: "./express-front/.env.frontend"
    }
  ]
}
