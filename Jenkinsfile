pipeline {
    agent any

    environment {
        SONARQUBE_SCANNER_HOME = tool name: 'SonarQubeScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
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
    }
}
