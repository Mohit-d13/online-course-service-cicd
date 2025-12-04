pipeline {
    agent any

    stages {

        stage('Setup Env Files') {
            steps {
                withCredentials([
                    file(credentialsId: 'frontend-secret', variable: 'FLASK_ENV_FILE'),
                    file(credentialsId: 'backend-secret', variable: 'EXPRESS_ENV_FILE')
                ]) {
                    sh '''
                        cp $FLASK_ENV_FILE core/flask-back/.env.backend
                        cp $EXPRESS_ENV_FILE core/express-front/.env.frontend
                    '''
                }
            }
        }

        stage('Build & Deploy Flask Backend') {
            steps {
                dir('core/flask-back') {
                    sh '''
                        python3 -m venv .venv
                        .venv/bin/pip install -r requirements.txt
                        pm2 start .venv/bin/python3 --name flask-app -- -m gunicorn "app:app" -b 0.0.0.0:5000
                    '''
                }
            }
        }

        stage('Build & Deploy Express Frontend') {
            steps {
                dir('core/express-front') {
                    sh '''
                        npm install
                        npm run build || echo "Build skipped"
                        pm2 start index.js
                    '''
                }
            }
        }
    }
}
