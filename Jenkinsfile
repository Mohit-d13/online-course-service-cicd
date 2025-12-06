pipeline {
    agent any

    stages {

        stage('Setup Env Files') {
            steps {
                withCredentials([
                    file(credentialsId: 'backend-secret', variable: 'FLASK_ENV_FILE'),
                    file(credentialsId: 'frontend-secret', variable: 'EXPRESS_ENV_FILE')
                ]) {
                    sh '''
                        cp $FLASK_ENV_FILE core/flask-back/.env.backend
                        cp $EXPRESS_ENV_FILE core/express-front/.env.frontend

                        chmod u+rw,g+r,o+r core/flask-back/.env.backend || true
                        chmod u+rw,g+r,o+r core/express-front/.env.frontend || true
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

                        pm2 stop flask-app || true
                        pm2 delete flask-app || true

                        pm2 start .venv/bin/gunicorn --name flask-app --cwd $(pwd) -- "app:app" -b 0.0.0.0:5000
                    '''
                }
            }
        }

        stage('Build & Deploy Express Frontend') {
            steps {
                dir('core/express-front') {
                    sh '''
                        npm ci || exit 1

                        pm2 stop express-app || true
                        pm2 delete express-app || true

                        # Start via npm so PM2 runs inside this directory with correct context
                        pm2 start npm --name express-app -- start --cwd $(pwd)
                    '''
                }
            }
        }
    }
}
