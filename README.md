# NEARBook - Social Media Platform

The unstoppable, censorship resistant and decentralized social media platform. As it had to have been since the beginning.

For usage details, please follow instructions on:

- [Smart Contracts](./contract/README.md)
- [Web Client](./web-client/README.md)

## Demo App

The demo app has been published here: [ccddan.github.io/nearbook/](https://ccddan.github.io/nearbook/). <span style="color: red;"><b>!! BUT !!</b></span> for some reason the NEAR SDK is failing to connect to the smart contract (you can see the error in the image `./nearbook-deployment-failing-to-connect-rpc.png`). The smart contract has been deployed and is called [nearbook.ccdev.testnet](https://explorer.testnet.near.org/accounts/nearbook.ccdev.testnet).

### Workaround

1. Clone the repo
2. cd into `contract` and install dependencies with `npm install`
3. Now go back to root and cd into `web-client` and install dependencies with `npm install`
4. Create `.env` file by running `cp .example.env .env`
5. Inside `.env` file, set the content as `REACT_APP_CONTRACT_NAME=nearbook.ccdev.testnet`
6. Run the web client locally with `npm run start`
7. Visit `localhost:3000` and login with your NEAR wallet
8. Enjoy the posts, like, dislike, comment and create you own posts!!
