pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.46.1-jammy' } }
     environment {
        USERNAME = 'standard_user'
        PASSWORD = 'secret_sauce'
    }
   stages {
       stage('Setup Environment') {
         steps {
            git url: 'https://github.com/Mateosz12/EnerbitRetoWeb.git', branch: 'main'
            
         }
       }
      stage('e2e-tests') {
         steps {
            sh 'npm ci'
            sh 'npx playwright test'
         }
      }
   }
   
   post {
       always {
            publishHTML([
                            reportName : 'Playwright Report',
                            reportDir: 'playwright-report',
                            reportFiles: 'index.html',
                            keepAll: true,
                            alwaysLinkToLastBuild: true,
                            allowMissing: false
                        ])
       }
   }
}