pipeline{
    agent any
    tools{
        maven 'MAVEN_HOME'
    }
    triggers{
        githubPush()
    }
    stages{
        stage('Checkout'){
            steps{
                git branch:'main',
                url:'https://github.com/lunahex/maven_web.git'
            }
        }
        stage('Build'){
            steps{
                bat 'mvn clean package'
            }
        }
        stage('Test'){
            steps{
                bat 'mvn test'
            }
        }
        stage('Docker Build'){
            steps{
                bat 'docker build -t webimage .'
                bat 'docker tag webimage kanthimeenasri/webimage:v%BUILD_NUMBER%'
                bat 'docker tag webimage kanthimeenasri/webimage:latest'
            }
        }
        stage('Docker Login'){
            steps{
                withCredentials(
                    [usernamePassword
                     (credentialsId: 'dockerhub_credentials',passwordVariable:'DOCKER_PASSWORD',usernameVariable:'DOCKER_USERNAME')
                ])
                {
                    bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                }
            }
        }
        stage('Docker Push'){
            steps{
                bat 'docker push kanthimeenasri/webimage:v%BUILD_NUMBER%'
                bat 'docker push kanthimeenasri/webimage:latest'
            }
        }
        stage('Docker Run'){
            steps{
                bat 'docker rm -f web-container 2>NUL || ver >NUL'
                bat 'docker run -d --name web-container -p 8087:8080 kanthimeenasri/webimage:latest'
            }
        }
    }
    post{
        success{
            mail(
                to: 'kanthimeenasri@gmail.com',
                subject: "pipeline ${env.JOB_NAME} [build #${env.BUILD_NUMBER}]",
                body:"pipeline completed successfully!\nview logs here: ${env.BUILD_URL}"
            )
        }
        failure{
            mail(
                to: 'kanthimeenasri@gmail.com',
                subject: "pipeline ${env.JOB_NAME} [build #${env.BUILD_NUMBER}]",
                body:"build failed!\nview logs here: ${env.BUILD_URL} console"
            )
        }
    }
}
