pipeline {
    agent any

    environment {
        APP_VERSION = "${env.BUILD_NUMBER}"
    }

    stages {
    

       stage('Build Docker Images') {
            steps {
                script {
                    // Update the App_VERSION in your Docker Compose file
                    def dockerComposeFile = readFile('docker-compose.yml')
                    dockerComposeFile = dockerComposeFile.replaceAll(/(?<=App_VERSION:\s)(\d+\.\d+\.\d+)/, env.APP_VERSION)
                    writeFile file: 'docker-compose.yml', text: dockerComposeFile

                    // Build the Docker Compose
                    sh 'docker-compose build'
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                // Run the application
                sh 'docker-compose up -d'
            }
        }
    }


}
