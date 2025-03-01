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
                
            docker up --build -d
                 

                    
                  """
                 }
             
            }
        }
    }
