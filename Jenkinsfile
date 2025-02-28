pipeline {
    agent any
    environment {
        APP_VERSION = "${env.BUILD_NUMBER}"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
 }
    
    stages {
        stage('build') {
            steps {
                sh """
docker-compose build --build-arg APP_VERSION=${APP_VERSION} --build-arg DOCKER_TAG=${DOCKER_TAG} && \
                        docker-compose up -d
                 

                    
                  """
                 }
             
            }
        }
    }
