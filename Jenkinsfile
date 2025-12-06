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

                        chmod 600 core/flask-back/.env.backend
                        chmod 600 core/express-front/.env.frontend
                    '''
                }
            }
        }

        stage('Build Flask Backend') {
            steps {
                dir('core/flask-back') {
                    sh '''
                        python3 -m venv .venv
                        .venv/bin/pip install --upgrade pip
                        .venv/bin/pip install -r requirements.txt
                    '''
                }
            }
        }

        stage('Build Express Frontend') {
            steps {
                dir('core/express-front') {
                    sh '''
                        npm ci
                    '''
                }
            }
        }

        stage('Deploy with PM2') {
            steps {
                 dir('core') {
                    sh '''
                        sudo -u ubuntu bash -c '
                        export PM2_HOME=/home/ubuntu/.pm2

                        set -a
                        . $(pwd)/flask-back/.env.backend
                        . $(pwd)/express-front/.env.frontend
                        set +a

                        pm2 delete all || true
                        pm2 start ecosystem.config.js
                        pm2 save
                        '
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
