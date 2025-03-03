pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        APP_VERSION = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo/your-project.git'
            }
        }

        stage('Update APP_VERSION') {
            steps {
                script {
                    // Update the APP_VERSION in docker-compose.yml
                    sh """
                        sed -i 's/APP_VERSION=.*/APP_VERSION=${APP_VERSION}/' ${DOCKER_COMPOSE_FILE}
                    """
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Docker Compose') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }


}
