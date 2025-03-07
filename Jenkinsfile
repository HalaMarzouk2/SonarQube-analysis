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



stage("Sonarqube Analysis") {
           environment {
    SCANNER_HOME = tool 'SonarQubeScanner'  // sonar-scanner is the name of the tool in the manage jenkins> tool configuration
   }
   steps {
    withSonarQubeEnv(installationName: 'SonarQubeScanner') {  //installationName is the name of sonar installation in manage jenkins>configure system
     bat "%SCANNER_HOME%/bin/sonar-scanner \
     -Dsonar.projectKey=demo-nodejs \
     -Dsonar.token=sqp_c5290a80ea8686b0ea73fe53ed79af4858544632 \
     -Dsonar.sources=. \
     -Dsonar.host.url=http://localhost:9000 \
     -Dsonar.inclusions=server.js \
     -Dsonar.test.inclusions=index.test.js "
    }
   }
        }


        

        
    }


}
