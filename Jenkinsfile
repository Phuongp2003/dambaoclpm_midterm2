pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup') {
            steps {
                sh 'npm install' // Adjust based on your project requirements
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test' // Adjust to your test command
            }
        }
        
        stage('Reports') {
            steps {
                junit '**/test-results/*.xml' // Adjust to your report path
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'screenshots/**', allowEmptyArchive: true
        }
    }
}
