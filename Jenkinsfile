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

                        pm2 start .venv/bin/gunicorn --name flask-app -- \
                            "app:app" -b 0.0.0.0:5000
                    '''
                }
            }
        }

        stage('Build & Deploy Express Frontend') {
            steps {
                dir('core/express-front') {
                    sh '''
                        npm install
                        npm run build

                        pm2 stop express-app || true
                        pm2 delete express-app || true

                        pm2 start index.js --name express-app
                    '''
                }
            }
        }

        stage('Show Logs') {
            steps {
                sh '''
                    pm2 logs flask-app --lines 50
                    pm2 logs express-app --lines 50
                '''
            }
        }
    }
}
