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
      '''
    }
  }

  tools {
    git 'Default'
  }

  stages {
    stage("Checkout") {
      steps {
        container('node') {
          git url: 'https://github.com/ccddan/nearbook.git', branch: 'main'
        }
      }
    }

    stage("Install Dependencies") {
      steps {
        container('node') {
          dir ('contract') {
            sh 'npm install'
          }
          dir ('web-client') {
            sh 'npm install'
          }
        }
      }
    }
  }
}