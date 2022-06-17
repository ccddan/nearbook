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
          workingDir: /home/nearbook
          securityContext:
            runAsUser: 0
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
          dir ('contract') {
            sh 'ls -las'
            sh 'npm install'
          }
          dir ('web-client') {
            sh 'ls -las'
            sh 'npm install'
          }
        }
      }
    }
  }
}