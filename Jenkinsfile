pipeline {
    agent any

    stages {

     stage('Vesion') {
            steps {
                
                    sh """
                    echo ' hello halaaaa $BUILD_NUMBER '
                        sed -i 's/APP_VERSION=.*/APP_VERSION=${BUILD_NUMBER}/' ./docker-compose.yml
                        sed -i 's/DOCKER_TAG=.*/DOCKER_TAG=${BUILD_NUMBER}/' ./docker-compose.yml
                        
                    """
            }
        }

        stage('Build Docker Compose ') {
            steps {
                sh """
                docker compose build
                """
           }
        }
        
    stage('Run Container ') {
            steps {
                sh """
                docker compose up -d
                """
           }
        }

        
    }


}
