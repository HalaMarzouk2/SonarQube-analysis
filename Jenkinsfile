pipeline {
    agent any

   

    stages {
      
     stage('Update APP_VERSION') {
            steps {
                script {
                    // Update the APP_VERSION in docker-compose.yml
                    sh """
                    echo ' hello halaaaaaaaa $APP_VERSION '
                        sed -i 's/APP_VERSION=.*/APP_VERSION=${BUILD_NUMBER}/' ./docker-compose.yml
                        sed -i 's/DOCKER_TAG=.*/DOCKER_TAG=${BUILD_NUMBER}/' ./docker-compose.yml
                        
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
