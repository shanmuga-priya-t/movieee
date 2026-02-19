pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/shanmugapriya3442/movieee.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t shanmugapriya3442/movieee:v1 .'
            }
        }
        stage('Login & Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    sh 'docker push shanmugapriya3442/movieee:v1'
                }
            }
        }
    }
}
