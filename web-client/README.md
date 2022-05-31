# NEARBook - Social Media Platform - Web Client

Web client for the unstoppable, censorship resistant and decentralized social media platform, NEARBook.

# Quick Start

To run this project locally:

1. Prerequisites: Make sure you've installed [Node.js] ≥ 12
2. Install dependencies: `npm install`
3. Run the local development server: `npm run dev` (see `package.json` for a
   full list of `scripts` you can run with `npm`)
4. Visit `localhost:3000`

Now you'll have a local development environment backed by the NEAR TestNet!

# Exploring The Code

1. This client depends on some data types defined in the [contract](./../contract//assembly/models.ts) folder.
2. The frontend code lives in the `src` folder.
3. Utility functions to interacts with NEAR Testnet Blockchain can be found at `src/utils.ts` and `src/nearbook.ts`.

# Deploy

Every smart contract in NEAR has its [own associated account][near accounts]. When you run `npm run dev`, your smart contract gets deployed to the live NEAR TestNet with a throwaway account. When you're ready to make it permanent, here's how.

## Step 0: Install near-cli

The cli is installed automatically when you run `npm install`. Optionally you can install it globally with:

    yarn install --global near-cli

Or, if you'd rather use the locally-installed version, you can prefix all `near` commands with `npx` (preferred approach used in this docs)

Ensure that it's installed with `npx near --version`.

## Step 1: Create an account for the contract

Each account on NEAR can have at most one contract deployed to it. If you've already created an account such as `your-name.testnet`, you can deploy your contract to `nearbook.your-name.testnet`. Assuming you've already created an account on [NEAR Wallet], here's how to create `nearbook.your-name.testnet`:

1. Authorize NEAR CLI, following the commands it gives you:

   ```bash
   $ npx near login
   ```

2. Create a subaccount (replace `YOUR-NAME` below with your actual account name):

   ```bash
   $ npx near create-account nearbook.YOUR-NAME.testnet --masterAccount YOUR-NAME.testnet --initialBalance 3
   ```

3. Build and deploy smart contract:

   ```bash
   $ npm run build:contract:debug
   $ npx near deploy --accountId nearbook.YOUR-NAME.testnet --wasmFile ../contract/build/debug/nearbook-contracts.wasm
   ```

## Step 2: prepare required env vars

Create a local `.env` file at the web-client's root directory, use `.example.env` as a reference.

## Step 3: deploy!

Deploy web client from your machine with:

    ```bash
    $ npm run start
    ```

Your browser should open up at `localhost:3000` automatically. Look at `package.json` for more available commands that you can use.

## Step 4: Clean up

Once you stop your application from running, you can clean up the account and the smart contracts that were deploy, execute the following command:

    ```bash
    $ npx near delete nearbook.YOUR-NAME.testnet YOUR-NAME.testnet
    ```
