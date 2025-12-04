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
                        cp $FLASK_ENV_FILE core/flask-back/.env.frontend
                        cp $EXPRESS_ENV_FILE core/express-front/.env.backend
                    '''
                }
            }
        }

        stage('Build Flask Backend') {
            steps {
                dir('core/flask-back') {
                    sh '''
                        python3 -m venv .venv
                        source .venv/bin/activate
                        pip install -r requirements.txt
                    '''
                }
            }
        }

        stage('Build Express Frontend') {
            steps {
                dir('core/express-front') {
                    sh '''
                        npm install
                        npm run build || echo "Build skipped"
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                dir('core/'){
                    sh '''
                        # Restart apps using PM2
                        cd core/
                        pm2 stop all || true
                        pm2 start ecosystem.config.js
                        pm2 save
                        EOF
                    '''
                }        
            }
        }
    }
}
