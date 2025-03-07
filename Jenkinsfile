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
        SONARQUBE_SCANNER_HOME = tool name: 'SonarQubeScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    }
   steps {
    withSonarQubeEnv(installationName: 'SonarQubeScanner') {  //installationName is the name of sonar installation in manage jenkins>configure system
     
    }
   }    
          sh """
                        $SONARQUBE_SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectKey=nodejs \
                        -Dsonar.projectName=nodejs \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://192.168.159.134:9000 \
                        -Dsonar.login=sqa_a4645ae35c9a47a1fcecc3b3304a6b99cd11cc4b
                        
                    """
        }


        

        
    }


}
