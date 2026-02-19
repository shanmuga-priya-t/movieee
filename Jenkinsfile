pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                // Windows-la irukkuradhala 'bat' use panrom
                bat 'docker build -t shanmugapriya3442/movieee:v1 .'
            }
        }
        stage('Login & Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    bat "docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%"
                    bat 'docker push shanmugapriya3442/movieee:v1'
                }
            }
        }
    }
}
