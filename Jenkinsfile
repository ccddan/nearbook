pipeline {
  agent {
    kubernetes {
      yaml '''
      apiVersion: v1
      kind: Pod
      metadata:
        name: nearbook-node
        namespace: jenkins
      spec:
        containers:
        - name: node
          image: node:alpine
          tty: true
          securityContext:
            runAsUser: 1000
            privileged: true
      '''
    }
  }

  tools {
    git 'Default'
  }

  stages {
    stage("Install Dependencies") {
      steps {
        container('node') {
          sh 'pwd'
          sh 'ls -last'

          dir ('contract') {
            sh 'npm install'
          }
          dir ('web-client') {
            sh 'npm install'
          }
        }
      }
    }

    stage("Unit Testing") {
      steps {
        container('node') {
          dir ('contract') {
            sh 'npm test'
          }
          dir ('web-client') {
            sh 'npm test'
          }
        }
      }
    }
  }
}