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

  stages {
    stage("Checkout") {
      steps {
        git url: 'https://github.com/ccddan/nearbook.git', branch: 'main'
      }
    }

    stage("Install Dependencies") {
      steps {
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